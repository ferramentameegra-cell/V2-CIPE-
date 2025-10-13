'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Plus, Bell, MapPin, Eye, Trash2, Settings } from 'lucide-react';

interface Alerta {
  id: string;
  nome: string;
  tipo: string;
  raio?: number;
  ativo: boolean;
  notificarEquipe: boolean;
  notificarGestor: boolean;
  vezesAcionado: number;
  ultimoAcionamento?: Date;
}

export default function AlertasGeograficos({ candidateId }: { candidateId: string }) {
  const [alertas, setAlertas] = useState<Alerta[]>([
    {
      id: '1',
      nome: 'Área de Risco - Centro',
      tipo: 'AREA_DE_RISCO',
      raio: 500,
      ativo: true,
      notificarEquipe: true,
      notificarGestor: true,
      vezesAcionado: 3,
      ultimoAcionamento: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      nome: 'Proximidade Adversário',
      tipo: 'PROXIMIDADE_ADVERSARIO',
      raio: 1000,
      ativo: true,
      notificarEquipe: true,
      notificarGestor: false,
      vezesAcionado: 1,
      ultimoAcionamento: new Date(Date.now() - 5 * 60 * 60 * 1000)
    }
  ]);

  const [novoAlerta, setNovoAlerta] = useState({
    nome: '',
    tipo: 'AREA_DE_RISCO',
    raio: 500
  });

  const tiposAlerta = [
    { value: 'PROXIMIDADE_ADVERSARIO', label: 'Proximidade de Adversário', icon: '⚠️' },
    { value: 'AREA_DE_RISCO', label: 'Área de Risco', icon: '🚨' },
    { value: 'OPORTUNIDADE_CAMPANHA', label: 'Oportunidade de Campanha', icon: '🎯' },
    { value: 'ENTRADA_ZONA_ALVO', label: 'Entrada em Zona Alvo', icon: '📍' },
    { value: 'SAIDA_ZONA_ALVO', label: 'Saída de Zona Alvo', icon: '🚪' },
    { value: 'AREA_CRITICA', label: 'Área Crítica', icon: '❗' },
    { value: 'ZONA_ELEITORAL', label: 'Zona Eleitoral', icon: '🗳️' }
  ];

  const adicionarAlerta = () => {
    if (!novoAlerta.nome) return;

    const alerta: Alerta = {
      id: Date.now().toString(),
      nome: novoAlerta.nome,
      tipo: novoAlerta.tipo,
      raio: novoAlerta.raio,
      ativo: true,
      notificarEquipe: true,
      notificarGestor: true,
      vezesAcionado: 0
    };

    setAlertas([...alertas, alerta]);
    setNovoAlerta({ nome: '', tipo: 'AREA_DE_RISCO', raio: 500 });
  };

  const toggleAlerta = (id: string) => {
    setAlertas(alertas.map(a => a.id === id ? { ...a, ativo: !a.ativo } : a));
  };

  const removerAlerta = (id: string) => {
    setAlertas(alertas.filter(a => a.id !== id));
  };

  const getTipoInfo = (tipo: string) => {
    return tiposAlerta.find(t => t.value === tipo) || tiposAlerta[0];
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Criar Novo Alerta
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-white">Nome do Alerta</Label>
            <Input
              placeholder="Ex: Proximidade do comitê adversário"
              value={novoAlerta.nome}
              onChange={(e) => setNovoAlerta({ ...novoAlerta, nome: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <div>
            <Label className="text-white">Tipo de Alerta</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {tiposAlerta.map(tipo => (
                <div
                  key={tipo.value}
                  onClick={() => setNovoAlerta({ ...novoAlerta, tipo: tipo.value })}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    novoAlerta.tipo === tipo.value
                      ? 'bg-blue-500/20 border-blue-500/40'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="text-center text-2xl mb-1">{tipo.icon}</div>
                  <div className="text-xs text-white text-center">{tipo.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-white">Raio de Detecção (metros)</Label>
            <Input
              type="number"
              value={novoAlerta.raio}
              onChange={(e) => setNovoAlerta({ ...novoAlerta, raio: Number(e.target.value) })}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <Button
            onClick={adicionarAlerta}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={!novoAlerta.nome}
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Alerta
          </Button>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Alertas Configurados ({alertas.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alertas.map(alerta => {
            const tipoInfo = getTipoInfo(alerta.tipo);
            return (
              <div
                key={alerta.id}
                className="p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{tipoInfo.icon}</div>
                    <div>
                      <div className="font-semibold text-white">{alerta.nome}</div>
                      <div className="text-xs text-white/60">{tipoInfo.label}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={alerta.ativo ? 'default' : 'secondary'}>
                      {alerta.ativo ? 'Ativo' : 'Inativo'}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removerAlerta(alerta.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-2 text-white/70">
                    <MapPin className="w-4 h-4" />
                    Raio: {alerta.raio}m
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Eye className="w-4 h-4" />
                    {alerta.vezesAcionado} acionamentos
                  </div>
                </div>

                {alerta.ultimoAcionamento && (
                  <div className="text-xs text-white/50 mb-3">
                    Último acionamento: {alerta.ultimoAcionamento.toLocaleString()}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => toggleAlerta(alerta.id)}
                    variant={alerta.ativo ? 'destructive' : 'default'}
                    className="flex-1"
                  >
                    {alerta.ativo ? 'Desativar' : 'Ativar'}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="w-4 h-4 mr-1" />
                    Config
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

