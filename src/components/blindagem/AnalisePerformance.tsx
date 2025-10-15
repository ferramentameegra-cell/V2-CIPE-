'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Video, TrendingUp, TrendingDown } from 'lucide-react';

export default function AnalisePerformance({ candidateId }: { candidateId: string }) {
  const [analisando, setAnalisando] = useState(false);
  const [resultado, setResultado] = useState<any>(null);

  const simularAnalise = () => {
    setAnalisando(true);
    setTimeout(() => {
      setResultado({
        titulo: 'Entrevista CNN - 15/10/2025',
        scoreGeral: 78,
        metricas: [
          { label: 'Consistência', valor: 82, status: 'alta' },
          { label: 'Clareza Oratória', valor: 75, status: 'media' },
          { label: 'Contato Visual', valor: 62, status: 'baixa' },
          { label: 'Palavras-Muleta', valor: 12, status: 'media' }
        ],
        feedback: 'Desempenho sólido. Principais melhorias: reduzir uso de "né" e aumentar contato visual.'
      });
      setAnalisando(false);
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Upload */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white text-sm">Upload de Mídia</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center cursor-pointer hover:border-white/40 transition-colors">
            <Upload className="w-8 h-8 text-white/50 mx-auto mb-2" />
            <div className="text-white/70 text-sm">Arraste um vídeo/áudio</div>
            <div className="text-white/50 text-xs mt-1">ou clique para selecionar</div>
          </div>
          <div className="text-xs text-white/60">Ou cole URL do YouTube:</div>
          <input type="text" placeholder="https://youtube.com/..." className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm" />
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={simularAnalise} disabled={analisando}>
            {analisando ? 'Analisando...' : 'Analisar com IA'}
          </Button>
        </CardContent>
      </Card>

      {/* Resultado */}
      <div className="lg:col-span-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Video className="w-5 h-5" />
              Resultado da Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!resultado ? (
              <div className="h-96 flex items-center justify-center text-white/50">
                {analisando ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <div>Analisando performance...</div>
                  </div>
                ) : (
                  'Faça upload de uma mídia para análise'
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-white">{resultado.titulo}</div>
                  </div>
                  <Badge className={`text-2xl px-4 py-2 ${resultado.scoreGeral >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {resultado.scoreGeral}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {resultado.metricas.map((m: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white/5 rounded-lg text-center">
                      <div className={`text-2xl font-bold ${m.status === 'alta' ? 'text-green-400' : m.status === 'media' ? 'text-yellow-400' : 'text-red-400'}`}>
                        {m.valor}{m.label.includes('Palavras') ? '' : '%'}
                      </div>
                      <div className="text-xs text-white/70 mt-1">{m.label}</div>
                      {m.status === 'alta' ? <TrendingUp className="w-3 h-3 mx-auto mt-1 text-green-400" /> : <TrendingDown className="w-3 h-3 mx-auto mt-1 text-red-400" />}
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="text-xs text-white/70 mb-2">Feedback da IA:</div>
                  <div className="text-white text-sm">{resultado.feedback}</div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
