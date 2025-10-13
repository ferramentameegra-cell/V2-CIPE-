'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Target, Users, TrendingUp, TrendingDown, AlertTriangle, Eye,
  Brain, Search, MoreVertical, Clock, BarChart3, Activity, Zap, 
  Calendar, Bell, Radar, Settings, RefreshCw
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar } from 'recharts';

interface Adversario {
  id: string;
  nome: string;
  partido: string;
  numeroUrna?: string;
  ideologia: string;
  scoreAmeaca: number;
  intencaoVoto: number;
  tendencia: number;
  alcanceDigital: number;
  sentimentoPublico: number;
  ultimaAnalise: Date;
  status: 'ATIVO' | 'PAUSADO' | 'CRITICO';
  prioridade: 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA';
  cor: string;
}

interface AnaliseComparativa {
  categoria: string;
  nossoValor: number;
  adversarioValor: number;
  diferenca: number;
  vantagem: boolean;
  tendencia: 'MELHORANDO' | 'PIORANDO' | 'ESTAVEL';
}

interface EventoAdversario {
  id: string;
  adversario: string;
  titulo: string;
  tipo: string;
  data: Date;
  local: string;
  impacto: number;
  status: 'AGENDADO' | 'REALIZADO' | 'CANCELADO';
  analiseIA?: string;
}

interface AlertaEstrategico {
  id: string;
  adversario: string;
  titulo: string;
  descricao: string;
  severidade: 'INFO' | 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA';
  tipo: string;
  dataDeteccao: Date;
  status: 'NOVO' | 'VISUALIZADO' | 'RESOLVIDO';
  acaoSugerida: string;
}

