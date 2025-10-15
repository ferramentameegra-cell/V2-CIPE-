'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Copy, Download } from 'lucide-react';

export default function GeradorTalkingPoints({ candidateId }: { candidateId: string }) {
  const [gerado, setGerado] = useState<any>(null);

  const gerar = () => {
    setGerado({
      tema: 'Educação',
      publico: 'Jovens (18-25 anos)',
      formato: 'Post Instagram',
      talkingPoints: [
        '📚 Vamos transformar a educação com tecnologia',
        '💡 Parceria com empresas de tech para formação profissional',
        '🎓 Bolsas para cursos de programação e inovação',
        '🚀 Preparar nossa juventude para o futuro digital'
      ]
    });
  };

  return (
    <Card className="glass-card">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuração */}
          <div className="space-y-4">
            <div>
              <label className="text-white text-sm mb-2 block">Tema Base</label>
              <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white">
                <option>Educação</option>
                <option>Saúde</option>
                <option>Economia</option>
              </select>
            </div>
            <div>
              <label className="text-white text-sm mb-2 block">Público-Alvo</label>
              <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white">
                <option>Jovens (18-25 anos)</option>
                <option>Idosos (60+ anos)</option>
                <option>Empresários</option>
              </select>
            </div>
            <div>
              <label className="text-white text-sm mb-2 block">Formato</label>
              <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white">
                <option>Post Instagram</option>
                <option>Tweet</option>
                <option>Entrevista de Rádio</option>
              </select>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={gerar}>
              <Zap className="w-4 h-4 mr-2" />
              Gerar com IA
            </Button>
          </div>

          {/* Resultado */}
          <div>
            {!gerado ? (
              <div className="h-full flex items-center justify-center text-white/50 text-center">
                Configure e clique em "Gerar com IA"
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-purple-500">{gerado.tema}</Badge>
                  <Badge className="bg-blue-500">{gerado.publico}</Badge>
                  <Badge className="bg-green-500">{gerado.formato}</Badge>
                </div>
                <div className="space-y-2">
                  {gerado.talkingPoints.map((tp: string, idx: number) => (
                    <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-lg">
                      <div className="text-white text-sm">{tp}</div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                  <Button variant="outline" className="border-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
