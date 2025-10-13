'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar, RefreshCw, Settings, Check, X, AlertTriangle,
  Clock, Link2, Plus, Trash2
} from 'lucide-react';

interface IntegracaoCalendario {
  id: string;
  plataforma: 'GOOGLE' | 'OUTLOOK' | 'APPLE' | 'EXCHANGE' | 'CALDAV';
  nome: string;
  email: string;
  status: 'CONECTADO' | 'DESCONECTADO' | 'SINCRONIZANDO' | 'ERRO';
  ultimaSync: Date;
  proximaSync: Date;
  eventosImportados: number;
  eventosExportados: number;
  sincronizacaoBidirecional: boolean;
  calendariosPrincipais: string[];
  configuracoes: {
    importarEventos: boolean;
    exportarEventos: boolean;
    notificacoes: boolean;
    conflitos: 'IGNORAR' | 'ALERTAR' | 'SOBRESCREVER';
    categorias: string[];
  };
}

export default function IntegracaoCalendarios({ candidateId }: { candidateId: string }) {
  const [integracoes, setIntegracoes] = useState<IntegracaoCalendario[]>([]);
  const [sincronizandoTodos, setSincronizandoTodos] = useState(false);

  useEffect(() => {
    const integracoesSimuladas: IntegracaoCalendario[] = [
      {
        id: '1',
        plataforma: 'GOOGLE',
        nome: 'Google Calendar Principal',
        email: 'joao.silva@gmail.com',
        status: 'CONECTADO',
        ultimaSync: new Date(Date.now() - 5 * 60 * 1000),
        proximaSync: new Date(Date.now() + 10 * 60 * 1000),
        eventosImportados: 127,
        eventosExportados: 89,
        sincronizacaoBidirecional: true,
        calendariosPrincipais: ['Agenda Principal', 'Campanha 2024', 'Eventos Públicos'],
        configuracoes: {
          importarEventos: true,
          exportarEventos: true,
          notificacoes: true,
          conflitos: 'ALERTAR',
          categorias: ['COMICIO', 'REUNIAO', 'ENTREVISTA']
        }
      },
      {
        id: '2',
        plataforma: 'OUTLOOK',
        nome: 'Outlook Corporativo',
        email: 'joao.silva@campanha2024.com.br',
        status: 'CONECTADO',
        ultimaSync: new Date(Date.now() - 15 * 60 * 1000),
        proximaSync: new Date(Date.now() + 5 * 60 * 1000),
        eventosImportados: 45,
        eventosExportados: 23,
        sincronizacaoBidirecional: false,
        calendariosPrincipais: ['Agenda Corporativa'],
        configuracoes: {
          importarEventos: true,
          exportarEventos: false,
          notificacoes: false,
          conflitos: 'IGNORAR',
          categorias: ['REUNIAO']
        }
      },
      {
        id: '3',
        plataforma: 'APPLE',
        nome: 'iCloud Calendar',
        email: 'joao.silva@icloud.com',
        status: 'DESCONECTADO',
        ultimaSync: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        proximaSync: new Date(),
        eventosImportados: 0,
        eventosExportados: 0,
        sincronizacaoBidirecional: false,
        calendariosPrincipais: [],
        configuracoes: {
          importarEventos: false,
          exportarEventos: false,
          notificacoes: false,
          conflitos: 'IGNORAR',
          categorias: []
        }
      }
    ];

    setIntegracoes(integracoesSimuladas);
  }, [candidateId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONECTADO': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'SINCRONIZANDO': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'DESCONECTADO': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'ERRO': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getPlataformaIcon = (plataforma: string) => {
    switch (plataforma) {
      case 'GOOGLE': return '🟦';
      case 'OUTLOOK': return '🟨';
      case 'APPLE': return '⚫';
      default: return '📅';
    }
  };

  const formatTempo = (data: Date) => {
    const agora = new Date();
    const diff = Math.abs(data.getTime() - agora.getTime());
    const minutos = Math.floor(diff / (1000 * 60));
    
    if (minutos < 1) return 'Agora';
    if (minutos < 60) return `${minutos}min`;
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `${horas}h`;
    const dias = Math.floor(horas / 24);
    return `${dias}d`;
  };

  const sincronizarTodos = async () => {
    setSincronizandoTodos(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setSincronizandoTodos(false);
  };

  const conectarCalendario = (plataforma: string) => {
    console.log(`Conectando com ${plataforma}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Integração de Calendários</h2>
          <p className="text-slate-400 mt-1">
            Sincronize com Google Calendar, Outlook e outras plataformas em tempo real
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            onClick={sincronizarTodos}
            disabled={sincronizandoTodos}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${sincronizandoTodos ? 'animate-spin' : ''}`} />
            Sincronizar Todos
          </Button>
          
          <Button className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Calendário
          </Button>
        </div>
      </div>

      {/* Resumo de Sincronização */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {integracoes.filter(i => i.status === 'CONECTADO').length}
            </div>
            <div className="text-xs text-slate-400">Calendários Conectados</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Check className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {integracoes.reduce((acc, i) => acc + i.eventosImportados, 0)}
            </div>
            <div className="text-xs text-slate-400">Eventos Importados</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Link2 className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {integracoes.reduce((acc, i) => acc + i.eventosExportados, 0)}
            </div>
            <div className="text-xs text-slate-400">Eventos Exportados</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {integracoes.filter(i => i.sincronizacaoBidirecional).length}
            </div>
            <div className="text-xs text-slate-400">Sync Bidirecional</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Integrações */}
      <div className="space-y-4">
        {integracoes.map((integracao, index) => (
          <motion.div
            key={integracao.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">
                      {getPlataformaIcon(integracao.plataforma)}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{integracao.nome}</h3>
                      <p className="text-sm text-slate-400">{integracao.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(integracao.status)}>
                      {integracao.status}
                    </Badge>
                    
                    {integracao.status === 'CONECTADO' ? (
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-1" />
                        Configurar
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => conectarCalendario(integracao.plataforma)}
                      >
                        <Link2 className="w-4 h-4 mr-1" />
                        Conectar
                      </Button>
                    )}
                  </div>
                </div>

                {integracao.status === 'CONECTADO' && (
                  <div className="space-y-4">
                    {/* Métricas */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                        <div className="text-lg font-bold text-green-400">
                          {integracao.eventosImportados}
                        </div>
                        <div className="text-xs text-slate-400">Importados</div>
                      </div>
                      <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                        <div className="text-lg font-bold text-blue-400">
                          {integracao.eventosExportados}
                        </div>
                        <div className="text-xs text-slate-400">Exportados</div>
                      </div>
                      <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                        <div className="text-xs text-slate-400">Última Sync</div>
                        <div className="text-sm font-medium text-white">
                          {formatTempo(integracao.ultimaSync)} atrás
                        </div>
                      </div>
                      <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                        <div className="text-xs text-slate-400">Próxima Sync</div>
                        <div className="text-sm font-medium text-white">
                          em {formatTempo(integracao.proximaSync)}
                        </div>
                      </div>
                    </div>

                    {/* Configurações */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium text-white">Sincronização</h4>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">Importar Eventos</span>
                          <Switch checked={integracao.configuracoes.importarEventos} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">Exportar Eventos</span>
                          <Switch checked={integracao.configuracoes.exportarEventos} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">Sync Bidirecional</span>
                          <Switch checked={integracao.sincronizacaoBidirecional} />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">Notificações</span>
                          <Switch checked={integracao.configuracoes.notificacoes} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-white">Calendários Principais</h4>
                        <div className="space-y-2">
                          {integracao.calendariosPrincipais.map((calendario, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <Check className="w-4 h-4 text-green-400" />
                              <span className="text-sm text-slate-300">{calendario}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-3">
                          <div className="text-sm text-slate-400 mb-2">Conflitos:</div>
                          <Select value={integracao.configuracoes.conflitos}>
                            <SelectTrigger className="bg-slate-800/50 border-slate-600">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="IGNORAR">Ignorar</SelectItem>
                              <SelectItem value="ALERTAR">Alertar</SelectItem>
                              <SelectItem value="SOBRESCREVER">Sobrescrever</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Adicionar Nova Integração */}
      <Card className="glass-card border-dashed border-slate-600">
        <CardContent className="p-8 text-center">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Adicionar Calendário</h3>
          <p className="text-slate-400 mb-4">
            Conecte com Google Calendar, Outlook, Apple Calendar ou outros serviços
          </p>
          
          <div className="flex justify-center space-x-3">
            <Button 
              variant="outline"
              onClick={() => conectarCalendario('GOOGLE')}
            >
              🟦 Google
            </Button>
            <Button 
              variant="outline"
              onClick={() => conectarCalendario('OUTLOOK')}
            >
              🟨 Outlook
            </Button>
            <Button 
              variant="outline"
              onClick={() => conectarCalendario('APPLE')}
            >
              ⚫ Apple
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

