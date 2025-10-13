'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Send, MessageSquare, Zap, TrendingUp, Shield, Eye, Sparkles } from 'lucide-react';
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
  timestamp?: Date;
}

export default function OracleCipe({ context }: OracleCipeProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Simular ativação do Oracle
  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newUserMessage: Message = { 
      id: messages.length + 1, 
      sender: 'user', 
      text: input,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simular resposta do Oracle com dados realistas
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const responses = [
        {
          text: "Analisando dados em tempo real... Intenção de voto estável em 28.5% com tendência crescente de +2.3%. Recomendo foco em Ceilândia Norte onde temos 67% de engajamento.",
          confidence: 0.94,
          sources: ["Pesquisas IBOPE", "Redes Sociais", "CRM"]
        },
        {
          text: "Detectei 3 alertas críticos: 1) Fake news sobre segurança crescendo 340% em 2h, 2) Adversário anunciando proposta similar, 3) Engajamento caindo 15% no Instagram. Ação imediata recomendada.",
          confidence: 0.97,
          sources: ["Radar de Crises", "Monitoramento Social", "IA Blindagem"]
        },
        {
          text: "Performance excepcional! Score médio subiu para 156 (+12%), taxa de conversão em 28% (+3.2%). Top região: Taguatinga com 89% de aprovação. Continue estratégia atual.",
          confidence: 0.91,
          sources: ["Funil de Mobilização", "Análise Regional", "6 IAs"]
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const newOracleMessage: Message = {
        id: messages.length + 2,
        sender: 'oracle',
        text: randomResponse.text,
        confidence: randomResponse.confidence,
        sources: randomResponse.sources,
        timestamp: new Date()
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
          timestamp: new Date()
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

  const contextDisplay = context.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="relative">
      {/* Efeito de fundo animado */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
      
      <Card className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-blue-500/30 backdrop-blur-xl shadow-2xl shadow-blue-500/20">
        <CardContent className="p-4">
          {/* Header Compacto */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm border border-blue-400/50">
                  <Brain className="h-5 w-5 text-blue-300" />
                </div>
                {isActive && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                )}
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  ORACLE CIPE
                </h2>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-400 border-green-400/50 bg-green-400/10 text-xs">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></div>
                    Online
                  </Badge>
                  <Badge variant="outline" className="text-blue-400 border-blue-400/50 bg-blue-400/10 text-xs">
                    {contextDisplay}
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Estatísticas compactas */}
            <div className="hidden lg:flex items-center space-x-3 text-xs">
              <div className="text-center">
                <div className="text-slate-400">Precisão</div>
                <div className="font-bold text-green-400">94.7%</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400">Velocidade</div>
                <div className="font-bold text-blue-400">2.1s</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400">IAs</div>
                <div className="font-bold text-purple-400">6/6</div>
              </div>
            </div>

            {/* Botão Expandir/Minimizar */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl transition-all duration-300 text-sm font-medium border border-blue-500/30 hover:border-blue-400/60 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 z-50 relative cursor-pointer"
              style={{ 
                zIndex: 999, 
                pointerEvents: 'auto',
                position: 'relative'
              }}
              type="button"
            >
              <span className="text-lg font-bold">{isExpanded ? '−' : '+'}</span>
              <span>{isExpanded ? 'Minimizar' : 'Expandir'}</span>
            </button>
          </div>

          {/* Chat Area condicional */}
          {isExpanded && (
            <div className="relative">
              <ScrollArea className="h-[300px] pr-4 mb-4">
              <div className="space-y-3">
                {messages.length === 0 && (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3">
                      <Sparkles className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-1">Oracle CIPE Ativo</h3>
                    <p className="text-slate-300 text-xs max-w-sm mx-auto">
                      Sistema de inteligência política mais avançado do Brasil. 
                      Pergunte sobre métricas, tendências ou insights estratégicos.
                    </p>
                  </div>
                )}
                
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-xl ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                          : 'bg-gradient-to-r from-slate-700/80 to-slate-800/80 text-slate-100 border border-slate-600/50 backdrop-blur-sm'
                      }`}
                    >
                      <p className="text-xs leading-relaxed">{msg.text}</p>
                      
                      {msg.sender === 'oracle' && (
                        <div className="mt-2 flex items-center justify-between">
                          {msg.confidence && (
                            <div className="flex items-center space-x-1">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                              <span className="text-xs text-slate-300">
                                {(msg.confidence * 100).toFixed(0)}%
                              </span>
                            </div>
                          )}
                          
                          {msg.sources && msg.sources.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {msg.sources.slice(0, 2).map((source, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs text-slate-400 border-slate-500/50 bg-slate-600/30 px-1 py-0">
                                  {source}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {msg.timestamp && (
                        <p className="text-xs text-slate-400 mt-1">
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-xl bg-gradient-to-r from-slate-700/80 to-slate-800/80 text-slate-100 border border-slate-600/50">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs">Oracle CIPE processando...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Sugestões Compactas */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-slate-300 mb-2 flex items-center">
                <Zap className="h-3 w-3 mr-1 text-yellow-400" />
                Sugestões
              </h4>
              <div className="flex flex-wrap gap-1">
                {quickPrompts[context as keyof typeof quickPrompts]?.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="bg-slate-700/50 hover:bg-slate-600/70 text-slate-200 border-slate-600/50 hover:border-blue-400/50 transition-all duration-200 rounded-full px-3 py-1 text-xs font-medium"
                    onClick={() => setInput(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
            </div>
          )}

          {/* Input Condicional */}
          <div className="relative">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Input
                  placeholder={isExpanded ? "Pergunte ao Oracle CIPE..." : "Digite sua pergunta..."}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30 rounded-lg pl-3 pr-10 h-9 text-xs"
                  disabled={loading}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <MessageSquare className="h-4 w-4 text-slate-400" />
                </div>
              </div>
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 h-9 rounded-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                disabled={loading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Status Compacto */}
            <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 text-green-400" />
                  <span>Seguro</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3 text-blue-400" />
                  <span>Monitorando</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3 text-purple-400" />
                <span>Excelente</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}