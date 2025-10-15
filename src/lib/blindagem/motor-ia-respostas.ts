/**
 * Motor de IA para Simulação de Entrevistas e Debates
 * Gera perguntas e contra-argumentos realistas baseados no perfil do oponente
 */

export type PerfilOponenteIA = 'agressivo' | 'tecnico' | 'incisivo' | 'amigavel' | 'neutro';

export interface ConfiguracaoSimulacao {
  tipo: 'ENTREVISTA' | 'DEBATE' | 'COLETIVA_IMPRENSA';
  perfil: PerfilOponenteIA;
  temas: string[];
  vulnerabilidades?: string[];
}

export interface InteracaoIA {
  pergunta: string;
  contexto: string;
  intensidade: number; // 1-10
  tempoEsperado: number; // segundos
}

/**
 * Gera a próxima pergunta da IA baseada no contexto da conversa
 */
export async function gerarPerguntaIA(
  config: ConfiguracaoSimulacao,
  historico: { pergunta: string; resposta: string }[],
  respostaAnterior?: string
): Promise<InteracaoIA> {
  // Em produção, isso faria uma chamada para GPT-4/Claude
  // Aqui, simulamos com lógica inteligente
  
  const tema = config.temas[Math.floor(Math.random() * config.temas.length)];
  
  const perguntas = {
    agressivo: [
      `Como o senhor explica as contradições em suas declarações sobre ${tema}?`,
      `Essa resposta é evasiva. O eleitor merece uma resposta direta sobre ${tema}.`,
      `Os números que o senhor apresenta sobre ${tema} não batem com a realidade. Como explica isso?`
    ],
    tecnico: [
      `Pode detalhar tecnicamente como sua proposta de ${tema} seria implementada?`,
      `Quais são os indicadores quantitativos que embasam sua posição sobre ${tema}?`,
      `Do ponto de vista orçamentário, como viabiliza a proposta de ${tema}?`
    ],
    incisivo: [
      `Vamos direto ao ponto: ${tema} sim ou não?`,
      `Em 30 segundos, qual sua solução para ${tema}?`,
      `O eleitor quer saber: o que mudaria em ${tema} no primeiro dia de governo?`
    ],
    amigavel: [
      `Gostaria que nos contasse um pouco mais sobre sua visão para ${tema}.`,
      `É uma proposta interessante. Como chegou a essa ideia sobre ${tema}?`,
      `Pode compartilhar conosco os detalhes do plano para ${tema}?`
    ],
    neutro: [
      `Qual sua posição sobre ${tema}?`,
      `Como pretende abordar a questão de ${tema}?`,
      `O que pensa sobre ${tema}?`
    ]
  };

  const perguntaSelecionada = perguntas[config.perfil][
    Math.floor(Math.random() * perguntas[config.perfil].length)
  ];

  return {
    pergunta: perguntaSelecionada,
    contexto: `Pergunta sobre ${tema} - Perfil ${config.perfil}`,
    intensidade: config.perfil === 'agressivo' ? 8 : config.perfil === 'tecnico' ? 7 : 5,
    tempoEsperado: config.perfil === 'incisivo' ? 30 : 120
  };
}

/**
 * Analisa a resposta do candidato e fornece feedback
 */
export function analisarResposta(resposta: string, argumentoOficial?: string): {
  consistente: boolean;
  score: number;
  feedback: string;
} {
  const palavrasMuleta = ['né', 'então', 'tipo', 'uhm', 'ah', 'eh'];
  const contadorMuletas = palavrasMuleta.reduce(
    (acc, palavra) => acc + (resposta.toLowerCase().match(new RegExp(palavra, 'g'))?.length || 0),
    0
  );

  const tamanho = resposta.split(' ').length;
  const score = Math.max(0, 100 - (contadorMuletas * 5) - (tamanho < 20 ? 30 : 0));

  return {
    consistente: argumentoOficial ? resposta.toLowerCase().includes(argumentoOficial.toLowerCase().substring(0, 50)) : true,
    score,
    feedback: contadorMuletas > 5 ? 'Evite palavras-muleta' : 'Boa resposta'
  };
}
