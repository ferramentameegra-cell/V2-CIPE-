'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Shield, Eye, Zap, TrendingUp, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { calcularNivelAmeacaGlobal } from '@/lib/radar-crises/analise-sentimento';

// Importar todos os componentes do Radar
import IndicadorNivelAmeaca from '@/components/radar-crises/IndicadorNivelAmeaca';
import FeedMonitoramento from '@/components/radar-crises/FeedMonitoramento';
import GraficoEvolucaoCrise from '@/components/radar-crises/GraficoEvolucaoCrise';
import MapaVulnerabilidades from '@/components/radar-crises/MapaVulnerabilidades';
import GestaoPlaybook from '@/components/radar-crises/GestaoPlaybook';
import PainelAlerta from '@/components/radar-crises/PainelAlerta';
import RedeDeteccaoBots from '@/components/radar-crises/RedeDeteccaoBots';

interface RadarCrisesProps {
  candidateId: string;
}

interface Metrica {
  label: string;
  valor: number | string;
  variacao?: number;
  icone: any;
  cor: string;
}

export default function RadarCrises({ candidateId }: RadarCrisesProps) {
  const [nivelAmeaca, setNivelAmeaca] = useState<'BAIXO' | 'MEDIO' | 'ALTO' | 'CRITICO'>('MEDIO');
  const [indiceAmeaca, setIndiceAmeaca] = useState(45);
  const [metricas, setMetricas] = useState<Metrica[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, [candidateId]);

  const carregarDados = () => {
    // Simular cálculo de nível de ameaça
    const alertas = [
      { nivelAmeaca: 'ALTO', status: 'MONITORANDO', indiceImpacto: 75 },
      { nivelAmeaca: 'MEDIO', status: 'EM_RESPOSTA', indiceImpacto: 45 }
    ];

    const nivel = calcularNivelAmeacaGlobal(alertas);
    setNivelAmeaca(nivel);
    setIndiceAmeaca(alertas.reduce((acc, a) => acc + a.indiceImpacto, 0) / alertas.length);

    const metricasSimuladas: Metrica[] = [
      { label: 'Alertas Ativos', valor: 3, variacao: -1, icone: AlertTriangle, cor: 'red' },
      { label: 'Vulnerabilidades', valor: 8, icone: Shield, cor: 'orange' },
      { label: 'Menções (24h)', valor: '2.5K', variacao: 15, icone: Eye, cor: 'blue' },
      { label: 'Fake News Detectadas', valor: 5, variacao: 2, icone: AlertTriangle, cor: 'yellow' },
      { label: 'Playbooks Ativos', valor: 2, icone: Zap, cor: 'purple' },
      { label: 'Taxa de Resolução', valor: '87%', variacao: 3, icone: TrendingUp, cor: 'green' }
    ];

    setMetricas(metricasSimuladas);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto"></div>
          <p className="text-white mt-4">Carregando Radar de Crises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          📡 RADAR DE CRISES - Sistema de Alerta Antecipado
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Monitoramento preditivo, análise de IA e resposta automatizada a crises
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
                    <div className={`text-xs ${metrica.variacao > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {metrica.variacao > 0 ? '+' : ''}{metrica.variacao}%
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* SEÇÃO 1: INDICADOR + FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <IndicadorNivelAmeaca nivel={nivelAmeaca} indice={indiceAmeaca} />
        </div>
        <div className="lg:col-span-2">
          <FeedMonitoramento compact={true} />
        </div>
      </div>

      {/* SEÇÃO 2: GRÁFICO EVOLUÇÃO + REDE BOTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GraficoEvolucaoCrise />
        <RedeDeteccaoBots />
      </div>

      {/* SEÇÃO 3: VULNERABILIDADES */}
      <div className="border-t-2 border-orange-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-orange-400" />
          <h2 className="text-xl font-bold text-white">MAPA DE VULNERABILIDADES</h2>
        </div>
        <MapaVulnerabilidades candidateId={candidateId} />
      </div>

      {/* SEÇÃO 4: GESTÃO DE PLAYBOOKS */}
      <div className="border-t-2 border-purple-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">PLAYBOOKS DE RESPOSTA</h2>
        </div>
        <GestaoPlaybook candidateId={candidateId} />
      </div>

      {/* SEÇÃO 5: ALERTA DETALHADO (EXEMPLO) */}
      <div className="border-t-2 border-red-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold text-white">PAINEL DE ALERTA (EXEMPLO)</h2>
        </div>
        <PainelAlerta alertaId="1" />
      </div>
    </div>
  );
}
