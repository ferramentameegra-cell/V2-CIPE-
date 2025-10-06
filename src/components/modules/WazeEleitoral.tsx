'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar, TrendingUp, Target, Clock, Star, Route, Zap } from 'lucide-react';
import OracleCipe from '@/components/OracleCipe';

interface WazeEleitoralProps {
  candidateId: string;
}

interface RouteData {
  id: string;
  name: string;
  priority: 'high' | 'medium' | 'low';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: number; // em dias
  potentialVotes: number;
  currentProgress: number;
  status: 'planning' | 'active' | 'completed' | 'paused';
  milestones: Array<{
    id: string;
    name: string;
    completed: boolean;
    deadline: string;
    impact: number;
  }>;
  resources: {
    budget: number;
    team: number;
    materials: number;
  };
  risks: Array<{
    id: string;
    description: string;
    probability: number;
    impact: number;
    mitigation: string;
  }>;
}

interface GeographicData {
  region: string;
  population: number;
  potentialVotes: number;
  currentSupport: number;
  difficulty: number;
  priority: number;
  events: Array<{
    id: string;
    name: string;
    date: string;
    type: 'rally' | 'debate' | 'meeting' | 'interview';
    expectedAttendance: number;
    status: 'scheduled' | 'completed' | 'cancelled';
  }>;
}

