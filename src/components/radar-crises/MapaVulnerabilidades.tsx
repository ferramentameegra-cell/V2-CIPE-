'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Shield, Plus, TrendingUp, AlertTriangle, Eye, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface Vulnerabilidade {
  id: string;
  titulo: string;
  descricao: string;
  nivelRisco: 'BAIXO' | 'MEDIO' | 'ALTO' | 'CRITICO';
  palavrasChave: string[];
  volumeMencoes: number;
  tendencia: number[];
  alerta: boolean;
}

export default function MapaVulnerabilidades({ candidateId }: { candidateId: string }) {
  const [vulnerabilidades, setVulnerabilidades] = useState<Vulnerabilidade[]>([
    {
      id: '1',
      titulo: 'Votação da Reforma Tributária',
      descricao: 'Votação favorável em 2018 pode ser usada contra',
      nivelRisco: 'ALTO',
      palavrasChave: ['reforma', 'tributária', 'impostos', '2018'],
      volumeMencoes: 145,
      tendencia: [20, 35, 45, 78, 92, 145, 189],
      alerta: true
    },
    {
      id: '2',
      titulo: 'Declaração sobre Segurança Pública',
      descricao: 'Frase mal interpretada em entrevista de 2020',
      nivelRisco: 'MEDIO',
      palavrasChave: ['segurança', 'polícia', '2020', 'declaração'],
      volumeMencoes: 48,
      tendencia: [15, 18, 22, 28, 35, 42, 48],
      alerta: false
    }
  ]);

  const [novaVuln, setNovaVuln] = useState({
    titulo: '',
    descricao: '',
    nivelRisco: 'MEDIO',
    palavrasChave: ''
  });

  const [editando, setEditando] = useState(false);

  const adicionarVulnerabilidade = () => {
    if (!novaVuln.titulo) return;

    const vuln: Vulnerabilidade = {
      id: Date.now().toString(),
      titulo: novaVuln.titulo,
      descricao: novaVuln.descricao,
      nivelRisco: novaVuln.nivelRisco as any,
      palavrasChave: novaVuln.palavrasChave.split(',').map(p => p.trim()),
      volumeMencoes: 0,
      tendencia: [0, 0, 0, 0, 0, 0, 0],
      alerta: false
    };

    setVulnerabilidades([...vulnerabilidades, vuln]);
    setNovaVuln({ titulo: '', descricao: '', nivelRisco: 'MEDIO', palavrasChave: '' });
    setEditando(false);
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case 'CRITICO': return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'ALTO': return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'MEDIO': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      default: return 'bg-green-500/20 text-green-400 border-green-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {editando && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Nova Vulnerabilidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Título</Label>
              <Input
                value={novaVuln.titulo}
                onChange={(e) => setNovaVuln({ ...novaVuln, titulo: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Ex: Votação da Reforma X"
              />
            </div>
            <div>
              <Label className="text-white">Descrição</Label>
              <Input
                value={novaVuln.descricao}
                onChange={(e) => setNovaVuln({ ...novaVuln, descricao: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Por que é um ponto sensível..."
              />
            </div>
            <div>
              <Label className="text-white">Palavras-chave (separadas por vírgula)</Label>
              <Input
                value={novaVuln.palavrasChave}
                onChange={(e) => setNovaVuln({ ...novaVuln, palavrasChave: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
                placeholder="reforma, tributária, impostos"
              />
            </div>
            <div>
              <Label className="text-white">Nível de Risco</Label>
              <select
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                value={novaVuln.nivelRisco}
                onChange={(e) => setNovaVuln({ ...novaVuln, nivelRisco: e.target.value })}
              >
                <option value="BAIXO">Baixo</option>
                <option value="MEDIO">Médio</option>
                <option value="ALTO">Alto</option>
                <option value="CRITICO">Crítico</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={adicionarVulnerabilidade} className="bg-green-600 hover:bg-green-700">
                Salvar
              </Button>
              <Button onClick={() => setEditando(false)} variant="outline">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Mapa de Vulnerabilidades ({vulnerabilidades.length})
            </CardTitle>
            <Button onClick={() => setEditando(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Vulnerabilidade
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {vulnerabilidades.map(vuln => (
              <Card
                key={vuln.id}
                className={`bg-white/5 border ${
                  vuln.alerta ? 'border-red-500/40 animate-pulse' : 'border-white/10'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-white">{vuln.titulo}</h4>
                      <p className="text-xs text-white/60 mt-1">{vuln.descricao}</p>
                    </div>
                    <Badge className={getNivelColor(vuln.nivelRisco)}>
                      {vuln.nivelRisco}
                    </Badge>
                  </div>

                  {/* Mini gráfico de tendência */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">Volume de menções (7d)</span>
                      <span className={`font-bold ${vuln.alerta ? 'text-red-400' : 'text-white'}`}>
                        {vuln.volumeMencoes}
                      </span>
                    </div>
                    <ResponsiveContainer width="100%" height={40}>
                      <LineChart data={vuln.tendencia.map((v, i) => ({ valor: v }))}>
                        <Line
                          type="monotone"
                          dataKey="valor"
                          stroke={vuln.alerta ? '#EF4444' : '#00D4FF'}
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Palavras-chave */}
                  <div className="mb-3">
                    <div className="text-xs text-white/70 mb-1">Palavras-chave:</div>
                    <div className="flex flex-wrap gap-1">
                      {vuln.palavrasChave.map((palavra, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {palavra}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {vuln.alerta && (
                    <div className="p-2 bg-red-500/10 border border-red-500/20 rounded mb-3">
                      <div className="flex items-center gap-2 text-red-400 text-xs">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Vulnerabilidade sob ataque! Volume acima do normal.</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Monitorar
                    </Button>
                    {vuln.alerta && (
                      <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Criar Alerta
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

