'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Zap, Plus } from 'lucide-react';

export default function CriadorCampanhaFunil({ candidateId }: { candidateId: string }) {
  const [nova, setNova] = useState({ nome: '', estagioAlvo: 'LEAD' });

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Criar Campanha de Automação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-white">Nome da Campanha</Label>
          <Input value={nova.nome} onChange={(e) => setNova({...nova, nome: e.target.value})} className="bg-white/10 border-white/20 text-white" placeholder="Ex: Boas-vindas para Leads" />
        </div>
        <div>
          <Label className="text-white">Estágio Alvo</Label>
          <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white" value={nova.estagioAlvo} onChange={(e) => setNova({...nova, estagioAlvo: e.target.value})}>
            <option value="VISITANTE">Visitante</option>
            <option value="LEAD">Lead</option>
            <option value="ENGAJADO">Engajado</option>
            <option value="APOIADOR">Apoiador</option>
          </select>
        </div>
        <Button className="w-full bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Criar Campanha
        </Button>
      </CardContent>
    </Card>
  );
}
