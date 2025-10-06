import { NextRequest, NextResponse } from 'next/server';

// Simulação de respostas do Oracle CIPE baseadas no contexto
const ORACLE_RESPONSES = {
  dashboard: {
    'Como estão as métricas gerais da campanha?': {
      response: 'As métricas gerais mostram um crescimento consistente de 15% na intenção de voto nas últimas 4 semanas. O engajamento digital aumentou 23% e o alcance orgânico cresceu 18%. Principais destaques: Instagram com +35% de interações, WhatsApp com +28% de conversas e eventos presenciais com 89% de ocupação média.',
      confidence: 0.92,
      sources: ['Instagram Analytics', 'WhatsApp Business', 'Event Management System']
    },
    'Qual o resumo do desempenho hoje?': {
      response: 'Hoje foi um dia excepcional! Intenção de voto subiu 2.3%, alcançamos 45.2K novos seguidores, 1.2K interações no Instagram e 340 conversas no WhatsApp. O evento em Porto Alegre teve 89% de ocupação. Recomendo focar em replicar a estratégia de conteúdo que gerou +180% de engajamento.',
      confidence: 0.88,
      sources: ['Real-time Analytics', 'Social Media APIs', 'Event Tracking']
    },
    'Preciso de insights sobre tendências': {
      response: 'Análise de tendências revela 3 oportunidades principais: 1) Conteúdo sobre "empreendedorismo" tem +340% de engajamento, 2) Lives às 19h-20h geram 67% mais interações, 3) Hashtag #FuturoDoRS está viralizando. Risco identificado: concorrentes aumentaram investimento em mídia paga em 45%.',
      confidence: 0.95,
      sources: ['Trend Analysis', 'Social Listening', 'Competitor Intelligence']
    }
  },
  sala_guerra: {
    'Há alguma crise emergente?': {
      response: '🚨 ALERTA: Detectada possível crise emergente. Post de opositor sobre "falta de transparência" ganhando tração (2.3K compartilhamentos em 2h). Sentimento negativo aumentou 15% nas últimas 3 horas. Recomendo resposta imediata com dados transparentes e vídeo explicativo.',
      confidence: 0.89,
      sources: ['Social Media Monitoring', 'Sentiment Analysis', 'Crisis Detection AI']
    },
    'Como está o sentimento nas redes?': {
      response: 'Sentimento geral: 67% positivo, 23% neutro, 10% negativo. Melhoria de 8% vs ontem. Principais temas positivos: "transparência" (+45%), "propostas concretas" (+32%). Pontos de atenção: "impostos" (-12% sentimento), "corrupção" (-8%). Recomendo reforçar narrativa sobre combate à corrupção.',
      confidence: 0.91,
      sources: ['Sentiment Analysis Engine', 'Social Media APIs', 'NLP Processing']
    },
    'Preciso de um relatório de monitoramento': {
      response: '📊 RELATÓRIO DE MONITORAMENTO - Últimas 24h:\n• Menções: 2.847 (+18% vs ontem)\n• Alcance: 156.2K pessoas\n• Engajamento: 8.4K interações\n• Crises detectadas: 1 (baixa severidade)\n• Oportunidades: 3 (alta prioridade)\n• Recomendação: Aumentar frequência de posts sobre "educação" (tendência crescente)',
      confidence: 0.94,
      sources: ['Monitoring Dashboard', 'AI Analysis', 'Real-time Data']
    }
  },
  waze_eleitoral: {
    'Qual a melhor rota para vitória?': {
      response: '🗺️ ROTA ESTRATÉGICA PARA VITÓRIA:\n1. Foco em 15 municípios-chave (representam 68% dos votos necessários)\n2. Priorizar eleitores indecisos (23% do eleitorado)\n3. Fortalecer base em Porto Alegre (+12% potencial)\n4. Investir em interior (RS tem 60% dos votos no interior)\n5. Parcerias estratégicas com lideranças locais\nTempo estimado: 4-6 meses para consolidar posição',
      confidence: 0.87,
      sources: ['Electoral Data', 'Demographic Analysis', 'Historical Patterns']
    },
    'Como otimizar a agenda de campo?': {
      response: '📅 OTIMIZAÇÃO DE AGENDA:\n• Concentrar visitas em 3-4 municípios por semana\n• Priorizar eventos com 200+ pessoas confirmadas\n• Horários ideais: 18h-20h (maior engajamento)\n• Combinar eventos presenciais + transmissões online\n• Foco em cidades com 15-50K habitantes (maior impacto)\n• Evitar sobreposição com feriados e eventos locais',
      confidence: 0.85,
      sources: ['Event Analytics', 'Attendance Patterns', 'Geographic Data']
    },
    'Onde focar os recursos de campanha?': {
      response: '💰 ALOCAÇÃO ESTRATÉGICA DE RECURSOS:\n• 40% - Mídia digital (Instagram, Facebook, YouTube)\n• 25% - Eventos presenciais e material gráfico\n• 20% - WhatsApp Business e SMS\n• 10% - Parcerias e influenciadores\n• 5% - Pesquisas e monitoramento\n\nPrioridade geográfica: Porto Alegre (30%), Caxias do Sul (15%), Pelotas (12%), Santa Maria (10%)',
      confidence: 0.90,
      sources: ['Budget Analysis', 'ROI Tracking', 'Geographic Performance']
    }
  },
  eleitores: {
    'Como está a segmentação de eleitores?': {
      response: '👥 SEGMENTAÇÃO ATUAL:\n• Apoiadores Fieis (A+): 12.4K (14%)\n• Simpatizantes (A): 18.7K (21%)\n• Indecisos (B): 23.1K (26%)\n• Neutros (C): 28.9K (32%)\n• Opositores (D): 5.1K (6%)\n\nOportunidade: 51.9K eleitores (B+C) são conversíveis. Foco em conteúdo sobre "emprego" e "educação" para este grupo.',
      confidence: 0.93,
      sources: ['CRM Data', 'Survey Results', 'Behavioral Analysis']
    },
    'Quais perfis converter primeiro?': {
      response: '🎯 PERFIS PRIORITÁRIOS PARA CONVERSÃO:\n1. Indecisos com alta influência (2.1K pessoas)\n2. Jovens 18-29 anos indecisos (8.7K pessoas)\n3. Mulheres 30-45 anos (12.3K pessoas)\n4. Pequenos empresários (4.2K pessoas)\n5. Professores e profissionais da saúde (6.8K pessoas)\n\nEstratégia: Conteúdo personalizado por segmento + contato direto via WhatsApp',
      confidence: 0.89,
      sources: ['Demographic Analysis', 'Influence Mapping', 'Conversion Probability']
    },
    'Análise do CRM eleitoral': {
      response: '📊 ANÁLISE CRM ELEITORAL:\n• Total de contatos: 89.4K\n• Taxa de engajamento: 67%\n• Conversões este mês: 1.2K\n• Taxa de retenção: 89%\n• Tempo médio de resposta: 2.3h\n\nMelhorias sugeridas: Automatizar follow-up para indecisos, criar campanhas segmentadas por interesse, implementar scoring de prioridade.',
      confidence: 0.91,
      sources: ['CRM Analytics', 'Engagement Metrics', 'Conversion Tracking']
    }
  }
};

