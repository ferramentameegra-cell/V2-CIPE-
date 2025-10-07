'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, AlertTriangle, CheckCircle, Clock, TrendingUp, 
  Eye, Zap, Target, Users, MessageSquare, Globe, Search,
  Activity, Filter, Play, Pause, Settings
} from 'lucide-react';

interface BlindagemEstrategicaProps {
  eleitorId?: string;
}

interface Alerta {
  id: string;
  tipo: 'crise' | 'oportunidade' | 'ameaca' | 'info';
  titulo: string;
  descricao: string;
  severidade: 'baixa' | 'media' | 'alta' | 'critica';
  fonte: string;
  alcance: number;
  engajamento: number;
  sentimento: number;
  velocidade: number;
  timestamp: string;
  status: 'ativo' | 'monitorando' | 'resolvido';
  acoes: string[];
  iasAtivadas: string[];
}

interface Monitoramento {
  fonte: string;
  tipo: 'redes_sociais' | 'noticias' | 'foruns' | 'grupos_whatsapp';
  status: 'ativo' | 'pausado';
  ultimaVerificacao: string;
  alertasGerados: number;
  precisao: number;
}

const BlindagemEstrategica = ({ eleitorId }: BlindagemEstrategicaProps) => {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [monitoramentos, setMonitoramentos] = useState<Monitoramento[]>([]);
  const [estatisticas, setEstatisticas] = useState({
    alertasAtivos: 0,
    crisesDetectadas: 0,
    oportunidadesIdentificadas: 0,
    tempoRespostaMedio: 0,
    precisaoDeteccao: 0,
    fontesMonitoradas: 0
  });

  useEffect(() => {
    const alertasMockados: Alerta[] = [
      {
        id: '1',
        tipo: 'crise',
        titulo: 'Fake News sobre Corrupção',
        descricao: 'Detectado aumento de 300% em menções negativas sobre "falta de transparência" em grupos de WhatsApp de Taguatinga',
        severidade: 'critica',
        fonte: 'Grupos WhatsApp Taguatinga',
        alcance: 2500,
        engajamento: 45,
        sentimento: -85,
        velocidade: 8.5,
        timestamp: '5 min atrás',
        status: 'ativo',
        acoes: ['Resposta oficial da Celina', 'Campanha de esclarecimento', 'Contato com líderes locais'],
        iasAtivadas: ['clone_digital', 'comunicacao', 'narrativa_regional']
      },
      {
        id: '2',
        tipo: 'oportunidade',
        titulo: 'Adversário com Gafe Pública',
        descricao: 'Adversário X cometeu gafe sobre transporte público. Repercussão negativa crescente. Oportunidade de capitalização.',
        severidade: 'alta',
        fonte: 'Redes Sociais',
        alcance: 8500,
        engajamento: 72,
        sentimento: -65,
        velocidade: 6.2,
        timestamp: '15 min atrás',
        status: 'ativo',
        acoes: ['Posicionamento da Celina', 'Campanha comparativa', 'Engajamento direto'],
        iasAtivadas: ['adversarios', 'clone_digital', 'comunicacao']
      },
      {
        id: '3',
        tipo: 'ameaca',
        titulo: 'Tentativa de Ataque Coordenado',
        descricao: 'Identificado possível ataque coordenado em grupos de oposição. Preparação de narrativa negativa sobre saúde.',
        severidade: 'alta',
        fonte: 'Foruns de Discussão',
        alcance: 1200,
        engajamento: 23,
        sentimento: -45,
        velocidade: 4.1,
        timestamp: '30 min atrás',
        status: 'monitorando',
        acoes: ['Preparar contra-narrativa', 'Monitorar evolução', 'Alertar equipe'],
        iasAtivadas: ['adversarios', 'blindagem', 'comunicacao']
      },
      {
        id: '4',
        tipo: 'info',
        titulo: 'Crescimento de Menções Positivas',
        descricao: 'Aumento de 25% em menções positivas sobre realização em saúde. Oportunidade de amplificar narrativa.',
        severidade: 'baixa',
        fonte: 'Instagram',
        alcance: 4200,
        engajamento: 89,
        sentimento: 78,
        velocidade: 2.3,
        timestamp: '1 hora atrás',
        status: 'resolvido',
        acoes: ['Campanha de amplificação', 'Compartilhamento de resultados'],
        iasAtivadas: ['comunicacao', 'narrativa_regional']
      }
    ];

    const monitoramentosMockados: Monitoramento[] = [
      {
        fonte: 'Instagram Oficial',
        tipo: 'redes_sociais',
        status: 'ativo',
        ultimaVerificacao: '2 min atrás',
        alertasGerados: 12,
        precisao: 94
      },
      {
        fonte: 'Grupos WhatsApp DF',
        tipo: 'grupos_whatsapp',
        status: 'ativo',
        ultimaVerificacao: '5 min atrás',
        alertasGerados: 8,
        precisao: 87
      },
      {
        fonte: 'Twitter Brasil',
        tipo: 'redes_sociais',
        status: 'ativo',
        ultimaVerificacao: '3 min atrás',
        alertasGerados: 15,
        precisao: 91
      },
      {
        fonte: 'Facebook Político',
        tipo: 'redes_sociais',
        status: 'ativo',
        ultimaVerificacao: '4 min atrás',
        alertasGerados: 6,
        precisao: 89
      },
      {
        fonte: 'Portais de Notícias',
        tipo: 'noticias',
        status: 'ativo',
        ultimaVerificacao: '1 min atrás',
        alertasGerados: 4,
        precisao: 96
      }
    ];

    setAlertas(alertasMockados);
    setMonitoramentos(monitoramentosMockados);
    
    setEstatisticas({
      alertasAtivos: 3,
      crisesDetectadas: 1,
      oportunidadesIdentificadas: 1,
      tempoRespostaMedio: 4.2,
      precisaoDeteccao: 92,
      fontesMonitoradas: 15
    });
  }, []);

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'crise': return 'bg-red-500/20 text-red-400';
      case 'oportunidade': return 'bg-green-500/20 text-green-400';
      case 'ameaca': return 'bg-orange-500/20 text-orange-400';
      case 'info': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'crise': return 'Crise';
      case 'oportunidade': return 'Oportunidade';
      case 'ameaca': return 'Ameaça';
      case 'info': return 'Informação';
      default: return 'Desconhecido';
    }
  };

  const getSeveridadeColor = (severidade: string) => {
    switch (severidade) {
      case 'critica': return 'bg-red-500';
      case 'alta': return 'bg-orange-500';
      case 'media': return 'bg-yellow-500';
      case 'baixa': return 'bg-green-500';
      default: return 'bg-slate-500';
    }
  };

  const getSentimentoColor = (sentimento: number) => {
    if (sentimento > 50) return 'text-green-400';
    if (sentimento > 0) return 'text-yellow-400';
    if (sentimento > -50) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="h-full w-full p-6 space-y-6 overflow-y-auto">
      {/* Header com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Alertas Ativos</p>
                <p className="text-2xl font-bold text-white">{estatisticas.alertasAtivos}</p>
                <div className="flex items-center mt-1">
                  <AlertTriangle className="h-4 w-4 text-red-400 mr-1" />
                  <span className="text-sm text-red-400">1 crítico</span>
                </div>
              </div>
              <Shield className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Crises Detectadas</p>
                <p className="text-2xl font-bold text-white">{estatisticas.crisesDetectadas}</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 text-red-400 mr-1" />
                  <span className="text-sm text-red-400">Tempo real</span>
                </div>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Oportunidades</p>
                <p className="text-2xl font-bold text-white">{estatisticas.oportunidadesIdentificadas}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+1 hoje</span>
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
                <p className="text-sm text-slate-400">Precisão</p>
                <p className="text-2xl font-bold text-white">{estatisticas.precisaoDeteccao}%</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Excelente</span>
                </div>
              </div>
              <Eye className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Críticos */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Alertas em Tempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertas.map((alerta) => (
              <div key={alerta.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getSeveridadeColor(alerta.severidade)}`}></div>
                    <div>
                      <h4 className="text-white font-semibold">{alerta.titulo}</h4>
                      <p className="text-slate-400 text-sm">{alerta.fonte} • {alerta.timestamp}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getTipoColor(alerta.tipo)}>
                      {getTipoLabel(alerta.tipo)}
                    </Badge>
                    <Badge className={`bg-${alerta.severidade === 'critica' ? 'red' : alerta.severidade === 'alta' ? 'orange' : 'yellow'}-500/20 text-${alerta.severidade === 'critica' ? 'red' : alerta.severidade === 'alta' ? 'orange' : 'yellow'}-400`}>
                      {alerta.severidade.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-white mb-4">{alerta.descricao}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Alcance</p>
                    <p className="text-white font-bold">{alerta.alcance.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Engajamento</p>
                    <p className="text-white font-bold">{alerta.engajamento}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Sentimento</p>
                    <p className={`font-bold ${getSentimentoColor(alerta.sentimento)}`}>
                      {alerta.sentimento > 0 ? '+' : ''}{alerta.sentimento}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-slate-400 text-xs">Velocidade</p>
                    <p className="text-white font-bold">{alerta.velocidade}/10</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-slate-400 text-sm mb-2">Ações Recomendadas:</p>
                  <div className="flex flex-wrap gap-2">
                    {alerta.acoes.map((acao, index) => (
                      <Badge key={index} className="bg-blue-500/20 text-blue-400">
                        {acao}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {alerta.iasAtivadas.length > 0 && (
                  <div className="mb-4">
                    <p className="text-slate-400 text-sm mb-2">IAs Ativadas:</p>
                    <div className="flex flex-wrap gap-2">
                      {alerta.iasAtivadas.map((ia, index) => (
                        <Badge key={index} className="bg-green-500/20 text-green-400">
                          {ia.replace('_', ' ').toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Ação Imediata
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Monitorar
                  </Button>
                  <Button size="sm" variant="outline">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolver
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monitoramento de Fontes */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Monitoramento de Fontes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monitoramentos.map((monitoramento, index) => (
              <div key={index} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      {monitoramento.status === 'ativo' ? (
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      ) : (
                        <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{monitoramento.fonte}</h4>
                      <p className="text-slate-400 text-sm capitalize">
                        {monitoramento.tipo.replace('_', ' ')} • Última verificação: {monitoramento.ultimaVerificacao}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-slate-400 text-xs">Alertas</p>
                      <p className="text-white font-bold">{monitoramento.alertasGerados}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-400 text-xs">Precisão</p>
                      <p className="text-green-400 font-bold">{monitoramento.precisao}%</p>
                    </div>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        {monitoramento.status === 'ativo' ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas de Proteção */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Estatísticas de Proteção
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-3">
                <Shield className="h-8 w-8 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Proteção Ativa</h3>
              <p className="text-3xl font-bold text-red-400">24/7</p>
              <p className="text-slate-400 text-sm">Monitoramento contínuo</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Crises Evitadas</h3>
              <p className="text-3xl font-bold text-green-400">12</p>
              <p className="text-slate-400 text-sm">Esta semana</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Tempo de Resposta</h3>
              <p className="text-3xl font-bold text-blue-400">{estatisticas.tempoRespostaMedio}min</p>
              <p className="text-slate-400 text-sm">Média geral</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlindagemEstrategica;
