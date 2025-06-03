import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ThreatDetectionPulse, 
  NetworkConnectionAnimation,
  FloatingSecurityBadges
} from "./cybersecurity-animations";
import { 
  Play, 
  Pause, 
  Square, 
  RefreshCw, 
  Download,
  Upload,
  Settings,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  Search,
  Filter,
  Calendar,
  FileText,
  Activity,
  Target,
  Zap
} from "lucide-react";

interface SecurityScan {
  scan_id: number;
  status: 'running' | 'completed' | 'failed' | 'pending';
  results: any;
  created_at: string;
  completed_at?: string;
}

interface ScanConfig {
  scan_type: string;
  targets?: string[];
  depth?: 'shallow' | 'deep';
  timeout?: number;
}

interface ScanResult {
  vulnerabilities_found: number;
  security_score: number;
  recommendations: string[];
  scan_duration: string;
  targets_scanned: number;
}

export default function SecurityScans() {
  const [scans, setScans] = useState<SecurityScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [isStartingScan, setIsStartingScan] = useState(false);
  const [tenantId] = useState(1); // Default tenant for demo
  const [scanConfig, setScanConfig] = useState<ScanConfig>({
    scan_type: 'vulnerability',
    depth: 'shallow',
    timeout: 300
  });
  const [customTargets, setCustomTargets] = useState('');
  const [selectedScan, setSelectedScan] = useState<SecurityScan | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    fetchScans();
    const interval = setInterval(fetchScans, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchScans = async () => {
    try {
      const response = await fetch(`/api/v1/tenants/${tenantId}/scans`);
      const data = await response.json();
      if (data.success) {
        setScans(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch scans:', error);
    } finally {
      setLoading(false);
    }
  };

  const startScan = async () => {
    setIsStartingScan(true);
    try {
      const config = {
        ...scanConfig,
        targets: customTargets ? customTargets.split('\n').filter(t => t.trim()) : undefined
      };

      const response = await fetch('/api/v1/scans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scan_type: config.scan_type,
          config,
          tenant_id: tenantId
        })
      });

      const data = await response.json();
      if (data.success) {
        await fetchScans(); // Refresh scan list
        setCustomTargets('');
      }
    } catch (error) {
      console.error('Failed to start scan:', error);
    } finally {
      setIsStartingScan(false);
    }
  };

  const getScanResults = async (scanId: number) => {
    try {
      const response = await fetch(`/api/v1/scans/${scanId}/results?tenant_id=${tenantId}`);
      const data = await response.json();
      if (data.success) {
        setSelectedScan(data.data);
      }
    } catch (error) {
      console.error('Failed to get scan results:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'running': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'running': return <ThreatDetectionPulse />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getScanTypeIcon = (scanType: string) => {
    switch (scanType) {
      case 'vulnerability': return <Shield className="h-4 w-4" />;
      case 'network': return <Activity className="h-4 w-4" />;
      case 'malware': return <Target className="h-4 w-4" />;
      case 'compliance': return <FileText className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const filteredScans = scans.filter(scan => 
    filterStatus === 'all' || scan.status === filterStatus
  );

  const getSecurityScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <FloatingSecurityBadges />
      
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Security Scan Center</h1>
          <p className="text-blue-200">Comprehensive security scanning and vulnerability assessment</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Total Scans</p>
                  <p className="text-3xl font-bold text-white">{scans.length}</p>
                </div>
                <Search className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Running Scans</p>
                  <p className="text-3xl font-bold text-white">
                    {scans.filter(s => s.status === 'running').length}
                  </p>
                </div>
                <div className="relative">
                  <ThreatDetectionPulse />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-white">
                    {scans.filter(s => s.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Failed Scans</p>
                  <p className="text-3xl font-bold text-white">
                    {scans.filter(s => s.status === 'failed').length}
                  </p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="new-scan" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="new-scan" className="text-white data-[state=active]:bg-blue-600">New Scan</TabsTrigger>
            <TabsTrigger value="scan-history" className="text-white data-[state=active]:bg-blue-600">Scan History</TabsTrigger>
            <TabsTrigger value="results" className="text-white data-[state=active]:bg-blue-600">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="new-scan" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scan Configuration */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Scan Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-white text-sm block mb-2">Scan Type</label>
                    <Select 
                      value={scanConfig.scan_type} 
                      onValueChange={(value) => setScanConfig(prev => ({ ...prev, scan_type: value }))}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vulnerability">Vulnerability Scan</SelectItem>
                        <SelectItem value="network">Network Security Scan</SelectItem>
                        <SelectItem value="malware">Malware Detection</SelectItem>
                        <SelectItem value="compliance">Compliance Check</SelectItem>
                        <SelectItem value="penetration">Penetration Test</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-white text-sm block mb-2">Scan Depth</label>
                    <Select 
                      value={scanConfig.depth} 
                      onValueChange={(value: 'shallow' | 'deep') => setScanConfig(prev => ({ ...prev, depth: value }))}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="shallow">Shallow (Quick)</SelectItem>
                        <SelectItem value="deep">Deep (Comprehensive)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-white text-sm block mb-2">Timeout (seconds)</label>
                    <Input
                      type="number"
                      value={scanConfig.timeout}
                      onChange={(e) => setScanConfig(prev => ({ ...prev, timeout: parseInt(e.target.value) }))}
                      className="bg-white/10 border-white/20 text-white placeholder-blue-200"
                      min="60"
                      max="3600"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm block mb-2">Custom Targets (optional)</label>
                    <Textarea
                      value={customTargets}
                      onChange={(e) => setCustomTargets(e.target.value)}
                      placeholder="Enter targets, one per line&#10;192.168.1.1&#10;example.com&#10;/path/to/file"
                      className="bg-white/10 border-white/20 text-white placeholder-blue-200"
                      rows={4}
                    />
                  </div>

                  <Button 
                    onClick={startScan}
                    disabled={isStartingScan}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    {isStartingScan ? (
                      <>
                        <ThreatDetectionPulse />
                        Starting Scan...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        Start Security Scan
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Network Visualization */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Network Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <NetworkConnectionAnimation />
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Active Connections</span>
                      <span className="text-white font-medium">24</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Monitored Endpoints</span>
                      <span className="text-white font-medium">156</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-blue-200">Security Status</span>
                      <Badge className="bg-green-100 text-green-800">Secure</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scan-history" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Scan History
                </CardTitle>
                <div className="flex gap-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    onClick={fetchScans}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <ThreatDetectionPulse />
                    <p className="mt-4 text-blue-200">Loading scan history...</p>
                  </div>
                ) : filteredScans.length === 0 ? (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                    <p className="text-blue-200">No scans found. Start your first security scan!</p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredScans.map((scan) => (
                      <Card key={scan.scan_id} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getScanTypeIcon('vulnerability')}
                              <div>
                                <p className="text-white font-medium">
                                  Scan #{scan.scan_id}
                                </p>
                                <p className="text-blue-200 text-sm">
                                  {new Date(scan.created_at).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(scan.status)}>
                                {getStatusIcon(scan.status)}
                                {scan.status.toUpperCase()}
                              </Badge>
                              {scan.status === 'completed' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => getScanResults(scan.scan_id)}
                                  className="border-white/20 text-white hover:bg-white/10"
                                >
                                  View Results
                                </Button>
                              )}
                            </div>
                          </div>
                          {scan.status === 'running' && (
                            <div className="mt-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-blue-200">Progress</span>
                                <span className="text-white">Scanning...</span>
                              </div>
                              <Progress value={65} className="h-2" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Scan Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedScan ? (
                  <div className="space-y-6">
                    {/* Scan Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-4 text-center">
                          <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                          <p className="text-blue-200 text-sm">Security Score</p>
                          <p className={`text-2xl font-bold ${getSecurityScoreColor(selectedScan.results?.security_score || 0)}`}>
                            {selectedScan.results?.security_score || 0}%
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-4 text-center">
                          <AlertTriangle className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                          <p className="text-blue-200 text-sm">Vulnerabilities</p>
                          <p className="text-2xl font-bold text-white">
                            {selectedScan.results?.vulnerabilities_found || 0}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-4 text-center">
                          <Clock className="h-8 w-8 text-green-400 mx-auto mb-2" />
                          <p className="text-blue-200 text-sm">Duration</p>
                          <p className="text-2xl font-bold text-white">
                            {selectedScan.results?.scan_duration || 'N/A'}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Recommendations */}
                    {selectedScan.results?.recommendations && (
                      <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <Zap className="h-5 w-5" />
                          Security Recommendations
                        </h3>
                        <div className="space-y-2">
                          {selectedScan.results.recommendations.map((rec: string, index: number) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                              <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                              <p className="text-blue-100 text-sm">{rec}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Export Options */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Export PDF
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Export CSV
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-blue-300 mx-auto mb-4" />
                    <p className="text-blue-200">Select a completed scan from the history to view results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
