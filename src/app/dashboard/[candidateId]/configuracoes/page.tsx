'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Settings, User, Palette, Bell, Users, Shield, Database,
  Calendar, MessageSquare, Mail, Smartphone, Globe, Link2,
  Check, Download, Upload, RefreshCw, Activity, BarChart3, Zap,
  ChevronRight
} from 'lucide-react';

interface ConfiguracoesDashboardProps {
  params: { candidateId: string };
}

export default function ConfiguracoesDashboard({ params }: ConfiguracoesDashboardProps) {
  const router = useRouter();
  const { candidateId } = params;
  const [completudeGeral, setCompletudeGeral] = useState(0);

  const voltarDashboard = () => {
    router.push(`/dashboard/${candidateId}`);
  };

  const statusConfiguracoes = [
    { modulo: 'Perfil do Candidato', completude: 95, status: 'completo', icone: User, cor: 'green', url: 'perfil' },
    { modulo: 'Integrações', completude: 78, status: 'parcial', icone: Link2, cor: 'yellow', url: 'integracao' },
    { modulo: 'Personalização Visual', completude: 100, status: 'completo', icone: Palette, cor: 'green', url: 'personalizacao' },
    { modulo: 'Notificações', completude: 60, status: 'parcial', icone: Bell, cor: 'yellow', url: 'notificacoes' },
    { modulo: 'Usuários e Permissões', completude: 85, status: 'completo', icone: Users, cor: 'green', url: 'usuarios' },
    { modulo: 'Oracle CIPE', completude: 90, status: 'completo', icone: Settings, cor: 'green', url: 'oracle' },
    { modulo: 'Backup e Restauração', completude: 25, status: 'pendente', icone: Database, cor: 'red', url: 'backup' },
    { modulo: 'Segurança', completude: 40, status: 'pendente', icone: Shield, cor: 'red', url: 'seguranca' }
  ];

  const integracoes = [
    { plataforma: 'Google Calendar', status: 'conectado', icone: Calendar, cor: '#4285F4' },
    { plataforma: 'WhatsApp Business', status: 'conectado', icone: MessageSquare, cor: '#25D366' },
    { plataforma: 'Instagram', status: 'desconectado', icone: Smartphone, cor: '#E4405F' },
    { plataforma: 'Email Marketing', status: 'conectado', icone: Mail, cor: '#EA4335' },
    { plataforma: 'Facebook Pages', status: 'erro', icone: Globe, cor: '#1877F2' }
  ];

  useEffect(() => {
    const completudeMedia = statusConfiguracoes.reduce((acc, item) => acc + item.completude, 0) / statusConfiguracoes.length;
    setCompletudeGeral(Math.round(completudeMedia));
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Botão Voltar */}
        <Button 
          variant="outline" 
          onClick={voltarDashboard}
          className="mb-4"
        >
          <ChevronRight className="w-4 h-4 mr-2 rotate-180" />
          Voltar para Dashboard
        </Button>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Configurações do Sistema</h1>
            <p className="text-slate-400 mt-1">
              Configure todos os aspectos do sistema CIPE • Completude: {completudeGeral}%
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
          </div>
        </div>

        {/* Resumo Geral */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Settings className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{completudeGeral}%</div>
              <div className="text-xs text-slate-400">Completude Geral</div>
              <Progress value={completudeGeral} className="mt-2" />
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Link2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">
                {integracoes.filter(i => i.status === 'conectado').length}
              </div>
              <div className="text-xs text-slate-400">Integrações Ativas</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">5</div>
              <div className="text-xs text-slate-400">Usuários Ativos</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-4 text-center">
              <Shield className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">Alto</div>
              <div className="text-xs text-slate-400">Nível de Segurança</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Módulos de Configuração */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span>Módulos de Configuração</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {statusConfiguracoes.map((config, index) => {
                const Icon = config.icone;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => router.push(`/dashboard/${candidateId}/configuracoes/${config.url}`)}
                    className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-5 h-5 ${
                        config.status === 'completo' ? 'text-green-400' :
                        config.status === 'parcial' ? 'text-yellow-400' :
                        'text-red-400'
                      }`} />
                      <div>
                        <h4 className="font-medium text-white text-sm">{config.modulo}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress value={config.completude} className="w-24 h-1" />
                          <span className="text-xs text-slate-400">{config.completude}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(config.status)}>
                        {config.status}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>

          {/* Status das Integrações */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span>Status das Integrações</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {integracoes.map((integracao, index) => {
                const Icon = integracao.icone;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon 
                        className="w-5 h-5" 
                        style={{ color: integracao.cor }}
                      />
                      <h4 className="font-medium text-white text-sm">{integracao.plataforma}</h4>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge className={getIntegracaoStatusColor(integracao.status)}>
                        {integracao.status}
                      </Badge>
                      {integracao.status === 'conectado' && (
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      )}
                    </div>
                  </motion.div>
                );
              })}

              <Button 
                onClick={() => router.push(`/dashboard/${candidateId}/configuracoes/integracao`)}
                className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
              >
                <Link2 className="w-4 h-4 mr-2" />
                Gerenciar Integrações
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Ações Rápidas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Editar Perfil', icone: User, url: 'perfil' },
                { label: 'Conectar Calendário', icone: Calendar, url: 'integracao/calendarios' },
                { label: 'Personalizar Tema', icone: Palette, url: 'personalizacao' },
                { label: 'Gerenciar Usuários', icone: Users, url: 'usuarios' }
              ].map((acao, i) => {
                const Icon = acao.icone;
                return (
                  <Button 
                    key={i} 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => router.push(`/dashboard/${candidateId}/configuracoes/${acao.url}`)}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="text-xs">{acao.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

