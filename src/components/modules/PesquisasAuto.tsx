'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Target, Users, Clock, TrendingUp, Activity, Plus, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function PesquisasAuto({ candidateId }: { candidateId: string }) {
  const [metricas] = useState([
    { label: 'Pesquisas Ativas', valor: '12', variacao: 33.3, icone: Search, cor: 'blue' },
    { label: 'Respostas Hoje', valor: '1.247', variacao: 18.9, icone: Users, cor: 'green' },
    { label: 'Taxa de Resposta', valor: '78.5%', variacao: 12.3, icone: Target, cor: 'purple' },
    { label: 'Tempo Médio', valor: '2.3min', variacao: -8.4, icone: Clock, cor: 'yellow' },
    { label: 'Insights Gerados', valor: '89', variacao: 25.6, icone: Activity, cor: 'cyan' },
    { label: 'Performance', valor: '89%', variacao: 5.2, icone: TrendingUp, cor: 'emerald' }
  ]);

  const [pesquisas] = useState([
    { id: '1', nome: 'Intenção de Voto - Outubro', tipo: 'Intenção de Voto', enviadas: 5000, respostas: 4127, taxa: 82.5, status: 'Ativa', insights: 23 },
    { id: '2', nome: 'Avaliação Propostas Educação', tipo: 'Temas Prioritários', enviadas: 3200, respostas: 2496, taxa: 78.0, status: 'Concluída', insights: 18 },
    { id: '3', nome: 'Satisfação Apoiadores', tipo: 'Satisfação', enviadas: 1500, respostas: 1245, taxa: 83.0, status: 'Ativa', insights: 12 }
  ]);

  const dadosRespostas = [
    { dia: 'Seg', respostas: 156, taxa: 75 },
    { dia: 'Ter', respostas: 189, taxa: 78 },
    { dia: 'Qua', respostas: 234, taxa: 81 },
    { dia: 'Qui', respostas: 298, taxa: 84 },
    { dia: 'Sex', respostas: 245, taxa: 79 },
    { dia: 'Sáb', respostas: 125, taxa: 72 }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">Pesquisas Automáticas</h1>
            <Badge className="bg-green-500/20 text-green-400">12 Ativas</Badge>
          </div>
          <p className="text-slate-400 mt-1">Pesquisas automatizadas com análise de IA • 456 pesquisas realizadas • 89% performance</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Nova Pesquisa</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricas.map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-red-500/30 bg-red-500/5">
                <CardContent className="p-4 text-center">
                  <Icon className={`w-5 h-5 text-${m.cor}-400 mx-auto mb-2`} />
                  <div className="text-xl font-bold text-white">{m.valor}</div>
                  <div className="text-xs text-slate-400">{m.label}</div>
                  <div className={`text-xs mt-1 ${m.variacao > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {m.variacao > 0 ? '+' : ''}{m.variacao}%
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><BarChart3 className="w-5 h-5 text-green-400" /><span>Respostas por Dia</span></CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosRespostas}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="dia" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="respostas" stroke="#3B82F6" strokeWidth={2} name="Respostas" />
                <Line type="monotone" dataKey="taxa" stroke="#10B981" strokeWidth={2} name="Taxa (%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Search className="w-5 h-5 text-purple-400" /><span>Pesquisas em Andamento</span></CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pesquisas.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/30 rounded-lg p-3 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{p.nome}</h4>
                    <Badge className={p.status === 'Ativa' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}>
                      {p.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">{p.enviadas}</div>
                      <div className="text-slate-400">Enviadas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-bold">{p.respostas}</div>
                      <div className="text-slate-400">Respostas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold">{p.taxa.toFixed(1)}%</div>
                      <div className="text-slate-400">Taxa</div>
                    </div>
                    <div className="text-center">
                      <div className="text-cyan-400 font-bold">{p.insights}</div>
                      <div className="text-slate-400">Insights</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

