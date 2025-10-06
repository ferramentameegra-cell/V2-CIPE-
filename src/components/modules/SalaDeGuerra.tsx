'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingUp, Users, Clock, MapPin, MessageSquare, Eye, Zap } from 'lucide-react';
import OracleCipe from '@/components/OracleCipe';

interface SalaDeGuerraProps {
  candidateId: string;
}

interface CrisisAlert {
  id: string;
  type: 'crisis' | 'opportunity' | 'threat';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  reach: number;
  engagement: number;
  sentiment: number;
  velocity: number;
  timestamp: string;
  status: 'active' | 'monitoring' | 'resolved';
  assignedTo?: string;
  actions: string[];
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

export default function SalaDeGuerra({ candidateId }: SalaDeGuerraProps) {
  const [crises, setCrises] = useState<CrisisAlert[]>([]);
  const [monitoringData, setMonitoringData] = useState<MonitoringData | null>(null);
  const [activeTab, setActiveTab] = useState<'monitoring' | 'analysis' | 'action'>('monitoring');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrises();
    fetchMonitoringData();
    
    // Simular atualizações em tempo real
    const interval = setInterval(() => {
      fetchMonitoringData();
    }, 30000); // Atualizar a cada 30 segundos

    return () => clearInterval(interval);
  }, [candidateId]);

  const fetchCrises = async () => {
    try {
      const response = await fetch(`/api/alerts?candidateId=${candidateId}&type=crisis&status=active`);
      const data = await response.json();
      if (data.success) {
        setCrises(data.data.alerts);
      }
    } catch (error) {
      console.error('Erro ao buscar crises:', error);
    }
  };

  const fetchMonitoringData = async () => {
    try {
      // Simular dados de monitoramento em tempo real
      const mockData: MonitoringData = {
        totalMentions: 2847 + Math.floor(Math.random() * 200),
        positiveMentions: 1247 + Math.floor(Math.random() * 100),
        negativeMentions: 89 + Math.floor(Math.random() * 20),
        neutralMentions: 156 + Math.floor(Math.random() * 50),
        sentimentScore: 0.78 + (Math.random() - 0.5) * 0.1,
        topHashtags: [
          { tag: '#FuturoDoRS', count: 2340, trend: 'up' },
          { tag: '#RonaldoNogueira', count: 1890, trend: 'up' },
          { tag: '#Transparência', count: 1456, trend: 'stable' },
          { tag: '#Educação', count: 1234, trend: 'up' },
          { tag: '#Emprego', count: 987, trend: 'down' }
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
      
      setMonitoringData(mockData);
    } catch (error) {
      console.error('Erro ao buscar dados de monitoramento:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCrisisAction = async (crisisId: string, action: string) => {
    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alertId: crisisId,
          action: action,
          assignedTo: 'Equipe de Crise'
        })
      });

      if (response.ok) {
        fetchCrises(); // Atualizar lista
      }
    } catch (error) {
      console.error('Erro ao executar ação:', error);
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
    <div className="space-y-6">
      {/* Oracle CIPE para Sala de Guerra */}
      <OracleCipe 
        candidateId={candidateId} 
        context="sala_guerra"
        placeholder="Há alguma crise emergente? Como está o sentimento?"
      />

      {/* Tabs de Navegação */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg">
        {[
          { id: 'monitoring', label: 'Monitoramento', icon: Eye },
          { id: 'analysis', label: 'Análise', icon: TrendingUp },
          { id: 'action', label: 'Ação', icon: Zap }
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
      {activeTab === 'monitoring' && monitoringData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Métricas em Tempo Real */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Métricas em Tempo Real
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-white">{monitoringData.totalMentions.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Total de Menções</div>
                </div>
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{(monitoringData.sentimentScore * 100).toFixed(1)}%</div>
                  <div className="text-sm text-slate-400">Sentimento Positivo</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">Positivas: {monitoringData.positiveMentions}</span>
                  <span className="text-red-400">Negativas: {monitoringData.negativeMentions}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full"
                    style={{ width: `${(monitoringData.positiveMentions / monitoringData.totalMentions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Hashtags */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Top Hashtags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monitoringData.topHashtags.map((hashtag, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">#{hashtag.tag}</span>
                      <Badge variant="outline" className={
                        hashtag.trend === 'up' ? 'text-green-400 border-green-400' :
                        hashtag.trend === 'down' ? 'text-red-400 border-red-400' :
                        'text-slate-400 border-slate-400'
                      }>
                        {hashtag.trend === 'up' ? '↗' : hashtag.trend === 'down' ? '↘' : '→'}
                      </Badge>
                    </div>
                    <span className="text-slate-300">{hashtag.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Atividade em Tempo Real */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {monitoringData.realTimeActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-2 bg-slate-700/30 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.sentiment > 0.7 ? 'bg-green-400' :
                      activity.sentiment > 0.4 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm text-white">{activity.content}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        {activity.platform} • {activity.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'analysis' && monitoringData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Análise de Influenciadores */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Top Influenciadores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monitoringData.topInfluencers.map((influencer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{influencer.name}</div>
                      <div className="text-sm text-slate-400">{influencer.followers.toLocaleString()} seguidores</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm ${
                        influencer.sentiment > 0.7 ? 'text-green-400' :
                        influencer.sentiment > 0.4 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {(influencer.sentiment * 100).toFixed(0)}% positivo
                      </div>
                      <div className="text-xs text-slate-400">
                        {influencer.reach.toLocaleString()} alcance
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Análise Geográfica */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Análise Geográfica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monitoringData.geographicData.map((region, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div>
                      <div className="text-white font-medium">{region.region}</div>
                      <div className="text-sm text-slate-400">{region.mentions} menções</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm ${
                        region.sentiment > 0.7 ? 'text-green-400' :
                        region.sentiment > 0.4 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {(region.sentiment * 100).toFixed(0)}% positivo
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'action' && (
        <div className="space-y-6">
          {/* Crises Ativas */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Crises Ativas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {crises.length === 0 ? (
                  <div className="text-center py-8 text-slate-400">
                    <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma crise ativa no momento</p>
                  </div>
                ) : (
                  crises.map((crisis) => (
                    <div key={crisis.id} className={`p-4 rounded-lg border ${
                      crisis.severity === 'critical' ? 'bg-red-500/10 border-red-500/20' :
                      crisis.severity === 'high' ? 'bg-orange-500/10 border-orange-500/20' :
                      crisis.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/20' :
                      'bg-blue-500/10 border-blue-500/20'
                    }`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-white font-semibold">{crisis.title}</h3>
                            <Badge variant="outline" className={
                              crisis.severity === 'critical' ? 'text-red-400 border-red-400' :
                              crisis.severity === 'high' ? 'text-orange-400 border-orange-400' :
                              crisis.severity === 'medium' ? 'text-yellow-400 border-yellow-400' :
                              'text-blue-400 border-blue-400'
                            }>
                              {crisis.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-slate-300 text-sm mb-3">{crisis.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-slate-400">
                            <span>Alcance: {crisis.reach.toLocaleString()}</span>
                            <span>Engajamento: {crisis.engagement}</span>
                            <span>Velocidade: {crisis.velocity}/h</span>
                            <span>Fonte: {crisis.source}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCrisisAction(crisis.id, 'assign')}
                            className="text-xs"
                          >
                            Atribuir
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCrisisAction(crisis.id, 'resolve')}
                            className="text-xs"
                          >
                            Resolver
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Ações Recomendadas */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Ações Recomendadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-green-400 font-medium">Oportunidade de Engajamento</div>
                  <div className="text-sm text-slate-300 mt-1">
                    Hashtag #FuturoDoRS está viralizando. Considere criar conteúdo relacionado.
                  </div>
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="text-yellow-400 font-medium">Monitoramento Intensivo</div>
                  <div className="text-sm text-slate-300 mt-1">
                    Aumento de menções sobre "impostos". Prepare resposta proativa.
                  </div>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="text-blue-400 font-medium">Parceria Estratégica</div>
                  <div className="text-sm text-slate-300 mt-1">
                    Influenciador @politicars demonstrou interesse. Inicie contato.
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
