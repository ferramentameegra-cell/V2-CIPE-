'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Eye, Users, Clock, Target, Activity, Play, Settings, Smartphone } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function NarrativaRA({ candidateId }: { candidateId: string }) {
  const [metricas] = useState([
    { label: 'Visualizações', valor: '1.247', variacao: 34.2, icone: Eye, cor: 'blue' },
    { label: 'Sessões Ativas', valor: '89', variacao: 15.7, icone: Users, cor: 'green' },
    { label: 'Tempo Médio', valor: '3.4min', variacao: 28.3, icone: Clock, cor: 'purple' },
    { label: 'Engajamento', valor: '76%', variacao: 12.1, icone: Activity, cor: 'yellow' },
    { label: 'Compartilhamentos', valor: '456', variacao: 45.8, icone: Target, cor: 'cyan' },
    { label: 'Performance', valor: '76%', variacao: 8.3, icone: Zap, cor: 'orange' }
  ]);

  const [narrativas] = useState([
    { id: '1', nome: 'Biografia Interativa 3D', tipo: 'Biografia', visualizacoes: 567, engajamento: 82, status: 'Publicada' },
    { id: '2', nome: 'Propostas em AR', tipo: 'Propostas', visualizacoes: 432, engajamento: 75, status: 'Publicada' },
    { id: '3', nome: 'História da Campanha', tipo: 'Campanha', visualizacoes: 248, engajamento: 68, status: 'Teste' }
  ]);

  const dadosEngajamento = [
    { dia: 'Seg', visualizacoes: 89, tempo: 2.1 },
    { dia: 'Ter', visualizacoes: 134, tempo: 2.8 },
    { dia: 'Qua', visualizacoes: 178, tempo: 3.2 },
    { dia: 'Qui', visualizacoes: 245, tempo: 3.4 },
    { dia: 'Sex', visualizacoes: 312, tempo: 3.8 },
    { dia: 'Sáb', visualizacoes: 189, tempo: 4.2 }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">Narrativa RA</h1>
            <Badge className="bg-blue-500/20 text-blue-400">3 Narrativas Ativas</Badge>
          </div>
          <p className="text-slate-400 mt-1">Realidade Aumentada com narrativas inteligentes • 1.247 visualizações • 76% engajamento</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700"><Zap className="w-4 h-4 mr-2" />Nova Narrativa</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricas.map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-orange-500/30 bg-orange-500/5">
                <CardContent className="p-4 text-center">
                  <Icon className={`w-5 h-5 text-${m.cor}-400 mx-auto mb-2`} />
                  <div className="text-xl font-bold text-white">{m.valor}</div>
                  <div className="text-xs text-slate-400">{m.label}</div>
                  <div className={`text-xs mt-1 ${m.variacao > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    +{m.variacao}%
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Activity className="w-5 h-5 text-green-400" /><span>Engajamento por Dia</span></CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dadosEngajamento}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="dia" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="visualizacoes" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name="Visualizações" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Smartphone className="w-5 h-5 text-purple-400" /><span>Narrativas Ativas</span></CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {narrativas.map((n, i) => (
                <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/30 rounded-lg p-3 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{n.nome}</h4>
                    <Badge className={n.status === 'Publicada' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}>
                      {n.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">{n.visualizacoes}</div>
                      <div className="text-slate-400">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold">{n.engajamento}%</div>
                      <div className="text-slate-400">Engaj.</div>
                    </div>
                    <div className="text-center">
                      <Button size="sm" variant="outline" className="h-6 text-xs"><Play className="w-3 h-3" /></Button>
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

