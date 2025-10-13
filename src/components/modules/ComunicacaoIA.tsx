'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, TrendingUp, Users, Target, Clock, Mail, Smartphone, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function ComunicacaoIA({ candidateId }: { candidateId: string }) {
  const [metricas] = useState([
    { label: 'Mensagens Geradas', valor: '8.934', variacao: 22.3, icone: MessageSquare, cor: 'blue' },
    { label: 'Taxa de Entrega', valor: '96.2%', variacao: 3.1, icone: Target, cor: 'green' },
    { label: 'Taxa de Abertura', valor: '68.5%', variacao: 8.7, icone: Mail, cor: 'purple' },
    { label: 'Taxa de Resposta', valor: '34.2%', variacao: 12.4, icone: Users, cor: 'yellow' },
    { label: 'Tempo Médio', valor: '2.1s', variacao: -15.8, icone: Clock, cor: 'cyan' },
    { label: 'ROI Médio', valor: '340%', variacao: 18.5, icone: TrendingUp, cor: 'emerald' }
  ]);

  const [campanhas] = useState([
    { id: '1', nome: 'WhatsApp Educação', tipo: 'WhatsApp', enviadas: 4500, entregues: 4387, abertas: 3245, respostas: 1567, roi: 420, status: 'Ativa' },
    { id: '2', nome: 'Email Propostas', tipo: 'Email', enviadas: 12000, entregues: 11520, abertas: 7680, respostas: 2304, roi: 280, status: 'Concluída' },
    { id: '3', nome: 'SMS Lembrete Evento', tipo: 'SMS', enviadas: 3200, entregues: 3136, abertas: 2816, respostas: 1248, roi: 350, status: 'Ativa' }
  ]);

  const dadosCanais = [
    { canal: 'WhatsApp', valor: 45, cor: '#25D366' },
    { canal: 'Email', valor: 30, cor: '#EA4335' },
    { canal: 'SMS', valor: 15, cor: '#FF6B35' },
    { canal: 'Instagram', valor: 10, cor: '#E4405F' }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">Comunicação IA</h1>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium">Gerando Mensagens</span>
            </div>
          </div>
          <p className="text-slate-400 mt-1">IA para comunicação em massa personalizada • 8.934 mensagens geradas • 91% performance</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700"><Send className="w-4 h-4 mr-2" />Nova Campanha</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricas.map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-purple-500/30 bg-purple-500/5">
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
          <CardHeader><CardTitle className="flex items-center space-x-2"><MessageSquare className="w-5 h-5 text-blue-400" /><span>Distribuição por Canal</span></CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={dadosCanais} cx="50%" cy="50%" outerRadius={100} dataKey="valor" label={({ canal, valor }) => `${canal} (${valor}%)`}>
                  {dadosCanais.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.cor} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Send className="w-5 h-5 text-purple-400" /><span>Campanhas Ativas</span></CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {campanhas.map((c, i) => (
                <motion.div key={c.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/30 rounded-lg p-3 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white text-sm">{c.nome}</h4>
                    <Badge className={c.status === 'Ativa' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}>
                      {c.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">{c.enviadas}</div>
                      <div className="text-slate-400">Enviadas</div>
                    </div>
                    <div className="text-center">
                      <div className="text-green-400 font-bold">{((c.entregues / c.enviadas) * 100).toFixed(0)}%</div>
                      <div className="text-slate-400">Entrega</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-400 font-bold">{((c.abertas / c.entregues) * 100).toFixed(0)}%</div>
                      <div className="text-slate-400">Abertura</div>
                    </div>
                    <div className="text-center">
                      <div className="text-emerald-400 font-bold">{c.roi}%</div>
                      <div className="text-slate-400">ROI</div>
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

