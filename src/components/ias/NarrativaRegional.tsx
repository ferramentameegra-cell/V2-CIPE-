'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, MessageSquare, Target, TrendingUp, Users, 
  Globe, Send, BarChart3, Clock, CheckCircle, AlertTriangle,
  Filter, Plus, Settings, Eye
} from 'lucide-react';

interface NarrativaRegionalProps {
  eleitorId?: string;
}

interface Regiao {
  nome: string;
  codigo: string;
  populacao: number;
  eleitoresAtivos: number;
  engajamento: number;
  pautasPrioritarias: string[];
  realizacoes: string[];
  liderancas: string[];
  narrativaAtiva: string;
  mensagensPersonalizadas: number;
}

interface MensagemRegional {
  id: string;
  regiao: string;
  pauta: string;
  mensagem: string;
  alcance: number;
  engajamento: number;
  timestamp: string;
  status: 'ativa' | 'pausada' | 'concluida';
}

const NarrativaRegional = ({ eleitorId }: NarrativaRegionalProps) => {
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [mensagens, setMensagens] = useState<MensagemRegional[]>([]);
  const [regiaoSelecionada, setRegiaoSelecionada] = useState<string>('');
  const [estatisticas, setEstatisticas] = useState({
    totalRegioes: 0,
    mensagensAtivas: 0,
    alcanceTotal: 0,
    engajamentoMedio: 0,
    pautasCobertas: 0
  });

  useEffect(() => {
    const regioesMockadas: Regiao[] = [
      {
        nome: 'Ceilândia',
        codigo: 'CEI',
        populacao: 398374,
        eleitoresAtivos: 4200,
        engajamento: 82,
        pautasPrioritarias: ['Segurança', 'Saúde', 'Transporte'],
        realizacoes: ['R$ 2,3 mi para nova UBS', '15 viaturas policiais', 'Melhoria no transporte'],
        liderancas: ['João da Associação', 'Maria do Comércio', 'Pedro do Esporte'],
        narrativaAtiva: 'Ceilândia merece respeito e investimento. Cada real que destinei aqui foi pensado nas necessidades reais da comunidade.',
        mensagensPersonalizadas: 156
      },
      {
        nome: 'Taguatinga',
        codigo: 'TAG',
        populacao: 221747,
        eleitoresAtivos: 3800,
        engajamento: 78,
        pautasPrioritarias: ['Educação', 'Saúde', 'Comércio'],
        realizacoes: ['R$ 1,8 mi para escolas', 'Ampliação do hospital', 'Apoio ao comércio local'],
        liderancas: ['Ana da Educação', 'Carlos do Comércio', 'Lúcia da Saúde'],
        narrativaAtiva: 'Taguatinga é o coração do DF. Aqui investi pesado em educação e saúde, porque é o futuro que importa.',
        mensagensPersonalizadas: 134
      },
      {
        nome: 'Sobradinho',
        codigo: 'SOB',
        populacao: 128814,
        eleitoresAtivos: 2100,
        engajamento: 75,
        pautasPrioritarias: ['Transporte', 'Saúde', 'Urbanização'],
        realizacoes: ['R$ 1,2 mi para transporte', 'Nova UBS', 'Pavimentação de ruas'],
        liderancas: ['Roberto do Transporte', 'Fernanda da Saúde', 'José da Urbanização'],
        narrativaAtiva: 'Sobradinho cresce com dignidade. Cada investimento aqui é pensado no bem-estar da família sobraense.',
        mensagensPersonalizadas: 98
      },
      {
        nome: 'Gama',
        codigo: 'GAM',
        populacao: 127121,
        eleitoresAtivos: 1900,
        engajamento: 73,
        pautasPrioritarias: ['Esporte', 'Cultura', 'Meio Ambiente'],
        realizacoes: ['R$ 800 mil para esporte', 'Centro cultural', 'Projeto ambiental'],
        liderancas: ['Miguel do Esporte', 'Rita da Cultura', 'Paulo do Meio Ambiente'],
        narrativaAtiva: 'Gama tem potencial incrível. Investir em esporte e cultura é investir na juventude e no futuro.',
        mensagensPersonalizadas: 87
      }
    ];

    const mensagensMockadas: MensagemRegional[] = [
      {
        id: '1',
        regiao: 'Ceilândia',
        pauta: 'Segurança',
        mensagem: 'Ceilândia, vocês viram o aumento do policiamento? Consegui mais 15 viaturas pra região! A segurança de vocês é minha prioridade. Como está a sensação de segurança por aí?',
        alcance: 3500,
        engajamento: 84,
        timestamp: '2 horas atrás',
        status: 'ativa'
      },
      {
        id: '2',
        regiao: 'Taguatinga',
        pauta: 'Educação',
        mensagem: 'Taguatinga, a educação dos nossos filhos não pode esperar! Destinei R$ 1,8 milhão para melhorar as escolas da região. Qual escola mais precisa de atenção?',
        alcance: 2800,
        engajamento: 76,
        timestamp: '4 horas atrás',
        status: 'ativa'
      },
      {
        id: '3',
        regiao: 'Sobradinho',
        pauta: 'Transporte',
        mensagem: 'Sobradinho, transporte público é direito de todos! R$ 1,2 milhão em melhorias já aprovadas. Que linha mais precisa de atenção?',
        alcance: 2100,
        engajamento: 71,
        timestamp: '6 horas atrás',
        status: 'concluida'
      }
    ];

    setRegioes(regioesMockadas);
    setMensagens(mensagensMockadas);
    
    setEstatisticas({
      totalRegioes: regioesMockadas.length,
      mensagensAtivas: mensagensMockadas.filter(m => m.status === 'ativa').length,
      alcanceTotal: mensagensMockadas.reduce((acc, m) => acc + m.alcance, 0),
      engajamentoMedio: Math.round(mensagensMockadas.reduce((acc, m) => acc + m.engajamento, 0) / mensagensMockadas.length),
      pautasCobertas: new Set(mensagensMockadas.map(m => m.pauta)).size
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativa': return 'bg-green-500/20 text-green-400';
      case 'pausada': return 'bg-yellow-500/20 text-yellow-400';
      case 'concluida': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ativa': return 'Ativa';
      case 'pausada': return 'Pausada';
      case 'concluida': return 'Concluída';
      default: return 'Desconhecido';
    }
  };

  const regiaoSelecionadaData = regioes.find(r => r.nome === regiaoSelecionada);

  return (
    <div className="h-full w-full p-6 space-y-6 overflow-y-auto">
      {/* Header com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Regiões Ativas</p>
                <p className="text-2xl font-bold text-white">{estatisticas.totalRegioes}</p>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">100% DF</span>
                </div>
              </div>
              <Globe className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Mensagens Ativas</p>
                <p className="text-2xl font-bold text-white">{estatisticas.mensagensAtivas}</p>
                <div className="flex items-center mt-1">
                  <MessageSquare className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+2 hoje</span>
                </div>
              </div>
              <Send className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Alcance Total</p>
                <p className="text-2xl font-bold text-white">{estatisticas.alcanceTotal.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <Users className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-sm text-blue-400">+12%</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Engajamento Médio</p>
                <p className="text-2xl font-bold text-white">{estatisticas.engajamentoMedio}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Excelente</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seleção de Região */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Narrativas por Região
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <label className="text-white font-medium">Selecione uma região:</label>
            <select
              value={regiaoSelecionada}
              onChange={(e) => setRegiaoSelecionada(e.target.value)}
              className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white min-w-[200px]"
            >
              <option value="">Todas as regiões</option>
              {regioes.map((regiao) => (
                <option key={regiao.codigo} value={regiao.nome}>
                  {regiao.nome} ({regiao.eleitoresAtivos} eleitores)
                </option>
              ))}
            </select>
          </div>

          {regiaoSelecionadaData && (
            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold text-lg mb-4">{regiaoSelecionadaData.nome}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Eleitores Ativos</span>
                      <span className="text-white font-semibold">{regiaoSelecionadaData.eleitoresAtivos.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Engajamento</span>
                      <span className="text-green-400 font-semibold">{regiaoSelecionadaData.engajamento}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Mensagens Personalizadas</span>
                      <span className="text-blue-400 font-semibold">{regiaoSelecionadaData.mensagensPersonalizadas}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-semibold mb-3">Narrativa Ativa</h4>
                  <p className="text-slate-300 italic mb-4">"{regiaoSelecionadaData.narrativaAtiva}"</p>
                  
                  <h4 className="text-white font-semibold mb-3">Pautas Prioritárias</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {regiaoSelecionadaData.pautasPrioritarias.map((pauta, index) => (
                      <Badge key={index} className="bg-blue-500/20 text-blue-400">
                        {pauta}
                      </Badge>
                    ))}
                  </div>
                  
                  <h4 className="text-white font-semibold mb-3">Principais Realizações</h4>
                  <div className="space-y-2">
                    {regiaoSelecionadaData.realizacoes.map((realizacao, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-slate-300 text-sm">{realizacao}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Regiões Disponíveis */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Regiões Administrativas do DF
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regioes.map((regiao) => (
              <div key={regiao.codigo} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600 hover:bg-slate-700/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-semibold">{regiao.nome}</h4>
                  <Badge className="bg-blue-500/20 text-blue-400">
                    {regiao.eleitoresAtivos} eleitores
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Engajamento</span>
                    <span className="text-green-400 font-semibold">{regiao.engajamento}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Mensagens</span>
                    <span className="text-blue-400 font-semibold">{regiao.mensagensPersonalizadas}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-slate-400 text-sm mb-2">Pautas Prioritárias:</p>
                  <div className="flex flex-wrap gap-1">
                    {regiao.pautasPrioritarias.slice(0, 3).map((pauta, index) => (
                      <Badge key={index} className="bg-slate-600/50 text-slate-300 text-xs">
                        {pauta}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setRegiaoSelecionada(regiao.nome)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mensagens Regionais */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Mensagens Regionalizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mensagens.map((mensagem) => (
              <div key={mensagem.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">{mensagem.regiao} - {mensagem.pauta}</h4>
                    <p className="text-slate-400 text-sm">{mensagem.timestamp}</p>
                  </div>
                  <Badge className={getStatusColor(mensagem.status)}>
                    {getStatusLabel(mensagem.status)}
                  </Badge>
                </div>
                
                <p className="text-white mb-4 bg-slate-700/50 rounded p-3">
                  {mensagem.mensagem}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Alcance</p>
                    <p className="text-white font-bold">{mensagem.alcance.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Engajamento</p>
                    <p className="text-green-400 font-bold">{mensagem.engajamento}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Status</p>
                    <Badge className={getStatusColor(mensagem.status)}>
                      {getStatusLabel(mensagem.status)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NarrativaRegional;
