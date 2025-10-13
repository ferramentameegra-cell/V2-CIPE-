'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Share2, TrendingUp, Users, Heart, MessageCircle, Eye, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export default function RedesSociais({ candidateId }: { candidateId: string }) {
  const [metricas] = useState([
    { label: 'Seguidores', valor: '847K', variacao: 12.3, icone: Users, cor: 'blue', rede: 'Total' },
    { label: 'Engajamento', valor: '8.5%', variacao: 2.1, icone: Heart, cor: 'red', rede: 'Média' },
    { label: 'Alcance', valor: '3.2M', variacao: 18.7, icone: Eye, cor: 'purple', rede: 'Mensal' },
    { label: 'Crescimento', valor: '+15.2%', variacao: 5.4, icone: TrendingUp, cor: 'green', rede: 'Semana' }
  ]);

  const [redes] = useState([
    { nome: 'Instagram', seguidores: 342000, engajamento: 9.2, publicacoes: 247, alcance: 1890000, cor: '#E4405F', crescimento: 15.3 },
    { nome: 'Facebook', seguidores: 298000, engajamento: 6.8, publicacoes: 189, alcance: 890000, cor: '#1877F2', crescimento: 8.7 },
    { nome: 'Twitter/X', seguidores: 156000, engajamento: 11.4, publicacoes: 456, alcance: 320000, cor: '#000000', crescimento: 12.1 },
    { nome: 'TikTok', seguidores: 51000, engajamento: 15.6, publicacoes: 67, alcance: 280000, cor: '#000000', crescimento: 34.2 }
  ]);

  const dadosEngajamento = [
    { dia: 'Seg', instagram: 8.5, facebook: 6.2, twitter: 10.8, tiktok: 14.2 },
    { dia: 'Ter', instagram: 9.1, facebook: 6.8, twitter: 11.2, tiktok: 15.1 },
    { dia: 'Qua', instagram: 9.8, facebook: 7.1, twitter: 11.8, tiktok: 16.3 },
    { dia: 'Qui', instagram: 10.2, facebook: 7.5, twitter: 12.4, tiktok: 17.1 },
    { dia: 'Sex', instagram: 9.5, facebook: 6.9, twitter: 11.5, tiktok: 15.8 },
    { dia: 'Sáb', instagram: 8.9, facebook: 6.4, twitter: 10.9, tiktok: 14.5 }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Redes Sociais</h1>
          <p className="text-slate-400 mt-1">Gestão de presença digital • 847K seguidores • 3.2M alcance mensal</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700"><Share2 className="w-4 h-4 mr-2" />Nova Publicação</Button>
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
                  {m.variacao && <div className="text-xs text-green-400 mt-1">+{m.variacao}%</div>}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><BarChart3 className="w-5 h-5 text-green-400" /><span>Engajamento por Rede</span></CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosEngajamento}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="dia" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="instagram" stroke="#E4405F" strokeWidth={2} name="Instagram" />
                <Line type="monotone" dataKey="facebook" stroke="#1877F2" strokeWidth={2} name="Facebook" />
                <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} name="Twitter" />
                <Line type="monotone" dataKey="tiktok" stroke="#000000" strokeWidth={2} name="TikTok" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Share2 className="w-5 h-5 text-purple-400" /><span>Performance por Rede</span></CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {redes.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: r.cor }} />
                      <h4 className="font-medium text-white">{r.nome}</h4>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300">+{r.crescimento}%</Badge>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div><div className="text-slate-400">Seguidores</div><div className="text-blue-400 font-medium">{(r.seguidores / 1000).toFixed(0)}K</div></div>
                    <div><div className="text-slate-400">Engajamento</div><div className="text-purple-400 font-medium">{r.engajamento}%</div></div>
                    <div><div className="text-slate-400">Posts</div><div className="text-green-400 font-medium">{r.publicacoes}</div></div>
                    <div><div className="text-slate-400">Alcance</div><div className="text-cyan-400 font-medium">{(r.alcance / 1000).toFixed(0)}K</div></div>
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

