'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OracleCipeProps {
  context: string;
}

interface Message {
  id: number;
  sender: 'user' | 'oracle';
  text: string;
  confidence?: number;
  sources?: string[];
}

export default function OracleCipe({ context }: OracleCipeProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newUserMessage: Message = { id: messages.length + 1, sender: 'user', text: input };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/oracle/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input, context }),
      });
      const data = await response.json();

      const newOracleMessage: Message = {
        id: messages.length + 2,
        sender: 'oracle',
        text: data.response,
        confidence: data.confidence,
        sources: data.sources,
      };
      setMessages((prev) => [...prev, newOracleMessage]);
    } catch (error) {
      console.error('Erro ao consultar Oracle CIPE:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          sender: 'oracle',
          text: 'Desculpe, não consegui processar sua pergunta no momento. Tente novamente mais tarde.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = {
    dashboard: [
      'Qual a intenção de voto atual?',
      'Quais são os principais alertas?',
      'Como está o engajamento nas redes?',
    ],
    'sala-de-guerra': [
      'Quais as últimas crises detectadas?',
      'Análise de sentimento sobre o tema X',
      'Top influenciadores negativos hoje',
    ],
    'waze-eleitoral': [
      'Melhor rota para o evento Y',
      'Análise demográfica da região Z',
      'Otimizar recursos para a cidade W',
    ],
    'crm-eleitoral': [
      'Quantos eleitores na segmentação "Centro"?',
      'Lista de eleitores com scoring alto',
      'Qual a taxa de conversão do último evento?',
    ],
    'funil-mobilizacao': [
      'Métricas de conversão por etapa',
      'Quais os gargalos no funil?',
      'Sugestões para aumentar o Awareness',
    ],
    'radar-crises': [
      'Crises ativas no momento',
      'Análise de sentimento geral',
      'Alertas de alto risco',
    ],
    'central-ias': [
      'Status dos agentes de IA',
      'Performance dos modelos',
      'Configurações recomendadas',
    ],
  };

  return (
    <Card className="bg-slate-700/30 border-slate-600/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Brain className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Oracle CIPE - {context.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h3>
              <p className="text-xs text-slate-300">Pergunte sobre métricas, tendências ou insights...</p>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[200px] pr-4 mb-4">
          <div className="space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-slate-300 text-sm py-4">
                Olá! Como posso ajudar com o {context.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} hoje?
              </div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-blue-600/80 text-white'
                      : 'bg-slate-600/80 text-slate-100'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  {msg.confidence && msg.sender === 'oracle' && (
                    <p className="text-xs text-slate-300 mt-1">Confiança: {(msg.confidence * 100).toFixed(0)}%</p>
                  )}
                  {msg.sources && msg.sender === 'oracle' && msg.sources.length > 0 && (
                    <p className="text-xs text-slate-300 mt-1">Fontes: {msg.sources.join(', ')}</p>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[70%] p-3 rounded-lg bg-slate-600/80 text-slate-100">
                  <span className="animate-pulse text-sm">Digitando...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Botões de Sugestão Modernos */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickPrompts[context as keyof typeof quickPrompts]?.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="bg-slate-600/40 hover:bg-slate-500/60 text-slate-200 border-slate-500/50 hover:border-slate-400/70 transition-all duration-200 rounded-full px-3 py-1 text-xs font-medium"
              onClick={() => setInput(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Pergunte ao Oracle CIPE..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="bg-slate-600/50 border-slate-500/50 text-white placeholder-slate-300 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50"
            disabled={loading}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4"
            disabled={loading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
