'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Send, TrendingUp, Users, Target, Eye, Plus, BarChart3 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EmailMarketing({ candidateId }: { candidateId: string }) {
  const [metricas] = useState([
    { label: 'Emails Enviados', valor: '234K', variacao: 15.8, icone: Send },
    { label: 'Taxa de Abertura', valor: '32.4%', variacao: 3.2, icone: Eye },
    { label: 'Taxa de Clique', valor: '12.8%', variacao: 2.1, icone: Target },
    { label: 'Conversões', valor: '8.9K', variacao: 18.3, icone: TrendingUp }
  ]);

  const [campanhas] = useState([
    { id: '1', nome: 'Newsletter Semanal', enviados: 89000, abertos: 28960, cliques: 11616, conversoes: 2320, roi: 420, status: 'ATIVA' },
    { id: '2', nome: 'Convite Evento SP', enviados: 45000, abertos: 15750, cliques: 6300, conversoes: 1890, roi: 380, status: 'CONCLUIDA' },
    { id: '3', nome: 'Propostas Educação', enviados: 67000, abertos: 21440, cliques: 8576, conversoes: 3433, roi: 510, status: 'ATIVA' }
  ]);

  const dadosPerformance = [
    { mes: 'Jan', enviados: 120000, abertos: 38400, cliques: 15360 },
    { mes: 'Fev', enviados: 145000, abertos: 46400, cliques: 18560 },
    { mes: 'Mar', enviados: 178000, abertos: 56960, cliques: 22784 },
    { mes: 'Abr', enviados: 198000, abertos: 63360, cliques: 25344 },
    { mes: 'Mai', enviados: 212000, abertos: 67840, cliques: 27136 },
    { mes: 'Jun', enviados: 234000, abertos: 74880, cliques: 29952 }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Email Marketing</h1>
          <p className="text-slate-400 mt-1">Gestão de campanhas de email • 234K emails enviados • 32.4% taxa de abertura</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Nova Campanha</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricas.map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-purple-500/30 bg-purple-500/5">
                <CardContent className="p-4 text-center">
                  <Icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{m.valor}</div>
                  <div className="text-xs text-slate-400">{m.label}</div>
                  <div className="text-xs text-green-400 mt-1">+{m.variacao}%</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><BarChart3 className="w-5 h-5 text-green-400" /><span>Performance Mensal</span></CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dadosPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="mes" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="enviados" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Enviados" />
                <Area type="monotone" dataKey="abertos" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.5} name="Abertos" />
                <Area type="monotone" dataKey="cliques" stackId="3" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.7} name="Cliques" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Mail className="w-5 h-5 text-blue-400" /><span>Campanhas Ativas</span></CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {campanhas.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{c.nome}</h4>
                    <Badge className={c.status === 'ATIVA' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}>{c.status}</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div><div className="text-slate-400">Enviados</div><div className="text-blue-400 font-medium">{(c.enviados / 1000).toFixed(0)}K</div></div>
                    <div><div className="text-slate-400">Abertura</div><div className="text-green-400 font-medium">{((c.abertos / c.enviados) * 100).toFixed(1)}%</div></div>
                    <div><div className="text-slate-400">Cliques</div><div className="text-purple-400 font-medium">{((c.cliques / c.abertos) * 100).toFixed(1)}%</div></div>
                    <div><div className="text-slate-400">ROI</div><div className="text-emerald-400 font-medium">{c.roi}%</div></div>
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

