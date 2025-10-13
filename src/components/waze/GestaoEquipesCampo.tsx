'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Users, Phone, MessageSquare, Navigation, Battery, 
  Clock, MapPin, CheckCircle, AlertTriangle, Plus,
  Play, Pause, Radio
} from 'lucide-react';
import MapaInterativo from './MapaInterativo';

interface MembroEquipe {
  id: string;
  nome: string;
  telefone: string;
  latitude: number;
  longitude: number;
  status: 'ativo' | 'pausado' | 'offline';
  velocidade: number;
  bateria: number;
  ultimaAtualizacao: Date;
  kmPercorridos: number;
  interacoesHoje: number;
}

interface Equipe {
  id: string;
  nome: string;
  status: 'ativa' | 'inativa' | 'em_rota';
  membros: MembroEquipe[];
  rotaAtual?: string;
  kmTotais: number;
  interacoesTotais: number;
}

export default function GestaoEquipesCampo({ candidateId }: { candidateId: string }) {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [equipeSelecionada, setEquipeSelecionada] = useState<string | null>(null);
  const [chatAberto, setChatAberto] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    carregarEquipes();
    
    // Simular atualização em tempo real
    const interval = setInterval(() => {
      atualizarPosicoes();
    }, 3000);

    return () => clearInterval(interval);
  }, [candidateId]);

  const carregarEquipes = () => {
    const equipesSimuladas: Equipe[] = [
      {
        id: '1',
        nome: 'Equipe Alpha',
        status: 'em_rota',
        kmTotais: 45.3,
        interacoesTotais: 127,
        membros: [
          {
            id: 'm1',
            nome: 'Ana Silva',
            telefone: '(11) 99999-0001',
            latitude: -30.0346,
            longitude: -51.2177,
            status: 'ativo',
            velocidade: 25,
            bateria: 85,
            ultimaAtualizacao: new Date(),
            kmPercorridos: 15.2,
            interacoesHoje: 42
          },
          {
            id: 'm2',
            nome: 'Carlos Lima',
            telefone: '(11) 99999-0002',
            latitude: -30.0380,
            longitude: -51.2200,
            status: 'ativo',
            velocidade: 18,
            bateria: 72,
            ultimaAtualizacao: new Date(),
            kmPercorridos: 12.8,
            interacoesHoje: 38
          }
        ]
      },
      {
        id: '2',
        nome: 'Equipe Beta',
        status: 'ativa',
        kmTotais: 28.7,
        interacoesTotais: 85,
        membros: [
          {
            id: 'm3',
            nome: 'Maria Santos',
            telefone: '(11) 99999-0003',
            latitude: -30.0400,
            longitude: -51.2150,
            status: 'pausado',
            velocidade: 0,
            bateria: 45,
            ultimaAtualizacao: new Date(),
            kmPercorridos: 8.5,
            interacoesHoje: 25
          }
        ]
      },
      {
        id: '3',
        nome: 'Equipe Gamma',
        status: 'inativa',
        kmTotais: 0,
        interacoesTotais: 0,
        membros: []
      }
    ];

    setEquipes(equipesSimuladas);
  };

  const atualizarPosicoes = () => {
    setEquipes(prev => prev.map(equipe => ({
      ...equipe,
      membros: equipe.membros.map(membro => {
        if (membro.status === 'ativo') {
          return {
            ...membro,
            latitude: membro.latitude + (Math.random() - 0.5) * 0.001,
            longitude: membro.longitude + (Math.random() - 0.5) * 0.001,
            velocidade: 10 + Math.random() * 30,
            bateria: Math.max(20, membro.bateria - Math.random() * 0.5),
            kmPercorridos: membro.kmPercorridos + Math.random() * 0.1,
            ultimaAtualizacao: new Date()
          };
        }
        return membro;
      })
    })));
  };

  const toggleStatusMembro = (equipeId: string, membroId: string) => {
    setEquipes(prev => prev.map(equipe => {
      if (equipe.id === equipeId) {
        return {
          ...equipe,
          membros: equipe.membros.map(membro => {
            if (membro.id === membroId) {
              return {
                ...membro,
                status: membro.status === 'ativo' ? 'pausado' : 'ativo'
              };
            }
            return membro;
          })
        };
      }
      return equipe;
    }));
  };

  const enviarMensagem = () => {
    if (!mensagem.trim() || !equipeSelecionada) return;
    
    console.log('Enviando mensagem para equipe:', equipeSelecionada, mensagem);
    alert(`Mensagem enviada: ${mensagem}`);
    setMensagem('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'pausado': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'offline': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const equipe = equipes.find(e => e.id === equipeSelecionada);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Coluna 1: Lista de Equipes */}
      <div className="space-y-4">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                Equipes de Campo
              </CardTitle>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-1" />
                Nova
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {equipes.map(equipe => (
              <div
                key={equipe.id}
                onClick={() => setEquipeSelecionada(equipe.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  equipeSelecionada === equipe.id
                    ? 'bg-blue-500/20 border-blue-500/40'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-white">{equipe.nome}</div>
                  <Badge variant="outline" className={
                    equipe.status === 'em_rota' ? 'text-green-400 border-green-400' :
                    equipe.status === 'ativa' ? 'text-blue-400 border-blue-400' :
                    'text-gray-400 border-gray-400'
                  }>
                    {equipe.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1 text-white/70">
                    <Users className="w-3 h-3" />
                    {equipe.membros.length} membros
                  </div>
                  <div className="flex items-center gap-1 text-white/70">
                    <Navigation className="w-3 h-3" />
                    {equipe.kmTotais.toFixed(1)} km
                  </div>
                  <div className="flex items-center gap-1 text-white/70">
                    <CheckCircle className="w-3 h-3" />
                    {equipe.interacoesTotais} interações
                  </div>
                  <div className="flex items-center gap-1 text-white/70">
                    <Radio className="w-3 h-3" />
                    {equipe.membros.filter(m => m.status === 'ativo').length} ativos
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat */}
        {equipeSelecionada && (
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat com Equipe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-white/5 rounded-lg p-3 h-32 overflow-y-auto">
                <div className="text-xs text-white/50 text-center">
                  Sem mensagens
                </div>
              </div>
              
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Button onClick={enviarMensagem} size="sm">
                  Enviar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Coluna 2: Detalhes da Equipe */}
      {equipe ? (
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">{equipe.nome} - Membros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {equipe.membros.length === 0 ? (
                <div className="text-center py-8 text-white/50">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Nenhum membro na equipe</p>
                </div>
              ) : (
                equipe.membros.map(membro => (
                  <div key={membro.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-white">{membro.nome}</div>
                        <div className="text-xs text-white/60">{membro.telefone}</div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(membro.status)}>
                        {membro.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="flex items-center gap-1 text-white/70">
                        <Navigation className="w-3 h-3" />
                        {membro.velocidade.toFixed(0)} km/h
                      </div>
                      <div className="flex items-center gap-1 text-white/70">
                        <Battery className={`w-3 h-3 ${
                          membro.bateria > 50 ? 'text-green-400' :
                          membro.bateria > 20 ? 'text-yellow-400' : 'text-red-400'
                        }`} />
                        {membro.bateria.toFixed(0)}%
                      </div>
                      <div className="flex items-center gap-1 text-white/70">
                        <MapPin className="w-3 h-3" />
                        {membro.kmPercorridos.toFixed(1)} km
                      </div>
                      <div className="flex items-center gap-1 text-white/70">
                        <CheckCircle className="w-3 h-3" />
                        {membro.interacoesHoje} interações
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/70">Bateria</span>
                          <span className="text-white">{membro.bateria.toFixed(0)}%</span>
                        </div>
                        <Progress value={membro.bateria} className="h-1" />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => toggleStatusMembro(equipe.id, membro.id)}
                        >
                          {membro.status === 'ativo' ? (
                            <><Pause className="w-3 h-3 mr-1" /> Pausar</>
                          ) : (
                            <><Play className="w-3 h-3 mr-1" /> Ativar</>
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-white/50">
                      Última atualização: {membro.ultimaAtualizacao.toLocaleTimeString()}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-white/50">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>Selecione uma equipe para ver os detalhes</p>
          </div>
        </div>
      )}

      {/* Coluna 3: Mapa */}
      <div className="lg:col-span-1">
        <Card className="glass-card h-full">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Posição em Tempo Real
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[600px]">
            <MapaInterativo candidateId={candidateId} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

