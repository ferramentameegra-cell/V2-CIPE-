'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Users, TrendingUp, TrendingDown, Crown, Target, BarChart3, 
  PieChart as PieChartIcon, LineChart as LineChartIcon, Activity
} from 'lucide-react';

// Dados para os gráficos
const espectroIdeologico = [
  { posicao: 'Esquerda', porcentagem: 20, eleitores: 45200, cor: '#EF4444' },
  { posicao: 'Centro-Esquerda', porcentagem: 15, eleitores: 33900, cor: '#F97316' },
  { posicao: 'Centro', porcentagem: 30, eleitores: 67800, cor: '#EAB308' },
  { posicao: 'Centro-Direita', porcentagem: 20, eleitores: 45200, cor: '#22C55E' },
  { posicao: 'Direita', porcentagem: 15, eleitores: 33900, cor: '#3B82F6' }
];

const jornadaEleitor = [
  { etapa: 'Descoberta', porcentagem: 40, pessoas: 120000, emoji: '🥶', descricao: 'Conhecem o candidato' },
  { etapa: 'Interesse', porcentagem: 30, pessoas: 90000, emoji: '🙂', descricao: 'Seguem nas redes sociais' },
  { etapa: 'Simpatia', porcentagem: 20, pessoas: 60000, emoji: '😊', descricao: 'Curtem e compartilham' },
  { etapa: 'Apoio', porcentagem: 7, pessoas: 21000, emoji: '🔥', descricao: 'Participam de eventos' },
  { etapa: 'Embaixador', porcentagem: 3, pessoas: 9000, emoji: '🚀', descricao: 'Mobilizam outros' }
];

const panoramaDisputa = [
  { 
    candidato: 'Ronaldo Nogueira', 
    porcentagem: 45.2, 
    variacao: 3.2, 
    partido: 'Partido A',
    posicao: 1,
    emoji: '🥇',
    cor: '#0066FF'
  },
  { 
    candidato: 'João Silva', 
    porcentagem: 35.8, 
    variacao: -1.1, 
    partido: 'Partido B',
    posicao: 2,
    emoji: '🥈',
    cor: '#EF4444'
  },
  { 
    candidato: 'Maria Santos', 
    porcentagem: 19.0, 
    variacao: -2.1, 
    partido: 'Partido C',
    posicao: 3,
    emoji: '🥉',
    cor: '#F97316'
  },
  { 
    candidato: 'Pedro Costa', 
    porcentagem: 8.5, 
    variacao: 0.8, 
    partido: 'Partido D',
    posicao: 4,
    emoji: '4️⃣',
    cor: '#8B5CF6'
  },
  { 
    candidato: 'Ana Oliveira', 
    porcentagem: 4.2, 
    variacao: -0.5, 
    partido: 'Partido E',
    posicao: 5,
    emoji: '5️⃣',
    cor: '#6B7280'
  },
  { 
    candidato: 'Carlos Lima', 
    porcentagem: 2.3, 
    variacao: 0.0, 
    partido: 'Partido F',
    posicao: 6,
    emoji: '6️⃣',
    cor: '#9CA3AF'
  }
];

const evolucaoTemporal = [
  { mes: 'Jan', ronaldo: 42, joao: 37, maria: 21 },
  { mes: 'Fev', ronaldo: 44, joao: 36, maria: 20 },
  { mes: 'Mar', ronaldo: 43, joao: 38, maria: 19 },
  { mes: 'Abr', ronaldo: 45, joao: 36, maria: 19 },
  { mes: 'Mai', ronaldo: 47, joao: 34, maria: 19 },
  { mes: 'Jun', ronaldo: 45.2, joao: 35.8, maria: 19.0 }
];