export default function AnaliseAdversarios({ candidateId }: { candidateId: string }) {
  const [adversarios, setAdversarios] = useState<Adversario[]>([]);
  const [adversarioSelecionado, setAdversarioSelecionado] = useState<string | null>(null);
  const [analiseComparativa, setAnaliseComparativa] = useState<AnaliseComparativa[]>([]);
  const [eventos, setEventos] = useState<EventoAdversario[]>([]);
  const [alertas, setAlertas] = useState<AlertaEstrategico[]>([]);
  const [filtroTempo, setFiltroTempo] = useState('7d');
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const adversariosSimulados: Adversario[] = [
      {
        id: '1',
        nome: 'João Silva',
        partido: 'PT',
        numeroUrna: '13',
        ideologia: 'ESQUERDA',
        scoreAmeaca: 85,
        intencaoVoto: 28.4,
        tendencia: -2.1,
        alcanceDigital: 2400000,
        sentimentoPublico: 0.15,
        ultimaAnalise: new Date(Date.now() - 30 * 60 * 1000),
        status: 'CRITICO',
        prioridade: 'CRITICA',
        cor: '#EF4444'
      },
      {
        id: '2',
        nome: 'Maria Santos',
        partido: 'PSDB',
        numeroUrna: '45',
        ideologia: 'CENTRO',
        scoreAmeaca: 72,
        intencaoVoto: 18.7,
        tendencia: 1.8,
        alcanceDigital: 1800000,
        sentimentoPublico: 0.32,
        ultimaAnalise: new Date(Date.now() - 45 * 60 * 1000),
        status: 'ATIVO',
        prioridade: 'ALTA',
        cor: '#F59E0B'
      },
      {
        id: '3',
        nome: 'Pedro Costa',
        partido: 'NOVO',
        numeroUrna: '30',
        ideologia: 'DIREITA',
        scoreAmeaca: 58,
        intencaoVoto: 12.3,
        tendencia: 3.2,
        alcanceDigital: 950000,
        sentimentoPublico: 0.45,
        ultimaAnalise: new Date(Date.now() - 60 * 60 * 1000),
        status: 'ATIVO',
        prioridade: 'MEDIA',
        cor: '#8B5CF6'
      }
    ];

    const analiseComparativaSimulada: AnaliseComparativa[] = [
      { categoria: 'Intenção de Voto', nossoValor: 45.2, adversarioValor: 28.4, diferenca: 16.8, vantagem: true, tendencia: 'MELHORANDO' },
      { categoria: 'Alcance Digital', nossoValor: 3200000, adversarioValor: 2400000, diferenca: 800000, vantagem: true, tendencia: 'ESTAVEL' },
      { categoria: 'Sentimento Público', nossoValor: 0.72, adversarioValor: 0.15, diferenca: 0.57, vantagem: true, tendencia: 'MELHORANDO' },
      { categoria: 'Engajamento', nossoValor: 8.5, adversarioValor: 6.2, diferenca: 2.3, vantagem: true, tendencia: 'ESTAVEL' },
      { categoria: 'Gastos Campanha', nossoValor: 2800000, adversarioValor: 3200000, diferenca: -400000, vantagem: false, tendencia: 'PIORANDO' }
    ];

    const eventosSimulados: EventoAdversario[] = [
      {
        id: '1',
        adversario: 'João Silva',
        titulo: 'Comício no Centro',
        tipo: 'COMICIO',
        data: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        local: 'Praça Central',
        impacto: 85,
        status: 'AGENDADO',
        analiseIA: 'Evento de alto impacto. Recomenda-se monitoramento intensivo.'
      },
      {
        id: '2',
        adversario: 'Maria Santos',
        titulo: 'Debate na TV',
        tipo: 'DEBATE',
        data: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        local: 'Estúdios TV',
        impacto: 95,
        status: 'AGENDADO',
        analiseIA: 'Debate de alta audiência. Preparar estratégia de resposta.'
      }
    ];

    const alertasSimulados: AlertaEstrategico[] = [
      {
        id: '1',
        adversario: 'João Silva',
        titulo: 'Crescimento Acelerado nas Redes',
        descricao: 'Aumento de 15% nos seguidores em 48h',
        severidade: 'ALTA',
        tipo: 'CRESCIMENTO_ADVERSARIO',
        dataDeteccao: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'NOVO',
        acaoSugerida: 'Monitorar conteúdo viral e preparar resposta estratégica'
      },
      {
        id: '2',
        adversario: 'Maria Santos',
        titulo: 'Nova Aliança Detectada',
        descricao: 'Reunião com líderes do MDB confirmada',
        severidade: 'MEDIA',
        tipo: 'ALIANCA_FORMADA',
        dataDeteccao: new Date(Date.now() - 4 * 60 * 60 * 1000),
        status: 'VISUALIZADO',
        acaoSugerida: 'Analisar impacto da aliança'
      }
    ];

    setAdversarios(adversariosSimulados);
    setAnaliseComparativa(analiseComparativaSimulada);
    setEventos(eventosSimulados);
    setAlertas(alertasSimulados);
    setAdversarioSelecionado(adversariosSimulados[0].id);
  }, [candidateId]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-orange-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getTendenciaColor = (tendencia: number) => tendencia > 0 ? 'text-red-400' : 'text-green-400';

  const getSeveridadeColor = (severidade: string) => {
    switch (severidade) {
      case 'CRITICA': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'ALTA': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'MEDIA': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'BAIXA': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const formatTempo = (data: Date) => {
    const agora = new Date();
    const diff = agora.getTime() - data.getTime();
    const horas = Math.floor(diff / (1000 * 60 * 60));
    if (horas < 1) return 'Agora';
    if (horas < 24) return `${horas}h atrás`;
    const dias = Math.floor(horas / 24);
    return `${dias}d atrás`;
  };

  const adversarioAtual = adversarios.find(a => a.id === adversarioSelecionado);

  const dadosRadar = [
    { categoria: 'Intenção', nosso: 90, adversario: 56 },
    { categoria: 'Alcance', nosso: 85, adversario: 60 },
    { categoria: 'Sentimento', nosso: 86, adversario: 30 },
    { categoria: 'Engajamento', nosso: 75, adversario: 55 },
    { categoria: 'Mídia', nosso: 80, adversario: 70 },
    { categoria: 'Eventos', nosso: 70, adversario: 65 }
  ];

  const dadosTendencia = [
    { data: '01/08', ronaldo: 43.2, joao: 30.5, maria: 16.8, pedro: 9.5 },
    { data: '08/08', ronaldo: 44.1, joao: 29.8, maria: 17.2, pedro: 8.9 },
    { data: '15/08', ronaldo: 44.8, joao: 29.2, maria: 17.8, pedro: 8.2 },
    { data: '22/08', ronaldo: 45.2, joao: 28.4, maria: 18.7, pedro: 7.7 },
    { data: '29/08', ronaldo: 45.2, joao: 28.4, maria: 18.7, pedro: 12.3 }
  ];

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-white">Análise de Adversários</h1>
            <div className="flex items-center space-x-2">
              <Radar className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">Monitoramento Ativo</span>
            </div>
          </div>
          <p className="text-slate-400 mt-1">
            Inteligência competitiva • {adversarios.length} adversários • {alertas.filter(a => a.status === 'NOVO').length} alertas novos
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Buscar..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 w-64 bg-slate-800/50 border-slate-600 text-white"
            />
          </div>
          
          <select
            className="px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            value={filtroTempo}
            onChange={(e) => setFiltroTempo(e.target.value)}
          >
            <option value="24h">Últimas 24h</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
          </select>
          
          <Button className="bg-red-600 hover:bg-red-700">
            <Target className="w-4 h-4 mr-2" />
            Novo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Adversários', valor: adversarios.length, variacao: 2, icone: Target },
          { label: 'Score Médio', valor: Math.round(adversarios.reduce((acc, a) => acc + a.scoreAmeaca, 0) / adversarios.length), variacao: 5.2, icone: AlertTriangle },
          { label: 'Alertas Novos', valor: alertas.filter(a => a.status === 'NOVO').length, variacao: 3, icone: Bell },
          { label: 'Eventos Próximos', valor: eventos.filter(e => e.status === 'AGENDADO').length, variacao: 1, icone: Calendar }
        ].map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-red-500/30 bg-red-500/5">
                <CardContent className="p-4 text-center">
                  <Icon className="w-5 h-5 text-red-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">{m.valor}</div>
                  <div className="text-xs text-slate-400">{m.label}</div>
                  <div className="text-xs text-green-400 mt-1">+{m.variacao}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* SEÇÃO 1: OVERVIEW DOS ADVERSÁRIOS */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Target className="w-6 h-6 text-red-400" />
          <span>Overview dos Adversários</span>
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader><CardTitle className="flex items-center space-x-2"><Users className="w-5 h-5 text-red-400" /><span>Adversários</span></CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {adversarios.map((adv) => (
                  <motion.div
                    key={adv.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      adversarioSelecionado === adv.id ? 'bg-slate-700/50 border-blue-500/50' : 'bg-slate-800/30 border-slate-700 hover:bg-slate-800/50'
                    }`}
                    onClick={() => setAdversarioSelecionado(adv.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: adv.cor }}>
                          {adv.nome.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium text-white text-sm">{adv.nome}</h4>
                          <p className="text-xs text-slate-400">{adv.partido}</p>
                        </div>
                      </div>
                      <Badge className={
                        adv.prioridade === 'CRITICA' ? 'bg-red-500/20 text-red-300' : 
                        adv.prioridade === 'ALTA' ? 'bg-orange-500/20 text-orange-300' : 
                        'bg-yellow-500/20 text-yellow-300'
                      }>{adv.prioridade}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><div className="text-slate-400">Intenção</div><div className="text-white font-medium">{adv.intencaoVoto}%</div></div>
                      <div><div className="text-slate-400">Tendência</div><div className={getTendenciaColor(adv.tendencia)}>{adv.tendencia > 0 ? '+' : ''}{adv.tendencia}%</div></div>
                      <div><div className="text-slate-400">Ameaça</div><div className={getScoreColor(adv.scoreAmeaca)}>{adv.scoreAmeaca}</div></div>
                      <div><div className="text-slate-400">Alcance</div><div className="text-blue-400">{(adv.alcanceDigital / 1000000).toFixed(1)}M</div></div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              {adversarioAtual && (
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: adversarioAtual.cor }}>
                          {adversarioAtual.nome.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{adversarioAtual.nome}</h3>
                          <p className="text-slate-400">{adversarioAtual.partido} • {adversarioAtual.ideologia}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline"><Eye className="w-4 h-4 mr-2" />Monitorar</Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { label: 'Intenção Voto', valor: `${adversarioAtual.intencaoVoto}%`, variacao: adversarioAtual.tendencia },
                        { label: 'Score Ameaça', valor: adversarioAtual.scoreAmeaca, variacao: 5.2 },
                        { label: 'Alcance Digital', valor: `${(adversarioAtual.alcanceDigital / 1000000).toFixed(1)}M`, variacao: 12 },
                        { label: 'Sentimento', valor: `${(adversarioAtual.sentimentoPublico * 100).toFixed(0)}%`, variacao: 3 }
                      ].map((m, i) => (
                        <div key={i} className="text-center p-3 bg-slate-800/30 rounded-lg">
                          <div className="text-2xl font-bold text-white">{m.valor}</div>
                          <div className="text-xs text-slate-400">{m.label}</div>
                          <div className={`text-xs ${m.variacao > 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {m.variacao > 0 ? '+' : ''}{m.variacao}%
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                      <div className="flex items-center space-x-2 mb-3">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <h4 className="font-medium text-white">Análise IA</h4>
                        <Badge className="bg-purple-500/20 text-purple-300">Há {formatTempo(adversarioAtual.ultimaAnalise)}</Badge>
                      </div>
                      <p className="text-slate-300 text-sm">
                        <strong>{adversarioAtual.nome}</strong> apresenta score de ameaça de {adversarioAtual.scoreAmeaca}, 
                        com {adversarioAtual.intencaoVoto}% de intenção de voto e alcance digital de {(adversarioAtual.alcanceDigital / 1000000).toFixed(1)}M. 
                        Recomenda-se monitoramento intensivo.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-white flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-yellow-400" /><span>Ações Recomendadas</span>
                      </h4>
                      {['Intensificar monitoramento digital', 'Preparar contra-narrativa', 'Analisar estratégia regional'].map((acao, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-slate-800/30 rounded border border-slate-700">
                          <span className="text-sm text-slate-300">{acao}</span>
                          <Button size="sm" variant="outline" className="h-6 text-xs">Executar</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO 2: ANÁLISE COMPARATIVA */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Radar className="w-6 h-6 text-blue-400" />
          <span>Análise Comparativa</span>
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader><CardTitle className="flex items-center space-x-2"><Radar className="w-5 h-5 text-blue-400" /><span>Análise Comparativa</span></CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={dadosRadar}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="categoria" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#9CA3AF' }} />
                    <RechartsRadar name="Ronaldo" dataKey="nosso" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.2} strokeWidth={2} />
                    <RechartsRadar name={adversarioAtual?.nome || 'Adversário'} dataKey="adversario" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} strokeWidth={2} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader><CardTitle className="flex items-center space-x-2"><BarChart3 className="w-5 h-5 text-purple-400" /><span>Métricas</span></CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analiseComparativa.map((item, i) => (
                    <div key={i} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white text-sm">{item.categoria}</span>
                        <Badge className={item.vantagem ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>{item.vantagem ? 'Vantagem' : 'Desvantagem'}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div><div className="text-slate-400">Nosso</div><div className="text-blue-400 font-medium">{item.nossoValor.toLocaleString()}</div></div>
                        <div><div className="text-slate-400">Adversário</div><div className="text-red-400 font-medium">{item.adversarioValor.toLocaleString()}</div></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader><CardTitle className="flex items-center space-x-2"><TrendingUp className="w-5 h-5 text-green-400" /><span>Evolução da Intenção de Voto</span></CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dadosTendencia}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="data" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" domain={[0, 50]} />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }} formatter={(value: any) => [`${value}%`, '']} />
                  <Line type="monotone" dataKey="ronaldo" stroke="#3B82F6" strokeWidth={3} name="Ronaldo" />
                  <Line type="monotone" dataKey="joao" stroke="#EF4444" strokeWidth={2} name="João" />
                  <Line type="monotone" dataKey="maria" stroke="#F59E0B" strokeWidth={2} name="Maria" />
                  <Line type="monotone" dataKey="pedro" stroke="#8B5CF6" strokeWidth={2} name="Pedro" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEÇÃO 3: TIMELINE DE EVENTOS */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-cyan-400" />
          <span>Timeline de Eventos</span>
        </h2>
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader><CardTitle className="flex items-center space-x-2"><Calendar className="w-5 h-5 text-cyan-400" /><span>Timeline de Eventos</span></CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventos.map((ev, i) => (
                  <motion.div key={ev.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                    <div className={`w-3 h-3 rounded-full mt-2 ${ev.impacto >= 80 ? 'bg-red-500' : ev.impacto >= 60 ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-white">{ev.titulo}</h4>
                        <Badge className={ev.impacto >= 80 ? 'bg-red-500/20 text-red-300' : 'bg-orange-500/20 text-orange-300'}>Impacto {ev.impacto}</Badge>
                      </div>
                      <div className="text-sm text-slate-400 mb-2">
                        <span className="font-medium text-white">{ev.adversario}</span> • {ev.data.toLocaleDateString()} • {ev.local}
                      </div>
                      {ev.analiseIA && (
                        <div className="p-3 bg-slate-700/30 rounded border border-slate-600 mt-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <Brain className="w-4 h-4 text-purple-400" />
                            <span className="text-xs font-medium text-purple-400">Análise IA</span>
                          </div>
                          <p className="text-xs text-slate-300">{ev.analiseIA}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEÇÃO 4: ALERTAS ESTRATÉGICOS */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Bell className="w-6 h-6 text-red-400" />
          <span>Alertas Estratégicos</span>
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
            {alertas.filter(a => a.status === 'NOVO').length} Novos
          </Badge>
        </h2>
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2"><Bell className="w-5 h-5 text-red-400" /><span>Alertas Estratégicos</span></div>
                <Button size="sm" variant="outline"><RefreshCw className="w-4 h-4 mr-2" />Atualizar</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertas.map((al, i) => (
                  <motion.div key={al.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className={`w-3 h-3 rounded-full mt-2 ${al.severidade === 'CRITICA' ? 'bg-red-500 animate-pulse' : al.severidade === 'ALTA' ? 'bg-orange-500' : 'bg-yellow-500'}`} />
                        <div>
                          <h4 className="font-medium text-white text-sm">{al.titulo}</h4>
                          <p className="text-xs text-slate-400 mt-1"><span className="font-medium text-white">{al.adversario}</span> • {formatTempo(al.dataDeteccao)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getSeveridadeColor(al.severidade)}>{al.severidade}</Badge>
                        <Badge className={al.status === 'NOVO' ? 'bg-blue-500/20 text-blue-300' : al.status === 'VISUALIZADO' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}>{al.status}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{al.descricao}</p>
                    <div className="p-3 bg-slate-700/30 rounded border border-slate-600">
                      <div className="text-xs font-medium text-green-400 mb-1">Ação Sugerida:</div>
                      <p className="text-xs text-slate-300">{al.acaoSugerida}</p>
                    </div>
                    <div className="flex justify-end space-x-2 mt-3">
                      {al.status === 'NOVO' && <Button size="sm" variant="outline" className="h-7 text-xs"><Eye className="w-3 h-3 mr-1" />Visualizar</Button>}
                      <Button size="sm" className="h-7 text-xs bg-green-600 hover:bg-green-700"><Zap className="w-3 h-3 mr-1" />Executar</Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* SEÇÃO 5: INSIGHTS DE IA */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Brain className="w-6 h-6 text-purple-400" />
          <span>Insights de IA</span>
        </h2>
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 text-purple-400 opacity-50" />
            <h3 className="text-xl font-medium text-white mb-2">Insights de IA</h3>
            <p className="text-slate-400">Análises preditivas e insights estratégicos gerados por inteligência artificial</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

