'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Brain, Send, History, TrendingUp, AlertTriangle, Users, BarChart3 } from 'lucide-react';

interface OracleMessage {
  id: string;
  type: 'user' | 'oracle';
  content: string;
  timestamp: Date;
  context?: string;
  confidence?: number;
  sources?: string[];
}

interface OracleCipeProps {
  candidateId: string;
  context: string;
  placeholder?: string;
  className?: string;
}

const CONTEXT_CONFIGS = {
  dashboard: {
    icon: BarChart3,
    color: 'blue',
    prompts: [
      'Como estão as métricas gerais da campanha?',
      'Qual o resumo do desempenho hoje?',
      'Preciso de insights sobre tendências'
    ]
  },
  sala_guerra: {
    icon: AlertTriangle,
    color: 'red',
    prompts: [
      'Há alguma crise emergente?',
      'Como está o sentimento nas redes?',
      'Preciso de um relatório de monitoramento'
    ]
  },
  waze_eleitoral: {
    icon: TrendingUp,
    color: 'green',
    prompts: [
      'Qual a melhor rota para vitória?',
      'Como otimizar a agenda de campo?',
      'Onde focar os recursos de campanha?'
    ]
  },
  eleitores: {
    icon: Users,
    color: 'purple',
    prompts: [
      'Como está a segmentação de eleitores?',
      'Quais perfis converter primeiro?',
      'Análise do CRM eleitoral'
    ]
  }
};

export default function OracleCipe({ candidateId, context, placeholder, className }: OracleCipeProps) {
  const [messages, setMessages] = useState<OracleMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const contextConfig = CONTEXT_CONFIGS[context as keyof typeof CONTEXT_CONFIGS] || CONTEXT_CONFIGS.dashboard;
  const IconComponent = contextConfig.icon;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: OracleMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      context
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/oracle/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateId,
          context,
          message: input,
          history: messages.slice(-5)
        })
      });

      const data = await response.json();

      const oracleMessage: OracleMessage = {
        id: (Date.now() + 1).toString(),
        type: 'oracle',
        content: data.response,
        timestamp: new Date(),
        context,
        confidence: data.confidence,
        sources: data.sources
      };

      setMessages(prev => [...prev, oracleMessage]);
    } catch (error) {
      console.error('Erro ao consultar Oracle:', error);
      
      const errorMessage: OracleMessage = {
        id: (Date.now() + 1).toString(),
        type: 'oracle',
        content: 'Desculpe, ocorreu um erro ao processar sua consulta. Tente novamente.',
        timestamp: new Date(),
        context
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <Card className={`glass-card ${className}`}>
      <CardContent className="p-4">
        {/* Header do Oracle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`p-2 rounded-lg bg-${contextConfig.color}-500/20`}>
              <Brain className={`h-5 w-5 text-${contextConfig.color}-400`} />
            </div>
            <div>
              <h3 className="font-semibold text-white">Oracle CIPE</h3>
              <p className="text-xs text-slate-400 capitalize">{context.replace('_', ' ')}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white"
          >
            {isExpanded ? 'Minimizar' : 'Expandir'}
          </Button>
        </div>

        {/* Prompts Rápidos */}
        {!isExpanded && (
          <div className="flex flex-wrap gap-2 mb-4">
            {contextConfig.prompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickPrompt(prompt)}
                className="text-xs bg-slate-700/50 border-slate-600 hover:bg-slate-600"
              >
                {prompt}
              </Button>
            ))}
          </div>
        )}

        {/* Área de Mensagens */}
        {isExpanded && (
          <ScrollArea className="h-64 mb-4 p-2 bg-slate-800/30 rounded-lg">
            <div className="space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-slate-400 py-8">
                  <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Faça uma pergunta para começar</p>
                </div>
              )}
              
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-100'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    
                    {message.type === 'oracle' && message.confidence && (
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-600">
                        <Badge variant="outline" className="text-xs">
                          Confiança: {Math.round(message.confidence * 100)}%
                        </Badge>
                        {message.sources && message.sources.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <History className="h-3 w-3" />
                            <span className="text-xs">{message.sources.length} fontes</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        )}

        {/* Input de Mensagem */}
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder || "Pergunte ao Oracle CIPE..."}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="bg-slate-800/50 border-slate-600 text-white placeholder-slate-400"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
