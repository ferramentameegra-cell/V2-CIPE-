'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
// import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, MessageSquare, Send, Brain, Clock, CheckCircle, 
  AlertTriangle, TrendingUp, Users, Target
} from 'lucide-react';

interface CloneDigitalProps {
  eleitorId?: string;
}

interface Conversa {
  id: string;
  eleitor: string;
  mensagem: string;
  resposta: string;
  timestamp: string;
  sentimento: 'positivo' | 'neutro' | 'negativo';
  iasAtivadas: string[];
}

const CloneDigital = ({ eleitorId }: CloneDigitalProps) => {
  const [conversas, setConversas] = useState<Conversa[]>([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [isProcessando, setIsProcessando] = useState(false);
  const [estatisticas, setEstatisticas] = useState({
    totalConversas: 0,
    taxaResposta: 0,
    tempoMedioResposta: 0,
    satisfacao: 0,
    iasAtivadas: 0
  });

  // Dados mockados
  useEffect(() => {
    const conversasMockadas: Conversa[] = [
      {
        id: '1',
        eleitor: 'João Silva - Ceilândia',
        mensagem: 'Celina, o que você pensa sobre segurança em Ceilândia?',
        resposta: 'João, essa questão me tira o sono também. Tô sempre cobrando mais policiamento em Ceilândia. Consegui R$ 2,3 mi em emendas pra região. Você tem visto alguma melhora por aí?',
        timestamp: '2 min atrás',
        sentimento: 'positivo',
        iasAtivadas: ['narrativa_regional', 'blindagem']
      },
      {
        id: '2',
        eleitor: 'Maria Santos - Taguatinga',
        mensagem: 'Qual sua proposta para melhorar a saúde pública?',
        resposta: 'Maria, saúde é prioridade máxima! Já destinei R$ 5,2 milhões em emendas para hospitais e UBSs. Minha meta é garantir que toda família tenha acesso rápido a médico. O que mais te preocupa na saúde?',
        timestamp: '5 min atrás',
        sentimento: 'positivo',
        iasAtivadas: ['comunicacao', 'pesquisas']
      },
      {
        id: '3',
        eleitor: 'Pedro Costa - Sobradinho',
        mensagem: 'Vi uma notícia sobre corrupção no seu partido...',
        resposta: 'Pedro, entendo sua preocupação. A transparência é fundamental pra mim. Todos os recursos que destinei são auditados e divulgados publicamente. Quer que eu te mostre onde consultar? Transparência total é meu compromisso.',
        timestamp: '8 min atrás',
        sentimento: 'neutro',
        iasAtivadas: ['blindagem', 'adversarios']
      }
    ];

    setConversas(conversasMockadas);
    setEstatisticas({
      totalConversas: 1247,
      taxaResposta: 94,
      tempoMedioResposta: 2.3,
      satisfacao: 87,
      iasAtivadas: 6
    });
  }, []);

  const getSentimentoColor = (sentimento: string) => {
    switch (sentimento) {
      case 'positivo': return 'bg-green-500/20 text-green-400';
      case 'neutro': return 'bg-yellow-500/20 text-yellow-400';
      case 'negativo': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getSentimentoLabel = (sentimento: string) => {
    switch (sentimento) {
      case 'positivo': return 'Positivo';
      case 'neutro': return 'Neutro';
      case 'negativo': return 'Negativo';
      default: return 'Desconhecido';
    }
  };

  const processarMensagem = async () => {
    if (!novaMensagem.trim()) return;
    
    setIsProcessando(true);
    
    // Simular processamento
    setTimeout(() => {
      const novaConversa: Conversa = {
        id: Date.now().toString(),
        eleitor: 'Eleitor Teste',
        mensagem: novaMensagem,
        resposta: 'Esta é uma resposta gerada pelo Clone Digital da Celina. A IA analisou sua mensagem e gerou uma resposta personalizada no tom e estilo da deputada.',
        timestamp: 'Agora',
        sentimento: 'positivo',
        iasAtivadas: ['narrativa_regional', 'comunicacao']
      };
      
      setConversas(prev => [novaConversa, ...prev]);
      setNovaMensagem('');
      setIsProcessando(false);
    }, 2000);
  };

  return (
    <div className="h-full w-full p-6 space-y-6 overflow-y-auto">
      {/* Header com Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total de Conversas</p>
                <p className="text-2xl font-bold text-white">{estatisticas.totalConversas.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+12%</span>
                </div>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Taxa de Resposta</p>
                <p className="text-2xl font-bold text-white">{estatisticas.taxaResposta}%</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Excelente</span>
                </div>
              </div>
              <Bot className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Tempo Médio</p>
                <p className="text-2xl font-bold text-white">{estatisticas.tempoMedioResposta}s</p>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-sm text-blue-400">Rápido</span>
                </div>
              </div>
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Satisfação</p>
                <p className="text-2xl font-bold text-white">{estatisticas.satisfacao}%</p>
                <div className="flex items-center mt-1">
                  <Target className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">Alta</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interface de Chat */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            Clone Digital da Celina Leão
          </CardTitle>
          <p className="text-slate-400 text-sm">
            IA especializada em responder como a própria Celina, mantendo sua personalidade, valores e posicionamentos.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <textarea
                placeholder="Digite uma mensagem para testar o Clone Digital..."
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                className="flex-1 min-h-[100px]"
              />
              <div className="flex flex-col space-y-2">
                <Button 
                  onClick={processarMensagem}
                  disabled={isProcessando || !novaMensagem.trim()}
                  className="bg-blue-600 hover:bg-blue-700 h-full"
                >
                  {isProcessando ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processando...
                    </div>
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Conversas */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Histórico de Conversas Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversas.map((conversa) => (
              <div key={conversa.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-600">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-white font-semibold">{conversa.eleitor}</h4>
                    <p className="text-slate-400 text-sm">{conversa.timestamp}</p>
                  </div>
                  <Badge className={getSentimentoColor(conversa.sentimento)}>
                    {getSentimentoLabel(conversa.sentimento)}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Mensagem do Eleitor:</p>
                    <p className="text-white bg-slate-700/50 rounded p-3">{conversa.mensagem}</p>
                  </div>
                  
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Resposta do Clone Digital:</p>
                    <p className="text-white bg-blue-500/10 rounded p-3 border-l-4 border-blue-500">
                      {conversa.resposta}
                    </p>
                  </div>
                  
                  {conversa.iasAtivadas.length > 0 && (
                    <div>
                      <p className="text-slate-400 text-sm mb-2">IAs Ativadas:</p>
                      <div className="flex flex-wrap gap-2">
                        {conversa.iasAtivadas.map((ia, index) => (
                          <Badge key={index} className="bg-blue-500/20 text-blue-400">
                            {ia.replace('_', ' ').toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configurações do Clone */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="h-5 w-5 mr-2" />
            Configurações do Clone Digital
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-3">Personalidade da Celina</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Tom Direto e Próximo</span>
                  <Badge className="bg-green-500/20 text-green-400">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Valores Progressistas</span>
                  <Badge className="bg-green-500/20 text-green-400">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Foco em Realizações</span>
                  <Badge className="bg-green-500/20 text-green-400">Ativo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Linguagem Regional</span>
                  <Badge className="bg-green-500/20 text-green-400">Ativo</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-3">Integração com Outras IAs</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Narrativa Regional</span>
                  <Badge className="bg-blue-500/20 text-blue-400">Integrado</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Blindagem Estratégica</span>
                  <Badge className="bg-blue-500/20 text-blue-400">Integrado</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Análise de Adversários</span>
                  <Badge className="bg-blue-500/20 text-blue-400">Integrado</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Comunicação em Massa</span>
                  <Badge className="bg-blue-500/20 text-blue-400">Integrado</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CloneDigital;
