'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, Crown, TrendingUp, MessageSquare, MapPin, 
  Plus, Search, Filter, Download, Bell, Star,
  Activity, Target, Award, Zap, Calendar, Phone,
  AlertCircle
} from 'lucide-react';

interface EmbaixadorResumo {
  id: string;
  nome: string;
  foto?: string;
  posicao: number;
  pontuacao: number;
  nivel: 'INICIANTE' | 'BRONZE' | 'PRATA' | 'OURO' | 'DIAMANTE' | 'LIDER';
  status: 'ATIVO' | 'INATIVO' | 'TREINAMENTO' | 'FERIAS';
  regiao: string;
  telefone: string;
  whatsapp: string;
  
  // Métricas
  totalComunidades: number;
  totalMembros: number;
  novosMembrosSemana: number;
  mensagensEnviadas: number;
  eventosParticipados: number;
  pessoasConvertidas: number;
  
  // Metas
  metaComunidades: number;
  metaMembros: number;
  metaMensagens: number;
  
  // Atividade
  ultimaAtividade: Date;
  diasAtivo: number;
  
  // Conquistas
  conquistas: string[];
  proximaConquista?: string;
}

interface MetricasGerais {
  totalEmbaixadores: number;
  embaixadoresAtivos: number;
  totalComunidades: number;
  totalMembros: number;
  crescimentoSemanal: number;
  mediaEngajamento: number;
  metasCumpridas: number;
  novosCadastros: number;
}

