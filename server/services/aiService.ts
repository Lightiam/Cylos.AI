import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import Groq from 'groq-sdk';
import { CohereClient } from 'cohere-ai';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface AIProvider {
  name: string;
  generateResponse(prompt: string): Promise<string>;
}

export class OpenAIProvider implements AIProvider {
  name = 'OpenAI';
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });
    return response.choices[0]?.message?.content || '';
  }
}

export class AnthropicProvider implements AIProvider {
  name = 'Anthropic';
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    });
    return response.content[0]?.type === 'text' ? response.content[0].text : '';
  }
}

export class GroqProvider implements AIProvider {
  name = 'Groq';
  private client: Groq;

  constructor(apiKey: string) {
    this.client = new Groq({ apiKey });
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
    });
    return response.choices[0]?.message?.content || '';
  }
}

export class CohereProvider implements AIProvider {
  name = 'Cohere';
  private client: CohereClient;

  constructor(apiKey: string) {
    this.client = new CohereClient({ token: apiKey });
  }

  async generateResponse(prompt: string): Promise<string> {
    const response = await this.client.generate({
      model: 'command',
      prompt,
      maxTokens: 1000,
    });
    return response.generations[0]?.text || '';
  }
}

export class GoogleAIProvider implements AIProvider {
  name = 'Google AI';
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async generateResponse(prompt: string): Promise<string> {
    const model = this.client.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }
}

export class AIServiceManager {
  private providers: Map<string, AIProvider> = new Map();

  addProvider(provider: AIProvider): void {
    this.providers.set(provider.name, provider);
  }

  async generateResponse(providerName: string, prompt: string): Promise<string> {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Provider ${providerName} not found`);
    }
    return provider.generateResponse(prompt);
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }

  hasProvider(providerName: string): boolean {
    return this.providers.has(providerName);
  }
}
