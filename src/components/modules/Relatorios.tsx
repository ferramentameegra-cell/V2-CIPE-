'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, TrendingUp, Calendar, Activity, Eye, Plus, Play, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Relatorios({ candidateId }: { candidateId: string }) {
  const [relatorios] = useState([
    { id: '1', nome: 'Relatório Executivo Semanal', tipo: 'EXECUTIVO', periodo: 'SEMANAL', status: 'ATIVO', automatico: true, downloads: 127, tamanho: 2.4, ultima: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { id: '2', nome: 'Performance Digital Mensal', tipo: 'DIGITAL', periodo: 'MENSAL', status: 'ATIVO', automatico: true, downloads: 89, tamanho: 5.8, ultima: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { id: '3', nome: 'Análise ROI Campanhas', tipo: 'ROI', periodo: 'MENSAL', status: 'PAUSADO', automatico: false, downloads: 45, tamanho: 3.2, ultima: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { id: '4', nome: 'Comparativo Adversários', tipo: 'ADVERSARIOS', periodo: 'SEMANAL', status: 'ATIVO', automatico: true, downloads: 203, tamanho: 4.1, ultima: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }
  ]);

  const [metricas] = useState([
    { label: 'Relatórios Ativos', valor: 3, icone: FileText, cor: 'blue' },
    { label: 'Gerados Este Mês', valor: 12, icone: Activity, cor: 'green' },
    { label: 'Downloads', valor: 464, icone: Download, cor: 'purple' },
    { label: 'Tamanho Médio', valor: '3.9 MB', icone: BarChart3, cor: 'cyan' }
  ]);

  const dadosGerados = [
    { mes: 'Jan', quantidade: 8 },
    { mes: 'Fev', quantidade: 10 },
    { mes: 'Mar', quantidade: 12 },
    { mes: 'Abr', quantidade: 14 },
    { mes: 'Mai', quantidade: 11 },
    { mes: 'Jun', quantidade: 13 }
  ];

  const formatTempo = (data: Date) => {
    const agora = new Date();
    const diff = agora.getTime() - data.getTime();
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (dias === 0) return 'Hoje';
    if (dias === 1) return 'Ontem';
    return `${dias} dias atrás`;
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Relatórios</h1>
          <p className="text-slate-400 mt-1">Sistema de relatórios automatizados • 4 relatórios ativos • 464 downloads</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Novo Relatório</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricas.map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-blue-500/30 bg-blue-500/5">
                <CardContent className="p-4 text-center">
                  <Icon className={`w-5 h-5 text-${m.cor}-400 mx-auto mb-2`} />
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
          <CardHeader><CardTitle className="flex items-center space-x-2"><BarChart3 className="w-5 h-5 text-green-400" /><span>Relatórios Gerados</span></CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dadosGerados}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="mes" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="quantidade" stroke="#10B981" strokeWidth={2} name="Quantidade" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><FileText className="w-5 h-5 text-purple-400" /><span>Relatórios Disponíveis</span></CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {relatorios.slice(0, 3).map((r, i) => (
                <motion.div key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                  <div>
                    <h4 className="font-medium text-white text-sm">{r.nome}</h4>
                    <p className="text-xs text-slate-400">{r.tipo} • {formatTempo(r.ultima)} • {r.tamanho} MB</p>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 text-xs"><Download className="w-3 h-3 mr-1" />Baixar</Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle className="flex items-center space-x-2"><FileText className="w-5 h-5 text-blue-400" /><span>Todos os Relatórios</span></CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {relatorios.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${r.status === 'ATIVO' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                  <div>
                    <h4 className="font-medium text-white">{r.nome}</h4>
                    <p className="text-sm text-slate-400">{r.tipo} • {r.periodo} • {r.automatico && 'Automático'}</p>
                    <p className="text-xs text-slate-500 mt-1">Última geração: {formatTempo(r.ultima)} • {r.tamanho} MB • {r.downloads} downloads</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={r.status === 'ATIVO' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}>{r.status}</Badge>
                  <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-1" />Download</Button>
                  <Button size="sm" variant="outline"><Play className="w-4 h-4 mr-1" />Gerar</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

