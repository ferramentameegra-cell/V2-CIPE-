import { NextRequest, NextResponse } from 'next/server';

// Dados simulados de métricas em tempo real
const generateMetrics = (candidateId: string) => {
  const baseMetrics = {
    totalEleitores: 89432,
    intencaoVoto: 28,
    engajamento: 67,
    alcanceRedes: 245000,
    orcamentoUsado: 65,
    diasRestantes: 127,
    seguidoresInstagram: 45620,
    seguidoresFacebook: 32150,
    seguidoresTwitter: 18900,
    seguidoresYouTube: 12300,
    seguidoresTikTok: 8750,
    engajamentoInstagram: 4.2,
    engajamentoFacebook: 3.8,
    engajamentoTwitter: 2.1,
    engajamentoYouTube: 6.7,
    engajamentoTikTok: 8.9,
    mencoesPositivas: 1247,
    mencoesNegativas: 89,
    mencoesNeutras: 156,
    sentimentScore: 0.78,
    alcanceOrganico: 156200,
    alcancePago: 88800,
    conversoes: 1234,
    taxaConversao: 0.8,
    custoPorConversao: 12.50,
    roi: 340,
    eventosRealizados: 23,
    eventosAgendados: 8,
    ocupacaoMedia: 89,
    voluntariosAtivos: 156,
    doacoes: 45670,
    metaDoacoes: 100000,
    leadsQualificados: 2340,
    contatosWhatsApp: 567,
    emailsEnviados: 12340,
    taxaAbertura: 23.4,
    taxaClique: 4.7,
    campanhasAtivas: 12,
    campanhasPausadas: 3,
    campanhasConcluidas: 8
  };

  // Adicionar variação realística
  const variation = () => (Math.random() - 0.5) * 0.1; // ±5% de variação
  
  return {
    ...baseMetrics,
    intencaoVoto: Math.max(0, Math.min(100, baseMetrics.intencaoVoto + variation() * 10)),
    engajamento: Math.max(0, Math.min(100, baseMetrics.engajamento + variation() * 5)),
    sentimentScore: Math.max(-1, Math.min(1, baseMetrics.sentimentScore + variation() * 0.2)),
    mencoesPositivas: Math.max(0, baseMetrics.mencoesPositivas + Math.floor(variation() * 100)),
    mencoesNegativas: Math.max(0, baseMetrics.mencoesNegativas + Math.floor(variation() * 20)),
    timestamp: new Date().toISOString()
  };
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const candidateId = searchParams.get('candidateId') || '1014';
    const timeframe = searchParams.get('timeframe') || '24h';

    const metrics = generateMetrics(candidateId);

    // Adicionar dados históricos baseados no timeframe
    const historicalData = generateHistoricalData(timeframe);

    return NextResponse.json({
      success: true,
      data: {
        current: metrics,
        historical: historicalData,
        trends: calculateTrends(historicalData),
        alerts: generateAlerts(metrics)
      }
    });

  } catch (error) {
    console.error('Erro ao buscar métricas:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}

function generateHistoricalData(timeframe: string) {
  const now = new Date();
  const dataPoints = timeframe === '24h' ? 24 : timeframe === '7d' ? 7 : 30;
  const interval = timeframe === '24h' ? 1 : timeframe === '7d' ? 24 : 24 * 7; // horas
  
  const data = [];
  for (let i = dataPoints; i >= 0; i--) {
    const date = new Date(now.getTime() - (i * interval * 60 * 60 * 1000));
    data.push({
      timestamp: date.toISOString(),
      intencaoVoto: 25 + Math.random() * 8 + Math.sin(i * 0.5) * 2,
      engajamento: 60 + Math.random() * 15 + Math.cos(i * 0.3) * 5,
      alcance: 200000 + Math.random() * 100000 + Math.sin(i * 0.2) * 20000,
      sentiment: 0.6 + Math.random() * 0.4 + Math.sin(i * 0.4) * 0.1,
      mencoes: Math.floor(1000 + Math.random() * 500 + Math.sin(i * 0.6) * 200)
    });
  }
  
  return data;
}

function calculateTrends(data: any[]) {
  if (data.length < 2) return { intencaoVoto: 0, engajamento: 0, alcance: 0 };
  
  const latest = data[data.length - 1];
  const previous = data[data.length - 2];
  
  return {
    intencaoVoto: ((latest.intencaoVoto - previous.intencaoVoto) / previous.intencaoVoto) * 100,
    engajamento: ((latest.engajamento - previous.engajamento) / previous.engajamento) * 100,
    alcance: ((latest.alcance - previous.alcance) / previous.alcance) * 100,
    sentiment: latest.sentiment - previous.sentiment,
    mencoes: ((latest.mencoes - previous.mencoes) / previous.mencoes) * 100
  };
}

function generateAlerts(metrics: any) {
  const alerts = [];
  
  if (metrics.sentimentScore < 0.5) {
    alerts.push({
      type: 'warning',
      message: 'Sentimento negativo em alta',
      severity: 'medium',
      timestamp: new Date().toISOString()
    });
  }
  
  if (metrics.engajamento > 80) {
    alerts.push({
      type: 'success',
      message: 'Engajamento excepcional!',
      severity: 'low',
      timestamp: new Date().toISOString()
    });
  }
  
  if (metrics.orcamentoUsado > 80) {
    alerts.push({
      type: 'warning',
      message: 'Orçamento 80% utilizado',
      severity: 'high',
      timestamp: new Date().toISOString()
    });
  }
  
  if (metrics.mencoesNegativas > metrics.mencoesPositivas * 0.3) {
    alerts.push({
      type: 'danger',
      message: 'Aumento de menções negativas',
      severity: 'high',
      timestamp: new Date().toISOString()
    });
  }
  
  return alerts;
}
