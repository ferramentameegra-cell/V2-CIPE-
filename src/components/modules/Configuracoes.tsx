'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, User, Palette, Bell, Users, Shield, Database,
  Calendar, MessageSquare, Mail, Smartphone, Globe, Link2,
  Check, X, AlertTriangle, Clock, Zap, Eye, Edit, Save,
  Download, Upload, RefreshCw, Activity, BarChart3
} from 'lucide-react';

import PerfilCandidato from '../configuracoes/PerfilCandidato';
import IntegracaoCalendarios from '../configuracoes/IntegracaoCalendarios';
import PersonalizacaoVisual from '../configuracoes/PersonalizacaoVisual';
import ConfiguracaoNotificacoes from '../configuracoes/ConfiguracaoNotificacoes';
import GerenciamentoUsuarios from '../configuracoes/GerenciamentoUsuarios';
import ConfiguracaoOracle from '../configuracoes/ConfiguracaoOracle';
import BackupConfiguracoes from '../configuracoes/BackupConfiguracoes';

interface StatusConfiguracao {
  modulo: string;
  completude: number;
  status: 'completo' | 'parcial' | 'pendente' | 'erro';
  ultimaAtualizacao: Date;
  icone: any;
  cor: string;
}

interface IntegracaoStatus {
  plataforma: string;
  status: 'conectado' | 'desconectado' | 'erro';
  ultimaSync: Date;
  icone: any;
  cor: string;
}

