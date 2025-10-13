'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Users, Route, Target, Bell, TrendingUp,
  Navigation, Activity, Clock, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

// Importar todos os componentes do Waze
import MapaInterativo from '@/components/waze/MapaInterativo';
import OtimizadorDeRotas from '@/components/waze/OtimizadorDeRotas';
import GestaoEquipesCampo from '@/components/waze/GestaoEquipesCampo';
import AnaliseTerritorio from '@/components/waze/AnaliseTerritorio';
import AlertasGeograficos from '@/components/waze/AlertasGeograficos';

interface WazeEleitoralProps {
  candidateId: string;
}

interface MetricaWaze {
  label: string;
  valor: number | string;
  variacao?: number;
  icone: any;
  cor: string;
}

export default function WazeEleitoral({ candidateId }: WazeEleitoralProps) {
  const [metricas, setMetricas] = useState<MetricaWaze[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarMetricas();
  }, [candidateId]);

  const carregarMetricas = () => {
    const metricasSimuladas: MetricaWaze[] = [
      {
        label: 'Equipes Ativas',
        valor: 3,
        variacao: 1,
        icone: Users,
        cor: 'blue'
      },
      {
        label: 'Eventos Hoje',
        valor: 5,
        icone: Target,
        cor: 'green'
      },
      {
        label: 'Cobertura Territorial',
        valor: '68%',
        variacao: 5,
        icone: MapPin,
        cor: 'purple'
      },
      {
        label: 'Km Percorridos',
        valor: '142.5',
        variacao: 12,
        icone: Navigation,
        cor: 'orange'
      },
      {
        label: 'Interações Hoje',
        valor: 247,
        variacao: 8,
        icone: CheckCircle,
        cor: 'cyan'
      },
      {
        label: 'Alertas Ativos',
        valor: 2,
        icone: Bell,
        cor: 'red'
      }
    ];

    setMetricas(metricasSimuladas);
    setLoading(false);
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
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Navigation className="w-6 h-6 text-blue-400" />
            🧭 WAZE ELEITORAL - Centro de Comando Geográfico
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Otimização de rotas, gestão de equipes e inteligência territorial em tempo real
          </p>
        </div>
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
                  <div className="flex items-center justify-center mb-1">
                    <Icon className={`w-4 h-4 text-${metrica.cor}-400`} />
                  </div>
                  <div className="text-xl font-bold text-white mb-0.5">{metrica.valor}</div>
                  <div className="text-xs text-slate-400 mb-0.5">{metrica.label}</div>
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

      {/* SEÇÃO 1: MAPA INTERATIVO PRINCIPAL */}
      <div className="border-t-2 border-blue-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">1. MAPA ESTRATÉGICO INTERATIVO</h2>
        </div>
        
        <Card className="glass-card">
          <CardContent className="p-0">
            <div className="h-[600px]">
              <MapaInterativo candidateId={candidateId} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEÇÃO 2: OTIMIZADOR DE ROTAS */}
      <div className="border-t-2 border-green-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Route className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">2. OTIMIZADOR DE ROTAS</h2>
        </div>
        <OtimizadorDeRotas candidateId={candidateId} />
      </div>

      {/* SEÇÃO 3: GESTÃO DE EQUIPES DE CAMPO */}
      <div className="border-t-2 border-purple-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">3. GESTÃO DE EQUIPES EM TEMPO REAL</h2>
        </div>
        <GestaoEquipesCampo candidateId={candidateId} />
      </div>

      {/* SEÇÃO 4: ANÁLISE DE TERRITÓRIO */}
      <div className="border-t-2 border-orange-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-6 h-6 text-orange-400" />
          <h2 className="text-xl font-bold text-white">4. ANÁLISE GEOGRÁFICA E DEMOGRÁFICA</h2>
        </div>
        <AnaliseTerritorio candidateId={candidateId} />
      </div>

      {/* SEÇÃO 5: ALERTAS GEOGRÁFICOS */}
      <div className="border-t-2 border-red-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold text-white">5. ALERTAS GEOGRÁFICOS INTELIGENTES</h2>
        </div>
        <AlertasGeograficos candidateId={candidateId} />
      </div>
    </div>
  );
}
