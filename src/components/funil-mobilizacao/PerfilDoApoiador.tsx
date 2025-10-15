'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { User, Award, Target } from 'lucide-react';

export default function PerfilDoApoiador({ apoiadorId }: { apoiadorId: string }) {
  const apoiador = {
    nome: 'Ana Silva',
    estagio: 'APOIADOR',
    nivel: 8,
    pontos: 2450,
    pontosProximoNivel: 3000,
    medalhas: 12,
    missoesCompletas: 34,
    recrutamentos: 2
  };

  const xpAtual = apoiador.pontos;
  const xpNecessario = apoiador.pontosProximoNivel;
  const porcentagem = (xpAtual / xpNecessario) * 100;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="w-5 h-5" />
          Perfil do Apoiador
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            {apoiador.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">{apoiador.nome}</h3>
            <Badge className="bg-purple-500">Nível {apoiador.nivel}</Badge>
            <Badge className="ml-2 bg-green-500">{apoiador.estagio}</Badge>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white/70">Progresso para Nível {apoiador.nivel + 1}</span>
            <span className="text-white">{apoiador.pontos} / {apoiador.pontosProximoNivel} XP</span>
          </div>
          <Progress value={porcentagem} className="h-3" />
        </div>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-white/5 rounded-lg">
            <Award className="w-5 h-5 mx-auto mb-1 text-yellow-400" />
            <div className="text-2xl font-bold text-white">{apoiador.medalhas}</div>
            <div className="text-xs text-white/70">Medalhas</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <Target className="w-5 h-5 mx-auto mb-1 text-green-400" />
            <div className="text-2xl font-bold text-white">{apoiador.missoesCompletas}</div>
            <div className="text-xs text-white/70">Missões</div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg">
            <User className="w-5 h-5 mx-auto mb-1 text-blue-400" />
            <div className="text-2xl font-bold text-white">{apoiador.recrutamentos}</div>
            <div className="text-xs text-white/70">Recrutas</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
