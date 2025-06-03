import { motion } from "framer-motion";
import { Lock, Shield, FileCheck, Award } from "lucide-react";
import { ThreatDetectionGraphic } from "./security-graphics";

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "All data encrypted in transit and at rest with AES-256 encryption and perfect forward secrecy"
  },
  {
    icon: Shield,
    title: "AI Security Controls",
    description: "Advanced protection against agent hijacking, memory poisoning, and goal manipulation attacks"
  },
  {
    icon: FileCheck,
    title: "Compliance Ready",
    description: "SOC 2 Type II, FedRAMP, NIST, PCI DSS, and GDPR compliance with automated reporting"
  }
];

const complianceBadges = [
  { name: "SOC 2 Type II", color: "text-sky-500" },
  { name: "FedRAMP", color: "text-cyan-500" },
  { name: "NIST Framework", color: "text-teal-500" },
  { name: "ISO 27001", color: "text-green-400" }
];

export default function SecuritySection() {
  return (
    <section id="security" className="py-24 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">
                Enterprise-Grade Security
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Built with security-first principles and comprehensive compliance frameworks to meet the most stringent enterprise requirements.
            </p>

            <div className="space-y-6">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {complianceBadges.map((badge) => (
                <div key={badge.name} className="bg-slate-700/50 px-4 py-2 rounded-lg border border-slate-600">
                  <span className={`text-sm font-medium ${badge.color}`}>{badge.name}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-900/50 rounded-2xl border border-slate-700 p-6 shadow-2xl shadow-sky-500/20 h-96">
              <ThreatDetectionGraphic />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
