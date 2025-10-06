import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Simulação de dados administrativos
    const adminStats = {
      totalUsers: 150,
      activeCandidates: 12,
      totalAlerts: 500,
      resolvedAlerts: 450,
      apiCallsLast24h: 12345,
      storageUsedGB: 45.7,
    };

    return NextResponse.json({
      success: true,
      data: adminStats
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas admin:', error);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
