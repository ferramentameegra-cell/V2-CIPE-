'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Clock, Users, Share, CheckCircle, MessageSquare } from 'lucide-react';

interface Alerta {
  id: string;
  titulo: string;
  descricao: string;
  nivelAmeaca: string;
  status: string;
  indiceImpacto: number;
  sentimento: number;
  fonteOriginal: string;
  mencoes: number;
  tarefas: Array<{id: string; descricao: string; status: string; responsavel: string}>;
}

export default function PainelAlerta({ alertaId }: { alertaId: string }) {
  const [alerta] = useState<Alerta>({
    id: alertaId,
    titulo: 'Fake News sobre Corrupção',
    descricao: 'Desinformação viral sobre suposto esquema de corrupção',
    nivelAmeaca: 'CRITICO',
    status: 'EM_RESPOSTA',
    indiceImpacto: 85,
    sentimento: -0.9,
    fonteOriginal: 'Twitter - @usuario_suspeito',
    mencoes: 2547,
    tarefas: [
      { id: '1', descricao: 'Analisar origem da desinformação', status: 'CONCLUIDA', responsavel: 'Ana Silva' },
      { id: '2', descricao: 'Preparar comunicado oficial', status: 'EM_ANDAMENTO', responsavel: 'Carlos Lima' },
      { id: '3', descricao: 'Acionar assessoria jurídica', status: 'PENDENTE', responsavel: 'Maria Santos' }
    ]
  });

  return (
    <div className="space-y-6">
      <Card className="glass-card border-red-500/40 animate-pulse">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              {alerta.titulo}
            </CardTitle>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/40 text-lg px-4 py-2">
              {alerta.nivelAmeaca}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-white/80 mb-4">{alerta.descricao}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-white/70">Índice de Impacto</div>
              <div className="text-2xl font-bold text-red-400">{alerta.indiceImpacto}/100</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-white/70">Sentimento</div>
              <div className="text-2xl font-bold text-red-400">{(alerta.sentimento * 100).toFixed(0)}%</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-white/70">Menções</div>
              <div className="text-2xl font-bold text-white">{alerta.mencoes.toLocaleString()}</div>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="text-xs text-white/70">Status</div>
              <Badge className="bg-orange-500/20 text-orange-400 mt-1">{alerta.status}</Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="bg-red-600 hover:bg-red-700">
              <Share className="w-4 h-4 mr-2" />
              Escalonar para Sala de Guerra
            </Button>
            <Button variant="outline">
              <MessageSquare className="w-4 h-4 mr-2" />
              Gerar Resposta (IA)
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">Tarefas de Mitigação</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerta.tarefas.map(tarefa => (
              <div key={tarefa.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-5 h-5 ${
                    tarefa.status === 'CONCLUIDA' ? 'text-green-400' :
                    tarefa.status === 'EM_ANDAMENTO' ? 'text-yellow-400' : 'text-slate-400'
                  }`} />
                  <div>
                    <div className={`text-white ${tarefa.status === 'CONCLUIDA' ? 'line-through opacity-50' : ''}`}>
                      {tarefa.descricao}
                    </div>
                    <div className="text-xs text-white/60">Responsável: {tarefa.responsavel}</div>
                  </div>
                </div>
                <Badge variant="outline">{tarefa.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

