'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, Zap, Settings, Activity, TrendingUp, 
  MessageSquare, Image, Video, FileText, BarChart3
} from 'lucide-react';
import OracleCipe from '@/components/OracleCipe';

interface CentralIAsProps {
  candidateId: string;
}

interface AIAgent {
  id: string;
  name: string;
  type: 'TEXT' | 'IMAGE' | 'VIDEO' | 'ANALYTICS' | 'SOCIAL';
  status: 'ACTIVE' | 'INACTIVE' | 'TRAINING';
  performance: number;
  tasksCompleted: number;
  lastActivity: string;
  description: string;
}

export default function CentralIAs({ candidateId }: CentralIAsProps) {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  useEffect(() => {
    fetchAIAgents();
  }, [candidateId]);

  const fetchAIAgents = async () => {
    setLoading(true);
    try {
      // Simulação de agentes de IA
      const mockAgents: AIAgent[] = [
        {
          id: '1',
          name: 'Oracle CIPE',
          type: 'TEXT',
          status: 'ACTIVE',
          performance: 95,
          tasksCompleted: 1247,
          lastActivity: '2024-01-15T10:30:00Z',
          description: 'Assistente principal para consultas estratégicas'
        },
        {
          id: '2',
          name: 'Content Generator',
          type: 'TEXT',
          status: 'ACTIVE',
          performance: 88,
          tasksCompleted: 892,
          lastActivity: '2024-01-15T10:25:00Z',
          description: 'Geração automática de conteúdo para redes sociais'
        },
        {
          id: '3',
          name: 'Image Creator',
          type: 'IMAGE',
          status: 'ACTIVE',
          performance: 92,
          tasksCompleted: 456,
          lastActivity: '2024-01-15T10:20:00Z',
          description: 'Criação de imagens e artes para campanha'
        },
        {
          id: '4',
          name: 'Video Editor',
          type: 'VIDEO',
          status: 'TRAINING',
          performance: 75,
          tasksCompleted: 123,
          lastActivity: '2024-01-15T09:45:00Z',
          description: 'Edição automática de vídeos e reels'
        },
        {
          id: '5',
          name: 'Analytics AI',
          type: 'ANALYTICS',
          status: 'ACTIVE',
          performance: 98,
          tasksCompleted: 2103,
          lastActivity: '2024-01-15T10:15:00Z',
          description: 'Análise avançada de dados e métricas'
        },
        {
          id: '6',
          name: 'Social Monitor',
          type: 'SOCIAL',
          status: 'ACTIVE',
          performance: 90,
          tasksCompleted: 1789,
          lastActivity: '2024-01-15T10:10:00Z',
          description: 'Monitoramento de menções e sentimentos'
        }
      ];
      
      setAgents(mockAgents);
    } catch (error) {
      console.error('Erro ao buscar agentes de IA:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'TEXT': return MessageSquare;
      case 'IMAGE': return Image;
      case 'VIDEO': return Video;
      case 'ANALYTICS': return BarChart3;
      case 'SOCIAL': return Activity;
      default: return Brain;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-500/20 text-green-400 border-green-400';
      case 'INACTIVE': return 'bg-red-500/20 text-red-400 border-red-400';
      case 'TRAINING': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-400';
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-400';
    if (performance >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  return (
    <div className="space-y-6 fade-in">
      <OracleCipe context="central-ias" />

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Agentes Ativos</p>
                <p className="text-2xl font-bold text-green-400">
                  {agents.filter(a => a.status === 'ACTIVE').length}
                </p>
              </div>
              <Zap className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Performance Média</p>
                <p className="text-2xl font-bold text-blue-400">
                  {agents.length > 0 ? Math.round(agents.reduce((acc, a) => acc + a.performance, 0) / agents.length) : 0}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Tarefas Hoje</p>
                <p className="text-2xl font-bold text-purple-400">
                  {agents.reduce((acc, a) => acc + a.tasksCompleted, 0)}
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Em Treinamento</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {agents.filter(a => a.status === 'TRAINING').length}
                </p>
              </div>
              <Settings className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Agentes */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-5 w-5 text-purple-400 mr-2" />
            Arsenal de Inteligências Artificiais
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-slate-400 mt-2">Carregando agentes de IA...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent) => {
                const IconComponent = getTypeIcon(agent.type);
                return (
                  <div key={agent.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <IconComponent className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{agent.name}</h3>
                          <p className="text-sm text-slate-400">{agent.type}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-slate-300 mb-3">{agent.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Performance</span>
                        <span className={`text-sm font-medium ${getPerformanceColor(agent.performance)}`}>
                          {agent.performance}%
                        </span>
                      </div>
                      <Progress value={agent.performance} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 mb-4">
                      <div>
                        <span className="block">Tarefas:</span>
                        <span className="text-white font-medium">{agent.tasksCompleted}</span>
                      </div>
                      <div>
                        <span className="block">Última Atividade:</span>
                        <span className="text-white font-medium">
                          {formatTimestamp(agent.lastActivity).split(' ')[1]}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setSelectedAgent(agent.id)}
                      >
                        Configurar
                      </Button>
                      <Button 
                        size="sm" 
                        className={`flex-1 ${
                          agent.status === 'ACTIVE' 
                            ? 'bg-red-600 hover:bg-red-700' 
                            : 'bg-green-600 hover:bg-green-700'
                        }`}
                      >
                        {agent.status === 'ACTIVE' ? 'Pausar' : 'Ativar'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configurações do Agente Selecionado */}
      {selectedAgent && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Settings className="h-5 w-5 text-blue-400 mr-2" />
              Configurações do Agente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">Configurações avançadas do agente selecionado (em desenvolvimento).</p>
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedAgent(null)}
              >
                Fechar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
