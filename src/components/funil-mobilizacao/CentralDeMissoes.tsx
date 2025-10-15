'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, CheckCircle, Clock } from 'lucide-react';

const missoes = [
  { id: '1', titulo: 'Compartilhar Post', tipo: 'DIGITAL', pontos: 10, adesoes: 245, conclusoes: 198 },
  { id: '2', titulo: 'Participar Carreata', tipo: 'FISICA', pontos: 50, adesoes: 89, conclusoes: 67 },
  { id: '3', titulo: 'Recrutar Amigo', tipo: 'RECRUTAMENTO', pontos: 100, adesoes: 156, conclusoes: 94 }
];

export default function CentralDeMissoes({ candidateId }: { candidateId: string }) {
  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Central de Missões
          </CardTitle>
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Nova Missão
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {missoes.map(missao => (
            <Card key={missao.id} className="bg-white/5 border-white/10">
              <CardContent className="p-4">
                <h4 className="text-white font-semibold mb-2">{missao.titulo}</h4>
                <div className="flex gap-2 mb-3">
                  <Badge className="bg-blue-500">{missao.tipo}</Badge>
                  <Badge className="bg-yellow-500">{missao.pontos} pts</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-white/70">Adesões</div>
                    <div className="text-white font-bold">{missao.adesoes}</div>
                  </div>
                  <div>
                    <div className="text-white/70">Conclusões</div>
                    <div className="text-green-400 font-bold">{missao.conclusoes}</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-xs text-white/70 mb-1">Taxa Sucesso</div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(missao.conclusoes / missao.adesoes) * 100}%` }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
