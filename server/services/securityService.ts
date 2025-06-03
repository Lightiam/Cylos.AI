import { storage } from "../storage";
import type { InsertThreat, InsertSecurityScan } from "../../shared/schema";
import { AIServiceManager, GroqProvider } from "./aiService";

interface ThreatAnalysis {
  threatLevel: number;
  categories: string[];
  confidence: number;
  recommendations: string[];
  severity: "low" | "medium" | "high" | "critical";
}

interface ScanConfig {
  scanType: string;
  targets?: string[];
  depth?: "shallow" | "deep";
  timeout?: number;
}

export class SecurityService {
  private aiManager: AIServiceManager;

  constructor() {
    this.aiManager = new AIServiceManager();
    
    if (process.env.GROQ_API_KEY) {
      this.aiManager.addProvider(new GroqProvider(process.env.GROQ_API_KEY));
    }
  }

  async analyzeText(tenantId: number, text: string, source: string = "api"): Promise<ThreatAnalysis> {
    try {
      const [threatLevel, categories, confidence, recommendations] = await Promise.all([
        this.calculateThreatLevel(text),
        this.categorizeThreats(text),
        this.calculateConfidence(text),
        this.generateRecommendations(text)
      ]);

      const analysis: ThreatAnalysis = {
        threatLevel,
        categories,
        confidence,
        recommendations,
        severity: "low"
      };

      analysis.severity = this.mapThreatLevelToSeverity(analysis.threatLevel);

      if (analysis.threatLevel > 0.5) {
        await storage.createThreat({
          tenantId,
          text,
          source,
          severity: analysis.severity,
          metadata: JSON.stringify(analysis)
        });
      }

      return analysis;
    } catch (error) {
      console.error("Error analyzing text:", error);
      throw new Error("Failed to analyze text for threats");
    }
  }

  async batchAnalyzeTexts(tenantId: number, texts: string[], source: string = "api"): Promise<ThreatAnalysis[]> {
    try {
      const analyses = await Promise.all(
        texts.map(text => this.analyzeText(tenantId, text, source))
      );
      return analyses;
    } catch (error) {
      console.error("Error in batch analysis:", error);
      throw new Error("Failed to perform batch threat analysis");
    }
  }

  async startSecurityScan(tenantId: number, scanType: string, config: ScanConfig): Promise<number> {
    try {
      const scan = await storage.createSecurityScan({
        tenantId,
        scanType,
        config: JSON.stringify(config),
        status: "running"
      });

      this.processScanInBackground(scan.id, scanType, config);
      
      return scan.id;
    } catch (error) {
      console.error("Error starting security scan:", error);
      throw new Error("Failed to start security scan");
    }
  }

  async getScanResults(tenantId: number, scanId: number) {
    try {
      const scan = await storage.getSecurityScan(scanId);
      if (!scan || scan.tenantId !== tenantId) {
        throw new Error("Scan not found or access denied");
      }
      return {
        scan_id: scan.id,
        status: scan.status,
        results: JSON.parse(scan.results || "{}"),
        created_at: scan.createdAt,
        completed_at: scan.completedAt
      };
    } catch (error) {
      console.error("Error getting scan results:", error);
      throw new Error("Failed to retrieve scan results");
    }
  }

  async getThreatStats(tenantId: number) {
    try {
      return await storage.getThreatStats(tenantId);
    } catch (error) {
      console.error("Error getting threat stats:", error);
      throw new Error("Failed to retrieve threat statistics");
    }
  }

