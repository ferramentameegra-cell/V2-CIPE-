'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  Users, TrendingUp, Target, Brain, Zap, Filter,
  ChevronRight, AlertTriangle, CheckCircle, Eye, Settings,
  ArrowUp, ArrowDown, Minus
} from 'lucide-react';

interface EspectroData {
  categoria: string;
  quantidade: number;
  percentual: number;
  tendencia: 'up' | 'down' | 'stable';
  variacao: number;
  cor: string;
}

interface SegmentoData {
  id: string;
  nome: string;
  descricao: string;
  totalEleitores: number;
  percentualBase: number;
  potencialCrescimento: number;
  nivelEngajamento: number;
  prioridade: number;
  cor: string;
  icone: string;
  status: 'ativo' | 'inativo' | 'analise';
}

interface TendenciaData {
  periodo: string;
  extremaEsquerda: number;
  esquerda: number;
  centroEsquerda: number;
  centro: number;
  centroDireita: number;
  direita: number;
  extremaDireita: number;
}

interface DimensaoIdeologica {
  dimensao: string;
  valor: number;
  maximo: number;
}

export default function AnaliseIdeologica({ candidateId }: { candidateId: string }) {
  const [espectroData, setEspectroData] = useState<EspectroData[]>([]);
  const [segmentos, setSegmentos] = useState<SegmentoData[]>([]);
  const [tendencias, setTendencias] = useState<TendenciaData[]>([]);
  const [dimensoes, setDimensoes] = useState<DimensaoIdeologica[]>([]);
  const [filtroTempo, setFiltroTempo] = useState('30d');
  const [viewMode, setViewMode] = useState<'overview' | 'segmentos' | 'tendencias'>('overview');

  // Dados simulados do espectro ideológico
  useEffect(() => {
    const espectroSimulado: EspectroData[] = [
      {
        categoria: 'Extrema Esquerda',
        quantidade: 1250,
        percentual: 3.2,
        tendencia: 'down',
        variacao: -0.3,
        cor: '#DC2626'
      },
      {
        categoria: 'Esquerda',
        quantidade: 6890,
        percentual: 17.8,
        tendencia: 'down',
        variacao: -1.2,
        cor: '#EF4444'
      },
      {
        categoria: 'Centro-Esquerda',
        quantidade: 5670,
        percentual: 14.6,
        tendencia: 'up',
        variacao: 2.1,
        cor: '#F97316'
      },
      {
        categoria: 'Centro',
        quantidade: 11340,
        percentual: 29.3,
        tendencia: 'up',
        variacao: 3.8,
        cor: '#EAB308'
      },
      {
        categoria: 'Centro-Direita',
        quantidade: 7890,
        percentual: 20.4,
        tendencia: 'up',
        variacao: 4.2,
        cor: '#22C55E'
      },
      {
        categoria: 'Direita',
        quantidade: 4560,
        percentual: 11.8,
        tendencia: 'stable',
        variacao: 0.1,
        cor: '#3B82F6'
      },
      {
        categoria: 'Extrema Direita',
        quantidade: 1120,
        percentual: 2.9,
        tendencia: 'down',
        variacao: -0.8,
        cor: '#8B5CF6'
      }
    ];

    const segmentosSimulados: SegmentoData[] = [
      {
        id: '1',
        nome: 'Moderados Pragmáticos',
        descricao: 'Eleitores de centro que priorizam resultados práticos',
        totalEleitores: 8450,
        percentualBase: 21.8,
        potencialCrescimento: 15.2,
        nivelEngajamento: 72.5,
        prioridade: 5,
        cor: '#EAB308',
        icone: 'balance-scale',
        status: 'ativo'
      },
      {
        id: '2',
        nome: 'Conservadores Econômicos',
        descricao: 'Apoiam livre mercado mas são socialmente moderados',
        totalEleitores: 6780,
        percentualBase: 17.5,
        potencialCrescimento: 22.8,
        nivelEngajamento: 68.3,
        prioridade: 4,
        cor: '#22C55E',
        icone: 'trending-up',
        status: 'ativo'
      },
      {
        id: '3',
        nome: 'Progressistas Urbanos',
        descricao: 'Jovens urbanos com agenda social progressista',
        totalEleitores: 5230,
        percentualBase: 13.5,
        potencialCrescimento: 8.7,
        nivelEngajamento: 84.2,
        prioridade: 3,
        cor: '#F97316',
        icone: 'users',
        status: 'ativo'
      },
      {
        id: '4',
        nome: 'Tradicionalistas Rurais',
        descricao: 'Eleitores rurais com valores tradicionais',
        totalEleitores: 4890,
        percentualBase: 12.6,
        potencialCrescimento: 5.3,
        nivelEngajamento: 56.7,
        prioridade: 2,
        cor: '#3B82F6',
        icone: 'home',
        status: 'analise'
      },
      {
        id: '5',
        nome: 'Independentes Críticos',
        descricao: 'Eleitores céticos que avaliam caso a caso',
        totalEleitores: 3670,
        percentualBase: 9.5,
        potencialCrescimento: 18.9,
        nivelEngajamento: 45.8,
        prioridade: 3,
        cor: '#8B5CF6',
        icone: 'eye',
        status: 'ativo'
      }
    ];

    const tendenciasSimuladas: TendenciaData[] = [
      { periodo: 'Jan', extremaEsquerda: 3.8, esquerda: 19.2, centroEsquerda: 12.4, centro: 25.6, centroDireita: 16.2, direita: 12.8, extremaDireita: 3.7 },
      { periodo: 'Fev', extremaEsquerda: 3.6, esquerda: 18.9, centroEsquerda: 13.1, centro: 26.8, centroDireita: 17.1, direita: 12.5, extremaDireita: 3.4 },
      { periodo: 'Mar', extremaEsquerda: 3.4, esquerda: 18.5, centroEsquerda: 13.8, centro: 27.9, centroDireita: 18.2, direita: 12.2, extremaDireita: 3.1 },
      { periodo: 'Abr', extremaEsquerda: 3.3, esquerda: 18.1, centroEsquerda: 14.2, centro: 28.5, centroDireita: 19.1, direita: 11.9, extremaDireita: 2.9 },
      { periodo: 'Mai', extremaEsquerda: 3.2, esquerda: 17.8, centroEsquerda: 14.6, centro: 29.3, centroDireita: 20.4, direita: 11.8, extremaDireita: 2.9 }
    ];

    const dimensoesSimuladas: DimensaoIdeologica[] = [
      { dimensao: 'Econômico', valor: 65, maximo: 100 },
      { dimensao: 'Social', valor: 45, maximo: 100 },
      { dimensao: 'Autoritário', valor: 35, maximo: 100 },
      { dimensao: 'Nacionalismo', valor: 55, maximo: 100 },
      { dimensao: 'Religioso', valor: 40, maximo: 100 },
      { dimensao: 'Ambiental', valor: 70, maximo: 100 }
    ];

    setEspectroData(espectroSimulado);
    setSegmentos(segmentosSimulados);
    setTendencias(tendenciasSimuladas);
    setDimensoes(dimensoesSimuladas);
  }, []);

  const getTendenciaIcon = (tendencia: 'up' | 'down' | 'stable') => {
    switch (tendencia) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-400" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-400" />;
      case 'stable': return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'inativo': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'analise': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const totalEleitores = espectroData.reduce((sum, item) => sum + item.quantidade, 0);

  return (
    <div className="space-y-4 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Análise Ideológica</h1>
          <p className="text-sm text-slate-400">Mapeamento e segmentação do perfil ideológico dos eleitores</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            className="px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
            value={filtroTempo}
            onChange={(e) => setFiltroTempo(e.target.value)}
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 3 meses</option>
            <option value="1y">Último ano</option>
          </select>
          
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-blue-400">{totalEleitores.toLocaleString()}</div>
            <div className="text-xs text-slate-400">Mapeados</div>
            <div className="text-xs text-green-400">+2.3K</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-green-400">{segmentos.length}</div>
            <div className="text-xs text-slate-400">Segmentos</div>
            <div className="text-xs text-slate-400">ativos</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-purple-400">73.2%</div>
            <div className="text-xs text-slate-400">Confiança</div>
            <div className="text-xs text-green-400">+1.8%</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-orange-400">29.3%</div>
            <div className="text-xs text-slate-400">Centro</div>
            <div className="text-xs text-green-400">+3.8%</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-cyan-400">84.2%</div>
            <div className="text-xs text-slate-400">Engajamento</div>
            <div className="text-xs text-slate-400">Prog. Urbanos</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-yellow-400">22.8%</div>
            <div className="text-xs text-slate-400">Potencial</div>
            <div className="text-xs text-slate-400">Cons. Econômicos</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Navegação */}
      <div className="flex space-x-2 border-b border-slate-700">
        <button
          onClick={() => setViewMode('overview')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            viewMode === 'overview' 
              ? 'text-blue-400 border-b-2 border-blue-400' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Visão Geral
        </button>
        <button
          onClick={() => setViewMode('segmentos')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            viewMode === 'segmentos' 
              ? 'text-blue-400 border-b-2 border-blue-400' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Segmentos
        </button>
        <button
          onClick={() => setViewMode('tendencias')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            viewMode === 'tendencias' 
              ? 'text-blue-400 border-b-2 border-blue-400' 
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Tendências
        </button>
      </div>

      {/* Visão Geral */}
      {viewMode === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Espectro Ideológico */}
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Espectro Ideológico</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={espectroData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="categoria" 
                      stroke="#9CA3AF"
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#9CA3AF" fontSize={10} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Bar dataKey="quantidade" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                      {espectroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.cor} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="mt-3 space-y-1">
                  {espectroData.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-800/30 rounded text-xs">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: item.cor }}
                        />
                        <span className="text-white">{item.categoria}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{item.percentual}%</span>
                        {getTendenciaIcon(item.tendencia)}
                        <span className={`${
                          item.variacao > 0 ? 'text-green-400' : 
                          item.variacao < 0 ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {item.variacao > 0 ? '+' : ''}{item.variacao}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dimensões Ideológicas */}
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Dimensões Ideológicas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RadarChart data={dimensoes}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="dimensao" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 100]} 
                      tick={{ fill: '#9CA3AF', fontSize: 9 }}
                    />
                    <Radar
                      name="Posição"
                      dataKey="valor"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
                
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {dimensoes.map((dim, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">{dim.dimensao}</span>
                        <span className="text-white font-medium">{dim.valor}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div 
                          className="bg-purple-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${dim.valor}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Estratégicos */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Insights Estratégicos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-300">Oportunidade</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong>Centro-Direita</strong> cresceu 4.2% e tem alta receptividade. 
                    Foque em mensagens sobre empreendedorismo e geração de empregos.
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-300">Atenção</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong>Esquerda</strong> perdeu 1.2% de apoio. Analise migração para Centro-Esquerda 
                    e ajuste estratégia para reconquistar esse público.
                  </p>
                </div>
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-300">Monitorar</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    <strong>Independentes Críticos</strong> têm baixo engajamento (45.8%) mas alto potencial (18.9%). 
                    Desenvolva conteúdo analítico.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Segmentos */}
      {viewMode === 'segmentos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Segmentos Ideológicos</h2>
            <Button className="bg-green-600 hover:bg-green-700" size="sm">
              <Target className="w-4 h-4 mr-2" />
              Criar Segmento
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {segmentos.map((segmento, index) => (
              <motion.div
                key={segmento.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="glass-card hover:bg-slate-800/50 transition-all cursor-pointer h-full">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                          style={{ backgroundColor: segmento.cor }}
                        >
                          {segmento.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-white">{segmento.nome}</h3>
                          <p className="text-xs text-slate-400">{segmento.descricao}</p>
                        </div>
                      </div>
                      
                      <Badge className={getStatusColor(segmento.status)} variant="outline">
                        {segmento.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="text-center p-2 bg-slate-800/30 rounded">
                        <div className="text-base font-bold text-blue-400">
                          {segmento.totalEleitores.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-400">Eleitores</div>
                      </div>
                      <div className="text-center p-2 bg-slate-800/30 rounded">
                        <div className="text-base font-bold text-green-400">
                          {segmento.percentualBase}%
                        </div>
                        <div className="text-xs text-slate-400">da Base</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Potencial</span>
                          <span>{segmento.potencialCrescimento}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <div 
                            className="bg-purple-500 h-1.5 rounded-full transition-all"
                            style={{ width: `${segmento.potencialCrescimento}%` }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Engajamento</span>
                          <span>{segmento.nivelEngajamento}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <div 
                            className="bg-orange-500 h-1.5 rounded-full transition-all"
                            style={{ width: `${segmento.nivelEngajamento}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < segmento.prioridade ? 'bg-yellow-400' : 'bg-slate-600'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-slate-400 ml-1">Prioridade</span>
                      </div>
                      
                      <Button size="sm" variant="outline" className="text-xs">
                        Detalhes
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Tendências */}
      {viewMode === 'tendencias' && (
        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-white">Evolução do Espectro Ideológico</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={tendencias}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="periodo" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line type="monotone" dataKey="centro" stroke="#EAB308" strokeWidth={3} name="Centro" />
                  <Line type="monotone" dataKey="centroDireita" stroke="#22C55E" strokeWidth={2} name="Centro-Direita" />
                  <Line type="monotone" dataKey="esquerda" stroke="#EF4444" strokeWidth={2} name="Esquerda" />
                  <Line type="monotone" dataKey="centroEsquerda" stroke="#F97316" strokeWidth={2} name="Centro-Esquerda" />
                  <Line type="monotone" dataKey="direita" stroke="#3B82F6" strokeWidth={2} name="Direita" />
                </LineChart>
              </ResponsiveContainer>

              {/* Legenda */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
                {[
                  { nome: 'Centro', cor: '#EAB308' },
                  { nome: 'Centro-Direita', cor: '#22C55E' },
                  { nome: 'Esquerda', cor: '#EF4444' },
                  { nome: 'Centro-Esquerda', cor: '#F97316' },
                  { nome: 'Direita', cor: '#3B82F6' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.cor }}
                    />
                    <span className="text-xs text-slate-300">{item.nome}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-blue-200">
                  <Target className="w-3 h-3 inline mr-1" />
                  <strong>Insight:</strong> Centro e Centro-Direita mostram crescimento consistente nos últimos 5 meses. 
                  Oportunidade de consolidar posição moderada com foco econômico.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

