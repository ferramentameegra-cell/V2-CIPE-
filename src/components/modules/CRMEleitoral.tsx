'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, UserPlus, Target, TrendingUp, TrendingDown, Mail,
  MessageSquare, Phone, MapPin, Calendar, DollarSign, Award,
  Filter, Search, Download, Upload, Settings, BarChart3,
  PieChart, Activity, Clock, Star, Heart, Zap, Globe,
  Smartphone, Monitor, Headphones, FileText, Send
} from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, PieChart as RechartsPieChart, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie,
  ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Brain, Shield, Rocket, Eye, AlertTriangle, CheckCircle, XCircle,
  RefreshCw, Play, Pause, MoreHorizontal, Edit, Trash2,
  Plus, ArrowRight, ArrowUp, ArrowDown, Percent, Calculator
} from 'lucide-react';

interface MetricaCRM {
  label: string;
  valor: number | string;
  variacao?: number;
  meta?: number;
  tipo: 'eleitores' | 'engajamento' | 'conversao' | 'financeiro' | 'performance';
  icone: any;
  cor: string;
  status: 'excelente' | 'bom' | 'atencao' | 'critico';
  tendencia?: 'subindo' | 'descendo' | 'estavel';
  detalhes?: string;
}

interface EleitorResumo {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  cidade: string;
  estado: string;
  status: 'LEAD' | 'INTERESSADO' | 'SIMPATIZANTE' | 'APOIADOR' | 'EMBAIXADOR' | 'INATIVO' | 'ADVERSARIO';
  score: number;
  scoreAnterior: number;
  nivelEngajamento: 'MUITO_BAIXO' | 'BAIXO' | 'MEDIO' | 'ALTO' | 'MUITO_ALTO';
  probabilidadeVoto: number;
  ultimaInteracao: Date;
  totalInteracoes: number;
  canalPreferido: string;
  segmento?: string;
  valorVida: number;
  etapaFunil: string;
}

interface SegmentoResumo {
  id: string;
  nome: string;
  descricao: string;
  cor: string;
  tamanhoReal: number;
  taxaConversao: number;
  custoMedioAquisicao: number;
  valorVidaEleitor: number;
  crescimento: number;
}

interface CampanhaResumo {
  id: string;
  nome: string;
  tipo: string;
  status: string;
  totalEnviados: number;
  taxaEntrega: number;
  taxaAbertura: number;
  taxaClique: number;
  taxaConversao: number;
  roi: number;
  dataInicio: Date;
}

interface DadosFunil {
  etapa: string;
  quantidade: number;
  percentual: number;
  cor: string;
  conversao?: number;
  tempoMedio?: number;
}

interface CampanhaResumoCompleta extends CampanhaResumo {
  canais: string[];
  custoTotal: number;
  receitaGerada: number;
}

