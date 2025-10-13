'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, Shield, Zap, Clock, Users, Activity,
  TrendingUp, TrendingDown, Eye, MessageSquare, Phone,
  Play, Pause, RotateCcw, Settings, Bell, Target,
  CheckCircle, MapPin
} from 'lucide-react';

interface EventoCritico {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'CRISE_IMAGEM' | 'OPORTUNIDADE_MIDIA' | 'ATAQUE_ADVERSARIO' | 'TRENDING_TOPIC';
  severidade: 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA' | 'EMERGENCIA';
  status: 'DETECTADO' | 'EM_ANALISE' | 'EM_RESPOSTA' | 'MONITORANDO' | 'RESOLVIDO';
  fonte: string;
  alcance: number;
  sentimento: number;
  urgencia: number;
  dataDeteccao: Date;
  prazoResposta?: Date;
  impactoEstimado: number;
  responsavel?: string;
  acoesPendentes: number;
}

interface MembroEquipe {
  id: string;
  nome: string;
  papel: string;
  status: 'DISPONIVEL' | 'OCUPADO' | 'AUSENTE' | 'OFFLINE';
  cargaTrabalho: number;
  eventosAtivos: number;
  telefone: string;
  ultimaAtividade: Date;
}

interface MetricaTempoReal {
  label: string;
  valor: number | string;
  variacao?: number;
  tipo: 'positivo' | 'negativo' | 'neutro' | 'alerta';
  icone: any;
}

interface MonitoringData {
  totalMentions: number;
  positiveMentions: number;
  negativeMentions: number;
  neutralMentions: number;
  sentimentScore: number;
  topHashtags: Array<{ tag: string; count: number; trend: 'up' | 'down' | 'stable' }>;
  topInfluencers: Array<{ name: string; followers: number; sentiment: number; reach: number }>;
  geographicData: Array<{ region: string; mentions: number; sentiment: number }>;
  realTimeActivity: Array<{ platform: string; content: string; timestamp: string; sentiment: number }>;
}

