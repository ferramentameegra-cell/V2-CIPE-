'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
  Play, Calculator, TrendingUp, Target, Zap, 
  DollarSign, Users
} from 'lucide-react';

interface Simulacao {
  id: string;
  nome: string;
  tipo: 'investimento_midia' | 'evento' | 'campanha_digital' | 'contratacao';
  parametros: Record<string, any>;
  resultados: {
    intencaoVoto: { atual: number; projetado: number; confianca: number };
    alcance: { atual: number; projetado: number; confianca: number };
    engajamento: { atual: number; projetado: number; confianca: number };
    custo: number;
    roi: number;
    tempo: string;
  };
}

export default function WhatIfScenarios() {
  const [simulacaoAtiva, setSimulacaoAtiva] = useState<string | null>(null);
  const [parametros, setParametros] = useState({
    investimento: [50000],
    duracao: [7]
  });
  const [simulacoes, setSimulacoes] = useState<Simulacao[]>([]);
  const [calculando, setCalculando] = useState(false);

  const tiposSimulacao = [
    {
      id: 'investimento_midia',
      nome: 'Investimento em Mídia',
      icon: DollarSign,
      cor: 'green',
      descricao: 'Simular impacto de investimento em redes sociais'
    },
    {
      id: 'evento',
      nome: 'Evento Presencial',
      icon: Users,
      cor: 'blue',
      descricao: 'Projetar resultado de comícios e eventos'
    },
    {
      id: 'campanha_digital',
      nome: 'Campanha Digital',
      icon: Zap,
      cor: 'purple',
      descricao: 'Avaliar estratégias de conteúdo digital'
    },
    {
      id: 'contratacao',
      nome: 'Contratação de Equipe',
      icon: Users,
      cor: 'orange',
      descricao: 'Impacto de expandir equipe de campo'
    }
  ];

  const executarSimulacao = async () => {
    if (!simulacaoAtiva) return;

    setCalculando(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    const novaSimulacao: Simulacao = {
      id: Date.now().toString(),
      nome: `Simulação ${tiposSimulacao.find(t => t.id === simulacaoAtiva)?.nome}`,
      tipo: simulacaoAtiva as any,
      parametros: { ...parametros },
      resultados: {
        intencaoVoto: {
          atual: 45.2,
          projetado: 45.2 + (parametros.investimento[0] / 10000) * 0.5,
          confianca: 85
        },
        alcance: {
          atual: 285000,
          projetado: 285000 + (parametros.investimento[0] / 1000) * 50,
          confianca: 92
        },
        engajamento: {
          atual: 8.5,
          projetado: 8.5 + (parametros.investimento[0] / 25000) * 1.2,
          confianca: 78
        },
        custo: parametros.investimento[0],
        roi: ((parametros.investimento[0] / 10000) * 0.5 * 1000000) / parametros.investimento[0],
        tempo: `${parametros.duracao[0]} dias`
      }
    };

    setSimulacoes(prev => [novaSimulacao, ...prev.slice(0, 4)]);
    setCalculando(false);
  };

  return (
    <div className="relative">
      {/* Efeito de fundo animado - Padrão Oracle CIPE */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
      
    <Card className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-blue-500/30 backdrop-blur-xl shadow-2xl shadow-blue-500/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-blue-300" />
          <span className="text-white">What-If Scenarios</span>
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
            IA PREDITIVA
          </Badge>
        </CardTitle>
        <p className="text-sm text-slate-400">
          Simule o impacto de decisões estratégicas antes de executá-las
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {tiposSimulacao.map((tipo) => {
            const Icon = tipo.icon;
            const isAtivo = simulacaoAtiva === tipo.id;

            return (
              <Button
                key={tipo.id}
                variant={isAtivo ? "default" : "outline"}
                onClick={() => setSimulacaoAtiva(tipo.id)}
                className={`h-auto p-4 flex flex-col items-center space-y-2 backdrop-blur-sm ${
                  isAtivo ? 'bg-blue-600/80 hover:bg-purple-600/80 border-cyan-500/30' : 'border-blue-500/20'
                }`}
              >
                <Icon className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-medium">{tipo.nome}</div>
                  <div className="text-xs opacity-80">{tipo.descricao}</div>
                </div>
              </Button>
            );
          })}
        </div>

        {simulacaoAtiva && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 p-4 bg-slate-800/50 rounded-lg border border-blue-500/20 backdrop-blur-sm"
          >
            <h3 className="font-medium text-white">Configurar Simulação</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Investimento (R$)</Label>
                <div className="space-y-2">
                  <Slider
                    value={parametros.investimento}
                    onValueChange={(value) => setParametros(prev => ({ ...prev, investimento: value }))}
                    max={200000}
                    min={5000}
                    step={5000}
                    className="w-full"
                  />
                  <div className="text-sm text-slate-400">
                    R$ {parametros.investimento[0].toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Duração (dias)</Label>
                <div className="space-y-2">
                  <Slider
                    value={parametros.duracao}
                    onValueChange={(value) => setParametros(prev => ({ ...prev, duracao: value }))}
                    max={30}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-sm text-slate-400">
                    {parametros.duracao[0]} dias
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={executarSimulacao}
              disabled={calculando}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {calculando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Calculando com IA...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Executar Simulação
                </>
              )}
            </Button>
          </motion.div>
        )}

        {simulacoes.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium text-white">Resultados das Simulações</h3>
            
            {simulacoes.map((simulacao, index) => (
              <motion.div
                key={simulacao.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-slate-800/60 rounded-lg border border-purple-500/20 backdrop-blur-sm hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">{simulacao.nome}</h4>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                    ROI: {simulacao.resultados.roi.toFixed(1)}x
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-slate-400">Intenção de Voto</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-white">
                        {simulacao.resultados.intencaoVoto.atual}%
                      </span>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-lg font-bold text-green-400">
                        {simulacao.resultados.intencaoVoto.projetado.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Confiança: {simulacao.resultados.intencaoVoto.confianca}%
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-slate-400">Alcance Digital</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-white">
                        {(simulacao.resultados.alcance.atual / 1000).toFixed(0)}K
                      </span>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-lg font-bold text-green-400">
                        {(simulacao.resultados.alcance.projetado / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Confiança: {simulacao.resultados.alcance.confianca}%
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-slate-400">Engajamento</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-white">
                        {simulacao.resultados.engajamento.atual}%
                      </span>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-lg font-bold text-green-400">
                        {simulacao.resultados.engajamento.projetado.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Confiança: {simulacao.resultados.engajamento.confianca}%
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-600 flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    Custo: R$ {simulacao.resultados.custo.toLocaleString()}
                  </span>
                  <span className="text-slate-400">
                    Tempo: {simulacao.resultados.tempo}
                  </span>
                  <Button size="sm" variant="outline">
                    <Target className="w-3 h-3 mr-1" />
                    Implementar
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
}

