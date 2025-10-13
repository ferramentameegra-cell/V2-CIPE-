'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bot, MessageSquare, TrendingUp, TrendingDown, Users, Target,
  Clock, Activity, Star, Settings, Play, Pause, RefreshCw,
  Send, Smile, ThumbsUp, ThumbsDown, BarChart3, Zap
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CloneDigitalProps {
  candidateId: string;
}

interface Conversa {
  id: string;
  usuario: string;
  canal: string;
  mensagens: { tipo: 'usuario' | 'clone'; texto: string; timestamp: Date }[];
  duracao: number;
  satisfacao: number;
  resolvido: boolean;
  dataInicio: Date;
}

interface MetricaClone {
  label: string;
  valor: number | string;
  variacao?: number;
  icone: any;
  cor: string;
  status: 'excelente' | 'bom' | 'atencao' | 'critico';
}

export default function CloneDigital({ candidateId }: CloneDigitalProps) {
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const [metricas, setMetricas] = useState<MetricaClone[]>([]);
  const [mensagemTeste, setMensagemTeste] = useState('');
  const [conversaTeste, setConversaTeste] = useState<{ tipo: 'usuario' | 'clone'; texto: string }[]>([]);
  const [processando, setProcessando] = useState(false);
  const [status, setStatus] = useState<'ATIVO' | 'PAUSADO' | 'TREINANDO'>('ATIVO');

  useEffect(() => {
    const metricasSimuladas: MetricaClone[] = [
      {
        label: 'Total de Conversas',
        valor: '2.847',
        variacao: 18.7,
        icone: MessageSquare,
        cor: 'blue',
        status: 'excelente'
      },
      {
        label: 'Conversas Hoje',
        valor: '247',
        variacao: 12.3,
        icone: Activity,
        cor: 'green',
        status: 'excelente'
      },
      {
        label: 'Taxa de Resolução',
        valor: '89.2%',
        variacao: 5.8,
        icone: Target,
        cor: 'purple',
        status: 'excelente'
      },
      {
        label: 'Satisfação Média',
        valor: '4.6/5',
        variacao: 8.2,
        icone: Star,
        cor: 'yellow',
        status: 'excelente'
      },
      {
        label: 'Tempo Médio',
        valor: '1.2s',
        variacao: -15.4,
        icone: Clock,
        cor: 'cyan',
        status: 'excelente'
      },
      {
        label: 'Performance',
        valor: '94%',
        variacao: 3.1,
        icone: Zap,
        cor: 'orange',
        status: 'excelente'
      }
    ];

    const conversasSimuladas: Conversa[] = [
      {
        id: '1',
        usuario: 'Maria Silva',
        canal: 'WhatsApp',
        mensagens: [
          { tipo: 'usuario', texto: 'Olá, quais são as principais propostas para a educação?', timestamp: new Date(Date.now() - 5 * 60 * 1000) },
          { tipo: 'clone', texto: 'Olá! Minhas principais propostas para educação incluem: 1) Valorização dos professores com melhores salários, 2) Modernização das escolas com tecnologia, 3) Ampliação de creches em tempo integral. Quer saber mais detalhes sobre alguma delas?', timestamp: new Date(Date.now() - 4 * 60 * 1000) },
          { tipo: 'usuario', texto: 'Sim, sobre as creches em tempo integral', timestamp: new Date(Date.now() - 3 * 60 * 1000) },
          { tipo: 'clone', texto: 'Ótimo! A proposta de creches em tempo integral visa: 1) Criar 50 novas creches nos próximos 2 anos, 2) Oferecer alimentação completa, 3) Atividades pedagógicas pela manhã e tarde. Isso ajudará pais que trabalham e dará melhor educação às crianças.', timestamp: new Date(Date.now() - 2 * 60 * 1000) }
        ],
        duracao: 180,
        satisfacao: 5,
        resolvido: true,
        dataInicio: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: '2',
        usuario: 'João Santos',
        canal: 'Instagram',
        mensagens: [
          { tipo: 'usuario', texto: 'Qual sua posição sobre segurança pública?', timestamp: new Date(Date.now() - 10 * 60 * 1000) },
          { tipo: 'clone', texto: 'A segurança pública é prioridade! Minhas propostas incluem: 1) Reforço do policiamento em áreas críticas, 2) Investimento em tecnologia (câmeras e monitoramento), 3) Programas sociais preventivos para jovens. A segurança se faz com inteligência e presença nas ruas.', timestamp: new Date(Date.now() - 9 * 60 * 1000) }
        ],
        duracao: 60,
        satisfacao: 4,
        resolvido: true,
        dataInicio: new Date(Date.now() - 10 * 60 * 1000)
      },
      {
        id: '3',
        usuario: 'Ana Paula',
        canal: 'Site',
        mensagens: [
          { tipo: 'usuario', texto: 'Como posso me voluntariar na campanha?', timestamp: new Date(Date.now() - 15 * 60 * 1000) },
          { tipo: 'clone', texto: 'Que maravilha! Precisamos muito de pessoas como você! Pode se voluntariar de várias formas: 1) Divulgação nas redes sociais, 2) Panfletagem em sua região, 3) Mobilização de amigos e familiares. Entre em contato pelo WhatsApp (XX) XXXX-XXXX que a equipe vai te orientar!', timestamp: new Date(Date.now() - 14 * 60 * 1000) }
        ],
        duracao: 45,
        satisfacao: 5,
        resolvido: true,
        dataInicio: new Date(Date.now() - 15 * 60 * 1000)
      }
    ];

    setMetricas(metricasSimuladas);
    setConversas(conversasSimuladas);
  }, [candidateId]);

  const enviarMensagemTeste = () => {
    if (!mensagemTeste.trim()) return;

    setProcessando(true);
    
    // Adiciona mensagem do usuário
    const novaMensagem = { tipo: 'usuario' as const, texto: mensagemTeste };
    setConversaTeste(prev => [...prev, novaMensagem]);
    setMensagemTeste('');

    // Simula processamento da IA
    setTimeout(() => {
      const respostasSimuladas = [
        'Ótima pergunta! Com base no meu histórico político e nas necessidades da nossa cidade, acredito que...',
        'É um tema muito importante para mim. Tenho propostas concretas que incluem...',
        'Agradeço seu interesse! Minha posição sobre isso é clara: precisamos de ações práticas como...',
        'Essa é uma das minhas prioridades! Planejo implementar medidas como...'
      ];
      
      const resposta = respostasSimuladas[Math.floor(Math.random() * respostasSimuladas.length)];
      setConversaTeste(prev => [...prev, { tipo: 'clone' as const, texto: resposta }]);
      setProcessando(false);
    }, 1200);
  };

  const formatTempo = (segundos: number) => {
    if (segundos < 60) return `${segundos}s`;
    const minutos = Math.floor(segundos / 60);
    return `${minutos}min`;
  };

  const formatTempoRelativo = (data: Date) => {
    const agora = new Date();
    const diff = agora.getTime() - data.getTime();
    const minutos = Math.floor(diff / (1000 * 60));
    
    if (minutos < 1) return 'Agora';
    if (minutos < 60) return `${minutos}min atrás`;
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `${horas}h atrás`;
    const dias = Math.floor(horas / 24);
    return `${dias}d atrás`;
  };

  // Dados para gráficos
  const dadosConversas = [
    { hora: '00:00', conversas: 12, resolucoes: 11 },
    { hora: '04:00', conversas: 8, resolucoes: 7 },
    { hora: '08:00', conversas: 45, resolucoes: 41 },
    { hora: '12:00', conversas: 67, resolucoes: 59 },
    { hora: '16:00', conversas: 52, resolucoes: 47 },
    { hora: '20:00', conversas: 38, resolucoes: 35 }
  ];

  const dadosSatisfacao = [
    { categoria: '5 estrelas', quantidade: 1547 },
    { categoria: '4 estrelas', quantidade: 892 },
    { categoria: '3 estrelas', quantidade: 234 },
    { categoria: '2 estrelas', quantidade: 98 },
    { categoria: '1 estrela', quantidade: 76 }
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">Clone Digital</h1>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                status === 'ATIVO' ? 'bg-green-500 animate-pulse' :
                status === 'PAUSADO' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <span className={`font-medium ${
                status === 'ATIVO' ? 'text-green-400' :
                status === 'PAUSADO' ? 'text-yellow-400' : 'text-blue-400'
              }`}>
                {status === 'ATIVO' ? 'Respondendo' : status === 'PAUSADO' ? 'Pausado' : 'Treinando'}
              </span>
            </div>
          </div>
          <p className="text-slate-400 mt-1">
            Réplica digital inteligente • 2.847 conversas • 94% de performance
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          {status === 'ATIVO' ? (
            <Button onClick={() => setStatus('PAUSADO')} variant="outline">
              <Pause className="w-4 h-4 mr-2" />
              Pausar
            </Button>
          ) : (
            <Button onClick={() => setStatus('ATIVO')} className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Ativar
            </Button>
          )}
          
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Treinar
          </Button>
          
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricas.map((metrica, index) => {
          const Icon = metrica.icone;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-blue-500/30 bg-blue-500/5">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className={`w-5 h-5 text-${metrica.cor}-400`} />
                  </div>
                  <div className="text-xl font-bold text-white mb-1">{metrica.valor}</div>
                  <div className="text-xs text-slate-400 mb-1">{metrica.label}</div>
                  {metrica.variacao && (
                    <div className={`text-xs flex items-center justify-center ${
                      metrica.variacao > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metrica.variacao > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {Math.abs(metrica.variacao)}%
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teste do Clone */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-blue-400" />
                <span>Testar Clone Digital</span>
              </div>
              <Badge className="bg-green-500/20 text-green-400">Ao Vivo</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Área de conversa */}
              <div className="bg-slate-900/50 rounded-lg p-4 h-80 overflow-y-auto space-y-3">
                {conversaTeste.length === 0 ? (
                  <div className="text-center text-slate-400 mt-16">
                    <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Envie uma mensagem para testar o clone</p>
                  </div>
                ) : (
                  conversaTeste.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.tipo === 'usuario'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-200'
                        }`}
                      >
                        {msg.tipo === 'clone' && (
                          <div className="flex items-center space-x-2 mb-1">
                            <Bot className="w-3 h-3" />
                            <span className="text-xs font-medium">Clone Digital</span>
                          </div>
                        )}
                        <p className="text-sm">{msg.texto}</p>
                      </div>
                    </div>
                  ))
                )}
                {processando && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 text-slate-200 max-w-xs px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                        <span className="text-xs">Pensando...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input de mensagem */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={mensagemTeste}
                  onChange={(e) => setMensagemTeste(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && enviarMensagemTeste()}
                  className="flex-1 bg-slate-800 border-slate-600 text-white"
                  disabled={processando || status !== 'ATIVO'}
                />
                <Button
                  onClick={enviarMensagemTeste}
                  disabled={!mensagemTeste.trim() || processando || status !== 'ATIVO'}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico de Conversas */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-green-400" />
              <span>Conversas por Horário</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dadosConversas}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hora" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="conversas" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6}
                  name="Total"
                />
                <Area 
                  type="monotone" 
                  dataKey="resolucoes" 
                  stackId="2"
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.6}
                  name="Resolvidas"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Conversas Recentes */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <span>Conversas Recentes</span>
            </div>
            <Button size="sm" variant="outline">Ver Todas</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversas.map((conversa, index) => (
              <motion.div
                key={conversa.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/30 rounded-lg p-4 border border-slate-700 hover:bg-slate-800/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{conversa.usuario}</h4>
                      <p className="text-xs text-slate-400">
                        {conversa.canal} • {formatTempoRelativo(conversa.dataInicio)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={conversa.resolvido ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                      {conversa.resolvido ? 'Resolvido' : 'Pendente'}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < conversa.satisfacao ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {conversa.mensagens.slice(-2).map((msg, idx) => (
                    <div key={idx} className="text-sm">
                      <span className={`font-medium ${msg.tipo === 'usuario' ? 'text-blue-400' : 'text-green-400'}`}>
                        {msg.tipo === 'usuario' ? 'Eleitor' : 'Clone'}:
                      </span>
                      <span className="text-slate-300 ml-2">
                        {msg.texto.length > 100 ? `${msg.texto.substring(0, 100)}...` : msg.texto}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-700">
                  <div className="flex items-center space-x-4 text-xs text-slate-400">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{conversa.mensagens.length} mensagens</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatTempo(conversa.duracao)}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-7">
                    Ver Detalhes
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Distribuição de Satisfação */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Distribuição de Satisfação</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosSatisfacao} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="categoria" type="category" stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="quantidade" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

