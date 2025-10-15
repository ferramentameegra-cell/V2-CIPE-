'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, AlertTriangle, User, Radio } from 'lucide-react';

export default function RedeDeteccaoBots() {
  const nos = [
    { id: 1, nome: '@fonte_original', tipo: 'origem', eBot: false, alcance: 5000 },
    { id: 2, nome: '@bot_1', tipo: 'bot', eBot: true, alcance: 15000 },
    { id: 3, nome: '@bot_2', tipo: 'bot', eBot: true, alcance: 12000 },
    { id: 4, nome: '@influencer_real', tipo: 'influenciador', eBot: false, alcance: 50000 },
    { id: 5, nome: '@usuario_normal', tipo: 'usuario', eBot: false, alcance: 500 }
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Rede de Disseminação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-blue-400" />
              <span className="text-white">Análise de Propagação</span>
            </div>
            <Badge className="bg-red-500/20 text-red-400">
              {nos.filter(n => n.eBot).length} bots detectados
            </Badge>
          </div>

          <div className="space-y-2">
            {nos.map((no, index) => (
              <div
                key={no.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  no.eBot
                    ? 'bg-red-500/10 border-red-500/30 animate-pulse'
                    : no.tipo === 'influenciador'
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-white/5 border-white/10'
                }`}
                style={{ marginLeft: `${index * 8}px` }}
              >
                <div className="flex items-center gap-3">
                  {no.eBot ? (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  ) : (
                    <User className="w-5 h-5 text-blue-400" />
                  )}
                  <div>
                    <div className="text-white font-medium">{no.nome}</div>
                    <div className="text-xs text-white/60">
                      {no.tipo} • Alcance: {no.alcance.toLocaleString()}
                    </div>
                  </div>
                </div>
                {no.eBot && (
                  <Badge className="bg-red-500">BOT</Badge>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="text-yellow-400 font-semibold mb-1">⚠️ Padrão Suspeito Detectado</div>
            <div className="text-xs text-white/80">
              {nos.filter(n => n.eBot).length} contas com padrão de bot detectadas.
              Conteúdo similar propagado em curto período de tempo.
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

