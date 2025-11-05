'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Target, Plus, CheckCircle, Clock, X, Upload, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Missao {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'DIGITAL' | 'FISICA' | 'RECRUTAMENTO' | 'DOACAO';
  pontos: number;
  adesoes: number;
  conclusoes: number;
  status: 'ATIVA' | 'PAUSADA' | 'CONCLUIDA';
  validacao: 'AUTOMATICA' | 'MANUAL' | 'CHECKIN_EVENTO';
  medalhaId?: string;
}

interface Submissao {
  id: string;
  missaoId: string;
  missaoTitulo: string;
  apoiadorNome: string;
  dadosSubmissao: any;
  status: 'PENDENTE' | 'APROVADA' | 'REJEITADA';
  createdAt: string;
}

export default function CentralDeMissoes({ candidateId }: { candidateId: string }) {
  const [criandoMissao, setCriandoMissao] = useState(false);
  const [novaMissao, setNovaMissao] = useState({
    titulo: '',
    descricao: '',
    tipo: 'DIGITAL' as const,
    pontos: 10,
    validacao: 'AUTOMATICA' as const,
    limiteConclusoes: undefined as number | undefined
  });
  const [abaAtiva, setAbaAtiva] = useState<'missoes' | 'submissoes'>('missoes');

  const missoes: Missao[] = [
    { id: '1', titulo: 'Compartilhar Post no Instagram', descricao: 'Compartilhe nosso último post nas suas redes sociais', tipo: 'DIGITAL', pontos: 10, adesoes: 245, conclusoes: 198, status: 'ATIVA', validacao: 'AUTOMATICA' },
    { id: '2', titulo: 'Participar da Carreata', descricao: 'Compareça à carreata no centro da cidade no sábado às 15h', tipo: 'FISICA', pontos: 50, adesoes: 89, conclusoes: 67, status: 'ATIVA', validacao: 'CHECKIN_EVENTO' },
    { id: '3', titulo: 'Recrutar um Amigo', descricao: 'Convide um amigo para se cadastrar na plataforma', tipo: 'RECRUTAMENTO', pontos: 100, adesoes: 156, conclusoes: 94, status: 'ATIVA', validacao: 'AUTOMATICA' },
    { id: '4', titulo: 'Fazer Doação', descricao: 'Contribua financeiramente para a campanha', tipo: 'DOACAO', pontos: 200, adesoes: 45, conclusoes: 38, status: 'ATIVA', validacao: 'AUTOMATICA' }
  ];

  const submissoes: Submissao[] = [
    {
      id: '1',
      missaoId: '2',
      missaoTitulo: 'Participar da Carreata',
      apoiadorNome: 'Ana Silva',
      dadosSubmissao: { foto: 'https://example.com/foto.jpg', localizacao: 'Centro, São Paulo' },
      status: 'PENDENTE',
      createdAt: '2024-10-28T10:30:00'
    },
    {
      id: '2',
      missaoId: '2',
      missaoTitulo: 'Participar da Carreata',
      apoiadorNome: 'Carlos Lima',
      dadosSubmissao: { foto: 'https://example.com/foto2.jpg', localizacao: 'Centro, São Paulo' },
      status: 'PENDENTE',
      createdAt: '2024-10-28T11:15:00'
    }
  ];

  const submissoesPendentes = submissoes.filter(s => s.status === 'PENDENTE');

  const handleCriarMissao = () => {
    // Em produção, chamaria API
    console.log('Criando missão:', novaMissao);
    setCriandoMissao(false);
    setNovaMissao({
      titulo: '',
      descricao: '',
      tipo: 'DIGITAL',
      pontos: 10,
      validacao: 'AUTOMATICA',
      limiteConclusoes: undefined
    });
  };

  const handleValidarSubmissao = (submissaoId: string, aprovado: boolean) => {
    // Em produção, chamaria API
    console.log('Validando submissão:', submissaoId, aprovado);
  };

  return (
    <div className="space-y-6">
      {/* Abas */}
      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setAbaAtiva('missoes')}
          className={`px-4 py-2 font-semibold transition-colors ${
            abaAtiva === 'missoes'
              ? 'text-white border-b-2 border-purple-500'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Missões ({missoes.length})
        </button>
        <button
          onClick={() => setAbaAtiva('submissoes')}
          className={`px-4 py-2 font-semibold transition-colors relative ${
            abaAtiva === 'submissoes'
              ? 'text-white border-b-2 border-purple-500'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Submissões Pendentes
          {submissoesPendentes.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {submissoesPendentes.length}
            </span>
          )}
        </button>
      </div>

      {/* Conteúdo das Abas */}
      <AnimatePresence mode="wait">
        {abaAtiva === 'missoes' ? (
          <motion.div
            key="missoes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Central de Missões
                  </CardTitle>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setCriandoMissao(!criandoMissao)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {criandoMissao ? 'Cancelar' : 'Nova Missão'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Formulário de Criação */}
                {criandoMissao && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-white/5 rounded-lg border border-white/10 space-y-4"
                  >
                    <h3 className="text-white font-semibold text-lg mb-4">Criar Nova Missão</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">Título da Missão</Label>
                        <Input
                          value={novaMissao.titulo}
                          onChange={(e) => setNovaMissao({ ...novaMissao, titulo: e.target.value })}
                          className="bg-white/10 border-white/20 text-white"
                          placeholder="Ex: Compartilhar Post"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-white">Tipo de Missão</Label>
                        <select
                          value={novaMissao.tipo}
                          onChange={(e) => setNovaMissao({ ...novaMissao, tipo: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                        >
                          <option value="DIGITAL">Digital</option>
                          <option value="FISICA">Física</option>
                          <option value="RECRUTAMENTO">Recrutamento</option>
                          <option value="DOACAO">Doação</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-white">Descrição</Label>
                      <Textarea
                        value={novaMissao.descricao}
                        onChange={(e) => setNovaMissao({ ...novaMissao, descricao: e.target.value })}
                        className="bg-white/10 border-white/20 text-white min-h-[100px]"
                        placeholder="Descreva o que o apoiador precisa fazer..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-white">Pontos de Recompensa</Label>
                        <Input
                          type="number"
                          value={novaMissao.pontos}
                          onChange={(e) => setNovaMissao({ ...novaMissao, pontos: parseInt(e.target.value) || 0 })}
                          className="bg-white/10 border-white/20 text-white"
                          min="1"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-white">Validação</Label>
                        <select
                          value={novaMissao.validacao}
                          onChange={(e) => setNovaMissao({ ...novaMissao, validacao: e.target.value as any })}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                        >
                          <option value="AUTOMATICA">Automática</option>
                          <option value="MANUAL">Manual</option>
                          <option value="CHECKIN_EVENTO">Check-in em Evento</option>
                        </select>
                      </div>

                      <div>
                        <Label className="text-white">Limite de Conclusões (opcional)</Label>
                        <Input
                          type="number"
                          value={novaMissao.limiteConclusoes || ''}
                          onChange={(e) => setNovaMissao({ ...novaMissao, limiteConclusoes: e.target.value ? parseInt(e.target.value) : undefined })}
                          className="bg-white/10 border-white/20 text-white"
                          placeholder="Ilimitado"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCriandoMissao(false)}
                        className="border-white/20 text-white"
                      >
                        Cancelar
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={handleCriarMissao}
                        disabled={!novaMissao.titulo || !novaMissao.descricao}
                      >
                        Criar Missão
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Lista de Missões */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {missoes.map(missao => (
                    <Card key={missao.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-white font-semibold flex-1">{missao.titulo}</h4>
                          <Badge className={`ml-2 ${
                            missao.status === 'ATIVA' ? 'bg-green-500' :
                            missao.status === 'PAUSADA' ? 'bg-yellow-500' :
                            'bg-gray-500'
                          }`}>
                            {missao.status}
                          </Badge>
                        </div>
                        <p className="text-white/70 text-sm mb-3">{missao.descricao}</p>
                        
                        <div className="flex gap-2 mb-3">
                          <Badge className="bg-blue-500">{missao.tipo}</Badge>
                          <Badge className="bg-yellow-500">{missao.pontos} pts</Badge>
                          <Badge className="bg-purple-500">{missao.validacao}</Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                          <div>
                            <div className="text-white/70">Adesões</div>
                            <div className="text-white font-bold">{missao.adesoes}</div>
                          </div>
                          <div>
                            <div className="text-white/70">Conclusões</div>
                            <div className="text-green-400 font-bold">{missao.conclusoes}</div>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-xs text-white/70 mb-1">Taxa Sucesso</div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(missao.conclusoes / missao.adesoes) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-white/60 mt-1">
                            {((missao.conclusoes / missao.adesoes) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="submissoes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Submissões Pendentes ({submissoesPendentes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {submissoesPendentes.length === 0 ? (
                  <div className="text-center py-12 text-white/50">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <div>Nenhuma submissão pendente</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {submissoesPendentes.map(submissao => (
                      <Card key={submissao.id} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="text-white font-semibold mb-1">{submissao.missaoTitulo}</div>
                              <div className="text-sm text-white/70">Por: {submissao.apoiadorNome}</div>
                              <div className="text-xs text-white/50 mt-1">
                                {new Date(submissao.createdAt).toLocaleString('pt-BR')}
                              </div>
                            </div>
                            <Badge className="bg-yellow-500">PENDENTE</Badge>
                          </div>

                          {/* Evidências */}
                          {submissao.dadosSubmissao.foto && (
                            <div className="mb-3">
                              <div className="text-xs text-white/70 mb-2">Evidência:</div>
                              <div className="w-full h-32 bg-slate-700 rounded-lg flex items-center justify-center">
                                <Upload className="w-8 h-8 text-white/50" />
                              </div>
                            </div>
                          )}

                          {submissao.dadosSubmissao.localizacao && (
                            <div className="mb-3">
                              <div className="text-xs text-white/70">Localização:</div>
                              <div className="text-sm text-white">{submissao.dadosSubmissao.localizacao}</div>
                            </div>
                          )}

                          {/* Ações */}
                          <div className="flex gap-2 mt-4">
                            <Button
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => handleValidarSubmissao(submissao.id, true)}
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Aprovar
                            </Button>
                            <Button
                              variant="outline"
                              className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10"
                              onClick={() => handleValidarSubmissao(submissao.id, false)}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Rejeitar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
