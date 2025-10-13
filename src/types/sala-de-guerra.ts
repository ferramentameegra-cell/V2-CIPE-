// TIPOS TYPESCRIPT - SALA DE GUERRA

export type TipoEvento = 
  | 'CRISE_IMAGEM'
  | 'CRISE_FINANCEIRA'
  | 'CRISE_JURIDICA'
  | 'CRISE_PESSOAL'
  | 'OPORTUNIDADE_MIDIA'
  | 'OPORTUNIDADE_POLITICA'
  | 'OPORTUNIDADE_SOCIAL'
  | 'TRENDING_TOPIC'
  | 'ATAQUE_ADVERSARIO'
  | 'FAKE_NEWS';

export type Severidade = 'BAIXA' | 'MEDIA' | 'ALTA' | 'CRITICA' | 'EMERGENCIA';

export type StatusEvento = 'DETECTADO' | 'EM_ANALISE' | 'EM_RESPOSTA' | 'MONITORANDO' | 'RESOLVIDO' | 'ARQUIVADO';

export type StatusAcao = 'PLANEJADA' | 'EM_EXECUCAO' | 'PAUSADA' | 'CONCLUIDA' | 'CANCELADA';

export type Prioridade = 'BAIXA' | 'MEDIA' | 'ALTA' | 'URGENTE' | 'CRITICA';

export type StatusMembro = 'DISPONIVEL' | 'OCUPADO' | 'AUSENTE' | 'OFFLINE';

export type PapelEquipe = 
  | 'COORDENADOR_GERAL'
  | 'ANALISTA_CRISES'
  | 'ESPECIALISTA_DIGITAL'
  | 'COMUNICADOR'
  | 'MONITOR_TEMPO_REAL'
  | 'EXECUTOR_ACOES';

export interface EventoCritico {
  id: string;
  candidatoId: string;
  titulo: string;
  descricao: string;
  tipo: TipoEvento;
  severidade: Severidade;
  status: StatusEvento;
  urgencia: number;
  impactoEstimado: number;
  probabilidadeEscalada: number;
  custoInacao?: number;
  demografiaAfetada?: string;
  fontesDeteccao: string[];
  palavrasChave: string[];
  regioesAfetadas: string[];
  canalOrigem: string;
  sentimentoPublico?: number;
  alcanceEstimado?: number;
  janelaOportunidade?: Date;
  prazoResposta?: Date;
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface AcaoRapida {
  id: string;
  eventoId: string;
  titulo: string;
  descricao: string;
  tipo: string;
  prioridade: Prioridade;
  status: StatusAcao;
  recursosNecessarios: string[];
  orcamentoEstimado?: number;
  tempoExecucao?: number;
  responsavelId?: string;
  equipeAtribuida: string[];
  templateId?: string;
  canaisExecucao: string[];
  metricasAlvo?: string;
  resultadosEsperados?: string;
  impactoMedido?: number;
  custoReal?: number;
  tempoRealExecucao?: number;
  observacoes?: string;
  iniciadaEm?: Date;
  concluidaEm?: Date;
  criadaEm: Date;
}

export interface MembroEquipe {
  id: string;
  usuarioId: string;
  nome: string;
  email: string;
  telefone?: string;
  papel: PapelEquipe;
  especialidades: string[];
  status: StatusMembro;
  disponibilidade?: {
    segunda: string[];
    terca: string[];
    quarta: string[];
    quinta: string[];
    sexta: string[];
    sabado: string[];
    domingo: string[];
  };
  cargaTrabalho: number;
  eventosAtivos: number;
  tempoMedioResposta?: number;
  avaliacaoPerformance?: number;
  ultimaAtividade?: Date;
  criadoEm: Date;
}

export interface Mencao {
  id: string;
  canal: string;
  autor: string;
  conteudo: string;
  sentimento: number;
  alcance: number;
  engajamento: number;
  timestamp: Date;
  palavrasChave: string[];
  url: string;
  tipo: 'post' | 'comentario' | 'noticia' | 'video';
  verificado: boolean;
}

export interface Oportunidade {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'trending_topic' | 'lacuna_adversario' | 'momento_favoravel' | 'evento_publico';
  potencialImpacto: number;
  janelaOportunidade: number;
  compatibilidade: number;
  recursosNecessarios: string[];
  canaisRecomendados: string[];
  alcanceEstimado: number;
  custoEstimado: number;
  probabilidadeSucesso: number;
  palavrasChave: string[];
  evidencias: string[];
  criadaEm: Date;
  status: 'detectada' | 'analisando' | 'aprovada' | 'em_execucao' | 'perdida';
}

export interface TemplateAcao {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  tiposEvento: string[];
  severidadeMinima: string;
  conteudo: {
    titulo: string;
    mensagem: string;
    canais: string[];
    recursos: string[];
    tempo: number;
    custo: number;
  };
  vezesUtilizado: number;
  taxaSucesso: number;
  criadoEm: Date;
}

export interface EventoHistorico {
  id: string;
  tipo: 'crise' | 'oportunidade' | 'acao' | 'atualizacao';
  titulo: string;
  descricao: string;
  severidade?: string;
  status: string;
  responsavel: string;
  impacto?: number;
  custoReal?: number;
  tempoExecucao?: number;
  resultados?: string;
  timestamp: Date;
  tags: string[];
}

