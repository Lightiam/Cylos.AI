import { motion } from "framer-motion";

const specs = [
  { metric: "99.9%", label: "Uptime SLA", description: "Enterprise availability guarantee" },
  { metric: "<300ms", label: "Detection Latency", description: "Real-time threat identification" },
  { metric: "1M+", label: "Events/Second", description: "High-throughput processing" },
  { metric: "Zero", label: "Downtime Deploy", description: "Seamless updates" }
];

const detailedSpecs = [
  {
    component: "AI Engine",
    specification: "Multi-model ensemble with continuous learning",
    performance: "10K decisions/sec",
    scalability: "Auto-scaling to 100K+ endpoints"
  },
  {
    component: "Dashboard",
    specification: "Real-time WebSocket updates",
    performance: "<100ms refresh",
    scalability: "Unlimited concurrent users"
  },
  {
    component: "MCP Server",
    specification: "Kubernetes-native architecture",
    performance: "HA with 3-node cluster",
    scalability: "Global multi-region deployment"
  },
  {
    component: "Browser Plugin",
    specification: "Cross-browser compatibility",
    performance: "<50ms URL scanning",
    scalability: "10M+ installations"
  }
];

export default function SpecsSection() {
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
              Technical Specifications
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Enterprise-grade performance and reliability specifications designed for mission-critical security operations
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {specs.map((spec, index) => (
            <motion.div
              key={spec.label}
              className="bg-slate-700/50 rounded-xl p-6 border border-slate-600"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-sky-500 mb-2">{spec.metric}</div>
              <div className="text-sm text-slate-300 mb-1">{spec.label}</div>
              <div className="text-xs text-slate-400">{spec.description}</div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="bg-slate-800/30 rounded-2xl border border-slate-700 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Component</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Specification</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Performance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Scalability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {detailedSpecs.map((spec, index) => (
                  <motion.tr
                    key={spec.component}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <td className="px-6 py-4 text-sm text-slate-300 font-medium">{spec.component}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{spec.specification}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{spec.performance}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">{spec.scalability}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