  private async calculateThreatLevel(text: string): Promise<number> {
    try {
      const aiPrompt = `Analyze the following text for cybersecurity threats and return a threat level score between 0.0 and 1.0, where 0.0 is no threat and 1.0 is critical threat. Consider malware, phishing, injection attacks, social engineering, and other security risks. Only respond with the numerical score.

Text to analyze: "${text}"

Threat Level Score:`;

      let aiScore = 0;
      if (this.aiManager.hasProvider('Groq')) {
        try {
          const aiResponse = await this.aiManager.generateResponse('Groq', aiPrompt);
          const parsedScore = parseFloat(aiResponse.trim());
          if (!isNaN(parsedScore) && parsedScore >= 0 && parsedScore <= 1) {
            aiScore = parsedScore;
          }
        } catch (error) {
          console.warn('AI threat analysis failed, falling back to keyword analysis:', error);
        }
      }

      const threatKeywords = [
        'malware', 'virus', 'trojan', 'ransomware', 'phishing', 'exploit',
        'vulnerability', 'attack', 'breach', 'hack', 'injection', 'xss',
        'sql injection', 'ddos', 'botnet', 'backdoor', 'rootkit'
      ];

      const suspiciousPatterns = [
        /eval\s*\(/gi,
        /document\.write/gi,
        /innerHTML\s*=/gi,
        /script\s*>/gi,
        /javascript:/gi,
        /data:text\/html/gi
      ];

      let keywordScore = 0;
      const lowerText = text.toLowerCase();

      threatKeywords.forEach(keyword => {
        if (lowerText.includes(keyword)) {
          keywordScore += 0.2;
        }
      });

      suspiciousPatterns.forEach(pattern => {
        if (pattern.test(text)) {
          keywordScore += 0.3;
        }
      });

      keywordScore = Math.min(keywordScore, 1.0);

      const finalScore = aiScore > 0 ? (aiScore * 0.7 + keywordScore * 0.3) : keywordScore;
      return Math.min(finalScore, 1.0);
    } catch (error) {
      console.error('Error calculating threat level:', error);
      return 0.5; // Default moderate threat level on error
    }
  }

  private async categorizeThreats(text: string): Promise<string[]> {
    try {
      const aiPrompt = `Analyze the following text and categorize any cybersecurity threats found. Return only the threat categories as a comma-separated list from these options: malware, phishing, injection, denial_of_service, data_breach, social_engineering, ransomware, insider_threat, network_intrusion, unknown. If no threats are found, return "none".

Text to analyze: "${text}"

Threat Categories:`;

      let aiCategories: string[] = [];
      if (this.aiManager.hasProvider('Groq')) {
        try {
          const aiResponse = await this.aiManager.generateResponse('Groq', aiPrompt);
          const categoriesText = aiResponse.trim().toLowerCase();
          if (categoriesText !== 'none') {
            aiCategories = categoriesText.split(',').map(cat => cat.trim()).filter(cat => cat.length > 0);
          }
        } catch (error) {
          console.warn('AI threat categorization failed, falling back to keyword analysis:', error);
        }
      }

      const categories: string[] = [];
      const lowerText = text.toLowerCase();

      if (lowerText.includes('malware') || lowerText.includes('virus') || lowerText.includes('trojan')) {
        categories.push('malware');
      }
      if (lowerText.includes('phishing') || lowerText.includes('social engineering')) {
        categories.push('phishing');
      }
      if (lowerText.includes('injection') || lowerText.includes('xss') || lowerText.includes('sql')) {
        categories.push('injection');
      }
      if (lowerText.includes('ddos') || lowerText.includes('dos')) {
        categories.push('denial_of_service');
      }
      if (lowerText.includes('data breach') || lowerText.includes('leak')) {
        categories.push('data_breach');
      }
      if (lowerText.includes('ransomware')) {
        categories.push('ransomware');
      }

      const finalCategories = aiCategories.length > 0 ? aiCategories : categories;
      return finalCategories.length > 0 ? finalCategories : ['unknown'];
    } catch (error) {
      console.error('Error categorizing threats:', error);
      return ['unknown'];
    }
  }

  private async calculateConfidence(text: string): Promise<number> {
    try {
      const aiPrompt = `Analyze the confidence level of threat detection for the following text. Consider factors like text clarity, specificity of threat indicators, and available context. Return a confidence score between 0.0 and 1.0, where 0.0 is very low confidence and 1.0 is very high confidence. Only respond with the numerical score.

Text to analyze: "${text}"

Confidence Score:`;

      let aiConfidence = 0;
      if (this.aiManager.hasProvider('Groq')) {
        try {
          const aiResponse = await this.aiManager.generateResponse('Groq', aiPrompt);
          const parsedConfidence = parseFloat(aiResponse.trim());
          if (!isNaN(parsedConfidence) && parsedConfidence >= 0 && parsedConfidence <= 1) {
            aiConfidence = parsedConfidence;
          }
        } catch (error) {
          console.warn('AI confidence calculation failed, falling back to heuristic analysis:', error);
        }
      }

      const wordCount = text.split(/\s+/).length;
      const baseConfidence = Math.min(wordCount / 100, 0.8);
      const heuristicConfidence = Math.max(baseConfidence, 0.3);

      return aiConfidence > 0 ? aiConfidence : heuristicConfidence;
    } catch (error) {
      console.error('Error calculating confidence:', error);
      return 0.5; // Default moderate confidence on error
    }
  }

  private async generateRecommendations(text: string): Promise<string[]> {
    try {
      const aiPrompt = `Based on the following cybersecurity threat analysis text, generate 3-5 specific, actionable security recommendations. Each recommendation should be practical and directly related to mitigating the identified threats. Return each recommendation on a new line.

Text to analyze: "${text}"

Security Recommendations:`;

      let aiRecommendations: string[] = [];
      if (this.aiManager.hasProvider('Groq')) {
        try {
          const aiResponse = await this.aiManager.generateResponse('Groq', aiPrompt);
          aiRecommendations = aiResponse
            .split('\n')
            .map(rec => rec.trim())
            .filter(rec => rec.length > 0 && !rec.toLowerCase().startsWith('security recommendations:'))
            .slice(0, 5); // Limit to 5 recommendations
        } catch (error) {
          console.warn('AI recommendation generation failed, falling back to keyword-based recommendations:', error);
        }
      }

      const recommendations: string[] = [];
      const lowerText = text.toLowerCase();

      if (lowerText.includes('password')) {
        recommendations.push('Implement strong password policies and multi-factor authentication');
      }
      if (lowerText.includes('network')) {
        recommendations.push('Review network security configurations and implement network segmentation');
      }
      if (lowerText.includes('email')) {
        recommendations.push('Enable email security filters and user awareness training');
      }
      if (lowerText.includes('update') || lowerText.includes('patch')) {
        recommendations.push('Ensure all systems are up to date with latest security patches');
      }
      if (lowerText.includes('malware') || lowerText.includes('virus')) {
        recommendations.push('Deploy advanced endpoint protection and regular malware scanning');
      }
      if (lowerText.includes('phishing')) {
        recommendations.push('Implement phishing detection tools and security awareness training');
      }

      if (recommendations.length === 0) {
        recommendations.push('Monitor for suspicious activity and implement security logging');
        recommendations.push('Conduct regular security assessments and penetration testing');
      }

      const finalRecommendations = aiRecommendations.length > 0 ? aiRecommendations : recommendations;
      return finalRecommendations.slice(0, 5); // Ensure max 5 recommendations
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return ['Monitor for suspicious activity and implement security logging'];
    }
  }

  private mapThreatLevelToSeverity(threatLevel: number): "low" | "medium" | "high" | "critical" {
    if (threatLevel >= 0.8) return "critical";
    if (threatLevel >= 0.6) return "high";
    if (threatLevel >= 0.3) return "medium";
    return "low";
  }

  private async processScanInBackground(scanId: number, scanType: string, config: ScanConfig): Promise<void> {
    setTimeout(async () => {
      try {
        const results = await this.performScan(scanType, config);
        await storage.updateSecurityScan(scanId, {
          status: "completed",
          results: JSON.stringify(results),
          completedAt: new Date()
        });
      } catch (error) {
        console.error("Scan failed:", error);
        await storage.updateSecurityScan(scanId, {
          status: "failed",
          results: JSON.stringify({ error: "Scan failed" }),
          completedAt: new Date()
        });
      }
    }, 5000); // 5 second delay for demo
  }

  private async performScan(scanType: string, config: ScanConfig): Promise<any> {
    const mockResults = {
      vulnerabilities_found: Math.floor(Math.random() * 10),
      security_score: Math.floor(Math.random() * 100),
      recommendations: [
        "Update security patches",
        "Review access controls",
        "Enable monitoring"
      ],
      scan_duration: "5 seconds",
      targets_scanned: config.targets?.length || 1
    };

    return mockResults;
  }
}

export const securityService = new SecurityService();
