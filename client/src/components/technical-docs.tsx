import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Code, 
  Book, 
  Cpu, 
  Network, 
  Shield, 
  Globe, 
  Download,
  Search,
  ExternalLink,
  FileText,
  Settings,
  Terminal,
  Layers
} from "lucide-react";

const documentationSections = [
  {
    id: "api",
    title: "API Reference",
    description: "Complete REST API documentation with examples",
    icon: Code,
    gradient: "from-blue-500 to-cyan-500",
    items: [
      { title: "Authentication", endpoint: "/api/auth", method: "POST", type: "API" },
      { title: "Threat Detection", endpoint: "/api/threats", method: "GET", type: "API" },
      { title: "Alert Management", endpoint: "/api/alerts", method: "GET", type: "API" },
      { title: "Policy Configuration", endpoint: "/api/policies", method: "PUT", type: "API" }
    ]
  },
  {
    id: "architecture",
    title: "System Architecture",
    description: "Technical architecture and component overview",
    icon: Layers,
    gradient: "from-purple-500 to-pink-500",
    items: [
      { title: "AI Engine Design", type: "Architecture Guide" },
      { title: "MCP Server Setup", type: "Configuration" },
      { title: "Database Schema", type: "Reference" },
      { title: "Security Model", type: "Overview" }
    ]
  },
  {
    id: "deployment",
    title: "Deployment Guide",
    description: "Installation and deployment instructions",
    icon: Settings,
    gradient: "from-green-500 to-teal-500",
    items: [
      { title: "Docker Installation", type: "Quick Start" },
      { title: "Kubernetes Deployment", type: "Production" },
      { title: "Cloud Provider Setup", type: "Guide" },
      { title: "Environment Configuration", type: "Reference" }
    ]
  },
  {
    id: "integration",
    title: "Integration Guide",
    description: "Third-party integrations and webhooks",
    icon: Network,
    gradient: "from-orange-500 to-red-500",
    items: [
      { title: "SIEM Integration", type: "Connector" },
      { title: "Webhook Configuration", type: "Setup" },
      { title: "Custom Plugins", type: "Development" },
      { title: "Browser Extension", type: "Installation" }
    ]
  }
];

const codeExamples = {
  authentication: `curl -X POST https://api.cylos.dev/auth \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@company.com",
    "password": "your_password"
  }'`,
  
  threatDetection: `curl -X GET https://api.cylos.dev/threats \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json"`,
  
  alertManagement: `curl -X GET https://api.cylos.dev/alerts \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -G -d "severity=critical" -d "limit=10"`
};

const sdkExamples = {
  javascript: `import { CylosAPI } from '@cylos/sdk';

const client = new CylosAPI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.cylos.dev'
});

// Get threat data
const threats = await client.threats.list({
  severity: 'critical',
  limit: 10
});`,

  python: `from cylos import CylosAPI

client = CylosAPI(
    api_key="your-api-key",
    base_url="https://api.cylos.dev"
)

# Get threat data
threats = client.threats.list(
    severity="critical",
    limit=10
)`
};

export default function TechnicalDocs() {
  const [activeSection, setActiveSection] = useState("api");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const ApiReference = () => (
    <div className="space-y-6">
      <div className="grid gap-6">
        {documentationSections[0].items.map((item, index) => (
          <Card key={index} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <div className="flex items-center space-x-2">
                  {'method' in item && (
                    <Badge variant="outline" className="border-blue-500 text-blue-500">
                      {item.method}
                    </Badge>
                  )}
                  {'endpoint' in item && (
                    <code className="text-sm bg-slate-700 px-2 py-1 rounded">
                      {item.endpoint}
                    </code>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-green-400">
                  <code>{codeExamples.authentication}</code>
                </pre>
              </div>
              <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Try in Postman
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Download OpenAPI
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const SDKDocumentation = () => (
    <div className="space-y-6">
      <Tabs defaultValue="javascript" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800">
          <TabsTrigger value="javascript">JavaScript/Node.js</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="go">Go</TabsTrigger>
        </TabsList>
        <TabsContent value="javascript" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4">
                <code className="text-green-400">npm install @cylos/sdk</code>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-green-400">
                  <code>{sdkExamples.javascript}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="python" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4">
                <code className="text-green-400">pip install cylos-sdk</code>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-green-400">
                  <code>{sdkExamples.python}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="go" className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>Go SDK is in development</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">
                Request Early Access
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const DeploymentGuide = () => (
    <div className="space-y-6">
      {documentationSections[2].items.map((item, index) => (
        <Card key={index} className="bg-slate-800 border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>Step-by-step {item.type.toLowerCase()} guide</CardDescription>
              </div>
              <Badge variant="outline">{item.type}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-1" />
                View Guide
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                Video Tutorial
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="py-24 bg-slate-800/50">
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
              Technical Documentation
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive guides, API references, and integration documentation for developers
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-slate-50"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          {documentationSections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                  activeSection === section.id
                    ? "border-sky-500 bg-sky-500/10"
                    : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveSection(section.id)}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${section.gradient} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{section.title}</h3>
                <p className="text-sm text-slate-400">{section.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="bg-slate-800/30 rounded-2xl border border-slate-700"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-b border-slate-700">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <Book className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="api" className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>API Reference</span>
              </TabsTrigger>
              <TabsTrigger value="sdk" className="flex items-center space-x-2">
                <Terminal className="w-4 h-4" />
                <span>SDKs</span>
              </TabsTrigger>
              <TabsTrigger value="deployment" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Deployment</span>
              </TabsTrigger>
            </TabsList>
            <div className="p-8">
              <TabsContent value="overview" className="mt-0">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Getting Started</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Cpu className="w-5 h-5 mr-2 text-sky-500" />
                          System Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li>• Node.js 18+ or Python 3.8+</li>
                          <li>• Docker 20.10+ (for containerized deployment)</li>
                          <li>• Kubernetes 1.20+ (for production)</li>
                          <li>• PostgreSQL 13+ or MongoDB 5.0+</li>
                          <li>• Minimum 8GB RAM, 4 CPU cores</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-800 border-slate-700">
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Shield className="w-5 h-5 mr-2 text-green-500" />
                          Security Features
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-slate-300">
                          <li>• End-to-end encryption (AES-256)</li>
                          <li>• OAuth 2.0 / JWT authentication</li>
                          <li>• Role-based access control</li>
                          <li>• API rate limiting</li>
                          <li>• Audit logging and compliance</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="api" className="mt-0">
                <ApiReference />
              </TabsContent>
              <TabsContent value="sdk" className="mt-0">
                <SDKDocumentation />
              </TabsContent>
              <TabsContent value="deployment" className="mt-0">
                <DeploymentGuide />
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}