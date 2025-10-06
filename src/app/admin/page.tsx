'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, UserPlus, Settings, BarChart3, AlertTriangle, 
  Brain, Shield, Database, Activity, TrendingUp
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeCandidates: number;
  totalAlerts: number;
  resolvedAlerts: number;
  apiCallsLast24h: number;
  storageUsedGB: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeCandidates: 0,
    totalAlerts: 0,
    resolvedAlerts: 0,
    apiCallsLast24h: 0,
    storageUsedGB: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4 text-lg">Carregando painel administrativo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CIPE Admin</h1>
                <p className="text-sm text-slate-400">Painel Administrativo</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400">
                Sistema Online
              </Badge>
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total de Usuários</p>
                  <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">+12%</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Candidatos Ativos</p>
                  <p className="text-2xl font-bold text-white">{stats.activeCandidates}</p>
                  <div className="flex items-center mt-1">
                    <Activity className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">Online</span>
                  </div>
                </div>
                <UserPlus className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Alertas Ativos</p>
                  <p className="text-2xl font-bold text-white">{stats.totalAlerts - stats.resolvedAlerts}</p>
                  <div className="flex items-center mt-1">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm text-yellow-400">Pendentes</span>
                  </div>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">API Calls (24h)</p>
                  <p className="text-2xl font-bold text-white">{stats.apiCallsLast24h.toLocaleString()}</p>
                  <div className="flex items-center mt-1">
                    <BarChart3 className="h-4 w-4 text-blue-400 mr-1" />
                    <span className="text-sm text-blue-400">Alto tráfego</span>
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Storage Usado</p>
                  <p className="text-2xl font-bold text-white">{stats.storageUsedGB} GB</p>
                  <div className="flex items-center mt-1">
                    <Database className="h-4 w-4 text-cyan-400 mr-1" />
                    <span className="text-sm text-cyan-400">65% usado</span>
                  </div>
                </div>
                <Database className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Taxa de Resolução</p>
                  <p className="text-2xl font-bold text-white">
                    {stats.totalAlerts > 0 ? Math.round((stats.resolvedAlerts / stats.totalAlerts) * 100) : 0}%
                  </p>
                  <div className="flex items-center mt-1">
                    <Shield className="h-4 w-4 text-green-400 mr-1" />
                    <span className="text-sm text-green-400">Excelente</span>
                  </div>
                </div>
                <Shield className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 text-blue-400 mr-2" />
                Gestão de Usuários
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <h3 className="text-white font-semibold">Criar Novo Usuário</h3>
                  <p className="text-sm text-slate-400">Adicionar usuário ao sistema</p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Criar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <h3 className="text-white font-semibold">Gerenciar Candidatos</h3>
                  <p className="text-sm text-slate-400">Configurar candidatos e permissões</p>
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Gerenciar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Brain className="h-5 w-5 text-purple-400 mr-2" />
                Configurações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <h3 className="text-white font-semibold">Oracle CIPE</h3>
                  <p className="text-sm text-slate-400">Configurar IA e prompts</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Brain className="h-4 w-4 mr-2" />
                  Configurar
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <h3 className="text-white font-semibold">Integrações</h3>
                  <p className="text-sm text-slate-400">Redes sociais e APIs externas</p>
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configurar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