export default function Configuracoes({ candidateId }: { candidateId: string }) {
  const [statusConfiguracoes, setStatusConfiguracoes] = useState<StatusConfiguracao[]>([]);
  const [integracoes, setIntegracoes] = useState<IntegracaoStatus[]>([]);
  const [completudeGeral, setCompletudeGeral] = useState(0);

  useEffect(() => {
    const statusSimulados: StatusConfiguracao[] = [
      { modulo: 'Perfil do Candidato', completude: 95, status: 'completo', ultimaAtualizacao: new Date(Date.now() - 2 * 60 * 60 * 1000), icone: User, cor: 'green' },
      { modulo: 'Integrações', completude: 78, status: 'parcial', ultimaAtualizacao: new Date(Date.now() - 30 * 60 * 1000), icone: Link2, cor: 'yellow' },
      { modulo: 'Personalização Visual', completude: 100, status: 'completo', ultimaAtualizacao: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), icone: Palette, cor: 'green' },
      { modulo: 'Notificações', completude: 60, status: 'parcial', ultimaAtualizacao: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), icone: Bell, cor: 'yellow' },
      { modulo: 'Usuários e Permissões', completude: 85, status: 'completo', ultimaAtualizacao: new Date(Date.now() - 6 * 60 * 60 * 1000), icone: Users, cor: 'green' },
      { modulo: 'Segurança', completude: 40, status: 'pendente', ultimaAtualizacao: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), icone: Shield, cor: 'red' },
      { modulo: 'Backup e Restauração', completude: 25, status: 'pendente', ultimaAtualizacao: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), icone: Database, cor: 'red' }
    ];

    const integracoesSimuladas: IntegracaoStatus[] = [
      { plataforma: 'Google Calendar', status: 'conectado', ultimaSync: new Date(Date.now() - 15 * 60 * 1000), icone: Calendar, cor: '#4285F4' },
      { plataforma: 'WhatsApp Business', status: 'conectado', ultimaSync: new Date(Date.now() - 5 * 60 * 1000), icone: MessageSquare, cor: '#25D366' },
      { plataforma: 'Instagram', status: 'desconectado', ultimaSync: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), icone: Smartphone, cor: '#E4405F' },
      { plataforma: 'Email Marketing', status: 'conectado', ultimaSync: new Date(Date.now() - 1 * 60 * 60 * 1000), icone: Mail, cor: '#EA4335' },
      { plataforma: 'Facebook Pages', status: 'erro', ultimaSync: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), icone: Globe, cor: '#1877F2' }
    ];

    setStatusConfiguracoes(statusSimulados);
    setIntegracoes(integracoesSimuladas);
    const completudeMedia = statusSimulados.reduce((acc, item) => acc + item.completude, 0) / statusSimulados.length;
    setCompletudeGeral(Math.round(completudeMedia));
  }, [candidateId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completo': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'parcial': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'pendente': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'erro': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getIntegracaoStatusColor = (status: string) => {
    switch (status) {
      case 'conectado': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'desconectado': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'erro': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
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

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Configurações do Sistema</h1>
          <p className="text-slate-400 mt-1">Configure todos os aspectos do CIPE • Completude: {completudeGeral}%</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" />Exportar</Button>
          <Button variant="outline"><Upload className="w-4 h-4 mr-2" />Importar</Button>
          <Button className="bg-green-600 hover:bg-green-700"><Save className="w-4 h-4 mr-2" />Salvar</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Completude Geral', valor: `${completudeGeral}%`, icone: Settings, cor: 'blue' },
          { label: 'Integrações Ativas', valor: integracoes.filter(i => i.status === 'conectado').length, icone: Link2, cor: 'green' },
          { label: 'Usuários Ativos', valor: 5, icone: Users, cor: 'purple' },
          { label: 'Nível Segurança', valor: 'Alto', icone: Shield, cor: 'yellow' }
        ].map((m, i) => {
          const Icon = m.icone;
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card">
                <CardContent className="p-4 text-center">
                  <Icon className={`w-6 h-6 text-${m.cor}-400 mx-auto mb-2`} />
                  <div className="text-xl font-bold text-white">{m.valor}</div>
                  <div className="text-xs text-slate-400">{m.label}</div>
                  {m.label === 'Completude Geral' && <Progress value={completudeGeral} className="mt-2" />}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Tabs defaultValue="visao-geral" className="space-y-6">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
          <TabsTrigger value="integracao">Integração</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="oracle">Oracle</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="visao-geral" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader><CardTitle className="flex items-center space-x-2"><BarChart3 className="w-5 h-5 text-blue-400" /><span>Status dos Módulos</span></CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {statusConfiguracoes.map((config, i) => {
                  const Icon = config.icone;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${config.status === 'completo' ? 'text-green-400' : config.status === 'parcial' ? 'text-yellow-400' : 'text-red-400'}`} />
                        <div>
                          <h4 className="font-medium text-white text-sm">{config.modulo}</h4>
                          <p className="text-xs text-slate-400">Atualizado {formatTempo(config.ultimaAtualizacao)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-white mb-1">{config.completude}%</div>
                        <Badge className={getStatusColor(config.status)}>{config.status}</Badge>
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader><CardTitle className="flex items-center space-x-2"><Activity className="w-5 h-5 text-green-400" /><span>Status das Integrações</span></CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {integracoes.map((int, i) => {
                  const Icon = int.icone;
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5" style={{ color: int.cor }} />
                        <div>
                          <h4 className="font-medium text-white text-sm">{int.plataforma}</h4>
                          <p className="text-xs text-slate-400">Última sync: {formatTempo(int.ultimaSync)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getIntegracaoStatusColor(int.status)}>{int.status}</Badge>
                        {int.status === 'conectado' && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader><CardTitle className="flex items-center space-x-2"><Zap className="w-5 h-5 text-yellow-400" /><span>Ações Rápidas</span></CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Editar Perfil', icone: User },
                  { label: 'Conectar Calendário', icone: Calendar },
                  { label: 'Personalizar Tema', icone: Palette },
                  { label: 'Gerenciar Usuários', icone: Users }
                ].map((acao, i) => {
                  const Icon = acao.icone;
                  return (
                    <Button key={i} variant="outline" className="h-20 flex-col">
                      <Icon className="w-6 h-6 mb-2" />
                      <span className="text-xs">{acao.label}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="perfil">
          <PerfilCandidato candidateId={candidateId} />
        </TabsContent>

        <TabsContent value="integracao">
          <IntegracaoCalendarios candidateId={candidateId} />
        </TabsContent>

        <TabsContent value="visual">
          <PersonalizacaoVisual candidateId={candidateId} />
        </TabsContent>

        <TabsContent value="notificacoes">
          <ConfiguracaoNotificacoes candidateId={candidateId} />
        </TabsContent>

        <TabsContent value="usuarios">
          <GerenciamentoUsuarios candidateId={candidateId} />
        </TabsContent>

        <TabsContent value="oracle">
          <ConfiguracaoOracle candidateId={candidateId} />
        </TabsContent>

        <TabsContent value="backup">
          <BackupConfiguracoes candidateId={candidateId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

