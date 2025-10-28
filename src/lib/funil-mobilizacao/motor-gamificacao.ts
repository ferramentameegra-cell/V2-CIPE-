// Motor de Gamificação - Sistema de Pontos, Medalhas e Conquistas

interface Medalha {
  id: string;
  nome: string;
  descricao: string;
  iconeUrl: string;
  criterio: (apoiador: any) => boolean;
}

const MEDALHAS_SISTEMA: Medalha[] = [
  {
    id: 'primeira_missao',
    nome: '🎯 Primeira Missão',
    descricao: 'Completou sua primeira missão',
    iconeUrl: '/medalhas/primeira-missao.png',
    criterio: (apoiador) => apoiador.missoesConcluidas >= 1
  },
  {
    id: 'recrutador',
    nome: '👥 Recrutador',
    descricao: 'Trouxe 5 novos apoiadores',
    iconeUrl: '/medalhas/recrutador.png',
    criterio: (apoiador) => apoiador.convidados >= 5
  },
  {
    id: 'nivel_5',
    nome: '⭐ Estrela da Campanha',
    descricao: 'Alcançou nível 5',
    iconeUrl: '/medalhas/nivel-5.png',
    criterio: (apoiador) => apoiador.nivel >= 5
  },
  {
    id: 'sequencia_7',
    nome: '🔥 Engajamento Diário',
    descricao: '7 dias seguidos de atividade',
    iconeUrl: '/medalhas/sequencia.png',
    criterio: (apoiador) => apoiador.sequenciaDias >= 7
  }
];

/**
 * Verifica quais medalhas o apoiador conquistou
 */
export function verificarMedalhas(apoiador: any): string[] {
  return MEDALHAS_SISTEMA
    .filter(medalha => medalha.criterio(apoiador))
    .map(medalha => medalha.id);
}

/**
 * Calcula pontos de experiência (XP) para próximo nível
 */
export function calcularXPParaProximoNivel(nivel: number, pontosAtuais: number): {
  xpAtual: number;
  xpNecessario: number;
  porcentagem: number;
} {
  const pontosNivelAtual = calcularPontosNivel(nivel);
  const pontosProximoNivel = calcularPontosNivel(nivel + 1);

  const xpAtual = pontosAtuais - pontosNivelAtual;
  const xpNecessario = pontosProximoNivel - pontosNivelAtual;
  const porcentagem = (xpAtual / xpNecessario) * 100;

  return { xpAtual, xpNecessario, porcentagem };
}

function calcularPontosNivel(nivel: number): number {
  if (nivel === 1) return 0;
  if (nivel === 2) return 100;
  if (nivel === 3) return 300;
  if (nivel === 4) return 600;
  if (nivel === 5) return 1000;
  return 1000 + (nivel - 5) * 500;
}

/**
 * Gera ranking de apoiadores
 */
export function gerarRanking(
  apoiadores: Array<{ id: string; nome: string; pontos: number; nivel: number }>,
  periodo: 'semanal' | 'mensal' | 'geral' = 'geral'
): Array<{ posicao: number; apoiador: any; pontos: number }> {
  return apoiadores
    .sort((a, b) => b.pontos - a.pontos)
    .map((apoiador, index) => ({
      posicao: index + 1,
      apoiador,
      pontos: apoiador.pontos
    }));
}

/**
 * Calcula bonificação por sequência de dias
 */
export function calcularBonusSequencia(diasSeguidos: number): number {
  if (diasSeguidos >= 30) return 100;
  if (diasSeguidos >= 14) return 50;
  if (diasSeguidos >= 7) return 20;
  return 0;
}


