'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserPlus, Edit, Trash2, Shield, Eye, Clock, CheckCircle, XCircle } from 'lucide-react';

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  role: 'ADMIN' | 'COORDENADOR' | 'ANALISTA' | 'OPERADOR' | 'VISUALIZADOR';
  status: 'ATIVO' | 'INATIVO' | 'BLOQUEADO' | 'PENDENTE';
  twoFactorEnabled: boolean;
  ultimoLogin: Date;
  permissoes: {
    dashboard: boolean;
    crm: boolean;
    comunicacao: boolean;
    arsenal: boolean;
    sala_guerra: boolean;
    relatorios: boolean;
    configuracoes: boolean;
  };
}

export default function GerenciamentoUsuarios({ candidateId }: { candidateId: string }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: '1',
      nome: 'João Silva',
      email: 'joao@campanha.com',
      telefone: '(11) 99999-9999',
      role: 'ADMIN',
      status: 'ATIVO',
      twoFactorEnabled: true,
      ultimoLogin: new Date(Date.now() - 2 * 60 * 60 * 1000),
      permissoes: {
        dashboard: true,
        crm: true,
        comunicacao: true,
        arsenal: true,
        sala_guerra: true,
        relatorios: true,
        configuracoes: true
      }
    },
    {
      id: '2',
      nome: 'Maria Santos',
      email: 'maria@campanha.com',
      telefone: '(11) 98888-8888',
      role: 'COORDENADOR',
      status: 'ATIVO',
      twoFactorEnabled: true,
      ultimoLogin: new Date(Date.now() - 30 * 60 * 1000),
      permissoes: {
        dashboard: true,
        crm: true,
        comunicacao: true,
        arsenal: true,
        sala_guerra: true,
        relatorios: true,
        configuracoes: false
      }
    },
    {
      id: '3',
      nome: 'Carlos Oliveira',
      email: 'carlos@campanha.com',
      telefone: '(11) 97777-7777',
      role: 'ANALISTA',
      status: 'ATIVO',
      twoFactorEnabled: false,
      ultimoLogin: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      permissoes: {
        dashboard: true,
        crm: true,
        comunicacao: false,
        arsenal: true,
        sala_guerra: false,
        relatorios: true,
        configuracoes: false
      }
    },
    {
      id: '4',
      nome: 'Ana Costa',
      email: 'ana@campanha.com',
      telefone: '(11) 96666-6666',
      role: 'OPERADOR',
      status: 'INATIVO',
      twoFactorEnabled: false,
      ultimoLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      permissoes: {
        dashboard: true,
        crm: true,
        comunicacao: true,
        arsenal: false,
        sala_guerra: false,
        relatorios: false,
        configuracoes: false
      }
    }
  ]);

  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'COORDENADOR': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'ANALISTA': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'OPERADOR': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'VISUALIZADOR': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ATIVO': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'INATIVO': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'BLOQUEADO': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'PENDENTE': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
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

  const contarPermissoes = (permissoes: any) => {
    return Object.values(permissoes).filter(Boolean).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Gestão de Usuários</h2>
          <p className="text-slate-400 mt-1">Gerencie equipe, roles e permissões do sistema</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Adicionar Usuário
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{usuarios.length}</div>
            <div className="text-xs text-slate-400">Total Usuários</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {usuarios.filter(u => u.status === 'ATIVO').length}
            </div>
            <div className="text-xs text-slate-400">Ativos</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Shield className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {usuarios.filter(u => u.role === 'ADMIN').length}
            </div>
            <div className="text-xs text-slate-400">Administradores</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Shield className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {usuarios.filter(u => u.twoFactorEnabled).length}
            </div>
            <div className="text-xs text-slate-400">Com 2FA</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <XCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">
              {usuarios.filter(u => u.status === 'INATIVO' || u.status === 'BLOQUEADO').length}
            </div>
            <div className="text-xs text-slate-400">Inativos</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Usuários */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Usuários do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {usuarios.map((usuario, index) => (
              <motion.div
                key={usuario.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {usuario.nome.charAt(0)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-white">{usuario.nome}</h3>
                      {usuario.twoFactorEnabled && (
                        <Shield className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-slate-400">
                      <span>{usuario.email}</span>
                      <span>•</span>
                      <span>{usuario.telefone}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <Badge className={getRoleColor(usuario.role)}>
                      {usuario.role}
                    </Badge>
                    <div className="text-xs text-slate-400 mt-1">
                      {contarPermissoes(usuario.permissoes)}/7 permissões
                    </div>
                  </div>

                  <div className="text-right">
                    <Badge className={getStatusColor(usuario.status)}>
                      {usuario.status}
                    </Badge>
                    <div className="text-xs text-slate-400 mt-1 flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatTempo(usuario.ultimoLogin)}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => setUsuarioSelecionado(usuario)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detalhes do Usuário Selecionado */}
      {usuarioSelecionado && (
        <Card className="glass-card border-2 border-blue-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-blue-400" />
                <span>Detalhes e Permissões - {usuarioSelecionado.nome}</span>
              </CardTitle>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setUsuarioSelecionado(null)}
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <div className="space-y-4">
                <h4 className="font-medium text-white mb-3">Informações Básicas</h4>
                
                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Nome</label>
                  <Input 
                    value={usuarioSelecionado.nome}
                    disabled={!modoEdicao}
                    className="bg-slate-800/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Email</label>
                  <Input 
                    value={usuarioSelecionado.email}
                    disabled={!modoEdicao}
                    className="bg-slate-800/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-1 block">Telefone</label>
                  <Input 
                    value={usuarioSelecionado.telefone}
                    disabled={!modoEdicao}
                    className="bg-slate-800/50"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Role</label>
                  <Select value={usuarioSelecionado.role} disabled={!modoEdicao}>
                    <SelectTrigger className="bg-slate-800/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                      <SelectItem value="COORDENADOR">Coordenador</SelectItem>
                      <SelectItem value="ANALISTA">Analista</SelectItem>
                      <SelectItem value="OPERADOR">Operador</SelectItem>
                      <SelectItem value="VISUALIZADOR">Visualizador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">Status</label>
                  <Select value={usuarioSelecionado.status} disabled={!modoEdicao}>
                    <SelectTrigger className="bg-slate-800/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ATIVO">Ativo</SelectItem>
                      <SelectItem value="INATIVO">Inativo</SelectItem>
                      <SelectItem value="BLOQUEADO">Bloqueado</SelectItem>
                      <SelectItem value="PENDENTE">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Autenticação 2FA</span>
                  <Switch checked={usuarioSelecionado.twoFactorEnabled} disabled={!modoEdicao} />
                </div>
              </div>

              {/* Permissões Granulares */}
              <div className="space-y-4">
                <h4 className="font-medium text-white mb-3">Permissões por Módulo</h4>
                
                <div className="space-y-3">
                  {Object.entries(usuarioSelecionado.permissoes).map(([modulo, ativo]) => (
                    <div key={modulo} className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                      <span className="text-sm text-slate-300 capitalize">
                        {modulo.replace('_', ' ')}
                      </span>
                      <Switch checked={ativo} disabled={!modoEdicao} />
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-300">
                    <strong>Último Login:</strong> {formatTempo(usuarioSelecionado.ultimoLogin)}
                  </p>
                  <p className="text-sm text-blue-300 mt-1">
                    <strong>Permissões Ativas:</strong> {contarPermissoes(usuarioSelecionado.permissoes)} de 7
                  </p>
                </div>

                <div className="flex space-x-3">
                  {!modoEdicao ? (
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => setModoEdicao(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  ) : (
                    <>
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => setModoEdicao(false)}
                      >
                        Salvar
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setModoEdicao(false)}
                      >
                        Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

