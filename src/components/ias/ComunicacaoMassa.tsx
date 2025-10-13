'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { 
  Megaphone, Send, Users, Target, BarChart3, Clock, 
  CheckCircle, AlertTriangle, TrendingUp, MessageSquare,
  Calendar, Filter, Play, Pause, Settings
} from 'lucide-react';

interface ComunicacaoMassaProps {
  eleitorId?: string;
}

interface Campanha {
  id: string;
  nome: string;
  status: 'ativa' | 'pausada' | 'concluida' | 'programada';
  segmento: string;
  canal: 'whatsapp' | 'telegram' | 'email' | 'todos';
  mensagem: string;
  destinatarios: number;
  entregues: number;
  taxaAbertura: number;
  engajamento: number;
  criadaEm: string;
  iasAtivadas: string[];
}

interface Segmento {
  nome: string;
  criterios: string[];
  totalEleitores: number;
  engajamentoMedio: number;
}

const ComunicacaoMassa = ({ eleitorId }: ComunicacaoMassaProps) => {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [segmentos, setSegmentos] = useState<Segmento[]>([]);
  const [novaCampanha, setNovaCampanha] = useState({
    nome: '',
    segmento: '',
    canal: 'whatsapp' as const,
    mensagem: ''
  });
  const [estatisticas, setEstatisticas] = useState({
    totalCampanhas: 0,
    campanhasAtivas: 0,
    mensagensEnviadas: 0,
    taxaEngajamento: 0,
    alcanceTotal: 0
  });

  useEffect(() => {
    const campanhasMockadas: Campanha[] = [
      {
        id: '1',
        nome: 'Nova UBS em Ceilândia',
        status: 'ativa',
        segmento: 'Interessados em Saúde - Ceilândia',
        canal: 'whatsapp',
        mensagem: 'Pessoal de Ceilândia! 🏥 Consegui R$ 2,3 milhões em emendas para uma nova UBS na região. Vai melhorar muito o atendimento de vocês! Quem mais tem dificuldade pra marcar consulta?',
        destinatarios: 3500,
        entregues: 3240,
        taxaAbertura: 89,
        engajamento: 76,
        criadaEm: '2 horas atrás',
        iasAtivadas: ['narrativa_regional', 'clone_digital']
      },
      {
        id: '2',
        nome: 'Segurança em Taguatinga',
        status: 'concluida',
        segmento: 'Moradores de Taguatinga',
        canal: 'whatsapp',
        mensagem: 'Taguatinga, vocês viram o aumento do policiamento? 🚔 Consegui mais 15 viaturas pra região! A segurança de vocês é minha prioridade. Como está a sensação de segurança por aí?',
        destinatarios: 2800,
        entregues: 2756,
        taxaAbertura: 92,
        engajamento: 84,
        criadaEm: '1 dia atrás',
        iasAtivadas: ['blindagem', 'pesquisas']
      },
      {
        id: '3',
        nome: 'Evento Jovens - Gama',
        status: 'programada',
        segmento: 'Jovens 18-30 anos - Gama',
        canal: 'telegram',
        mensagem: 'Galera do Gama! 🎉 Vou fazer um evento especial pra vocês no sábado. Vai ter música, comida e muito bate-papo sobre o futuro da cidade. Quem vem?',
        destinatarios: 1200,
        entregues: 0,
        taxaAbertura: 0,
        engajamento: 0,
        criadaEm: 'Programada para amanhã 14h',
        iasAtivadas: ['clone_digital', 'narrativa_regional']
      }
    ];

    const segmentosMockados: Segmento[] = [
      {
        nome: 'Interessados em Saúde',
        criterios: ['Pauta: saúde', 'Localização: DF'],
        totalEleitores: 8500,
        engajamentoMedio: 78
      },
      {
        nome: 'Moradores de Ceilândia',
        criterios: ['Localização: Ceilândia'],
        totalEleitores: 4200,
        engajamentoMedio: 82
      },
      {
        nome: 'Jovens 18-30 anos',
        criterios: ['Idade: 18-30', 'Interesse: educação, emprego'],
        totalEleitores: 6800,
        engajamentoMedio: 65
      },
      {
        nome: 'Mulheres Empreendedoras',
        criterios: ['Gênero: feminino', 'Pauta: economia, empreendedorismo'],
        totalEleitores: 2100,
        engajamentoMedio: 88
      }
    ];

    setCampanhas(campanhasMockadas);
    setSegmentos(segmentosMockados);
    
    setEstatisticas({
      totalCampanhas: 47,
      campanhasAtivas: 8,
      mensagensEnviadas: 125430,
      taxaEngajamento: 76,
      alcanceTotal: 89500
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-500/20 text-green-400';
      case 'pausada': return 'bg-yellow-500/20 text-yellow-400';
      case 'concluida': return 'bg-blue-500/20 text-blue-400';
      case 'programada': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativa': return 'Ativa';
      case 'pausada': return 'Pausada';
      case 'concluida': return 'Concluída';
      case 'programada': return 'Programada';
      default: return 'Desconhecido';
    }
  };

  const criarCampanha = () => {
    if (!novaCampanha.nome || !novaCampanha.mensagem) return;
    
    const campanha: Campanha = {
      id: Date.now().toString(),
      nome: novaCampanha.nome,
      status: 'programada',
      segmento: novaCampanha.segmento,
      canal: novaCampanha.canal,
      mensagem: novaCampanha.mensagem,
      destinatarios: 0,
      entregues: 0,
      taxaAbertura: 0,
      engajamento: 0,
      criadaEm: 'Agora',
      iasAtivadas: ['clone_digital', 'narrativa_regional']
    };
    
    setCampanhas(prev => [campanha, ...prev]);
    setNovaCampanha({ nome: '', segmento: '', canal: 'whatsapp', mensagem: '' });
  };

  return (
    <div className="h-full w-full p-6 space-y-6 overflow-y-auto">
      {/* Header com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total de Campanhas</p>
                <p className="text-2xl font-bold text-white">{estatisticas.totalCampanhas}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+3 esta semana</span>
                </div>
              </div>
              <Megaphone className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Campanhas Ativas</p>
                <p className="text-2xl font-bold text-white">{estatisticas.campanhasAtivas}</p>
                <div className="flex items-center mt-1">
                  <Play className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Em execução</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Mensagens Enviadas</p>
                <p className="text-2xl font-bold text-white">{estatisticas.mensagensEnviadas.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <Send className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-sm text-blue-400">+12%</span>
                </div>
              </div>
              <MessageSquare className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Taxa de Engajamento</p>
                <p className="text-2xl font-bold text-white">{estatisticas.taxaEngajamento}%</p>
                <div className="flex items-center mt-1">
                  <BarChart3 className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Excelente</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Criar Nova Campanha */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Megaphone className="h-5 w-5 mr-2" />
            Criar Nova Campanha
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium">Nome da Campanha</label>
                <Input
                  placeholder="Ex: Nova UBS em Ceilândia"
                  value={novaCampanha.nome}
                  onChange={(e) => setNovaCampanha(prev => ({ ...prev, nome: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="text-white text-sm font-medium">Segmento</label>
                <select
                  value={novaCampanha.segmento}
                  onChange={(e) => setNovaCampanha(prev => ({ ...prev, segmento: e.target.value }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="">Selecione um segmento</option>
                  {segmentos.map((segmento, index) => (
                    <option key={index} value={segmento.nome}>
                      {segmento.nome} ({segmento.totalEleitores} eleitores)
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium">Canal</label>
                <select
                  value={novaCampanha.canal}
                  onChange={(e) => setNovaCampanha(prev => ({ ...prev, canal: e.target.value as any }))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="telegram">Telegram</option>
                  <option value="email">Email</option>
                  <option value="todos">Todos os Canais</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-white text-sm font-medium">Mensagem</label>
              <textarea
                placeholder="Digite a mensagem da campanha..."
                value={novaCampanha.mensagem}
                onChange={(e) => setNovaCampanha(prev => ({ ...prev, mensagem: e.target.value }))}
                className="min-h-[120px]"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-slate-400 text-sm">
                  {novaCampanha.mensagem.length} caracteres
                </span>
                <Button 
                  onClick={criarCampanha}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Criar Campanha
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Segmentos Disponíveis */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Segmentos Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {segmentos.map((segmento, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold">{segmento.nome}</h4>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {segmento.totalEleitores} eleitores
                  </Badge>
                </div>
                <div className="space-y-2">
                  {segmento.criterios.map((criterio, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      <span className="text-slate-300 text-sm">{criterio}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Engajamento Médio</span>
                  <span className="text-green-400 font-semibold">{segmento.engajamentoMedio}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campanhas Ativas */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Campanhas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campanhas.map((campanha) => (
              <div key={campanha.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">{campanha.nome}</h4>
                    <p className="text-slate-400 text-sm">{campanha.segmento}</p>
                    <p className="text-slate-400 text-sm">{campanha.criadaEm}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(campanha.status)}>
                      {getStatusLabel(campanha.status)}
                    </Badge>
                    <div className="flex space-x-1">
                      {campanha.status === 'ativa' && (
                        <Button size="sm" variant="outline">
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-white bg-slate-700/50 rounded p-3">{campanha.mensagem}</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Destinatários</p>
                    <p className="text-white font-bold">{campanha.destinatarios.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Entregues</p>
                    <p className="text-white font-bold">{campanha.entregues.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Taxa de Abertura</p>
                    <p className="text-green-400 font-bold">{campanha.taxaAbertura}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Engajamento</p>
                    <p className="text-blue-400 font-bold">{campanha.engajamento}%</p>
                  </div>
                </div>
                
                {campanha.iasAtivadas.length > 0 && (
                  <div>
                    <p className="text-slate-400 text-sm mb-2">IAs Ativadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {campanha.iasAtivadas.map((ia, index) => (
                        <Badge key={index} className="bg-blue-500/20 text-blue-400">
                          {ia.replace('_', ' ').toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComunicacaoMassa;
