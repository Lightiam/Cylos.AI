import { motion } from "framer-motion";
import { Zap, Shield, Database } from "lucide-react";

const architectureNodes = [
  {
    title: "Cloud Environment",
    description: "AWS, Azure, GCP monitoring with autonomous threat detection",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200",
    gradient: "from-sky-500/20 to-cyan-500/20",
    borderColor: "border-sky-500/30 hover:border-sky-500/60"
  },
  {
    title: "MCP Control Center",
    description: "Centralized management, policy distribution, and logging",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200",
    gradient: "from-cyan-500/20 to-teal-500/20",
    borderColor: "border-cyan-500/30 hover:border-cyan-500/60"
  },
  {
    title: "On-Premises",
    description: "Private data center protection with hybrid deployment",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200",
    gradient: "from-teal-500/20 to-purple-500/20",
    borderColor: "border-teal-500/30 hover:border-teal-500/60"
  }
];

const features = [
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Sub-second threat detection and response across all environments",
    gradient: "from-sky-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Zero Trust Security",
    description: "Continuous verification and validation of all network traffic",
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    icon: Database,
    title: "Unified Data Lake",
    description: "Centralized security analytics and threat intelligence platform",
    gradient: "from-teal-500 to-purple-500"
  }
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 bg-slate-900">
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
              System Architecture
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Explore how our components work together to provide comprehensive security coverage across cloud and on-premises environments
          </p>
        </motion.div>

        <motion.div 
          className="relative bg-slate-800/30 rounded-2xl p-8 border border-slate-700 mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-96">
            {architectureNodes.map((node, index) => (
              <motion.div
                key={node.title}
                className={`relative bg-gradient-to-br ${node.gradient} rounded-xl p-6 h-full border ${node.borderColor} cursor-pointer transition-all duration-300`}
                whileHover={{ scale: 1.05, z: 10 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold text-sky-500 mb-2">{node.title}</h3>
                <img
                  src={node.image}
                  alt={node.description}
                  className="rounded-lg mb-3 w-full h-32 object-cover"
                />
                <p className="text-sm text-slate-300">{node.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Connection Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#0ea5e9', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#06b6d4', stopOpacity: 0.8 }} />
                <stop offset="100%" style={{ stopColor: '#14b8a6', stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>
            <motion.path
              d="M 15 50 Q 50 30 85 50"
              stroke="url(#connectionGradient)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M 15 50 Q 50 70 85 50"
              stroke="url(#connectionGradient)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </svg>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
