import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ThreatDetectionPulse, 
  SecurityDashboardMetrics,
  FloatingSecurityBadges
} from "./cybersecurity-animations";
import { 
  AlertTriangle, 
  Shield, 
  FileText, 
  Upload,
  Download,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Target,
  Activity
} from "lucide-react";

interface ThreatAnalysis {
  threat_level: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  categories: string[];
  confidence: number;
  recommendations: string[];
}

interface AnalysisResult {
  id: string;
  text: string;
  analysis: ThreatAnalysis;
  timestamp: Date;
  source: string;
}

interface ThreatStats {
  total: number;
  blocked: number;
  active: number;
}

export default function ThreatAnalysis() {
  const [analysisText, setAnalysisText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [threatStats, setThreatStats] = useState<ThreatStats | null>(null);
  const [tenantId] = useState(1); // Default tenant for demo
  const [batchTexts, setBatchTexts] = useState('');
  const [isBatchAnalyzing, setIsBatchAnalyzing] = useState(false);

  useEffect(() => {
    fetchThreatStats();
  }, []);

  const fetchThreatStats = async () => {
    try {
      const response = await fetch(`/api/v1/tenants/${tenantId}/threats/stats`);
      const data = await response.json();
      if (data.success) {
        setThreatStats(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch threat stats:', error);
    }
  };

  const analyzeSingleText = async () => {
    if (!analysisText.trim()) return;

    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/v1/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: analysisText,
          tenant_id: tenantId,
          source: 'manual'
        })
      });

      const data = await response.json();
      if (data.success) {
        const newResult: AnalysisResult = {
          id: Date.now().toString(),
          text: analysisText,
          analysis: data.data,
          timestamp: new Date(),
          source: 'manual'
        };
        setResults(prev => [newResult, ...prev]);
        setAnalysisText('');
        await fetchThreatStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeBatchTexts = async () => {
    if (!batchTexts.trim()) return;

    const texts = batchTexts.split('\n').filter(text => text.trim());
    if (texts.length === 0) return;

    setIsBatchAnalyzing(true);
    try {
      const response = await fetch('/api/v1/analyze/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          texts,
          tenant_id: tenantId,
          source: 'batch'
        })
      });

      const data = await response.json();
      if (data.success) {
        const newResults: AnalysisResult[] = texts.map((text, index) => ({
          id: `${Date.now()}-${index}`,
          text,
          analysis: data.data.results[index],
          timestamp: new Date(),
          source: 'batch'
        }));
        setResults(prev => [...newResults, ...prev]);
        setBatchTexts('');
        await fetchThreatStats(); // Refresh stats
      }
    } catch (error) {
      console.error('Batch analysis failed:', error);
    } finally {
      setIsBatchAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <AlertCircle className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <XCircle className="h-4 w-4" />;
      default: return <Eye className="h-4 w-4" />;
    }
  };

  const getThreatLevelColor = (level: number) => {
    if (level >= 0.8) return 'text-red-500';
    if (level >= 0.6) return 'text-orange-500';
    if (level >= 0.3) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <FloatingSecurityBadges />
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Threat Analysis Center</h1>
          <p className="text-blue-200">AI-powered threat detection and security analysis</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Total Threats</p>
                  <p className="text-3xl font-bold text-white">
                    {threatStats?.total || 0}
                  </p>
                </div>
                <Target className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Blocked Threats</p>
                  <p className="text-3xl font-bold text-white">
                    {threatStats?.blocked || 0}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Active Threats</p>
                  <p className="text-3xl font-bold text-white">
                    {threatStats?.active || 0}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analysis Interface */}
        <Tabs defaultValue="single" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="single" className="text-white data-[state=active]:bg-blue-600">Single Analysis</TabsTrigger>
            <TabsTrigger value="batch" className="text-white data-[state=active]:bg-blue-600">Batch Analysis</TabsTrigger>
            <TabsTrigger value="results" className="text-white data-[state=active]:bg-blue-600">Results History</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ThreatDetectionPulse />
                  Single Text Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={analysisText}
                  onChange={(e) => setAnalysisText(e.target.value)}
                  placeholder="Enter text, code, or content to analyze for security threats..."
                  className="bg-white/10 border-white/20 text-white placeholder-blue-200 min-h-32"
                  rows={8}
                />
                <div className="flex gap-4">
                  <Button 
                    onClick={analyzeSingleText}
                    disabled={!analysisText.trim() || isAnalyzing}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <ThreatDetectionPulse />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        Analyze Threat
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setAnalysisText('')}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="batch" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Batch Text Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-blue-200 text-sm">
                  Enter multiple texts separated by new lines. Each line will be analyzed separately.
                </p>
                <Textarea
                  value={batchTexts}
                  onChange={(e) => setBatchTexts(e.target.value)}
                  placeholder="Line 1: First text to analyze&#10;Line 2: Second text to analyze&#10;Line 3: Third text to analyze..."
                  className="bg-white/10 border-white/20 text-white placeholder-blue-200 min-h-40"
                  rows={12}
                />
                <div className="flex gap-4">
                  <Button 
                    onClick={analyzeBatchTexts}
                    disabled={!batchTexts.trim() || isBatchAnalyzing}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    {isBatchAnalyzing ? (
                      <>
                        <ThreatDetectionPulse />
                        Processing Batch...
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        Analyze Batch
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setBatchTexts('')}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Analysis Results History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results.length === 0 ? (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                    <p className="text-blue-200">No analysis results yet. Start by analyzing some text!</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {results.map((result) => (
                      <Card key={result.id} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge className={getSeverityColor(result.analysis.severity)}>
                                  {getSeverityIcon(result.analysis.severity)}
                                  {result.analysis.severity.toUpperCase()}
                                </Badge>
                                <Badge variant="outline" className="text-blue-200 border-blue-200">
                                  {result.source}
                                </Badge>
                              </div>
                              <span className="text-blue-200 text-xs">
                                {result.timestamp.toLocaleString()}
                              </span>
                            </div>

                            {/* Threat Level */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-white text-sm">Threat Level</span>
                                <span className={`font-bold ${getThreatLevelColor(result.analysis.threat_level)}`}>
                                  {(result.analysis.threat_level * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress 
                                value={result.analysis.threat_level * 100} 
                                className="h-2"
                              />
                            </div>

                            {/* Confidence */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-white text-sm">Confidence</span>
                                <span className="text-blue-200 font-medium">
                                  {(result.analysis.confidence * 100).toFixed(1)}%
                                </span>
                              </div>
                              <Progress 
                                value={result.analysis.confidence * 100} 
                                className="h-2"
                              />
                            </div>

                            {/* Categories */}
                            {result.analysis.categories.length > 0 && (
                              <div>
                                <span className="text-white text-sm block mb-2">Categories:</span>
                                <div className="flex flex-wrap gap-1">
                                  {result.analysis.categories.map((category, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {category}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Recommendations */}
                            {result.analysis.recommendations.length > 0 && (
                              <div>
                                <span className="text-white text-sm block mb-2">Recommendations:</span>
                                <ul className="text-blue-200 text-xs space-y-1">
                                  {result.analysis.recommendations.map((rec, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <span className="text-blue-400 mt-1">•</span>
                                      {rec}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Analyzed Text */}
                            <div>
                              <span className="text-white text-sm block mb-2">Analyzed Text:</span>
                              <div className="bg-white/5 p-3 rounded border border-white/10">
                                <p className="text-blue-100 text-xs font-mono break-words">
                                  {result.text.length > 200 
                                    ? `${result.text.substring(0, 200)}...` 
                                    : result.text
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Real-time Metrics */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Real-time Security Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SecurityDashboardMetrics />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