export default function GraficosEstrategicos() {
  const [graficoAtivo, setGraficoAtivo] = useState<'espectro' | 'jornada' | 'panorama' | 'evolucao'>('espectro');

  const graficos = [
    { id: 'espectro', titulo: 'Espectro Político', icon: BarChart3, cor: 'blue' },
    { id: 'jornada', titulo: 'Jornada do Eleitor', icon: Activity, cor: 'green' },
    { id: 'panorama', titulo: 'Panorama da Disputa', icon: Crown, cor: 'purple' },
    { id: 'evolucao', titulo: 'Evolução Temporal', icon: LineChartIcon, cor: 'orange' }
  ];

  return (
    <div className="space-y-6">
      {/* Gráfico Ativo */}
      <motion.div
        key={graficoAtivo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {graficoAtivo === 'espectro' && (
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <span className="text-lg font-semibold text-white">Espectro Político dos Apoiadores</span>
                  <Badge className="bg-blue-500/20 text-blue-300">
                    226K eleitores mapeados
                  </Badge>
                </CardTitle>
                <div className="flex gap-2">
                  {graficos.map((grafico) => {
                    const Icon = grafico.icon;
                    return (
                      <Button
                        key={grafico.id}
                        variant={graficoAtivo === grafico.id ? "default" : "outline"}
                        onClick={() => setGraficoAtivo(grafico.id as any)}
                        size="sm"
                        className={`flex items-center space-x-1 text-xs transition-all duration-300 ${
                          graficoAtivo === grafico.id 
                            ? `bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-blue-500/50 shadow-lg shadow-blue-500/25` 
                            : 'bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 border-slate-600/50 hover:text-white hover:border-slate-500/50 backdrop-blur-sm'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span className="text-xs">
                          {grafico.titulo === 'Espectro Político' ? 'Espectro' :
                           grafico.titulo === 'Jornada do Eleitor' ? 'Jornada' :
                           grafico.titulo === 'Panorama da Disputa' ? 'Panorama' :
                           grafico.titulo === 'Evolução Temporal' ? 'Evolução' : grafico.titulo}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {espectroIdeologico.map((item, index) => (
                  <motion.div
                    key={item.posicao}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-24 text-sm font-medium text-slate-300">
                      {item.posicao}
                    </div>
                    <div className="flex-1 relative">
                      <div className="w-full bg-slate-700 rounded-full h-8 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.porcentagem}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                          className="h-full rounded-full flex items-center justify-end pr-2"
                          style={{ backgroundColor: item.cor }}
                        >
                          <span className="text-white text-sm font-bold">
                            {item.porcentagem}%
                          </span>
                        </motion.div>
                      </div>
                    </div>
                    <div className="w-20 text-right">
                      <div className="text-sm font-bold text-white">
                        {(item.eleitores / 1000).toFixed(1)}K
                      </div>
                      <div className="text-xs text-slate-400">eleitores</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Target className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-300">💡 Insight do Oracle</p>
                    <p className="text-sm text-blue-200/80">
                      Oportunidade de crescer 12% no Centro-Direita com discurso sobre economia local. 
                      Seus adversários têm baixa penetração neste segmento.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {graficoAtivo === 'jornada' && (
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-green-400" />
                  <span className="text-lg font-semibold text-white">Jornada do Eleitor</span>
                  <Badge className="bg-green-500/20 text-green-300">
                    300K pessoas mapeadas
                  </Badge>
                </CardTitle>
                <div className="flex gap-2">
                  {graficos.map((grafico) => {
                    const Icon = grafico.icon;
                    return (
                      <Button
                        key={grafico.id}
                        variant={graficoAtivo === grafico.id ? "default" : "outline"}
                        onClick={() => setGraficoAtivo(grafico.id as any)}
                        size="sm"
                        className={`flex items-center space-x-1 text-xs transition-all duration-300 ${
                          graficoAtivo === grafico.id 
                            ? `bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-green-500/50 shadow-lg shadow-green-500/25` 
                            : 'bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 border-slate-600/50 hover:text-white hover:border-slate-500/50 backdrop-blur-sm'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span className="text-xs">
                          {grafico.titulo === 'Espectro Político' ? 'Espectro' :
                           grafico.titulo === 'Jornada do Eleitor' ? 'Jornada' :
                           grafico.titulo === 'Panorama da Disputa' ? 'Panorama' :
                           grafico.titulo === 'Evolução Temporal' ? 'Evolução' : grafico.titulo}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {jornadaEleitor.map((etapa, index) => (
                  <motion.div
                    key={etapa.etapa}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">{etapa.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">{etapa.etapa.toUpperCase()}</h3>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-400">
                              {etapa.porcentagem}%
                            </div>
                            <div className="text-sm text-slate-400">
                              {(etapa.pessoas / 1000).toFixed(0)}K pessoas
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{etapa.descricao}</p>
                        
                        {/* Barra de progresso */}
                        <div className="relative">
                          <div className="w-full bg-slate-700 rounded-full h-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${etapa.porcentagem * 2.5}%` }}
                              transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                              className="bg-gradient-to-r from-green-600 to-green-400 h-3 rounded-full"
                            />
                          </div>
                          
                          {/* Taxa de conversão */}
                          {index < jornadaEleitor.length - 1 && (
                            <div className="absolute -bottom-6 right-0 text-xs text-slate-500">
                              Conversão: {Math.round((jornadaEleitor[index + 1].pessoas / etapa.pessoas) * 100)}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Linha conectora */}
                    {index < jornadaEleitor.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-8 bg-gradient-to-b from-green-400 to-transparent" />
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-300">🎯 Oportunidade Identificada</p>
                    <p className="text-sm text-green-200/80">
                      18K simpatizantes prontos para virar apoiadores. Taxa de conversão 35% vs meta de 45%. 
                      Recomendação: Criar mais eventos de engajamento presencial.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {graficoAtivo === 'panorama' && (
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="w-5 h-5 text-purple-400" />
                  <span className="text-lg font-semibold text-white">Panorama da Disputa</span>
                  <Badge className="bg-purple-500/20 text-purple-300">
                    Atualizado há 2h
                  </Badge>
                </CardTitle>
                <div className="flex gap-2">
                  {graficos.map((grafico) => {
                    const Icon = grafico.icon;
                    return (
                      <Button
                        key={grafico.id}
                        variant={graficoAtivo === grafico.id ? "default" : "outline"}
                        onClick={() => setGraficoAtivo(grafico.id as any)}
                        size="sm"
                        className={`flex items-center space-x-1 text-xs transition-all duration-300 ${
                          graficoAtivo === grafico.id 
                            ? `bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white border-purple-500/50 shadow-lg shadow-purple-500/25` 
                            : 'bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 border-slate-600/50 hover:text-white hover:border-slate-500/50 backdrop-blur-sm'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span className="text-xs">
                          {grafico.titulo === 'Espectro Político' ? 'Espectro' :
                           grafico.titulo === 'Jornada do Eleitor' ? 'Jornada' :
                           grafico.titulo === 'Panorama da Disputa' ? 'Panorama' :
                           grafico.titulo === 'Evolução Temporal' ? 'Evolução' : grafico.titulo}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {panoramaDisputa.map((candidato, index) => (
                  <motion.div
                    key={candidato.candidato}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border transition-all ${
                      index === 0 
                        ? 'bg-blue-500/10 border-blue-500/30' 
                        : 'bg-slate-800/30 border-slate-700/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{candidato.emoji}</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-medium ${index === 0 ? 'text-blue-300' : 'text-white'}`}>
                              {candidato.candidato}
                            </h3>
                            {index === 0 && (
                              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                                VOCÊ
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-400">{candidato.partido}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className={`text-2xl font-bold ${
                            index === 0 ? 'text-blue-400' : 'text-white'
                          }`}>
                            {candidato.porcentagem}%
                          </span>
                          <div className="flex items-center space-x-1">
                            {candidato.variacao > 0 ? (
                              <TrendingUp className="w-4 h-4 text-green-400" />
                            ) : candidato.variacao < 0 ? (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            ) : (
                              <div className="w-4 h-4" />
                            )}
                            <span className={`text-sm ${
                              candidato.variacao > 0 ? 'text-green-400' : 
                              candidato.variacao < 0 ? 'text-red-400' : 'text-slate-400'
                            }`}>
                              {candidato.variacao > 0 ? '+' : ''}{candidato.variacao}%
                            </span>
                          </div>
                        </div>
                        
                        {/* Barra de progresso */}
                        <div className="w-32 bg-slate-700 rounded-full h-2 mt-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(candidato.porcentagem / 50) * 100}%` }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                            className="h-2 rounded-full"
                            style={{ backgroundColor: candidato.cor }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <h4 className="text-sm font-medium text-green-300 mb-2">✅ Vantagens Competitivas</h4>
                  <ul className="text-sm text-green-200/80 space-y-1">
                    <li>• Maior crescimento (+3.2% vs -0.3% média)</li>
                    <li>• Melhor performance digital (8.5% engajamento)</li>
                    <li>• Maior diversidade ideológica</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <h4 className="text-sm font-medium text-red-300 mb-2">⚠️ Ameaças Identificadas</h4>
                  <ul className="text-sm text-red-200/80 space-y-1">
                    <li>• João Silva intensificou campanha digital</li>
                    <li>• Pedro Costa crescendo entre jovens</li>
                    <li>• 15.5% de eleitores ainda indecisos</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {graficoAtivo === 'evolucao' && (
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <LineChartIcon className="w-5 h-5 text-orange-400" />
                  <span className="text-lg font-semibold text-white">Evolução Temporal da Disputa</span>
                  <Badge className="bg-orange-500/20 text-orange-300">
                    Últimos 6 meses
                  </Badge>
                </CardTitle>
                <div className="flex gap-2">
                  {graficos.map((grafico) => {
                    const Icon = grafico.icon;
                    return (
                      <Button
                        key={grafico.id}
                        variant={graficoAtivo === grafico.id ? "default" : "outline"}
                        onClick={() => setGraficoAtivo(grafico.id as any)}
                        size="sm"
                        className={`flex items-center space-x-1 text-xs transition-all duration-300 ${
                          graficoAtivo === grafico.id 
                            ? `bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white border-orange-500/50 shadow-lg shadow-orange-500/25` 
                            : 'bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 border-slate-600/50 hover:text-white hover:border-slate-500/50 backdrop-blur-sm'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span className="text-xs">
                          {grafico.titulo === 'Espectro Político' ? 'Espectro' :
                           grafico.titulo === 'Jornada do Eleitor' ? 'Jornada' :
                           grafico.titulo === 'Panorama da Disputa' ? 'Panorama' :
                           grafico.titulo === 'Evolução Temporal' ? 'Evolução' : grafico.titulo}
                        </span>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de Linha */}
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={evolucaoTemporal}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="mes" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="ronaldo" 
                        stroke="#0066FF" 
                        strokeWidth={4}
                        name="Ronaldo Nogueira"
                        dot={{ fill: '#0066FF', strokeWidth: 2, r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="joao" 
                        stroke="#EF4444" 
                        strokeWidth={3}
                        name="João Silva"
                        dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="maria" 
                        stroke="#F97316" 
                        strokeWidth={3}
                        name="Maria Santos"
                        dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                {/* Marcos Importantes */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-orange-300">📅 Marcos Importantes</h4>
                  <div className="space-y-2">
                    {[
                      { mes: 'Março', evento: 'Lançamento campanha digital', impacto: '+8% em 2 semanas' },
                      { mes: 'Abril', evento: 'Debate na TV', impacto: 'Manteve posição' },
                      { mes: 'Maio', evento: 'Crise do Projeto X', impacto: '-2%, recuperou em 1 semana' },
                      { mes: 'Junho', evento: 'Campanha "Experiência"', impacto: '+5% em 3 semanas' }
                    ].map((marco, index) => (
                      <div key={index} className="p-3 bg-slate-800/30 rounded-lg">
                        <div className="text-sm font-medium text-white">{marco.mes}: {marco.evento}</div>
                        <div className="text-xs text-slate-400">{marco.impacto}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="w-5 h-5 text-orange-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-orange-300">📈 Projeção</p>
                    <p className="text-sm text-orange-200/80">
                      Padrão de crescimento consistente. Projeção para agosto: 48.5%. 
                      Sua recuperação de crises é 2x mais rápida que os adversários.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
