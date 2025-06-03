# Cylos AI Platform

An intelligent AI agent platform powered by advanced LLMs and MCP (Model Context Protocol) integration. Deploy autonomous agents for monitoring, decision-making, and intelligent automation across cloud, on-premises, and browser environments.

## Features

### 🤖 Multi-LLM Support
- **OpenAI GPT-4** - Advanced reasoning and conversation
- **Anthropic Claude** - Ethical AI with strong safety measures  
- **Groq** - Ultra-fast inference for real-time applications
- **Cohere** - Enterprise-grade language understanding
- **Google Gemini** - Multimodal AI capabilities

### 🔗 MCP Protocol Integration
- **Server Management** - Connect and manage multiple MCP servers
- **Tool Execution** - Execute tools across different MCP endpoints
- **Resource Access** - Read and interact with MCP resources
- **Real-time Communication** - Live protocol communication

### 🎯 Core Capabilities
- **Autonomous AI Agents** - Deploy intelligent agents that operate independently
- **Real-time Monitoring** - Monitor agent performance and system health
- **Intelligent Decision Making** - AI-powered analysis and recommendations
- **Cross-Platform Integration** - Works across cloud, on-premises, and browser environments

## Quick Start

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd cylos-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup

Create a `.env` file with your API keys:

```env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GROQ_API_KEY=your_groq_key
COHERE_API_KEY=your_cohere_key
GOOGLE_AI_API_KEY=your_google_ai_key
```

## Architecture

### AI Service Layer
- **AIServiceManager** - Centralized management of AI providers
- **Provider Abstraction** - Unified interface for different LLM providers
- **Response Handling** - Consistent response formatting across providers

### MCP Integration
- **MCPServiceManager** - Manage connections to MCP servers
- **Tool Execution** - Execute tools and read resources via MCP
- **Protocol Compliance** - Full MCP specification support

### Frontend Components
- **AI Chat Interface** - Interactive chat with multiple AI providers
- **Provider Selection** - Switch between different LLM providers
- **Real-time Updates** - Live conversation and status updates

## Usage

### Basic AI Chat

```typescript
import AIChat from '@/components/ai-chat';

function App() {
  const handleSendMessage = async (message: string, provider: string) => {
    // Your custom message handling logic
    return response;
  };

  return (
    <AIChat 
      title="My AI Assistant"
      onSendMessage={handleSendMessage}
    />
  );
}
```

### AI Service Integration

```typescript
import { AIServiceManager, OpenAIProvider } from '@/server/services/aiService';

const aiManager = new AIServiceManager();
aiManager.addProvider(new OpenAIProvider(process.env.OPENAI_API_KEY));

const response = await aiManager.generateResponse('OpenAI', 'Hello, world!');
```

### MCP Server Connection

```typescript
import { MCPServiceManager } from '@/server/services/mcpService';

const mcpManager = new MCPServiceManager();
await mcpManager.addServer({
  name: 'my-server',
  url: 'ws://localhost:8080',
  capabilities: ['tools', 'resources']
});

const tools = await mcpManager.listTools('my-server');
```

## Development

### Project Structure

```
cylos-ai/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   └── lib/           # Utility libraries
├── server/                # Backend services
│   ├── services/          # AI and MCP services
│   ├── routes/           # API routes
│   └── index.ts          # Server entry point
└── shared/               # Shared types and schemas
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Join our community discussions
