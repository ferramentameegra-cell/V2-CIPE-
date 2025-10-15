'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Zap, Plus, Play, Edit, Copy, Trash2 } from 'lucide-react';

interface Playbook {
  id: string;
  nome: string;
  descricao: string;
  vezesUtilizado: number;
  taxaSucesso: number;
  acoes: string[];
}

export default function GestaoPlaybook({ candidateId }: { candidateId: string }) {
  const [playbooks] = useState<Playbook[]>([
    {
      id: '1',
      nome: 'Resposta Rápida - Fake News',
      descricao: 'Playbook para resposta imediata a desinformação',
      vezesUtilizado: 15,
      taxaSucesso: 0.87,
      acoes: ['Notificar equipe', 'Gerar comunicado', 'Publicar resposta', 'Monitorar impacto']
    },
    {
      id: '2',
      nome: 'Ataque Coordenado',
      descricao: 'Resposta a ataques orquestrados',
      vezesUtilizado: 8,
      taxaSucesso: 0.92,
      acoes: ['Escalonar para Sala de Guerra', 'Mobilizar base', 'Contra-narrativa', 'Alerta jurídico']
    }
  ]);

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Biblioteca de Playbooks
          </CardTitle>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Playbook
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playbooks.map(playbook => (
            <Card key={playbook.id} className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <h4 className="font-semibold text-white mb-2">{playbook.nome}</h4>
                <p className="text-xs text-white/60 mb-3">{playbook.descricao}</p>
                
                <div className="space-y-2 mb-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">Utilizado:</span>
                    <span className="text-white">{playbook.vezesUtilizado}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Taxa de Sucesso:</span>
                    <span className="text-green-400">{(playbook.taxaSucesso * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-xs text-white/70 mb-1">Ações:</div>
                  <div className="space-y-1">
                    {playbook.acoes.slice(0, 3).map((acao, i) => (
                      <div key={i} className="text-xs text-white/80">• {acao}</div>
                    ))}
                    {playbook.acoes.length > 3 && (
                      <div className="text-xs text-white/50">+ {playbook.acoes.length - 3} ações</div>
                    )}
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Play className="w-3 h-3 mr-1" />
                    Executar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

