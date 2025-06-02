// High-quality SVG graphics for Cylos Agentic AI Security System

export const ThreatDetectionGraphic = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="threatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    {/* Background Grid */}
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" opacity="0.3"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)" />
    
    {/* Central Shield */}
    <g transform="translate(200,150)">
      <path d="M0,-60 L40,-40 L40,20 Q40,40 0,50 Q-40,40 -40,20 L-40,-40 Z" 
            fill="url(#threatGradient)" 
            filter="url(#glow)" 
            opacity="0.9"/>
      <path d="M0,-45 L25,-30 L25,15 Q25,30 0,37 Q-25,30 -25,15 L-25,-30 Z" 
            fill="#1e293b" 
            opacity="0.8"/>
      
      {/* AI Core */}
      <circle cx="0" cy="-10" r="15" fill="#0ea5e9" opacity="0.7"/>
      <circle cx="0" cy="-10" r="8" fill="#ffffff" opacity="0.9"/>
      <text x="0" y="-6" textAnchor="middle" fill="#1e293b" fontSize="8" fontWeight="bold">AI</text>
    </g>
    
    {/* Threat Indicators */}
    <g className="animate-pulse">
      <circle cx="80" cy="80" r="6" fill="#ef4444" opacity="0.8"/>
      <circle cx="320" cy="100" r="5" fill="#f59e0b" opacity="0.8"/>
      <circle cx="100" cy="220" r="4" fill="#ef4444" opacity="0.8"/>
      <circle cx="300" cy="200" r="7" fill="#dc2626" opacity="0.8"/>
    </g>
    
    {/* Detection Waves */}
    <g transform="translate(200,150)" className="animate-spin" style={{animationDuration: '8s'}}>
      <circle cx="0" cy="0" r="70" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.3" strokeDasharray="5,5"/>
      <circle cx="0" cy="0" r="90" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.2" strokeDasharray="10,10"/>
      <circle cx="0" cy="0" r="110" fill="none" stroke="#0ea5e9" strokeWidth="1" opacity="0.1" strokeDasharray="15,15"/>
    </g>
    
    {/* Data Flow Lines */}
    <g>
      <path d="M80,80 Q150,120 200,150" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.6" strokeDasharray="3,3">
        <animate attributeName="stroke-dashoffset" values="0;-20" dur="2s" repeatCount="indefinite"/>
      </path>
      <path d="M320,100 Q260,125 200,150" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.6" strokeDasharray="3,3">
        <animate attributeName="stroke-dashoffset" values="0;-20" dur="2.5s" repeatCount="indefinite"/>
      </path>
    </g>
  </svg>
);

export const DashboardGraphic = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="dashGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    
    {/* Dashboard Frame */}
    <rect x="20" y="20" width="360" height="260" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
    
    {/* Header Bar */}
    <rect x="20" y="20" width="360" height="40" rx="10" fill="url(#dashGradient)" opacity="0.8"/>
    <text x="40" y="42" fill="white" fontSize="14" fontWeight="bold">Security Dashboard</text>
    
    {/* Status Indicators */}
    <circle cx="340" cy="40" r="6" fill="#10b981"/>
    <circle cx="320" cy="40" r="6" fill="#f59e0b"/>
    <circle cx="300" cy="40" r="6" fill="#ef4444"/>
    
    {/* Charts and Graphs */}
    <g transform="translate(40,80)">
      {/* Threat Timeline */}
      <rect x="0" y="0" width="150" height="80" fill="#0f172a" rx="5"/>
      <text x="75" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10">Threat Timeline</text>
      
      {/* Chart Lines */}
      <polyline points="10,60 30,45 50,35 70,50 90,25 110,40 130,20" 
                fill="none" stroke="#0ea5e9" strokeWidth="2"/>
      <polyline points="10,65 30,55 50,45 70,60 90,35 110,50 130,30" 
                fill="none" stroke="#06b6d4" strokeWidth="2"/>
    </g>
    
    <g transform="translate(210,80)">
      {/* Alert Summary */}
      <rect x="0" y="0" width="150" height="80" fill="#0f172a" rx="5"/>
      <text x="75" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10">Alert Summary</text>
      
      {/* Bars */}
      <rect x="20" y="25" width="15" height="40" fill="#ef4444"/>
      <rect x="45" y="35" width="15" height="30" fill="#f59e0b"/>
      <rect x="70" y="30" width="15" height="35" fill="#10b981"/>
      <rect x="95" y="40" width="15" height="25" fill="#0ea5e9"/>
      <rect x="120" y="20" width="15" height="45" fill="#06b6d4"/>
    </g>
    
    {/* System Status */}
    <g transform="translate(40,180)">
      <rect x="0" y="0" width="320" height="80" fill="#0f172a" rx="5"/>
      <text x="160" y="15" textAnchor="middle" fill="#94a3b8" fontSize="10">System Status</text>
      
      {/* Status Rows */}
      <g transform="translate(20,25)">
        <circle cx="5" cy="8" r="3" fill="#10b981"/>
        <text x="15" y="12" fill="#e2e8f0" fontSize="9">AI Engine: Active</text>
        
        <circle cx="5" cy="23" r="3" fill="#10b981"/>
        <text x="15" y="27" fill="#e2e8f0" fontSize="9">Threat Detection: Online</text>
        
        <circle cx="5" cy="38" r="3" fill="#f59e0b"/>
        <text x="15" y="42" fill="#e2e8f0" fontSize="9">Plugin Sync: Warning</text>
        
        <circle cx="160" cy="8" r="3" fill="#10b981"/>
        <text x="170" y="12" fill="#e2e8f0" fontSize="9">Red Team: Scanning</text>
        
        <circle cx="160" cy="23" r="3" fill="#0ea5e9"/>
        <text x="170" y="27" fill="#e2e8f0" fontSize="9">MCP Server: Updated</text>
        
        <circle cx="160" cy="38" r="3" fill="#10b981"/>
        <text x="170" y="42" fill="#e2e8f0" fontSize="9">Database: Healthy</text>
      </g>
    </g>
  </svg>
);

