'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
import { 
  BarChart3, Target, Users, TrendingUp, MessageSquare, 
  Clock, CheckCircle, AlertTriangle, Send, Filter, Plus,
  Eye, Download, Settings, Play, Pause
} from 'lucide-react';

interface PesquisasAutomatizadasProps {
  eleitorId?: string;
}

interface Pesquisa {
  id: string;
  titulo: string;
  tipo: 'intencao_voto' | 'satisfacao' | 'prioridades' | 'opiniao';
  status: 'ativa' | 'pausada' | 'concluida' | 'programada';
  segmento: string;
  totalRespostas: number;
  metaRespostas: number;
  taxaResposta: number;
  confiabilidade: number;
  iniciadaEm: string;
  duracaoEstimada: string;
  resultados: {
    pergunta: string;
    opcoes: { texto: string; votos: number; percentual: number }[];
  }[];
  insights: string[];
}

interface ResultadoPesquisa {
  categoria: string;
  valor: number;
  tendencia: 'alta' | 'estavel' | 'baixa';
  variacao: number;
}

const PesquisasAutomatizadas = ({ eleitorId }: PesquisasAutomatizadasProps) => {
  const [pesquisas, setPesquisas] = useState<Pesquisa[]>([]);
  const [resultados, setResultados] = useState<ResultadoPesquisa[]>([]);
  const [estatisticas, setEstatisticas] = useState({
    totalPesquisas: 0,
    pesquisasAtivas: 0,
    totalRespostas: 0,
    taxaRespostaMedia: 0,
    confiabilidadeMedia: 0
  });

  useEffect(() => {
    const pesquisasMockadas: Pesquisa[] = [
      {
        id: '1',
        titulo: 'Prioridades para 2025 - Ceilândia',
        tipo: 'prioridades',
        status: 'ativa',
        segmento: 'Moradores de Ceilândia',
        totalRespostas: 1247,
        metaRespostas: 2000,
        taxaResposta: 62,
        confiabilidade: 89,
        iniciadaEm: '2 horas atrás',
        duracaoEstimada: '3 dias restantes',
        resultados: [
          {
            pergunta: 'Qual sua maior preocupação para 2025?',
            opcoes: [
              { texto: 'Segurança Pública', votos: 498, percentual: 40 },
              { texto: 'Saúde', votos: 374, percentual: 30 },
              { texto: 'Educação', votos: 249, percentual: 20 },
              { texto: 'Transporte', votos: 126, percentual: 10 }
            ]
          },
          {
            pergunta: 'Como avalia as realizações da Celina?',
            opcoes: [
              { texto: 'Excelente', votos: 623, percentual: 50 },
              { texto: 'Boa', votos: 374, percentual: 30 },
              { texto: 'Regular', votos: 187, percentual: 15 },
              { texto: 'Ruim', votos: 63, percentual: 5 }
            ]
          }
        ],
        insights: [
          'Segurança continua sendo prioridade #1 em Ceilândia',
          '50% dos eleitores avaliam positivamente as realizações',
          'Taxa de resposta está acima da média regional'
        ]
      },
      {
        id: '2',
        titulo: 'Intenção de Voto - DF',
        tipo: 'intencao_voto',
        status: 'concluida',
        segmento: 'Eleitores do DF',
        totalRespostas: 5420,
        metaRespostas: 5000,
        taxaResposta: 108,
        confiabilidade: 94,
        iniciadaEm: '1 semana atrás',
        duracaoEstimada: 'Concluída',
        resultados: [
          {
            pergunta: 'Em quem você votaria para Deputada Federal?',
            opcoes: [
              { texto: 'Celina Leão', votos: 2710, percentual: 50 },
              { texto: 'Candidato A', votos: 1626, percentual: 30 },
              { texto: 'Candidato B', votos: 814, percentual: 15 },
              { texto: 'Outros/Nulo', votos: 270, percentual: 5 }
            ]
          }
        ],
        insights: [
          'Celina lidera com 50% das intenções de voto',
          'Crescimento de 5% em relação à pesquisa anterior',
          'Aprovação estável em todas as regiões do DF'
        ]
      },
      {
        id: '3',
        titulo: 'Satisfação com Serviços Públicos',
        tipo: 'satisfacao',
        status: 'programada',
        segmento: 'Usuários de Serviços Públicos',
        totalRespostas: 0,
        metaRespostas: 1500,
        taxaResposta: 0,
        confiabilidade: 0,
        iniciadaEm: 'Programada para amanhã',
        duracaoEstimada: '5 dias',
        resultados: [],
        insights: []
      }
    ];

    const resultadosMockados: ResultadoPesquisa[] = [
      {
        categoria: 'Intenção de Voto',
        valor: 50,
        tendencia: 'alta',
        variacao: 5.2
      },
      {
        categoria: 'Aprovação Geral',
        valor: 78,
        tendencia: 'estavel',
        variacao: 1.1
      },
      {
        categoria: 'Confiança',
        valor: 65,
        tendencia: 'alta',
        variacao: 3.8
      },
      {
        categoria: 'Satisfação com Realizações',
        valor: 82,
        tendencia: 'alta',
        variacao: 4.5
      }
    ];

    setPesquisas(pesquisasMockadas);
    setResultados(resultadosMockados);
    
    setEstatisticas({
      totalPesquisas: 12,
      pesquisasAtivas: 3,
      totalRespostas: 15670,
      taxaRespostaMedia: 73,
      confiabilidadeMedia: 87
    });
  }, []);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'intencao_voto': return 'bg-blue-500/20 text-blue-400';
      case 'satisfacao': return 'bg-green-500/20 text-green-400';
      case 'prioridades': return 'bg-purple-500/20 text-purple-400';
      case 'opiniao': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'intencao_voto': return 'Intenção de Voto';
      case 'satisfacao': return 'Satisfação';
      case 'prioridades': return 'Prioridades';
      case 'opiniao': return 'Opinião';
      default: return 'Desconhecido';
    }
  };

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

  const getTendenciaColor = (tendencia: string) => {
    switch (tendencia) {
      case 'alta': return 'text-green-400';
      case 'estavel': return 'text-yellow-400';
      case 'baixa': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="h-full w-full p-6 space-y-6 overflow-y-auto">
      {/* Header com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total de Pesquisas</p>
                <p className="text-2xl font-bold text-white">{estatisticas.totalPesquisas}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+2 esta semana</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Pesquisas Ativas</p>
                <p className="text-2xl font-bold text-white">{estatisticas.pesquisasAtivas}</p>
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
                <p className="text-sm text-slate-400">Total de Respostas</p>
                <p className="text-2xl font-bold text-white">{estatisticas.totalRespostas.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <Users className="h-4 w-4 text-blue-400 mr-1" />
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
                <p className="text-sm text-slate-400">Taxa de Resposta</p>
                <p className="text-2xl font-bold text-white">{estatisticas.taxaRespostaMedia}%</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Excelente</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resultados Gerais */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Indicadores Principais
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resultados.map((resultado, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600 text-center">
                <h4 className="text-white font-semibold mb-2">{resultado.categoria}</h4>
                <p className="text-3xl font-bold text-white mb-2">{resultado.valor}%</p>
                <div className="flex items-center justify-center">
                  <span className={`text-sm ${getTendenciaColor(resultado.tendencia)}`}>
                    {resultado.tendencia === 'alta' ? '↗' : resultado.tendencia === 'baixa' ? '↘' : '→'} 
                    {resultado.variacao > 0 ? '+' : ''}{resultado.variacao}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pesquisas Ativas */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Pesquisas em Andamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {pesquisas.map((pesquisa) => (
              <div key={pesquisa.id} className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-white font-semibold text-lg">{pesquisa.titulo}</h4>
                    <p className="text-slate-400 text-sm">{pesquisa.segmento}</p>
                    <p className="text-slate-400 text-sm">{pesquisa.iniciadaEm} • {pesquisa.duracaoEstimada}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTipoColor(pesquisa.tipo)}>
                      {getTipoLabel(pesquisa.tipo)}
                    </Badge>
                    <Badge className={getStatusColor(pesquisa.status)}>
                      {getStatusLabel(pesquisa.status)}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Respostas</p>
                    <p className="text-white font-bold">{pesquisa.totalRespostas.toLocaleString()}</p>
                    <p className="text-slate-400 text-xs">Meta: {pesquisa.metaRespostas.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Taxa de Resposta</p>
                    <p className="text-green-400 font-bold">{pesquisa.taxaResposta}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Confiabilidade</p>
                    <p className="text-blue-400 font-bold">{pesquisa.confiabilidade}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Progresso</p>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(pesquisa.totalRespostas / pesquisa.metaRespostas) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {pesquisa.resultados.length > 0 && (
                  <div className="space-y-4">
                    {pesquisa.resultados.map((resultado, index) => (
                      <div key={index} className="bg-slate-700/50 rounded-lg p-4">
                        <h5 className="text-white font-semibold mb-3">{resultado.pergunta}</h5>
                        <div className="space-y-2">
                          {resultado.opcoes.map((opcao, opcaoIndex) => (
                            <div key={opcaoIndex} className="flex items-center justify-between">
                              <span className="text-slate-300 text-sm">{opcao.texto}</span>
                              <div className="flex items-center space-x-3">
                                <div className="w-32 bg-slate-600 rounded-full h-2">
                                  <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${opcao.percentual}%` }}
                                  ></div>
                                </div>
                                <span className="text-white font-semibold text-sm w-12 text-right">
                                  {opcao.percentual}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {pesquisa.insights.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-white font-semibold mb-3">Insights Automáticos</h5>
                    <div className="space-y-2">
                      {pesquisa.insights.map((insight, index) => (
                        <div key={index} className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-300 text-sm">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 mt-4">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Criar Nova Pesquisa */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Criar Nova Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium">Título da Pesquisa</label>
                <Input placeholder="Ex: Prioridades para 2025 - Taguatinga" />
              </div>
              
              <div>
                <label className="text-white text-sm font-medium">Tipo</label>
                <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white">
                  <option value="intencao_voto">Intenção de Voto</option>
                  <option value="satisfacao">Satisfação</option>
                  <option value="prioridades">Prioridades</option>
                  <option value="opiniao">Opinião</option>
                </select>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium">Segmento</label>
                <Input placeholder="Ex: Moradores de Taguatinga" />
              </div>
              
              <div>
                <label className="text-white text-sm font-medium">Meta de Respostas</label>
                <Input type="number" placeholder="1500" />
              </div>
            </div>
            
            <div>
              <label className="text-white text-sm font-medium">Pergunta Principal</label>
              <textarea 
                placeholder="Ex: Qual sua maior preocupação para 2025?"
                className="min-h-[100px] mb-4"
              />
              
              <div className="space-y-2 mb-4">
                <Input placeholder="Opção 1: Segurança Pública" />
                <Input placeholder="Opção 2: Saúde" />
                <Input placeholder="Opção 3: Educação" />
                <Input placeholder="Opção 4: Transporte" />
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Criar Pesquisa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PesquisasAutomatizadas;
