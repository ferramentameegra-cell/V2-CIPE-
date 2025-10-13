'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  Plus, 
  Edit, 
  Phone, 
  MessageSquare,
  Award,
  User,
  Settings
} from 'lucide-react'
import { motion } from 'framer-motion'
import { MembroEquipe } from '@/types/sala-de-guerra'

export default function EquipeOperacional({ candidateId }: { candidateId: string }) {
  const [membros, setMembros] = useState<MembroEquipe[]>([
    {
      id: '1',
      usuarioId: 'user1',
      nome: 'Ana Silva',
      email: 'ana.silva@campanha.com',
      telefone: '+55 11 99999-0001',
      papel: 'COORDENADOR_GERAL',
      especialidades: ['Gestão de Crises', 'Coordenação', 'Estratégia'],
      status: 'DISPONIVEL',
      cargaTrabalho: 75,
      eventosAtivos: 3,
      tempoMedioResposta: 8,
      avaliacaoPerformance: 4.8,
      ultimaAtividade: new Date(Date.now() - 15 * 60 * 1000),
      disponibilidade: {
        segunda: ['08:00-18:00'],
        terca: ['08:00-18:00'],
        quarta: ['08:00-18:00'],
        quinta: ['08:00-18:00'],
        sexta: ['08:00-18:00'],
        sabado: ['09:00-15:00'],
        domingo: []
      },
      criadoEm: new Date('2024-01-01')
    },
    {
      id: '2',
      usuarioId: 'user2',
      nome: 'Carlos Lima',
      email: 'carlos.lima@campanha.com',
      telefone: '+55 11 99999-0002',
      papel: 'ANALISTA_CRISES',
      especialidades: ['Análise de Dados', 'Monitoramento', 'Relatórios'],
      status: 'OCUPADO',
      cargaTrabalho: 90,
      eventosAtivos: 2,
      tempoMedioResposta: 12,
      avaliacaoPerformance: 4.5,
      ultimaAtividade: new Date(Date.now() - 5 * 60 * 1000),
      disponibilidade: {
        segunda: ['09:00-17:00'],
        terca: ['09:00-17:00'],
        quarta: ['09:00-17:00'],
        quinta: ['09:00-17:00'],
        sexta: ['09:00-17:00'],
        sabado: [],
        domingo: []
      },
      criadoEm: new Date('2024-01-05')
    },
    {
      id: '3',
      usuarioId: 'user3',
      nome: 'Maria Santos',
      email: 'maria.santos@campanha.com',
      telefone: '+55 11 99999-0003',
      papel: 'COMUNICADOR',
      especialidades: ['Redes Sociais', 'Copywriting', 'Design'],
      status: 'DISPONIVEL',
      cargaTrabalho: 60,
      eventosAtivos: 1,
      tempoMedioResposta: 15,
      avaliacaoPerformance: 4.7,
      ultimaAtividade: new Date(Date.now() - 30 * 60 * 1000),
      disponibilidade: {
        segunda: ['10:00-19:00'],
        terca: ['10:00-19:00'],
        quarta: ['10:00-19:00'],
        quinta: ['10:00-19:00'],
        sexta: ['10:00-19:00'],
        sabado: ['10:00-16:00'],
        domingo: []
      },
      criadoEm: new Date('2024-01-10')
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DISPONIVEL': return 'bg-green-500'
      case 'OCUPADO': return 'bg-yellow-500'
      case 'AUSENTE': return 'bg-orange-500'
      case 'OFFLINE': return 'bg-red-500'
      default: return 'bg-slate-500'
    }
  }

  const getPapelLabel = (papel: string) => {
    switch (papel) {
      case 'COORDENADOR_GERAL': return 'Coordenador Geral'
      case 'ANALISTA_CRISES': return 'Analista de Crises'
      case 'ESPECIALISTA_DIGITAL': return 'Especialista Digital'
      case 'COMUNICADOR': return 'Comunicador'
      case 'MONITOR_TEMPO_REAL': return 'Monitor Tempo Real'
      case 'EXECUTOR_ACOES': return 'Executor de Ações'
      default: return papel
    }
  }

  const getCargaColor = (carga: number) => {
    if (carga >= 90) return 'text-red-400'
    if (carga >= 70) return 'text-yellow-400'
    return 'text-green-400'
  }

  const contatar = (membro: MembroEquipe, tipo: 'telefone' | 'whatsapp') => {
    if (tipo === 'telefone') {
      window.open(`tel:${membro.telefone}`)
    } else {
      window.open(`https://wa.me/${membro.telefone?.replace(/\D/g, '')}`)
    }
  }

  const atribuirEvento = (membroId: string) => {
    setMembros(prev => 
      prev.map(m => 
        m.id === membroId 
          ? { 
              ...m, 
              eventosAtivos: m.eventosAtivos + 1,
              cargaTrabalho: Math.min(100, m.cargaTrabalho + 20),
              status: m.cargaTrabalho >= 80 ? 'OCUPADO' : m.status
            }
          : m
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Visão Geral da Equipe */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5" />
              Equipe Operacional - Visão Geral
            </CardTitle>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Membro
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Métricas da Equipe */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{membros.length}</div>
              <div className="text-sm text-white/70">Total Membros</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {membros.filter(m => m.status === 'DISPONIVEL').length}
              </div>
              <div className="text-sm text-white/70">Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {membros.filter(m => m.status === 'OCUPADO').length}
              </div>
              <div className="text-sm text-white/70">Ocupados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {membros.reduce((acc, m) => acc + m.eventosAtivos, 0)}
              </div>
              <div className="text-sm text-white/70">Eventos Ativos</div>
            </div>
          </div>

          {/* Lista Resumida da Equipe */}
          <div className="space-y-3">
            {membros.map((membro, index) => (
              <motion.div
                key={membro.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">{membro.nome}</h4>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(membro.status)}`} />
                      <Badge variant="outline" className="text-xs">
                        {getPapelLabel(membro.papel)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <span>Eventos: {membro.eventosAtivos}</span>
                      <span>Resposta: {membro.tempoMedioResposta}min</span>
                      <span className={getCargaColor(membro.cargaTrabalho)}>
                        Carga: {membro.cargaTrabalho}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => contatar(membro, 'telefone')}
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => contatar(membro, 'whatsapp')}
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={() => atribuirEvento(membro.id)}
                    disabled={membro.status === 'OFFLINE' || membro.cargaTrabalho >= 95}
                  >
                    Atribuir
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance da Equipe */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Award className="w-5 h-5" />
            Performance da Equipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {membros
              .sort((a, b) => (b.avaliacaoPerformance || 0) - (a.avaliacaoPerformance || 0))
              .map((membro, index) => (
                <div key={membro.id} className="flex items-center justify-between p-3 bg-white/5 rounded">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {index === 0 && <span className="text-2xl">🥇</span>}
                      {index === 1 && <span className="text-2xl">🥈</span>}
                      {index === 2 && <span className="text-2xl">🥉</span>}
                      {index > 2 && <span className="text-white font-bold">#{index + 1}</span>}
                    </div>
                    <div>
                      <div className="font-medium text-white">{membro.nome}</div>
                      <div className="text-sm text-white/70">{getPapelLabel(membro.papel)}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="font-semibold text-white">
                        {membro.avaliacaoPerformance?.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-sm text-white/70">
                      {membro.eventosAtivos} eventos ativos
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Configurações */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Settings className="w-5 h-5" />
            Configurações da Equipe
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Balanceamento de Carga</div>
                <div className="text-sm text-white/70">Distribuir eventos automaticamente</div>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Priorizar Especialidades</div>
                <div className="text-sm text-white/70">Atribuir baseado em expertise</div>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-white">Alertas de Sobrecarga</div>
                <div className="text-sm text-white/70">Quando carga &gt; 90%</div>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

