import { motion } from "framer-motion";
import { Lightbulb, BarChart3, Server, Globe, Shield } from "lucide-react";
import { ThreatDetectionGraphic, DashboardGraphic, BrowserPluginGraphic, RedTeamGraphic, MCPServerGraphic } from "./security-graphics";

const features = [
  {
    icon: Lightbulb,
    title: "Multi-LLM Integration",
    description: "Connect to multiple AI providers including OpenAI, Anthropic, Groq, Cohere, and Google AI. Switch between models seamlessly for optimal performance.",
    features: ["OpenAI GPT-4", "Anthropic Claude", "Groq Lightning", "Google Gemini"],
    gradient: "from-sky-500 to-cyan-500",
    graphic: ThreatDetectionGraphic
  },
  {
    icon: BarChart3,
    title: "AI Chat Interface",
    description: "Interactive chat interface with real-time AI responses, provider selection, and conversation history. Built for seamless AI interaction.",
    features: ["Real-Time Chat", "Provider Switching", "Conversation History"],
    gradient: "from-cyan-500 to-teal-500",
    graphic: DashboardGraphic
  },
  {
    icon: Server,
    title: "MCP Protocol Support",
    description: "Full Model Context Protocol integration for connecting to MCP servers, executing tools, and accessing resources across distributed AI systems.",
    features: ["Server Management", "Tool Execution", "Resource Access"],
    gradient: "from-teal-500 to-sky-500",
    graphic: MCPServerGraphic
  },
  {
    icon: Globe,
    title: "Intelligent Agents",
    description: "Deploy autonomous AI agents that can reason, plan, and execute tasks across different environments with advanced decision-making capabilities.",
    features: ["Autonomous Operation", "Multi-Environment", "Smart Decision Making"],
    gradient: "from-purple-500 to-sky-500",
    graphic: BrowserPluginGraphic
  },
  {
    icon: Shield,
    title: "Enterprise Ready",
    description: "Production-ready platform with robust security, scalability, and monitoring. Built for enterprise deployment with comprehensive management tools.",
    features: ["Security Controls", "Scalable Architecture", "Monitoring & Analytics"],
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
              Powerful AI Platform Features
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Advanced LLM integration, MCP protocol support, and intelligent agent deployment for next-generation AI applications
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
