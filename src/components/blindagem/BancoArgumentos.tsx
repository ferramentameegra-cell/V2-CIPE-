'use client';
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Play, FileText } from 'lucide-react';

const argumentos = [
  { id: '1', pergunta: 'Como financiar educação?', tema: 'Educação', status: 'APROVADO', forca: 85 },
  { id: '2', pergunta: 'Plano para segurança pública?', tema: 'Segurança', status: 'APROVADO', forca: 92 },
  { id: '3', pergunta: 'Reforma tributária - detalhes?', tema: 'Economia', status: 'EM_REVISAO', forca: 45 }
];

export default function BancoArgumentos({ candidateId }: { candidateId: string }) {
  const [busca, setBusca] = useState('');
  const [selecionado, setSelecionado] = useState<any>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lista */}
      <div className="lg:col-span-1">
        <Card className="glass-card">
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <Input placeholder="Buscar argumento..." className="pl-10 bg-white/10 border-white/20 text-white" value={busca} onChange={(e) => setBusca(e.target.value)} />
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Argumento
            </Button>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {argumentos.filter(a => a.pergunta.toLowerCase().includes(busca.toLowerCase())).map(arg => (
                <div key={arg.id} className={`p-3 rounded-lg cursor-pointer border ${selecionado?.id === arg.id ? 'bg-blue-500/20 border-blue-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`} onClick={() => setSelecionado(arg)}>
                  <div className="text-white text-sm font-semibold mb-1">{arg.pergunta}</div>
                  <div className="flex items-center gap-2">
                    <Badge className="text-xs bg-purple-500">{arg.tema}</Badge>
                    <Badge className={`text-xs ${arg.status === 'APROVADO' ? 'bg-green-500' : 'bg-yellow-500'}`}>{arg.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detalhes */}
      <div className="lg:col-span-2">
        <Card className="glass-card">
          <CardContent className="p-6">
            {!selecionado ? (
              <div className="h-96 flex items-center justify-center text-white/50">
                Selecione um argumento para visualizar
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="text-2xl font-bold text-white mb-2">{selecionado.pergunta}</div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-purple-500">{selecionado.tema}</Badge>
                    <Badge className={selecionado.status === 'APROVADO' ? 'bg-green-500' : 'bg-yellow-500'}>{selecionado.status}</Badge>
                    <Badge className={`${selecionado.forca >= 70 ? 'bg-green-500' : selecionado.forca >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}>Força: {selecionado.forca}%</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-white/70 font-semibold mb-2">Resposta Oficial (Curta):</div>
                  <div className="p-3 bg-white/5 rounded-lg text-white text-sm">Vamos implementar um modelo de parceria público-privada focado em eficiência, priorizando a educação básica com metas claras de alfabetização.</div>
                </div>
                <div>
                  <div className="text-sm text-white/70 font-semibold mb-2">Dados de Suporte:</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <div className="text-xs text-white/60">Taxa de Alfabetização</div>
                      <div className="text-2xl font-bold text-blue-400">87%</div>
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="text-xs text-white/60">Investimento Proposto</div>
                      <div className="text-2xl font-bold text-green-400">R$ 2B</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Treinar com Este Argumento
                  </Button>
                  <Button variant="outline" className="border-white/20">
                    <FileText className="w-4 h-4 mr-2" />
                    Editar
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
