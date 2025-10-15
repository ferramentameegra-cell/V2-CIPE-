import { NextResponse } from 'next/server';

// API para CRUD de Alertas de Crise

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const candidatoId = searchParams.get('candidatoId');
    const status = searchParams.get('status');

    // Dados simulados
    const alertas = [
      {
        id: '1',
        candidatoId,
        titulo: 'Fake News sobre Corrupção',
        descricao: 'Desinformação viral',
        nivelAmeaca: 'CRITICO',
        status: 'EM_RESPOSTA',
        sentimentoPredominante: -0.9,
        indiceImpacto: 85,
        potencialViral: 0.92,
        mencoes: 2547,
        createdAt: new Date()
      }
    ];

    return NextResponse.json(alertas);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar alertas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const novoAlerta = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date()
    };

    return NextResponse.json(novoAlerta, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar alerta' }, { status: 500 });
  }
}

