'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { 
  Database, Download, Upload, RefreshCw, Clock, CheckCircle, 
  AlertCircle, Save, Trash2, Play, Pause, Settings
} from 'lucide-react';

interface Backup {
  id: string;
  nome: string;
  descricao: string;
  tipo: 'COMPLETO' | 'INCREMENTAL' | 'CONFIGURACOES' | 'DADOS';
  status: 'CONCLUIDO' | 'EXECUTANDO' | 'ERRO' | 'PENDENTE';
  tamanho: number;
  dataBackup: Date;
  versao: string;
}

interface ConfigBackup {
  automatico: boolean;
  frequencia: 'DIARIO' | 'SEMANAL' | 'MENSAL';
  horario: string;
  retencao: number;
  compressao: boolean;
  criptografia: boolean;
}

export default function BackupConfiguracoes({ candidateId }: { candidateId: string }) {
  const [backups, setBackups] = useState<Backup[]>([
    {
      id: '1',
      nome: 'Backup Completo - 08/10/2024',
      descricao: 'Backup automático completo do sistema',
      tipo: 'COMPLETO',
      status: 'CONCLUIDO',
      tamanho: 2457600, // bytes
      dataBackup: new Date(Date.now() - 2 * 60 * 60 * 1000),
      versao: '1.0.0'
    },
    {
      id: '2',
      nome: 'Backup Incremental - 07/10/2024',
      descricao: 'Backup incremental diário',
      tipo: 'INCREMENTAL',
      status: 'CONCLUIDO',
      tamanho: 524288,
      dataBackup: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      versao: '1.0.0'
    },
    {
      id: '3',
      nome: 'Backup Configurações - 06/10/2024',
      descricao: 'Backup apenas de configurações',
      tipo: 'CONFIGURACOES',
      status: 'CONCLUIDO',
      tamanho: 102400,
      dataBackup: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      versao: '1.0.0'
    }
  ]);

  const [config, setConfig] = useState<ConfigBackup>({
    automatico: true,
    frequencia: 'DIARIO',
    horario: '03:00',
    retencao: 30,
    compressao: true,
    criptografia: true
  });

  const [executandoBackup, setExecutandoBackup] = useState(false);
  const [progressoBackup, setProgressoBackup] = useState(0);

  const formatarTamanho = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    if (mb < 1) {
      const kb = bytes / 1024;
      return `${kb.toFixed(1)} KB`;
    }
    return `${mb.toFixed(1)} MB`;
  };

  const formatarData = (data: Date) => {
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatarTempo = (data: Date) => {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONCLUIDO': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'EXECUTANDO': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'ERRO': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'PENDENTE': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'COMPLETO': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'INCREMENTAL': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'CONFIGURACOES': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'DADOS': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const executarBackup = async (tipo: string) => {
    setExecutandoBackup(true);
    setProgressoBackup(0);
    
    // Simular progresso
    const interval = setInterval(() => {
      setProgressoBackup(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setExecutandoBackup(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const restaurarBackup = (backupId: string) => {
    console.log(`Restaurando backup ${backupId}`);
    // Aqui iria a lógica de restauração
  };

  const downloadBackup = (backupId: string) => {
    console.log(`Baixando backup ${backupId}`);
    // Aqui iria a lógica de download
  };

  const deletarBackup = (backupId: string) => {
    setBackups(backups.filter(b => b.id !== backupId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Backup e Restauração</h2>
          <p className="text-slate-400 mt-1">Configure backups automáticos e restauração de dados</p>
        </div>
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={() => executarBackup('COMPLETO')}
          disabled={executandoBackup}
        >
          <Database className="w-4 h-4 mr-2" />
          Criar Backup Agora
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Database className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{backups.length}</div>
            <div className="text-xs text-slate-400">Total de Backups</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {backups.filter(b => b.status === 'CONCLUIDO').length}
            </div>
            <div className="text-xs text-slate-400">Concluídos</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Save className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">
              {formatarTamanho(backups.reduce((acc, b) => acc + b.tamanho, 0))}
            </div>
            <div className="text-xs text-slate-400">Espaço Total</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white capitalize">{config.frequencia}</div>
            <div className="text-xs text-slate-400">Frequência</div>
          </CardContent>
        </Card>
      </div>

      {/* Backup em Execução */}
      {executandoBackup && (
        <Card className="glass-card border-2 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />
                <span className="font-medium text-white">Criando Backup Completo...</span>
              </div>
              <span className="text-sm text-slate-400">{progressoBackup}%</span>
            </div>
            <Progress value={progressoBackup} className="h-2" />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações de Backup */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-400" />
              <span>Configurações de Backup</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <div>
                <div className="font-medium text-white">Backup Automático</div>
                <div className="text-xs text-slate-400">Executar backups automaticamente</div>
              </div>
              <Switch 
                checked={config.automatico}
                onCheckedChange={(v) => setConfig({ ...config, automatico: v })}
              />
            </div>

            {config.automatico && (
              <>
                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Frequência</label>
                  <Select 
                    value={config.frequencia}
                    onValueChange={(v: any) => setConfig({ ...config, frequencia: v })}
                  >
                    <SelectTrigger className="bg-slate-800/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DIARIO">Diário</SelectItem>
                      <SelectItem value="SEMANAL">Semanal</SelectItem>
                      <SelectItem value="MENSAL">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Horário</label>
                  <Input 
                    type="time"
                    value={config.horario}
                    onChange={(e) => setConfig({ ...config, horario: e.target.value })}
                    className="bg-slate-800/50"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Retenção: {config.retencao} dias
              </label>
              <Slider
                value={[config.retencao]}
                onValueChange={(v) => setConfig({ ...config, retencao: v[0] })}
                min={7}
                max={90}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-slate-500 mt-1">
                Backups mais antigos serão automaticamente excluídos
              </p>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <div>
                <div className="font-medium text-white">Compressão</div>
                <div className="text-xs text-slate-400">Reduz o tamanho dos backups</div>
              </div>
              <Switch 
                checked={config.compressao}
                onCheckedChange={(v) => setConfig({ ...config, compressao: v })}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <div>
                <div className="font-medium text-white">Criptografia</div>
                <div className="text-xs text-slate-400">Protege os dados com criptografia AES-256</div>
              </div>
              <Switch 
                checked={config.criptografia}
                onCheckedChange={(v) => setConfig({ ...config, criptografia: v })}
              />
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </Button>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Criar Novo Backup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full h-16 bg-blue-600 hover:bg-blue-700"
              onClick={() => executarBackup('COMPLETO')}
              disabled={executandoBackup}
            >
              <Database className="w-5 h-5 mr-2" />
              <div className="text-left">
                <div className="font-medium">Backup Completo</div>
                <div className="text-xs opacity-80">Todos os dados do sistema</div>
              </div>
            </Button>

            <Button 
              className="w-full h-16 bg-green-600 hover:bg-green-700"
              onClick={() => executarBackup('INCREMENTAL')}
              disabled={executandoBackup}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              <div className="text-left">
                <div className="font-medium">Backup Incremental</div>
                <div className="text-xs opacity-80">Apenas dados modificados</div>
              </div>
            </Button>

            <Button 
              className="w-full h-16 bg-purple-600 hover:bg-purple-700"
              onClick={() => executarBackup('CONFIGURACOES')}
              disabled={executandoBackup}
            >
              <Settings className="w-5 h-5 mr-2" />
              <div className="text-left">
                <div className="font-medium">Backup Configurações</div>
                <div className="text-xs opacity-80">Apenas configurações do sistema</div>
              </div>
            </Button>

            <Button 
              className="w-full h-16 bg-yellow-600 hover:bg-yellow-700"
              onClick={() => executarBackup('DADOS')}
              disabled={executandoBackup}
            >
              <Database className="w-5 h-5 mr-2" />
              <div className="text-left">
                <div className="font-medium">Backup Dados</div>
                <div className="text-xs opacity-80">Apenas dados de eleitores e campanhas</div>
              </div>
            </Button>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg mt-4">
              <p className="text-sm text-blue-300">
                <strong>Próximo backup automático:</strong><br />
                {config.automatico 
                  ? `${config.frequencia} às ${config.horario}` 
                  : 'Backup automático desativado'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Backups */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Histórico de Backups</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backups.map((backup, index) => (
              <motion.div
                key={backup.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-white">{backup.nome}</h3>
                    <Badge className={getTipoColor(backup.tipo)}>
                      {backup.tipo}
                    </Badge>
                    <Badge className={getStatusColor(backup.status)}>
                      {backup.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">{backup.descricao}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                    <span>📦 {formatarTamanho(backup.tamanho)}</span>
                    <span>📅 {formatarData(backup.dataBackup)}</span>
                    <span>⏱️ {formatarTempo(backup.dataBackup)}</span>
                    <span>v{backup.versao}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => downloadBackup(backup.id)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => restaurarBackup(backup.id)}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => deletarBackup(backup.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

