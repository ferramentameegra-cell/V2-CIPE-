'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Brain, Lightbulb, Target, AlertTriangle, TrendingUp, 
  Zap, Clock, CheckCircle, Eye, MessageSquare
} from 'lucide-react';

interface InsightOracle {
  id: string;
  tipo: 'insight' | 'oportunidade' | 'alerta' | 'recomendacao';
  titulo: string;
  conteudo: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  categoria: 'estrategia' | 'comunicacao' | 'digital' | 'territorial' | 'adversarios';
  confianca: number; // 1-100
  impacto: number; // 1-100
  janelaTempo?: string;
  acaoSugerida?: string;
  metricas?: {
    alcance?: number;
    engajamento?: number;
    conversao?: number;
  };
  timestamp: Date;
}

export default function InsightsOracle() {
  const [insights, setInsights] = useState<InsightOracle[]>([
    {
      id: '1',
      tipo: 'insight',
      titulo: 'Conteúdo sobre Saúde Pública tem 3x Mais Engajamento',
      conteudo: 'Análise dos últimos 30 dias mostra que posts sobre saúde pública geram 3x mais engajamento que outros temas. Recomendo focar 40% do conteúdo desta semana em propostas de saúde para maximizar alcance orgânico.',
      prioridade: 'alta',
      categoria: 'comunicacao',
      confianca: 92,
      impacto: 85,
      acaoSugerida: 'Criar série de 5 posts sobre propostas de saúde + 2 vídeos explicativos',
      metricas: {
        alcance: 150000,
        engajamento: 12.5,
        conversao: 8.2
      },
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      tipo: 'oportunidade',
      titulo: 'Trending Topic "Educação Digital" - Janela de 6 Horas',
      conteudo: 'Tópico "educação digital" está em alta com 25K menções positivas. Compatibilidade de 85% com suas propostas. Janela de oportunidade: próximas 6 horas para máximo impacto.',
      prioridade: 'critica',
      categoria: 'digital',
      confianca: 88,
      impacto: 78,
      janelaTempo: '6 horas',
      acaoSugerida: 'Publicar vídeo sobre inclusão digital nas escolas + impulsionar R$ 500',
      metricas: {
        alcance: 250000,
        engajamento: 15.2
      },
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: '3',
      tipo: 'alerta',
      titulo: 'Pedro Costa Crescendo 15% Entre Jovens em 2 Semanas',
      conteudo: 'Adversário Pedro Costa teve crescimento de 15% entre eleitores de 18-25 anos nas últimas 2 semanas. Estratégia focada em TikTok e propostas de primeiro emprego. Risco de perda de 3-5% da sua base jovem.',
      prioridade: 'alta',
      categoria: 'adversarios',
      confianca: 85,
      impacto: 70,
      acaoSugerida: 'Intensificar presença no TikTok + campanha sobre oportunidades para jovens',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: '4',
      tipo: 'recomendacao',
      titulo: 'Estratégia para Próximos 7 Dias',
      conteudo: 'Baseado na análise de dados, recomendo: 3 posts sobre saúde pública, 2 vídeos sobre economia local, 1 live sobre participação cidadã. Foco na Zona Norte (maior potencial de crescimento) e horário 19h-21h (melhor engajamento).',
      prioridade: 'media',
      categoria: 'estrategia',
      confianca: 90,
      impacto: 82,
      acaoSugerida: 'Implementar cronograma de conteúdo sugerido',
      timestamp: new Date(Date.now() - 30 * 60 * 1000)
    }
  ]);

  const [insightExpandido, setInsightExpandido] = useState<string | null>(null);

  const getTipoIcon = (tipo: InsightOracle['tipo']) => {
    switch (tipo) {
      case 'insight': return Lightbulb;
      case 'oportunidade': return Target;
      case 'alerta': return AlertTriangle;
      case 'recomendacao': return TrendingUp;
    }
  };

  const getTipoColor = (tipo: InsightOracle['tipo']) => {
    switch (tipo) {
      case 'insight': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'oportunidade': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'alerta': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'recomendacao': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  const getPrioridadeColor = (prioridade: InsightOracle['prioridade']) => {
    switch (prioridade) {
      case 'baixa': return 'bg-gray-500/20 text-gray-300';
      case 'media': return 'bg-yellow-500/20 text-yellow-300';
      case 'alta': return 'bg-orange-500/20 text-orange-300';
      case 'critica': return 'bg-red-500/20 text-red-300 animate-pulse';
    }
  };

  const insightsHoje = insights.filter(i => 
    i.timestamp.toDateString() === new Date().toDateString()
  );

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Brain className="w-5 h-5 text-purple-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <CardTitle className="text-base font-semibold text-white">Insights Diários do Oracle</CardTitle>
              <p className="text-xs text-slate-400">
                {insightsHoje.length} insights gerados hoje • Última atualização: há 30min
              </p>
            </div>
          </div>
          
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            <Zap className="w-3 h-3 mr-1" />
            IA ATIVA
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-0.5">
        <AnimatePresence>
          {insights.map((insight, index) => {
            const Icon = getTipoIcon(insight.tipo);
            const isExpandido = insightExpandido === insight.id;
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="p-1 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all cursor-pointer"
                onClick={() => setInsightExpandido(isExpandido ? null : insight.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-1 flex-1">
                    <Icon className={`w-5 h-5 mt-0.5 ${
                      insight.tipo === 'insight' ? 'text-blue-400' :
                      insight.tipo === 'oportunidade' ? 'text-green-400' :
                      insight.tipo === 'alerta' ? 'text-red-400' : 'text-purple-400'
                    }`} />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-1 mb-0.5">
                        <Badge className={getTipoColor(insight.tipo)}>
                          {insight.tipo.toUpperCase()}
                        </Badge>
                        <Badge className={getPrioridadeColor(insight.prioridade)}>
                          {insight.prioridade.toUpperCase()}
                        </Badge>
                        {insight.janelaTempo && (
                          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                            <Clock className="w-3 h-3 mr-1" />
                            {insight.janelaTempo}
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-xs font-semibold text-white mb-0">{insight.titulo}</h3>
                      <p className="text-xs text-slate-400 mb-0.5">{insight.conteudo}</p>
                      
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1 text-slate-500">
                          <span>🎯 Confiança: {insight.confianca}%</span>
                          <span>💥 Impacto: {insight.impacto}%</span>
                          <span>📅 {insight.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {isExpandido && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-slate-600"
                  >
                    {insight.acaoSugerida && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-green-300 mb-2">💡 Ação Sugerida:</p>
                        <p className="text-sm text-slate-300 bg-green-500/10 border border-green-500/20 rounded p-3">
                          {insight.acaoSugerida}
                        </p>
                      </div>
                    )}
                    
                    {insight.metricas && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-blue-300 mb-2">📊 Métricas Projetadas:</p>
                        <div className="grid grid-cols-3 gap-3">
                          {insight.metricas.alcance && (
                            <div className="text-center p-2 bg-blue-500/10 rounded">
                              <div className="text-lg font-bold text-blue-400">
                                {(insight.metricas.alcance / 1000).toFixed(0)}K
                              </div>
                              <div className="text-xs text-slate-400">Alcance</div>
                            </div>
                          )}
                          {insight.metricas.engajamento && (
                            <div className="text-center p-2 bg-green-500/10 rounded">
                              <div className="text-lg font-bold text-green-400">
                                {insight.metricas.engajamento}%
                              </div>
                              <div className="text-xs text-slate-400">Engajamento</div>
                            </div>
                          )}
                          {insight.metricas.conversao && (
                            <div className="text-center p-2 bg-purple-500/10 rounded">
                              <div className="text-lg font-bold text-purple-400">
                                {insight.metricas.conversao}%
                              </div>
                              <div className="text-xs text-slate-400">Conversão</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Implementar
                      </Button>
                      <Button size="sm" variant="outline">
                        <Clock className="w-4 h-4 mr-1" />
                        Agendar
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4 mr-1" />
                        Analisar
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