export default function Embaixadores({ candidateId }: { candidateId: string }) {
  const [embaixadores, setEmbaixadores] = useState<EmbaixadorResumo[]>([]);
  const [metricas, setMetricas] = useState<MetricasGerais>({
    totalEmbaixadores: 127,
    embaixadoresAtivos: 89,
    totalComunidades: 342,
    totalMembros: 28450,
    crescimentoSemanal: 12.5,
    mediaEngajamento: 78.3,
    metasCumpridas: 67,
    novosCadastros: 8
  });
  
  const [filtros, setFiltros] = useState({
    status: 'todos',
    regiao: 'todas',
    nivel: 'todos',
    busca: ''
  });
  
  const [viewMode, setViewMode] = useState<'cards' | 'tabela' | 'mapa'>('cards');

  // Dados simulados dos embaixadores
  useEffect(() => {
    const embaixadoresSimulados: EmbaixadorResumo[] = [
      {
        id: '1',
        nome: 'Maria Silva Santos',
        posicao: 1,
        pontuacao: 2847,
        nivel: 'DIAMANTE',
        status: 'ATIVO',
        regiao: 'Zona Norte',
        telefone: '(61) 99999-0001',
        whatsapp: '61999990001',
        totalComunidades: 12,
        totalMembros: 3420,
        novosMembrosSemana: 89,
        mensagensEnviadas: 156,
        eventosParticipados: 8,
        pessoasConvertidas: 23,
        metaComunidades: 15,
        metaMembros: 4000,
        metaMensagens: 200,
        ultimaAtividade: new Date(Date.now() - 30 * 60 * 1000),
        diasAtivo: 127,
        conquistas: ['👑 Líder do Mês', '🚀 Crescimento Explosivo', '💬 Comunicadora', '⭐ Veterana'],
        proximaConquista: '🏆 Mil Membros'
      },
      {
        id: '2',
        nome: 'João Santos Oliveira',
        posicao: 2,
        pontuacao: 2156,
        nivel: 'OURO',
        status: 'ATIVO',
        regiao: 'Centro',
        telefone: '(61) 99999-0002',
        whatsapp: '61999990002',
        totalComunidades: 8,
        totalMembros: 2890,
        novosMembrosSemana: 67,
        mensagensEnviadas: 134,
        eventosParticipados: 6,
        pessoasConvertidas: 18,
        metaComunidades: 10,
        metaMembros: 3000,
        metaMensagens: 150,
        ultimaAtividade: new Date(Date.now() - 2 * 60 * 60 * 1000),
        diasAtivo: 98,
        conquistas: ['⭐ Veterano', '🎯 Precisão', '💪 Consistente'],
        proximaConquista: '👑 Líder Regional'
      },
      {
        id: '3',
        nome: 'Ana Costa Lima',
        posicao: 3,
        pontuacao: 1923,
        nivel: 'PRATA',
        status: 'ATIVO',
        regiao: 'Zona Sul',
        telefone: '(61) 99999-0003',
        whatsapp: '61999990003',
        totalComunidades: 10,
        totalMembros: 2340,
        novosMembrosSemana: 45,
        mensagensEnviadas: 98,
        eventosParticipados: 5,
        pessoasConvertidas: 15,
        metaComunidades: 12,
        metaMembros: 2500,
        metaMensagens: 120,
        ultimaAtividade: new Date(Date.now() - 1 * 60 * 60 * 1000),
        diasAtivo: 76,
        conquistas: ['🌟 Engajamento Alto', '📈 Crescimento Constante'],
        proximaConquista: '🥇 500 Membros'
      },
      {
        id: '4',
        nome: 'Pedro Lima Costa',
        posicao: 4,
        pontuacao: 1567,
        nivel: 'BRONZE',
        status: 'ATIVO',
        regiao: 'Zona Leste',
        telefone: '(61) 99999-0004',
        whatsapp: '61999990004',
        totalComunidades: 6,
        totalMembros: 1890,
        novosMembrosSemana: 23,
        mensagensEnviadas: 76,
        eventosParticipados: 4,
        pessoasConvertidas: 12,
        metaComunidades: 8,
        metaMembros: 2000,
        metaMensagens: 100,
        ultimaAtividade: new Date(Date.now() - 4 * 60 * 60 * 1000),
        diasAtivo: 54,
        conquistas: ['🎖️ Dedicação', '🔥 Iniciativa'],
        proximaConquista: '💬 Comunicador'
      },
      {
        id: '5',
        nome: 'Carla Oliveira Silva',
        posicao: 5,
        pontuacao: 1234,
        nivel: 'INICIANTE',
        status: 'TREINAMENTO',
        regiao: 'Zona Oeste',
        telefone: '(61) 99999-0005',
        whatsapp: '61999990005',
        totalComunidades: 5,
        totalMembros: 1456,
        novosMembrosSemana: 12,
        mensagensEnviadas: 54,
        eventosParticipados: 2,
        pessoasConvertidas: 8,
        metaComunidades: 7,
        metaMembros: 1500,
        metaMensagens: 80,
        ultimaAtividade: new Date(Date.now() - 24 * 60 * 60 * 1000),
        diasAtivo: 32,
        conquistas: ['🏆 Iniciante Promissora'],
        proximaConquista: '🥉 Primeiro Grupo'
      },
      {
        id: '6',
        nome: 'Ricardo Mendes',
        posicao: 6,
        pontuacao: 987,
        nivel: 'BRONZE',
        status: 'ATIVO',
        regiao: 'Zona Norte',
        telefone: '(61) 99999-0006',
        whatsapp: '61999990006',
        totalComunidades: 4,
        totalMembros: 1120,
        novosMembrosSemana: 15,
        mensagensEnviadas: 42,
        eventosParticipados: 3,
        pessoasConvertidas: 7,
        metaComunidades: 5,
        metaMembros: 1200,
        metaMensagens: 60,
        ultimaAtividade: new Date(Date.now() - 6 * 60 * 60 * 1000),
        diasAtivo: 45,
        conquistas: ['🔥 Iniciativa'],
        proximaConquista: '🎖️ Dedicação'
      }
    ];
    
    setEmbaixadores(embaixadoresSimulados);
  }, []);

  const getNivelColor = (nivel: EmbaixadorResumo['nivel']) => {
    switch (nivel) {
      case 'INICIANTE': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      case 'BRONZE': return 'bg-amber-600/20 text-amber-300 border-amber-600/30';
      case 'PRATA': return 'bg-slate-400/20 text-slate-300 border-slate-400/30';
      case 'OURO': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'DIAMANTE': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'LIDER': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
    }
  };

  const getStatusColor = (status: EmbaixadorResumo['status']) => {
    switch (status) {
      case 'ATIVO': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'INATIVO': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'TREINAMENTO': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'FERIAS': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
    }
  };

  const getPosicaoIcon = (posicao: number) => {
    switch (posicao) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${posicao}º`;
    }
  };

  const calcularProgressoMeta = (atual: number, meta: number) => {
    return Math.min((atual / meta) * 100, 100);
  };

  const embaixadoresFiltrados = embaixadores.filter(emb => {
    if (filtros.status !== 'todos' && emb.status !== filtros.status.toUpperCase()) return false;
    if (filtros.regiao !== 'todas' && emb.regiao !== filtros.regiao) return false;
    if (filtros.nivel !== 'todos' && emb.nivel !== filtros.nivel.toUpperCase()) return false;
    if (filtros.busca && !emb.nome.toLowerCase().includes(filtros.busca.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4 fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Embaixadores</h1>
          <p className="text-sm text-slate-400">Gestão completa da sua rede de embaixadores</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo Embaixador
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-blue-400">{metricas.totalEmbaixadores}</div>
            <div className="text-xs text-slate-400">Total</div>
            <div className="text-xs text-green-400">+{metricas.novosCadastros}</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-green-400">{metricas.embaixadoresAtivos}</div>
            <div className="text-xs text-slate-400">Ativos</div>
            <div className="text-xs text-slate-400">{Math.round((metricas.embaixadoresAtivos / metricas.totalEmbaixadores) * 100)}%</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-purple-400">{metricas.totalComunidades}</div>
            <div className="text-xs text-slate-400">Comunidades</div>
            <div className="text-xs text-green-400">+17</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-orange-400">{(metricas.totalMembros / 1000).toFixed(1)}K</div>
            <div className="text-xs text-slate-400">Membros</div>
            <div className="text-xs text-green-400">+{metricas.crescimentoSemanal}%</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-cyan-400">{metricas.mediaEngajamento}%</div>
            <div className="text-xs text-slate-400">Engajamento</div>
            <div className="text-xs text-green-400">+2.1%</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-yellow-400">{metricas.metasCumpridas}%</div>
            <div className="text-xs text-slate-400">Metas</div>
            <div className="text-xs text-slate-400">cumpridas</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-red-400">23</div>
            <div className="text-xs text-slate-400">Alertas</div>
            <div className="text-xs text-red-400">atenção</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-3 text-center">
            <div className="text-xl font-bold text-pink-400">156</div>
            <div className="text-xs text-slate-400">Conquistas</div>
            <div className="text-xs text-green-400">+12</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card className="glass-card">
        <CardContent className="p-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar embaixador..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  value={filtros.busca}
                  onChange={(e) => setFiltros(prev => ({ ...prev, busca: e.target.value }))}
                />
              </div>
            </div>
            
            <select
              className="px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              value={filtros.status}
              onChange={(e) => setFiltros(prev => ({ ...prev, status: e.target.value }))}
            >
              <option value="todos">Todos os Status</option>
              <option value="ativo">Ativos</option>
              <option value="inativo">Inativos</option>
              <option value="treinamento">Em Treinamento</option>
              <option value="ferias">Férias</option>
            </select>
            
            <select
              className="px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              value={filtros.regiao}
              onChange={(e) => setFiltros(prev => ({ ...prev, regiao: e.target.value }))}
            >
              <option value="todas">Todas as Regiões</option>
              <option value="Zona Norte">Zona Norte</option>
              <option value="Zona Sul">Zona Sul</option>
              <option value="Centro">Centro</option>
              <option value="Zona Leste">Zona Leste</option>
              <option value="Zona Oeste">Zona Oeste</option>
            </select>
            
            <select
              className="px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              value={filtros.nivel}
              onChange={(e) => setFiltros(prev => ({ ...prev, nivel: e.target.value }))}
            >
              <option value="todos">Todos os Níveis</option>
              <option value="lider">Líder</option>
              <option value="diamante">Diamante</option>
              <option value="ouro">Ouro</option>
              <option value="prata">Prata</option>
              <option value="bronze">Bronze</option>
              <option value="iniciante">Iniciante</option>
            </select>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'cards' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('cards')}
              >
                Cards
              </Button>
              <Button
                variant={viewMode === 'tabela' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('tabela')}
              >
                Tabela
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Embaixadores */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {embaixadoresFiltrados.map((embaixador, index) => (
            <motion.div
              key={embaixador.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass-card hover:bg-slate-800/50 transition-all cursor-pointer h-full">
                <CardContent className="p-4">
                  {/* Header do Card */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {embaixador.nome.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white">{embaixador.nome}</h3>
                        <div className="flex items-center space-x-1 text-xs">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-400">{embaixador.regiao}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xl font-bold">
                        {getPosicaoIcon(embaixador.posicao)}
                      </div>
                      <div className="text-xs text-slate-400">#{embaixador.posicao}</div>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    <Badge className={getNivelColor(embaixador.nivel)} variant="outline">
                      {embaixador.nivel}
                    </Badge>
                    <Badge className={getStatusColor(embaixador.status)} variant="outline">
                      {embaixador.status}
                    </Badge>
                  </div>
                  
                  {/* Métricas Principais */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-2 bg-slate-800/30 rounded">
                      <div className="text-base font-bold text-green-400">{embaixador.totalComunidades}</div>
                      <div className="text-xs text-slate-400">Grupos</div>
                    </div>
                    <div className="text-center p-2 bg-slate-800/30 rounded">
                      <div className="text-base font-bold text-purple-400">{(embaixador.totalMembros / 1000).toFixed(1)}K</div>
                      <div className="text-xs text-slate-400">Membros</div>
                    </div>
                    <div className="text-center p-2 bg-slate-800/30 rounded">
                      <div className="text-base font-bold text-blue-400">{embaixador.pontuacao}</div>
                      <div className="text-xs text-slate-400">Pontos</div>
                    </div>
                  </div>
                  
                  {/* Progresso das Metas */}
                  <div className="space-y-2 mb-3">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Comunidades</span>
                        <span>{embaixador.totalComunidades}/{embaixador.metaComunidades}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${calcularProgressoMeta(embaixador.totalComunidades, embaixador.metaComunidades)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Membros</span>
                        <span>{embaixador.totalMembros.toLocaleString()}/{embaixador.metaMembros.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div 
                          className="bg-purple-500 h-1.5 rounded-full transition-all"
                          style={{ width: `${calcularProgressoMeta(embaixador.totalMembros, embaixador.metaMembros)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Conquistas */}
                  <div className="mb-3">
                    <div className="text-xs text-slate-400 mb-1">Conquistas:</div>
                    <div className="flex flex-wrap gap-1">
                      {embaixador.conquistas.slice(0, 2).map((conquista, i) => (
                        <Badge key={i} variant="outline" className="text-xs px-1.5 py-0.5">
                          {conquista}
                        </Badge>
                      ))}
                      {embaixador.conquistas.length > 2 && (
                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                          +{embaixador.conquistas.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Atividade Recente */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-3 border-b border-slate-700/50">
                    <span>Ativo há {embaixador.diasAtivo} dias</span>
                    <span className="text-green-400">+{embaixador.novosMembrosSemana}/sem</span>
                  </div>
                  
                  {/* Ações */}
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs">
                      Ver Perfil
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <Phone className="w-3 h-3 mr-1" />
                      Contatar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Resumo de Performance */}
      <Card className="glass-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-base">
            <Activity className="w-5 h-5 text-green-400" />
            <span className="text-white">Performance Geral da Rede</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top Performers */}
            <div>
              <h4 className="text-sm font-medium text-white mb-2">🏆 Top 3 Performers</h4>
              <div className="space-y-2">
                {embaixadores.slice(0, 3).map((emb, index) => (
                  <div key={emb.id} className="flex items-center space-x-2 p-2 bg-slate-800/30 rounded">
                    <div className="text-base">{getPosicaoIcon(index + 1)}</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{emb.nome}</div>
                      <div className="text-xs text-slate-400">{emb.pontuacao} pontos • {emb.totalMembros.toLocaleString()} membros</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Crescimento por Região */}
            <div>
              <h4 className="text-sm font-medium text-white mb-2">📍 Crescimento por Região</h4>
              <div className="space-y-2">
                {[
                  { regiao: 'Zona Norte', crescimento: 15.2, embaixadores: 23 },
                  { regiao: 'Centro', crescimento: 12.8, embaixadores: 18 },
                  { regiao: 'Zona Sul', crescimento: 9.4, embaixadores: 21 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                    <div>
                      <div className="text-sm font-medium text-white">{item.regiao}</div>
                      <div className="text-xs text-slate-400">{item.embaixadores} embaixadores</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-400">+{item.crescimento}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Metas e Objetivos */}
            <div>
              <h4 className="text-sm font-medium text-white mb-2">🎯 Metas Coletivas</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">500 Comunidades</span>
                    <span className="text-slate-400">{metricas.totalComunidades}/500</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all"
                      style={{ width: `${(metricas.totalComunidades / 500) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">50K Membros</span>
                    <span className="text-slate-400">{(metricas.totalMembros / 1000).toFixed(1)}K/50K</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${(metricas.totalMembros / 50000) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">150 Embaixadores</span>
                    <span className="text-slate-400">{metricas.totalEmbaixadores}/150</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${(metricas.totalEmbaixadores / 150) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

