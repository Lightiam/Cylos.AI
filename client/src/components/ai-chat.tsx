import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  provider?: string;
}

interface AIChatProps {
  title?: string;
  placeholder?: string;
  onSendMessage?: (message: string, provider: string) => Promise<string>;
}

export default function AIChat({ 
  title = "Cylos AI Assistant", 
  placeholder = "Ask me anything about AI agents and MCP protocols...",
  onSendMessage 
}: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your Cylos AI assistant. I can help you with AI agent deployment, MCP protocol integration, and intelligent automation. How can I assist you today?',
      role: 'assistant',
      timestamp: new Date(),
      provider: 'Cylos AI'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('OpenAI');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const providers = ['OpenAI', 'Anthropic', 'Groq', 'Cohere', 'Google AI'];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response = '';
      if (onSendMessage) {
        response = await onSendMessage(input, selectedProvider);
      } else {
        response = `I received your message: "${input}". This is a demo response from ${selectedProvider}. In a real implementation, this would connect to the actual AI service.`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
        provider: selectedProvider,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
        provider: selectedProvider,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col bg-slate-900 border-slate-700">
      <CardHeader className="border-b border-slate-700">
        <CardTitle className="flex items-center gap-2 text-slate-50">
          <Bot className="w-6 h-6 text-sky-500" />
          {title}
        </CardTitle>
        <div className="flex gap-2">
          <select 
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="bg-slate-800 text-slate-50 border border-slate-600 rounded px-3 py-1 text-sm"
          >
            {providers.map(provider => (
              <option key={provider} value={provider}>{provider}</option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user' 
                      ? 'bg-sky-500' 
                      : 'bg-slate-700'
                  }`}>
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-sky-500" />
                    )}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-800 text-slate-50'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                      {message.provider && <span>• {message.provider}</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-sky-500" />
                </div>
                <div className="bg-slate-800 text-slate-50 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t border-slate-700 p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={isLoading}
              className="flex-1 bg-slate-800 border-slate-600 text-slate-50 placeholder-slate-400"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-sky-500 hover:bg-sky-600 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