export default function SalaDeGuerra({ candidateId }: { candidateId: string }) {
  const [eventos, setEventos] = useState<EventoCritico[]>([]);
  const [equipe, setEquipe] = useState<MembroEquipe[]>([]);
  const [metricas, setMetricas] = useState<MetricaTempoReal[]>([]);
  const [monitoringData, setMonitoringData] = useState<MonitoringData | null>(null);
  const [modoOperacao, setModoOperacao] = useState<'NORMAL' | 'ALERTA' | 'CRISE'>('NORMAL');
  const [tempoReal, setTempoReal] = useState(true);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Simulação de dados em tempo real
  useEffect(() => {
    const eventosSimulados: EventoCritico[] = [
      {
        id: '1',
        titulo: 'Trending Topic Negativo no Twitter',
        descricao: 'Hashtag #RonaldoMentiroso está ganhando tração com 15K tweets',
        tipo: 'CRISE_IMAGEM',
        severidade: 'ALTA',
        status: 'DETECTADO',
        fonte: 'Twitter',
        alcance: 45000,
        sentimento: 0.2,
        urgencia: 8,
        dataDeteccao: new Date(Date.now() - 15 * 60 * 1000),
        prazoResposta: new Date(Date.now() + 45 * 60 * 1000),
        impactoEstimado: -25,
        acoesPendentes: 3
      },
      {
        id: '2',
        titulo: 'Oportunidade: Adversário em Polêmica',
        descricao: 'João Silva envolvido em escândalo financeiro - oportunidade de posicionamento',
        tipo: 'OPORTUNIDADE_MIDIA',
        severidade: 'MEDIA',
        status: 'EM_ANALISE',
        fonte: 'Folha de S.Paulo',
        alcance: 120000,
        sentimento: 0.8,
        urgencia: 6,
        dataDeteccao: new Date(Date.now() - 45 * 60 * 1000),
        prazoResposta: new Date(Date.now() + 2 * 60 * 60 * 1000),
        impactoEstimado: 35,
        responsavel: 'Ana Costa',
        acoesPendentes: 2
      },
      {
        id: '3',
        titulo: 'Pesquisa Mostra Crescimento',
        descricao: 'Nova pesquisa DataFolha: Ronaldo 47% (+3%), João 38% (-2%)',
        tipo: 'TRENDING_TOPIC',
        severidade: 'BAIXA',
        status: 'MONITORANDO',
        fonte: 'DataFolha',
        alcance: 200000,
        sentimento: 0.9,
        urgencia: 3,
        dataDeteccao: new Date(Date.now() - 2 * 60 * 60 * 1000),
        impactoEstimado: 45,
        responsavel: 'Carlos Lima',
        acoesPendentes: 1
      }
    ];

    const equipeSimulada: MembroEquipe[] = [
      {
        id: '1',
        nome: 'Ana Costa Silva',
        papel: 'Coordenadora de Crises',
        status: 'OCUPADO',
        cargaTrabalho: 85,
        eventosAtivos: 2,
        telefone: '(11) 99999-0001',
        ultimaAtividade: new Date(Date.now() - 5 * 60 * 1000)
      },
      {
        id: '2',
        nome: 'Carlos Lima Santos',
        papel: 'Analista de Mídia',
        status: 'DISPONIVEL',
        cargaTrabalho: 45,
        eventosAtivos: 1,
        telefone: '(11) 99999-0002',
        ultimaAtividade: new Date(Date.now() - 2 * 60 * 1000)
      },
      {
        id: '3',
        nome: 'Maria Oliveira',
        papel: 'Especialista em Redes',
        status: 'DISPONIVEL',
        cargaTrabalho: 30,
        eventosAtivos: 0,
        telefone: '(11) 99999-0003',
        ultimaAtividade: new Date(Date.now() - 10 * 60 * 1000)
      },
      {
        id: '4',
        nome: 'Pedro Santos',
        papel: 'Assessor de Imprensa',
        status: 'AUSENTE',
        cargaTrabalho: 0,
        eventosAtivos: 0,
        telefone: '(11) 99999-0004',
        ultimaAtividade: new Date(Date.now() - 3 * 60 * 60 * 1000)
      }
    ];

    const metricasSimuladas: MetricaTempoReal[] = [
      {
        label: 'Eventos Ativos',
        valor: eventosSimulados.filter(e => ['DETECTADO', 'EM_ANALISE', 'EM_RESPOSTA'].includes(e.status)).length,
        variacao: 2,
        tipo: 'alerta',
        icone: AlertTriangle
      },
      {
        label: 'Crises Críticas',
        valor: eventosSimulados.filter(e => e.severidade === 'CRITICA' || e.severidade === 'EMERGENCIA').length,
        tipo: 'negativo',
        icone: Shield
      },
      {
        label: 'Oportunidades',
        valor: eventosSimulados.filter(e => e.tipo === 'OPORTUNIDADE_MIDIA').length,
        variacao: 1,
        tipo: 'positivo',
        icone: TrendingUp
      },
      {
        label: 'Equipe Ativa',
        valor: `${equipeSimulada.filter(m => m.status !== 'OFFLINE' && m.status !== 'AUSENTE').length}/${equipeSimulada.length}`,
        tipo: 'neutro',
        icone: Users
      },
      {
        label: 'Tempo Médio Resposta',
        valor: '18min',
        variacao: -5,
        tipo: 'positivo',
        icone: Clock
      },
      {
        label: 'Alcance Total',
        valor: '365K',
        variacao: 12,
        tipo: 'neutro',
        icone: Eye
      }
    ];

    const mockMonitoringData: MonitoringData = {
        totalMentions: 2847 + Math.floor(Math.random() * 200),
        positiveMentions: 1247 + Math.floor(Math.random() * 100),
        negativeMentions: 89 + Math.floor(Math.random() * 20),
        neutralMentions: 156 + Math.floor(Math.random() * 50),
        sentimentScore: 0.78 + (Math.random() - 0.5) * 0.1,
        topHashtags: [
        { tag: 'FuturoDoRS', count: 2340, trend: 'up' },
        { tag: 'RonaldoNogueira', count: 1890, trend: 'up' },
        { tag: 'Transparência', count: 1456, trend: 'stable' },
        { tag: 'Educação', count: 1234, trend: 'up' },
        { tag: 'Emprego', count: 987, trend: 'down' }
        ],
        topInfluencers: [
          { name: '@politicars', followers: 50000, sentiment: 0.85, reach: 45000 },
          { name: '@jornalrs', followers: 120000, sentiment: 0.65, reach: 38000 },
          { name: '@blogpolitico', followers: 25000, sentiment: 0.92, reach: 22000 },
          { name: '@analistapolitico', followers: 15000, sentiment: 0.78, reach: 18000 }
        ],
        geographicData: [
          { region: 'Porto Alegre', mentions: 1240, sentiment: 0.82 },
          { region: 'Caxias do Sul', mentions: 456, sentiment: 0.75 },
          { region: 'Pelotas', mentions: 234, sentiment: 0.68 },
          { region: 'Santa Maria', mentions: 189, sentiment: 0.71 },
          { region: 'Canoas', mentions: 156, sentiment: 0.79 }
        ],
        realTimeActivity: [
          { platform: 'Twitter', content: 'Ronaldo Nogueira apresentou proposta inovadora para educação', timestamp: '2 min atrás', sentiment: 0.85 },
          { platform: 'Instagram', content: 'Post sobre transparência viraliza com 2.3K curtidas', timestamp: '5 min atrás', sentiment: 0.92 },
          { platform: 'Facebook', content: 'Debate sobre impostos gera discussão acalorada', timestamp: '8 min atrás', sentiment: 0.45 },
          { platform: 'YouTube', content: 'Vídeo de campanha atinge 10K visualizações', timestamp: '12 min atrás', sentiment: 0.88 }
        ]
      };
      
    setEventos(eventosSimulados);
    setEquipe(equipeSimulada);
    setMetricas(metricasSimuladas);
    setMonitoringData(mockMonitoringData);

    // Determinar modo de operação baseado nos eventos
    const eventosCriticos = eventosSimulados.filter(e => 
      e.severidade === 'CRITICA' || e.severidade === 'EMERGENCIA'
    );
    const eventosAlta = eventosSimulados.filter(e => e.severidade === 'ALTA');

    if (eventosCriticos.length > 0) {
      setModoOperacao('CRISE');
    } else if (eventosAlta.length > 0) {
      setModoOperacao('ALERTA');
    } else {
      setModoOperacao('NORMAL');
    }

      setLoading(false);
  }, [candidateId]);

  // Atualização em tempo real
  useEffect(() => {
    if (!tempoReal) return;

    const interval = setInterval(() => {
      setUltimaAtualizacao(new Date());
      // Aqui seria feita a atualização real dos dados
    }, 30000); // Atualiza a cada 30 segundos

    return () => clearInterval(interval);
  }, [tempoReal]);

  const getSeveridadeColor = (severidade: string) => {
    switch (severidade) {
      case 'BAIXA': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'MEDIA': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'ALTA': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'CRITICA': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'EMERGENCIA': return 'bg-red-600/30 text-red-200 border-red-600/50 animate-pulse';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DETECTADO': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'EM_ANALISE': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'EM_RESPOSTA': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'MONITORANDO': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'RESOLVIDO': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getStatusMembroColor = (status: string) => {
    switch (status) {
      case 'DISPONIVEL': return 'bg-green-500';
      case 'OCUPADO': return 'bg-yellow-500';
      case 'AUSENTE': return 'bg-orange-500';
      case 'OFFLINE': return 'bg-red-500';
      default: return 'bg-slate-500';
    }
  };

  const getModoOperacaoStyle = () => {
    switch (modoOperacao) {
      case 'NORMAL': return 'border-green-500/30 bg-green-500/5';
      case 'ALERTA': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'CRISE': return 'border-red-500/30 bg-red-500/5 animate-pulse';
    }
  };

  const formatTempo = (data: Date) => {
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

  const formatPrazo = (data?: Date) => {
    if (!data) return null;
    const agora = new Date();
    const diff = data.getTime() - agora.getTime();
    const minutos = Math.floor(diff / (1000 * 60));
    
    if (minutos < 0) return <span className="text-red-400">Atrasado</span>;
    if (minutos < 60) return <span className="text-yellow-400">{minutos}min restantes</span>;
    const horas = Math.floor(minutos / 60);
    return <span className="text-green-400">{horas}h restantes</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Carregando Sala de Guerra...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 fade-in">
      {/* Header com Status Operacional */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-white">Sala de Guerra</h1>
            <div className={`px-3 py-1 rounded-lg border ${getModoOperacaoStyle()}`}>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  modoOperacao === 'NORMAL' ? 'bg-green-500' :
                  modoOperacao === 'ALERTA' ? 'bg-yellow-500' : 'bg-red-500'
                } ${modoOperacao === 'CRISE' ? 'animate-pulse' : ''}`} />
                <span className="text-sm font-medium text-white">MODO {modoOperacao}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Centro de comando em tempo real • Última atualização: {ultimaAtualizacao.toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={tempoReal ? "default" : "outline"}
            onClick={() => setTempoReal(!tempoReal)}
            className={tempoReal ? "bg-green-600 hover:bg-green-700" : ""}
            size="sm"
          >
            {tempoReal ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {tempoReal ? 'Pausar' : 'Tempo Real'}
          </Button>
          
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Config
          </Button>
        </div>
      </div>

          {/* Métricas em Tempo Real */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {metricas.map((metrica, index) => {
          const Icon = metrica.icone;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`glass-card ${
                metrica.tipo === 'alerta' ? 'border-yellow-500/30 bg-yellow-500/5' :
                metrica.tipo === 'negativo' ? 'border-red-500/30 bg-red-500/5' :
                metrica.tipo === 'positivo' ? 'border-green-500/30 bg-green-500/5' :
                'border-slate-600'
              }`}>
                <CardContent className="p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Icon className={`w-4 h-4 ${
                      metrica.tipo === 'alerta' ? 'text-yellow-400' :
                      metrica.tipo === 'negativo' ? 'text-red-400' :
                      metrica.tipo === 'positivo' ? 'text-green-400' :
                      'text-slate-400'
                    }`} />
                  </div>
                  <div className="text-xl font-bold text-white mb-0.5">{metrica.valor}</div>
                  <div className="text-xs text-slate-400 mb-0.5">{metrica.label}</div>
                  {metrica.variacao && (
                    <div className={`text-xs flex items-center justify-center ${
                      metrica.variacao > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {metrica.variacao > 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                      {Math.abs(metrica.variacao)}%
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Layout Principal: 3 Colunas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Coluna 1: Eventos Críticos */}
        <div className="space-y-3">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Eventos Críticos</span>
                </div>
                <Badge variant="outline" className="text-red-400 border-red-400 text-xs">
                  {eventos.filter(e => ['DETECTADO', 'EM_ANALISE', 'EM_RESPOSTA'].includes(e.status)).length} Ativos
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-80 overflow-y-auto">
              <AnimatePresence>
                {eventos
                  .filter(e => ['DETECTADO', 'EM_ANALISE', 'EM_RESPOSTA'].includes(e.status))
                  .sort((a, b) => b.urgencia - a.urgencia)
                  .map((evento, index) => (
                    <motion.div
                      key={evento.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 bg-slate-800/30 rounded-lg border border-slate-700 hover:bg-slate-800/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-sm">{evento.titulo}</h4>
                          <p className="text-xs text-slate-400 mt-1">{evento.descricao}</p>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                          <div className={`w-2 h-2 rounded-full ${
                            evento.urgencia >= 8 ? 'bg-red-500 animate-pulse' :
                            evento.urgencia >= 6 ? 'bg-orange-500' :
                            evento.urgencia >= 4 ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <span className="text-xs text-slate-400">{evento.urgencia}/10</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        <Badge className={getSeveridadeColor(evento.severidade)} variant="outline">
                          {evento.severidade}
                        </Badge>
                        <Badge className={getStatusColor(evento.status)} variant="outline">
                          {evento.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <div className="flex items-center space-x-2">
                          <span>{evento.fonte}</span>
                          <span>{evento.alcance.toLocaleString()}</span>
                        </div>
                        <div className="text-right">
                          <div>{formatTempo(evento.dataDeteccao)}</div>
                          {evento.prazoResposta && (
                            <div className="text-xs">{formatPrazo(evento.prazoResposta)}</div>
                          )}
                        </div>
                      </div>
                      
                      {evento.acoesPendentes > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-700">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                              {evento.acoesPendentes} ações pendentes
                            </span>
                            <Button size="sm" className="h-6 text-xs">
                              Ver Ações
                            </Button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
              </AnimatePresence>
              
              {eventos.filter(e => ['DETECTADO', 'EM_ANALISE', 'EM_RESPOSTA'].includes(e.status)).length === 0 && (
                <div className="text-center py-6 text-slate-400">
                  <Shield className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhum evento crítico ativo</p>
                  <p className="text-xs mt-1">Sistema em monitoramento contínuo</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Oportunidades */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-400" />
                  <span>Oportunidades</span>
                </div>
                <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                  {eventos.filter(e => e.tipo === 'OPORTUNIDADE_MIDIA').length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {eventos
                .filter(e => e.tipo === 'OPORTUNIDADE_MIDIA')
                .map((evento) => (
                  <div key={evento.id} className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h4 className="font-medium text-white text-sm mb-1">{evento.titulo}</h4>
                    <p className="text-xs text-slate-400 mb-2">{evento.descricao}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-green-400">+{evento.impactoEstimado}%</span>
                        <span className="text-xs text-slate-400">{evento.alcance.toLocaleString()}</span>
                      </div>
                      <Button size="sm" className="h-6 text-xs bg-green-600 hover:bg-green-700">
                        Explorar
                      </Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        {/* Coluna 2: Monitoramento e Ações */}
        <div className="space-y-3">
          {/* Métricas Tempo Real */}
          {monitoringData && (
            <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Tempo Real</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                    <div className="text-xl font-bold text-white">{monitoringData.totalMentions.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">Total Menções</div>
                  </div>
                  <div className="text-center p-2 bg-slate-700/30 rounded-lg">
                    <div className="text-xl font-bold text-green-400">{(monitoringData.sentimentScore * 100).toFixed(1)}%</div>
                    <div className="text-xs text-slate-400">Positivo</div>
                </div>
              </div>
              
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                  <span className="text-green-400">Positivas: {monitoringData.positiveMentions}</span>
                  <span className="text-red-400">Negativas: {monitoringData.negativeMentions}</span>
                </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div 
                      className="bg-gradient-to-r from-red-500 to-green-500 h-1.5 rounded-full"
                    style={{ width: `${(monitoringData.positiveMentions / monitoringData.totalMentions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Top Hashtags */}
          {monitoringData && (
          <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-white">Top Hashtags</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                  {monitoringData.topHashtags.slice(0, 4).map((hashtag, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">#{hashtag.tag}</span>
                        <Badge variant="outline" className={`text-xs ${
                        hashtag.trend === 'up' ? 'text-green-400 border-green-400' :
                        hashtag.trend === 'down' ? 'text-red-400 border-red-400' :
                        'text-slate-400 border-slate-400'
                        }`}>
                        {hashtag.trend === 'up' ? '↗' : hashtag.trend === 'down' ? '↘' : '→'}
                      </Badge>
                      </div>
                      <span className="text-slate-300 text-xs">{hashtag.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          )}

          {/* Ações Rápidas */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Ações Rápidas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Post Redes
                </Button>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-xs">
                  <Phone className="w-3 h-3 mr-1" />
                  Imprensa
                </Button>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-xs">
                  <Bell className="w-3 h-3 mr-1" />
                  Alerta Base
                </Button>
                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-xs">
                  <Shield className="w-3 h-3 mr-1" />
                  Crise
                </Button>
                      </div>
              
              <div className="pt-2 border-t border-slate-700">
                <h5 className="text-xs font-medium text-white mb-2">Templates Rápidos</h5>
                <div className="space-y-1">
                  <button className="w-full text-left p-2 bg-slate-800/30 rounded text-xs text-slate-300 hover:bg-slate-800/50 transition-all">
                    📢 Esclarecimento fake news
                  </button>
                  <button className="w-full text-left p-2 bg-slate-800/30 rounded text-xs text-slate-300 hover:bg-slate-800/50 transition-all">
                    🎯 Trending topic
                  </button>
                  <button className="w-full text-left p-2 bg-slate-800/30 rounded text-xs text-slate-300 hover:bg-slate-800/50 transition-all">
                    🛡️ Resposta ataque
                  </button>
                  </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna 3: Equipe e Status */}
        <div className="space-y-3">
          {/* Equipe Operacional */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-base">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Equipe Operacional</span>
                </div>
                <Badge variant="outline" className="text-blue-400 border-blue-400 text-xs">
                  {equipe.filter(m => m.status === 'DISPONIVEL' || m.status === 'OCUPADO').length}/{equipe.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {equipe.map((membro, index) => (
                <motion.div
                  key={membro.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-2 bg-slate-800/30 rounded-lg border border-slate-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {membro.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-800 ${getStatusMembroColor(membro.status)}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-white text-sm">{membro.nome}</h4>
                        <p className="text-xs text-slate-400">{membro.papel}</p>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="h-6 text-xs">
                      <Phone className="w-3 h-3" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Carga</span>
                      <span className="text-white">{membro.cargaTrabalho}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full transition-all ${
                          membro.cargaTrabalho >= 80 ? 'bg-red-500' :
                          membro.cargaTrabalho >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${membro.cargaTrabalho}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1 text-xs text-slate-400">
                    <span>{membro.eventosAtivos} eventos</span>
                    <span>{formatTempo(membro.ultimaAtividade)}</span>
                  </div>
                </motion.div>
                ))}
            </CardContent>
          </Card>

          {/* Análise Geográfica */}
          {monitoringData && (
          <Card className="glass-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center space-x-2 text-base">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>Análise Geográfica</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-2">
                  {monitoringData.geographicData.slice(0, 4).map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg">
                    <div>
                        <div className="text-sm text-white font-medium">{region.region}</div>
                        <div className="text-xs text-slate-400">{region.mentions} menções</div>
                    </div>
                    <div className="text-right">
                        <div className={`text-xs ${
                        region.sentiment > 0.7 ? 'text-green-400' :
                        region.sentiment > 0.4 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                          {(region.sentiment * 100).toFixed(0)}%
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
      )}

          {/* Status do Sistema */}
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Activity className="w-4 h-4 text-green-400" />
                <span>Status do Sistema</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Monitoramento</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400">Ativo</span>
                  </div>
              </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">Alertas</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-green-400">OK</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">APIs</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-xs text-yellow-400">Parcial</span>
                  </div>
                </div>
                  </div>
              
              <div className="pt-2 border-t border-slate-700">
                <div className="text-xs text-slate-400 space-y-0.5">
                  <div>Última sync: {ultimaAtualizacao.toLocaleTimeString()}</div>
                  <div>Uptime: 99.8% (30 dias)</div>
                  <div>Latência: 120ms</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
