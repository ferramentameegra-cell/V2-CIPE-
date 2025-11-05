'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Zap, Plus, Trash2, Mail, MessageSquare, Target, Clock, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Acao {
  id: string;
  tipo: 'EMAIL' | 'WHATSAPP' | 'SUGERIR_MISSAO' | 'AGUARDAR' | 'ADICIONAR_AUDIENCIA';
  config: any;
  ordem: number;
}

interface Campanha {
  id?: string;
  nome: string;
  estagioAlvo: string;
  gatilho: {
    tipo: 'ENTROU_ESTAGIO' | 'COMPLETOU_MISSAO' | 'INATIVIDADE';
    valor: string;
    diasInatividade?: number;
  };
  acoes: Acao[];
  status: 'RASCUNHO' | 'ATIVA' | 'PAUSADA';
}

export default function CriadorCampanhaFunil({ candidateId }: { candidateId: string }) {
  const [criando, setCriando] = useState(false);
  const [campanha, setCampanha] = useState<Campanha>({
    nome: '',
    estagioAlvo: 'LEAD',
    gatilho: {
      tipo: 'ENTROU_ESTAGIO',
      valor: 'LEAD'
    },
    acoes: [],
    status: 'RASCUNHO'
  });

  const campanhasExistentes = [
    {
      id: '1',
      nome: 'Boas-vindas para Leads',
      estagioAlvo: 'LEAD',
      status: 'ATIVA',
      usuariosImpactados: 1250,
      acoesExecutadas: 1250,
      taxaEngajamento: 68
    },
    {
      id: '2',
      nome: 'Reengajamento de Inativos',
      estagioAlvo: 'ENGAJADO',
      status: 'ATIVA',
      usuariosImpactados: 450,
      acoesExecutadas: 450,
      taxaEngajamento: 42
    }
  ];

  const adicionarAcao = (tipo: Acao['tipo']) => {
    const novaAcao: Acao = {
      id: Date.now().toString(),
      tipo,
      config: getConfigPadrao(tipo),
      ordem: campanha.acoes.length + 1
    };
    setCampanha({
      ...campanha,
      acoes: [...campanha.acoes, novaAcao]
    });
  };

  const removerAcao = (id: string) => {
    setCampanha({
      ...campanha,
      acoes: campanha.acoes.filter(a => a.id !== id).map((a, idx) => ({ ...a, ordem: idx + 1 }))
    });
  };

  const atualizarAcao = (id: string, config: any) => {
    setCampanha({
      ...campanha,
      acoes: campanha.acoes.map(a => a.id === id ? { ...a, config } : a)
    });
  };

  const getConfigPadrao = (tipo: Acao['tipo']) => {
    switch (tipo) {
      case 'EMAIL':
        return { assunto: '', corpo: '', templateId: '' };
      case 'WHATSAPP':
        return { mensagem: '' };
      case 'SUGERIR_MISSAO':
        return { missaoId: '' };
      case 'AGUARDAR':
        return { dias: 1 };
      case 'ADICIONAR_AUDIENCIA':
        return { nomeAudiencia: '' };
      default:
        return {};
    }
  };

  const salvarCampanha = async () => {
    // Em produção, chamaria API
    console.log('Salvando campanha:', campanha);
    setCriando(false);
    setCampanha({
      nome: '',
      estagioAlvo: 'LEAD',
      gatilho: { tipo: 'ENTROU_ESTAGIO', valor: 'LEAD' },
      acoes: [],
      status: 'RASCUNHO'
    });
  };

  const getIconeAcao = (tipo: Acao['tipo']) => {
    switch (tipo) {
      case 'EMAIL': return <Mail className="w-4 h-4" />;
      case 'WHATSAPP': return <MessageSquare className="w-4 h-4" />;
      case 'SUGERIR_MISSAO': return <Target className="w-4 h-4" />;
      case 'AGUARDAR': return <Clock className="w-4 h-4" />;
      case 'ADICIONAR_AUDIENCIA': return <CheckCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Lista de Campanhas Existentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {campanhasExistentes.map(camp => (
          <Card key={camp.id} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white font-semibold">{camp.nome}</h4>
                  <p className="text-sm text-white/60">Estágio: {camp.estagioAlvo}</p>
                </div>
                <Badge className={camp.status === 'ATIVA' ? 'bg-green-500' : 'bg-yellow-500'}>
                  {camp.status}
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs mt-3">
                <div>
                  <div className="text-white/70">Impactados</div>
                  <div className="text-white font-bold">{camp.usuariosImpactados}</div>
                </div>
                <div>
                  <div className="text-white/70">Ações</div>
                  <div className="text-white font-bold">{camp.acoesExecutadas}</div>
                </div>
                <div>
                  <div className="text-white/70">Engajamento</div>
                  <div className="text-green-400 font-bold">{camp.taxaEngajamento}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Criador de Campanha */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="w-5 h-5" />
              {criando ? 'Criar Nova Campanha' : 'Criar Campanha de Automação'}
            </CardTitle>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setCriando(!criando)}
            >
              <Plus className="w-4 h-4 mr-2" />
              {criando ? 'Cancelar' : 'Nova Campanha'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {criando && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                {/* Informações Básicas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Nome da Campanha</Label>
                    <Input
                      value={campanha.nome}
                      onChange={(e) => setCampanha({ ...campanha, nome: e.target.value })}
                      className="bg-white/10 border-white/20 text-white"
                      placeholder="Ex: Boas-vindas para Leads"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Estágio Alvo</Label>
                    <select
                      value={campanha.estagioAlvo}
                      onChange={(e) => {
                        setCampanha({
                          ...campanha,
                          estagioAlvo: e.target.value,
                          gatilho: { ...campanha.gatilho, valor: e.target.value }
                        });
                      }}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    >
                      <option value="VISITANTE">Visitante</option>
                      <option value="LEAD">Lead</option>
                      <option value="ENGAJADO">Engajado</option>
                      <option value="APOIADOR">Apoiador</option>
                      <option value="MULTIPLICADOR">Multiplicador</option>
                    </select>
                  </div>
                </div>

                {/* Gatilho */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <Label className="text-white font-semibold mb-3 block">Gatilho (Quando iniciar)</Label>
                  <div className="space-y-3">
                    <select
                      value={campanha.gatilho.tipo}
                      onChange={(e) => setCampanha({
                        ...campanha,
                        gatilho: {
                          ...campanha.gatilho,
                          tipo: e.target.value as any
                        }
                      })}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                    >
                      <option value="ENTROU_ESTAGIO">Entrou no Estágio</option>
                      <option value="COMPLETOU_MISSAO">Completou Missão</option>
                      <option value="INATIVIDADE">Inatividade</option>
                    </select>

                    {campanha.gatilho.tipo === 'ENTROU_ESTAGIO' && (
                      <select
                        value={campanha.gatilho.valor}
                        onChange={(e) => setCampanha({
                          ...campanha,
                          gatilho: { ...campanha.gatilho, valor: e.target.value }
                        })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                      >
                        <option value="VISITANTE">Visitante</option>
                        <option value="LEAD">Lead</option>
                        <option value="ENGAJADO">Engajado</option>
                        <option value="APOIADOR">Apoiador</option>
                      </select>
                    )}

                    {campanha.gatilho.tipo === 'INATIVIDADE' && (
                      <div>
                        <Label className="text-white/70 text-sm">Dias de Inatividade</Label>
                        <Input
                          type="number"
                          value={campanha.gatilho.diasInatividade || 7}
                          onChange={(e) => setCampanha({
                            ...campanha,
                            gatilho: {
                              ...campanha.gatilho,
                              diasInatividade: parseInt(e.target.value) || 7
                            }
                          })}
                          className="bg-white/10 border-white/20 text-white"
                          min="1"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-white font-semibold">Ações (Sequência)</Label>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => adicionarAcao('EMAIL')}
                        className="border-white/20 text-white text-xs"
                      >
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => adicionarAcao('WHATSAPP')}
                        className="border-white/20 text-white text-xs"
                      >
                        <MessageSquare className="w-3 h-3 mr-1" />
                        WhatsApp
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => adicionarAcao('AGUARDAR')}
                        className="border-white/20 text-white text-xs"
                      >
                        <Clock className="w-3 h-3 mr-1" />
                        Aguardar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => adicionarAcao('SUGERIR_MISSAO')}
                        className="border-white/20 text-white text-xs"
                      >
                        <Target className="w-3 h-3 mr-1" />
                        Missão
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {campanha.acoes.map((acao, index) => (
                      <motion.div
                        key={acao.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-3 bg-white/5 rounded border border-white/10 flex items-start gap-3"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-500/20 text-purple-400">
                          {acao.ordem}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getIconeAcao(acao.tipo)}
                            <span className="text-white font-semibold">{acao.tipo}</span>
                          </div>
                          {acao.tipo === 'EMAIL' && (
                            <div className="space-y-2">
                              <Input
                                placeholder="Assunto do email"
                                value={acao.config.assunto || ''}
                                onChange={(e) => atualizarAcao(acao.id, { ...acao.config, assunto: e.target.value })}
                                className="bg-white/10 border-white/20 text-white text-sm"
                              />
                              <Textarea
                                placeholder="Corpo do email"
                                value={acao.config.corpo || ''}
                                onChange={(e) => atualizarAcao(acao.id, { ...acao.config, corpo: e.target.value })}
                                className="bg-white/10 border-white/20 text-white text-sm min-h-[80px]"
                              />
                            </div>
                          )}
                          {acao.tipo === 'WHATSAPP' && (
                            <Textarea
                              placeholder="Mensagem do WhatsApp"
                              value={acao.config.mensagem || ''}
                              onChange={(e) => atualizarAcao(acao.id, { ...acao.config, mensagem: e.target.value })}
                              className="bg-white/10 border-white/20 text-white text-sm min-h-[80px]"
                            />
                          )}
                          {acao.tipo === 'AGUARDAR' && (
                            <Input
                              type="number"
                              placeholder="Dias para aguardar"
                              value={acao.config.dias || 1}
                              onChange={(e) => atualizarAcao(acao.id, { ...acao.config, dias: parseInt(e.target.value) || 1 })}
                              className="bg-white/10 border-white/20 text-white text-sm"
                              min="1"
                            />
                          )}
                          {acao.tipo === 'SUGERIR_MISSAO' && (
                            <Input
                              placeholder="ID da Missão"
                              value={acao.config.missaoId || ''}
                              onChange={(e) => atualizarAcao(acao.id, { ...acao.config, missaoId: e.target.value })}
                              className="bg-white/10 border-white/20 text-white text-sm"
                            />
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removerAcao(acao.id)}
                          className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                    {campanha.acoes.length === 0 && (
                      <div className="text-center py-8 text-white/50 text-sm">
                        Adicione ações para criar a jornada de automação
                      </div>
                    )}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setCriando(false)}
                    className="border-white/20 text-white"
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={salvarCampanha}
                    disabled={!campanha.nome || campanha.acoes.length === 0}
                  >
                    Salvar Campanha
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
