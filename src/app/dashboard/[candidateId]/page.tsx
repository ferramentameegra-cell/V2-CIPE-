'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  TrendingUp, TrendingDown, Users, Target, AlertTriangle, Calendar,
  Brain, Send, BarChart3, Settings, LogOut, Home, Search, Shield, MessageSquare,
  Globe, TrendingUpIcon, DollarSign, Clock, User, Bell, Lock, Zap, Compass,
  Megaphone, Bot, LayoutDashboard, UserCog, LineChart, Mail, GlobeIcon,
  FileText, Wallet, CalendarDays, Settings2, BellRing, ShieldCheck,
  UserPlus, BarChart, GitFork, Lightbulb, MessageCircle,
  UserRound, Network, TargetIcon, AlertCircle, MapPin, Users2,
  Handshake, Share2, BarChart2, DollarSignIcon, CalendarIcon
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import OracleCipe from '@/components/OracleCipe';
import SalaDeGuerra from '@/components/modules/SalaDeGuerra';
import WazeEleitoral from '@/components/modules/WazeEleitoral';
import CRMEleitoral from '@/components/modules/CRMEleitoral';
import FunilMobilizacao from '@/components/modules/FunilMobilizacao';
import RadarCrises from '@/components/modules/RadarCrises';
import CentralIAs from '@/components/modules/CentralIAs';

interface DashboardProps {
  params: { candidateId: string };
}

