'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, AlertTriangle, Eye, TrendingUp, Clock, Target, Zap, CheckCircle, XCircle, Settings } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function BlindagemIA({ candidateId }: { candidateId: string }) {
  const [status] = useState<'ATIVA' | 'PAUSADA'>('ATIVA');
  const [metricas] = useState([
    { label: 'Detecções Hoje', valor: '247', variacao: 15.3, icone: Eye, cor: 'blue' },
    { label: 'Ameaças Bloqueadas', valor: '89', variacao: 23.1, icone: Shield, cor: 'green' },
    { label: 'Fake News Detectadas', valor: '34', variacao: -12.5, icone: AlertTriangle, cor: 'red' },
    { label: 'Taxa de Precisão', valor: '97%', variacao: 2.3, icone: Target, cor: 'purple' },
    { label: 'Tempo de Resposta', valor: '0.3s', variacao: -8.7, icone: Clock, cor: 'cyan' },
    { label: 'Ações Tomadas', valor: '156', variacao: 18.9, icone: Zap, cor: 'orange' }
  ]);

  const [deteccoes] = useState([
    { id: '1', tipo: 'Fake News', conteudo: 'Notícia falsa sobre proposta X circulando no Twitter', fonte: 'Twitter', risco: 0.89, acao: 'Desmentido publicado', status: 'Neutralizada', tempo: '5min atrás' },
    { id: '2', tipo: 'Ataque Pessoal', conteudo: 'Comentários coordenados negativos no Instagram', fonte: 'Instagram', risco: 0.72, acao: 'Monitorando', status: 'Em Análise', tempo: '12min atrás' },
    { id: '3', tipo: 'Desinformação', conteudo: 'Vídeo editado com contexto incorreto', fonte: 'WhatsApp', risco: 0.95, acao: 'Alerta emitido', status: 'Neutralizada', tempo: '28min atrás' }
  ]);

  const dadosDeteccoes = [
    { hora: '00:00', total: 12, bloqueadas: 11 },
    { hora: '04:00', total: 8, bloqueadas: 7 },
    { hora: '08:00', total: 45, bloqueadas: 42 },
    { hora: '12:00', total: 67, bloqueadas: 63 },
    { hora: '16:00', total: 52, bloqueadas: 49 },
    { hora: '20:00', total: 38, bloqueadas: 36 }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">Blindagem IA</h1>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${status === 'ATIVA' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
              <span className="text-green-400 font-medium">{status === 'ATIVA' ? 'Protegendo 24/7' : 'Pausada'}</span>
            </div>
          </div>
          <p className="text-slate-400 mt-1">Proteção automatizada contra ataques • 15.642 detecções • 97% precisão</p>
        </div>
        <Button variant="outline"><Settings className="w-4 h-4 mr-2" />Configurar</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metricas.map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-green-500/30 bg-green-500/5">
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
          <CardHeader><CardTitle className="flex items-center space-x-2"><Shield className="w-5 h-5 text-green-400" /><span>Detecções em Tempo Real</span></CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={dadosDeteccoes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hora" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="total" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} name="Total" />
                <Area type="monotone" dataKey="bloqueadas" stroke="#10B981" fill="#10B981" fillOpacity={0.6} name="Bloqueadas" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><AlertTriangle className="w-5 h-5 text-yellow-400" /><span>Detecções Recentes</span></CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deteccoes.map((d, i) => (
                <motion.div key={d.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/30 rounded-lg p-3 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={d.tipo === 'Fake News' ? 'bg-red-500/20 text-red-400' : d.tipo === 'Ataque Pessoal' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}>
                      {d.tipo}
                    </Badge>
                    <span className="text-xs text-slate-400">{d.tempo}</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-2">{d.conteudo}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{d.fonte} • Risco: {(d.risco * 100).toFixed(0)}%</span>
                    <Badge className={d.status === 'Neutralizada' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}>
                      {d.status}
                    </Badge>
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

