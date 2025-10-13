'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Eye, Users, TrendingUp, MousePointer, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SitesLanding({ candidateId }: { candidateId: string }) {
  const [metricas] = useState([
    { label: 'Sites Ativos', valor: 5, icone: Globe },
    { label: 'Visitantes', valor: '127K', variacao: 22.3, icone: Users },
    { label: 'Taxa Conversão', valor: '18.5%', variacao: 5.1, icone: TrendingUp },
    { label: 'Leads Gerados', valor: '23.5K', variacao: 28.7, icone: MousePointer }
  ]);

  const [sites] = useState([
    { nome: 'Site Oficial', url: 'ronaldonogueira.com.br', visitantes: 67000, conversoes: 12060, taxa: 18.0, status: 'ATIVO' },
    { nome: 'Landing - Educação', url: 'propostas-educacao.com.br', visitantes: 34000, conversoes: 6800, taxa: 20.0, status: 'ATIVO' },
    { nome: 'Landing - Saúde', url: 'saude-para-todos.com.br', visitantes: 26000, conversoes: 4680, taxa: 18.0, status: 'ATIVO' }
  ]);

  const dadosVisitas = [
    { dia: 'Seg', visitas: 18000, conversoes: 3240 },
    { dia: 'Ter', visitas: 21000, conversoes: 3780 },
    { dia: 'Qua', visitas: 23000, conversoes: 4140 },
    { dia: 'Qui', visitas: 19000, conversoes: 3420 },
    { dia: 'Sex', visitas: 22000, conversoes: 3960 },
    { dia: 'Sáb', visitas: 24000, conversoes: 4320 }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Sites & Landing Pages</h1>
          <p className="text-slate-400 mt-1">Gestão de presença web • 5 sites ativos • 127K visitantes</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Novo Site</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricas.map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-cyan-500/30 bg-cyan-500/5">
                <CardContent className="p-4 text-center">
                  <Icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{m.valor}</div>
                  <div className="text-xs text-slate-400">{m.label}</div>
                  {m.variacao && <div className="text-xs text-green-400 mt-1">+{m.variacao}%</div>}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Eye className="w-5 h-5 text-green-400" /><span>Visitas e Conversões</span></CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosVisitas}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="dia" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="visitas" stroke="#3B82F6" strokeWidth={2} name="Visitas" />
                <Line type="monotone" dataKey="conversoes" stroke="#10B981" strokeWidth={2} name="Conversões" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Globe className="w-5 h-5 text-purple-400" /><span>Sites Ativos</span></CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sites.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{s.nome}</h4>
                    <Badge className="bg-green-500/20 text-green-300">{s.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{s.url}</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div><div className="text-slate-400">Visitantes</div><div className="text-blue-400 font-medium">{(s.visitantes / 1000).toFixed(0)}K</div></div>
                    <div><div className="text-slate-400">Conversões</div><div className="text-green-400 font-medium">{(s.conversoes / 1000).toFixed(1)}K</div></div>
                    <div><div className="text-slate-400">Taxa</div><div className="text-purple-400 font-medium">{s.taxa}%</div></div>
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

