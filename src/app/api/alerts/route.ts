import { NextRequest, NextResponse } from 'next/server';

// Simulação de sistema de alertas em tempo real
const generateAlerts = (candidateId: string) => {
  const alerts = [
    {
      id: 'alert_001',
      type: 'crisis',
      severity: 'high',
      title: 'Crise Emergente Detectada',
      description: 'Post de opositor sobre "falta de transparência" ganhando tração (2.3K compartilhamentos em 2h)',
      source: 'Twitter',
      reach: 2340,
      engagement: 156,
      sentiment: -0.65,
      velocity: 45.2,
      tags: ['crise', 'transparência', 'oposição'],
      status: 'active',
      priority: 'urgent',
      assignedTo: null,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'alert_002',
      type: 'opportunity',
      severity: 'medium',
      title: 'Oportunidade de Engajamento',
      description: 'Hashtag #FuturoDoRS está viralizando (+340% de menções)',
      source: 'Instagram',
      reach: 15600,
      engagement: 2340,
      sentiment: 0.78,
      velocity: 12.3,
      tags: ['oportunidade', 'hashtag', 'viral'],
      status: 'active',
      priority: 'high',
      assignedTo: null,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'alert_003',
      type: 'threat',
      severity: 'medium',
      title: 'Aumento de Menções Negativas',
      description: 'Crescimento de 15% em menções negativas sobre "impostos"',
      source: 'Facebook',
      reach: 8900,
      engagement: 445,
      sentiment: -0.45,
      velocity: 8.7,
      tags: ['ameaça', 'impostos', 'negativo'],
      status: 'active',
      priority: 'medium',
      assignedTo: null,
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'alert_004',
      type: 'info',
      severity: 'low',
      title: 'Evento com Alta Ocupação',
      description: 'Evento em Porto Alegre atingiu 94% de ocupação',
      source: 'Event Management',
      reach: 450,
      engagement: 89,
      sentiment: 0.92,
      velocity: 2.1,
      tags: ['evento', 'sucesso', 'porto alegre'],
      status: 'resolved',
      priority: 'low',
      assignedTo: 'Equipe de Eventos',
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'alert_005',
      type: 'opportunity',
      severity: 'high',
      title: 'Influenciador Disponível',
      description: 'Influenciador @politicars com 50K seguidores demonstrou interesse em parceria',
      source: 'Instagram DM',
      reach: 50000,
      engagement: 0,
      sentiment: 0.85,
      velocity: 0,
      tags: ['influenciador', 'parceria', 'oportunidade'],
      status: 'active',
      priority: 'high',
      assignedTo: null,
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // Adicionar variação temporal
  return alerts.map(alert => ({
    ...alert,
    // Simular atualizações em tempo real
    reach: Math.floor(alert.reach * (1 + Math.random() * 0.1)),
    engagement: Math.floor(alert.engagement * (1 + Math.random() * 0.05)),
    sentiment: Math.max(-1, Math.min(1, alert.sentiment + (Math.random() - 0.5) * 0.1))
  }));
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const candidateId = searchParams.get('candidateId') || '1014';
    const status = searchParams.get('status') || 'all';
    const severity = searchParams.get('severity') || 'all';
    const type = searchParams.get('type') || 'all';

    let alerts = generateAlerts(candidateId);

    // Filtrar por status
    if (status !== 'all') {
      alerts = alerts.filter(alert => alert.status === status);
    }

    // Filtrar por severidade
    if (severity !== 'all') {
      alerts = alerts.filter(alert => alert.severity === severity);
    }

    // Filtrar por tipo
    if (type !== 'all') {
      alerts = alerts.filter(alert => alert.type === type);
    }

    // Ordenar por prioridade e data
    alerts.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    // Estatísticas
    const stats = {
      total: alerts.length,
      active: alerts.filter(a => a.status === 'active').length,
      resolved: alerts.filter(a => a.status === 'resolved').length,
      crisis: alerts.filter(a => a.type === 'crisis').length,
      opportunities: alerts.filter(a => a.type === 'opportunity').length,
      threats: alerts.filter(a => a.type === 'threat').length,
      highSeverity: alerts.filter(a => a.severity === 'high').length,
      urgent: alerts.filter(a => a.priority === 'urgent').length
    };

    return NextResponse.json({
      success: true,
      data: {
        alerts,
        stats,
        filters: { status, severity, type }
      }
    });

  } catch (error) {
    console.error('Erro ao buscar alertas:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { alertId, action, assignedTo, notes } = await request.json();

    // Simular atualização de alerta
    const updatedAlert = {
      id: alertId,
      status: action === 'resolve' ? 'resolved' : action === 'assign' ? 'assigned' : 'active',
      assignedTo: action === 'assign' ? assignedTo : null,
      notes: notes || null,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: updatedAlert
    });

  } catch (error) {
    console.error('Erro ao atualizar alerta:', error);
    return NextResponse.json({
      success: false,
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}
