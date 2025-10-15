'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Target, Database, Zap, TrendingUp, Award, Video, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import ScoreProntidao from '@/components/blindagem/ScoreProntidao';
import AcessoRapido from '@/components/blindagem/AcessoRapido';
import SimuladorEntrevista from '@/components/blindagem/SimuladorEntrevista';
import BancoArgumentos from '@/components/blindagem/BancoArgumentos';
import AnalisePerformance from '@/components/blindagem/AnalisePerformance';
import GeradorTalkingPoints from '@/components/blindagem/GeradorTalkingPoints';
import HubDebate from '@/components/blindagem/HubDebate';

interface BlindagemEstrategicaProps {
  candidateId: string;
}

export default function BlindagemEstrategica({ candidateId }: BlindagemEstrategicaProps) {
  const [scoreProntidao, setScoreProntidao] = useState(85);
  const [ultimaAnalise, setUltimaAnalise] = useState({
    titulo: 'Simulação de Entrevista - CNN',
    data: '14/10/2025',
    score: 82,
    pontosMelhoria: [
      'Reduzir uso de "né" em 15%',
      'Melhorar contato visual (62% → 75%+)',
      'Usar mais dados concretos'
    ]
  });
  const [argumentosFrageis, setArgumentosFrageis] = useState([
    { tema: 'Reforma Tributária', forcaArgumento: 45, ultimoTreino: '10/10/2025' },
    { tema: 'Segurança Pública', forcaArgumento: 52, ultimoTreino: '12/10/2025' },
    { tema: 'Política Externa', forcaArgumento: 38, ultimoTreino: '08/10/2025' }
  ]);

  return (
    <div className="space-y-6 fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-400" />
          🛡️ BLINDAGEM ESTRATÉGICA - Academia de Comunicação
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Treine com IA, domine seus argumentos e conquiste debates com excelência
        </p>
      </div>

      {/* SEÇÃO 1: DASHBOARD DE PRONTIDÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Score Central */}
        <div className="lg:col-span-4">
          <Card className="glass-card">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <ScoreProntidao score={scoreProntidao} />
              <p className="text-center text-white/70 text-sm mt-4">
                Baseado em {12} simulações, {156} argumentos no banco e {8} análises de performance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Acesso Rápido */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <AcessoRapido title="Simulador de Entrevista" candidateId={candidateId} />
          <AcessoRapido title="Banco de Argumentos" candidateId={candidateId} />
          <AcessoRapido title="Preparação de Debate" candidateId={candidateId} />
          <Card className="glass-card cursor-pointer hover:scale-105 transition-all">
            <CardContent className="p-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Análise de Performance</div>
                <div className="text-xs text-white/60">Upload de vídeos</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEÇÃO 2: ÚLTIMA ANÁLISE + ARGUMENTOS FRACOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Última Análise */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Última Análise de Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">{ultimaAnalise.titulo}</div>
                <div className="text-xs text-white/60">{ultimaAnalise.data}</div>
              </div>
              <Badge className={`${ultimaAnalise.score >= 80 ? 'bg-green-500' : 'bg-yellow-500'} text-lg px-3 py-1`}>
                {ultimaAnalise.score}
              </Badge>
            </div>
            <div>
              <div className="text-sm text-white/70 mb-2 font-semibold">Principais Melhorias:</div>
              <div className="space-y-2">
                {ultimaAnalise.pontosMelhoria.map((ponto, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5"></div>
                    {ponto}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Argumentos a Reforçar */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-400" />
              Argumentos a Reforçar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {argumentosFrageis.map((arg, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-semibold text-sm">{arg.tema}</div>
                  <Badge className={`${arg.forcaArgumento < 50 ? 'bg-red-500' : 'bg-yellow-500'} text-xs`}>
                    {arg.forcaArgumento}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/60">Último treino: {arg.ultimoTreino}</span>
                  <button className="text-blue-400 hover:text-blue-300">Treinar Agora →</button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* SEÇÃO 3: SIMULADOR DE ENTREVISTA */}
      <div className="border-t-2 border-blue-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">1. SIMULADOR DE ENTREVISTA IA</h2>
        </div>
        <SimuladorEntrevista candidateId={candidateId} />
      </div>

      {/* SEÇÃO 4: BANCO DE ARGUMENTOS (ADI) */}
      <div className="border-t-2 border-purple-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">2. BANCO DE ARGUMENTOS (ADI)</h2>
        </div>
        <BancoArgumentos candidateId={candidateId} />
      </div>

      {/* SEÇÃO 5: GERADOR DE TALKING POINTS */}
      <div className="border-t-2 border-green-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">3. GERADOR DE TALKING POINTS</h2>
        </div>
        <GeradorTalkingPoints candidateId={candidateId} />
      </div>

      {/* SEÇÃO 6: HUB DE PREPARAÇÃO PARA DEBATES */}
      <div className="border-t-2 border-red-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-6 h-6 text-red-400" />
          <h2 className="text-xl font-bold text-white">4. PREPARAÇÃO PARA DEBATES</h2>
        </div>
        <HubDebate candidateId={candidateId} />
      </div>

      {/* SEÇÃO 7: ANÁLISE DE PERFORMANCE */}
      <div className="border-t-2 border-orange-500/30 pt-6">
        <div className="flex items-center gap-2 mb-4">
          <Video className="w-6 h-6 text-orange-400" />
          <h2 className="text-xl font-bold text-white">5. ANÁLISE DE PERFORMANCE</h2>
        </div>
        <AnalisePerformance candidateId={candidateId} />
      </div>
    </div>
  );
}