export async function POST(request: NextRequest) {
  try {
    const { candidateId, context, message, history } = await request.json();

    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Buscar resposta baseada no contexto e mensagem
    const contextResponses = ORACLE_RESPONSES[context as keyof typeof ORACLE_RESPONSES];
    
    if (!contextResponses) {
      return NextResponse.json({
        response: 'Desculpe, não tenho informações específicas para este contexto. Tente fazer uma pergunta mais específica.',
        confidence: 0.5,
        sources: []
      });
    }

    // Buscar resposta exata ou similar
    let response = contextResponses[message as keyof typeof contextResponses];
    
    if (!response) {
      // Resposta genérica baseada no contexto
      const genericResponses = {
        dashboard: {
          response: 'Com base nas métricas atuais, posso ver que a campanha está performando bem. Intenção de voto em crescimento, engajamento digital forte e boa receptividade do público. Precisa de algum insight específico?',
          confidence: 0.75,
          sources: ['General Analytics']
        },
        sala_guerra: {
          response: 'Situação estável no momento. Nenhuma crise detectada, sentimento geral positivo. Monitoramento ativo de todas as fontes. Há algo específico que gostaria de verificar?',
          confidence: 0.80,
          sources: ['Monitoring System']
        },
        waze_eleitoral: {
          response: 'A estratégia eleitoral está no caminho certo. Temos boas oportunidades identificadas e a rota para vitória está clara. Precisa de detalhes sobre algum aspecto específico?',
          confidence: 0.78,
          sources: ['Strategic Analysis']
        },
        eleitores: {
          response: 'O CRM eleitoral está funcionando bem, com boa segmentação e engajamento. Base de eleitores crescendo consistentemente. Alguma análise específica que gostaria de ver?',
          confidence: 0.82,
          sources: ['CRM System']
        }
      };
      
      response = genericResponses[context as keyof typeof genericResponses] || {
        response: 'Entendi sua pergunta. Vou analisar os dados mais recentes e fornecer insights relevantes para sua campanha.',
        confidence: 0.70,
        sources: ['AI Analysis']
      };
    }

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erro no Oracle CIPE:', error);
    return NextResponse.json({
      response: 'Desculpe, ocorreu um erro interno. Tente novamente em alguns instantes.',
      confidence: 0.0,
      sources: []
    }, { status: 500 });
  }
}