export default function CRMEleitoral({ candidateId }: { candidateId: string }) {
  const [metricas, setMetricas] = useState<MetricaCRM[]>([]);
  const [eleitores, setEleitores] = useState<EleitorResumo[]>([]);
  const [segmentos, setSegmentos] = useState<SegmentoResumo[]>([]);
  const [campanhas, setCampanhas] = useState<CampanhaResumoCompleta[]>([]);
  const [dadosFunil, setDadosFunil] = useState<DadosFunil[]>([]);
  const [filtroTempo, setFiltroTempo] = useState('30d');
  const [modoVisualizacao, setModoVisualizacao] = useState<'dashboard' | 'eleitores' | 'segmentos' | 'campanhas' | 'funil' | 'analytics'>('dashboard');
  const [loading, setLoading] = useState(true);
  const [atualizacaoTempo, setAtualizacaoTempo] = useState(new Date());

  // Simulação de dados
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
    const metricasSimuladas: MetricaCRM[] = [
      {
        label: 'Total de Eleitores',
        valor: '4.847.392',
        variacao: 15.2,
        meta: 5000000,
        tipo: 'eleitores',
        icone: Users,
        cor: 'blue',
        status: 'bom',
        tendencia: 'subindo',
        detalhes: '+156.247 este mês'
      },
      {
        label: 'Novos Cadastros',
        valor: '28.247',
        variacao: 22.3,
        tipo: 'eleitores',
        icone: UserPlus,
        cor: 'green',
        status: 'excelente',
        tendencia: 'subindo',
        detalhes: 'Últimos 7 dias'
      },
      {
        label: 'Taxa de Conversão',
        valor: '28.4%',
        variacao: 3.1,
        meta: 30,
        tipo: 'conversao',
        icone: Target,
        cor: 'purple',
        status: 'bom',
        tendencia: 'subindo',
        detalhes: 'Lead → Apoiador'
      },
      {
        label: 'Apoiadores Ativos',
        valor: '1.247.392',
        variacao: 18.7,
        tipo: 'eleitores',
        icone: Heart,
        cor: 'red',
        status: 'excelente',
        tendencia: 'subindo',
        detalhes: '25.7% do total'
      },
      {
        label: 'Embaixadores',
        valor: '24.847',
        variacao: 25.1,
        tipo: 'eleitores',
        icone: Award,
        cor: 'yellow',
        status: 'excelente',
        tendencia: 'subindo',
        detalhes: 'Top performers'
      },
      {
        label: 'Score Médio',
        valor: '742',
        variacao: 8.4,
        meta: 800,
        tipo: 'engajamento',
        icone: Star,
        cor: 'orange',
        status: 'bom',
        tendencia: 'subindo',
        detalhes: 'Escala 0-1000'
      },
      {
        label: 'Engajamento',
        valor: '82.3%',
        variacao: 5.8,
        tipo: 'engajamento',
        icone: Activity,
        cor: 'cyan',
        status: 'excelente',
        tendencia: 'subindo',
        detalhes: 'Últimos 30 dias'
      },
      {
        label: 'ROI Campanhas',
        valor: '420%',
        variacao: 15.1,
        tipo: 'financeiro',
        icone: DollarSign,
        cor: 'emerald',
        status: 'excelente',
        tendencia: 'subindo',
        detalhes: 'Retorno médio'
      },
      {
        label: 'CLV Médio',
        valor: 'R$ 485',
        variacao: 12.3,
        tipo: 'financeiro',
        icone: Calculator,
        cor: 'indigo',
        status: 'excelente',
        tendencia: 'subindo',
        detalhes: 'Customer Lifetime Value'
      },
      {
        label: 'Churn Rate',
        valor: '3.2%',
        variacao: -1.8,
        tipo: 'performance',
        icone: TrendingDown,
        cor: 'pink',
        status: 'excelente',
        tendencia: 'descendo',
        detalhes: 'Taxa de abandono'
      },
      {
        label: 'Tempo Conversão',
        valor: '12.5 dias',
        variacao: -2.1,
        tipo: 'performance',
        icone: Clock,
        cor: 'violet',
        status: 'bom',
        tendencia: 'descendo',
        detalhes: 'Lead → Apoiador'
      },
      {
        label: 'Custo Aquisição',
        valor: 'R$ 8.50',
        variacao: -5.2,
        tipo: 'financeiro',
        icone: Percent,
        cor: 'teal',
        status: 'excelente',
        tendencia: 'descendo',
        detalhes: 'CAC médio'
      }
    ];

    const eleitoresSimulados: EleitorResumo[] = [
      {
        id: '1',
        nome: 'Maria Silva Santos',
        email: 'maria.silva@email.com',
        telefone: '(11) 99999-9999',
        cidade: 'São Paulo',
        estado: 'SP',
        status: 'EMBAIXADOR',
        score: 950,
        scoreAnterior: 920,
        nivelEngajamento: 'MUITO_ALTO',
        probabilidadeVoto: 0.95,
        ultimaInteracao: new Date(Date.now() - 2 * 60 * 60 * 1000),
        totalInteracoes: 347,
        canalPreferido: 'WhatsApp',
        segmento: 'Lideranças Femininas',
        valorVida: 680.50,
        etapaFunil: 'EMBAIXADOR'
      },
      {
        id: '2',
        nome: 'João Carlos Oliveira',
        email: 'joao.oliveira@email.com',
        telefone: '(21) 98888-8888',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        status: 'APOIADOR',
        score: 820,
        scoreAnterior: 780,
        nivelEngajamento: 'ALTO',
        probabilidadeVoto: 0.88,
        ultimaInteracao: new Date(Date.now() - 5 * 60 * 60 * 1000),
        totalInteracoes: 256,
        canalPreferido: 'Email',
        segmento: 'Profissionais Liberais',
        valorVida: 520.30,
        etapaFunil: 'APOIO'
      },
      {
        id: '3',
        nome: 'Ana Paula Costa',
        telefone: '(85) 97777-7777',
        cidade: 'Fortaleza',
        estado: 'CE',
        status: 'SIMPATIZANTE',
        score: 620,
        scoreAnterior: 580,
        nivelEngajamento: 'MEDIO',
        probabilidadeVoto: 0.72,
        ultimaInteracao: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        totalInteracoes: 128,
        canalPreferido: 'Instagram',
        segmento: 'Jovens Universitários',
        valorVida: 340.80,
        etapaFunil: 'CONSIDERACAO'
      },
      {
        id: '4',
        nome: 'Roberto Ferreira Lima',
        email: 'roberto.lima@email.com',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        status: 'INTERESSADO',
        score: 420,
        scoreAnterior: 380,
        nivelEngajamento: 'BAIXO',
        probabilidadeVoto: 0.58,
        ultimaInteracao: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        totalInteracoes: 67,
        canalPreferido: 'Facebook',
        segmento: 'Trabalhadores Rurais',
        valorVida: 280.40,
        etapaFunil: 'INTERESSE'
      },
      {
        id: '5',
        nome: 'Carla Mendes Souza',
        email: 'carla.souza@email.com',
        telefone: '(47) 96666-6666',
        cidade: 'Florianópolis',
        estado: 'SC',
        status: 'LEAD',
        score: 220,
        scoreAnterior: 180,
        nivelEngajamento: 'MUITO_BAIXO',
        probabilidadeVoto: 0.35,
        ultimaInteracao: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        totalInteracoes: 12,
        canalPreferido: 'SMS',
        segmento: 'Novos Contatos',
        valorVida: 120.20,
        etapaFunil: 'DESCOBERTA'
      }
    ];

    const segmentosSimulados: SegmentoResumo[] = [
      {
        id: '1',
        nome: 'Lideranças Femininas',
        descricao: 'Mulheres em posições de liderança, empresárias e profissionais influentes',
        cor: '#EC4899',
        tamanhoReal: 45892,
        taxaConversao: 0.34,
        custoMedioAquisicao: 12.50,
        valorVidaEleitor: 450.00,
        crescimento: 18.7
      },
      {
        id: '2',
        nome: 'Profissionais Liberais',
        descricao: 'Médicos, advogados, engenheiros e outros profissionais autônomos',
        cor: '#3B82F6',
        tamanhoReal: 123456,
        taxaConversao: 0.28,
        custoMedioAquisicao: 15.80,
        valorVidaEleitor: 380.00,
        crescimento: 12.3
      },
      {
        id: '3',
        nome: 'Jovens Universitários',
        descricao: 'Estudantes universitários e recém-formados de 18 a 28 anos',
        cor: '#10B981',
        tamanhoReal: 234567,
        taxaConversao: 0.22,
        custoMedioAquisicao: 8.90,
        valorVidaEleitor: 220.00,
        crescimento: 25.1
      },
      {
        id: '4',
        nome: 'Trabalhadores Rurais',
        descricao: 'Produtores rurais, trabalhadores do agronegócio e comunidades rurais',
        cor: '#F59E0B',
        tamanhoReal: 89123,
        taxaConversao: 0.31,
        custoMedioAquisicao: 18.20,
        valorVidaEleitor: 520.00,
        crescimento: 8.9
      },
      {
        id: '5',
        nome: 'Aposentados e Pensionistas',
        descricao: 'Pessoas aposentadas e pensionistas acima de 60 anos',
        cor: '#8B5CF6',
        tamanhoReal: 156789,
        taxaConversao: 0.42,
        custoMedioAquisicao: 22.10,
        valorVidaEleitor: 680.00,
        crescimento: 5.2
      }
    ];

    const campanhasSimuladas: CampanhaResumoCompleta[] = [
      {
        id: '1',
        nome: 'Propostas Econômicas 2024',
        tipo: 'EMAIL_MARKETING',
        status: 'CONCLUIDA',
        canais: ['EMAIL', 'WHATSAPP'],
        totalEnviados: 680000,
        taxaEntrega: 0.96,
        taxaAbertura: 0.34,
        taxaClique: 0.18,
        taxaConversao: 0.12,
        roi: 420,
        custoTotal: 15800.00,
        receitaGerada: 66360.00,
        dataInicio: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        nome: 'Mobilização Digital Juventude',
        tipo: 'WHATSAPP_MARKETING',
        status: 'EM_EXECUCAO',
        canais: ['WHATSAPP', 'INSTAGRAM', 'TIKTOK'],
        totalEnviados: 420000,
        taxaEntrega: 0.98,
        taxaAbertura: 0.52,
        taxaClique: 0.28,
        taxaConversao: 0.19,
        roi: 680,
        custoTotal: 12400.00,
        receitaGerada: 84320.00,
        dataInicio: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: '3',
        nome: 'Evento Digital Saúde',
        tipo: 'EVENTO_DIGITAL',
        status: 'AGENDADA',
        canais: ['EMAIL', 'SMS', 'FACEBOOK'],
        totalEnviados: 180000,
        taxaEntrega: 0.94,
        taxaAbertura: 0.48,
        taxaClique: 0.22,
        taxaConversao: 0.16,
        roi: 340,
        custoTotal: 8900.00,
        receitaGerada: 30260.00,
        dataInicio: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      }
    ];

    const dadosFunilSimulados: DadosFunil[] = [
      { etapa: 'Descoberta', quantidade: 4847392, percentual: 100, cor: '#EF4444', conversao: 0, tempoMedio: 0 },
      { etapa: 'Interesse', quantidade: 2423696, percentual: 50, cor: '#F97316', conversao: 50.0, tempoMedio: 2.5 },
      { etapa: 'Consideração', quantidade: 1454217, percentual: 30, cor: '#EAB308', conversao: 60.0, tempoMedio: 5.2 },
      { etapa: 'Intenção', quantidade: 969478, percentual: 20, cor: '#22C55E', conversao: 66.7, tempoMedio: 8.1 },
      { etapa: 'Apoio', quantidade: 484739, percentual: 10, cor: '#3B82F6', conversao: 50.0, tempoMedio: 12.5 },
      { etapa: 'Embaixador', quantidade: 48474, percentual: 1, cor: '#8B5CF6', conversao: 10.0, tempoMedio: 18.7 }
    ];

    setMetricas(metricasSimuladas);
    setEleitores(eleitoresSimulados);
    setSegmentos(segmentosSimulados);
    setCampanhas(campanhasSimuladas);
    setDadosFunil(dadosFunilSimulados);
    setLoading(false);
    };

    carregarDados();
    
    const interval = setInterval(() => {
      setAtualizacaoTempo(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, [candidateId, filtroTempo]);

  // Funções auxiliares de formatação
  const formatNumero = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatTempo = (data: Date) => {
    const agora = new Date();
    const diff = agora.getTime() - data.getTime();
    const minutos = Math.floor(diff / (1000 * 60));

    if (minutos < 1) return 'Agora';
    if (minutos < 60) return `${minutos}min atrás`;
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `${horas}h atrás`;
    const dias = Math.floor(horas / 24);
    return `${dias}d atrás`;
  };

  const getTendenciaIcon = (tendencia?: string) => {
    switch (tendencia) {
      case 'subindo': return <ArrowUp className="w-3 h-3" />;
      case 'descendo': return <ArrowDown className="w-3 h-3" />;
      default: return <ArrowRight className="w-3 h-3" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 800) return 'text-purple-400';
    if (score >= 600) return 'text-green-400';
    if (score >= 400) return 'text-yellow-400';
    if (score >= 200) return 'text-orange-400';
    return 'text-red-400';
  };

  const getEngajamentoColor = (nivel: string) => {
    switch (nivel) {
      case 'MUITO_ALTO': return 'text-purple-400';
      case 'ALTO': return 'text-green-400';
      case 'MEDIO': return 'text-yellow-400';
      case 'BAIXO': return 'text-orange-400';
      case 'MUITO_BAIXO': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EMBAIXADOR': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'APOIADOR': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'SIMPATIZANTE': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'INTERESSADO': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'LEAD': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'INATIVO': return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
      case 'ADVERSARIO': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  // Dados para gráficos (com score médio)
  const dadosEvolucao = [
    { mes: 'Jan', eleitores: 2100000, apoiadores: 420000, embaixadores: 21000, score: 680 },
    { mes: 'Fev', eleitores: 2580000, apoiadores: 516000, embaixadores: 25800, score: 695 },
    { mes: 'Mar', eleitores: 3120000, apoiadores: 624000, embaixadores: 31200, score: 710 },
    { mes: 'Abr', eleitores: 3680000, apoiadores: 736000, embaixadores: 36800, score: 725 },
    { mes: 'Mai', eleitores: 4150000, apoiadores: 830000, embaixadores: 41500, score: 735 },
    { mes: 'Jun', eleitores: 4520000, apoiadores: 904000, embaixadores: 45200, score: 740 },
    { mes: 'Jul', eleitores: 4847392, apoiadores: 969478, embaixadores: 48474, score: 742 }
  ];

  const dadosPerformance = [
    { segmento: 'Lideranças', conversao: 42, engajamento: 89, clv: 680 },
    { segmento: 'Profissionais', conversao: 35, engajamento: 76, clv: 520 },
    { segmento: 'Jovens', conversao: 28, engajamento: 82, clv: 340 },
    { segmento: 'Rurais', conversao: 38, engajamento: 71, clv: 580 },
    { segmento: 'Aposentados', conversao: 48, engajamento: 68, clv: 720 }
  ];

  const dadosCanais = [
    { canal: 'WhatsApp', eleitores: 1938957, percentual: 40, engajamento: 0.89 },
    { canal: 'Instagram', eleitores: 969478, percentual: 20, engajamento: 0.82 },
    { canal: 'Facebook', eleitores: 727109, percentual: 15, engajamento: 0.71 },
    { canal: 'Email', eleitores: 582167, percentual: 12, engajamento: 0.76 },
    { canal: 'SMS', eleitores: 388111, percentual: 8, engajamento: 0.65 },
    { canal: 'Presencial', eleitores: 242370, percentual: 5, engajamento: 0.95 }
  ];

  const coresCanais = ['#25D366', '#E4405F', '#1877F2', '#EA4335', '#FF6B35', '#8B5CF6'];

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-slate-400">Carregando CRM Eleitoral...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      {/* Header Avançado */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center space-x-3">
            <Brain className="w-8 h-8 text-blue-400" />
            <span>CRM Eleitoral Presidencial</span>
          </h1>
          <p className="text-slate-400 mt-1 flex items-center space-x-4">
            <span>Gestão completa de relacionamento • {formatNumero(4847392)} eleitores</span>
            <Badge variant="outline" className="text-green-400 border-green-400">
              <Activity className="w-3 h-3 mr-1" />
              Sistema Ativo
            </Badge>
            <span className="text-xs">
              Última atualização: {atualizacaoTempo.toLocaleTimeString()}
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            className="px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            value={filtroTempo}
            onChange={(e) => setFiltroTempo(e.target.value)}
          >
            <option value="24h">Últimas 24 horas</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="1y">Último ano</option>
          </select>
          
          <Button className="bg-green-600 hover:bg-green-700">
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Eleitor
          </Button>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4 mr-2" />
            Nova Campanha
          </Button>
          
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Target className="w-4 h-4 mr-2" />
            Criar Segmento
          </Button>
          
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Métricas Principais Ultra-Completas - 12 Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-4">
        {metricas.map((metrica, index) => {
          const Icon = metrica.icone;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-1"
            >
              <Card className={`glass-card hover:scale-105 transition-all duration-300 cursor-pointer ${
                metrica.status === 'excelente' ? 'border-green-500/30 bg-green-500/5' :
                metrica.status === 'bom' ? 'border-blue-500/30 bg-blue-500/5' :
                metrica.status === 'atencao' ? 'border-yellow-500/30 bg-yellow-500/5' :
                'border-red-500/30 bg-red-500/5'
              }`}>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`w-5 h-5 ${
                      metrica.status === 'excelente' ? 'text-green-400' :
                      metrica.status === 'bom' ? 'text-blue-400' :
                      metrica.status === 'atencao' ? 'text-yellow-400' :
                      'text-red-400'
                    }`} />
                    {metrica.variacao && (
                      <div className={`flex items-center text-xs ${
                        metrica.variacao > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {getTendenciaIcon(metrica.tendencia)}
                        <span className="ml-1">{Math.abs(metrica.variacao)}%</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xl font-bold text-white mb-1">{metrica.valor}</div>
                  <div className="text-xs text-slate-400 mb-2">{metrica.label}</div>
                  
                  {metrica.detalhes && (
                    <div className="text-xs text-slate-500 mb-2">{metrica.detalhes}</div>
                  )}
                  {metrica.meta && (
                    <div className="mt-2">
                      <div className="w-full bg-slate-700 rounded-full h-1">
                        <div 
                          className={`h-1 rounded-full ${
                            metrica.status === 'excelente' ? 'bg-green-500' :
                            metrica.status === 'bom' ? 'bg-blue-500' :
                            metrica.status === 'atencao' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ 
                            width: `${Math.min(100, (parseFloat(metrica.valor.toString().replace(/[^\d.]/g, '')) / metrica.meta) * 100)}%` 
                          }}
                        />
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Meta: {formatNumero(metrica.meta)}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs de Navegação */}
      <Tabs value={modoVisualizacao} onValueChange={(value: any) => setModoVisualizacao(value)}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="eleitores">Eleitores</TabsTrigger>
          <TabsTrigger value="segmentos">Segmentos</TabsTrigger>
          <TabsTrigger value="campanhas">Campanhas</TabsTrigger>
          <TabsTrigger value="funil">Funil</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Dashboard Principal */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Evolução de Eleitores & Score */}
            <Card className="glass-card xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <span>Evolução de Eleitores & Score</span>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    +15.2% este mês
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={dadosEvolucao}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="mes" stroke="#9CA3AF" />
                    <YAxis yAxisId="left" stroke="#9CA3AF" tickFormatter={formatNumero} />
                    <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      formatter={(value: any, name: string) => [
                        name === 'score' ? value : formatNumero(value), 
                        name === 'eleitores' ? 'Total de Eleitores' :
                        name === 'apoiadores' ? 'Apoiadores' :
                        name === 'embaixadores' ? 'Embaixadores' : 'Score Médio'
                      ]}
                    />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="eleitores" 
                      stackId="1"
                      stroke="#3B82F6" 
                      fill="#3B82F6" 
                      fillOpacity={0.3}
                    />
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="apoiadores" 
                      stackId="2"
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.3}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="score" 
                      stroke="#F59E0B" 
                      strokeWidth={3}
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Distribuição por Canais */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="w-5 h-5 text-purple-400" />
                  <span>Distribuição por Canais</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={dadosCanais}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="eleitores"
                      label={({ canal, percentual }) => `${canal} (${percentual}%)`}
                    >
                      {dadosCanais.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={coresCanais[index % coresCanais.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      formatter={(value: any) => [formatNumero(value), 'Eleitores']}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
                
                {/* Lista de canais com engajamento */}
                <div className="mt-4 space-y-2">
                  {dadosCanais.map((canal, index) => (
                    <div key={canal.canal} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: coresCanais[index] }}
                        />
                        <span className="text-slate-300">{canal.canal}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400">{formatNumero(canal.eleitores)}</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            canal.engajamento >= 0.8 ? 'text-green-400 border-green-400' :
                            canal.engajamento >= 0.7 ? 'text-yellow-400 border-yellow-400' :
                            'text-red-400 border-red-400'
                          }`}
                        >
                          {(canal.engajamento * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Radar de Performance + Top Eleitores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar de Performance */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <span>Performance por Segmento</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={dadosPerformance}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="segmento" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={{ fontSize: 10, fill: '#9CA3AF' }}
                    />
                    <Radar
                      name="Conversão"
                      dataKey="conversao"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Engajamento"
                      dataKey="engajamento"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            {/* Top Performers */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <span>Top Performers</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    Ver Todos
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {eleitores
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 5)
                  .map((eleitor, index) => (
                    <motion.div
                      key={eleitor.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500 text-black' :
                          index === 1 ? 'bg-gray-400 text-black' :
                          index === 2 ? 'bg-orange-600 text-white' :
                          'bg-slate-600 text-white'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-white text-sm">{eleitor.nome}</h4>
                          <p className="text-xs text-slate-400">{eleitor.cidade}, {eleitor.estado}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge className={getStatusColor(eleitor.status)} size="sm">
                              {eleitor.status}
                            </Badge>
                            <span className="text-xs text-slate-500">
                              {eleitor.segmento}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getScoreColor(eleitor.score)} flex items-center space-x-1`}>
                          <span>{eleitor.score}</span>
                          {eleitor.score > eleitor.scoreAnterior ? (
                            <ArrowUp className="w-3 h-3 text-green-400" />
                          ) : (
                            <ArrowDown className="w-3 h-3 text-red-400" />
                          )}
                        </div>
                        <div className="text-xs text-slate-400 mb-1">
                          CLV: {formatMoeda(eleitor.valorVida)}
                        </div>
                        <div className="text-xs text-slate-500">
                          {eleitor.totalInteracoes} interações
                        </div>
                        <div className="text-xs text-slate-500">
                          {formatTempo(eleitor.ultimaInteracao)}
                        </div>
                      </div>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
              </CardContent>
            </Card>

            {/* Top Segmentos */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-400" />
                    <span>Segmentos de Alto Valor</span>
                  </div>
                  <Button size="sm" variant="outline">Gerenciar</Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {segmentos
                  .sort((a, b) => b.valorVidaEleitor - a.valorVidaEleitor)
                  .slice(0, 5)
                  .map((segmento, index) => (
                    <motion.div
                      key={segmento.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: segmento.cor }}
                          />
                          <h4 className="font-medium text-white text-sm">{segmento.nome}</h4>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-green-400">
                            R$ {segmento.valorVidaEleitor.toFixed(0)}
                          </div>
                          <div className="text-xs text-slate-400">CLV</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className="text-center">
                          <div className="text-blue-400 font-medium">{formatNumero(segmento.tamanhoReal)}</div>
                          <div className="text-slate-400">Eleitores</div>
                        </div>
                        <div className="text-center">
                          <div className="text-purple-400 font-medium">{(segmento.taxaConversao * 100).toFixed(1)}%</div>
                          <div className="text-slate-400">Conversão</div>
                        </div>
                        <div className="text-center">
                          <div className={`font-medium ${segmento.crescimento > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {segmento.crescimento > 0 ? '+' : ''}{segmento.crescimento.toFixed(1)}%
                          </div>
                          <div className="text-slate-400">Crescimento</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </CardContent>
            </Card>
          </div>

          {/* Funil de Conversão Visual */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span>Funil de Conversão Presidencial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-blue-400 border-blue-400">
                    Taxa Global: 28.4%
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Otimizar
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4">
                {dadosFunil.map((etapa, index) => (
                  <motion.div
                    key={etapa.etapa}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div 
                      className="relative mx-auto mb-3 rounded-lg p-4 text-white font-bold"
                      style={{ 
                        backgroundColor: etapa.cor,
                        width: `${Math.max(60, etapa.percentual)}%`,
                        minWidth: '80px'
                      }}
                    >
                      <div className="text-lg">{formatNumero(etapa.quantidade)}</div>
                      <div className="text-xs opacity-80">{etapa.percentual}%</div>
                    </div>
                    
                    <div className="text-sm font-medium text-white mb-1">{etapa.etapa}</div>
                    
                    {etapa.conversao !== undefined && etapa.conversao > 0 && (
                      <div className="text-xs text-slate-400 mb-1">
                        Conv: {etapa.conversao.toFixed(1)}%
                      </div>
                    )}
                    
                    {etapa.tempoMedio !== undefined && etapa.tempoMedio > 0 && (
                      <div className="text-xs text-slate-500">
                        {etapa.tempoMedio.toFixed(1)} dias
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {/* Insights do Funil */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">Gargalo Identificado</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Maior perda entre "Consideração" e "Intenção" (33.3% de drop)
                  </p>
                </div>
                
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">Melhor Performance</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Conversão "Interesse" → "Consideração": 60%
                  </p>
                </div>
                
                <div className="bg-slate-800/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Rocket className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Oportunidade</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Otimizar etapa "Intenção" pode gerar +15% apoiadores
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campanhas Recentes */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Send className="w-5 h-5 text-blue-400" />
                  <span>Campanhas Recentes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    ROI Médio: 420%
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Campanha
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Campanha</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Tipo</th>
                      <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">Enviados</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">Entrega</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">Abertura</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">Clique</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">Conversão</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">ROI</th>
                      <th className="text-right py-3 px-4 text-slate-400 font-medium">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campanhas.map((campanha, index) => (
                      <motion.tr
                        key={campanha.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-slate-800 hover:bg-slate-800/30 transition-all cursor-pointer"
                      >
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium text-white text-sm">{campanha.nome}</div>
                            <div className="text-xs text-slate-400 flex items-center space-x-2 mt-1">
                              <span>{formatTempo(campanha.dataInicio)}</span>
                              <div className="flex items-center space-x-1">
                                {campanha.canais.map((canal, i) => (
                                  <Badge key={i} variant="outline" size="sm" className="text-xs">
                                    {canal}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className="text-xs">
                            {campanha.tipo.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            className={`text-xs ${
                              campanha.status === 'CONCLUIDA' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                              campanha.status === 'EM_EXECUCAO' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                              campanha.status === 'AGENDADA' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                              'bg-slate-500/20 text-slate-300 border-slate-500/30'
                            }`}
                          >
                            {campanha.status === 'EM_EXECUCAO' && <Play className="w-3 h-3 mr-1" />}
                            {campanha.status === 'AGENDADA' && <Clock className="w-3 h-3 mr-1" />}
                            {campanha.status === 'CONCLUIDA' && <CheckCircle className="w-3 h-3 mr-1" />}
                            {campanha.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right text-white font-medium">
                          {formatNumero(campanha.totalEnviados)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`font-medium ${
                            campanha.taxaEntrega >= 0.9 ? 'text-green-400' :
                            campanha.taxaEntrega >= 0.8 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {(campanha.taxaEntrega * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`font-medium ${
                            campanha.taxaAbertura >= 0.3 ? 'text-green-400' :
                            campanha.taxaAbertura >= 0.2 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {(campanha.taxaAbertura * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`font-medium ${
                            campanha.taxaClique >= 0.2 ? 'text-green-400' :
                            campanha.taxaClique >= 0.1 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {(campanha.taxaClique * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`font-medium ${
                            campanha.taxaConversao >= 0.15 ? 'text-green-400' :
                            campanha.taxaConversao >= 0.1 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {(campanha.taxaConversao * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={`font-bold ${
                            campanha.roi >= 400 ? 'text-green-400' :
                            campanha.roi >= 200 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {campanha.roi}%
                          </span>
                          <div className="text-xs text-slate-400">
                            {formatMoeda(campanha.receitaGerada - campanha.custoTotal)}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <Button size="sm" variant="ghost">
                              <Eye className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MoreHorizontal className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Outras tabs */}
        <TabsContent value="eleitores">
          <div className="text-center py-12 text-slate-400">
            <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">Lista de Eleitores</h3>
            <p>Funcionalidade em desenvolvimento</p>
          </div>
        </TabsContent>

        <TabsContent value="segmentos">
          <div className="text-center py-12 text-slate-400">
            <Target className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">Gestão de Segmentos</h3>
            <p>Funcionalidade em desenvolvimento</p>
          </div>
        </TabsContent>

        <TabsContent value="campanhas">
          <div className="text-center py-12 text-slate-400">
            <Send className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">Campanhas de Marketing</h3>
            <p>Funcionalidade em desenvolvimento</p>
          </div>
        </TabsContent>

        <TabsContent value="funil">
          <div className="text-center py-12 text-slate-400">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">Funil de Conversão</h3>
            <p>Funcionalidade em desenvolvimento</p>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="text-center py-12 text-slate-400">
            <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium mb-2">Analytics Avançados</h3>
            <p>Funcionalidade em desenvolvimento</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
