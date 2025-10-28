/**
 * Análise de Consistência de Mensagem
 * Compara discursos/respostas com o Banco de Argumentos oficial
 */

export interface ResultadoConsistencia {
  scoreConsistencia: number; // 0-100
  desvios: Array<{
    trecho: string;
    argumentoOficial: string;
    gravidade: 'baixa' | 'media' | 'alta';
  }>;
  pontosCoerentess: string[];
  recomendacoes: string[];
}

/**
 * Compara um texto com argumentos oficiais do banco ADI
 */
export function analisarConsistencia(
  textoDiscurso: string,
  argumentosOficiais: Array<{ tema: string; resposta: string }>
): ResultadoConsistencia {
  // Em produção: usar embeddings semânticos (OpenAI, Cohere)
  // e calcular similaridade cosseno
  
  const desvios: Array<{
    trecho: string;
    argumentoOficial: string;
    gravidade: 'baixa' | 'media' | 'alta';
  }> = [];
  const pontosCoerentess: string[] = [];
  
  // Simulação de análise
  const temas = ['educação', 'saúde', 'segurança', 'economia'];
  const temaNaoAbordado = temas.find(t => !textoDiscurso.toLowerCase().includes(t));
  
  if (temaNaoAbordado && argumentosOficiais.some(a => a.tema === temaNaoAbordado)) {
    desvios.push({
      trecho: `Tema "${temaNaoAbordado}" mencionado`,
      argumentoOficial: argumentosOficiais.find(a => a.tema === temaNaoAbordado)?.resposta || '',
      gravidade: 'media' as const
    });
  }

  // Detecta palavras-chave presentes
  argumentosOficiais.forEach(arg => {
    const palavrasChave = arg.resposta.split(' ').filter(p => p.length > 5).slice(0, 3);
    const encontradas = palavrasChave.filter(pc => 
      textoDiscurso.toLowerCase().includes(pc.toLowerCase())
    );
    
    if (encontradas.length > 0) {
      pontosCoerentess.push(`Alinhamento detectado no tema "${arg.tema}"`);
    }
  });

  const score = Math.max(0, 100 - (desvios.length * 15) + (pontosCoerentess.length * 5));

  return {
    scoreConsistencia: Math.min(100, score),
    desvios,
    pontosCoerentess,
    recomendacoes: [
      'Reforçar uso de argumentos do Banco ADI',
      'Revisar trechos identificados como desvios',
      'Praticar respostas para temas fracos'
    ]
  };
}

/**
 * Calcula similaridade semântica entre dois textos (versão simplificada)
 */
export function calcularSimilaridade(texto1: string, texto2: string): number {
  // Versão simplificada: conta palavras em comum
  // Em produção: usar embeddings
  const palavras1 = texto1.toLowerCase().split(/\s+/);
  const palavras2 = texto2.toLowerCase().split(/\s+/);
  
  const set1 = new Set(palavras1);
  const set2 = new Set(palavras2);
  
  const intersecao = palavras1.filter(x => set2.has(x));
  const uniao = Array.from(new Set([...palavras1, ...palavras2]));
  
  return (intersecao.length / uniao.length) * 100;
}
