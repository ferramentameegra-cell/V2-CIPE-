'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, Eye, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function Notificacoes({ candidateId }: { candidateId: string }) {
  const [notificacoes] = useState([
    { id: '1', titulo: 'Nova menção nas redes sociais', tipo: 'INFO', lida: false, tempo: '5min atrás', descricao: 'Você foi mencionado 247 vezes no Twitter' },
    { id: '2', titulo: 'Alerta de orçamento', tipo: 'ALERTA', lida: false, tempo: '1h atrás', descricao: 'Marketing Digital atingiu 82% do orçamento' },
    { id: '3', titulo: 'Evento confirmado', tipo: 'SUCESSO', lida: true, tempo: '3h atrás', descricao: 'Debate TV Globo confirmado para 10/10' },
    { id: '4', titulo: 'Relatório gerado', tipo: 'INFO', lida: true, tempo: '5h atrás', descricao: 'Relatório Executivo Semanal disponível' }
  ]);

  const getIcone = (tipo: string) => {
    switch (tipo) {
      case 'ALERTA': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'SUCESSO': return <CheckCircle className="w-5 h-5 text-green-400" />;
      default: return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getCor = (tipo: string) => {
    switch (tipo) {
      case 'ALERTA': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'SUCESSO': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Notificações</h1>
          <p className="text-slate-400 mt-1">Central de notificações • {notificacoes.filter(n => !n.lida).length} não lidas</p>
        </div>
        <Button variant="outline">Marcar Todas como Lidas</Button>
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle className="flex items-center space-x-2"><Bell className="w-5 h-5 text-blue-400" /><span>Todas as Notificações</span></CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notificacoes.map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-lg border ${n.lida ? 'bg-slate-800/20 border-slate-700' : 'bg-slate-800/50 border-slate-600'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getIcone(n.tipo)}
                    <div>
                      <h4 className="font-medium text-white">{n.titulo}</h4>
                      <p className="text-sm text-slate-300 mt-1">{n.descricao}</p>
                      <p className="text-xs text-slate-500 mt-2">{n.tempo}</p>
                    </div>
                  </div>
                  <Badge className={getCor(n.tipo)}>{n.tipo}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

