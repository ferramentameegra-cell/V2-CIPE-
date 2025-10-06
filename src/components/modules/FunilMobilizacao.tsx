'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, TrendingUp, Target, ArrowRight, CheckCircle, Clock, AlertCircle,
  UserPlus, UserCheck, UserX, BarChart3, Zap, Star, Calendar
} from 'lucide-react';
import OracleCipe from '@/components/OracleCipe';

interface FunilMobilizacaoProps {
  candidateId: string;
}

interface EtapaFunil {
  id: string;
  nome: string;
  descricao: string;
  totalEleitores: number;
  conversao: number;
  tempoMedio: number; // em dias
  acoes: string[];
  proximaEtapa: string | null;
  cor: string;
  icone: any;
}

interface MetricaFunil {
  totalEntrada: number;
  totalConversao: number;
  taxaConversaoGeral: number;
  tempoMedioTotal: number;
  custoPorConversao: number;
  roi: number;
}

interface EleitorFunil {
  id: string;
  nome: string;
  etapaAtual: string;
  diasNaEtapa: number;
  score: number;
  proximaAcao: string;
  prioridade: 'alta' | 'media' | 'baixa';
  ultimaInteracao: string;
}

export default function FunilMobilizacao({ candidateId }: FunilMobilizacaoProps) {
  const [etapas, setEtapas] = useState<EtapaFunil[]>([]);
  const [metricas, setMetricas] = useState<MetricaFunil | null>(null);
  const [eleitores, setEleitores] = useState<EleitorFunil[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'funil' | 'eleitores' | 'metricas' | 'automacao'>('funil');

  useEffect(() => {
    fetchEtapas();
    fetchMetricas();
    fetchEleitores();
  }, [candidateId]);

  const fetchEtapas = async () => {
    try {
      const mockEtapas: EtapaFunil[] = [
        {
          id: '1',
          nome: 'Awareness',
          descricao: 'Eleitores que conhecem o candidato',
          totalEleitores: 50000,
          conversao: 100,
          tempoMedio: 0,
          acoes: ['Mídia paga', 'Redes sociais', 'Eventos públicos'],
          proximaEtapa: '2',
          cor: 'blue',
          icone: Users
        },
        {
          id: '2',
          nome: 'Interest',
          descricao: 'Eleitores interessados nas propostas',
          totalEleitores: 25000,
          conversao: 50,
          tempoMedio: 7,
          acoes: ['Conteúdo educativo', 'Webinars', 'Materiais informativos'],
          proximaEtapa: '3',
          cor: 'yellow',
          icone: Target
        },
        {
          id: '3',
          nome: 'Consideration',
          descricao: 'Eleitores considerando votar',
          totalEleitores: 15000,
          conversao: 60,
          tempoMedio: 14,
          acoes: ['Contato direto', 'Apresentações', 'Debates'],
          proximaEtapa: '4',
          cor: 'orange',
          icone: Clock
        },
        {
          id: '4',
          nome: 'Intent',
          descricao: 'Eleitores com intenção de voto',
          totalEleitores: 12000,
          conversao: 80,
          tempoMedio: 21,
          acoes: ['Compromisso formal', 'Cadastro de apoiadores', 'Mobilização'],
          proximaEtapa: '5',
          cor: 'green',
          icone: CheckCircle
        },
        {
          id: '5',
          nome: 'Advocacy',
          descricao: 'Apoiadores ativos e embaixadores',
          totalEleitores: 8000,
          conversao: 67,
          tempoMedio: 30,
          acoes: ['Programa de embaixadores', 'Voluntariado', 'Indicações'],
          proximaEtapa: null,
          cor: 'purple',
          icone: Star
        }
      ];
      
      setEtapas(mockEtapas);
    } catch (error) {
      console.error('Erro ao buscar etapas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMetricas = async () => {
    try {
      const mockMetricas: MetricaFunil = {
        totalEntrada: 50000,
        totalConversao: 8000,
        taxaConversaoGeral: 16,
        tempoMedioTotal: 72,
        custoPorConversao: 25.50,
        roi: 340
      };
      
      setMetricas(mockMetricas);
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
    }
  };

  const fetchEleitores = async () => {
    try {
      const mockEleitores: EleitorFunil[] = [
        {
          id: '1',
          nome: 'Maria Silva',
          etapaAtual: '2',
          diasNaEtapa: 5,
          score: 75,
          proximaAcao: 'Enviar material educativo',
          prioridade: 'alta',
          ultimaInteracao: '2024-01-20'
        },
        {
          id: '2',
          nome: 'João Santos',
          etapaAtual: '3',
          diasNaEtapa: 12,
          score: 85,
          proximaAcao: 'Agendar reunião',
          prioridade: 'alta',
          ultimaInteracao: '2024-01-18'
        },
        {
          id: '3',
          nome: 'Ana Costa',
          etapaAtual: '4',
          diasNaEtapa: 8,
          score: 90,
          proximaAcao: 'Solicitar compromisso',
          prioridade: 'media',
          ultimaInteracao: '2024-01-19'
        },
        {
          id: '4',
          nome: 'Carlos Lima',
          etapaAtual: '1',
          diasNaEtapa: 15,
          score: 45,
          proximaAcao: 'Aumentar exposição',
          prioridade: 'baixa',
          ultimaInteracao: '2024-01-15'
        },
        {
          id: '5',
          nome: 'Fernanda Oliveira',
          etapaAtual: '5',
          diasNaEtapa: 25,
          score: 95,
          proximaAcao: 'Ativar como embaixadora',
          prioridade: 'alta',
          ultimaInteracao: '2024-01-21'
        }
      ];
      
      setEleitores(mockEleitores);
    } catch (error) {
      console.error('Erro ao buscar eleitores:', error);
    }
  };

  const getCorClasses = (cor: string) => {
    switch (cor) {
      case 'blue': return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      case 'yellow': return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400';
      case 'orange': return 'bg-orange-500/20 border-orange-500/30 text-orange-400';
      case 'green': return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'purple': return 'bg-purple-500/20 border-purple-500/30 text-purple-400';
      default: return 'bg-slate-500/20 border-slate-500/30 text-slate-400';
    }
  };

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'text-red-400 border-red-400';
      case 'media': return 'text-yellow-400 border-yellow-400';
      case 'baixa': return 'text-green-400 border-green-400';
      default: return 'text-slate-400 border-slate-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Carregando Funil de Mobilização...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Oracle CIPE para Funil de Mobilização */}
      <OracleCipe 
        candidateId={candidateId} 
        context="funil_mobilizacao"
        placeholder="Como otimizar o funil de mobilização? Quais etapas precisam de atenção?"
      />

      {/* Tabs de Navegação */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg">
        {[
          { id: 'funil', label: 'Funil Visual', icon: BarChart3 },
          { id: 'eleitores', label: 'Eleitores', icon: Users },
          { id: 'metricas', label: 'Métricas', icon: TrendingUp },
          { id: 'automacao', label: 'Automação', icon: Zap }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'funil' && (
        <div className="space-y-6">
          {/* Funil Visual */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Funil de Mobilização Eleitoral</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {etapas.map((etapa, index) => (
                  <div key={etapa.id} className="relative">
                    {/* Linha conectora */}
                    {index < etapas.length - 1 && (
                      <div className="absolute left-8 top-16 w-0.5 h-8 bg-slate-600 z-0"></div>
                    )}
                    
                    <div className={`p-6 rounded-lg border-2 ${getCorClasses(etapa.cor)} relative z-10`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center">
                            <etapa.icone className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{etapa.nome}</h3>
                            <p className="text-slate-300">{etapa.descricao}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">
                            {etapa.totalEleitores.toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-400">eleitores</div>
                          <div className="text-sm text-slate-400">
                            {etapa.conversao}% conversão
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">Progresso</span>
                          <span className="text-white">{etapa.conversao}%</span>
                        </div>
                        <Progress value={etapa.conversao} className="h-2" />
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="text-white font-semibold mb-2">Ações Principais:</h4>
                        <div className="flex flex-wrap gap-2">
                          {etapa.acoes.map((acao, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {acao}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {etapa.tempoMedio > 0 && (
                        <div className="mt-4 text-sm text-slate-400">
                          Tempo médio na etapa: {etapa.tempoMedio} dias
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Métricas do Funil */}
          {metricas && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-white">
                    {metricas.taxaConversaoGeral}%
                  </div>
                  <div className="text-sm text-slate-400">Taxa de Conversão Geral</div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-400">
                    {metricas.totalConversao.toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-400">Total Convertido</div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {metricas.tempoMedioTotal}
                  </div>
                  <div className="text-sm text-slate-400">Dias no Funil</div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    {metricas.roi}%
                  </div>
                  <div className="text-sm text-slate-400">ROI</div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {activeTab === 'eleitores' && (
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Eleitores por Etapa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eleitores.map((eleitor) => {
                  const etapa = etapas.find(e => e.id === eleitor.etapaAtual);
                  return (
                    <div key={eleitor.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {eleitor.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{eleitor.nome}</h3>
                            <p className="text-slate-400 text-sm">
                              {etapa?.nome} • {eleitor.diasNaEtapa} dias
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-bold text-white">
                              {eleitor.score}/100
                            </div>
                            <div className="text-xs text-slate-400">Score</div>
                          </div>
                          
                          <Badge variant="outline" className={getPrioridadeColor(eleitor.prioridade)}>
                            {eleitor.prioridade.toUpperCase()}
                          </Badge>
                          
                          <Button size="sm" variant="outline">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-3 p-3 bg-slate-800/50 rounded-lg">
                        <div className="text-sm text-slate-300">
                          <strong>Próxima ação:</strong> {eleitor.proximaAcao}
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Última interação: {eleitor.ultimaInteracao}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'metricas' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Análise de Conversão por Etapa */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Análise de Conversão por Etapa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {etapas.map((etapa, index) => {
                  const etapaAnterior = index > 0 ? etapas[index - 1] : null;
                  const conversaoReal = etapaAnterior ? 
                    (etapa.totalEleitores / etapaAnterior.totalEleitores) * 100 : 100;
                  
                  return (
                    <div key={etapa.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">{etapa.nome}</span>
                        <span className="text-slate-400">
                          {etapa.totalEleitores.toLocaleString()} eleitores
                        </span>
                      </div>
                      <Progress value={conversaoReal} className="h-2" />
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Conversão: {conversaoReal.toFixed(1)}%</span>
                        <span>Tempo médio: {etapa.tempoMedio} dias</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Análise de Performance */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Análise de Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-green-400 font-semibold">Melhor Etapa: Advocacy</div>
                  <div className="text-sm text-slate-300 mt-1">
                    67% de conversão com 8.000 eleitores ativos
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="text-yellow-400 font-semibold">Atenção: Interest</div>
                  <div className="text-sm text-slate-300 mt-1">
                    Apenas 50% de conversão - precisa de otimização
                  </div>
                </div>
                
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="text-blue-400 font-semibold">Oportunidade: Consideration</div>
                  <div className="text-sm text-slate-300 mt-1">
                    60% de conversão com potencial para 75%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'automacao' && (
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Automações do Funil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Automações Ativas</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">Email de Boas-vindas</span>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          Ativo
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Enviado automaticamente para novos eleitores
                      </div>
                    </div>
                    
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">Follow-up Interest</span>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          Ativo
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Após 3 dias sem interação
                      </div>
                    </div>
                    
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">Lembrete Consideration</span>
                        <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                          Pausado
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        Após 7 dias na etapa
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Configurações</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-white text-sm font-medium">Tempo de Follow-up</div>
                      <div className="text-xs text-slate-400 mt-1">
                        Interest: 3 dias | Consideration: 7 dias | Intent: 14 dias
                      </div>
                    </div>
                    
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-white text-sm font-medium">Canais de Comunicação</div>
                      <div className="text-xs text-slate-400 mt-1">
                        Email, WhatsApp, SMS, Telefone
                      </div>
                    </div>
                    
                    <div className="p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-white text-sm font-medium">Horários de Envio</div>
                      <div className="text-xs text-slate-400 mt-1">
                        9h-18h (segunda a sexta)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
