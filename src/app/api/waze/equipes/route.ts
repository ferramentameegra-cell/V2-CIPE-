import { NextResponse } from 'next/server';

// API para CRUD de Equipes de Campo

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const candidatoId = searchParams.get('candidatoId');

    // Dados simulados de equipes
    const equipesSimuladas = [
      {
        id: '1',
        candidatoId: candidatoId || '1014',
        nome: 'Equipe Alpha',
        status: 'EM_ROTA',
        kmPercorridos: 45.3,
        interacoesRegistradas: 127,
        eventosRealizados: 8,
        membros: [
          {
            id: 'm1',
            nome: 'Ana Silva',
            telefone: '(11) 99999-0001',
            latitude: -30.0346,
            longitude: -51.2177,
            status: 'ativo',
            velocidade: 25,
            bateria: 85
          }
        ]
      }
    ];

    return NextResponse.json(equipesSimuladas);
  } catch (error) {
    console.error('Erro ao buscar equipes:', error);
    return NextResponse.json({ error: 'Erro ao buscar equipes' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const novaEquipe = {
      id: Date.now().toString(),
      ...body,
      status: 'INATIVA',
      kmPercorridos: 0,
      interacoesRegistradas: 0,
      eventosRealizados: 0,
      membros: [],
      createdAt: new Date()
    };

    return NextResponse.json(novaEquipe, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar equipe:', error);
    return NextResponse.json({ error: 'Erro ao criar equipe' }, { status: 500 });
  }
}