export default function DashboardPage({ params }: DashboardProps) {
  const { candidateId } = params;
  const [activeModule, setActiveModule] = useState('visao-geral');
  const [searchQuery, setSearchQuery] = useState('');
  const [metrics, setMetrics] = useState({
    totalEleitores: 89432,
    intencaoVoto: 28,
    engajamento: 67,
    alcanceRedes: 245000,
    orcamentoUsado: 65,
    diasRestantes: 127
  });

  const trendData = [
    { name: 'Jan', intencao: 12, engajamento: 45 },
    { name: 'Fev', intencao: 15, engajamento: 52 },
    { name: 'Mar', intencao: 18, engajamento: 48 },
    { name: 'Abr', intencao: 22, engajamento: 61 },
    { name: 'Mai', intencao: 25, engajamento: 58 },
    { name: 'Jun', intencao: 28, engajamento: 67 }
  ];

  const segmentacaoData = [
    { name: 'Esquerda', value: 20, color: '#EF4444' },
    { name: 'Centro Esquerda', value: 15, color: '#F97316' },
    { name: 'Centro', value: 30, color: '#EAB308' },
    { name: 'Centro Direita', value: 20, color: '#22C55E' },
    { name: 'Direita', value: 15, color: '#0066FF' },
  ];

  const productPerformance = [
    { id: 1, assigned: 'Sunil Joshi', name: 'Elite Admin', priority: 'Low', budget: '$3.9k' },
    { id: 2, assigned: 'Andrew McDownland', name: 'Real Homes WP Theme', priority: 'Medium', budget: '$24.5k' },
    { id: 3, assigned: 'Christopher Jamil', name: 'MedicalPro WP Theme', priority: 'High', budget: '$12.8k' },
    { id: 4, assigned: 'Nirav Joshi', name: 'Hosting Press HTML', priority: 'Critical', budget: '$2.4k' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implementar lógica de pesquisa
      console.log('Pesquisando:', searchQuery);
    }
  };

  const renderContent = () => {
    switch (activeModule) {
      case 'visao-geral':
        return (
          <div className="space-y-6 fade-in">
            <OracleCipe context="dashboard" />

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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="glass-card">
                <CardContent className="p-5">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                          <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#0066FF" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-white">Segmentação de Eleitores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
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
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                  Alertas Prioritários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-white">Crescimento de 15% no engajamento no Instagram</span>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">Positivo</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-white">Orçamento de mídia 65% utilizado</span>
                    </div>
                    <Badge variant="outline" className="text-yellow-400 border-yellow-400">Atenção</Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-white">Nova oportunidade de debate identificada</span>
                    </div>
                    <Badge variant="outline" className="text-blue-400 border-blue-400">Info</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Product Performance</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-slate-800/50 rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-slate-700/70">
                      <th className="py-3 px-4 text-left text-sm font-medium text-slate-300">Id</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-slate-300">Assigned</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-slate-300">Name</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-slate-300">Priority</th>
                      <th className="py-3 px-4 text-left text-sm font-medium text-slate-300">Budget</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productPerformance.map((row) => (
                      <tr key={row.id} className="border-t border-slate-700 hover:bg-slate-700/30">
                        <td className="py-3 px-4 text-sm text-slate-300">{row.id}</td>
                        <td className="py-3 px-4 text-sm text-white">{row.assigned}</td>
                        <td className="py-3 px-4 text-sm text-white">{row.name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            row.priority === 'Low' ? 'bg-green-500/20 text-green-400' :
                            row.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            row.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {row.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-white">{row.budget}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'sala-de-guerra':
        return <SalaDeGuerra candidateId={candidateId} />;
      case 'waze-eleitoral':
        return <WazeEleitoral candidateId={candidateId} />;
      case 'crm-eleitoral':
        return <CRMEleitoral candidateId={candidateId} />;
      case 'funil-mobilizacao':
        return <FunilMobilizacao candidateId={candidateId} />;
      case 'radar-de-crises':
        return <RadarCrises candidateId={candidateId} />;
      case 'central-de-ias':
        return <CentralIAs candidateId={candidateId} />;
      default:
        return <div className="text-white">Módulo {activeModule} em construção...</div>;
    }
  };

  return (
    <div className="main-container">
      <ScrollArea className="sidebar">
        <div className="p-4">
          <div className="text-white text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">CIPE</div>

          <div className="flex items-center mb-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg mr-3">RN</div>
            <div>
              <p className="text-white font-semibold">Ronaldo Nogueira</p>
              <p className="text-slate-400 text-sm">Deputado Federal - Nº 1014</p>
            </div>
          </div>

          <nav className="space-y-2">
            <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase mb-2">Dashboard</h3>
              <ul>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveModule('visao-geral'); }}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'visao-geral' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <LayoutDashboard className="h-5 w-5 mr-3" />
                    Visão Geral
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase mb-2 mt-4">Inteligência</h3>
              <ul>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveModule('sala-de-guerra'); }}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'sala-de-guerra' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Zap className="h-5 w-5 mr-3" />
                    Sala de Guerra
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveModule('waze-eleitoral'); }}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'waze-eleitoral' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <MapPin className="h-5 w-5 mr-3" />
                    Waze Eleitoral
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('radar-de-crises')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'radar-de-crises' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <AlertCircle className="h-5 w-5 mr-3" />
                    Radar de Crises
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveModule('funil-mobilizacao'); }}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'funil-mobilizacao' ? 'bg-blue-600/30 text-blue-300' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <GitFork className="h-5 w-5 mr-3" />
                    Funil de Mobilização
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase mb-2 mt-4">Arsenal de IA</h3>
              <ul>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('central-de-ias')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'central-de-ias' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Brain className="h-5 w-5 mr-3" />
                    Central de IAs
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('clone-digital')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'clone-digital' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <UserRound className="h-5 w-5 mr-3" />
                    Clone Digital
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('blindagem')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'blindagem' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <ShieldCheck className="h-5 w-5 mr-3" />
                    Blindagem
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('comunicacao')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'comunicacao' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Megaphone className="h-5 w-5 mr-3" />
                    Comunicação
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('narrativa-ra')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'narrativa-ra' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Lightbulb className="h-5 w-5 mr-3" />
                    Narrativa RA
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('pesquisas-auto')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'pesquisas-auto' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <BarChart2 className="h-5 w-5 mr-3" />
                    Pesquisas Auto
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('analise-adversarios')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'analise-adversarios' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <TargetIcon className="h-5 w-5 mr-3" />
                    Análise Adversários
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase mb-2 mt-4">Eleitores</h3>
              <ul>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveModule('crm-eleitoral'); }}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'crm-eleitoral' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Users2 className="h-5 w-5 mr-3" />
                    CRM Eleitoral
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('segmentacao')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'segmentacao' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <PieChart className="h-5 w-5 mr-3" />
                    Segmentação
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('analise-ideologica')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'analise-ideologica' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Network className="h-5 w-5 mr-3" />
                    Análise Ideológica
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('embaixadores')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'embaixadores' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Handshake className="h-5 w-5 mr-3" />
                    Embaixadores
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase mb-2 mt-4">Digital</h3>
              <ul>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('redes-sociais')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'redes-sociais' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Share2 className="h-5 w-5 mr-3" />
                    Redes Sociais
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('email-marketing')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'email-marketing' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Mail className="h-5 w-5 mr-3" />
                    Email Marketing
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('sites-landing')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'sites-landing' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <GlobeIcon className="h-5 w-5 mr-3" />
                    Sites & Landing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase mb-2 mt-4">Performance</h3>
              <ul>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('relatorios')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'relatorios' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <FileText className="h-5 w-5 mr-3" />
                    Relatórios
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('orcamento-roi')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'orcamento-roi' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <DollarSignIcon className="h-5 w-5 mr-3" />
                    Orçamento & ROI
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('calendario')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'calendario' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <CalendarIcon className="h-5 w-5 mr-3" />
                    Calendário
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-slate-300 text-xs font-semibold uppercase mb-2 mt-4">Configurações</h3>
              <ul>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('perfil')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'perfil' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <UserCog className="h-5 w-5 mr-3" />
                    Perfil
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('notificacoes')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'notificacoes' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <BellRing className="h-5 w-5 mr-3" />
                    Notificações
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('seguranca')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'seguranca' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Lock className="h-5 w-5 mr-3" />
                    Segurança
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => { /* handle logout */ }}
                    className="flex items-center p-2 rounded-lg text-red-400 hover:bg-red-900/50 transition-colors duration-200 mt-4"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sair
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </ScrollArea>

      <div className="flex flex-col flex-1">
        <header className="header p-4">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-white text-2xl font-bold">
              {activeModule === 'visao-geral' && 'Dashboard'}
              {activeModule === 'sala-de-guerra' && 'Sala de Guerra'}
              {activeModule === 'waze-eleitoral' && 'Waze Eleitoral'}
              {activeModule === 'crm-eleitoral' && 'CRM Eleitoral'}
              {activeModule === 'funil-mobilizacao' && 'Funil de Mobilização'}
              {activeModule === 'radar-de-crises' && 'Radar de Crises'}
              {activeModule === 'central-de-ias' && 'Central de IAs'}
              {activeModule === 'clone-digital' && 'Clone Digital'}
              {activeModule === 'blindagem' && 'Blindagem'}
              {activeModule === 'comunicacao' && 'Comunicação'}
              {activeModule === 'narrativa-ra' && 'Narrativa RA'}
              {activeModule === 'pesquisas-auto' && 'Pesquisas Auto'}
              {activeModule === 'analise-adversarios' && 'Análise de Adversários'}
              {activeModule === 'segmentacao' && 'Segmentação de Eleitores'}
              {activeModule === 'analise-ideologica' && 'Análise Ideológica'}
              {activeModule === 'embaixadores' && 'Embaixadores'}
              {activeModule === 'redes-sociais' && 'Redes Sociais'}
              {activeModule === 'email-marketing' && 'Email Marketing'}
              {activeModule === 'sites-landing' && 'Sites & Landing'}
              {activeModule === 'relatorios' && 'Relatórios'}
              {activeModule === 'orcamento-roi' && 'Orçamento & ROI'}
              {activeModule === 'calendario' && 'Calendário'}
              {activeModule === 'perfil' && 'Perfil'}
              {activeModule === 'notificacoes' && 'Notificações'}
              {activeModule === 'seguranca' && 'Segurança'}
              {activeModule === 'visao-geral' ? '' : ` do Candidato: ${candidateId}`}
            </h1>
            
            <div className="flex items-center space-x-4">
              {/* Campo de Pesquisa */}
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Pesquisar no sistema..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg"
                  />
                </div>
              </form>
              
              {/* Notificações e Perfil */}
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Bell className="h-5 w-5 text-white cursor-pointer hover:text-blue-400 transition-colors" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer hover:bg-slate-700/50 rounded-lg p-2 transition-colors">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">RN</div>
                  <span className="text-white text-sm">Ronaldo Nogueira</span>
                  <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="main-content p-6 module-container">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
