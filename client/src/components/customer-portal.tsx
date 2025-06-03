import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Shield, 
  Activity, 
  Settings, 
  Bell, 
  Download, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  FileText,
  Key
} from "lucide-react";

const mockUserData = {
  name: "John Smith",
  email: "john.smith@techcorp.com",
  company: "TechCorp Industries",
  plan: "Enterprise",
  lastLogin: "2024-06-02 14:30:00",
  accountStatus: "Active",
  endpoints: 2847,
  threatsBlocked: 1247,
  uptime: 99.9
};

const recentAlerts = [
  {
    id: 1,
    type: "Critical",
    title: "Advanced Persistent Threat Detected",
    description: "Suspicious activity detected on endpoint 192.168.1.45",
    timestamp: "2024-06-02 14:25:00",
    status: "Mitigated"
  },
  {
    id: 2,
    type: "High",
    title: "Malware Signature Updated",
    description: "New malware signatures deployed across all endpoints",
    timestamp: "2024-06-02 13:15:00",
    status: "Deployed"
  },
  {
    id: 3,
    type: "Medium",
    title: "Policy Violation",
    description: "Unauthorized software installation attempt blocked",
    timestamp: "2024-06-02 12:45:00",
    status: "Blocked"
  }
];

const systemMetrics = [
  { label: "Protected Endpoints", value: 2847, change: "+12", trend: "up" },
  { label: "Threats Blocked Today", value: 156, change: "+8", trend: "up" },
  { label: "Average Response Time", value: "0.3s", change: "-0.1s", trend: "down" },
  { label: "System Uptime", value: "99.9%", change: "+0.1%", trend: "up" }
];

export default function CustomerPortal() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setIsLoggedIn(true);
  };

  const LoginForm = () => (
    <div className="max-w-md mx-auto">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Customer Portal</CardTitle>
          <CardDescription>Access your Cylos AI Security dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-slate-50"
                placeholder="john@company.com"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-slate-50"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-sky-500 hover:text-sky-400">
              Forgot your password?
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const DashboardContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Welcome back, {mockUserData.name}</h3>
          <p className="text-slate-400">Last login: {mockUserData.lastLogin}</p>
        </div>
        <Badge variant="outline" className="border-green-500 text-green-500">
          {mockUserData.accountStatus}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <Card key={metric.label} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-blue-500'}`}>
                    {metric.change} from yesterday
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-sky-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              Recent Security Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge 
                          variant={alert.type === "Critical" ? "destructive" : 
                                  alert.type === "High" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {alert.type}
                        </Badge>
                        <span className="text-sm text-slate-400">{alert.timestamp}</span>
                      </div>
                      <h4 className="font-medium mb-1">{alert.title}</h4>
                      <p className="text-sm text-slate-400">{alert.description}</p>
                    </div>
                    <Badge variant="outline" className="ml-4">
                      {alert.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2 text-sky-500" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">AI Engine Performance</span>
                <span className="text-sm font-medium">97%</span>
              </div>
              <Progress value={97} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Network Coverage</span>
                <span className="text-sm font-medium">99.2%</span>
              </div>
              <Progress value={99.2} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Threat Detection Rate</span>
                <span className="text-sm font-medium">98.7%</span>
              </div>
              <Progress value={98.7} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const ReportsContent = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Security Reports</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Weekly Security Summary", date: "June 2, 2024", type: "PDF", size: "2.4 MB" },
          { title: "Threat Intelligence Report", date: "June 1, 2024", type: "PDF", size: "1.8 MB" },
          { title: "Compliance Audit", date: "May 30, 2024", type: "PDF", size: "3.2 MB" },
          { title: "Incident Response Log", date: "May 28, 2024", type: "CSV", size: "456 KB" },
          { title: "Performance Metrics", date: "May 25, 2024", type: "PDF", size: "1.2 MB" },
          { title: "System Health Report", date: "May 23, 2024", type: "PDF", size: "987 KB" }
        ].map((report, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <FileText className="w-8 h-8 text-sky-500" />
                <Badge variant="outline">{report.type}</Badge>
              </div>
              <h4 className="font-medium mb-2">{report.title}</h4>
              <p className="text-sm text-slate-400 mb-2">{report.date}</p>
              <p className="text-xs text-slate-500 mb-4">{report.size}</p>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const SettingsContent = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">Account Settings</h3>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Full Name</Label>
              <Input value={mockUserData.name} className="bg-slate-700 border-slate-600" />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={mockUserData.email} className="bg-slate-700 border-slate-600" />
            </div>
            <div>
              <Label>Company</Label>
              <Input value={mockUserData.company} className="bg-slate-700 border-slate-600" />
            </div>
            <Button className="bg-sky-500 hover:bg-sky-600">Update Profile</Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-slate-400">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">
                <Key className="w-4 h-4 mr-1" />
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">API Access</p>
                <p className="text-sm text-slate-400">Manage API keys and access</p>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-slate-400">Configure alert preferences</p>
              </div>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-1" />
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <section className="py-24 bg-slate-900">
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
                Customer Portal
              </span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Access your personalized security dashboard, reports, and account management
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <LoginForm />
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="portal" className="py-24 bg-slate-900">
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
              Customer Portal
            </span>
          </h2>
          <div className="flex items-center justify-center space-x-4">
            <Badge variant="outline" className="border-sky-500 text-sky-500">
              {mockUserData.plan} Plan
            </Badge>
            <Badge variant="outline" className="border-green-500 text-green-500">
              {mockUserData.endpoints} Endpoints
            </Badge>
          </div>
        </motion.div>

        <motion.div
          className="bg-slate-800/30 rounded-2xl border border-slate-700 overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-b border-slate-700">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Reports</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
            <div className="p-8">
              <TabsContent value="dashboard" className="mt-0">
                <DashboardContent />
              </TabsContent>
              <TabsContent value="alerts" className="mt-0">
                <DashboardContent />
              </TabsContent>
              <TabsContent value="reports" className="mt-0">
                <ReportsContent />
              </TabsContent>
              <TabsContent value="settings" className="mt-0">
                <SettingsContent />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Button 
            onClick={() => setIsLoggedIn(false)} 
            variant="outline" 
            className="border-slate-600 text-slate-400 hover:text-slate-200"
          >
            Sign Out
          </Button>
        </motion.div>
      </div>
    </section>
  );
}