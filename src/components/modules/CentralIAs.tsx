'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, Activity, Zap, Users, Target, TrendingUp, 
  CheckCircle, AlertTriangle, Clock, Settings, Play, Pause,
  MessageSquare, Shield, MapPin, BarChart3, Eye, Globe
} from 'lucide-react';

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

  return (
    <div className="h-full w-full p-6 space-y-6 overflow-y-auto">
      {/* Header com Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">IAs Ativas</p>
                <p className="text-2xl font-bold text-white">{estatisticasGerais.iasAtivas}/{estatisticasGerais.totalIAs}</p>
                <div className="flex items-center mt-1">
                  <Activity className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">100% operacional</span>
                </div>
              </div>
              <Brain className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Performance Média</p>
                <p className="text-2xl font-bold text-white">{estatisticasGerais.performanceMedia}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Excelente</span>
                </div>
              </div>
              <Zap className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Uptime Médio</p>
                <p className="text-2xl font-bold text-white">{estatisticasGerais.uptimeMedia}%</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Estável</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Processamentos</p>
                <p className="text-2xl font-bold text-white">{estatisticasGerais.totalProcessamentos.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <Users className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-sm text-blue-400">+12% hoje</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
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