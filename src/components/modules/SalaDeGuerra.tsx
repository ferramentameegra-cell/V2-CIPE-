'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, Shield, Zap, Clock, Users, Activity,
  TrendingUp, TrendingDown, Eye, Target, Play, Pause, 
  RotateCcw, Settings
} from 'lucide-react';

// Importar todos os componentes da Sala de Guerra
import MonitoramentoTempoReal from '@/components/sala-de-guerra/MonitoramentoTempoReal';
import DetectorOportunidades from '@/components/sala-de-guerra/DetectorOportunidades';
import CentralAcoesRapidas from '@/components/sala-de-guerra/CentralAcoesRapidas';
import EquipeOperacional from '@/components/sala-de-guerra/EquipeOperacional';
import TimelineEventos from '@/components/sala-de-guerra/TimelineEventos';

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

interface MetricaTempoReal {
  label: string;
  valor: number | string;
  variacao?: number;
  tipo: 'positivo' | 'negativo' | 'neutro' | 'alerta';
  icone: any;
}

export default function SalaDeGuerra({ candidateId }: { candidateId: string }) {
  const [eventos, setEventos] = useState<EventoCritico[]>([]);
  const [metricas, setMetricas] = useState<MetricaTempoReal[]>([]);
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
        descricao: 'Hashtag crítica está ganhando tração com 15K tweets',
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
        descricao: 'Adversário envolvido em escândalo - oportunidade de posicionamento',
        tipo: 'OPORTUNIDADE_MIDIA',
        severidade: 'MEDIA',
        status: 'EM_ANALISE',
        fonte: 'Mídia Nacional',
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
        descricao: 'Nova pesquisa: +3% de intenção de voto',
        tipo: 'TRENDING_TOPIC',
        severidade: 'BAIXA',
        status: 'MONITORANDO',
        fonte: 'Instituto de Pesquisa',
        alcance: 200000,
        sentimento: 0.9,
        urgencia: 3,
        dataDeteccao: new Date(Date.now() - 2 * 60 * 60 * 1000),
        impactoEstimado: 45,
        responsavel: 'Carlos Lima',
        acoesPendentes: 1
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
        valor: '3/4',
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

    setEventos(eventosSimulados);
    setMetricas(metricasSimuladas);

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
    }, 30000);

    return () => clearInterval(interval);
  }, [tempoReal]);

  const getModoOperacaoStyle = () => {
    switch (modoOperacao) {
      case 'NORMAL': return 'border-green-500/30 bg-green-500/5';
      case 'ALERTA': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'CRISE': return 'border-red-500/30 bg-red-500/5 animate-pulse';
    }
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
    <div className="space-y-6 fade-in">
      {/* Header com Status Operacional */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-white">🚨 SALA DE GUERRA - Centro de Comando</h1>
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

      {/* SEÇÃO 1: MONITORAMENTO TEMPO REAL */}
      <div className="border-t-2 border-blue-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">1. MONITORAMENTO EM TEMPO REAL</h2>
        </div>
        <MonitoramentoTempoReal candidateId={candidateId} />
      </div>

      {/* SEÇÃO 2: DETECTOR DE OPORTUNIDADES */}
      <div className="border-t-2 border-green-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">2. DETECTOR DE OPORTUNIDADES</h2>
        </div>
        <DetectorOportunidades candidateId={candidateId} />
      </div>

      {/* SEÇÃO 3: CENTRAL DE AÇÕES RÁPIDAS */}
      <div className="border-t-2 border-yellow-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">3. CENTRAL DE AÇÕES RÁPIDAS</h2>
        </div>
        <CentralAcoesRapidas candidateId={candidateId} />
      </div>

      {/* SEÇÃO 4: EQUIPE OPERACIONAL */}
      <div className="border-t-2 border-purple-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">4. EQUIPE OPERACIONAL</h2>
        </div>
        <EquipeOperacional candidateId={candidateId} />
      </div>

      {/* SEÇÃO 5: TIMELINE DE EVENTOS */}
      <div className="border-t-2 border-orange-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-6 h-6 text-orange-400" />
          <h2 className="text-xl font-bold text-white">5. HISTÓRICO E TIMELINE</h2>
        </div>
        <TimelineEventos candidateId={candidateId} />
      </div>
    </div>
  );
}
