// Motor do Funil de Mobilização - Lógica de Progressão

type Estagio = 'VISITANTE' | 'LEAD' | 'ENGAJADO' | 'APOIADOR' | 'MULTIPLICADOR';

interface Interacao {
  tipo: 'visualizacao' | 'cadastro' | 'like' | 'compartilhamento' | 'missao_completa' | 'recrutamento';
  valor: number;
  timestamp: Date;
}

interface ApoiadorDados {
  estagio: Estagio;
  pontos: number;
  taxaEngajamento: number;
  interacoes: Interacao[];
}

/**
 * Processa uma interação e determina se o apoiador progride no funil
 */
export function processarInteracao(
  apoiador: ApoiadorDados,
  interacao: Interacao
): { novoEstagio: Estagio; pontos: number; progrediu: boolean } {
  let novoEstagio = apoiador.estagio;
  let pontos = apoiador.pontos;
  let progrediu = false;

  // Adicionar pontos baseado no tipo de interação
  const pontosGanhos = calcularPontos(interacao.tipo);
  pontos += pontosGanhos;

  // Verificar progressão de estágio
  const estagioAtual = obterIndiceEstagio(apoiador.estagio);
  const proximoEstagio = obterEstagioProximo(apoiador.estagio);

  if (proximoEstagio && verificarCriteriosProgressao(apoiador, interacao)) {
    novoEstagio = proximoEstagio;
    progrediu = true;
  }

  return { novoEstagio, pontos, progrediu };
}

/**
 * Calcula pontos ganhos por tipo de interação
 */
function calcularPontos(tipo: string): number {
  const tabelaPontos: Record<string, number> = {
    visualizacao: 1,
    cadastro: 10,
    like: 2,
    compartilhamento: 5,
    missao_completa: 20,
    recrutamento: 50
  };
  return tabelaPontos[tipo] || 0;
}

/**
 * Verifica se o apoiador atende os critérios para progredir
 */
function verificarCriteriosProgressao(apoiador: ApoiadorDados, interacao: Interacao): boolean {
  const interacoesRecentes = apoiador.interacoes.filter(i =>
    (Date.now() - i.timestamp.getTime()) < 7 * 24 * 60 * 60 * 1000 // últimos 7 dias
  );

  switch (apoiador.estagio) {
    case 'VISITANTE':
      // Para virar LEAD: precisa fornecer contato (cadastro)
      return interacao.tipo === 'cadastro';

    case 'LEAD':
      // Para virar ENGAJADO: pelo menos 3 interações nos últimos 7 dias
      return interacoesRecentes.length >= 3;

    case 'ENGAJADO':
      // Para virar APOIADOR: completou pelo menos 1 missão
      return apoiador.interacoes.some(i => i.tipo === 'missao_completa');

    case 'APOIADOR':
      // Para virar MULTIPLICADOR: recrutou pelo menos 3 pessoas
      const recrutamentos = apoiador.interacoes.filter(i => i.tipo === 'recrutamento');
      return recrutamentos.length >= 3;

    default:
      return false;
  }
}

function obterIndiceEstagio(estagio: Estagio): number {
  const estagios: Estagio[] = ['VISITANTE', 'LEAD', 'ENGAJADO', 'APOIADOR', 'MULTIPLICADOR'];
  return estagios.indexOf(estagio);
}

function obterEstagioProximo(estagio: Estagio): Estagio | null {
  const estagios: Estagio[] = ['VISITANTE', 'LEAD', 'ENGAJADO', 'APOIADOR', 'MULTIPLICADOR'];
  const indiceAtual = estagios.indexOf(estagio);
  return indiceAtual < estagios.length - 1 ? estagios[indiceAtual + 1] : null;
}

/**
 * Calcula a taxa de conversão entre dois estágios
 */
export function calcularTaxaConversao(
  totalEstagioOrigem: number,
  totalEstagioDestino: number
): number {
  if (totalEstagioOrigem === 0) return 0;
  return (totalEstagioDestino / totalEstagioOrigem) * 100;
}

/**
 * Calcula o nível do apoiador baseado em pontos
 */
export function calcularNivel(pontos: number): number {
  // Progressão exponencial: nível 1 = 0-100 pts, nível 2 = 100-300, nível 3 = 300-600, etc.
  if (pontos < 100) return 1;
  if (pontos < 300) return 2;
  if (pontos < 600) return 3;
  if (pontos < 1000) return 4;
  if (pontos < 1500) return 5;
  return Math.floor(5 + (pontos - 1500) / 500);
}

/**
 * Calcula pontos necessários para próximo nível
 */
export function pontosProximoNivel(nivel: number): number {
  if (nivel === 1) return 100;
  if (nivel === 2) return 300;
  if (nivel === 3) return 600;
  if (nivel === 4) return 1000;
  if (nivel === 5) return 1500;
  return 1500 + (nivel - 5) * 500;
}

