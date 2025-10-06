'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Users, Search, Filter, Plus, Edit, Trash2, Phone, Mail, MapPin, 
  Calendar, Star, Target, TrendingUp, UserCheck, AlertCircle, CheckCircle
} from 'lucide-react';
import OracleCipe from '@/components/OracleCipe';

interface CRMEleitoralProps {
  candidateId: string;
}

interface Eleitor {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  idade: number;
  genero: 'M' | 'F' | 'O';
  segmento: 'esquerda' | 'centro_esquerda' | 'centro' | 'centro_direita' | 'direita';
  nivelApoio: 'apoiador_fiel' | 'simpatizante' | 'indeciso' | 'neutro' | 'opositor';
  score: number; // 0-100
  ultimaInteracao: string;
  totalInteracoes: number;
  preferenciaContato: 'whatsapp' | 'email' | 'telefone' | 'presencial';
  tags: string[];
  observacoes: string;
  status: 'ativo' | 'inativo' | 'bloqueado';
  dataCadastro: string;
  fonte: string;
}

interface SegmentacaoData {
  segmento: string;
  total: number;
  percentual: number;
  scoreMedio: number;
  conversao: number;
}

export default function CRMEleitoral({ candidateId }: CRMEleitoralProps) {
  const [eleitores, setEleitores] = useState<Eleitor[]>([]);
  const [segmentacao, setSegmentacao] = useState<SegmentacaoData[]>([]);
  const [filtros, setFiltros] = useState({
    busca: '',
    segmento: 'todos',
    nivelApoio: 'todos',
    status: 'todos'
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'lista' | 'segmentacao' | 'analise' | 'campanhas'>('lista');

  useEffect(() => {
    fetchEleitores();
    fetchSegmentacao();
  }, [candidateId]);

  const fetchEleitores = async () => {
    try {
      // Simular dados de eleitores
      const mockEleitores: Eleitor[] = [
        {
          id: '1',
          nome: 'Maria Silva Santos',
          email: 'maria.silva@email.com',
          telefone: '(51) 99999-1111',
          endereco: 'Porto Alegre, RS',
          idade: 34,
          genero: 'F',
          segmento: 'centro_esquerda',
          nivelApoio: 'simpatizante',
          score: 75,
          ultimaInteracao: '2024-01-15',
          totalInteracoes: 12,
          preferenciaContato: 'whatsapp',
          tags: ['jovem', 'profissional', 'educação'],
          observacoes: 'Interessada em propostas de educação',
          status: 'ativo',
          dataCadastro: '2024-01-01',
          fonte: 'evento_presencial'
        },
        {
          id: '2',
          nome: 'João Pedro Oliveira',
          email: 'joao.oliveira@email.com',
          telefone: '(51) 99999-2222',
          endereco: 'Caxias do Sul, RS',
          idade: 28,
          genero: 'M',
          segmento: 'centro',
          nivelApoio: 'indeciso',
          score: 45,
          ultimaInteracao: '2024-01-10',
          totalInteracoes: 5,
          preferenciaContato: 'email',
          tags: ['empresário', 'tecnologia'],
          observacoes: 'Precisa de mais informações sobre economia',
          status: 'ativo',
          dataCadastro: '2024-01-05',
          fonte: 'redes_sociais'
        },
        {
          id: '3',
          nome: 'Ana Carolina Ferreira',
          email: 'ana.ferreira@email.com',
          telefone: '(51) 99999-3333',
          endereco: 'Pelotas, RS',
          idade: 42,
          genero: 'F',
          segmento: 'esquerda',
          nivelApoio: 'apoiador_fiel',
          score: 95,
          ultimaInteracao: '2024-01-20',
          totalInteracoes: 25,
          preferenciaContato: 'whatsapp',
          tags: ['professora', 'sindicato', 'militante'],
          observacoes: 'Apoiadora ativa, sempre presente em eventos',
          status: 'ativo',
          dataCadastro: '2023-12-15',
          fonte: 'indicacao'
        },
        {
          id: '4',
          nome: 'Carlos Eduardo Lima',
          email: 'carlos.lima@email.com',
          telefone: '(51) 99999-4444',
          endereco: 'Santa Maria, RS',
          idade: 55,
          genero: 'M',
          segmento: 'direita',
          nivelApoio: 'opositor',
          score: 15,
          ultimaInteracao: '2024-01-05',
          totalInteracoes: 2,
          preferenciaContato: 'telefone',
          tags: ['empresário', 'conservador'],
          observacoes: 'Posicionamento contrário, mas aberto ao diálogo',
          status: 'ativo',
          dataCadastro: '2024-01-10',
          fonte: 'pesquisa_eleitoral'
        },
        {
          id: '5',
          nome: 'Fernanda Costa',
          email: 'fernanda.costa@email.com',
          telefone: '(51) 99999-5555',
          endereco: 'Porto Alegre, RS',
          idade: 29,
          genero: 'F',
          segmento: 'centro_direita',
          nivelApoio: 'neutro',
          score: 60,
          ultimaInteracao: '2024-01-18',
          totalInteracoes: 8,
          preferenciaContato: 'whatsapp',
          tags: ['jovem', 'profissional', 'empreendedora'],
          observacoes: 'Interessada em propostas de empreendedorismo',
          status: 'ativo',
          dataCadastro: '2024-01-08',
          fonte: 'evento_online'
        }
      ];
      
      setEleitores(mockEleitores);
    } catch (error) {
      console.error('Erro ao buscar eleitores:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSegmentacao = async () => {
    try {
      const mockSegmentacao: SegmentacaoData[] = [
        { segmento: 'Esquerda', total: 1340, percentual: 15, scoreMedio: 85, conversao: 78 },
        { segmento: 'Centro Esquerda', total: 1789, percentual: 20, scoreMedio: 72, conversao: 65 },
        { segmento: 'Centro', total: 2236, percentual: 25, scoreMedio: 55, conversao: 45 },
        { segmento: 'Centro Direita', total: 1968, percentual: 22, scoreMedio: 48, conversao: 38 },
        { segmento: 'Direita', total: 1607, percentual: 18, scoreMedio: 25, conversao: 15 }
      ];
      
      setSegmentacao(mockSegmentacao);
    } catch (error) {
      console.error('Erro ao buscar segmentação:', error);
    }
  };

  const getNivelApoioColor = (nivel: string) => {
    switch (nivel) {
      case 'apoiador_fiel': return 'text-green-400 border-green-400';
      case 'simpatizante': return 'text-blue-400 border-blue-400';
      case 'indeciso': return 'text-yellow-400 border-yellow-400';
      case 'neutro': return 'text-slate-400 border-slate-400';
      case 'opositor': return 'text-red-400 border-red-400';
      default: return 'text-slate-400 border-slate-400';
    }
  };

  const getNivelApoioLabel = (nivel: string) => {
    switch (nivel) {
      case 'apoiador_fiel': return 'Apoiador Fiel';
      case 'simpatizante': return 'Simpatizante';
      case 'indeciso': return 'Indeciso';
      case 'neutro': return 'Neutro';
      case 'opositor': return 'Opositor';
      default: return 'Desconhecido';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const eleitoresFiltrados = eleitores.filter(eleitor => {
    const matchBusca = eleitor.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
                      eleitor.email.toLowerCase().includes(filtros.busca.toLowerCase());
    const matchSegmento = filtros.segmento === 'todos' || eleitor.segmento === filtros.segmento;
    const matchNivelApoio = filtros.nivelApoio === 'todos' || eleitor.nivelApoio === filtros.nivelApoio;
    const matchStatus = filtros.status === 'todos' || eleitor.status === filtros.status;
    
    return matchBusca && matchSegmento && matchNivelApoio && matchStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-white mt-4">Carregando CRM Eleitoral...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Oracle CIPE para CRM Eleitoral */}
      <OracleCipe 
        candidateId={candidateId} 
        context="eleitores"
        placeholder="Como está a segmentação de eleitores? Quais perfis converter primeiro?"
      />

      {/* Tabs de Navegação */}
      <div className="flex space-x-1 bg-slate-800/50 p-1 rounded-lg">
        {[
          { id: 'lista', label: 'Lista de Eleitores', icon: Users },
          { id: 'segmentacao', label: 'Segmentação', icon: Filter },
          { id: 'analise', label: 'Análise', icon: TrendingUp },
          { id: 'campanhas', label: 'Campanhas', icon: Target }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Conteúdo das Tabs */}
      {activeTab === 'lista' && (
        <div className="space-y-6">
          {/* Filtros */}
          <Card className="glass-card">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Input
                  placeholder="Buscar eleitor..."
                  value={filtros.busca}
                  onChange={(e) => setFiltros({...filtros, busca: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                <select
                  value={filtros.segmento}
                  onChange={(e) => setFiltros({...filtros, segmento: e.target.value})}
                  className="bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2"
                >
                  <option value="todos">Todos os Segmentos</option>
                  <option value="esquerda">Esquerda</option>
                  <option value="centro_esquerda">Centro Esquerda</option>
                  <option value="centro">Centro</option>
                  <option value="centro_direita">Centro Direita</option>
                  <option value="direita">Direita</option>
                </select>
                <select
                  value={filtros.nivelApoio}
                  onChange={(e) => setFiltros({...filtros, nivelApoio: e.target.value})}
                  className="bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2"
                >
                  <option value="todos">Todos os Níveis</option>
                  <option value="apoiador_fiel">Apoiador Fiel</option>
                  <option value="simpatizante">Simpatizante</option>
                  <option value="indeciso">Indeciso</option>
                  <option value="neutro">Neutro</option>
                  <option value="opositor">Opositor</option>
                </select>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Eleitor
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Eleitores */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">
                Eleitores ({eleitoresFiltrados.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eleitoresFiltrados.map((eleitor) => (
                  <div key={eleitor.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {eleitor.nome.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{eleitor.nome}</h3>
                          <p className="text-slate-400 text-sm">{eleitor.email}</p>
                          <p className="text-slate-400 text-sm">{eleitor.telefone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(eleitor.score)}`}>
                            {eleitor.score}/100
                          </div>
                          <div className="text-xs text-slate-400">Score</div>
                        </div>
                        
                        <Badge variant="outline" className={getNivelApoioColor(eleitor.nivelApoio)}>
                          {getNivelApoioLabel(eleitor.nivelApoio)}
                        </Badge>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Segmento:</span>
                        <span className="text-white ml-2 capitalize">{eleitor.segmento.replace('_', ' ')}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Idade:</span>
                        <span className="text-white ml-2">{eleitor.idade} anos</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Interações:</span>
                        <span className="text-white ml-2">{eleitor.totalInteracoes}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Última:</span>
                        <span className="text-white ml-2">{eleitor.ultimaInteracao}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {eleitor.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'segmentacao' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Segmentação */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Distribuição por Segmento Político</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segmentacao.map((seg, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white">{seg.segmento}</span>
                      <span className="text-slate-400">{seg.total.toLocaleString()} ({seg.percentual}%)</span>
                    </div>
                    <Progress value={seg.percentual} className="h-2" />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Score Médio: {seg.scoreMedio}/100</span>
                      <span>Conversão: {seg.conversao}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Análise de Conversão */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Análise de Conversão por Segmento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {segmentacao.map((seg, index) => (
                  <div key={index} className="p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{seg.segmento}</span>
                      <span className={`text-sm ${
                        seg.conversao >= 70 ? 'text-green-400' :
                        seg.conversao >= 50 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {seg.conversao}% conversão
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      {seg.total.toLocaleString()} eleitores • Score médio: {seg.scoreMedio}/100
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'analise' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Métricas Gerais */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Métricas Gerais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-white">{eleitores.length.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Total de Eleitores</div>
                </div>
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">
                    {Math.round(eleitores.reduce((acc, e) => acc + e.score, 0) / eleitores.length)}
                  </div>
                  <div className="text-sm text-slate-400">Score Médio</div>
                </div>
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">
                    {eleitores.filter(e => e.nivelApoio === 'apoiador_fiel').length}
                  </div>
                  <div className="text-sm text-slate-400">Apoiadores Fiéis</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {eleitores
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 5)
                  .map((eleitor, index) => (
                    <div key={eleitor.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400">#{index + 1}</span>
                        <span className="text-white text-sm">{eleitor.nome}</span>
                      </div>
                      <span className={`text-sm font-bold ${getScoreColor(eleitor.score)}`}>
                        {eleitor.score}
                      </span>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Ações Recomendadas */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Ações Recomendadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-green-400 font-medium text-sm">Focar em Centro</div>
                  <div className="text-xs text-slate-300 mt-1">
                    Maior potencial de conversão (45%) com 2.236 eleitores
                  </div>
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="text-yellow-400 font-medium text-sm">Engajar Indecisos</div>
                  <div className="text-xs text-slate-300 mt-1">
                    1.234 eleitores indecisos com score médio 45
                  </div>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <div className="text-blue-400 font-medium text-sm">Consolidar Apoiadores</div>
                  <div className="text-xs text-slate-300 mt-1">
                    Manter engajamento dos 1.340 apoiadores fiéis
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'campanhas' && (
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white">Campanhas de Engajamento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <h3 className="text-white font-semibold mb-2">Campanha Centro</h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Foco em eleitores de centro para conversão
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Alcance:</span>
                    <span className="text-white">2.236 eleitores</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-green-400">Ativa</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <h3 className="text-white font-semibold mb-2">Campanha Indecisos</h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Engajamento de eleitores indecisos
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Alcance:</span>
                    <span className="text-white">1.234 eleitores</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-yellow-400">Planejando</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600">
                  <h3 className="text-white font-semibold mb-2">Campanha Apoiadores</h3>
                  <p className="text-sm text-slate-400 mb-3">
                    Manutenção de apoiadores fiéis
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Alcance:</span>
                    <span className="text-white">1.340 eleitores</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Status:</span>
                    <span className="text-blue-400">Contínua</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
