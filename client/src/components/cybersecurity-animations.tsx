import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const NetworkConnectionAnimation: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => {
        const newActive = [...prev];
        const randomNode = Math.floor(Math.random() * 6);
        if (newActive.includes(randomNode)) {
          return newActive.filter(n => n !== randomNode);
        } else {
          return [...newActive, randomNode];
        }
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { x: 50, y: 30, id: 0 },
    { x: 150, y: 50, id: 1 },
    { x: 250, y: 40, id: 2 },
    { x: 80, y: 100, id: 3 },
    { x: 180, y: 120, id: 4 },
    { x: 220, y: 90, id: 5 }
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 1, to: 2 },
    { from: 0, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 1, to: 4 }
  ];

  return (
    <div className="w-full h-40 relative">
      <svg width="100%" height="100%" viewBox="0 0 300 150" className="absolute inset-0">
        {connections.map((conn, index) => {
          const fromNode = nodes[conn.from];
          const toNode = nodes[conn.to];
          const isActive = activeNodes.includes(conn.from) || activeNodes.includes(conn.to);
          
          return (
            <motion.line
              key={index}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={isActive ? "#06b6d4" : "#475569"}
              strokeWidth={isActive ? "2" : "1"}
              opacity={isActive ? 1 : 0.5}
              animate={{
                strokeDasharray: isActive ? "5,5" : "0,0",
                strokeDashoffset: isActive ? [0, -10] : 0
              }}
              transition={{
                strokeDashoffset: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }
              }}
            />
          );
        })}
        
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={activeNodes.includes(node.id) ? "8" : "6"}
            fill={activeNodes.includes(node.id) ? "#06b6d4" : "#64748b"}
            animate={{
              scale: activeNodes.includes(node.id) ? [1, 1.2, 1] : 1,
              opacity: activeNodes.includes(node.id) ? [0.8, 1, 0.8] : 0.7
            }}
            transition={{
              duration: 1.5,
              repeat: activeNodes.includes(node.id) ? Infinity : 0
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export const ThreatDetectionPulse: React.FC = () => {
  return (
    <div className="w-full h-32 flex items-center justify-center relative">
      <motion.div
        className="absolute w-16 h-16 border-2 border-red-500 rounded-full"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.8, 0.2, 0.8]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute w-12 h-12 border-2 border-orange-500 rounded-full"
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.9, 0.3, 0.9]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <motion.div
        className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </motion.div>
    </div>
  );
};

export const SecurityDashboardMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState({
    threats: 247,
    blocked: 1834,
    scanned: 45672
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        threats: prev.threats + Math.floor(Math.random() * 3),
        blocked: prev.blocked + Math.floor(Math.random() * 5),
        scanned: prev.scanned + Math.floor(Math.random() * 50)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      <motion.div 
        className="text-center p-3 bg-slate-700/50 rounded-lg"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div 
          className="text-2xl font-bold text-red-400"
          key={metrics.threats}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {metrics.threats}
        </motion.div>
        <div className="text-xs text-slate-400">Threats</div>
      </motion.div>
      
      <motion.div 
        className="text-center p-3 bg-slate-700/50 rounded-lg"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div 
          className="text-2xl font-bold text-green-400"
          key={metrics.blocked}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {metrics.blocked}
        </motion.div>
        <div className="text-xs text-slate-400">Blocked</div>
      </motion.div>
      
      <motion.div 
        className="text-center p-3 bg-slate-700/50 rounded-lg"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div 
          className="text-2xl font-bold text-cyan-400"
          key={metrics.scanned}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {metrics.scanned.toLocaleString()}
        </motion.div>
        <div className="text-xs text-slate-400">Scanned</div>
      </motion.div>
    </div>
  );
};

export const MCPConnectionFlow: React.FC = () => {
  const [flowDirection, setFlowDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFlowDirection(prev => prev * -1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-32 flex items-center justify-center">
      <div className="flex items-center space-x-8">
        <motion.div 
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-white text-xs font-bold">MCP</div>
        </motion.div>
        
        <motion.div 
          className="flex space-x-2"
          animate={{ x: flowDirection * 10 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          <div className="text-white text-xs font-bold">SEC</div>
        </motion.div>
      </div>
    </div>
  );
};

export const FloatingSecurityBadges: React.FC = () => {
  const badges = [
    { name: "SOC 2", color: "from-blue-500 to-cyan-500" },
    { name: "ISO 27001", color: "from-green-500 to-teal-500" },
    { name: "FedRAMP", color: "from-purple-500 to-blue-500" },
    { name: "GDPR", color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.name}
          className={`px-3 py-1 bg-gradient-to-r ${badge.color} rounded-full text-white text-xs font-semibold`}
          animate={{
            y: [0, -5, 0],
            rotate: [0, 2, 0, -2, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.2 }
          }}
        >
          {badge.name}
        </motion.div>
      ))}
    </div>
  );
};
