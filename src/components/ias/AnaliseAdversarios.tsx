'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// // import { Textarea } from '@/components/ui/textarea';
import { 
  Eye, Target, TrendingUp, TrendingDown, Users, 
  AlertTriangle, CheckCircle, Clock, MessageSquare, Globe,
  Search, Filter, Plus, Settings, Play, Pause, Download
} from 'lucide-react';

interface AnaliseAdversariosProps {
  eleitorId?: string;
}

interface Adversario {
  id: string;
  nome: string;
  partido: string;
  cargo: string;
  intencaoVoto: number;
  variacao: number;
  tendencia: 'alta' | 'estavel' | 'baixa';
  forcas: string[];
  fraquezas: string[];
  ultimasAcoes: string[];
  ameacas: string[];
  oportunidades: string[];
  monitoramento: {
    redesSociais: boolean;
    noticias: boolean;
    eventos: boolean;
    discursos: boolean;
  };
  ultimaAtualizacao: string;
}

interface MovimentoAdversario {
  id: string;
  adversario: string;
  tipo: 'anuncio' | 'gafe' | 'proposta' | 'ataque' | 'evento';
  descricao: string;
  impacto: 'positivo' | 'negativo' | 'neutro';
  alcance: number;
  engajamento: number;
  timestamp: string;
  acoesRecomendadas: string[];
}

interface MonitoramentoCompetitivo {
  adversario: string;
  mencoes: number;
  sentimento: number;
  alcance: number;
  engajamento: number;
  ultimaMenção: string;
  tendencia: 'crescendo' | 'estavel' | 'diminuindo';
}

