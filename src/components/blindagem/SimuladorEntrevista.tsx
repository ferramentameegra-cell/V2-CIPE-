'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Mic, Video, Timer, BarChart3 } from 'lucide-react';

export default function SimuladorEntrevista({ candidateId }: { candidateId: string }) {
  const [simulando, setSimulando] = useState(false);
  const [config, setConfig] = useState({ tipo: 'ENTREVISTA', perfil: 'neutro', temas: ['economia'] });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuração */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white text-sm">Configurar Simulação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-white text-xs mb-2 block">Tipo</label>
            <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm">
              <option>Entrevista 1x1</option>
              <option>Debate 1xN</option>
              <option>Coletiva de Imprensa</option>
            </select>
          </div>
          <div>
            <label className="text-white text-xs mb-2 block">Perfil do Oponente IA</label>
            <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white text-sm">
              <option value="neutro">Neutro</option>
              <option value="agressivo">Agressivo</option>
              <option value="tecnico">Técnico</option>
              <option value="incisivo">Incisivo</option>
              <option value="amigavel">Amigável</option>
            </select>
          </div>
          <div>
            <label className="text-white text-xs mb-2 block">Temas</label>
            <div className="flex flex-wrap gap-2">
              {['Economia', 'Saúde', 'Educação', 'Segurança'].map(tema => (
                <Badge key={tema} className="bg-blue-500 cursor-pointer hover:bg-blue-600">{tema}</Badge>
              ))}
            </div>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setSimulando(true)}>
            <Play className="w-4 h-4 mr-2" />
            Iniciar Simulação
          </Button>
        </CardContent>
      </Card>

      {/* Arena de Simulação */}
      <div className="lg:col-span-2">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Arena de Treinamento</CardTitle>
              {simulando && (
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-white font-mono">05:42</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {!simulando ? (
              <div className="h-80 flex flex-col items-center justify-center text-center">
                <Video className="w-16 h-16 text-white/30 mb-4" />
                <div className="text-white/70">Configure e inicie uma simulação</div>
                <div className="text-white/50 text-sm mt-2">A câmera e microfone serão ativados</div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Mic className="w-12 h-12 text-red-500 animate-pulse mx-auto mb-2" />
                    <div className="text-white">Gravando...</div>
                  </div>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-xs text-white/60 mb-2">IA - Jornalista:</div>
                  <div className="text-white text-sm">
                    "Como o senhor pretende financiar as propostas de educação sem aumentar a carga tributária?"
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => setSimulando(false)}>
                    Encerrar e Analisar
                  </Button>
                  <Button variant="outline" className="border-white/20">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Ver Métricas
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
