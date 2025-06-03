import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  SecurityDashboardMetrics, 
  ThreatDetectionPulse, 
  NetworkConnectionAnimation,
  MCPConnectionFlow,
  FloatingSecurityBadges
} from "./cybersecurity-animations";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Users, 
  FileText, 
  Upload,
  Send,
  Paperclip,
  Bot,
  User
} from "lucide-react";

interface DashboardData {
  system_metrics: {
    threats_detected: number;
    scans_completed: number;
    alerts_active: number;
    security_score: number;
    uptime_percentage: number;
    response_time_ms: number;
  };
  recent_alerts: Array<{
    id: number;
    alert_type: string;
    severity: string;
    message: string;
    status: string;
    created_at: string;
  }>;
  threat_trends: Array<{
    date: string;
    threats: number;
    blocked: number;
  }>;
  health_status: "healthy" | "warning" | "critical";
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: string[];
}

export default function SecurityDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tenantId] = useState(1); // Default tenant for demo
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Welcome to Cylos AI Security Dashboard! I can help you analyze threats, run security scans, and monitor your systems. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`/api/v1/tenants/${tenantId}/dashboard/metrics`);
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/v1/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: currentMessage,
          tenant_id: tenantId,
          source: 'chat'
        })
      });

      const analysisData = await response.json();
      
      let aiResponse = '';
      if (analysisData.success) {
        const analysis = analysisData.data;
        aiResponse = `Analysis complete! Threat level: ${(analysis.threat_level * 100).toFixed(1)}% (${analysis.severity}). `;
        
        if (analysis.categories.length > 0) {
          aiResponse += `Categories detected: ${analysis.categories.join(', ')}. `;
        }
        
        if (analysis.recommendations.length > 0) {
          aiResponse += `Recommendations: ${analysis.recommendations.join(', ')}.`;
        } else {
          aiResponse += 'No immediate security concerns detected.';
        }
      } else {
        aiResponse = 'I encountered an issue analyzing your message. Please try again.';
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Analysis failed:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error while analyzing your message. Please try again.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'user',
        content: `Uploaded file: ${file.name}`,
        timestamp: new Date(),
        attachments: [file.name]
      };
      setChatMessages(prev => [...prev, fileMessage]);

      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: `I've received your file "${file.name}". File analysis capabilities are coming soon! For now, you can paste text content for immediate threat analysis.`,
          timestamp: new Date()
        };
        setChatMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <ThreatDetectionPulse />
          <p className="mt-4 text-lg">Loading security dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <FloatingSecurityBadges />
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Cylos AI Security Dashboard</h1>
          <p className="text-blue-200">Real-time threat monitoring and AI-powered security analysis</p>
        </div>

        {/* System Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Security Score</p>
                  <p className="text-3xl font-bold text-white">
                    {dashboardData?.system_metrics.security_score || 0}%
                  </p>
                </div>
                <Shield className={`h-8 w-8 ${dashboardData?.health_status === 'healthy' ? 'text-green-400' : 'text-yellow-400'}`} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Threats Detected</p>
                  <p className="text-3xl font-bold text-white">
                    {dashboardData?.system_metrics.threats_detected || 0}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Active Alerts</p>
                  <p className="text-3xl font-bold text-white">
                    {dashboardData?.system_metrics.alerts_active || 0}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">System Status</p>
                  <p className={`text-lg font-semibold ${getStatusColor(dashboardData?.health_status || 'unknown')}`}>
                    {dashboardData?.health_status?.toUpperCase() || 'UNKNOWN'}
                  </p>
                </div>
                <div className="relative">
                  <ThreatDetectionPulse />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="overview" className="text-white data-[state=active]:bg-blue-600">Overview</TabsTrigger>
            <TabsTrigger value="chat" className="text-white data-[state=active]:bg-blue-600">AI Assistant</TabsTrigger>
            <TabsTrigger value="threats" className="text-white data-[state=active]:bg-blue-600">Threats</TabsTrigger>
            <TabsTrigger value="network" className="text-white data-[state=active]:bg-blue-600">Network</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    System Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SecurityDashboardMetrics />
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Recent Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dashboardData?.recent_alerts?.slice(0, 5).map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <p className="text-white text-sm">{alert.message}</p>
                        <p className="text-blue-200 text-xs">{new Date(alert.created_at).toLocaleString()}</p>
                      </div>
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                    </div>
                  )) || (
                    <p className="text-blue-200 text-center py-4">No recent alerts</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  AI Security Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Chat Messages */}
                  <div className="h-96 overflow-y-auto space-y-4 p-4 bg-white/5 rounded-lg">
                    {chatMessages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white/10 text-white border border-white/20'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            {message.type === 'user' ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4" />
                            )}
                            <span className="text-xs opacity-75">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                          {message.attachments && (
                            <div className="mt-2">
                              {message.attachments.map((file, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  <FileText className="h-3 w-3 mr-1" />
                                  {file}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isAnalyzing && (
                      <div className="flex justify-start">
                        <div className="bg-white/10 text-white border border-white/20 px-4 py-2 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Bot className="h-4 w-4" />
                            <span className="text-sm">Analyzing...</span>
                            <ThreatDetectionPulse />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Textarea
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Ask me about security threats, request scans, or paste text for analysis..."
                        className="bg-white/10 border-white/20 text-white placeholder-blue-200 resize-none"
                        rows={3}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <div className="absolute bottom-2 right-2 flex gap-1">
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Paperclip className="h-4 w-4 text-blue-300 hover:text-blue-200" />
                          <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileUpload}
                            accept=".txt,.pdf,.doc,.docx"
                          />
                        </label>
                      </div>
                    </div>
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!currentMessage.trim() || isAnalyzing}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="threats" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ThreatDetectionPulse />
                  Threat Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-semibold mb-4">Threat Trends</h3>
                    <div className="space-y-2">
                      {dashboardData?.threat_trends?.map((trend, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white/5 rounded">
                          <span className="text-blue-200 text-sm">{trend.date}</span>
                          <div className="flex gap-4">
                            <span className="text-red-400 text-sm">Threats: {trend.threats}</span>
                            <span className="text-green-400 text-sm">Blocked: {trend.blocked}</span>
                          </div>
                        </div>
                      )) || (
                        <p className="text-blue-200 text-center py-4">No threat data available</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-4">Quick Analysis</h3>
                    <Textarea
                      placeholder="Paste text here for immediate threat analysis..."
                      className="bg-white/10 border-white/20 text-white placeholder-blue-200 mb-4"
                      rows={6}
                    />
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Analyze Text
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Network Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-white font-semibold mb-4">Network Connections</h3>
                    <NetworkConnectionAnimation />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-4">MCP Protocol Status</h3>
                    <MCPConnectionFlow />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