export const BrowserPluginGraphic = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="browserGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    
    {/* Browser Window */}
    <rect x="50" y="50" width="300" height="200" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2"/>
    
    {/* Browser Header */}
    <rect x="50" y="50" width="300" height="30" rx="8" fill="#374151"/>
    <circle cx="70" cy="65" r="5" fill="#ef4444"/>
    <circle cx="90" cy="65" r="5" fill="#f59e0b"/>
    <circle cx="110" cy="65" r="5" fill="#10b981"/>
    
    {/* Address Bar */}
    <rect x="140" y="55" width="160" height="20" rx="10" fill="#0f172a" stroke="#374151"/>
    <text x="150" y="67" fill="#94a3b8" fontSize="8">https://secure-site.com</text>
    
    {/* Plugin Icon */}
    <rect x="310" y="55" width="25" height="20" rx="3" fill="url(#browserGradient)" opacity="0.8"/>
    <text x="322" y="67" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">AI</text>
    
    {/* Website Content */}
    <rect x="70" y="100" width="260" height="15" fill="#374151" rx="3"/>
    <rect x="70" y="125" width="180" fill="#374151" rx="3"/>
    <rect x="70" y="140" width="220" height="10" fill="#374151" rx="3"/>
    
    {/* Security Scan Animation */}
    <g className="animate-pulse">
      <rect x="60" y="90" width="280" height="120" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,5" rx="5" opacity="0.6"/>
    </g>
    
    {/* Threat Detection Overlay */}
    <g transform="translate(200,160)">
      <circle r="40" fill="#ef4444" opacity="0.1"/>
      <circle r="25" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.7"/>
      <path d="M-10,-10 L10,10 M10,-10 L-10,10" stroke="#ef4444" strokeWidth="3"/>
      <text y="55" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Threat Blocked</text>
    </g>
    
    {/* Real-time Status */}
    <g transform="translate(60,220)">
      <rect width="80" height="25" fill="#0f172a" rx="3"/>
      <circle cx="10" cy="12" r="4" fill="#10b981" className="animate-pulse"/>
      <text x="20" y="16" fill="#e2e8f0" fontSize="9">Protected</text>
    </g>
    
    <g transform="translate(260,220)">
      <rect width="70" height="25" fill="#0f172a" rx="3"/>
      <text x="35" y="16" textAnchor="middle" fill="#0ea5e9" fontSize="9">0 Threats</text>
    </g>
  </svg>
);

