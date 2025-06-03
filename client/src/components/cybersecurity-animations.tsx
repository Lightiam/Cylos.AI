import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function NetworkConnectionAnimation() {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => {
        const newActive = [...prev];
        const randomNode = Math.floor(Math.random() * 8);
        if (newActive.includes(randomNode)) {
          return newActive.filter(n => n !== randomNode);
        } else {
          return [...newActive, randomNode].slice(-3);
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Network connections */}
        <motion.path
          d="M50,50 Q200,20 350,50"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M50,100 Q200,130 350,100"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.path
          d="M50,150 Q200,120 350,150"
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Network nodes */}
        {[
          { x: 50, y: 50, id: 0 },
          { x: 150, y: 30, id: 1 },
          { x: 250, y: 70, id: 2 },
          { x: 350, y: 50, id: 3 },
          { x: 50, y: 100, id: 4 },
          { x: 200, y: 100, id: 5 },
          { x: 350, y: 100, id: 6 },
          { x: 200, y: 150, id: 7 }
        ].map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="6"
            fill={activeNodes.includes(node.id) ? "#06b6d4" : "#475569"}
            filter={activeNodes.includes(node.id) ? "url(#glow)" : "none"}
            animate={{
              scale: activeNodes.includes(node.id) ? [1, 1.3, 1] : 1,
              opacity: activeNodes.includes(node.id) ? [0.7, 1, 0.7] : 0.6
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        ))}

        {/* Data flow particles */}
        <motion.circle
          cx="0"
          cy="50"
          r="3"
          fill="#06b6d4"
          filter="url(#glow)"
          animate={{ cx: [50, 350] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle
          cx="0"
          cy="100"
          r="3"
          fill="#0ea5e9"
          filter="url(#glow)"
          animate={{ cx: [50, 350] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
        />
      </svg>
    </div>
  );
}

export function ThreatDetectionPulse() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <motion.div
        className="absolute w-32 h-32 border-2 border-red-500 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 0.3, 0.8]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-24 h-24 border-2 border-orange-500 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.2, 0.6]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.div
        className="absolute w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360]
        }}
        transition={{ 
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 8, repeat: Infinity, ease: "linear" }
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>
      
      {/* Threat indicators */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-red-400 rounded-full"
          style={{
            left: `${50 + Math.cos(i * Math.PI / 2) * 60}%`,
            top: `${50 + Math.sin(i * Math.PI / 2) * 60}%`
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export function SecurityDashboardMetrics() {
  const [metrics, setMetrics] = useState([
    { label: "Threats Blocked", value: 1247, trend: "up" },
    { label: "Active Scans", value: 23, trend: "stable" },
    { label: "Response Time", value: 0.3, trend: "down" },
    { label: "System Health", value: 99.8, trend: "up" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.label === "Threats Blocked" 
          ? metric.value + Math.floor(Math.random() * 3)
          : metric.value + (Math.random() - 0.5) * 0.1
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          className="bg-slate-800/50 rounded-lg p-3 border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="text-xs text-slate-400 mb-1">{metric.label}</div>
          <motion.div
            className="text-lg font-bold text-cyan-400"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            {typeof metric.value === 'number' && metric.value < 10 
              ? metric.value.toFixed(1) 
              : Math.floor(metric.value)}
            {metric.label === "System Health" && "%"}
            {metric.label === "Response Time" && "s"}
          </motion.div>
          <div className="flex items-center mt-1">
            <motion.div
              className={`w-2 h-2 rounded-full mr-1 ${
                metric.trend === "up" ? "bg-green-500" : 
                metric.trend === "down" ? "bg-red-500" : "bg-yellow-500"
              }`}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs text-slate-500">
              {metric.trend === "up" ? "↗" : metric.trend === "down" ? "↘" : "→"}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function MCPConnectionFlow() {
  const [activeConnection, setActiveConnection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection(prev => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const connections = [
    { from: { x: 50, y: 100 }, to: { x: 150, y: 50 }, label: "Auth" },
    { from: { x: 50, y: 100 }, to: { x: 150, y: 100 }, label: "Data" },
    { from: { x: 50, y: 100 }, to: { x: 150, y: 150 }, label: "Tools" },
    { from: { x: 150, y: 100 }, to: { x: 250, y: 100 }, label: "Response" }
  ];

  return (
    <div className="relative w-full h-48">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200">
        <defs>
          <linearGradient id="mcpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>

        {/* MCP Server */}
        <motion.rect
          x="30"
          y="80"
          width="40"
          height="40"
          rx="8"
          fill="url(#mcpGradient)"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x="50" y="105" textAnchor="middle" className="fill-white text-xs font-bold">MCP</text>

        {/* Security Tools */}
        {[
          { x: 130, y: 30, label: "SIEM" },
          { x: 130, y: 80, label: "EDR" },
          { x: 130, y: 130, label: "SOAR" }
        ].map((tool, index) => (
          <motion.g key={tool.label}>
            <motion.rect
              x={tool.x}
              y={tool.y}
              width="40"
              height="40"
              rx="6"
              fill="#475569"
              animate={{
                fill: activeConnection === index ? "#06b6d4" : "#475569"
              }}
              transition={{ duration: 0.5 }}
            />
            <text x={tool.x + 20} y={tool.y + 25} textAnchor="middle" className="fill-white text-xs">
              {tool.label}
            </text>
          </motion.g>
        ))}

        {/* Response Center */}
        <motion.rect
          x="230"
          y="80"
          width="40"
          height="40"
          rx="8"
          fill="#10b981"
          animate={{
            opacity: activeConnection === 3 ? [0.7, 1, 0.7] : 0.7
          }}
          transition={{ duration: 1, repeat: activeConnection === 3 ? Infinity : 0 }}
        />
        <text x="250" y="105" textAnchor="middle" className="fill-white text-xs font-bold">SOC</text>

        {/* Connection lines */}
        {connections.map((conn, index) => (
          <motion.line
            key={index}
            x1={conn.from.x + 20}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="#06b6d4"
            strokeWidth="2"
            strokeDasharray="5,5"
            animate={{
              strokeDashoffset: activeConnection === index ? [0, -10] : 0,
              opacity: activeConnection === index ? 1 : 0.3
            }}
            transition={{ 
              strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" },
              opacity: { duration: 0.5 }
            }}
          />
        ))}

        {/* Data packets */}
        {activeConnection < 3 && (
          <motion.circle
            cx="0"
            cy="0"
            r="3"
            fill="#06b6d4"
            animate={{
              cx: [connections[activeConnection].from.x + 20, connections[activeConnection].to.x],
              cy: [connections[activeConnection].from.y, connections[activeConnection].to.y]
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        )}
      </svg>
    </div>
  );
}

export function FloatingSecurityBadges() {
  const badges = [
    { text: "SOC 2", color: "from-blue-500 to-cyan-500", delay: 0 },
    { text: "ISO 27001", color: "from-green-500 to-teal-500", delay: 0.5 },
    { text: "FedRAMP", color: "from-purple-500 to-blue-500", delay: 1 },
    { text: "GDPR", color: "from-orange-500 to-red-500", delay: 1.5 }
  ];

  return (
    <div className="relative w-full h-32 overflow-hidden">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.text}
          className={`absolute px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${badge.color} shadow-lg`}
          style={{
            left: `${20 + index * 20}%`,
            top: `${30 + (index % 2) * 40}%`
          }}
          animate={{
            y: [-10, 10, -10],
            rotate: [-2, 2, -2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: badge.delay
          }}
        >
          {badge.text}
        </motion.div>
      ))}
    </div>
  );
}
