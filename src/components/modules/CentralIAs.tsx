'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, Activity, Zap, Users, Target, TrendingUp, TrendingDown,
  CheckCircle, AlertTriangle, Clock, Settings, Play, Pause,
  MessageSquare, Shield, MapPin, BarChart3, Eye, Globe,
  Bot, Search, RefreshCw, Monitor
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CentralIAsProps {
  candidateId: string;
}

interface StatusIA {
  id: string;
  nome: string;
  descricao: string;
  status: 'ativo' | 'inativo' | 'manutencao';
  performance: number;
  uptime: number;
  ultimaAtividade: string;
  metricas: {
    processamentos: number;
    precisao: number;
    velocidade: number;
    satisfacao: number;
  };
  integracoes: string[];
  alertas: number;
}

interface EventoIntegracao {
  id: string;
  timestamp: string;
  tipo: 'sucesso' | 'erro' | 'alerta' | 'info';
  origem: string;
  destino: string;
  descricao: string;
  impacto: 'baixo' | 'medio' | 'alto';
}

const CentralIAs = ({ candidateId }: CentralIAsProps) => {
  const [ias, setIas] = useState<StatusIA[]>([]);
  const [eventos, setEventos] = useState<EventoIntegracao[]>([]);
  const [modoVisualizacao, setModoVisualizacao] = useState<'dashboard' | 'central' | 'clone' | 'blindagem' | 'comunicacao' | 'narrativa' | 'pesquisas'>('dashboard');
  const [filtroTempo, setFiltroTempo] = useState('24h');
  const [estatisticasGerais, setEstatisticasGerais] = useState({
    totalIAs: 0,
    iasAtivas: 0,
    performanceMedia: 0,
    uptimeMedia: 0,
    totalProcessamentos: 0,
    satisfacaoMedia: 0
  });

  useEffect(() => {
    const iasMockadas: StatusIA[] = [
      {
        id: '1',
        nome: 'Clone Digital',
        descricao: 'IA que responde como a própria Celina, mantendo sua personalidade e valores',
        status: 'ativo',
        performance: 94,
        uptime: 99.8,
        ultimaAtividade: '2 min atrás',
        metricas: {
          processamentos: 1247,
          precisao: 94,
          velocidade: 2.3,
          satisfacao: 87
        },
        integracoes: ['Funil', 'Blindagem', 'Narrativa Regional'],
        alertas: 0
      },
      {
        id: '2',
        nome: 'Comunicação em Massa',
        descricao: 'Cria e otimiza campanhas de comunicação segmentadas',
        status: 'ativo',
        performance: 91,
        uptime: 99.5,
        ultimaAtividade: '5 min atrás',
        metricas: {
          processamentos: 3240,
          precisao: 91,
          velocidade: 0.8,
          satisfacao: 82
        },
        integracoes: ['Funil', 'Narrativa Regional', 'Pesquisas'],
        alertas: 1
      },
      {
        id: '3',
        nome: 'Blindagem Estratégica',
        descricao: 'Detecta crises, ameaças e oportunidades em tempo real',
        status: 'ativo',
        performance: 97,
        uptime: 99.9,
        ultimaAtividade: '30 seg atrás',
        metricas: {
          processamentos: 892,
          precisao: 97,
          velocidade: 0.3,
          satisfacao: 95
        },
        integracoes: ['Funil', 'Clone Digital', 'Adversários'],
        alertas: 3
      },
      {
        id: '4',
        nome: 'Narrativa Regional',
        descricao: 'Adapta mensagens e estratégias para cada região do DF',
        status: 'ativo',
        performance: 89,
        uptime: 99.2,
        ultimaAtividade: '8 min atrás',
        metricas: {
          processamentos: 2156,
          precisao: 89,
          velocidade: 1.2,
          satisfacao: 78
        },
        integracoes: ['Funil', 'Clone Digital', 'Comunicação'],
        alertas: 0
      },
      {
        id: '5',
        nome: 'Pesquisas Automatizadas',
        descricao: 'Realiza pesquisas contínuas de opinião e intenção de voto',
        status: 'ativo',
        performance: 92,
        uptime: 99.6,
        ultimaAtividade: '12 min atrás',
        metricas: {
          processamentos: 678,
          precisao: 92,
          velocidade: 15.4,
          satisfacao: 84
        },
        integracoes: ['Funil', 'Comunicação', 'Narrativa Regional'],
        alertas: 1
      },
      {
        id: '6',
        nome: 'Análise de Adversários',
        descricao: 'Monitora adversários políticos e identifica oportunidades',
        status: 'ativo',
        performance: 95,
        uptime: 99.7,
        ultimaAtividade: '1 min atrás',
        metricas: {
          processamentos: 445,
          precisao: 95,
          velocidade: 8.7,
          satisfacao: 91
        },
        integracoes: ['Funil', 'Blindagem', 'Clone Digital'],
        alertas: 2
      }
    ];

    const eventosMockados: EventoIntegracao[] = [
      {
        id: '1',
        timestamp: '2 min atrás',
        tipo: 'sucesso',
        origem: 'Clone Digital',
        destino: 'Funil',
        descricao: 'Resposta personalizada enviada com sucesso para eleitor em Ceilândia',
        impacto: 'baixo'
      },
      {
        id: '2',
        timestamp: '5 min atrás',
        tipo: 'alerta',
        origem: 'Blindagem',
        destino: 'Clone Digital',
        descricao: 'Detectada possível crise em desenvolvimento - ação preventiva recomendada',
        impacto: 'alto'
      },
      {
        id: '3',
        timestamp: '8 min atrás',
        tipo: 'sucesso',
        origem: 'Comunicação',
        destino: 'Narrativa Regional',
        descricao: 'Campanha regionalizada criada e enviada para 3.500 eleitores',
        impacto: 'medio'
      },
      {
        id: '4',
        timestamp: '12 min atrás',
        tipo: 'info',
        origem: 'Pesquisas',
        destino: 'Funil',
        descricao: 'Nova pesquisa de satisfação concluída - 89% de aprovação',
        impacto: 'baixo'
      },
      {
        id: '5',
        timestamp: '15 min atrás',
        tipo: 'alerta',
        origem: 'Adversários',
        destino: 'Blindagem',
        descricao: 'Movimento adversário detectado - oportunidade de capitalização identificada',
        impacto: 'alto'
      }
    ];

    setIas(iasMockadas);
    setEventos(eventosMockados);
    
    const totalIAs = iasMockadas.length;
    const iasAtivas = iasMockadas.filter(ia => ia.status === 'ativo').length;
    const performanceMedia = Math.round(iasMockadas.reduce((acc, ia) => acc + ia.performance, 0) / totalIAs);
    const uptimeMedia = Math.round((iasMockadas.reduce((acc, ia) => acc + ia.uptime, 0) / totalIAs) * 10) / 10;
    const totalProcessamentos = iasMockadas.reduce((acc, ia) => acc + ia.metricas.processamentos, 0);
    const satisfacaoMedia = Math.round(iasMockadas.reduce((acc, ia) => acc + ia.metricas.satisfacao, 0) / totalIAs);

    setEstatisticasGerais({
      totalIAs,
      iasAtivas,
      performanceMedia,
      uptimeMedia,
      totalProcessamentos,
      satisfacaoMedia
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-500/20 text-green-400';
      case 'inativo': return 'bg-red-500/20 text-red-400';
      case 'manutencao': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'inativo': return 'Inativo';
      case 'manutencao': return 'Manutenção';
      default: return 'Desconhecido';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'sucesso': return 'bg-green-500/20 text-green-400';
      case 'erro': return 'bg-red-500/20 text-red-400';
      case 'alerta': return 'bg-yellow-500/20 text-yellow-400';
      case 'info': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'sucesso': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'erro': return <AlertTriangle className="h-4 w-4 text-red-400" />;
      case 'alerta': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'info': return <Clock className="h-4 w-4 text-blue-400" />;
      default: return <Clock className="h-4 w-4 text-slate-400" />;
    }
  };

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case 'baixo': return 'bg-green-500';
      case 'medio': return 'bg-yellow-500';
      case 'alto': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const formatTempo = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const formatTempoRelativo = (tempo: string) => {
    return tempo;
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-400';
    if (performance >= 75) return 'text-yellow-400';
    if (performance >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  // Dados para gráficos
  const dadosPerformance = [
    { hora: '00:00', clone: 95, blindagem: 88, comunicacao: 92, narrativa: 0, pesquisas: 87 },
    { hora: '04:00', clone: 93, blindagem: 91, comunicacao: 89, narrativa: 0, pesquisas: 90 },
    { hora: '08:00', clone: 96, blindagem: 85, comunicacao: 94, narrativa: 76, pesquisas: 88 },
    { hora: '12:00', clone: 94, blindagem: 89, comunicacao: 91, narrativa: 78, pesquisas: 92 },
    { hora: '16:00', clone: 97, blindagem: 87, comunicacao: 93, narrativa: 74, pesquisas: 89 },
    { hora: '20:00', clone: 94, blindagem: 90, comunicacao: 88, narrativa: 0, pesquisas: 91 }
  ];

  const dadosCusto = [
    { ia: 'Clone', custo: 15.80, execucoes: 2847 },
    { ia: 'Blindagem', custo: 22.40, execucoes: 15642 },
    { ia: 'Comunicação', custo: 18.90, execucoes: 8934 },
    { ia: 'Narrativa', custo: 35.60, execucoes: 1247 },
    { ia: 'Pesquisas', custo: 12.30, execucoes: 456 }
  ];

  return (
    <div className="h-full w-full space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">Arsenal de IA</h1>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium">Sistema Operacional</span>
            </div>
          </div>
          <p className="text-slate-400 mt-1">
            Central de inteligência artificial • {estatisticasGerais.iasAtivas} IAs ativas • Performance média: {estatisticasGerais.performanceMedia}%
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            className="px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            value={filtroTempo}
            onChange={(e) => setFiltroTempo(e.target.value)}
          >
            <option value="1h">Última hora</option>
            <option value="24h">Últimas 24h</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
          </select>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Brain className="w-4 h-4 mr-2" />
            Nova IA
          </Button>
          
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configurar
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'IAs Ativas', valor: `${estatisticasGerais.iasAtivas}/${estatisticasGerais.totalIAs}`, variacao: 100, icone: Brain, cor: 'blue', status: 'operacional' },
          { label: 'Performance Média', valor: `${estatisticasGerais.performanceMedia}%`, variacao: 3.4, icone: Zap, cor: 'green', status: 'Excelente' },
          { label: 'Uptime Médio', valor: `${estatisticasGerais.uptimeMedia}%`, variacao: 0.1, icone: Clock, cor: 'purple', status: 'Estável' },
          { label: 'Execuções/Hora', valor: '1.247', variacao: 12.8, icone: Activity, cor: 'cyan', status: '+12% hoje' },
          { label: 'Custo/Hora', valor: 'R$ 133.60', variacao: -8.2, icone: Target, cor: 'orange', status: '-8.2% otimizado' },
          { label: 'Taxa de Sucesso', valor: '94.7%', variacao: 1.8, icone: CheckCircle, cor: 'emerald', status: '+1.8%' }
        ].map((metrica, index) => {
          const Icon = metrica.icone;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="glass-card border-green-500/30 bg-green-500/5">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className={`w-5 h-5 text-${metrica.cor}-400`} />
                  </div>
                  <div className="text-xl font-bold text-white mb-1">{metrica.valor}</div>
                  <div className="text-xs text-slate-400 mb-1">{metrica.label}</div>
                  <div className={`text-xs flex items-center justify-center ${metrica.variacao > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {metrica.variacao > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {Math.abs(metrica.variacao)}%
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Status das 6 IAs */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Status das 6 IAs da CIPE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ias.map((ia) => (
              <div key={ia.id} className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(ia.status).includes('green') ? 'bg-green-400' : 'bg-red-400'} ${ia.status === 'ativo' ? 'animate-pulse' : ''}`}></div>
                    <div>
                      <h4 className="text-white font-semibold">{ia.nome}</h4>
                      <p className="text-slate-400 text-sm">{ia.descricao}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(ia.status)}>
                      {getStatusLabel(ia.status)}
                    </Badge>
                    {ia.alertas > 0 && (
                      <Badge className="bg-red-500/20 text-red-400">
                        {ia.alertas} alertas
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Performance</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${ia.performance >= 90 ? 'bg-green-500' : ia.performance >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${ia.performance}%` }}
                        ></div>
                      </div>
                      <span className="text-white font-semibold text-sm">{ia.performance}%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Uptime</span>
                    <span className="text-green-400 font-semibold">{ia.uptime}%</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Última Atividade</span>
                    <span className="text-white text-sm">{ia.ultimaAtividade}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-white font-semibold mb-2">Métricas</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center">
                      <p className="text-slate-400 text-xs">Processamentos</p>
                      <p className="text-white font-bold">{ia.metricas.processamentos}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-xs">Precisão</p>
                      <p className="text-blue-400 font-bold">{ia.metricas.precisao}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-xs">Velocidade</p>
                      <p className="text-green-400 font-bold">{ia.metricas.velocidade}s</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-xs">Satisfação</p>
                      <p className="text-purple-400 font-bold">{ia.metricas.satisfacao}%</p>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-white font-semibold mb-2">Integrações</h5>
                  <div className="flex flex-wrap gap-1">
                    {ia.integracoes.map((integracao, index) => (
                      <Badge key={index} className="bg-blue-500/20 text-blue-400 text-xs">
                        {integracao}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Eye className="h-4 w-4 mr-2" />
                    Detalhes
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Eventos de Integração */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Eventos de Integração em Tempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {eventos.map((evento) => (
              <div key={evento.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getTipoIcon(evento.tipo)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold">{evento.origem}</span>
                        <span className="text-slate-400">→</span>
                        <span className="text-white font-semibold">{evento.destino}</span>
                        <Badge className={getTipoColor(evento.tipo)}>
                          {evento.tipo.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-slate-300 text-sm mt-1">{evento.descricao}</p>
                      <p className="text-slate-400 text-xs mt-1">{evento.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${getImpactoColor(evento.impacto)}`}></div>
                    <span className="text-slate-400 text-sm capitalize">{evento.impacto}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resumo da Integração */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Resumo da Integração do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-4">Sinergia Entre IAs</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Taxa de Colaboração</span>
                  <span className="text-green-400 font-semibold">85%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Tempo de Resposta Integrada</span>
                  <span className="text-blue-400 font-semibold">4.2s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Precisão Combinada</span>
                  <span className="text-purple-400 font-semibold">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Eficiência Operacional</span>
                  <span className="text-green-400 font-semibold">+67%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">ROI por Componente</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Funil Isolado</span>
                  <span className="text-slate-400 font-semibold">180%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">IAs Isoladas</span>
                  <span className="text-slate-400 font-semibold">220%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Sistema Integrado</span>
                  <span className="text-green-400 font-semibold">487%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Multiplicador de Sinergia</span>
                  <span className="text-blue-400 font-semibold">2.2x</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CentralIAs;