export const RedTeamGraphic = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
      <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0ea5e9" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    
    {/* Network Nodes */}
    <g>
      {/* Blue Team (Defense) */}
      <g transform="translate(100,150)">
        <circle r="30" fill="url(#blueGradient)" opacity="0.7"/>
        <circle r="20" fill="#1e293b"/>
        <text textAnchor="middle" y="5" fill="#0ea5e9" fontSize="12" fontWeight="bold">DEF</text>
        
        {/* Defense Barriers */}
        <circle r="50" fill="none" stroke="#0ea5e9" strokeWidth="2" opacity="0.5" strokeDasharray="3,3"/>
        <circle r="70" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.3" strokeDasharray="5,5"/>
      </g>
      
      {/* Red Team (Attack) */}
      <g transform="translate(300,150)">
        <circle r="30" fill="url(#redGradient)" opacity="0.7"/>
        <circle r="20" fill="#1e293b"/>
        <text textAnchor="middle" y="5" fill="#ef4444" fontSize="12" fontWeight="bold">ATK</text>
        
        {/* Attack Vectors */}
        <g className="animate-pulse">
          <path d="M-25,-25 L-35,-35" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
          <path d="M25,-25 L35,-35" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
          <path d="M25,25 L35,35" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
          <path d="M-25,25 L-35,35" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrowRed)"/>
        </g>
      </g>
    </g>
    
    {/* Attack Simulation */}
    <g>
      <path d="M280,150 Q240,120 200,150" fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.8" strokeDasharray="5,5">
        <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite"/>
      </path>
      <text x="240" y="130" textAnchor="middle" fill="#ef4444" fontSize="10">Simulated Attack</text>
    </g>
    
    {/* Defense Response */}
    <g>
      <path d="M120,150 Q160,180 200,150" fill="none" stroke="#0ea5e9" strokeWidth="3" opacity="0.8" strokeDasharray="3,3">
        <animate attributeName="stroke-dashoffset" values="0;-15" dur="2s" repeatCount="indefinite"/>
      </path>
      <text x="160" y="190" textAnchor="middle" fill="#0ea5e9" fontSize="10">Defense Response</text>
    </g>
    
    {/* Central AI Coordinator */}
    <g transform="translate(200,150)">
      <circle r="15" fill="#0f172a" stroke="#64748b" strokeWidth="2"/>
      <text textAnchor="middle" y="4" fill="#e2e8f0" fontSize="10" fontWeight="bold">AI</text>
    </g>
    
    {/* Vulnerability Scanner */}
    <g transform="translate(200,80)">
      <rect x="-40" y="-15" width="80" height="30" fill="#0f172a" stroke="#374151" rx="5"/>
      <text textAnchor="middle" y="5" fill="#e2e8f0" fontSize="9">Vulnerability Scanner</text>
      
      {/* Scan Lines */}
      <g className="animate-pulse">
        <line x1="-30" y1="20" x2="30" y2="20" stroke="#f59e0b" strokeWidth="1"/>
        <line x1="-30" y1="25" x2="30" y2="25" stroke="#f59e0b" strokeWidth="1" opacity="0.7"/>
        <line x1="-30" y1="30" x2="30" y2="30" stroke="#f59e0b" strokeWidth="1" opacity="0.5"/>
      </g>
    </g>
    
    {/* Results Panel */}
    <g transform="translate(200,230)">
      <rect x="-60" y="-20" width="120" height="40" fill="#0f172a" stroke="#374151" rx="5"/>
      <text textAnchor="middle" y="-8" fill="#e2e8f0" fontSize="9">Assessment Results</text>
      <text x="-50" y="5" fill="#10b981" fontSize="8">✓ 23 Tests Passed</text>
      <text x="-50" y="15" fill="#f59e0b" fontSize="8">⚠ 3 Warnings</text>
    </g>
    
    {/* Arrow Markers */}
    <defs>
      <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
        <polygon points="0,0 0,6 9,3" fill="#ef4444"/>
      </marker>
    </defs>
  </svg>
);

