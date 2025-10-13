'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Users, TrendingUp, BarChart3, Plus } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function Segmentacao({ candidateId }: { candidateId: string }) {
  const [metricas] = useState([
    { label: 'Segmentos Ativos', valor: 12, icone: Target },
    { label: 'Total Eleitores', valor: '2.8M', icone: Users },
    { label: 'Taxa Conversão Média', valor: '28.5%', icone: TrendingUp },
    { label: 'Segmentos de Alto Valor', valor: 5, icone: BarChart3 }
  ]);

  const [segmentos] = useState([
    { nome: 'Lideranças Femininas', tamanho: 45892, conversao: 34, clv: 450, cor: '#EC4899' },
    { nome: 'Profissionais Liberais', tamanho: 123456, conversao: 28, clv: 380, cor: '#3B82F6' },
    { nome: 'Jovens Universitários', tamanho: 234567, conversao: 22, clv: 220, cor: '#10B981' },
    { nome: 'Trabalhadores Rurais', tamanho: 89123, conversao: 31, clv: 520, cor: '#F59E0B' },
    { nome: 'Aposentados', tamanho: 156789, conversao: 42, clv: 680, cor: '#8B5CF6' }
  ]);

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Segmentação</h1>
          <p className="text-slate-400 mt-1">Segmentação avançada de eleitores • 12 segmentos ativos • 2.8M eleitores</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Novo Segmento</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricas.map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-green-500/30 bg-green-500/5">
                <CardContent className="p-4 text-center">
                  <Icon className="w-5 h-5 text-green-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{m.valor}</div>
                  <div className="text-xs text-slate-400">{m.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Target className="w-5 h-5 text-blue-400" /><span>Distribuição por Segmento</span></CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={segmentos} dataKey="tamanho" nameKey="nome" cx="50%" cy="50%" outerRadius={100} label={({ nome }) => nome}>
                  {segmentos.map((s, i) => <Cell key={`cell-${i}`} fill={s.cor} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Users className="w-5 h-5 text-purple-400" /><span>Segmentos de Alto Valor</span></CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {segmentos.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.cor }} />
                      <h4 className="font-medium text-white text-sm">{s.nome}</h4>
                    </div>
                    <div className="text-green-400 font-bold text-sm">R$ {s.clv}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div><div className="text-slate-400">Eleitores</div><div className="text-blue-400 font-medium">{(s.tamanho / 1000).toFixed(0)}K</div></div>
                    <div><div className="text-slate-400">Conversão</div><div className="text-purple-400 font-medium">{s.conversao}%</div></div>
                    <div><div className="text-slate-400">CLV</div><div className="text-green-400 font-medium">R$ {s.clv}</div></div>
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

