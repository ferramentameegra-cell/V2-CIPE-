'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Target, AlertTriangle, Plus, BarChart3 } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function OrcamentoROI({ candidateId }: { candidateId: string }) {
  const [orcamento] = useState({
    total: 4000000,
    gasto: 2800000,
    restante: 1200000,
    percentual: 70,
    categorias: [
      { nome: 'Marketing Digital', orcado: 1200000, gasto: 980000, cor: '#3B82F6' },
      { nome: 'Eventos', orcado: 800000, gasto: 650000, cor: '#10B981' },
      { nome: 'Mídia Tradicional', orcado: 900000, gasto: 720000, cor: '#8B5CF6' },
      { nome: 'Pessoal', orcado: 600000, gasto: 280000, cor: '#EF4444' },
      { nome: 'Infraestrutura', orcado: 300000, gasto: 120000, cor: '#F59E0B' },
      { nome: 'Outros', orcado: 200000, gasto: 50000, cor: '#06B6D4' }
    ]
  });

  const [metricas] = useState([
    { label: 'ROI Geral', valor: '340%', variacao: 23.5, icone: TrendingUp, cor: 'green' },
    { label: 'Orçamento Total', valor: 'R$ 4.0M', variacao: 0, icone: DollarSign, cor: 'blue' },
    { label: 'Gasto', valor: 'R$ 2.8M', variacao: 12.3, icone: Target, cor: 'red' },
    { label: 'Restante', valor: 'R$ 1.2M', variacao: -12.3, icone: AlertTriangle, cor: 'yellow' }
  ]);

  const formatMoeda = (valor: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(valor);

  const dadosROI = [
    { categoria: 'Digital', investimento: 980000, retorno: 3332000, roi: 340 },
    { categoria: 'Eventos', investimento: 650000, retorno: 2145000, roi: 330 },
    { categoria: 'Mídia', investimento: 720000, retorno: 2160000, roi: 300 }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Orçamento & ROI</h1>
          <p className="text-slate-400 mt-1">Gestão financeira completa • R$ 2.8M utilizados (70%) • ROI: 340%</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700"><Plus className="w-4 h-4 mr-2" />Nova Transação</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricas.map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-green-500/30 bg-green-500/5">
                <CardContent className="p-4 text-center">
                  <Icon className={`w-5 h-5 text-${m.cor}-400 mx-auto mb-2`} />
                  <div className="text-xl font-bold text-white">{m.valor}</div>
                  <div className="text-xs text-slate-400">{m.label}</div>
                  {m.variacao !== 0 && <div className={`text-xs mt-1 ${m.variacao > 0 ? 'text-green-400' : 'text-red-400'}`}>{m.variacao > 0 ? '+' : ''}{m.variacao}%</div>}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><DollarSign className="w-5 h-5 text-blue-400" /><span>Distribuição do Orçamento</span></CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={orcamento.categorias} dataKey="gasto" nameKey="nome" cx="50%" cy="50%" outerRadius={100} label={({ nome }) => nome}>
                  {orcamento.categorias.map((cat, i) => <Cell key={`cell-${i}`} fill={cat.cor} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} formatter={(value: any) => formatMoeda(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><TrendingUp className="w-5 h-5 text-green-400" /><span>ROI por Categoria</span></CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosROI}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="categoria" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                <Bar dataKey="roi" fill="#10B981" name="ROI %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle className="flex items-center space-x-2"><Target className="w-5 h-5 text-purple-400" /><span>Categorias de Orçamento</span></CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orcamento.categorias.map((cat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: cat.cor }} />
                    <h4 className="font-medium text-white">{cat.nome}</h4>
                  </div>
                  <Badge className={
                    (cat.gasto / cat.orcado) >= 0.9 ? 'bg-red-500/20 text-red-300' :
                    (cat.gasto / cat.orcado) >= 0.75 ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-green-500/20 text-green-300'
                  }>
                    {((cat.gasto / cat.orcado) * 100).toFixed(0)}%
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                  <div><div className="text-slate-400 text-xs">Orçado</div><div className="text-blue-400 font-medium">{formatMoeda(cat.orcado)}</div></div>
                  <div><div className="text-slate-400 text-xs">Gasto</div><div className="text-red-400 font-medium">{formatMoeda(cat.gasto)}</div></div>
                  <div><div className="text-slate-400 text-xs">Restante</div><div className="text-green-400 font-medium">{formatMoeda(cat.orcado - cat.gasto)}</div></div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="h-2 rounded-full transition-all" style={{ backgroundColor: cat.cor, width: `${Math.min(100, (cat.gasto / cat.orcado) * 100)}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

