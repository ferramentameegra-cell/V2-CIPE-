'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Handshake, Share2, BarChart2, DollarSignIcon, CalendarIcon, Palette, Link2, Database
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import OracleCipe from '@/components/OracleCipe';
import MetricasPrincipais from '@/components/MetricasPrincipais';
import GraficosEstrategicosGrid from '@/components/GraficosEstrategicosGrid';
import InsightsOracle from '@/components/InsightsOracle';
import OportunidadesEstrategicas from '@/components/OportunidadesEstrategicas';
import Proximos7Dias from '@/components/Proximos7Dias';
import MetricasPrincipaisAvancadas from '@/components/MetricasPrincipaisAvancadas';
import WhatIfScenarios from '@/components/WhatIfScenarios';
import MiniMapaGeografico from '@/components/MiniMapaGeografico';
import ComandosVoz from '@/components/ComandosVoz';
import LayoutPersonalizado from '@/components/LayoutPersonalizado';
import SalaDeGuerra from '@/components/modules/SalaDeGuerra';
import WazeEleitoral from '@/components/modules/WazeEleitoral';
import CRMEleitoral from '@/components/modules/CRMEleitoral';
import FunilMobilizacao from '@/components/modules/FunilMobilizacao';
import RadarCrises from '@/components/modules/RadarCrises';
import CentralIAs from '@/components/modules/CentralIAs';
import CloneDigital from '@/components/modules/CloneDigital';
import BlindagemIA from '@/components/modules/BlindagemIA';
import ComunicacaoIA from '@/components/modules/ComunicacaoIA';
import NarrativaRA from '@/components/modules/NarrativaRA';
import PesquisasAuto from '@/components/modules/PesquisasAuto';
import AnaliseAdversarios from '@/components/modules/AnaliseAdversarios';
import Relatorios from '@/components/modules/Relatorios';
import OrcamentoROI from '@/components/modules/OrcamentoROI';
import CalendarioEstrategico from '@/components/modules/CalendarioEstrategico';
import RedesSociais from '@/components/modules/RedesSociais';
import EmailMarketing from '@/components/modules/EmailMarketing';
import SitesLanding from '@/components/modules/SitesLanding';
import Segmentacao from '@/components/modules/Segmentacao';
import Perfil from '@/components/modules/Perfil';
import Notificacoes from '@/components/modules/Notificacoes';
import Seguranca from '@/components/modules/Seguranca';
import Configuracoes from '@/components/modules/Configuracoes';
import Embaixadores from '@/components/modules/Embaixadores';
import AnaliseIdeologica from '@/components/modules/AnaliseIdeologica';
import BlindagemEstrategica from '@/components/modules/BlindagemEstrategica';

interface DashboardProps {
  params: { candidateId: string };
}

