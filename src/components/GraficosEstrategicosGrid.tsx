'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Users, TrendingUp, TrendingDown, Crown, Target, BarChart3, 
  Activity
} from 'lucide-react';

// Dados do Espectro Ideológico
const espectroIdeologico = [
  { posicao: 'Esquerda', porcentagem: 20, eleitores: 45200, cor: '#EF4444' },
  { posicao: 'Centro-Esquerda', porcentagem: 15, eleitores: 33900, cor: '#F97316' },
  { posicao: 'Centro', porcentagem: 30, eleitores: 67800, cor: '#EAB308' },
  { posicao: 'Centro-Direita', porcentagem: 20, eleitores: 45200, cor: '#22C55E' },
  { posicao: 'Direita', porcentagem: 15, eleitores: 33900, cor: '#3B82F6' }
];

// Dados da Jornada do Eleitor
const jornadaEleitor = [
  { etapa: 'Descoberta', porcentagem: 40, pessoas: 120000, emoji: '🥶' },
  { etapa: 'Interesse', porcentagem: 30, pessoas: 90000, emoji: '🙂' },
  { etapa: 'Simpatia', porcentagem: 20, pessoas: 60000, emoji: '😊' },
  { etapa: 'Apoio', porcentagem: 7, pessoas: 21000, emoji: '🔥' },
  { etapa: 'Embaixador', porcentagem: 3, pessoas: 9000, emoji: '🚀' }
];

// Dados do Panorama da Disputa
const panoramaDisputa = [
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
  }
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

export default function GraficosEstrategicosGrid() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-4">
      {/* 1. ESPECTRO POLÍTICO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="glass-card h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <span className="text-white">Espectro Político dos Apoiadores</span>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                226K mapeados
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-56 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={espectroIdeologico}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ posicao, porcentagem }) => `${porcentagem}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="porcentagem"
                    paddingAngle={2}
                  >
                    {espectroIdeologico.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.cor} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value: any, name: any, props: any) => [
                      `${value}% (${(props.payload.eleitores / 1000).toFixed(1)}K eleitores)`,
                      props.payload.posicao
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Legenda personalizada */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {espectroIdeologico.map((item, index) => (
                <div key={item.posicao} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.cor }}
                  />
                  <div className="flex-1">
                    <p className="text-xs text-slate-300">{item.posicao}</p>
                    <p className="text-xs text-slate-400">
                      {item.porcentagem}% ({(item.eleitores / 1000).toFixed(1)}K)
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-blue-200">
                <Target className="w-3 h-3 inline mr-1" />
                <strong>Insight:</strong> Forte no Centro (30%). Oportunidade de crescer 8% no Centro-Direita.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 2. JORNADA DO ELEITOR */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="glass-card h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <Activity className="w-5 h-5 text-green-400" />
              <span className="text-white">Jornada do Eleitor</span>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                300K mapeados
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {jornadaEleitor.map((etapa, index) => (
              <motion.div
                key={etapa.etapa}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{etapa.emoji}</span>
                    <span className="text-xs font-medium text-white">{etapa.etapa}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white">{etapa.porcentagem}%</span>
                    <span className="text-xs text-slate-400">
                      ({(etapa.pessoas / 1000).toFixed(0)}K)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${etapa.porcentagem}%` }}
                    transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                  />
                </div>
              </motion.div>
            ))}
            
            <div className="mt-3 p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-xs text-green-200">
                <Target className="w-3 h-3 inline mr-1" />
                <strong>Insight:</strong> 18K simpatizantes prontos para conversão em apoiadores ativos.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* 3. PANORAMA DA DISPUTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="glass-card h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-base">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-white">Panorama da Disputa</span>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                Liderando +9.4%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {panoramaDisputa.map((candidato, index) => (
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
                    <span className="text-base">{candidato.emoji}</span>
                    <span className={`text-xs font-medium ${
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
                        <span className="text-xs ml-0.5">+{candidato.variacao}%</span>
                      </div>
                    ) : candidato.variacao < 0 ? (
                      <div className="flex items-center text-red-400">
                        <TrendingDown className="w-3 h-3" />
                        <span className="text-xs ml-0.5">{candidato.variacao}%</span>
                      </div>
                    ) : null}
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
            
            <div className="mt-3 p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-xs text-purple-200">
                <Target className="w-3 h-3 inline mr-1" />
                <strong>Insight:</strong> Você lidera com 9.4% de vantagem. Pedro Costa é ameaça emergente (+0.8%).
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
            <CardTitle className="flex items-center space-x-2 text-base">
              <TrendingUp className="w-5 h-5 text-orange-400" />
              <span className="text-white">Evolução Temporal</span>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                +3.2%/mês
              </Badge>
            </CardTitle>
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

            {/* Legenda de Candidatos */}
            <div className="flex items-center justify-center space-x-4 py-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0066FF' }} />
                <span className="text-xs text-white font-medium">Ronaldo Nogueira</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EF4444' }} />
                <span className="text-xs text-slate-300">João Silva</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F97316' }} />
                <span className="text-xs text-slate-300">Maria Santos</span>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-medium text-slate-300">Marcos Importantes</h4>
              <div className="grid grid-cols-2 gap-1">
                <div className="p-1.5 bg-slate-800/30 rounded text-xs text-white">
                  Mar: +8% campanha digital
                </div>
                <div className="p-1.5 bg-slate-800/30 rounded text-xs text-white">
                  Mai: Recuperação +5%
                </div>
              </div>
            </div>
            
            <div className="p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <p className="text-xs text-orange-200">
                <Target className="w-3 h-3 inline mr-1" />
                <strong>Insight:</strong> Crescimento consistente. Projeção agosto: 48.5%.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

