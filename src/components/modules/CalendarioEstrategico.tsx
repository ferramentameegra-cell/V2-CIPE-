'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, DollarSign, Clock, MapPin, Plus, Eye } from 'lucide-react';

export default function CalendarioEstrategico({ candidateId }: { candidateId: string }) {
  const [eventos] = useState([
    { id: '1', titulo: 'Debate TV Globo', tipo: 'DEBATE', data: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), local: 'Estúdios Globo, RJ', prioridade: 'CRITICA', status: 'CONFIRMADO', participantes: 6, orcamento: 50000 },
    { id: '2', titulo: 'Comício Centro SP', tipo: 'COMICIO', data: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), local: 'Praça da Sé', prioridade: 'ALTA', status: 'AGENDADO', participantes: 15000, orcamento: 180000 },
    { id: '3', titulo: 'Entrevista Roda Viva', tipo: 'ENTREVISTA', data: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), local: 'TV Cultura, SP', prioridade: 'ALTA', status: 'CONFIRMADO', participantes: 1, orcamento: 25000 },
    { id: '4', titulo: 'Reunião FIESP', tipo: 'REUNIAO', data: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), local: 'FIESP, SP', prioridade: 'MEDIA', status: 'AGENDADO', participantes: 200, orcamento: 75000 },
    { id: '5', titulo: 'Live Instagram', tipo: 'LIVE', data: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), local: 'Online', prioridade: 'MEDIA', status: 'CONFIRMADO', participantes: 5000, orcamento: 5000 }
  ]);

  const [metricas] = useState([
    { label: 'Eventos Este Mês', valor: 28, icone: Calendar, cor: 'blue' },
    { label: 'Próximos 7 Dias', valor: 5, icone: Clock, cor: 'green' },
    { label: 'Participantes', valor: '23.2K', icone: Users, cor: 'purple' },
    { label: 'Orçamento Eventos', valor: 'R$ 335K', icone: DollarSign, cor: 'yellow' }
  ]);

  const formatData = (data: Date) => data.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  
  const formatTempo = (data: Date) => {
    const dias = Math.ceil((data.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (dias === 0) return 'Hoje';
    if (dias === 1) return 'Amanhã';
    return `Em ${dias} dias`;
  };

  const formatMoeda = (valor: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(valor);

  const getPrioridadeColor = (p: string) => {
    switch (p) {
      case 'CRITICA': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'ALTA': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'MEDIA': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-green-500/20 text-green-300 border-green-500/30';
    }
  };

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Calendário Estratégico</h1>
          <p className="text-slate-400 mt-1">Planejamento de eventos • 28 eventos este mês • 5 nos próximos 7 dias</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700"><Plus className="w-4 h-4 mr-2" />Novo Evento</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricas.map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-cyan-500/30 bg-cyan-500/5">
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

      <Card className="glass-card">
        <CardHeader><CardTitle className="flex items-center space-x-2"><Calendar className="w-5 h-5 text-cyan-400" /><span>Próximos Eventos</span></CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {eventos.map((ev, i) => (
              <motion.div key={ev.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    ev.prioridade === 'CRITICA' ? 'bg-red-500' :
                    ev.prioridade === 'ALTA' ? 'bg-orange-500' :
                    ev.prioridade === 'MEDIA' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div>
                    <h4 className="font-medium text-white">{ev.titulo}</h4>
                    <p className="text-sm text-slate-400">{ev.tipo} • {formatData(ev.data)}</p>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" />{ev.local}</span>
                      <span className="flex items-center"><Users className="w-3 h-3 mr-1" />{ev.participantes.toLocaleString()}</span>
                      <span className="flex items-center"><DollarSign className="w-3 h-3 mr-1" />{formatMoeda(ev.orcamento)}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={getPrioridadeColor(ev.prioridade)}>{ev.prioridade}</Badge>
                  <div className="text-xs text-slate-400 mt-1">{formatTempo(ev.data)}</div>
                  <Badge className={ev.status === 'CONFIRMADO' ? 'bg-green-500/20 text-green-300 mt-1' : 'bg-yellow-500/20 text-yellow-300 mt-1'}>
                    {ev.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

