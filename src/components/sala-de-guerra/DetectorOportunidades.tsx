'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Zap,
  CheckCircle,
  Eye
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Oportunidade } from '@/types/sala-de-guerra'

export default function DetectorOportunidades({ candidateId }: { candidateId: string }) {
  const [oportunidades, setOportunidades] = useState<Oportunidade[]>([])
  const [filtroTipo, setFiltroTipo] = useState<string>('todas')
  const [ordenacao, setOrdenacao] = useState<'impacto' | 'janela' | 'compatibilidade'>('impacto')

  // Simular detecção de oportunidades
  useEffect(() => {
    const oportunidadesSimuladas: Oportunidade[] = [
      {
        id: '1',
        titulo: '#EducaçãoParaTodos em Alta',
        descricao: 'Trending topic sobre educação com 50K menções/hora. Alinhado com suas propostas educacionais.',
        tipo: 'trending_topic',
        potencialImpacto: 85,
        janelaOportunidade: 3,
        compatibilidade: 95,
        recursosNecessarios: ['Designer', 'Copywriter', 'R$ 5.000'],
        canaisRecomendados: ['Twitter', 'Instagram', 'Facebook'],
        alcanceEstimado: 250000,
        custoEstimado: 5000,
        probabilidadeSucesso: 78,
        palavrasChave: ['educação', 'ensino', 'escola', 'professor'],
        evidencias: ['50K menções/hora', 'Sentimento 72% positivo', 'Engajamento alto'],
        criadaEm: new Date(),
        status: 'detectada'
      },
      {
        id: '2',
        titulo: 'Adversário Silencioso sobre Saúde',
        descricao: 'Principal adversário não se posicionou sobre crise na saúde. Janela para liderar narrativa.',
        tipo: 'lacuna_adversario',
        potencialImpacto: 70,
        janelaOportunidade: 8,
        compatibilidade: 88,
        recursosNecessarios: ['Assessor Médico', 'Comunicação', 'R$ 3.000'],
        canaisRecomendados: ['Imprensa', 'Redes Sociais'],
        alcanceEstimado: 180000,
        custoEstimado: 3000,
        probabilidadeSucesso: 65,
        palavrasChave: ['saúde', 'SUS', 'hospital', 'médico'],
        evidencias: ['0 posts do adversário em 48h', 'Mídia cobrando posição', 'Opinião pública dividida'],
        criadaEm: new Date(Date.now() - 2 * 60 * 60 * 1000),
        status: 'analisando'
      },
      {
        id: '3',
        titulo: 'Evento Esportivo Nacional',
        descricao: 'Final do campeonato hoje. Oportunidade para conectar com torcedores e mostrar proximidade.',
        tipo: 'evento_publico',
        potencialImpacto: 60,
        janelaOportunidade: 6,
        compatibilidade: 45,
        recursosNecessarios: ['Presença física', 'Equipe de mídia', 'R$ 8.000'],
        canaisRecomendados: ['TV', 'Instagram Stories', 'TikTok'],
        alcanceEstimado: 500000,
        custoEstimado: 8000,
        probabilidadeSucesso: 55,
        palavrasChave: ['futebol', 'esporte', 'torcida', 'final'],
        evidencias: ['2M de espectadores esperados', 'Cobertura nacional', 'Momento de união'],
        criadaEm: new Date(Date.now() - 4 * 60 * 60 * 1000),
        status: 'aprovada'
      }
    ]

    setOportunidades(oportunidadesSimuladas)
  }, [])

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'trending_topic': return 'bg-blue-500'
      case 'lacuna_adversario': return 'bg-red-500'
      case 'momento_favoravel': return 'bg-green-500'
      case 'evento_publico': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case 'trending_topic': return 'Trending Topic'
      case 'lacuna_adversario': return 'Lacuna Adversário'
      case 'momento_favoravel': return 'Momento Favorável'
      case 'evento_publico': return 'Evento Público'
      default: return tipo
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'detectada': return 'text-blue-400'
      case 'analisando': return 'text-yellow-400'
      case 'aprovada': return 'text-green-400'
      case 'em_execucao': return 'text-purple-400'
      case 'perdida': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getJanelaColor = (horas: number) => {
    if (horas <= 2) return 'text-red-400'
    if (horas <= 6) return 'text-yellow-400'
    return 'text-green-400'
  }

  const criarEvento = (oportunidade: Oportunidade) => {
    console.log('Criando evento de oportunidade:', oportunidade)
    setOportunidades(prev => 
      prev.map(op => 
        op.id === oportunidade.id 
          ? { ...op, status: 'em_execucao' }
          : op
      )
    )
  }

  const oportunidadesFiltradas = oportunidades
    .filter(op => filtroTipo === 'todas' || op.tipo === filtroTipo)
    .sort((a, b) => {
      switch (ordenacao) {
        case 'impacto': return b.potencialImpacto - a.potencialImpacto
        case 'janela': return a.janelaOportunidade - b.janelaOportunidade
        case 'compatibilidade': return b.compatibilidade - a.compatibilidade
        default: return 0
      }
    })

  return (
    <div className="space-y-6">
      {/* Header e Controles */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Target className="w-5 h-5" />
            Detector de Oportunidades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-4">
              <select 
                className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <option value="todas">Todos os Tipos</option>
                <option value="trending_topic">Trending Topics</option>
                <option value="lacuna_adversario">Lacunas Adversário</option>
                <option value="momento_favoravel">Momentos Favoráveis</option>
                <option value="evento_publico">Eventos Públicos</option>
              </select>

              <select 
                className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value as any)}
              >
                <option value="impacto">Por Impacto</option>
                <option value="janela">Por Urgência</option>
                <option value="compatibilidade">Por Compatibilidade</option>
              </select>
            </div>

            <div className="text-sm text-white/70">
              {oportunidadesFiltradas.length} oportunidades detectadas
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Oportunidades */}
      <div className="space-y-4">
        {oportunidadesFiltradas.map((oportunidade, index) => (
          <motion.div
            key={oportunidade.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTipoColor(oportunidade.tipo)}>
                        {getTipoLabel(oportunidade.tipo)}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(oportunidade.status)}>
                        {oportunidade.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <div className={`flex items-center gap-1 text-sm ${getJanelaColor(oportunidade.janelaOportunidade)}`}>
                        <Clock className="w-4 h-4" />
                        {oportunidade.janelaOportunidade}h restantes
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{oportunidade.titulo}</h3>
                    <p className="text-white/80 mb-4">{oportunidade.descricao}</p>
                  </div>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-white/70 mb-1">Potencial de Impacto</div>
                    <div className="flex items-center gap-2">
                      <Progress value={oportunidade.potencialImpacto} className="flex-1" />
                      <span className="text-sm font-semibold text-white">{oportunidade.potencialImpacto}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Compatibilidade</div>
                    <div className="flex items-center gap-2">
                      <Progress value={oportunidade.compatibilidade} className="flex-1" />
                      <span className="text-sm font-semibold text-white">{oportunidade.compatibilidade}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Prob. Sucesso</div>
                    <div className="flex items-center gap-2">
                      <Progress value={oportunidade.probabilidadeSucesso} className="flex-1" />
                      <span className="text-sm font-semibold text-white">{oportunidade.probabilidadeSucesso}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Alcance Estimado</div>
                    <div className="text-lg font-semibold text-white">
                      {(oportunidade.alcanceEstimado / 1000).toFixed(0)}K
                    </div>
                  </div>
                </div>

                {/* Detalhes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-white/70 mb-2">Recursos Necessários</div>
                    <div className="flex flex-wrap gap-1">
                      {oportunidade.recursosNecessarios.map((recurso, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {recurso}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-2">Canais Recomendados</div>
                    <div className="flex flex-wrap gap-1">
                      {oportunidade.canaisRecomendados.map((canal, index) => (
                        <Badge key={index} className="bg-blue-500 text-xs">
                          {canal}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Evidências */}
                <div className="mb-4">
                  <div className="text-sm text-white/70 mb-2">Evidências</div>
                  <div className="space-y-1">
                    {oportunidade.evidencias.map((evidencia, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        {evidencia}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Palavras-chave */}
                <div className="mb-4">
                  <div className="text-sm text-white/70 mb-2">Palavras-chave</div>
                  <div className="flex flex-wrap gap-1">
                    {oportunidade.palavrasChave.map((palavra, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{palavra}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {(oportunidade.alcanceEstimado / 1000).toFixed(0)}K alcance
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      R$ {oportunidade.custoEstimado.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {oportunidade.janelaOportunidade}h restantes
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      Analisar
                    </Button>
                    {oportunidade.status === 'detectada' && (
                      <Button 
                        size="sm" 
                        className="bg-green-500 hover:bg-green-600"
                        onClick={() => criarEvento(oportunidade)}
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        Aproveitar
                      </Button>
                    )}
                    {oportunidade.status === 'aprovada' && (
                      <Button 
                        size="sm" 
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => criarEvento(oportunidade)}
                      >
                        <Zap className="w-4 h-4 mr-1" />
                        Executar
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

