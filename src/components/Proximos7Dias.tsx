'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, Clock, MapPin, Users, Camera, 
  TrendingUp, AlertTriangle, CheckCircle, Plus
} from 'lucide-react';

interface EventoAgenda {
  id: string;
  titulo: string;
  tipo: 'evento' | 'conteudo' | 'pesquisa' | 'midia' | 'reuniao';
  data: Date;
  horario: string;
  local?: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'critica';
  status: 'agendado' | 'confirmado' | 'em_andamento' | 'concluido' | 'cancelado';
  participantes?: number;
  potencialImpacto: number; // 1-100
  preparacao?: string[];
  responsavel: string;
}

export default function Proximos7Dias() {
  const [eventos, setEventos] = useState<EventoAgenda[]>([
    {
      id: '1',
      titulo: 'Debate na TV Local',
      tipo: 'midia',
      data: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      horario: '20:00',
      local: 'Estúdios TV Cidade',
      descricao: 'Debate com os 3 principais candidatos sobre propostas para a cidade',
      prioridade: 'critica',
      status: 'confirmado',
      potencialImpacto: 95,
      preparacao: [
        'Revisar propostas principais',
        'Preparar dados de realizações',
        'Estudar pontos fracos dos adversários'
      ],
      responsavel: 'Equipe de Comunicação'
    },
    {
      id: '2',
      titulo: 'Evento na Zona Norte',
      tipo: 'evento',
      data: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      horario: '19:00',
      local: 'Praça Central - Zona Norte',
      descricao: 'Encontro com moradores para apresentar propostas de mobilidade urbana',
      prioridade: 'alta',
      status: 'agendado',
      participantes: 500,
      potencialImpacto: 78,
      preparacao: [
        'Confirmar som e estrutura',
        'Mobilizar embaixadores locais',
        'Preparar material gráfico'
      ],
      responsavel: 'Coordenação Regional'
    },
    {
      id: '3',
      titulo: 'Publicação: Série Educação Digital',
      tipo: 'conteudo',
      data: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      horario: '14:00',
      descricao: 'Primeira parte da série sobre inclusão digital nas escolas',
      prioridade: 'alta',
      status: 'confirmado',
      potencialImpacto: 82,
      preparacao: [
        'Finalizar edição do vídeo',
        'Preparar legendas',
        'Agendar impulsionamento'
      ],
      responsavel: 'Equipe Digital'
    },
    {
      id: '4',
      titulo: 'Pesquisa Datafolha',
      tipo: 'pesquisa',
      data: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      horario: '16:00',
      descricao: 'Divulgação da nova pesquisa de intenção de voto',
      prioridade: 'critica',
      status: 'agendado',
      potencialImpacto: 90,
      preparacao: [
        'Preparar nota de imprensa',
        'Estratégia de comunicação',
        'Monitorar repercussão'
      ],
      responsavel: 'Assessoria de Imprensa'
    },
    {
      id: '5',
      titulo: 'Reunião com Empresários',
      tipo: 'reuniao',
      data: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      horario: '10:00',
      local: 'Federação das Indústrias',
      descricao: 'Apresentação do plano econômico para lideranças empresariais',
      prioridade: 'alta',
      status: 'confirmado',
      participantes: 50,
      potencialImpacto: 75,
      preparacao: [
        'Revisar plano econômico',
        'Preparar apresentação',
        'Confirmar participantes'
      ],
      responsavel: 'Coordenação Econômica'
    },
    {
      id: '6',
      titulo: 'Live Instagram: Perguntas dos Seguidores',
      tipo: 'conteudo',
      data: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      horario: '20:00',
      descricao: 'Live interativa respondendo perguntas dos seguidores',
      prioridade: 'media',
      status: 'agendado',
      potencialImpacto: 65,
      preparacao: [
        'Coletar perguntas principais',
        'Preparar respostas',
        'Divulgar antecipadamente'
      ],
      responsavel: 'Equipe Digital'
    }
  ]);

  const getTipoIcon = (tipo: EventoAgenda['tipo']) => {
    switch (tipo) {
      case 'evento': return Users;
      case 'conteudo': return Camera;
      case 'pesquisa': return TrendingUp;
      case 'midia': return Camera;
      case 'reuniao': return Users;
    }
  };

  const getTipoColor = (tipo: EventoAgenda['tipo']) => {
    switch (tipo) {
      case 'evento': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'conteudo': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'pesquisa': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'midia': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'reuniao': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
    }
  };

  const getPrioridadeColor = (prioridade: EventoAgenda['prioridade']) => {
    switch (prioridade) {
      case 'baixa': return 'bg-gray-500/20 text-gray-300';
      case 'media': return 'bg-yellow-500/20 text-yellow-300';
      case 'alta': return 'bg-orange-500/20 text-orange-300';
      case 'critica': return 'bg-red-500/20 text-red-300';
    }
  };

  const getStatusIcon = (status: EventoAgenda['status']) => {
    switch (status) {
      case 'agendado': return Clock;
      case 'confirmado': return CheckCircle;
      case 'em_andamento': return AlertTriangle;
      case 'concluido': return CheckCircle;
      case 'cancelado': return AlertTriangle;
    }
  };

  const getDiaSemana = (data: Date) => {
    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return dias[data.getDay()];
  };

  const eventosOrdenados = eventos.sort((a, b) => a.data.getTime() - b.data.getTime());
  const eventosCriticos = eventos.filter(e => e.prioridade === 'critica').length;
  const eventosHoje = eventos.filter(e => 
    e.data.toDateString() === new Date().toDateString()
  ).length;

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-blue-400" />
            <div>
              <CardTitle className="text-lg font-semibold text-white">Próximos 7 Dias</CardTitle>
              <p className="text-sm text-slate-400">
                {eventos.length} eventos • {eventosCriticos} críticos • {eventosHoje} hoje
              </p>
            </div>
          </div>
          
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-1" />
            Novo Evento
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {eventosOrdenados.map((evento, index) => {
            const TipoIcon = getTipoIcon(evento.tipo);
            const StatusIcon = getStatusIcon(evento.status);
            const isHoje = evento.data.toDateString() === new Date().toDateString();
            const isAmanha = evento.data.toDateString() === new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
            
            return (
              <motion.div
                key={evento.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all ${
                  isHoje 
                    ? 'bg-blue-500/10 border-blue-500/30' 
                    : isAmanha
                    ? 'bg-orange-500/10 border-orange-500/30'
                    : 'bg-slate-800/30 border-slate-700/50'
                } hover:bg-slate-800/50`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Data */}
                    <div className="text-center min-w-[60px]">
                      <div className={`text-2xl font-bold ${
                        isHoje ? 'text-blue-400' : isAmanha ? 'text-orange-400' : 'text-white'
                      }`}>
                        {evento.data.getDate()}
                      </div>
                      <div className="text-xs text-slate-400">
                        {getDiaSemana(evento.data)}
                      </div>
                      <div className="text-xs text-slate-500">
                        {evento.horario}
                      </div>
                    </div>
                    
                    {/* Conteúdo */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <TipoIcon className="w-4 h-4 text-slate-400" />
                        <Badge className={getTipoColor(evento.tipo)}>
                          {evento.tipo.toUpperCase()}
                        </Badge>
                        <Badge className={getPrioridadeColor(evento.prioridade)}>
                          {evento.prioridade.toUpperCase()}
                        </Badge>
                        {isHoje && (
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                            HOJE
                          </Badge>
                        )}
                        {isAmanha && (
                          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                            AMANHÃ
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-base font-semibold text-white mb-1">{evento.titulo}</h3>
                      <p className="text-sm text-slate-400 mb-2">{evento.descricao}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-slate-500 mb-3">
                        {evento.local && (
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {evento.local}
                          </span>
                        )}
                        {evento.participantes && (
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {evento.participantes} pessoas
                          </span>
                        )}
                        <span>👤 {evento.responsavel}</span>
                      </div>
                      
                      {/* Preparação */}
                      {evento.preparacao && evento.preparacao.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs font-medium text-slate-300 mb-1">📋 Preparação:</p>
                          <ul className="text-xs text-slate-400 space-y-1">
                            {evento.preparacao.map((item, i) => (
                              <li key={i} className="flex items-center">
                                <div className="w-1 h-1 bg-slate-500 rounded-full mr-2"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Status e Impacto */}
                  <div className="text-right ml-4">
                    <div className="flex items-center space-x-1 mb-2">
                      <StatusIcon className={`w-4 h-4 ${
                        evento.status === 'confirmado' ? 'text-green-400' :
                        evento.status === 'agendado' ? 'text-yellow-400' :
                        evento.status === 'em_andamento' ? 'text-blue-400' :
                        evento.status === 'concluido' ? 'text-green-400' : 'text-red-400'
                      }`} />
                      <span className="text-xs text-slate-400 capitalize">
                        {evento.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <div className="text-lg font-bold text-purple-400">
                      {evento.potencialImpacto}%
                    </div>
                    <div className="text-xs text-slate-400">impacto</div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Resumo da Semana */}
        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <h4 className="text-sm font-medium text-white mb-3">📊 Resumo da Semana</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-400">{eventos.length}</div>
              <div className="text-xs text-slate-400">Total de Eventos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-red-400">{eventosCriticos}</div>
              <div className="text-xs text-slate-400">Críticos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">
                {eventos.filter(e => e.tipo === 'evento').length}
              </div>
              <div className="text-xs text-slate-400">Eventos Públicos</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-400">
                {Math.round(eventos.reduce((sum, e) => sum + e.potencialImpacto, 0) / eventos.length)}%
              </div>
              <div className="text-xs text-slate-400">Impacto Médio</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