export const MCPServerGraphic = () => (
  <svg viewBox="0 0 400 300" className="w-full h-full">
    <defs>
      <linearGradient id="serverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    
    {/* Central Server */}
    <g transform="translate(200,150)">
      <rect x="-40" y="-60" width="80" height="120" fill="url(#serverGradient)" rx="8" opacity="0.8"/>
      <rect x="-35" y="-55" width="70" height="110" fill="#1e293b" rx="5"/>
      
      {/* Server Lights */}
      <circle cx="-25" cy="-40" r="3" fill="#10b981" className="animate-pulse"/>
      <circle cx="-10" cy="-40" r="3" fill="#0ea5e9" className="animate-pulse" style={{animationDelay: '0.5s'}}/>
      <circle cx="5" cy="-40" r="3" fill="#f59e0b" className="animate-pulse" style={{animationDelay: '1s'}}/>
      <circle cx="20" cy="-40" r="3" fill="#ef4444" className="animate-pulse" style={{animationDelay: '1.5s'}}/>
      
      {/* Server Slots */}
      <rect x="-30" y="-25" width="60" height="8" fill="#374151" rx="2"/>
      <rect x="-30" y="-10" width="60" height="8" fill="#374151" rx="2"/>
      <rect x="-30" y="5" width="60" height="8" fill="#374151" rx="2"/>
      <rect x="-30" y="20" width="60" height="8" fill="#374151" rx="2"/>
      <rect x="-30" y="35" width="60" height="8" fill="#374151" rx="2"/>
      
      <text y="75" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="bold">MCP Server</text>
    </g>
    
    {/* Connected Components */}
    <g>
      {/* AI Engine */}
      <g transform="translate(80,80)">
        <circle r="25" fill="#0ea5e9" opacity="0.2"/>
        <circle r="15" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2"/>
        <text textAnchor="middle" y="4" fill="#0ea5e9" fontSize="10" fontWeight="bold">AI</text>
        <text y="35" textAnchor="middle" fill="#e2e8f0" fontSize="9">AI Engine</text>
      </g>
      
      {/* Browser Plugin */}
      <g transform="translate(320,80)">
        <rect x="-15" y="-10" width="30" height="20" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" rx="3"/>
        <text textAnchor="middle" y="4" fill="#06b6d4" fontSize="8" fontWeight="bold">WEB</text>
        <text y="35" textAnchor="middle" fill="#e2e8f0" fontSize="9">Browser Plugin</text>
      </g>
      
      {/* Dashboard */}
      <g transform="translate(80,220)">
        <rect x="-20" y="-10" width="40" height="20" fill="#0f172a" stroke="#10b981" strokeWidth="2" rx="3"/>
        <rect x="-15" y="-5" width="30" height="3" fill="#10b981"/>
        <rect x="-15" y="0" width="20" height="2" fill="#10b981" opacity="0.7"/>
        <rect x="-15" y="5" width="25" height="2" fill="#10b981" opacity="0.5"/>
        <text y="35" textAnchor="middle" fill="#e2e8f0" fontSize="9">Dashboard</text>
      </g>
      
      {/* Red Team */}
      <g transform="translate(320,220)">
        <polygon points="0,-15 13,8 -13,8" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
        <text textAnchor="middle" y="2" fill="#ef4444" fontSize="8" fontWeight="bold">RT</text>
        <text y="35" textAnchor="middle" fill="#e2e8f0" fontSize="9">Red Team</text>
      </g>
    </g>
    
    {/* Connection Lines */}
    <g>
      <path d="M105,95 L175,135" stroke="#0ea5e9" strokeWidth="2" opacity="0.7" strokeDasharray="3,3">
        <animate attributeName="stroke-dashoffset" values="0;-15" dur="2s" repeatCount="indefinite"/>
      </path>
      <path d="M295,95 L225,135" stroke="#06b6d4" strokeWidth="2" opacity="0.7" strokeDasharray="3,3">
        <animate attributeName="stroke-dashoffset" values="0;-15" dur="2.5s" repeatCount="indefinite"/>
      </path>
      <path d="M105,205 L175,165" stroke="#10b981" strokeWidth="2" opacity="0.7" strokeDasharray="3,3">
        <animate attributeName="stroke-dashoffset" values="0;-15" dur="3s" repeatCount="indefinite"/>
      </path>
      <path d="M295,205 L225,165" stroke="#ef4444" strokeWidth="2" opacity="0.7" strokeDasharray="3,3">
        <animate attributeName="stroke-dashoffset" values="0;-15" dur="2.2s" repeatCount="indefinite"/>
      </path>
    </g>
    
    {/* Data Flow Indicators */}
    <g className="animate-pulse">
      <circle cx="140" cy="115" r="3" fill="#0ea5e9"/>
      <circle cx="260" cy="115" r="3" fill="#06b6d4"/>
      <circle cx="140" cy="185" r="3" fill="#10b981"/>
      <circle cx="260" cy="185" r="3" fill="#ef4444"/>
    </g>
  </svg>
);