export default function DashboardPage({ params }: DashboardProps) {
  const { candidateId } = params;
  const router = useRouter();
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
            {/* Oracle CIPE - Sempre no topo */}
            <div className="mt-1">
              <OracleCipe context="dashboard" />
            </div>

            {/* Métricas Principais Avançadas com Focus Mode */}
            <MetricasPrincipaisAvancadas />

            {/* Gráficos Estratégicos em Grid */}
            <GraficosEstrategicosGrid />

            {/* What-If Scenarios */}
            <WhatIfScenarios />

            {/* Mini-Mapa Geográfico + Comandos por Voz */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <MiniMapaGeografico />
              </div>
              <div className="lg:col-span-1">
                <ComandosVoz />
              </div>
            </div>

            {/* Layout em Grid para Desktop */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {/* Coluna Esquerda */}
              <div className="space-y-4">
                {/* Insights do Oracle */}
                <InsightsOracle />
              </div>

              {/* Coluna Direita */}
              <div className="space-y-4">
                {/* Oportunidades Estratégicas */}
                <OportunidadesEstrategicas />
                
                {/* Próximos 7 Dias */}
                <Proximos7Dias />
              </div>
            </div>

            {/* Layout Personalizado - Sempre no final */}
            <LayoutPersonalizado />
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
      case 'clone-digital':
        return <CloneDigital candidateId={candidateId} />;
      case 'blindagem-ia':
        return <BlindagemIA candidateId={candidateId} />;
      case 'comunicacao-ia':
        return <ComunicacaoIA candidateId={candidateId} />;
      case 'narrativa-ra':
        return <NarrativaRA candidateId={candidateId} />;
      case 'pesquisas-auto':
        return <PesquisasAuto candidateId={candidateId} />;
      case 'analise-adversarios':
        return <AnaliseAdversarios candidateId={candidateId} />;
      case 'relatorios':
        return <Relatorios candidateId={candidateId} />;
      case 'orcamento-roi':
        return <OrcamentoROI candidateId={candidateId} />;
      case 'calendario':
        return <CalendarioEstrategico candidateId={candidateId} />;
      case 'redes-sociais':
        return <RedesSociais candidateId={candidateId} />;
      case 'email-marketing':
        return <EmailMarketing candidateId={candidateId} />;
      case 'sites-landing':
        return <SitesLanding candidateId={candidateId} />;
      case 'segmentacao':
        return <Segmentacao candidateId={candidateId} />;
      case 'perfil':
        return <Perfil candidateId={candidateId} />;
      case 'notificacoes':
        return <Notificacoes candidateId={candidateId} />;
      case 'seguranca':
        return <Seguranca candidateId={candidateId} />;
      case 'configuracoes':
        return <Configuracoes candidateId={candidateId} />;
      case 'embaixadores':
        return <Embaixadores candidateId={candidateId} />;
      case 'analise-ideologica':
        return <AnaliseIdeologica candidateId={candidateId} />;
      case 'blindagem-estrategica':
        return <BlindagemEstrategica candidateId={candidateId} />;
      default:
        return <div className="text-white">Módulo {activeModule} em construção...</div>;
    }
  };

  return (
    <div className="main-container">
      <header className="header p-4 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-blue-500/20 shadow-2xl shadow-blue-500/10">
        <div className="flex items-center justify-between w-full">
          {/* Logo e Título Épico */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
                  <span className="text-white font-bold text-xl">CIPE</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-green-400/50">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {activeModule === 'visao-geral' && 'Dashboard Executivo'}
                  {activeModule === 'sala-de-guerra' && 'Sala de Guerra'}
                  {activeModule === 'waze-eleitoral' && 'Waze Eleitoral'}
                  {activeModule === 'crm-eleitoral' && 'CRM Eleitoral'}
                  {activeModule === 'funil-mobilizacao' && 'Funil de Mobilização'}
                  {activeModule === 'radar-de-crises' && 'Radar de Crises'}
                  {activeModule === 'central-de-ias' && 'Central de IAs'}
                  {activeModule === 'clone-digital' && 'Clone Digital'}
                  {activeModule === 'blindagem' && 'Blindagem Estratégica'}
                  {activeModule === 'comunicacao' && 'Comunicação em Massa'}
                  {activeModule === 'narrativa-ra' && 'Narrativa Regional'}
                  {activeModule === 'pesquisas-auto' && 'Pesquisas Automatizadas'}
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
                </h1>
                <p className="text-slate-300 text-sm font-medium">
                  Sistema de Inteligência Política e Eleitoral
                </p>
              </div>
            </div>
          </div>

          {/* Área Central - Barra de Pesquisa Épica */}
          <div className="flex-1 max-w-xl mx-6">
            <form className="relative" onSubmit={handleSearch}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-400" />
                  <Input
                    type="text"
                    className="w-full h-12 pl-9 pr-11 py-3 bg-slate-800/80 border border-blue-500/30 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 rounded-xl backdrop-blur-sm text-base font-medium shadow-lg shadow-blue-500/10 transition-all duration-300"
                    placeholder="Pesquisar em toda a base de inteligência..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      <div className="w-7 h-7 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center cursor-pointer hover:shadow-lg shadow-blue-500/25 transition-all duration-300">
                        <Search className="h-3.5 w-3.5 text-white" />
                      </div>
                    </div>
                </div>
              </div>
            </form>
          </div>

          {/* Área Direita - Notificações e Perfil Épicos */}
          <div className="flex items-center space-x-4">
            {/* Notificações Avançadas */}
            <div className="relative group">
              <div className="p-2.5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg border border-slate-600/50 backdrop-blur-sm cursor-pointer hover:border-blue-500/50 transition-all duration-300 shadow-lg">
                <Bell className="h-5 w-5 text-white group-hover:text-blue-400 transition-colors" />
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-lg shadow-red-500/25">3</span>
              </div>
            </div>

            {/* Perfil do Candidato Épico */}
            <div className="flex items-center space-x-3 bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-xl p-2.5 border border-slate-600/50 backdrop-blur-sm cursor-pointer hover:border-blue-500/50 transition-all duration-300 shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/25">RN</div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm">Ronaldo Nogueira</span>
                <span className="text-blue-400 text-xs font-medium">Republicanos</span>
              </div>
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-lg shadow-green-400/50 animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="content-container">
        <ScrollArea className="sidebar">
          <div className="p-4">
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-xl border border-slate-600/50 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg shadow-blue-500/25">RN</div>
              <div>
                <p className="text-white font-bold text-lg">Ronaldo Nogueira</p>
                <p className="text-blue-400 text-sm font-medium">Republicanos</p>
                <p className="text-slate-400 text-xs">Deputado Federal - Nº 1014</p>
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
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); setActiveModule('blindagem-estrategica'); }}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'blindagem-estrategica' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Shield className="h-5 w-5 mr-3" />
                    Blindagem Estratégica
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
                    onClick={() => setActiveModule('blindagem-ia')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'blindagem-ia' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <ShieldCheck className="h-5 w-5 mr-3" />
                    Blindagem
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={() => setActiveModule('comunicacao-ia')}
                    className={`flex items-center p-2 rounded-lg transition-colors duration-200 ${
                      activeModule === 'comunicacao-ia' ? 'bg-blue-600/30 text-blue-300 neon-border' : 'text-white hover:bg-slate-700/50'
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
                    onClick={(e) => { e.preventDefault(); router.push(`/dashboard/${candidateId}/configuracoes`); }}
                    className="flex items-center p-2 rounded-lg transition-colors duration-200 text-white hover:bg-slate-700/50"
                  >
                    <Settings2 className="h-5 w-5 mr-3" />
                    <div>
                      <div className="font-medium">Configurações</div>
                      <div className="text-xs text-slate-400">Dashboard completo</div>
                    </div>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); router.push(`/dashboard/${candidateId}/configuracoes/perfil`); }}
                    className="flex items-center p-2 rounded-lg transition-colors duration-200 text-white hover:bg-slate-700/50 ml-6"
                  >
                    <UserCog className="h-4 w-4 mr-2" />
                    <span className="text-sm">Perfil</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); router.push(`/dashboard/${candidateId}/configuracoes/integracao`); }}
                    className="flex items-center p-2 rounded-lg transition-colors duration-200 text-white hover:bg-slate-700/50 ml-6"
                  >
                    <Link2 className="h-4 w-4 mr-2" />
                    <span className="text-sm">Integrações</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); router.push(`/dashboard/${candidateId}/configuracoes/personalizacao`); }}
                    className="flex items-center p-2 rounded-lg transition-colors duration-200 text-white hover:bg-slate-700/50 ml-6"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    <span className="text-sm">Personalização</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); router.push(`/dashboard/${candidateId}/configuracoes/notificacoes`); }}
                    className="flex items-center p-2 rounded-lg transition-colors duration-200 text-white hover:bg-slate-700/50 ml-6"
                  >
                    <BellRing className="h-4 w-4 mr-2" />
                    <span className="text-sm">Notificações</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); router.push(`/dashboard/${candidateId}/configuracoes/usuarios`); }}
                    className="flex items-center p-2 rounded-lg transition-colors duration-200 text-white hover:bg-slate-700/50 ml-6"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">Usuários</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); router.push(`/dashboard/${candidateId}/configuracoes/oracle`); }}
                    className="flex items-center p-2 rounded-lg transition-colors duration-200 text-white hover:bg-slate-700/50 ml-6"
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    <span className="text-sm">Oracle</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); router.push(`/dashboard/${candidateId}/configuracoes/backup`); }}
                    className="flex items-center p-2 rounded-lg transition-colors duration-200 text-white hover:bg-slate-700/50 ml-6"
                  >
                    <Database className="h-4 w-4 mr-2" />
                    <span className="text-sm">Backup</span>
                  </a>
                </li>
                <li className="mb-1">
                  <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); router.push(`/dashboard/${candidateId}/configuracoes/integracao/calendarios`); }}
                    className="flex items-center p-2 rounded-lg transition-colors duration-200 text-white hover:bg-slate-700/50 ml-6"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Calendários</span>
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

        <main className="main-content p-4 pt-6 module-container">
          {renderContent()}
        </main>
      </div>
      
      {/* Barra Inferior - Espaço Reservado */}
      <footer className="h-16 bg-slate-900/50 border-t border-slate-700/50 backdrop-blur-sm flex items-center justify-center">
        <div className="text-slate-400 text-sm">
          Sistema CIPE • Versão 2.0 • Espaço reservado para informações futuras
        </div>
      </footer>
    </div>
  );
}
