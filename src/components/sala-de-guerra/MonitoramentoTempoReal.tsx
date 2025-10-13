'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  TrendingUp, 
  Eye,
  MessageSquare,
  Heart,
  Share,
  ExternalLink,
  Play,
  Pause,
  Settings
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mencao } from '@/types/sala-de-guerra'

interface MonitoramentoProps {
  candidateId: string
}

export default function MonitoramentoTempoReal({ candidateId }: MonitoramentoProps) {
  const [monitoramentoAtivo, setMonitoramentoAtivo] = useState(true)
  const [filtros, setFiltros] = useState({
    canal: 'todos',
    sentimento: 'todos',
    alcance: 'todos'
  })
  const [busca, setBusca] = useState('')
  const [mencoes, setMencoes] = useState<Mencao[]>([])
  const [estatisticas, setEstatisticas] = useState({
    totalMencoes: 2847,
    sentimentoMedio: 0.23,
    alcanceTotal: 1250000,
    trendingTopics: ['educação', 'saúde', 'economia'],
    alertasAtivos: 3
  })

  // Simular feed em tempo real
  useEffect(() => {
    if (!monitoramentoAtivo) return

    const interval = setInterval(() => {
      // Simular nova menção
      const novaMencao: Mencao = {
        id: Date.now().toString(),
        canal: ['Twitter', 'Instagram', 'Facebook', 'YouTube'][Math.floor(Math.random() * 4)],
        autor: `@usuario${Math.floor(Math.random() * 1000)}`,
        conteudo: 'Nova menção detectada sobre o candidato...',
        sentimento: (Math.random() - 0.5) * 2,
        alcance: Math.floor(Math.random() * 10000),
        engajamento: Math.floor(Math.random() * 1000),
        timestamp: new Date(),
        palavrasChave: ['candidato', 'política'],
        url: '#',
        tipo: 'post',
        verificado: Math.random() > 0.7
      }

      setMencoes(prev => [novaMencao, ...prev.slice(0, 49)]) // Manter apenas 50 mais recentes
    }, 3000) // Nova menção a cada 3 segundos

    return () => clearInterval(interval)
  }, [monitoramentoAtivo])

  const getSentimentoColor = (sentimento: number) => {
    if (sentimento > 0.3) return 'text-green-400'
    if (sentimento < -0.3) return 'text-red-400'
    return 'text-yellow-400'
  }

  const getSentimentoIcon = (sentimento: number) => {
    if (sentimento > 0.3) return '😊'
    if (sentimento < -0.3) return '😠'
    return '😐'
  }

  const marcarComoEvento = (mencao: Mencao) => {
    // Lógica para criar evento crítico a partir da menção
    console.log('Criando evento crítico:', mencao)
  }

  return (
    <div className="space-y-6">
      {/* Header de Controle */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Eye className="w-5 h-5" />
              Monitoramento em Tempo Real
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant={monitoramentoAtivo ? "destructive" : "default"}
                onClick={() => setMonitoramentoAtivo(!monitoramentoAtivo)}
              >
                {monitoramentoAtivo ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Iniciar
                  </>
                )}
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Estatísticas Rápidas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{estatisticas.totalMencoes.toLocaleString()}</div>
              <div className="text-sm text-white/70">Menções Hoje</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${getSentimentoColor(estatisticas.sentimentoMedio)}`}>
                {(estatisticas.sentimentoMedio * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-white/70">Sentimento</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{(estatisticas.alcanceTotal / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-white/70">Alcance Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{estatisticas.alertasAtivos}</div>
              <div className="text-sm text-white/70">Alertas Ativos</div>
            </div>
          </div>

          {/* Controles de Filtro */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Buscar menções..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <select 
              className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
              value={filtros.canal}
              onChange={(e) => setFiltros(prev => ({ ...prev, canal: e.target.value }))}
            >
              <option value="todos">Todos os Canais</option>
              <option value="Twitter">Twitter</option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="YouTube">YouTube</option>
            </select>
            <select 
              className="px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
              value={filtros.sentimento}
              onChange={(e) => setFiltros(prev => ({ ...prev, sentimento: e.target.value }))}
            >
              <option value="todos">Todos Sentimentos</option>
              <option value="positivo">Positivo</option>
              <option value="neutro">Neutro</option>
              <option value="negativo">Negativo</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Feed de Menções */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Feed de Menções</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            <AnimatePresence>
              {mencoes.map((mencao) => (
                <motion.div
                  key={mencao.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {mencao.canal}
                      </Badge>
                      <span className="text-sm text-white/70">{mencao.autor}</span>
                      {mencao.verificado && (
                        <Badge className="bg-blue-500 text-xs">Verificado</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <span>{getSentimentoIcon(mencao.sentimento)}</span>
                      <span>{mencao.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </div>

                  <p className="text-white mb-3">{mencao.conteudo}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {mencao.alcance.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {mencao.engajamento.toLocaleString()}
                      </div>
                      <div className={`flex items-center gap-1 ${getSentimentoColor(mencao.sentimento)}`}>
                        <span>Sentimento: {(mencao.sentimento * 100).toFixed(0)}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => marcarComoEvento(mencao)}
                      >
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Evento
                      </Button>
                    </div>
                  </div>

                  {mencao.palavrasChave.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {mencao.palavrasChave.map((palavra, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {palavra}
                        </Badge>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="w-5 h-5" />
            Trending Topics Relacionados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {estatisticas.trendingTopics.map((topic, index) => (
              <Badge key={index} className="bg-blue-500 hover:bg-blue-600 cursor-pointer">
                #{topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

