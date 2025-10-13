'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Mail, Smartphone, MessageSquare, Plus, Trash2, Save, Clock } from 'lucide-react';

interface ConfigNotificacao {
  canais: {
    email: boolean;
    sms: boolean;
    push: boolean;
    whatsapp: boolean;
  };
  tipos: {
    alertasCrise: boolean;
    novoEleitor: boolean;
    campanhaFinalizada: boolean;
    relatorioSemanal: boolean;
    backupCompleto: boolean;
    metaBatida: boolean;
    eventoProximo: boolean;
    adversarioMencao: boolean;
  };
  horarios: {
    inicio: string;
    fim: string;
    diasSemana: number[];
  };
  frequencia: 'TEMPO_REAL' | 'DIARIA' | 'SEMANAL' | 'MENSAL';
  contatosEmergencia: Array<{ nome: string; telefone: string; email: string }>;
}

export default function ConfiguracaoNotificacoes({ candidateId }: { candidateId: string }) {
  const [config, setConfig] = useState<ConfigNotificacao>({
    canais: {
      email: true,
      sms: false,
      push: true,
      whatsapp: false
    },
    tipos: {
      alertasCrise: true,
      novoEleitor: true,
      campanhaFinalizada: true,
      relatorioSemanal: true,
      backupCompleto: true,
      metaBatida: true,
      eventoProximo: true,
      adversarioMencao: true
    },
    horarios: {
      inicio: '07:00',
      fim: '22:00',
      diasSemana: [1, 2, 3, 4, 5]
    },
    frequencia: 'DIARIA',
    contatosEmergencia: [
      { nome: 'João Silva', telefone: '(11) 99999-9999', email: 'joao@campanha.com' },
      { nome: 'Maria Santos', telefone: '(11) 98888-8888', email: 'maria@campanha.com' }
    ]
  });

  const [novoContato, setNovoContato] = useState({ nome: '', telefone: '', email: '' });

  const diasSemanaLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const toggleDiaSemana = (dia: number) => {
    const novos = config.horarios.diasSemana.includes(dia)
      ? config.horarios.diasSemana.filter(d => d !== dia)
      : [...config.horarios.diasSemana, dia].sort();
    setConfig({ ...config, horarios: { ...config.horarios, diasSemana: novos } });
  };

  const adicionarContato = () => {
    if (novoContato.nome && novoContato.telefone && novoContato.email) {
      setConfig({
        ...config,
        contatosEmergencia: [...config.contatosEmergencia, novoContato]
      });
      setNovoContato({ nome: '', telefone: '', email: '' });
    }
  };

  const removerContato = (index: number) => {
    setConfig({
      ...config,
      contatosEmergencia: config.contatosEmergencia.filter((_, i) => i !== index)
    });
  };

  const salvarConfiguracoes = () => {
    console.log('Salvando configurações de notificações:', config);
    // Aqui iria a chamada à API
  };

  const getCanaisAtivos = () => {
    return Object.entries(config.canais).filter(([_, ativo]) => ativo).length;
  };

  const getTiposAtivos = () => {
    return Object.entries(config.tipos).filter(([_, ativo]) => ativo).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Sistema de Notificações</h2>
          <p className="text-slate-400 mt-1">Configure alertas por email, SMS, push e WhatsApp</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={salvarConfiguracoes}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Bell className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{getCanaisAtivos()}</div>
            <div className="text-xs text-slate-400">Canais Ativos</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{getTiposAtivos()}</div>
            <div className="text-xs text-slate-400">Tipos Ativos</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{config.horarios.diasSemana.length}</div>
            <div className="text-xs text-slate-400">Dias da Semana</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Smartphone className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{config.contatosEmergencia.length}</div>
            <div className="text-xs text-slate-400">Contatos Emergência</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Canais de Notificação */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-400" />
              <span>Canais de Notificação</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="font-medium text-white">Email</div>
                    <div className="text-xs text-slate-400">Notificações por email</div>
                  </div>
                </div>
                <Switch 
                  checked={config.canais.email}
                  onCheckedChange={(v) => setConfig({ ...config, canais: { ...config.canais, email: v } })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="font-medium text-white">SMS</div>
                    <div className="text-xs text-slate-400">Mensagens de texto</div>
                  </div>
                </div>
                <Switch 
                  checked={config.canais.sms}
                  onCheckedChange={(v) => setConfig({ ...config, canais: { ...config.canais, sms: v } })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-medium text-white">Push</div>
                    <div className="text-xs text-slate-400">Notificações push</div>
                  </div>
                </div>
                <Switch 
                  checked={config.canais.push}
                  onCheckedChange={(v) => setConfig({ ...config, canais: { ...config.canais, push: v } })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                  <div>
                    <div className="font-medium text-white">WhatsApp</div>
                    <div className="text-xs text-slate-400">Mensagens WhatsApp</div>
                  </div>
                </div>
                <Switch 
                  checked={config.canais.whatsapp}
                  onCheckedChange={(v) => setConfig({ ...config, canais: { ...config.canais, whatsapp: v } })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Notificação */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-green-400" />
              <span>Tipos de Notificação</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(config.tipos).map(([tipo, ativo]) => (
              <div key={tipo} className="flex items-center justify-between">
                <span className="text-sm text-slate-300">
                  {tipo === 'alertasCrise' && 'Alertas de Crise'}
                  {tipo === 'novoEleitor' && 'Novo Eleitor Cadastrado'}
                  {tipo === 'campanhaFinalizada' && 'Campanha Finalizada'}
                  {tipo === 'relatorioSemanal' && 'Relatório Semanal'}
                  {tipo === 'backupCompleto' && 'Backup Completo'}
                  {tipo === 'metaBatida' && 'Meta Batida'}
                  {tipo === 'eventoProximo' && 'Evento Próximo'}
                  {tipo === 'adversarioMencao' && 'Menção de Adversário'}
                </span>
                <Switch 
                  checked={ativo}
                  onCheckedChange={(v) => setConfig({ ...config, tipos: { ...config.tipos, [tipo]: v } })}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Horários e Frequência */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <span>Horários e Frequência</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Horário Início</label>
              <Input 
                type="time"
                value={config.horarios.inicio}
                onChange={(e) => setConfig({ 
                  ...config, 
                  horarios: { ...config.horarios, inicio: e.target.value } 
                })}
                className="bg-slate-800/50"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Horário Fim</label>
              <Input 
                type="time"
                value={config.horarios.fim}
                onChange={(e) => setConfig({ 
                  ...config, 
                  horarios: { ...config.horarios, fim: e.target.value } 
                })}
                className="bg-slate-800/50"
              />
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Frequência Resumo</label>
              <Select 
                value={config.frequencia}
                onValueChange={(v: any) => setConfig({ ...config, frequencia: v })}
              >
                <SelectTrigger className="bg-slate-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TEMPO_REAL">Tempo Real</SelectItem>
                  <SelectItem value="DIARIA">Diária</SelectItem>
                  <SelectItem value="SEMANAL">Semanal</SelectItem>
                  <SelectItem value="MENSAL">Mensal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">Dias da Semana</label>
            <div className="flex space-x-2">
              {diasSemanaLabels.map((dia, index) => (
                <Button
                  key={index}
                  variant={config.horarios.diasSemana.includes(index) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleDiaSemana(index)}
                  className="flex-1"
                >
                  {dia}
                </Button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300">
              <strong>Horário de Silêncio:</strong> Notificações não serão enviadas 
              entre {config.horarios.fim} e {config.horarios.inicio}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contatos de Emergência */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5 text-yellow-400" />
            <span>Contatos de Emergência (Crises)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {config.contatosEmergencia.map((contato, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
              >
                <div>
                  <div className="font-medium text-white">{contato.nome}</div>
                  <div className="text-sm text-slate-400">
                    {contato.telefone} • {contato.email}
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => removerContato(index)}>
                  <Trash2 className="w-4 h-4 text-red-400" />
                </Button>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input 
              value={novoContato.nome}
              onChange={(e) => setNovoContato({ ...novoContato, nome: e.target.value })}
              placeholder="Nome"
              className="bg-slate-800/50"
            />
            <Input 
              value={novoContato.telefone}
              onChange={(e) => setNovoContato({ ...novoContato, telefone: e.target.value })}
              placeholder="Telefone"
              className="bg-slate-800/50"
            />
            <Input 
              value={novoContato.email}
              onChange={(e) => setNovoContato({ ...novoContato, email: e.target.value })}
              placeholder="Email"
              className="bg-slate-800/50"
            />
            <Button onClick={adicionarContato} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-sm text-yellow-300">
              <strong>⚠️ Atenção:</strong> Esses contatos receberão notificações em caso de crises, 
              independente do horário de silêncio configurado.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

