import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function HeroSection() {
  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-cyan-500/10"></div>
      
      {/* Floating background elements */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                Cylos AI Platform
              </span>
              <br />
              <span className="text-slate-50">Intelligent AI Agents</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Deploy intelligent AI agents powered by advanced LLMs and MCP protocols. Autonomous monitoring, intelligent decision-making, and seamless integration across cloud, on-premises, and browser environments with cutting-edge AI capabilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={scrollToDemo}
                className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-8 py-4 text-lg font-semibold hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300"
                size="lg"
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline"
                onClick={scrollToDemo}
                className="border-sky-500 text-sky-500 px-8 py-4 text-lg font-semibold hover:bg-sky-500/10 transition-all duration-300"
                size="lg"
              >
                View Live Demo
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-2 sm:space-y-0 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span>FedRAMP Ready</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-teal-500" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Cylos AI dashboard with intelligent agent monitoring interfaces"
              className="rounded-2xl shadow-2xl shadow-sky-500/20 w-full"
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
