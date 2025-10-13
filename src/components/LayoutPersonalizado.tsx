'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Settings, User, Save, RotateCcw, Eye, EyeOff,
  BarChart3, Users, Map, Brain, Zap, Target
} from 'lucide-react';

interface WidgetConfig {
  id: string;
  nome: string;
  icon: any;
  categoria: string;
  visivel: boolean;
  posicao: number;
  tamanho: 'pequeno' | 'medio' | 'grande';
  obrigatorio?: boolean;
}

interface PerfilFuncao {
  id: string;
  nome: string;
  descricao: string;
  widgets: string[];
  cor: string;
}

export default function LayoutPersonalizado() {
  const [perfilAtivo, setPerfilAtivo] = useState<string>('coordenador');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [widgets, setWidgets] = useState<WidgetConfig[]>([
    {
      id: 'metricas_principais',
      nome: 'Métricas Principais',
      icon: BarChart3,
      categoria: 'essencial',
      visivel: true,
      posicao: 1,
      tamanho: 'grande',
      obrigatorio: true
    },
    {
      id: 'graficos_estrategicos',
      nome: 'Gráficos Estratégicos',
      icon: Target,
      categoria: 'estrategia',
      visivel: true,
      posicao: 2,
      tamanho: 'grande'
    },
    {
      id: 'insights_oracle',
      nome: 'Insights do Oracle',
      icon: Brain,
      categoria: 'ia',
      visivel: true,
      posicao: 3,
      tamanho: 'medio'
    },
    {
      id: 'alertas_prioritarios',
      nome: 'Alertas Prioritários',
      icon: Zap,
      categoria: 'operacional',
      visivel: true,
      posicao: 4,
      tamanho: 'medio'
    },
    {
      id: 'painel_embaixadores',
      nome: 'Painel de Embaixadores',
      icon: Users,
      categoria: 'equipe',
      visivel: true,
      posicao: 5,
      tamanho: 'medio'
    },
    {
      id: 'mini_mapa',
      nome: 'Mini-Mapa Geográfico',
      icon: Map,
      categoria: 'territorial',
      visivel: true,
      posicao: 6,
      tamanho: 'medio'
    },
    {
      id: 'what_if_scenarios',
      nome: 'What-If Scenarios',
      icon: Target,
      categoria: 'estrategia',
      visivel: false,
      posicao: 7,
      tamanho: 'grande'
    },
    {
      id: 'comandos_voz',
      nome: 'Comandos por Voz',
      icon: Brain,
      categoria: 'ia',
      visivel: false,
      posicao: 8,
      tamanho: 'pequeno'
    }
  ]);

  const perfis: PerfilFuncao[] = [
    {
      id: 'coordenador',
      nome: 'Coordenador Geral',
      descricao: 'Visão completa da campanha',
      widgets: ['metricas_principais', 'graficos_estrategicos', 'insights_oracle', 'alertas_prioritarios', 'mini_mapa'],
      cor: 'blue'
    },
    {
      id: 'midia_social',
      nome: 'Mídia Social',
      descricao: 'Foco em engajamento digital',
      widgets: ['metricas_principais', 'insights_oracle', 'alertas_prioritarios', 'comandos_voz'],
      cor: 'purple'
    },
    {
      id: 'tesoureiro',
      nome: 'Tesoureiro',
      descricao: 'Métricas financeiras e ROI',
      widgets: ['metricas_principais', 'what_if_scenarios', 'graficos_estrategicos'],
      cor: 'green'
    },
    {
      id: 'campo',
      nome: 'Coordenador de Campo',
      descricao: 'Operações territoriais',
      widgets: ['mini_mapa', 'painel_embaixadores', 'alertas_prioritarios', 'metricas_principais'],
      cor: 'orange'
    },
    {
      id: 'estrategista',
      nome: 'Estrategista',
      descricao: 'Análise e planejamento',
      widgets: ['graficos_estrategicos', 'what_if_scenarios', 'insights_oracle', 'metricas_principais'],
      cor: 'red'
    }
  ];

  const aplicarPerfil = (perfilId: string) => {
    const perfil = perfis.find(p => p.id === perfilId);
    if (!perfil) return;

    setWidgets(prev => prev.map(widget => ({
      ...widget,
      visivel: widget.obrigatorio || perfil.widgets.includes(widget.id),
      posicao: perfil.widgets.indexOf(widget.id) + 1 || widget.posicao
    })));

    setPerfilAtivo(perfilId);
  };

  const toggleWidget = (widgetId: string) => {
    setWidgets(prev => prev.map(widget =>
      widget.id === widgetId && !widget.obrigatorio
        ? { ...widget, visivel: !widget.visivel }
        : widget
    ));
  };

  const alterarTamanho = (widgetId: string, novoTamanho: WidgetConfig['tamanho']) => {
    setWidgets(prev => prev.map(widget =>
      widget.id === widgetId
        ? { ...widget, tamanho: novoTamanho }
        : widget
    ));
  };

  const salvarLayout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cipe_layout_personalizado', JSON.stringify({
        perfil: perfilAtivo,
        widgets: widgets
      }));
    }
    
    setModoEdicao(false);
  };

  const resetarLayout = () => {
    aplicarPerfil(perfilAtivo);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const layoutSalvo = localStorage.getItem('cipe_layout_personalizado');
      if (layoutSalvo) {
        const { perfil, widgets: widgetsSalvos } = JSON.parse(layoutSalvo);
        setPerfilAtivo(perfil);
        setWidgets(widgetsSalvos);
      }
    }
  }, []);

  const widgetsVisiveis = widgets.filter(w => w.visivel).sort((a, b) => a.posicao - b.posicao);
  const widgetsOcultos = widgets.filter(w => !w.visivel);

  return (
    <div className="relative">
      {/* Efeito de fundo animado - Padrão Oracle CIPE */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
      
    <Card className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-blue-500/30 backdrop-blur-xl shadow-2xl shadow-blue-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-blue-300" />
            <CardTitle className="text-white">Layout Personalizado</CardTitle>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {perfis.find(p => p.id === perfilAtivo)?.nome}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setModoEdicao(!modoEdicao)}
            >
              <Settings className="w-3 h-3 mr-1" />
              {modoEdicao ? 'Sair' : 'Editar'}
            </Button>
            
            {modoEdicao && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetarLayout}
                >
                  <RotateCcw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
                
                <Button
                  size="sm"
                  onClick={salvarLayout}
                >
                  <Save className="w-3 h-3 mr-1" />
                  Salvar Layout
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-300">Perfis Pré-configurados</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {perfis.map((perfil) => (
              <Button
                key={perfil.id}
                variant={perfilAtivo === perfil.id ? "default" : "outline"}
                onClick={() => aplicarPerfil(perfil.id)}
                className={`h-auto p-3 flex flex-col items-center space-y-1 ${
                  perfilAtivo === perfil.id ? `bg-${perfil.cor}-600 hover:bg-${perfil.cor}-700` : ''
                }`}
              >
                <User className="w-4 h-4" />
                <div className="text-center">
                  <div className="text-xs font-medium">{perfil.nome}</div>
                  <div className="text-xs opacity-80">{perfil.descricao}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {modoEdicao && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700"
          >
            <h3 className="text-sm font-medium text-slate-300">Configurar Widgets</h3>
            
            <div className="space-y-3">
              <h4 className="text-xs font-medium text-green-300 flex items-center">
                <Eye className="w-3 h-3 mr-1" />
                Widgets Visíveis ({widgetsVisiveis.length})
              </h4>
              
              <div className="space-y-2">
                {widgetsVisiveis.map((widget) => {
                  const Icon = widget.icon;
                  
                  return (
                    <div
                      key={widget.id}
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-600"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="text-sm font-medium text-white">{widget.nome}</p>
                          <p className="text-xs text-slate-400">{widget.categoria}</p>
                        </div>
                        {widget.obrigatorio && (
                          <Badge className="bg-red-500/20 text-red-300 text-xs">
                            OBRIGATÓRIO
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          {(['pequeno', 'medio', 'grande'] as const).map((tamanho) => (
                            <Button
                              key={tamanho}
                              size="sm"
                              variant={widget.tamanho === tamanho ? "default" : "outline"}
                              onClick={() => alterarTamanho(widget.id, tamanho)}
                              className="h-6 px-2 text-xs"
                            >
                              {tamanho[0].toUpperCase()}
                            </Button>
                          ))}
                        </div>
                        
                        <Switch
                          checked={widget.visivel}
                          onCheckedChange={() => toggleWidget(widget.id)}
                          disabled={widget.obrigatorio}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {widgetsOcultos.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-medium text-slate-400 flex items-center">
                  <EyeOff className="w-3 h-3 mr-1" />
                  Widgets Ocultos ({widgetsOcultos.length})
                </h4>
                
                <div className="space-y-2">
                  {widgetsOcultos.map((widget) => {
                    const Icon = widget.icon;
                    
                    return (
                      <div
                        key={widget.id}
                        className="flex items-center justify-between p-3 bg-slate-900/50 rounded border border-slate-700 opacity-60"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4 text-slate-500" />
                          <div>
                            <p className="text-sm font-medium text-slate-300">{widget.nome}</p>
                            <p className="text-xs text-slate-500">{widget.categoria}</p>
                          </div>
                        </div>
                        
                        <Switch
                          checked={widget.visivel}
                          onCheckedChange={() => toggleWidget(widget.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-300">Preview do Layout</h3>
          
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <div className="grid gap-2" style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
            }}>
              {widgetsVisiveis.map((widget, index) => {
                const Icon = widget.icon;
                
                return (
                  <motion.div
                    key={widget.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 bg-slate-800/30 rounded border border-slate-600 ${
                      widget.tamanho === 'pequeno' ? 'h-16' :
                      widget.tamanho === 'medio' ? 'h-24' : 'h-32'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon className="w-3 h-3 text-slate-400" />
                      <span className="text-xs font-medium text-slate-300">
                        {widget.nome}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="h-2 bg-slate-600 rounded animate-pulse"></div>
                      {widget.tamanho !== 'pequeno' && (
                        <div className="h-2 bg-slate-600 rounded animate-pulse w-3/4"></div>
                      )}
                      {widget.tamanho === 'grande' && (
                        <>
                          <div className="h-2 bg-slate-600 rounded animate-pulse w-1/2"></div>
                          <div className="h-2 bg-slate-600 rounded animate-pulse w-2/3"></div>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-slate-800/30 rounded">
            <p className="text-lg font-bold text-white">{widgetsVisiveis.length}</p>
            <p className="text-xs text-slate-400">Widgets Ativos</p>
          </div>
          <div className="p-3 bg-slate-800/30 rounded">
            <p className="text-lg font-bold text-white">
              {Math.round((widgetsVisiveis.length / widgets.length) * 100)}%
            </p>
            <p className="text-xs text-slate-400">Utilização</p>
          </div>
          <div className="p-3 bg-slate-800/30 rounded">
            <p className="text-lg font-bold text-white">
              {perfis.find(p => p.id === perfilAtivo)?.nome.split(' ')[0]}
            </p>
            <p className="text-xs text-slate-400">Perfil Ativo</p>
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
}

