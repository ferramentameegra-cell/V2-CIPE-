// Biblioteca de Análise de Sentimento e IA para Radar de Crises

interface AnaliseMencao {
  sentimento: number; // -1 a 1
  eFakeNews: boolean;
  eAtaqueCoordenado: boolean;
  topicos: string[];
  indiceImpacto: number; // 0-100
  potencialViral: number; // 0-1
}

/**
 * Analisa o sentimento de um texto usando IA
 * Em produção, usar OpenAI, Anthropic ou modelo local
 */
export async function analisarSentimento(texto: string): Promise<number> {
  // Simulação: análise de palavras-chave negativas/positivas
  const palavrasNegativas = ['corrupto', 'mentira', 'escândalo', 'fraude', 'incompetente'];
  const palavrasPositivas = ['honesto', 'competente', 'transparente', 'eficiente'];
  
  let score = 0;
  const textoLower = texto.toLowerCase();
  
  palavrasNegativas.forEach(palavra => {
    if (textoLower.includes(palavra)) score -= 0.2;
  });
  
  palavrasPositivas.forEach(palavra => {
    if (textoLower.includes(palavra)) score += 0.2;
  });
  
  return Math.max(-1, Math.min(1, score));
}

/**
 * Detecta se um texto é potencialmente fake news
 */
export function detectarFakeNews(texto: string, autor: string): boolean {
  // Simulação: verificar padrões suspeitos
  const padroesSuspeitos = [
    /URGENTE:/i,
    /COMPARTILHE ANTES QUE APAGUEM/i,
    /A MÍDIA NÃO MOSTRA/i,
    /DESCOBRI A VERDADE/i
  ];
  
  return padroesSuspeitos.some(padrao => padrao.test(texto));
}

/**
 * Detecta se há indícios de ataque coordenado
 */
export function detectarAtaqueCoordenado(
  mencoes: Array<{ autor: string; timestamp: Date; conteudo: string }>
): boolean {
  // Verificar se múltiplas menções similares em curto período
  if (mencoes.length < 5) return false;
  
  // Verificar timestamps próximos (dentro de 1 hora)
  const primeiraTimestamp = mencoes[0].timestamp.getTime();
  const mencoesProximas = mencoes.filter(m => 
    Math.abs(m.timestamp.getTime() - primeiraTimestamp) < 60 * 60 * 1000
  );
  
  if (mencoesProximas.length < 5) return false;
  
  // Verificar similaridade de conteúdo (simplificado)
  const primeiroConteudo = mencoes[0].conteudo.toLowerCase();
  const similares = mencoes.filter(m => {
    const similaridade = calcularSimilaridade(primeiroConteudo, m.conteudo.toLowerCase());
    return similaridade > 0.7;
  });
  
  return similares.length >= 5;
}

/**
 * Calcula similaridade entre dois textos (Jaccard simplificado)
 */
function calcularSimilaridade(texto1: string, texto2: string): number {
  const palavras1 = new Set(texto1.split(/\s+/));
  const palavras2 = new Set(texto2.split(/\s+/));
  
  const intersecao = new Set([...palavras1].filter(p => palavras2.has(p)));
  const uniao = new Set([...palavras1, ...palavras2]);
  
  return intersecao.size / uniao.size;
}

/**
 * Calcula o índice de impacto de uma menção
 */
export function calcularIndiceImpacto(
  alcance: number,
  engajamento: number,
  sentimento: number,
  autorInfluente: boolean
): number {
  let impacto = 0;
  
  // Alcance (0-40 pontos)
  impacto += Math.min(40, (alcance / 100000) * 40);
  
  // Engajamento (0-30 pontos)
  impacto += Math.min(30, (engajamento / 10000) * 30);
  
  // Sentimento negativo (0-20 pontos)
  if (sentimento < 0) {
    impacto += Math.abs(sentimento) * 20;
  }
  
  // Autor influente (0-10 pontos)
  if (autorInfluente) {
    impacto += 10;
  }
  
  return Math.min(100, Math.round(impacto));
}

/**
 * Calcula o potencial viral de uma menção
 */
export function calcularPotencialViral(
  engajamento: number,
  alcance: number,
  tempoDecorrido: number // em minutos
): number {
  if (tempoDecorrido === 0) return 0;
  
  // Taxa de engajamento por minuto
  const taxaEngajamento = engajamento / tempoDecorrido;
  
  // Normalizar para 0-1
  const potencial = Math.min(1, taxaEngajamento / 100);
  
  return potencial;
}

/**
 * Extrai tópicos principais de um texto
 */
export function extrairTopicos(texto: string): string[] {
  // Simulação: palavras-chave comuns em política
  const topicosComuns = [
    'corrupção', 'saúde', 'educação', 'segurança', 'economia',
    'impostos', 'emprego', 'meio ambiente', 'transporte'
  ];
  
  const textoLower = texto.toLowerCase();
  return topicosComuns.filter(topico => textoLower.includes(topico));
}

/**
 * Análise completa de uma menção
 */
export async function analisarMencaoCompleta(
  texto: string,
  autor: string,
  alcance: number,
  engajamento: number,
  timestamp: Date
): Promise<AnaliseMencao> {
  const sentimento = await analisarSentimento(texto);
  const eFakeNews = detectarFakeNews(texto, autor);
  const topicos = extrairTopicos(texto);
  
  const tempoDecorrido = (Date.now() - timestamp.getTime()) / (1000 * 60);
  const potencialViral = calcularPotencialViral(engajamento, alcance, tempoDecorrido);
  
  const indiceImpacto = calcularIndiceImpacto(
    alcance,
    engajamento,
    sentimento,
    alcance > 50000 // Considerar influente se tem mais de 50k alcance
  );
  
  return {
    sentimento,
    eFakeNews,
    eAtaqueCoordenado: false, // Precisa de múltiplas menções
    topicos,
    indiceImpacto,
    potencialViral
  };
}

/**
 * Calcula o nível de ameaça global baseado em alertas ativos
 */
export function calcularNivelAmeacaGlobal(
  alertas: Array<{ nivelAmeaca: string; status: string; indiceImpacto: number }>
): 'BAIXO' | 'MEDIO' | 'ALTO' | 'CRITICO' {
  const alertasAtivos = alertas.filter(a => 
    a.status === 'MONITORANDO' || a.status === 'EM_RESPOSTA'
  );
  
  if (alertasAtivos.length === 0) return 'BAIXO';
  
  const alertasCriticos = alertasAtivos.filter(a => a.nivelAmeaca === 'CRITICO');
  if (alertasCriticos.length > 0) return 'CRITICO';
  
  const alertasAltos = alertasAtivos.filter(a => a.nivelAmeaca === 'ALTO');
  if (alertasAltos.length >= 2) return 'CRITICO';
  if (alertasAltos.length >= 1) return 'ALTO';
  
  const impactoMedio = alertasAtivos.reduce((acc, a) => acc + a.indiceImpacto, 0) / alertasAtivos.length;
  
  if (impactoMedio > 70) return 'ALTO';
  if (impactoMedio > 40) return 'MEDIO';
  return 'BAIXO';
}

