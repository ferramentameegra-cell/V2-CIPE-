'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Target, TrendingUp, Clock, Zap, Calendar, 
  Users, MessageSquare, Eye, Star, ArrowRight
} from 'lucide-react';

interface Oportunidade {
  id: string;
  titulo: string;
  descricao: string;
  categoria: 'trending' | 'adversario' | 'territorial' | 'temporal' | 'digital';
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  potencial: number; // 1-100
  janelaTempo: string;
  tempoRestante: number; // em horas
  acaoRecomendada: string;
  investimentoSugerido?: string;
  resultadoEsperado: string;
  metricas: {
    alcancePotencial: number;
    engajamentoEsperado: number;
    conversaoEstimada: number;
  };
  compatibilidade: number; // 1-100 - compatibilidade com propostas
  dificuldade: 'facil' | 'media' | 'dificil';
  status: 'nova' | 'analisando' | 'aprovada' | 'executando' | 'perdida';
}

export default function OportunidadesEstrategicas() {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([
    {
      id: '1',
      titulo: 'Trending Topic: "Educação Digital"',
      descricao: 'Tópico educação digital em alta com 25K menções positivas. Momento ideal para destacar propostas de inclusão digital nas escolas.',
      categoria: 'trending',
      prioridade: 'critica',
      potencial: 92,
      janelaTempo: '6 horas',
      tempoRestante: 4.5,
      acaoRecomendada: 'Publicar vídeo sobre inclusão digital + impulsionar R$ 500',
      investimentoSugerido: 'R$ 500',
      resultadoEsperado: '150K alcance, 12% engajamento, 500 novos seguidores',
      metricas: {
        alcancePotencial: 150000,
        engajamentoEsperado: 12.5,
        conversaoEstimada: 8.2
      },
      compatibilidade: 95,
      dificuldade: 'facil',
      status: 'nova'
    },
    {
      id: '2',
      titulo: 'Lacuna do Adversário: Zona Norte',
      descricao: 'João Silva não visitou a Zona Norte em 3 semanas. Oportunidade de fortalecer presença na região com maior densidade eleitoral.',
      categoria: 'territorial',
      prioridade: 'alta',
      potencial: 85,
      janelaTempo: '2 semanas',
      tempoRestante: 336, // 14 dias
      acaoRecomendada: 'Agendar 3 eventos na Zona Norte + campanha digital localizada',
      resultadoEsperado: '5K novos apoiadores, fortalecimento regional',
      metricas: {
        alcancePotencial: 80000,
        engajamentoEsperado: 9.5,
        conversaoEstimada: 6.2
      },
      compatibilidade: 88,
      dificuldade: 'media',
      status: 'analisando'
    },
    {
      id: '3',
      titulo: 'Momento Viral: Sustentabilidade',
      descricao: 'Movimento ambientalista ganhando tração. Oportunidade de associar imagem com sustentabilidade através de projetos já aprovados.',
      categoria: 'digital',
      prioridade: 'alta',
      potencial: 78,
      janelaTempo: '12 horas',
      tempoRestante: 8,
      acaoRecomendada: 'Série de posts sobre projetos ambientais + parcerias com influenciadores verdes',
      investimentoSugerido: 'R$ 800',
      resultadoEsperado: '200K alcance, associação com sustentabilidade',
      metricas: {
        alcancePotencial: 200000,
        engajamentoEsperado: 10.8,
        conversaoEstimada: 5.5
      },
      compatibilidade: 82,
      dificuldade: 'media',
      status: 'aprovada'
    },
    {
      id: '4',
      titulo: 'Evento Adversário: Contra-Narrativa',
      descricao: 'Maria Santos fará evento sobre economia amanhã. Oportunidade de antecipar narrativa com dados de suas realizações econômicas.',
      categoria: 'adversario',
      prioridade: 'media',
      potencial: 70,
      janelaTempo: '18 horas',
      tempoRestante: 12,
      acaoRecomendada: 'Post antecipado com dados econômicos + infográfico comparativo',
      resultadoEsperado: 'Neutralizar narrativa adversária, destacar realizações',
      metricas: {
        alcancePotencial: 120000,
        engajamentoEsperado: 8.2,
        conversaoEstimada: 4.8
      },
      compatibilidade: 90,
      dificuldade: 'facil',
      status: 'executando'
    }
  ]);

  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');

  const getCategoriaColor = (categoria: Oportunidade['categoria']) => {
    switch (categoria) {
      case 'trending': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'adversario': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'territorial': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'temporal': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'digital': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
    }
  };

  const getPrioridadeColor = (prioridade: Oportunidade['prioridade']) => {
    switch (prioridade) {
      case 'baixa': return 'bg-gray-500/20 text-gray-300';
      case 'media': return 'bg-yellow-500/20 text-yellow-300';
      case 'alta': return 'bg-orange-500/20 text-orange-300';
      case 'critica': return 'bg-red-500/20 text-red-300 animate-pulse';
    }
  };

  const getDificuldadeColor = (dificuldade: Oportunidade['dificuldade']) => {
    switch (dificuldade) {
      case 'facil': return 'text-green-400';
      case 'media': return 'text-yellow-400';
      case 'dificil': return 'text-red-400';
    }
  };

  const getTempoRestanteFormatado = (horas: number) => {
    if (horas < 1) return `${Math.round(horas * 60)}min`;
    if (horas < 24) return `${Math.round(horas)}h`;
    return `${Math.round(horas / 24)}d`;
  };

  const oportunidadesFiltradas = filtroCategoria === 'todas' 
    ? oportunidades 
    : oportunidades.filter(op => op.categoria === filtroCategoria);

  const oportunidadesCriticas = oportunidades.filter(op => op.prioridade === 'critica').length;
  const oportunidadesAltas = oportunidades.filter(op => op.prioridade === 'alta').length;

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-green-400" />
            <div>
              <CardTitle className="text-lg font-semibold text-white">Oportunidades Estratégicas</CardTitle>
              <p className="text-sm text-slate-400">
                {oportunidadesCriticas} críticas • {oportunidadesAltas} altas • Atualizado em tempo real
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              {oportunidades.length} ATIVAS
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'todas', label: 'Todas' },
            { id: 'trending', label: 'Trending Topics' },
            { id: 'adversario', label: 'Adversários' },
            { id: 'territorial', label: 'Territorial' },
            { id: 'digital', label: 'Digital' }
          ].map((filtro) => (
            <Button
              key={filtro.id}
              variant={filtroCategoria === filtro.id ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroCategoria(filtro.id)}
              className={`text-xs transition-all duration-300 ${
                filtroCategoria === filtro.id 
                  ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-green-500/50 shadow-lg shadow-green-500/25' 
                  : 'bg-slate-800/30 hover:bg-slate-700/50 text-slate-300 border-slate-600/50 hover:text-white hover:border-slate-500/50 backdrop-blur-sm'
              }`}
            >
              {filtro.label}
            </Button>
          ))}
        </div>

        {/* Lista de Oportunidades */}
        <div className="space-y-3">
          {oportunidadesFiltradas.map((oportunidade, index) => (
            <motion.div
              key={oportunidade.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 rounded-lg border border-slate-700/50 bg-slate-800/30 hover:bg-slate-800/50 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getCategoriaColor(oportunidade.categoria)}>
                      {oportunidade.categoria.toUpperCase()}
                    </Badge>
                    <Badge className={getPrioridadeColor(oportunidade.prioridade)}>
                      {oportunidade.prioridade.toUpperCase()}
                    </Badge>
                    <Badge className="bg-slate-600/30 text-slate-300">
                      <Clock className="w-3 h-3 mr-1" />
                      {getTempoRestanteFormatado(oportunidade.tempoRestante)}
                    </Badge>
                  </div>
                  
                  <h3 className="text-base font-semibold text-white mb-1">{oportunidade.titulo}</h3>
                  <p className="text-sm text-slate-400 mb-2">{oportunidade.descricao}</p>
                </div>
                
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {oportunidade.potencial}%
                  </div>
                  <div className="text-xs text-slate-400">potencial</div>
                </div>
              </div>
              
              {/* Métricas */}
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center p-2 bg-blue-500/10 rounded">
                  <div className="text-sm font-bold text-blue-400">
                    {(oportunidade.metricas.alcancePotencial / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-slate-400">Alcance</div>
                </div>
                <div className="text-center p-2 bg-green-500/10 rounded">
                  <div className="text-sm font-bold text-green-400">
                    {oportunidade.metricas.engajamentoEsperado}%
                  </div>
                  <div className="text-xs text-slate-400">Engajamento</div>
                </div>
                <div className="text-center p-2 bg-purple-500/10 rounded">
                  <div className="text-sm font-bold text-purple-400">
                    {oportunidade.metricas.conversaoEstimada}%
                  </div>
                  <div className="text-xs text-slate-400">Conversão</div>
                </div>
              </div>
              
              {/* Ação Recomendada */}
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg mb-2">
                <p className="text-sm font-medium text-green-300 mb-1">💡 Ação Recomendada:</p>
                <p className="text-sm text-green-200/80">{oportunidade.acaoRecomendada}</p>
                {oportunidade.investimentoSugerido && (
                  <p className="text-xs text-green-400 mt-1">
                    Investimento: {oportunidade.investimentoSugerido}
                  </p>
                )}
              </div>
              
              {/* Resultado Esperado */}
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
                <p className="text-sm font-medium text-blue-300 mb-1">🎯 Resultado Esperado:</p>
                <p className="text-sm text-blue-200/80">{oportunidade.resultadoEsperado}</p>
              </div>
              
              {/* Informações Adicionais */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span>🎯 Compatibilidade: {oportunidade.compatibilidade}%</span>
                  <span className={getDificuldadeColor(oportunidade.dificuldade)}>
                    ⚡ Dificuldade: {oportunidade.dificuldade}
                  </span>
                  <span>⏰ Janela: {oportunidade.janelaTempo}</span>
                </div>
              </div>
              
              {/* Ações */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Zap className="w-4 h-4 mr-1" />
                    Executar Agora
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="w-4 h-4 mr-1" />
                    Agendar
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4 mr-1" />
                    Analisar
                  </Button>
                </div>
                
                <Button size="sm" variant="ghost" className="text-slate-400">
                  Ver Detalhes
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
