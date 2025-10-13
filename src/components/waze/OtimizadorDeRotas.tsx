'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { 
  Route, Plus, X, Navigation, Clock, DollarSign, 
  MapPin, Zap, Save, Users, Calendar 
} from 'lucide-react';
import { 
  otimizarRota2Opt, 
  calcularCustoRota,
  estimarTempoViagem 
} from '@/lib/waze/otimizacao';

interface Ponto {
  id: string;
  nome: string;
  endereco: string;
  latitude: number;
  longitude: number;
  duracao?: number; // minutos de parada
  prioridade?: number; // 1-10
}

interface RotaOtimizada {
  ordem: string[];
  distanciaTotal: number;
  tempoTotal: number;
  pontosOrdenados: Ponto[];
}

interface OtimizadorDeRotasProps {
  candidateId: string;
  onRotaSalva?: (rota: any) => void;
}

export default function OtimizadorDeRotas({ candidateId, onRotaSalva }: OtimizadorDeRotasProps) {
  const [pontos, setPontos] = useState<Ponto[]>([]);
  const [rotaOtimizada, setRotaOtimizada] = useState<RotaOtimizada | null>(null);
  const [novaRota, setNovaRota] = useState({
    nome: '',
    tipo: 'CARREATA',
    dataInicio: '',
    horaInicio: '',
    equipeSelecionada: ''
  });
  const [novoPonto, setNovoPonto] = useState({
    nome: '',
    endereco: '',
    duracao: 30
  });
  const [otimizando, setOtimizando] = useState(false);
  const [etapa, setEtapa] = useState<'definicao' | 'pontos' | 'otimizacao' | 'atribuicao'>('definicao');

  const tiposRota = [
    { value: 'CARREATA', label: 'Carreata', icon: '🚗' },
    { value: 'CAMINHADA', label: 'Caminhada', icon: '🚶' },
    { value: 'VISITA_LIDERANCAS', label: 'Visita a Lideranças', icon: '🤝' },
    { value: 'DISTRIBUICAO_MATERIAL', label: 'Distribuição de Material', icon: '📦' },
    { value: 'EVENTO_COMICIO', label: 'Comício', icon: '🎤' },
    { value: 'CORPO_A_CORPO', label: 'Corpo a Corpo', icon: '👥' },
    { value: 'PANFLETAGEM', label: 'Panfletagem', icon: '📄' }
  ];

  const equipes = [
    { id: '1', nome: 'Equipe Alpha', membros: 8, disponivel: true },
    { id: '2', nome: 'Equipe Beta', membros: 6, disponivel: true },
    { id: '3', nome: 'Equipe Gamma', membros: 10, disponivel: false }
  ];

  const adicionarPonto = async () => {
    if (!novoPonto.nome || !novoPonto.endereco) return;

    try {
      // Simular geocoding (em produção, usar Mapbox Geocoding API)
      const coordenadas = await geocodificarEndereco(novoPonto.endereco);

      const ponto: Ponto = {
        id: `ponto-${Date.now()}`,
        nome: novoPonto.nome,
        endereco: novoPonto.endereco,
        latitude: coordenadas.latitude,
        longitude: coordenadas.longitude,
        duracao: novoPonto.duracao,
        prioridade: 5
      };

      setPontos([...pontos, ponto]);
      setNovoPonto({ nome: '', endereco: '', duracao: 30 });
    } catch (error) {
      console.error('Erro ao geocodificar:', error);
      alert('Erro ao buscar endereço. Usando coordenadas simuladas.');
      
      // Fallback com coordenadas simuladas
      const ponto: Ponto = {
        id: `ponto-${Date.now()}`,
        nome: novoPonto.nome,
        endereco: novoPonto.endereco,
        latitude: -30.0346 + (Math.random() - 0.5) * 0.1,
        longitude: -51.2177 + (Math.random() - 0.5) * 0.1,
        duracao: novoPonto.duracao,
        prioridade: 5
      };

      setPontos([...pontos, ponto]);
      setNovoPonto({ nome: '', endereco: '', duracao: 30 });
    }
  };

  const geocodificarEndereco = async (endereco: string): Promise<{ latitude: number; longitude: number }> => {
    // Simular geocoding (em produção real, usar Mapbox Geocoding API)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          latitude: -30.0346 + (Math.random() - 0.5) * 0.1,
          longitude: -51.2177 + (Math.random() - 0.5) * 0.1
        });
      }, 500);
    });
  };

  const removerPonto = (pontoId: string) => {
    setPontos(pontos.filter(p => p.id !== pontoId));
    setRotaOtimizada(null);
  };

  const otimizarRota = () => {
    if (pontos.length < 2) {
      alert('Adicione pelo menos 2 pontos para otimizar a rota');
      return;
    }

    setOtimizando(true);

    // Simular processamento
    setTimeout(() => {
      const resultado = otimizarRota2Opt(pontos);
      setRotaOtimizada(resultado);
      setOtimizando(false);
      setEtapa('otimizacao');
    }, 1500);
  };

  const salvarRota = () => {
    if (!rotaOtimizada || !novaRota.nome) return;

    const custo = calcularCustoRota(
      rotaOtimizada.distanciaTotal,
      rotaOtimizada.tempoTotal
    );

    const rotaCompleta = {
      nome: novaRota.nome,
      tipo: novaRota.tipo,
      dataInicio: new Date(`${novaRota.dataInicio}T${novaRota.horaInicio}`),
      pontos: rotaOtimizada.pontosOrdenados,
      distanciaKm: rotaOtimizada.distanciaTotal,
      tempoMinutos: rotaOtimizada.tempoTotal,
      custoEstimado: custo,
      equipeId: novaRota.equipeSelecionada
    };

    console.log('Rota salva:', rotaCompleta);
    
    if (onRotaSalva) {
      onRotaSalva(rotaCompleta);
    }

    alert('Rota salva com sucesso!');
    resetarFormulario();
  };

  const resetarFormulario = () => {
    setPontos([]);
    setRotaOtimizada(null);
    setNovaRota({
      nome: '',
      tipo: 'CARREATA',
      dataInicio: '',
      horaInicio: '',
      equipeSelecionada: ''
    });
    setEtapa('definicao');
  };

  return (
    <div className="space-y-6">
      {/* Header com Progresso */}
      <Card className="glass-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {['definicao', 'pontos', 'otimizacao', 'atribuicao'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                    etapa === step ? 'bg-blue-500/20 border border-blue-500/40' : 'bg-white/5'
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      etapa === step ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`text-sm ${
                      etapa === step ? 'text-white' : 'text-white/50'
                    }`}>
                      {step === 'definicao' ? 'Definição' :
                       step === 'pontos' ? 'Pontos' :
                       step === 'otimizacao' ? 'Otimização' : 'Atribuição'}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className="w-8 h-0.5 bg-white/20 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Etapa 1: Definição */}
      {etapa === 'definicao' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">1. Definição da Rota</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Nome da Rota</Label>
              <Input
                placeholder="Ex: Carreata Centro - Zona Sul"
                value={novaRota.nome}
                onChange={(e) => setNovaRota({ ...novaRota, nome: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <Label className="text-white">Tipo de Evento</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {tiposRota.map((tipo) => (
                  <div
                    key={tipo.value}
                    onClick={() => setNovaRota({ ...novaRota, tipo: tipo.value })}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      novaRota.tipo === tipo.value
                        ? 'bg-blue-500/20 border-blue-500/40'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-2xl text-center mb-1">{tipo.icon}</div>
                    <div className="text-xs text-white text-center">{tipo.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Data</Label>
                <Input
                  type="date"
                  value={novaRota.dataInicio}
                  onChange={(e) => setNovaRota({ ...novaRota, dataInicio: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white">Horário</Label>
                <Input
                  type="time"
                  value={novaRota.horaInicio}
                  onChange={(e) => setNovaRota({ ...novaRota, horaInicio: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <Button
              onClick={() => setEtapa('pontos')}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!novaRota.nome || !novaRota.dataInicio || !novaRota.horaInicio}
            >
              Próximo: Adicionar Pontos
              <Navigation className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Etapa 2: Pontos */}
      {etapa === 'pontos' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">2. Adicionar Pontos de Interesse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white">Nome do Local</Label>
                <Input
                  placeholder="Ex: Praça Central"
                  value={novoPonto.nome}
                  onChange={(e) => setNovoPonto({ ...novoPonto, nome: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white">Endereço</Label>
                <Input
                  placeholder="Ex: Av. Borges de Medeiros, 1501"
                  value={novoPonto.endereco}
                  onChange={(e) => setNovoPonto({ ...novoPonto, endereco: e.target.value })}
                  onKeyPress={(e) => e.key === 'Enter' && adicionarPonto()}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div>
                <Label className="text-white">Duração da Parada (minutos)</Label>
                <Input
                  type="number"
                  value={novoPonto.duracao}
                  onChange={(e) => setNovoPonto({ ...novoPonto, duracao: Number(e.target.value) })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <Button
                onClick={adicionarPonto}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={!novoPonto.nome || !novoPonto.endereco}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Ponto
              </Button>

              {pontos.length >= 2 && (
                <Button
                  onClick={otimizarRota}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={otimizando}
                >
                  {otimizando ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Otimizando...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Otimizar Rota ({pontos.length} pontos)
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Pontos Adicionados ({pontos.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {pontos.length === 0 ? (
                  <div className="text-center py-8 text-white/50">
                    <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum ponto adicionado</p>
                  </div>
                ) : (
                  pontos.map((ponto, index) => (
                    <div
                      key={ponto.id}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-white font-medium text-sm">{ponto.nome}</div>
                          <div className="text-white/60 text-xs">{ponto.endereco}</div>
                          <div className="text-white/40 text-xs">Parada: {ponto.duracao}min</div>
                        </div>
                      </div>
                      <Button
                        onClick={() => removerPonto(ponto.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Etapa 3: Otimização */}
      {etapa === 'otimizacao' && rotaOtimizada && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              3. Rota Otimizada
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Métricas */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Route className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-white/70">Distância Total</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {rotaOtimizada.distanciaTotal.toFixed(1)} km
                </div>
              </div>
              
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-white/70">Tempo Total</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {Math.floor(rotaOtimizada.tempoTotal / 60)}h {rotaOtimizada.tempoTotal % 60}min
                </div>
              </div>
              
              <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-white/70">Custo Estimado</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  R$ {calcularCustoRota(rotaOtimizada.distanciaTotal, rotaOtimizada.tempoTotal).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Sequência Otimizada */}
            <div>
              <h4 className="text-white font-semibold mb-3">Sequência Otimizada:</h4>
              <div className="space-y-2">
                {rotaOtimizada.pontosOrdenados.map((ponto, index) => (
                  <div key={ponto.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{ponto.nome}</div>
                      <div className="text-white/60 text-sm">{ponto.endereco}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {ponto.duracao}min
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setEtapa('atribuicao')}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Próximo: Atribuir Equipe
                <Users className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => setEtapa('pontos')}
                variant="outline"
              >
                Voltar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Etapa 4: Atribuição */}
      {etapa === 'atribuicao' && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">4. Atribuir para Equipe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {equipes.map((equipe) => (
                <div
                  key={equipe.id}
                  onClick={() => equipe.disponivel && setNovaRota({ ...novaRota, equipeSelecionada: equipe.id })}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    novaRota.equipeSelecionada === equipe.id
                      ? 'bg-blue-500/20 border-blue-500/40'
                      : equipe.disponivel
                      ? 'bg-white/5 border-white/10 hover:bg-white/10'
                      : 'bg-red-500/10 border-red-500/20 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{equipe.nome}</div>
                      <div className="text-white/60 text-sm">{equipe.membros} membros</div>
                    </div>
                    <Badge variant={equipe.disponivel ? 'default' : 'destructive'}>
                      {equipe.disponivel ? 'Disponível' : 'Ocupada'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={salvarRota}
                className="flex-1 bg-green-600 hover:bg-green-700"
                disabled={!novaRota.equipeSelecionada}
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Rota
              </Button>
              <Button
                onClick={() => setEtapa('otimizacao')}
                variant="outline"
              >
                Voltar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

