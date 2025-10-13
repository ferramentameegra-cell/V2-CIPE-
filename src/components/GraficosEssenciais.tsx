'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, TrendingDown, Crown, Users, Target, 
  Zap, Trophy, Award, Minus
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell
} from 'recharts';

// Dados do Ranking da Disputa
const rankingDisputa = [
  { 
    candidato: 'Ronaldo Nogueira', 
    porcentagem: 45.2, 
    variacao: 3.2, 
    emoji: '🥇',
    cor: '#0066FF',
    posicao: 1
  },
  { 
    candidato: 'João Silva', 
    porcentagem: 35.8, 
    variacao: -1.1, 
    emoji: '🥈',
    cor: '#EF4444',
    posicao: 2
  },
  { 
    candidato: 'Maria Santos', 
    porcentagem: 19.0, 
    variacao: -2.1, 
    emoji: '🥉',
    cor: '#F97316',
    posicao: 3
  },
  { 
    candidato: 'Pedro Costa', 
    porcentagem: 8.5, 
    variacao: 0.8, 
    emoji: '4️⃣',
    cor: '#8B5CF6',
    posicao: 4
  },
  { 
    candidato: 'Ana Oliveira', 
    porcentagem: 4.2, 
    variacao: -0.5, 
    emoji: '5️⃣',
    cor: '#6B7280',
    posicao: 5
  },
  { 
    candidato: 'Carlos Lima', 
    porcentagem: 2.3, 
    variacao: 0.0, 
    emoji: '6️⃣',
    cor: '#9CA3AF',
    posicao: 6
  }
];

// Dados do Espectro Ideológico
const espectroIdeologico = [
  { posicao: 'Esquerda', porcentagem: 20, eleitores: 45200, cor: '#EF4444' },
  { posicao: 'Centro-Esquerda', porcentagem: 15, eleitores: 33900, cor: '#F97316' },
  { posicao: 'Centro', porcentagem: 30, eleitores: 67800, cor: '#EAB308' },
  { posicao: 'Centro-Direita', porcentagem: 20, eleitores: 45200, cor: '#22C55E' },
  { posicao: 'Direita', porcentagem: 15, eleitores: 33900, cor: '#3B82F6' }
];

// Dados do Funil
const funilMobilizacao = [
  { etapa: 'Descoberta', porcentagem: 40, pessoas: 120000, emoji: '🥶' },
  { etapa: 'Interesse', porcentagem: 30, pessoas: 90000, emoji: '🙂' },
  { etapa: 'Simpatia', porcentagem: 20, pessoas: 60000, emoji: '😊' },
  { etapa: 'Apoio', porcentagem: 7, pessoas: 21000, emoji: '🔥' },
  { etapa: 'Embaixador', porcentagem: 3, pessoas: 9000, emoji: '🚀' }
];

// Top Embaixadores
const topEmbaixadores = [
  { nome: 'Maria Silva', grupos: 12, membros: 3400, novos: 89, posicao: '🥇' },
  { nome: 'João Santos', grupos: 8, membros: 2900, novos: 67, posicao: '🥈' },
  { nome: 'Ana Costa', grupos: 10, membros: 2300, novos: 45, posicao: '🥉' }
];

// Dados da Evolução Temporal
const evolucaoTemporal = [
  { mes: 'Jan', ronaldo: 42, joao: 37, maria: 21 },
  { mes: 'Fev', ronaldo: 44, joao: 36, maria: 20 },
  { mes: 'Mar', ronaldo: 43, joao: 38, maria: 19 },
  { mes: 'Abr', ronaldo: 45, joao: 36, maria: 19 },
  { mes: 'Mai', ronaldo: 47, joao: 34, maria: 19 },
  { mes: 'Jun', ronaldo: 45.2, joao: 35.8, maria: 19.0 }
];

// Dados do Mapa Territorial
const mapaTerritorial = [
  { zona: 'Zona Norte', porcentagem: 52, variacao: 8.2 },
  { zona: 'Zona Sul', porcentagem: 45, variacao: 5.1 },
  { zona: 'Centro', porcentagem: 38, variacao: 2.8 },
  { zona: 'Zona Leste', porcentagem: 32, variacao: -1.2 },
  { zona: 'Zona Oeste', porcentagem: 28, variacao: 0.1 }
];

