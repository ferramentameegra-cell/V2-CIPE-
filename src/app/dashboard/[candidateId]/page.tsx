'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, TrendingDown, Users, Target, AlertTriangle, Calendar, Brain, Send, 
  BarChart3, Settings, LogOut, MapPin, Zap, Shield, MessageSquare, Globe, 
  Search, FileText, DollarSign, Bell, User, Lock, Smartphone, Mail, 
  Home, PieChart, UserCheck, Filter, Award, Share2, Eye, Clock
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import OracleCipe from '@/components/OracleCipe';
import SalaDeGuerra from '@/components/modules/SalaDeGuerra';
import WazeEleitoral from '@/components/modules/WazeEleitoral';
import CRMEleitoral from '@/components/modules/CRMEleitoral';
import FunilMobilizacao from '@/components/modules/FunilMobilizacao';

interface DashboardProps {
  params: { candidateId: string };
}

export default function DashboardPage({ params }: DashboardProps) {
  const { candidateId } = params;
  const [metrics, setMetrics] = useState({
    totalEleitores: 89432,
    intencaoVoto: 28,
    engajamento: 67,
    alcanceRedes: 245000,
    orcamentoUsado: 65,
    diasRestantes: 127
  });

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModule, setActiveModule] = useState('dashboard');

  useEffect(() => {
    fetchMetrics();
    fetchAlerts();
  }, [candidateId]);

  const fetchMetrics = async () => {
    try {
      const response = await fetch(`/api/metrics?candidateId=${candidateId}`);
      const data = await response.json();
      if (data.success) {
        setMetrics(data.data.current);
      }
    } catch (error) {
      console.error('Erro ao buscar métricas:', error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await fetch(`/api/alerts?candidateId=${candidateId}&status=active`);
      const data = await response.json();
      if (data.success) {
        setAlerts(data.data.alerts);
      }
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
    } finally {
      setLoading(false);
    }
  };

  const trendData = [
    { name: 'Jan', intencao: 12, engajamento: 45 },
    { name: 'Fev', intencao: 15, engajamento: 52 },
    { name: 'Mar', intencao: 18, engajamento: 48 },
    { name: 'Abr', intencao: 22, engajamento: 61 },
    { name: 'Mai', intencao: 25, engajamento: 58 },
    { name: 'Jun', intencao: 28, engajamento: 67 }
  ];

  // Segmentação política corrigida
  const segmentacaoData = [
    { name: 'Esquerda', value: 15, color: '#EF4444' },
    { name: 'Centro Esquerda', value: 20, color: '#F97316' },
    { name: 'Centro', value: 25, color: '#EAB308' },
    { name: 'Centro Direita', value: 22, color: '#3B82F6' },
    { name: 'Direita', value: 18, color: '#8B5CF6' }
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'sala_guerra':
        return <SalaDeGuerra candidateId={candidateId} />;
      case 'waze_eleitoral':
        return <WazeEleitoral candidateId={candidateId} />;
      case 'crm_eleitoral':
        return <CRMEleitoral candidateId={candidateId} />;
      case 'funil_mobilizacao':
        return <FunilMobilizacao candidateId={candidateId} />;
      case 'dashboard':
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Oracle CIPE */}
      <OracleCipe 
        candidateId={candidateId} 
        context="dashboard"
        placeholder="Pergunte sobre métricas, tendências ou insights..."
      />

      {/* Contagem Regressiva */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {metrics.diasRestantes} DIAS
            </div>
            <p className="text-slate-400">para as eleições</p>
            <Progress value={(365 - metrics.diasRestantes) / 365 * 100} className="mt-4" />
          </div>
        </CardContent>
      </Card>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Intenção de Voto</p>
                <p className="text-2xl font-bold text-white">{metrics.intencaoVoto}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+2.3%</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total de Eleitores</p>
                <p className="text-2xl font-bold text-white">{metrics.totalEleitores.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+1.2K</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Engajamento</p>
                <p className="text-2xl font-bold text-white">{metrics.engajamento}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-sm text-green-400">+3.1%</span>
                </div>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Orçamento Usado</p>
                <p className="text-2xl font-bold text-white">{metrics.orcamentoUsado}%</p>
                <Progress value={metrics.orcamentoUsado} className="mt-2" />
              </div>
              <Calendar className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tendência de Intenção de Voto */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Tendência de Intenção de Voto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="intencao" 
                  stroke="#0066FF" 
                  fill="url(#gradientIntencao)" 
                />
                <defs>
                  <linearGradient id="gradientIntencao" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0066FF" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Segmentação Política de Eleitores */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Segmentação Política de Eleitores</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={segmentacaoData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {segmentacaoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Prioritários */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
            Alertas Prioritários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert: any) => (
              <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                alert.type === 'crisis' ? 'bg-red-500/10 border-red-500/20' :
                alert.type === 'opportunity' ? 'bg-green-500/10 border-green-500/20' :
                alert.type === 'threat' ? 'bg-yellow-500/10 border-yellow-500/20' :
                'bg-blue-500/10 border-blue-500/20'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    alert.type === 'crisis' ? 'bg-red-400' :
                    alert.type === 'opportunity' ? 'bg-green-400' :
                    alert.type === 'threat' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`}></div>
                  <span className="text-white">{alert.title}</span>
                </div>
                <Badge variant="outline" className={
                  alert.type === 'crisis' ? 'text-red-400 border-red-400' :
                  alert.type === 'opportunity' ? 'text-green-400 border-green-400' :
                  alert.type === 'threat' ? 'text-yellow-400 border-yellow-400' :
                  'text-blue-400 border-blue-400'
                }>
                  {alert.type === 'crisis' ? 'Crise' :
                   alert.type === 'opportunity' ? 'Oportunidade' :
                   alert.type === 'threat' ? 'Ameaça' : 'Info'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4 text-lg">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header Clean e Elegante */}
      <header className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">CIPE</h1>
                  <p className="text-sm text-slate-400">Ronaldo Nogueira - Deputado Federal - 1014</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="h-5 w-5 text-slate-300" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  {alerts.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">RN</span>
                </div>
                <span className="text-slate-300">Ronaldo Nogueira</span>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Clean e Elegante */}
        <aside className="bg-slate-800/50 backdrop-blur-lg border-r border-slate-700 h-screen w-64 fixed inset-y-0 left-0 z-40 overflow-y-auto">
          <div className="p-6">
            {/* Perfil do Candidato */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">RN</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Ronaldo Nogueira</h3>
                  <p className="text-slate-400 text-sm">Deputado Federal</p>
                  <p className="text-slate-500 text-xs">Nº 1014</p>
                </div>
              </div>
            </div>

            {/* Navegação Clean */}
            <nav className="space-y-2">
              {/* DASHBOARD */}
              <div>
                <button 
                  onClick={() => setActiveModule('dashboard')}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeModule === 'dashboard' 
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </button>
                {activeModule === 'dashboard' && (
                  <div className="ml-6 mt-1">
                    <button className="flex items-center space-x-2 px-3 py-1 text-sm text-slate-400 hover:text-white">
                      <TrendingUp className="h-4 w-4" />
                      <span>Visão Geral</span>
                    </button>
                  </div>
                )}
              </div>
              
              {/* INTELIGÊNCIA */}
              <div className="pt-4">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Inteligência</h4>
                <div className="space-y-1">
                  <button 
                    onClick={() => setActiveModule('sala_guerra')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeModule === 'sala_guerra' 
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    <span>Sala de Guerra</span>
                  </button>
                  <button 
                    onClick={() => setActiveModule('waze_eleitoral')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeModule === 'waze_eleitoral' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <MapPin className="h-4 w-4" />
                    <span>Waze Eleitoral</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Radar de Crises</span>
                  </button>
                  <button 
                    onClick={() => setActiveModule('funil_mobilizacao')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeModule === 'funil_mobilizacao' 
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>Funil de Mobilização</span>
                  </button>
                </div>
              </div>

              {/* ARSENAL DE IA */}
              <div className="pt-4">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Arsenal de IA</h4>
                <div className="space-y-1">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Brain className="h-4 w-4" />
                    <span>Central de IAs</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Users className="h-4 w-4" />
                    <span>Clone Digital</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Shield className="h-4 w-4" />
                    <span>Blindagem</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span>Comunicação</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Globe className="h-4 w-4" />
                    <span>Narrativa RA</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <BarChart3 className="h-4 w-4" />
                    <span>Pesquisas Auto</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Search className="h-4 w-4" />
                    <span>Análise Adversários</span>
                  </button>
                </div>
              </div>

              {/* ELEITORES */}
              <div className="pt-4">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Eleitores</h4>
                <div className="space-y-1">
                  <button 
                    onClick={() => setActiveModule('crm_eleitoral')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeModule === 'crm_eleitoral' 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    <span>CRM Eleitoral</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Segmentação</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Target className="h-4 w-4" />
                    <span>Análise Ideológica</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Award className="h-4 w-4" />
                    <span>Embaixadores</span>
                  </button>
                </div>
              </div>

              {/* DIGITAL */}
              <div className="pt-4">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Digital</h4>
                <div className="space-y-1">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Smartphone className="h-4 w-4" />
                    <span>Redes Sociais</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Mail className="h-4 w-4" />
                    <span>Email Marketing</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Home className="h-4 w-4" />
                    <span>Sites & Landing</span>
                  </button>
                </div>
              </div>

              {/* PERFORMANCE */}
              <div className="pt-4">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Performance</h4>
                <div className="space-y-1">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <FileText className="h-4 w-4" />
                    <span>Relatórios</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <DollarSign className="h-4 w-4" />
                    <span>Orçamento & ROI</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Calendar className="h-4 w-4" />
                    <span>Calendário</span>
                  </button>
                </div>
              </div>

              {/* CONFIGURAÇÕES */}
              <div className="pt-4">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Configurações</h4>
                <div className="space-y-1">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <User className="h-4 w-4" />
                    <span>Perfil</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Bell className="h-4 w-4" />
                    <span>Notificações</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Lock className="h-4 w-4" />
                    <span>Segurança</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64">
          <div className="p-6">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
  );
}