const AnaliseAdversarios = ({ eleitorId }: AnaliseAdversariosProps) => {
  const [adversarios, setAdversarios] = useState<Adversario[]>([]);
  const [movimentos, setMovimentos] = useState<MovimentoAdversario[]>([]);
  const [monitoramento, setMonitoramento] = useState<MonitoramentoCompetitivo[]>([]);
  const [estatisticas, setEstatisticas] = useState({
    totalAdversarios: 0,
    movimentosDetectados: 0,
    ameacasIdentificadas: 0,
    oportunidadesIdentificadas: 0,
    precisaoAnalise: 0
  });

  useEffect(() => {
    const adversariosMockados: Adversario[] = [
      {
        id: '1',
        nome: 'João Silva',
        partido: 'PT',
        cargo: 'Deputado Federal',
        intencaoVoto: 28,
        variacao: -2.3,
        tendencia: 'baixa',
        forcas: ['Base sólida no partido', 'Experiência política', 'Recursos financeiros'],
        fraquezas: ['Comunicação fraca', 'Escândalos recentes', 'Baixo engajamento digital'],
        ultimasAcoes: [
          'Anunciou proposta de "Tarifa Zero" no transporte',
          'Criticou gestão atual da saúde',
          'Participou de evento em Ceilândia'
        ],
        ameacas: ['Pode capitalizar em transporte público', 'Base forte em algumas regiões'],
        oportunidades: ['Proposta de transporte não é viável', 'Histórico de promessas não cumpridas'],
        monitoramento: {
          redesSociais: true,
          noticias: true,
          eventos: true,
          discursos: true
        },
        ultimaAtualizacao: '15 min atrás'
      },
      {
        id: '2',
        nome: 'Maria Santos',
        partido: 'PSDB',
        cargo: 'Deputada Federal',
        intencaoVoto: 15,
        variacao: 1.2,
        tendencia: 'estavel',
        forcas: ['Boa comunicação', 'Perfil técnico', 'Apoio empresarial'],
        fraquezas: ['Baixa identificação popular', 'Pouco tempo de TV', 'Campanha limitada'],
        ultimasAcoes: [
          'Lançou plano de saúde digital',
          'Visitou hospitais públicos',
          'Entrevista em programa matinal'
        ],
        ameacas: ['Pode atrair eleitores técnicos', 'Recursos para campanha'],
        oportunidades: ['Plano não é inovador', 'Pouco contato com base'],
        monitoramento: {
          redesSociais: true,
          noticias: true,
          eventos: false,
          discursos: true
        },
        ultimaAtualizacao: '2 horas atrás'
      },
      {
        id: '3',
        nome: 'Pedro Costa',
        partido: 'PSL',
        cargo: 'Deputado Federal',
        intencaoVoto: 12,
        variacao: -0.8,
        tendencia: 'baixa',
        forcas: ['Retórica agressiva', 'Base conservadora', 'Presença digital'],
        fraquezas: ['Polêmicas constantes', 'Falta de propostas', 'Rejeição alta'],
        ultimasAcoes: [
          'Atacou adversários nas redes sociais',
          'Prometeu "limpar a política"',
          'Participou de manifestação'
        ],
        ameacas: ['Pode mobilizar base conservadora', 'Agenda polarizada'],
        oportunidades: ['Rejeição alta', 'Falta de conteúdo'],
        monitoramento: {
          redesSociais: true,
          noticias: true,
          eventos: true,
          discursos: false
        },
        ultimaAtualizacao: '30 min atrás'
      }
    ];

    const movimentosMockados: MovimentoAdversario[] = [
      {
        id: '1',
        adversario: 'João Silva',
        tipo: 'anuncio',
        descricao: 'Anunciou proposta de "Tarifa Zero" no transporte público do DF',
        impacto: 'positivo',
        alcance: 8500,
        engajamento: 72,
        timestamp: '2 horas atrás',
        acoesRecomendadas: [
          'Preparar contra-argumento sobre viabilidade',
          'Destacar experiências negativas em outras cidades',
          'Apresentar proposta mais realista da Celina'
        ]
      },
      {
        id: '2',
        adversario: 'Pedro Costa',
        tipo: 'gafe',
        descricao: 'Cometeu gafe ao confundir dados sobre segurança pública',
        impacto: 'negativo',
        alcance: 12000,
        engajamento: 89,
        timestamp: '4 horas atrás',
        acoesRecomendadas: [
          'Capitalizar o erro nas redes sociais',
          'Destacar competência técnica da Celina',
          'Preparar campanha sobre importância do conhecimento'
        ]
      },
      {
        id: '3',
        adversario: 'Maria Santos',
        tipo: 'proposta',
        descricao: 'Lançou plano de saúde digital para o DF',
        impacto: 'neutro',
        alcance: 3200,
        engajamento: 45,
        timestamp: '6 horas atrás',
        acoesRecomendadas: [
          'Analisar viabilidade da proposta',
          'Comparar com realizações da Celina',
          'Identificar pontos de diferenciação'
        ]
      }
    ];

    const monitoramentoMockado: MonitoramentoCompetitivo[] = [
      {
        adversario: 'João Silva',
        mencoes: 245,
        sentimento: 65,
        alcance: 12500,
        engajamento: 78,
        ultimaMenção: '10 min atrás',
        tendencia: 'crescendo'
      },
      {
        adversario: 'Maria Santos',
        mencoes: 89,
        sentimento: 72,
        alcance: 4200,
        engajamento: 61,
        ultimaMenção: '1 hora atrás',
        tendencia: 'estavel'
      },
      {
        adversario: 'Pedro Costa',
        mencoes: 156,
        sentimento: 45,
        alcance: 8900,
        engajamento: 83,
        ultimaMenção: '5 min atrás',
        tendencia: 'diminuindo'
      }
    ];

    setAdversarios(adversariosMockados);
    setMovimentos(movimentosMockados);
    setMonitoramento(monitoramentoMockado);
    
    setEstatisticas({
      totalAdversarios: adversariosMockados.length,
      movimentosDetectados: movimentosMockados.length,
      ameacasIdentificadas: 5,
      oportunidadesIdentificadas: 8,
      precisaoAnalise: 94
    });
  }, []);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'anuncio': return 'bg-blue-500/20 text-blue-400';
      case 'gafe': return 'bg-red-500/20 text-red-400';
      case 'proposta': return 'bg-green-500/20 text-green-400';
      case 'ataque': return 'bg-orange-500/20 text-orange-400';
      case 'evento': return 'bg-purple-500/20 text-purple-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'anuncio': return 'Anúncio';
      case 'gafe': return 'Gafe';
      case 'proposta': return 'Proposta';
      case 'ataque': return 'Ataque';
      case 'evento': return 'Evento';
      default: return 'Desconhecido';
    }
  };

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case 'positivo': return 'bg-green-500/20 text-green-400';
      case 'negativo': return 'bg-red-500/20 text-red-400';
      case 'neutro': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getTendenciaColor = (tendencia: string) => {
    switch (tendencia) {
      case 'alta': return 'text-green-400';
      case 'estavel': return 'text-yellow-400';
      case 'baixa': return 'text-red-400';
      case 'crescendo': return 'text-green-400';
      case 'diminuindo': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'alta':
      case 'crescendo':
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case 'baixa':
      case 'diminuindo':
        return <TrendingDown className="h-4 w-4 text-red-400" />;
      default:
        return <div className="h-4 w-4 bg-yellow-400 rounded-full" />;
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
                <p className="text-sm text-slate-400">Adversários Monitorados</p>
                <p className="text-2xl font-bold text-white">{estatisticas.totalAdversarios}</p>
                <div className="flex items-center mt-1">
                  <Eye className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-sm text-blue-400">24/7</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Movimentos Detectados</p>
                <p className="text-2xl font-bold text-white">{estatisticas.movimentosDetectados}</p>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="h-4 w-4 text-orange-400 mr-1" />
                  <span className="text-sm text-orange-400">+3 hoje</span>
                </div>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Ameaças Identificadas</p>
                <p className="text-2xl font-bold text-white">{estatisticas.ameacasIdentificadas}</p>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="h-4 w-4 text-red-400 mr-1" />
                  <span className="text-sm text-red-400">2 críticas</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Precisão da Análise</p>
                <p className="text-2xl font-bold text-white">{estatisticas.precisaoAnalise}%</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Excelente</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Movimentos Recentes */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Movimentos dos Adversários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {movimentos.map((movimento) => (
              <div key={movimento.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">{movimento.adversario}</h4>
                    <p className="text-slate-400 text-sm">{movimento.timestamp}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTipoColor(movimento.tipo)}>
                      {getTipoLabel(movimento.tipo)}
                    </Badge>
                    <Badge className={getImpactoColor(movimento.impacto)}>
                      {movimento.impacto.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-white mb-4">{movimento.descricao}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Alcance</p>
                    <p className="text-white font-bold">{movimento.alcance.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Engajamento</p>
                    <p className="text-white font-bold">{movimento.engajamento}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Impacto</p>
                    <Badge className={getImpactoColor(movimento.impacto)}>
                      {movimento.impacto.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-slate-400 text-sm mb-2">Ações Recomendadas:</p>
                  <div className="space-y-2">
                    {movimento.acoesRecomendadas.map((acao, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{acao}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Target className="h-4 w-4 mr-2" />
                    Ação Imediata
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Monitorar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Relatório
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Análise dos Adversários */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Análise Competitiva
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {adversarios.map((adversario) => (
              <div key={adversario.id} className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-white font-semibold text-lg">{adversario.nome}</h4>
                    <p className="text-slate-400 text-sm">{adversario.partido} • {adversario.cargo}</p>
                    <p className="text-slate-400 text-sm">Última atualização: {adversario.ultimaAtualizacao}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{adversario.intencaoVoto}%</p>
                    <div className="flex items-center justify-center">
                      {getTendenciaIcon(adversario.tendencia)}
                      <span className={`text-sm ml-1 ${getTendenciaColor(adversario.tendencia)}`}>
                        {adversario.variacao > 0 ? '+' : ''}{adversario.variacao}%
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs">Intenção de Voto</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-white font-semibold mb-3">Forças</h5>
                    <div className="space-y-2">
                      {adversario.forcas.map((forca, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-slate-300 text-sm">{forca}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h5 className="text-white font-semibold mb-3 mt-4">Fraquezas</h5>
                    <div className="space-y-2">
                      {adversario.fraquezas.map((fraqueza, index) => (
                        <div key={index} className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-red-400 mr-2" />
                          <span className="text-slate-300 text-sm">{fraqueza}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-3">Ameaças</h5>
                    <div className="space-y-2">
                      {adversario.ameacas.map((ameaca, index) => (
                        <div key={index} className="flex items-center">
                          <AlertTriangle className="h-4 w-4 text-orange-400 mr-2" />
                          <span className="text-slate-300 text-sm">{ameaca}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h5 className="text-white font-semibold mb-3 mt-4">Oportunidades</h5>
                    <div className="space-y-2">
                      {adversario.oportunidades.map((oportunidade, index) => (
                        <div key={index} className="flex items-center">
                          <Target className="h-4 w-4 text-green-400 mr-2" />
                          <span className="text-slate-300 text-sm">{oportunidade}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h5 className="text-white font-semibold mb-3">Últimas Ações</h5>
                  <div className="space-y-2">
                    {adversario.ultimasAcoes.map((acao, index) => (
                      <div key={index} className="flex items-start">
                        <Clock className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{acao}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Relatório
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monitoramento em Tempo Real */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Monitoramento em Tempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monitoramento.map((item, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      {item.tendencia === 'crescendo' ? (
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      ) : item.tendencia === 'diminuindo' ? (
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                      ) : (
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{item.adversario}</h4>
                      <p className="text-slate-400 text-sm">Última menção: {item.ultimaMenção}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-slate-400 text-xs">Menções</p>
                      <p className="text-white font-bold">{item.mencoes}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-xs">Sentimento</p>
                      <p className={`font-bold ${item.sentimento > 60 ? 'text-green-400' : item.sentimento > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {item.sentimento}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-xs">Alcance</p>
                      <p className="text-white font-bold">{item.alcance.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-xs">Engajamento</p>
                      <p className="text-blue-400 font-bold">{item.engajamento}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-xs">Tendência</p>
                      <div className="flex items-center justify-center">
                        {getTendenciaIcon(item.tendencia)}
                        <span className={`text-sm ml-1 ${getTendenciaColor(item.tendencia)}`}>
                          {item.tendencia === 'crescendo' ? '↗' : item.tendencia === 'diminuindo' ? '↘' : '→'}
                        </span>
                      </div>
                    </div>
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

export default AnaliseAdversarios;
