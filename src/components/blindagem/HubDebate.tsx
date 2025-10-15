'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Sword, FileDown } from 'lucide-react';

export default function HubDebate({ candidateId }: { candidateId: string }) {
  const debate = {
    nome: 'Debate da Globo - 1º Turno',
    data: '25/10/2025',
    oponentes: [
      { nome: 'João Silva', estilo: 'Agressivo', pontosFracos: ['Economia fraca', 'Pouca experiência'] },
      { nome: 'Maria Santos', estilo: 'Técnico', pontosFracos: ['Impopular em periferias', 'Histórico de corrupção'] }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header do Debate */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">{debate.nome}</div>
              <div className="text-white/60">Data: {debate.data}</div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <FileDown className="w-4 h-4 mr-2" />
              Gerar PDF para Impressão
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Análise dos Oponentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {debate.oponentes.map((op, idx) => (
          <Card key={idx} className="glass-card">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-400" />
                {op.nome}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-xs text-white/70 mb-1">Estilo de Argumentação</div>
                <Badge className="bg-orange-500">{op.estilo}</Badge>
              </div>
              <div>
                <div className="text-xs text-white/70 mb-2">Pontos Fracos (Atacar)</div>
                <div className="space-y-2">
                  {op.pontosFracos.map((pf, i) => (
                    <div key={i} className="p-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-white">
                      <Sword className="w-3 h-3 inline mr-2 text-red-400" />
                      {pf}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estratégia */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Sword className="w-5 h-5 text-red-400" />
              Estratégia de Ataque
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-white/80">
              <div>• Explorar histórico de corrupção da oponente</div>
              <div>• Questionar falta de experiência executiva</div>
              <div>• Apresentar dados concretos sobre economia</div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              Estratégia de Defesa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-white/80">
              <div>• Usar argumento ADI #12 para educação</div>
              <div>• Reforçar experiência administrativa</div>
              <div>• Apresentar propostas objetivas para saúde</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
