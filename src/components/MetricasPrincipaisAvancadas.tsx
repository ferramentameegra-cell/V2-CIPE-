'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Target, Heart, Eye, Activity, TrendingUp, TrendingDown,
  Zap, AlertTriangle, CheckCircle, Play, BarChart3
} from 'lucide-react';

interface MetricaPrincipal {
  id: string;
  titulo: string;
  valor: string;
  variacao: string;
  tendencia: 'up' | 'down' | 'stable';
  icon: any;
  cor: string;
  descricao: string;
  meta?: string;
  status: 'excelente' | 'bom' | 'atencao' | 'critico';
  simulacaoDisponivel?: boolean;
}

export default function MetricasPrincipaisAvancadas() {
  const [metricas, setMetricas] = useState<MetricaPrincipal[]>([
    {
      id: 'intencao_voto',
      titulo: 'Intenção de Voto',
      valor: '45.2%',
      variacao: '+3.2%',
      tendencia: 'up',
      icon: Target,
      cor: 'blue',
      descricao: 'vs. mês anterior',
      meta: 'Meta: 48%',
      status: 'excelente',
      simulacaoDisponivel: true
    },
    {
      id: 'sentimento_publico',
      titulo: 'Sentimento Público',
      valor: '72%',
      variacao: '+5%',
      tendencia: 'up',
      icon: Heart,
      cor: 'green',
      descricao: 'positivo',
      status: 'bom',
      simulacaoDisponivel: true
    },
    {
      id: 'alcance_digital',
      titulo: 'Alcance Digital',
      valor: '285K',
      variacao: '+15.8%',
      tendencia: 'up',
      icon: Eye,
      cor: 'purple',
      descricao: 'semanal',
      status: 'excelente',
      simulacaoDisponivel: true
    },
    {
      id: 'engajamento',
      titulo: 'Engajamento Médio',
      valor: '8.5%',
      variacao: '-0.3%',
      tendencia: 'down',
      icon: Activity,
      cor: 'orange',
      descricao: 'todas as redes',
      status: 'atencao',
      simulacaoDisponivel: true
    },
    {
      id: 'diferenca_segundo',
      titulo: 'Diferença para 2º',
      valor: '+9.4%',
      variacao: '+1.2%',
      tendencia: 'up',
      icon: TrendingUp,
      cor: 'emerald',
      descricao: 'à frente de João Silva',
      status: 'excelente'
    },
    {
      id: 'embaixadores_ativos',
      titulo: 'Embaixadores Ativos',
      valor: '89/120',
      variacao: '+5',
      tendencia: 'up',
      icon: Zap,
      cor: 'yellow',
      descricao: '74% da força total',
      status: 'bom'
    }
  ]);

  const [focusMode, setFocusMode] = useState<string | null>(null);
  const [simulacaoAberta, setSimulacaoAberta] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetricas(prev => prev.map(metrica => {
        if (metrica.id === 'alcance_digital') {
          const novoValor = parseInt(metrica.valor.replace('K', '')) + Math.floor(Math.random() * 5) - 2;
          return {
            ...metrica,
            valor: `${novoValor}K`
          };
        }
        return metrica;
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: MetricaPrincipal['status']) => {
    switch (status) {
      case 'excelente': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'bom': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'atencao': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'critico': return 'bg-red-500/20 text-red-300 border-red-500/30';
    }
  };

  const getStatusIcon = (status: MetricaPrincipal['status']) => {
    switch (status) {
      case 'excelente': return CheckCircle;
      case 'bom': return CheckCircle;
      case 'atencao': return AlertTriangle;
      case 'critico': return AlertTriangle;
    }
  };

  const handleFocusMode = (metricaId: string) => {
    setFocusMode(focusMode === metricaId ? null : metricaId);
  };

  const handleSimulacao = (metricaId: string) => {
    setSimulacaoAberta(metricaId);
  };

  return (
    <div className="space-y-6">
      {/* Efeito de fundo animado - Padrão Oracle CIPE */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5 rounded-2xl blur-2xl pointer-events-none"></div>
      
      <div className={`grid gap-6 transition-all duration-500 relative ${
        focusMode 
          ? 'grid-cols-1 lg:grid-cols-2' 
          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'
      }`}>
        {metricas.map((metrica, index) => {
          const Icon = metrica.icon;
          const StatusIcon = getStatusIcon(metrica.status);
          const isInFocus = focusMode === metrica.id;
          const isHidden = focusMode && focusMode !== metrica.id;

          return (
            <AnimatePresence key={metrica.id}>
              {!isHidden && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: isInFocus ? 1.05 : 1
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: isInFocus ? 1.05 : 1.02 }}
                  className={`${isInFocus ? 'col-span-full lg:col-span-1' : ''}`}
                >
                  <Card className={`relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border backdrop-blur-xl shadow-2xl h-full cursor-pointer transition-all duration-300 ${
                    isInFocus ? 'ring-2 ring-blue-500/50 shadow-blue-500/20 border-blue-500/40' : 'border-blue-500/20 shadow-blue-500/10 hover:border-blue-500/30 hover:shadow-blue-500/15'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-6 h-6 text-${metrica.cor}-400`} />
                          <StatusIcon className={`w-4 h-4 ${
                            metrica.status === 'excelente' || metrica.status === 'bom' ? 'text-green-400' : 
                            metrica.status === 'atencao' ? 'text-yellow-400' : 'text-red-400'
                          }`} />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(metrica.status)}>
                            {metrica.status.toUpperCase()}
                          </Badge>
                          {metrica.simulacaoDisponivel && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSimulacao(metrica.id);
                              }}
                              className="h-6 px-2 text-xs"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Simular
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div 
                        className="space-y-2 cursor-pointer"
                        onClick={() => handleFocusMode(metrica.id)}
                      >
                        <p className="text-sm font-medium text-slate-300">{metrica.titulo}</p>
                        <div className="flex items-baseline space-x-2">
                          <p className={`font-bold text-white ${
                            isInFocus ? 'text-4xl' : 'text-3xl'
                          }`}>{metrica.valor}</p>
                          <div className="flex items-center space-x-1">
                            {metrica.tendencia === 'up' ? (
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            ) : metrica.tendencia === 'down' ? (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            ) : (
                              <div className="w-4 h-4" />
                            )}
                            <span className={`text-sm font-medium ${
                              metrica.tendencia === 'up' ? 'text-cyan-400' : 
                              metrica.tendencia === 'down' ? 'text-red-400' : 'text-slate-400'
                            }`}>
                              {metrica.variacao}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400">{metrica.descricao}</p>
                        {metrica.meta && (
                          <p className="text-xs text-cyan-400">{metrica.meta}</p>
                        )}
                      </div>

                      {isInFocus && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-4 pt-4 border-t border-slate-600"
                        >
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-slate-400">Última atualização</p>
                              <p className="text-white">há 5 minutos</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Próxima meta</p>
                              <p className="text-white">48% até agosto</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Tendência 7 dias</p>
                              <p className="text-cyan-400">+2.1% consistente</p>
                            </div>
                            <div>
                              <p className="text-slate-400">Vs. adversários</p>
                              <p className="text-purple-400">Melhor performance</p>
                            </div>
                          </div>
                          
                          <Button
                            className="w-full mt-4"
                            onClick={() => handleFocusMode(metrica.id)}
                          >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Ver Análise Completa
                          </Button>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {focusMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            variant="outline"
            onClick={() => setFocusMode(null)}
            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-blue-500/30 hover:border-purple-500/40 backdrop-blur-xl"
          >
            Voltar à Visão Completa
          </Button>
        </motion.div>
      )}
    </div>
  );
}

