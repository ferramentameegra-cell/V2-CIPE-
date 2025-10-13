'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Clock, 
  Download, 
  Search,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Eye,
  User
} from 'lucide-react'
import { motion } from 'framer-motion'
import { EventoHistorico } from '@/types/sala-de-guerra'

export default function TimelineEventos({ candidateId }: { candidateId: string }) {
  const [eventos, setEventos] = useState<EventoHistorico[]>([
    {
      id: '1',
      tipo: 'crise',
      titulo: 'Fake News sobre Proposta Econômica',
      descricao: 'Desinformação viral sobre aumento de impostos. Resposta coordenada executada.',
      severidade: 'CRITICA',
      status: 'RESOLVIDO',
      responsavel: 'Ana Silva',
      impacto: -15,
      custoReal: 8500,
      tempoExecucao: 120,
      resultados: 'Fake news desmentida. Alcance da correção: 450K pessoas. Sentimento recuperado em 6h.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      tags: ['fake-news', 'economia', 'resposta-rapida']
    },
    {
      id: '2',
      tipo: 'oportunidade',
      titulo: 'Trending Topic #EducaçãoParaTodos',
      descricao: 'Aproveitamento de trending topic sobre educação alinhado com propostas.',
      status: 'EXECUTADO',
      responsavel: 'Maria Santos',
      impacto: 25,
      custoReal: 3200,
      tempoExecucao: 45,
      resultados: 'Engajamento 340% acima da média. 12K novos seguidores. Menções positivas +180%.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      tags: ['trending-topic', 'educacao', 'oportunidade']
    },
    {
      id: '3',
      tipo: 'acao',
      titulo: 'Mobilização Base - Resposta Ataque',
      descricao: 'Mobilização urgente da base após ataque coordenado de adversários.',
      status: 'CONCLUIDO',
      responsavel: 'Carlos Lima',
      impacto: 18,
      custoReal: 5600,
      tempoExecucao: 90,
      resultados: '15K apoiadores mobilizados. 2.3M impressões orgânicas. Narrativa revertida.',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      tags: ['mobilizacao', 'base', 'defesa']
    },
    {
      id: '4',
      tipo: 'crise',
      titulo: 'Crítica de Influenciador',
      descricao: 'Influenciador com 2M seguidores criticou proposta de saúde.',
      severidade: 'MEDIA',
      status: 'MONITORANDO',
      responsavel: 'Ana Silva',
      impacto: -8,
      custoReal: 1200,
      tempoExecucao: 30,
      resultados: 'Resposta educativa publicada. Diálogo aberto. Impacto controlado.',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      tags: ['influenciador', 'saude', 'dialogo']
    },
    {
      id: '5',
      tipo: 'oportunidade',
      titulo: 'Evento Esportivo Nacional',
      descricao: 'Participação em final de campeonato para conectar com torcedores.',
      status: 'PERDIDA',
      responsavel: 'Maria Santos',
      impacto: 0,
      custoReal: 0,
      tempoExecucao: 0,
      resultados: 'Oportunidade perdida por conflito de agenda. Janela de 6h não aproveitada.',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      tags: ['esporte', 'evento', 'perdida']
    }
  ])

  const [filtros, setFiltros] = useState({
    tipo: 'todos',
    status: 'todos',
    periodo: '30dias'
  })
  const [busca, setBusca] = useState('')

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'crise': return AlertTriangle
      case 'oportunidade': return TrendingUp
      case 'acao': return CheckCircle
      case 'atualizacao': return Eye
      default: return Clock
    }
  }

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'crise': return 'text-red-400'
      case 'oportunidade': return 'text-green-400'
      case 'acao': return 'text-blue-400'
      case 'atualizacao': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RESOLVIDO':
      case 'EXECUTADO':
      case 'CONCLUIDO': return 'bg-green-500'
      case 'MONITORANDO': return 'bg-yellow-500'
      case 'PERDIDA': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getImpactoColor = (impacto: number) => {
    if (impacto > 0) return 'text-green-400'
    if (impacto < 0) return 'text-red-400'
    return 'text-gray-400'
  }

  const eventosFiltrados = eventos
    .filter(evento => {
      if (filtros.tipo !== 'todos' && evento.tipo !== filtros.tipo) return false
      if (filtros.status !== 'todos' && evento.status !== filtros.status) return false
      if (busca && !evento.titulo.toLowerCase().includes(busca.toLowerCase()) && 
          !evento.descricao.toLowerCase().includes(busca.toLowerCase())) return false
      return true
    })
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  const exportarHistorico = () => {
    console.log('Exportando histórico...')
  }

  return (
    <div className="space-y-6">
      {/* Header e Controles */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5" />
              Histórico de Operações
            </CardTitle>
            <Button 
              onClick={exportarHistorico}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{eventos.length}</div>
              <div className="text-sm text-white/70">Total Eventos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {eventos.filter(e => ['RESOLVIDO', 'EXECUTADO', 'CONCLUIDO'].includes(e.status)).length}
              </div>
              <div className="text-sm text-white/70">Resolvidos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {eventos.reduce((acc, e) => acc + (e.impacto || 0), 0) > 0 ? '+' : ''}
                {eventos.reduce((acc, e) => acc + (e.impacto || 0), 0)}
              </div>
              <div className="text-sm text-white/70">Impacto Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                R$ {eventos.reduce((acc, e) => acc + (e.custoReal || 0), 0).toLocaleString()}
              </div>
              <div className="text-sm text-white/70">Custo Total</div>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Buscar eventos..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <select 
              className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
              value={filtros.tipo}
              onChange={(e) => setFiltros(prev => ({ ...prev, tipo: e.target.value }))}
            >
              <option value="todos">Todos os Tipos</option>
              <option value="crise">Crises</option>
              <option value="oportunidade">Oportunidades</option>
              <option value="acao">Ações</option>
              <option value="atualizacao">Atualizações</option>
            </select>
            <select 
              className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
              value={filtros.status}
              onChange={(e) => setFiltros(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="todos">Todos Status</option>
              <option value="RESOLVIDO">Resolvido</option>
              <option value="EXECUTADO">Executado</option>
              <option value="MONITORANDO">Monitorando</option>
              <option value="PERDIDA">Perdida</option>
            </select>
            <select 
              className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
              value={filtros.periodo}
              onChange={(e) => setFiltros(prev => ({ ...prev, periodo: e.target.value }))}
            >
              <option value="7dias">Últimos 7 dias</option>
              <option value="30dias">Últimos 30 dias</option>
              <option value="90dias">Últimos 90 dias</option>
              <option value="todos">Todo período</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Timeline de Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Linha da Timeline */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/20"></div>
            
            <div className="space-y-6">
              {eventosFiltrados.map((evento, index) => {
                const IconeTipo = getTipoIcon(evento.tipo)
                return (
                  <motion.div
                    key={evento.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex gap-6"
                  >
                    {/* Ícone na Timeline */}
                    <div className={`relative z-10 w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center ${getTipoColor(evento.tipo)}`}>
                      <IconeTipo className="w-6 h-6" />
                    </div>

                    {/* Conteúdo do Evento */}
                    <div className="flex-1 pb-6">
                      <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className={getStatusColor(evento.status)}>
                                  {evento.status}
                                </Badge>
                                <span className="text-xs text-white/70">
                                  {evento.timestamp.toLocaleDateString()} às {evento.timestamp.toLocaleTimeString()}
                                </span>
                              </div>
                              <h4 className="text-lg font-bold text-white mb-1">{evento.titulo}</h4>
                              <p className="text-sm text-white/80 mb-2">{evento.descricao}</p>
                            </div>
                          </div>

                          {/* Métricas */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            {evento.impacto !== undefined && (
                              <div>
                                <div className="text-xs text-white/70">Impacto</div>
                                <div className={`text-sm font-semibold ${getImpactoColor(evento.impacto)}`}>
                                  {evento.impacto > 0 ? '+' : ''}{evento.impacto}%
                                </div>
                              </div>
                            )}
                            {evento.custoReal !== undefined && (
                              <div>
                                <div className="text-xs text-white/70">Custo</div>
                                <div className="text-sm font-semibold text-white">
                                  R$ {evento.custoReal.toLocaleString()}
                                </div>
                              </div>
                            )}
                            {evento.tempoExecucao !== undefined && (
                              <div>
                                <div className="text-xs text-white/70">Tempo</div>
                                <div className="text-sm font-semibold text-white">
                                  {evento.tempoExecucao}min
                                </div>
                              </div>
                            )}
                            <div>
                              <div className="text-xs text-white/70">Responsável</div>
                              <div className="text-sm font-semibold text-white flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {evento.responsavel}
                              </div>
                            </div>
                          </div>

                          {/* Resultados */}
                          {evento.resultados && (
                            <div className="mb-3 p-2 bg-white/5 rounded">
                              <div className="text-xs text-white/70 mb-1">Resultados</div>
                              <div className="text-sm text-white">{evento.resultados}</div>
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            {evento.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

