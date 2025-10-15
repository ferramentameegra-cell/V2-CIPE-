'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, User, Star } from 'lucide-react';

const apoiadores = [
  { id: '1', nome: 'Ana Silva', pontos: 2450, nivel: 8, medalhas: 12, posicao: 1 },
  { id: '2', nome: 'Carlos Lima', pontos: 2180, nivel: 7, medalhas: 10, posicao: 2 },
  { id: '3', nome: 'Maria Santos', pontos: 1920, nivel: 7, medalhas: 9, posicao: 3 },
  { id: '4', nome: 'João Oliveira', pontos: 1650, nivel: 6, medalhas: 8, posicao: 4 },
  { id: '5', nome: 'Paula Costa', pontos: 1420, nivel: 6, medalhas: 7, posicao: 5 }
];

export default function LeaderboardMilitancia({ compact = false }: { compact?: boolean }) {
  const getPosicaoIcon = (pos: number) => {
    if (pos === 1) return '🥇';
    if (pos === 2) return '🥈';
    if (pos === 3) return '🥉';
    return `#${pos}`;
  };

  const dados = compact ? apoiadores.slice(0, 5) : apoiadores;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          {compact ? 'Top 5 Apoiadores' : 'Ranking de Militância'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dados.map((apoiador) => (
            <div
              key={apoiador.id}
              className={`p-3 rounded-lg border transition-all ${
                apoiador.posicao <= 3
                  ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl w-10 text-center">
                    {getPosicaoIcon(apoiador.posicao)}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {apoiador.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{apoiador.nome}</div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <span>Nível {apoiador.nivel}</span>
                      <span>•</span>
                      <span>{apoiador.medalhas} medalhas</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-bold text-xl">
                    {apoiador.pontos.toLocaleString()}
                  </div>
                  <div className="text-white/60 text-xs">pontos</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