export default function WazeEleitoral({ candidateId }: WazeEleitoralProps) {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [geographicData, setGeographicData] = useState<GeographicData[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'routes' | 'geography' | 'optimization'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoutes();
    fetchGeographicData();
  }, [candidateId]);

  const fetchRoutes = async () => {
    try {
      // Simular dados de rotas eleitorais
      const mockRoutes: RouteData[] = [
        {
          id: 'route_001',
          name: 'Rota Porto Alegre - Capital',
          priority: 'high',
          difficulty: 'medium',
          estimatedTime: 45,
          potentialVotes: 45000,
          currentProgress: 65,
          status: 'active',
          milestones: [
            { id: 'm1', name: 'Campanha Digital', completed: true, deadline: '2024-01-15', impact: 8 },
            { id: 'm2', name: 'Eventos Presenciais', completed: true, deadline: '2024-02-01', impact: 9 },
            { id: 'm3', name: 'Parcerias Locais', completed: false, deadline: '2024-02-15', impact: 7 },
            { id: 'm4', name: 'Mobilização Final', completed: false, deadline: '2024-03-01', impact: 10 }
          ],
          resources: { budget: 150000, team: 12, materials: 8 },
          risks: [
            { id: 'r1', description: 'Concorrente forte na região', probability: 0.7, impact: 8, mitigation: 'Focar em diferenciais únicos' },
            { id: 'r2', description: 'Orçamento limitado', probability: 0.4, impact: 6, mitigation: 'Otimizar gastos e buscar patrocínios' }
          ]
        },
        {
          id: 'route_002',
          name: 'Rota Interior - Caxias do Sul',
          priority: 'high',
          difficulty: 'hard',
          estimatedTime: 60,
          potentialVotes: 25000,
          currentProgress: 30,
          status: 'planning',
          milestones: [
            { id: 'm1', name: 'Reconhecimento da Região', completed: true, deadline: '2024-01-10', impact: 6 },
            { id: 'm2', name: 'Contatos Locais', completed: false, deadline: '2024-01-25', impact: 8 },
            { id: 'm3', name: 'Eventos de Campo', completed: false, deadline: '2024-02-10', impact: 9 },
            { id: 'm4', name: 'Mobilização Rural', completed: false, deadline: '2024-02-25', impact: 7 }
          ],
          resources: { budget: 200000, team: 8, materials: 12 },
          risks: [
            { id: 'r1', description: 'Dificuldade de acesso rural', probability: 0.8, impact: 7, mitigation: 'Usar tecnologia e parcerias locais' },
            { id: 'r2', description: 'Tradição política local', probability: 0.6, impact: 8, mitigation: 'Respeitar cultura local e construir confiança' }
          ]
        },
        {
          id: 'route_003',
          name: 'Rota Sul - Pelotas',
          priority: 'medium',
          difficulty: 'easy',
          estimatedTime: 30,
          potentialVotes: 18000,
          currentProgress: 80,
          status: 'active',
          milestones: [
            { id: 'm1', name: 'Base Eleitoral', completed: true, deadline: '2024-01-05', impact: 8 },
            { id: 'm2', name: 'Eventos Universitários', completed: true, deadline: '2024-01-20', impact: 7 },
            { id: 'm3', name: 'Mídia Local', completed: true, deadline: '2024-02-05', impact: 6 },
            { id: 'm4', name: 'Finalização', completed: false, deadline: '2024-02-20', impact: 5 }
          ],
          resources: { budget: 80000, team: 6, materials: 4 },
          risks: [
            { id: 'r1', description: 'Concorrência universitária', probability: 0.5, impact: 5, mitigation: 'Focar em propostas para jovens' }
          ]
        }
      ];
      
      setRoutes(mockRoutes);
    } catch (error) {
      console.error('Erro ao buscar rotas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGeographicData = async () => {
    try {
      const mockData: GeographicData[] = [
        {
          region: 'Porto Alegre',
          population: 1500000,
          potentialVotes: 45000,
          currentSupport: 65,
          difficulty: 6,
          priority: 9,
          events: [
            { id: 'e1', name: 'Rally Central', date: '2024-02-15', type: 'rally', expectedAttendance: 5000, status: 'scheduled' },
            { id: 'e2', name: 'Debate TV', date: '2024-02-20', type: 'debate', expectedAttendance: 100000, status: 'scheduled' }
          ]
        },
        {
          region: 'Caxias do Sul',
          population: 500000,
          potentialVotes: 25000,
          currentSupport: 45,
          difficulty: 8,
          priority: 8,
          events: [
            { id: 'e3', name: 'Reunião Empresários', date: '2024-02-10', type: 'meeting', expectedAttendance: 200, status: 'scheduled' }
          ]
        },
        {
          region: 'Pelotas',
          population: 350000,
          potentialVotes: 18000,
          currentSupport: 70,
          difficulty: 4,
          priority: 6,
          events: [
            { id: 'e4', name: 'Evento Universitário', date: '2024-02-05', type: 'rally', expectedAttendance: 1000, status: 'completed' }
          ]
        }
      ];
      
      setGeographicData(mockData);
    } catch (error) {
      console.error('Erro ao buscar dados geográficos:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 border-red-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'low': return 'text-green-400 border-green-400';
      default: return 'text-slate-400 border-slate-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 border-green-400';
      case 'planning': return 'text-blue-400 border-blue-400';
      case 'completed': return 'text-purple-400 border-purple-400';
      case 'paused': return 'text-yellow-400 border-yellow-400';
      default: return 'text-slate-400 border-slate-400';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Carregando Waze Eleitoral...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Oracle CIPE para Waze Eleitoral */}
      <OracleCipe 
        candidateId={candidateId} 
        context="waze_eleitoral"
        placeholder="Qual a melhor rota para vitória? Como otimizar a agenda?"
      />

      {/* Tabs de Navegação */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Visão Geral', icon: Target },
          { id: 'routes', label: 'Rotas', icon: Route },
          { id: 'geography', label: 'Geografia', icon: MapPin },
          { id: 'optimization', label: 'Otimização', icon: Zap }
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
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resumo das Rotas */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Resumo das Rotas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-white">{routes.length}</div>
                    <div className="text-sm text-slate-400">Rotas Ativas</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">
                      {routes.reduce((acc, route) => acc + route.potentialVotes, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-400">Votos Potenciais</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Progresso Médio</span>
                    <span className="text-white">
                      {Math.round(routes.reduce((acc, route) => acc + route.currentProgress, 0) / routes.length)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                      style={{ width: `${routes.reduce((acc, route) => acc + route.currentProgress, 0) / routes.length}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próximas Ações */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Próximas Ações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routes
                  .filter(route => route.status === 'active')
                  .flatMap(route => route.milestones.filter(m => !m.completed))
                  .slice(0, 5)
                  .map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                      <div>
                        <div className="text-white text-sm font-medium">{milestone.name}</div>
                        <div className="text-xs text-slate-400">Prazo: {milestone.deadline}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Impacto: {milestone.impact}/10
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Alertas de Risco */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Alertas de Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routes
                  .flatMap(route => route.risks)
                  .filter(risk => risk.probability > 0.6)
                  .slice(0, 3)
                  .map((risk, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      risk.impact > 7 ? 'bg-red-500/10 border-red-500/20' :
                      risk.impact > 5 ? 'bg-yellow-500/10 border-yellow-500/20' :
                      'bg-blue-500/10 border-blue-500/20'
                    }`}>
                      <div className="text-white text-sm font-medium">{risk.description}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        Probabilidade: {(risk.probability * 100).toFixed(0)}% | 
                        Impacto: {risk.impact}/10
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'routes' && (
        <div className="space-y-6">
          {routes.map((route) => (
            <Card key={route.id} className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{route.name}</CardTitle>
                  <div className="flex space-x-2">
                    <Badge variant="outline" className={getPriorityColor(route.priority)}>
                      {route.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(route.status)}>
                      {route.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Informações Básicas */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Informações</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Dificuldade:</span>
                          <span className="text-white">{route.difficulty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Tempo Estimado:</span>
                          <span className="text-white">{route.estimatedTime} dias</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Votos Potenciais:</span>
                          <span className="text-white">{route.potentialVotes.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-2">Progresso</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Concluído</span>
                          <span className="text-white">{route.currentProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                            style={{ width: `${route.currentProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div>
                    <h4 className="text-white font-semibold mb-2">Marcos</h4>
                    <div className="space-y-2">
                      {route.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            milestone.completed ? 'bg-green-400' : 'bg-slate-600'
                          }`}></div>
                          <div className="flex-1">
                            <div className={`text-sm ${
                              milestone.completed ? 'text-slate-400 line-through' : 'text-white'
                            }`}>
                              {milestone.name}
                            </div>
                            <div className="text-xs text-slate-400">
                              {milestone.deadline} | Impacto: {milestone.impact}/10
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recursos */}
                  <div>
                    <h4 className="text-white font-semibold mb-2">Recursos</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Orçamento:</span>
                        <span className="text-white">R$ {route.resources.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Equipe:</span>
                        <span className="text-white">{route.resources.team} pessoas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Materiais:</span>
                        <span className="text-white">{route.resources.materials}/10</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-white font-semibold mb-2">Riscos</h4>
                      <div className="space-y-2">
                        {route.risks.slice(0, 2).map((risk) => (
                          <div key={risk.id} className="text-xs text-slate-300">
                            <div className="font-medium">{risk.description}</div>
                            <div className="text-slate-400">
                              {(risk.probability * 100).toFixed(0)}% | Impacto: {risk.impact}/10
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'geography' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {geographicData.map((region) => (
            <Card key={region.region} className="glass-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {region.region}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-xl font-bold text-white">{region.population.toLocaleString()}</div>
                      <div className="text-sm text-slate-400">População</div>
                    </div>
                    <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-xl font-bold text-green-400">{region.potentialVotes.toLocaleString()}</div>
                      <div className="text-sm text-slate-400">Votos Potenciais</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Apoio Atual</span>
                      <span className="text-white">{region.currentSupport}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full"
                        style={{ width: `${region.currentSupport}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dificuldade:</span>
                      <span className="text-white">{region.difficulty}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Prioridade:</span>
                      <span className="text-white">{region.priority}/10</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-2">Eventos Agendados</h4>
                    <div className="space-y-2">
                      {region.events.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                          <div>
                            <div className="text-white text-sm font-medium">{event.name}</div>
                            <div className="text-xs text-slate-400">
                              {event.date} | {event.expectedAttendance.toLocaleString()} pessoas
                            </div>
                          </div>
                          <Badge variant="outline" className={
                            event.status === 'scheduled' ? 'text-blue-400 border-blue-400' :
                            event.status === 'completed' ? 'text-green-400 border-green-400' :
                            'text-red-400 border-red-400'
                          }>
                            {event.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'optimization' && (
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Recomendações de Otimização</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-green-400 font-semibold mb-2">🎯 Prioridade Alta</div>
                  <div className="text-sm text-slate-300">
                    Focar em Porto Alegre - maior potencial de votos (45K) com dificuldade média. 
                    Aumentar investimento em eventos presenciais e parcerias locais.
                  </div>
                </div>

                <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="text-yellow-400 font-semibold mb-2">⚠️ Atenção</div>
                  <div className="text-sm text-slate-300">
                    Caxias do Sul tem alta dificuldade (8/10) mas bom potencial. 
                    Considerar estratégia diferenciada focada em empresários e lideranças locais.
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="text-blue-400 font-semibold mb-2">💡 Oportunidade</div>
                  <div className="text-sm text-slate-300">
                    Pelotas já tem 70% de apoio. Focar em consolidação e mobilização final 
                    para maximizar o retorno do investimento.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Análise de ROI por Região</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((region) => {
                  const roi = (region.potentialVotes * region.currentSupport / 100) / (region.difficulty * 10000);
                  return (
                    <div key={region.region} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div>
                        <div className="text-white font-medium">{region.region}</div>
                        <div className="text-sm text-slate-400">
                          {region.potentialVotes.toLocaleString()} votos | Dificuldade: {region.difficulty}/10
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          roi > 0.5 ? 'text-green-400' :
                          roi > 0.3 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          ROI: {(roi * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-slate-400">Eficiência</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
