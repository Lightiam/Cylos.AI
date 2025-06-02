import { motion } from "framer-motion";
import { Lightbulb, BarChart3, Server, Globe, Shield } from "lucide-react";
import { ThreatDetectionGraphic, DashboardGraphic, BrowserPluginGraphic, RedTeamGraphic, MCPServerGraphic } from "./security-graphics";

const features = [
  {
    icon: Lightbulb,
    title: "Agentic AI Engine",
    description: "Autonomous AI agents that plan, reason, and execute security tasks without human intervention. Continuously learns and adapts to new threats.",
    features: ["Tool Integration", "Continuous Learning", "Autonomous Operation"],
    gradient: "from-sky-500 to-cyan-500",
    graphic: ThreatDetectionGraphic
  },
  {
    icon: BarChart3,
    title: "Alert Dashboard",
    description: "Real-time monitoring interface with customizable views, historical analysis, and role-based access control for security teams.",
    features: ["Real-Time Monitoring", "Historical Analysis", "Customizable Views"],
    gradient: "from-cyan-500 to-teal-500",
    graphic: DashboardGraphic
  },
  {
    icon: Server,
    title: "MCP Server",
    description: "Centralized management and control plane for all agentic AI instances. Handles policy distribution and centralized logging.",
    features: ["Centralized Management", "Policy Enforcement", "Logging & Reporting"],
    gradient: "from-teal-500 to-sky-500",
    graphic: MCPServerGraphic
  },
  {
    icon: Globe,
    title: "Browser Plugin",
    description: "Browser-level monitoring for Chrome, Firefox, and Edge. Detects phishing, malicious scripts, and provides real-time user feedback.",
    features: ["Browser Integration", "Threat Detection", "Real-Time Feedback"],
    gradient: "from-purple-500 to-sky-500",
    graphic: BrowserPluginGraphic
  },
  {
    icon: Shield,
    title: "Red Teaming Integration",
    description: "Quarterly adversarial simulations that continuously validate security controls through automated testing of 12 critical threat vectors.",
    features: ["Agent Hijacking Tests", "Memory Poisoning Detection", "Multi-Agent Exploitation"],
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
              Five Core Components
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive security coverage through autonomous AI agents, centralized management, and continuous validation
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
