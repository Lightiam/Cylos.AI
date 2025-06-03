import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Shield, AlertTriangle, CheckCircle, Clock, Activity } from "lucide-react";

const demos = [
  {
    id: "threat-detection",
    title: "Real-Time Threat Detection",
    description: "Watch our AI agents detect and respond to security threats in real-time",
    category: "AI Engine",
    icon: Shield,
    gradient: "from-red-500 to-orange-500"
  },
  {
    id: "dashboard-analytics",
    title: "Security Dashboard Analytics",
    description: "Explore our comprehensive security monitoring and analytics interface",
    category: "Dashboard",
    icon: Activity,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "mcp-management",
    title: "MCP Server Management",
    description: "See how our centralized control plane manages distributed AI agents",
    category: "MCP Server",
    icon: AlertTriangle,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "browser-protection",
    title: "Browser Security Plugin",
    description: "Experience real-time browser threat protection and user warnings",
    category: "Browser Plugin",
    icon: CheckCircle,
    gradient: "from-green-500 to-teal-500"
  }
];

const mockThreatData = [
  { id: 1, type: "Malware", severity: "Critical", status: "Blocked", time: "12:34:56" },
  { id: 2, type: "Phishing", severity: "High", status: "Analyzing", time: "12:35:12" },
  { id: 3, type: "SQL Injection", severity: "Critical", status: "Blocked", time: "12:35:28" },
  { id: 4, type: "DDoS Attack", severity: "Medium", status: "Mitigated", time: "12:35:45" }
];

export default function InteractiveDemos() {
  const [activeDemo, setActiveDemo] = useState("threat-detection");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentThreat, setCurrentThreat] = useState(0);

  const startDemo = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentThreat(prev => (prev + 1) % mockThreatData.length);
    }, 2000);
    
    setTimeout(() => {
      setIsPlaying(false);
      clearInterval(interval);
    }, 8000);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentThreat(0);
  };

  const renderThreatDetectionDemo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Live Threat Monitoring</h3>
        <div className="flex space-x-2">
          <Button
            onClick={startDemo}
            disabled={isPlaying}
            className="bg-green-600 hover:bg-green-700"
            size="sm"
          >
            <Play className="w-4 h-4 mr-1" />
            {isPlaying ? "Running..." : "Start Demo"}
          </Button>
          <Button onClick={resetDemo} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg">Threat Detection Engine</CardTitle>
            <CardDescription>AI-powered real-time analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockThreatData.map((threat, index) => (
                <motion.div
                  key={threat.id}
                  className={`p-3 rounded-lg border ${
                    index === currentThreat && isPlaying
                      ? "border-red-500 bg-red-500/10"
                      : "border-slate-600 bg-slate-700/50"
                  }`}
                  animate={{
                    scale: index === currentThreat && isPlaying ? 1.02 : 1,
                    opacity: index <= currentThreat || !isPlaying ? 1 : 0.5
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{threat.type}</div>
                      <div className="text-sm text-slate-400">{threat.time}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={threat.severity === "Critical" ? "destructive" : 
                                threat.severity === "High" ? "secondary" : "outline"}
                      >
                        {threat.severity}
                      </Badge>
                      <Badge variant={threat.status === "Blocked" ? "default" : "outline"}>
                        {threat.status}
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg">Response Actions</CardTitle>
            <CardDescription>Automated security responses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <motion.div
                className="flex items-center space-x-3 p-2 rounded"
                animate={{
                  backgroundColor: isPlaying ? "rgba(34, 197, 94, 0.1)" : "transparent"
                }}
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">IP Address Blocked</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 p-2 rounded"
                animate={{
                  backgroundColor: isPlaying ? "rgba(59, 130, 246, 0.1)" : "transparent"
                }}
                transition={{ delay: 1 }}
              >
                <AlertTriangle className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Alert Sent to SOC</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-3 p-2 rounded"
                animate={{
                  backgroundColor: isPlaying ? "rgba(168, 85, 247, 0.1)" : "transparent"
                }}
                transition={{ delay: 2 }}
              >
                <Shield className="w-5 h-5 text-purple-500" />
                <span className="text-sm">Firewall Rules Updated</span>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderDashboardDemo = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Security Analytics Dashboard</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Threats Detected</p>
                <p className="text-3xl font-bold text-blue-500">247</p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Blocked Attacks</p>
                <p className="text-3xl font-bold text-green-500">99.7%</p>
              </div>
              <Shield className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Response Time</p>
                <p className="text-3xl font-bold text-orange-500">0.3s</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <section id="demos" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">
              Interactive Product Demos
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Experience our Agentic AI Security System in action with live interactive demonstrations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          {demos.map((demo, index) => {
            const Icon = demo.icon;
            return (
              <motion.div
                key={demo.id}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                  activeDemo === demo.id
                    ? "border-sky-500 bg-sky-500/10"
                    : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveDemo(demo.id)}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${demo.gradient} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{demo.title}</h3>
                <p className="text-sm text-slate-400 mb-3">{demo.description}</p>
                <Badge variant="outline" className="text-xs">
                  {demo.category}
                </Badge>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="bg-slate-800/30 rounded-2xl border border-slate-700 p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {activeDemo === "threat-detection" && (
              <motion.div
                key="threat-detection"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                {renderThreatDetectionDemo()}
              </motion.div>
            )}
            {activeDemo === "dashboard-analytics" && (
              <motion.div
                key="dashboard-analytics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                {renderDashboardDemo()}
              </motion.div>
            )}
            {(activeDemo === "mcp-management" || activeDemo === "browser-protection") && (
              <motion.div
                key="coming-soon"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <h3 className="text-2xl font-semibold mb-4">Demo Coming Soon</h3>
                <p className="text-slate-400 mb-6">
                  We're preparing an interactive demonstration for this component.
                </p>
                <Button variant="outline" className="border-sky-500 text-sky-500">
                  Request Early Access
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}