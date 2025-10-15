'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Trophy, Zap, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';

// Importar todos os componentes do Funil
import VisualizacaoFunil from '@/components/funil-mobilizacao/VisualizacaoFunil';
import LeaderboardMilitancia from '@/components/funil-mobilizacao/LeaderboardMilitancia';
import CentralDeMissoes from '@/components/funil-mobilizacao/CentralDeMissoes';
import GraficoConversao from '@/components/funil-mobilizacao/GraficoConversao';
import PerfilDoApoiador from '@/components/funil-mobilizacao/PerfilDoApoiador';
import CriadorCampanhaFunil from '@/components/funil-mobilizacao/CriadorCampanhaFunil';

interface FunilMobilizacaoProps {
  candidateId: string;
}

interface Metrica {
  label: string;
  valor: number | string;
  variacao?: number;
  icone: any;
  cor: string;
}

export default function FunilMobilizacao({ candidateId }: FunilMobilizacaoProps) {
  const [metricas, setMetricas] = useState<Metrica[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarMetricas();
  }, [candidateId]);

  const carregarMetricas = () => {
    const metricasSimuladas: Metrica[] = [
      { label: 'Total Apoiadores', valor: '19.150', variacao: 8.5, icone: Users, cor: 'blue' },
      { label: 'Taxa Conversão Média', valor: '46%', variacao: 3.2, icone: TrendingUp, cor: 'green' },
      { label: 'Missões Ativas', valor: 12, icone: Target, cor: 'purple' },
      { label: 'Campanhas Rodando', valor: 5, icone: Zap, cor: 'orange' },
      { label: 'Pontos Distribuídos', valor: '1.2M', variacao: 15.8, icone: Award, cor: 'yellow' },
      { label: 'Multiplicadores', valor: 450, variacao: 12.3, icone: Trophy, cor: 'cyan' }
    ];

    setMetricas(metricasSimuladas);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="text-white mt-4">Carregando Funil de Mobilização...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-6 h-6 text-purple-400" />
          🚀 FUNIL DE MOBILIZAÇÃO - Motor da Militância
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Transforme visitantes em multiplicadores através de gamificação e automação
        </p>
      </div>

      {/* Métricas Principais */}
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
              <Card className="glass-card">
                <CardContent className="p-3 text-center">
                  <Icon className={`w-4 h-4 text-${metrica.cor}-400 mx-auto mb-1`} />
                  <div className="text-xl font-bold text-white mb-0.5">{metrica.valor}</div>
                  <div className="text-xs text-slate-400">{metrica.label}</div>
                  {metrica.variacao && (
                    <div className="text-xs text-green-400">
                      +{metrica.variacao}%
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* SEÇÃO 1: VISUALIZAÇÃO DO FUNIL + CONVERSÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            1. FUNIL DE MOBILIZAÇÃO
          </h2>
          <VisualizacaoFunil />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Conversão</h2>
          <GraficoConversao />
        </div>
      </div>

      {/* SEÇÃO 2: LEADERBOARD */}
      <div className="border-t-2 border-purple-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-bold text-white">2. RANKING DE APOIADORES</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <LeaderboardMilitancia />
          </div>
          <div>
            <PerfilDoApoiador apoiadorId="1" />
          </div>
        </div>
      </div>

      {/* SEÇÃO 3: MISSÕES */}
      <div className="border-t-2 border-green-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">3. CENTRAL DE MISSÕES</h2>
        </div>
        <CentralDeMissoes candidateId={candidateId} />
      </div>

      {/* SEÇÃO 4: CAMPANHAS AUTOMATIZADAS */}
      <div className="border-t-2 border-orange-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-orange-400" />
          <h2 className="text-xl font-bold text-white">4. CAMPANHAS AUTOMATIZADAS</h2>
        </div>
        <CriadorCampanhaFunil candidateId={candidateId} />
      </div>
    </div>
  );
}
