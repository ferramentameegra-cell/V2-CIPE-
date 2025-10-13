import { NextResponse } from 'next/server';

// API para CRUD de Rotas do Waze Eleitoral

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const candidatoId = searchParams.get('candidatoId');
    const status = searchParams.get('status');

    // Em produção, buscar do Prisma:
    // const rotas = await prisma.rota.findMany({
    //   where: {
    //     candidatoId,
    //     ...(status && { status })
    //   },
    //   include: { equipes: true }
    // });

    // Dados simulados
    const rotasSimuladas = [
      {
        id: '1',
        candidatoId: candidatoId || '1014',
        nome: 'Carreata Zona Sul',
        tipo: 'CARREATA',
        status: 'EM_ANDAMENTO',
        distanciaEstimada: 25.5,
        tempoEstimado: 120,
        custoEstimado: 850,
        pontosDeInteresse: [
          { nome: 'Praça Central', latitude: -30.0346, longitude: -51.2177, duracao: 30 },
          { nome: 'Mercado Público', latitude: -30.0280, longitude: -51.2280, duracao: 20 }
        ],
        dataInicio: new Date(),
        createdAt: new Date()
      }
    ];

    return NextResponse.json(rotasSimuladas);
  } catch (error) {
    console.error('Erro ao buscar rotas:', error);
    return NextResponse.json({ error: 'Erro ao buscar rotas' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Em produção, criar no Prisma:
    // const novaRota = await prisma.rota.create({
    //   data: {
    //     candidatoId: body.candidatoId,
    //     nome: body.nome,
    //     tipo: body.tipo,
    //     pontosDeInteresse: body.pontosDeInteresse,
    //     rotaOtimizada: body.rotaOtimizada,
    //     distanciaEstimada: body.distanciaEstimada,
    //     tempoEstimado: body.tempoEstimado,
    //     dataInicio: body.dataInicio
    //   }
    // });

    const novaRota = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date()
    };

    return NextResponse.json(novaRota, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar rota:', error);
    return NextResponse.json({ error: 'Erro ao criar rota' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    // Em produção, atualizar no Prisma:
    // const rotaAtualizada = await prisma.rota.update({
    //   where: { id },
    //   data
    // });

    return NextResponse.json({ id, ...data, updatedAt: new Date() });
  } catch (error) {
    console.error('Erro ao atualizar rota:', error);
    return NextResponse.json({ error: 'Erro ao atualizar rota' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });
    }

    // Em produção, deletar do Prisma:
    // await prisma.rota.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar rota:', error);
    return NextResponse.json({ error: 'Erro ao deletar rota' }, { status: 500 });
  }
}