export default function GraficosEssenciais() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
      {/* 1. RANKING DA DISPUTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="glass-card h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Ranking da Disputa</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Liderando +9.4%
                </Badge>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {rankingDisputa.map((candidato, index) => (
              <motion.div
                key={candidato.candidato}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-2 rounded-lg ${
                  candidato.posicao === 1 
                    ? 'bg-blue-500/10 border border-blue-500/30' 
                    : 'bg-slate-800/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{candidato.emoji}</span>
                    <span className={`text-sm font-medium ${
                      candidato.posicao === 1 ? 'text-white' : 'text-slate-300'
                    }`}>
                      {candidato.candidato}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${
                      candidato.posicao === 1 ? 'text-blue-400' : 'text-white'
                    }`}>
                      {candidato.porcentagem}%
                    </span>
                    {candidato.variacao > 0 ? (
                      <div className="flex items-center text-green-400">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-xs ml-1">+{candidato.variacao}%</span>
                      </div>
                    ) : candidato.variacao < 0 ? (
                      <div className="flex items-center text-red-400">
                        <TrendingDown className="w-3 h-3" />
                        <span className="text-xs ml-1">{candidato.variacao}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-slate-400">
                        <Minus className="w-3 h-3" />
                        <span className="text-xs ml-1">0.0%</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${candidato.porcentagem}%` }}
                    transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: candidato.cor }}
                  />
                </div>
              </motion.div>
            ))}
            
            <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-blue-200">
                <Target className="w-3 h-3 inline mr-1" />
                <strong>Insight:</strong> Você lidera com 9.4% de vantagem. Pedro Costa é ameaça emergente (+0.8%).
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 2. ESPECTRO IDEOLÓGICO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="glass-card h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Users className="w-5 h-5 text-purple-400" />
                <span className="text-white">Espectro Ideológico</span>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                  226K mapeados
                </Badge>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {espectroIdeologico.map((item, index) => (
              <motion.div
                key={item.posicao}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">{item.posicao}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">{item.porcentagem}%</span>
                    <span className="text-xs text-slate-400">
                      ({(item.eleitores / 1000).toFixed(1)}K)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.porcentagem}%` }}
                    transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.cor }}
                  />
                </div>
              </motion.div>
            ))}
            
            <div className="mt-3 p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-xs text-purple-200">
                <Target className="w-3 h-3 inline mr-1" />
                <strong>Insight:</strong> Forte no Centro (30%). Oportunidade de crescer 8% no Centro-Direita.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 3. PERFORMANCE OPERACIONAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="glass-card h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Zap className="w-5 h-5 text-orange-400" />
                <span className="text-white">Performance Operacional</span>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                  300K no funil
                </Badge>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Funil */}
            <div className="space-y-2">
              <h4 className="text-xs font-medium text-slate-300 mb-2">Funil de Mobilização</h4>
              {funilMobilizacao.map((etapa, index) => (
                <div key={etapa.etapa} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="text-sm">{etapa.emoji}</span>
                      <span className="text-xs text-slate-300">{etapa.etapa}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-white">{etapa.porcentagem}%</span>
                      <span className="text-xs text-slate-400">
                        ({(etapa.pessoas / 1000).toFixed(0)}K)
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${etapa.porcentagem}%` }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Top Embaixadores */}
            <div className="space-y-1">
              <h4 className="text-xs font-medium text-slate-300 mb-1">Top 3 Embaixadores</h4>
              {topEmbaixadores.map((emb, index) => (
                <div key={emb.nome} className="flex items-center justify-between p-1.5 bg-slate-800/30 rounded">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">{emb.posicao}</span>
                    <span className="text-xs text-white">{emb.nome}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span>{emb.grupos} grupos</span>
                    <span>•</span>
                    <span className="text-green-400">+{emb.novos}/sem</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <p className="text-xs text-orange-200">
                <Target className="w-3 h-3 inline mr-1" />
                <strong>Insight:</strong> 18K simpatizantes prontos para conversão. Maria Silva é sua melhor embaixadora.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 4. EVOLUÇÃO TEMPORAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="glass-card h-full">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-base">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-white">Evolução Temporal</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  +3.2%/mês
                </Badge>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolucaoTemporal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="mes" stroke="#9CA3AF" style={{ fontSize: '10px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '10px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ronaldo" 
                    stroke="#0066FF" 
                    strokeWidth={3}
                    name="Ronaldo"
                    dot={{ fill: '#0066FF', r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="joao" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    name="João"
                    dot={{ fill: '#EF4444', r: 3 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="maria" 
                    stroke="#F97316" 
                    strokeWidth={2}
                    name="Maria"
                    dot={{ fill: '#F97316', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-medium text-slate-300">Marcos Importantes</h4>
              <div className="grid grid-cols-2 gap-1">
                <div className="p-1.5 bg-slate-800/30 rounded">
                  <p className="text-xs text-white">Mar: +8% campanha digital</p>
                </div>
                <div className="p-1.5 bg-slate-800/30 rounded">
                  <p className="text-xs text-white">Mai: -2% crise, +5% recuperação</p>
                </div>
              </div>
            </div>
            
            <div className="p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-xs text-green-200">
                <Target className="w-3 h-3 inline mr-1" />
                <strong>Insight:</strong> Crescimento consistente. Projeção agosto: 48.5%. Recuperação 2x mais rápida.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 5. MAPA TERRITORIAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="xl:col-span-2"
      >
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Trophy className="w-5 h-5 text-cyan-400" />
                <span className="text-white">Mapa de Calor Territorial</span>
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                  5 zonas monitoradas
                </Badge>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {mapaTerritorial.map((zona, index) => (
                <motion.div
                  key={zona.zona}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="space-y-2"
                >
                  <div className="text-center">
                    <p className="text-xs font-medium text-slate-300 mb-1">{zona.zona}</p>
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-xl font-bold text-white">{zona.porcentagem}%</span>
                      {zona.variacao > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : zona.variacao < 0 ? (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      ) : (
                        <Minus className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                    <p className={`text-xs ${
                      zona.variacao > 0 ? 'text-green-400' : 
                      zona.variacao < 0 ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {zona.variacao > 0 ? '+' : ''}{zona.variacao}%
                    </p>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${zona.porcentagem}%` }}
                      transition={{ delay: index * 0.05 + 0.5, duration: 0.5 }}
                      className="h-full rounded-full"
                      style={{ 
                        backgroundColor: zona.porcentagem > 45 ? '#22C55E' : 
                                        zona.porcentagem > 35 ? '#EAB308' : 
                                        zona.porcentagem > 25 ? '#F97316' : '#EF4444'
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-3 p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
              <p className="text-xs text-cyan-200">
                <Target className="w-3 h-3 inline mr-1" />
                <strong>Insight:</strong> Zona Norte é sua fortaleza (52%). Zona Oeste precisa de atenção urgente (28%).
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

