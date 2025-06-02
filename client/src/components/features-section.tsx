import { motion } from "framer-motion";
import { Lightbulb, BarChart3, Server, Globe, Shield } from "lucide-react";
import { ThreatDetectionGraphic, DashboardGraphic, BrowserPluginGraphic, RedTeamGraphic, MCPServerGraphic } from "./security-graphics";

const features = [
  {
    icon: Lightbulb,
    title: "AI-Powered Threat Detection",
    description: "Advanced threat detection using multiple LLM providers including OpenAI, Anthropic, and Groq for intelligent security analysis and pattern recognition.",
    features: ["Real-time Analysis", "Pattern Recognition", "Behavioral Detection", "Anomaly Identification"],
    gradient: "from-sky-500 to-cyan-500",
    graphic: ThreatDetectionGraphic
  },
  {
    icon: BarChart3,
    title: "Security Dashboard",
    description: "Real-time security monitoring interface with AI-enhanced analytics, threat visualization, and intelligent incident management.",
    features: ["Real-Time Monitoring", "Threat Analytics", "Incident Response", "Security Metrics"],
    gradient: "from-cyan-500 to-teal-500",
    graphic: DashboardGraphic
  },
  {
    icon: Server,
    title: "MCP Security Integration",
    description: "Model Context Protocol integration for distributed security operations, connecting security tools, and coordinating threat response across systems.",
    features: ["Security Orchestration", "Tool Integration", "Threat Coordination"],
    gradient: "from-teal-500 to-sky-500",
    graphic: MCPServerGraphic
  },
  {
    icon: Globe,
    title: "Security Agents",
    description: "Deploy autonomous security agents that can detect, analyze, and respond to threats across different environments with intelligent decision-making.",
    features: ["Autonomous Response", "Multi-Environment", "Threat Intelligence"],
    gradient: "from-purple-500 to-sky-500",
    graphic: BrowserPluginGraphic
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Production-ready cybersecurity platform with advanced threat protection, compliance monitoring, and enterprise-grade security controls.",
    features: ["Advanced Protection", "Compliance Monitoring", "Enterprise Controls"],
    gradient: "from-red-500 to-sky-500",
    graphic: RedTeamGraphic,
    isWide: true
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-slate-800/50">
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
              Advanced Cybersecurity Features
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            AI-powered threat detection, LLM-enhanced security analysis, and intelligent agent deployment for next-generation cybersecurity protection
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className={`bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 ${
                  feature.isWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                
                {feature.isWide ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-slate-300 mb-4">{feature.description}</p>
                      <ul className="space-y-2 text-sm text-slate-400">
                        {feature.features.map((item) => (
                          <li key={item} className="flex items-center">
                            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
                      <feature.graphic />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="bg-slate-900/50 rounded-lg p-4 mb-6 border border-slate-700 h-48">
                      <feature.graphic />
                    </div>
                    <p className="text-slate-300 mb-4">{feature.description}</p>
                    <ul className="space-y-2 text-sm text-slate-400">
                      {feature.features.map((item) => (
                        <li key={item} className="flex items-center">
                          <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
