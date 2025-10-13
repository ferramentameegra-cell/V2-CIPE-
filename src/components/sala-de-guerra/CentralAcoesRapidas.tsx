'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Zap, 
  Plus, 
  Edit, 
  Copy, 
  Trash2,
  Play,
  Settings,
  MessageSquare,
  Megaphone,
  Users,
  Shield,
  FileText
} from 'lucide-react'
import { motion } from 'framer-motion'
import { TemplateAcao } from '@/types/sala-de-guerra'

export default function CentralAcoesRapidas({ candidateId }: { candidateId: string }) {
  const [templates, setTemplates] = useState<TemplateAcao[]>([
    {
      id: '1',
      nome: 'Resposta Rápida - Fake News',
      categoria: 'resposta_crise',
      descricao: 'Template para resposta imediata a desinformação',
      tiposEvento: ['FAKE_NEWS', 'CRISE_IMAGEM'],
      severidadeMinima: 'MEDIA',
      conteudo: {
        titulo: 'Esclarecimento Oficial',
        mensagem: 'Venho esclarecer informações incorretas que estão circulando...',
        canais: ['Twitter', 'Instagram', 'Facebook'],
        recursos: ['Assessoria de Comunicação', 'Designer'],
        tempo: 30,
        custo: 2000
      },
      vezesUtilizado: 15,
      taxaSucesso: 0.87,
      criadoEm: new Date('2024-01-15')
    },
    {
      id: '2',
      nome: 'Aproveitamento - Trending Topic',
      categoria: 'aproveitamento_oportunidade',
      descricao: 'Template para aproveitar trending topics favoráveis',
      tiposEvento: ['TRENDING_TOPIC', 'OPORTUNIDADE_MIDIA'],
      severidadeMinima: 'BAIXA',
      conteudo: {
        titulo: 'Posicionamento sobre [TEMA]',
        mensagem: 'É importante discutirmos [TEMA] porque...',
        canais: ['Twitter', 'Instagram', 'TikTok'],
        recursos: ['Copywriter', 'Designer', 'Video Maker'],
        tempo: 45,
        custo: 3500
      },
      vezesUtilizado: 23,
      taxaSucesso: 0.72,
      criadoEm: new Date('2024-01-10')
    },
    {
      id: '3',
      nome: 'Mobilização Base - Urgente',
      categoria: 'mobilizacao_urgente',
      descricao: 'Mobilização rápida da base de apoiadores',
      tiposEvento: ['ATAQUE_ADVERSARIO', 'CRISE_JURIDICA'],
      severidadeMinima: 'ALTA',
      conteudo: {
        titulo: 'Chamada para Ação',
        mensagem: 'Precisamos da sua ajuda neste momento importante...',
        canais: ['WhatsApp', 'Telegram', 'Email'],
        recursos: ['Coordenação de Base', 'Call Center'],
        tempo: 60,
        custo: 5000
      },
      vezesUtilizado: 8,
      taxaSucesso: 0.91,
      criadoEm: new Date('2024-01-05')
    }
  ])

  const [templateSelecionado, setTemplateSelecionado] = useState<TemplateAcao | null>(null)
  const [modoEdicao, setModoEdicao] = useState(false)

  const getCategoriaIcon = (categoria: string) => {
    switch (categoria) {
      case 'resposta_crise': return Shield
      case 'aproveitamento_oportunidade': return Zap
      case 'mobilizacao_urgente': return Users
      case 'comunicacao_preventiva': return Megaphone
      case 'acao_juridica': return FileText
      default: return MessageSquare
    }
  }

  const getCategoriaColor = (categoria: string) => {
    switch (categoria) {
      case 'resposta_crise': return 'bg-red-500'
      case 'aproveitamento_oportunidade': return 'bg-green-500'
      case 'mobilizacao_urgente': return 'bg-orange-500'
      case 'comunicacao_preventiva': return 'bg-blue-500'
      case 'acao_juridica': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const executarTemplate = (template: TemplateAcao) => {
    console.log('Executando template:', template)
    setTemplates(prev => 
      prev.map(t => 
        t.id === template.id 
          ? { ...t, vezesUtilizado: t.vezesUtilizado + 1 }
          : t
      )
    )
  }

  const duplicarTemplate = (template: TemplateAcao) => {
    const novoTemplate: TemplateAcao = {
      ...template,
      id: Date.now().toString(),
      nome: `${template.nome} (Cópia)`,
      vezesUtilizado: 0,
      criadoEm: new Date()
    }
    setTemplates(prev => [...prev, novoTemplate])
  }

  return (
    <div className="space-y-6">
      {/* Biblioteca de Templates */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Zap className="w-5 h-5" />
              Biblioteca de Ações Rápidas
            </CardTitle>
            <Button 
              onClick={() => setModoEdicao(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template, index) => {
              const IconeCategoria = getCategoriaIcon(template.categoria)
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded ${getCategoriaColor(template.categoria)}`}>
                            <IconeCategoria className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-sm">{template.nome}</h4>
                            <p className="text-xs text-white/70">{template.categoria.replace('_', ' ')}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-white/80 mb-3">{template.descricao}</p>

                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Usado:</span>
                          <span className="text-white">{template.vezesUtilizado}x</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Sucesso:</span>
                          <span className="text-green-400">{(template.taxaSucesso * 100).toFixed(0)}%</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Tempo:</span>
                          <span className="text-white">{template.conteudo.tempo}min</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-white/70">Custo:</span>
                          <span className="text-white">R$ {template.conteudo.custo.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-1 mb-3">
                        {template.tiposEvento.slice(0, 2).map((tipo, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tipo.replace('_', ' ')}
                          </Badge>
                        ))}
                        {template.tiposEvento.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{template.tiposEvento.length - 2}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-blue-500 hover:bg-blue-600"
                          onClick={() => executarTemplate(template)}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Executar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => duplicarTemplate(template)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setTemplateSelecionado(template)
                            setModoEdicao(true)
                          }}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Editor de Templates (se modoEdicao estiver ativo) */}
      {modoEdicao && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">
              {templateSelecionado ? 'Editar Template' : 'Novo Template'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Nome do Template</label>
                <Input 
                  placeholder="Ex: Resposta Rápida - Fake News"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Categoria</label>
                <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white">
                  <option value="resposta_crise">Resposta a Crise</option>
                  <option value="aproveitamento_oportunidade">Aproveitamento de Oportunidade</option>
                  <option value="mobilizacao_urgente">Mobilização Urgente</option>
                  <option value="comunicacao_preventiva">Comunicação Preventiva</option>
                  <option value="acao_juridica">Ação Jurídica</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Descrição</label>
              <Textarea 
                placeholder="Descreva quando e como usar este template..."
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Conteúdo da Mensagem</label>
              <Textarea 
                placeholder="Escreva o template da mensagem. Use [VARIÁVEIS] para personalização..."
                rows={6}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Tempo Estimado (min)</label>
                <Input 
                  type="number"
                  placeholder="30"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Custo Estimado (R$)</label>
                <Input 
                  type="number"
                  placeholder="2000"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Prioridade</label>
                <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white">
                  <option value="BAIXA">Baixa</option>
                  <option value="MEDIA">Média</option>
                  <option value="ALTA">Alta</option>
                  <option value="URGENTE">Urgente</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="bg-green-500 hover:bg-green-600">
                Salvar Template
              </Button>
              <Button variant="outline" onClick={() => setModoEdicao(false)}>
                Cancelar
              </Button>
              {templateSelecionado && (
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Automação */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Settings className="w-5 h-5" />
            Automação de Ações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded">
              <div>
                <div className="font-medium text-white">Fake News Detectada</div>
                <div className="text-sm text-white/70">Severidade: Média ou superior</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-500">Auto-resposta em 15min</Badge>
                <Button size="sm" variant="outline">Configurar</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded">
              <div>
                <div className="font-medium text-white">Trending Topic Favorável</div>
                <div className="text-sm text-white/70">Compatibilidade: &gt;80%</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-500">Sugerir aproveitamento</Badge>
                <Button size="sm" variant="outline">Configurar</Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-white/5 rounded">
              <div>
                <div className="font-medium text-white">Ataque de Adversário</div>
                <div className="text-sm text-white/70">Severidade: Alta ou crítica</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-red-500">Alerta equipe + mobilização</Badge>
                <Button size="sm" variant="outline">Configurar</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

