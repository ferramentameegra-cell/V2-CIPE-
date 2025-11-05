import { NextResponse } from 'next/server';

// POST /api/funil-mobilizacao/missoes/[id]/submeter - Submete conclusão de missão
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const missaoId = params.id;
    const body = await request.json();
    const { apoiadorId, dadosSubmissao } = body;

    if (!apoiadorId) {
      return NextResponse.json(
        { error: 'apoiadorId é obrigatório' },
        { status: 400 }
      );
    }

    // Em produção, criar submissão no banco
    // const submissao = await prisma.submissaoMissao.create({
    //   data: {
    //     missaoId,
    //     apoiadorId,
    //     dadosSubmissao: dadosSubmissao || {},
    //     status: 'PENDENTE'
    //   },
    //   include: {
    //     missao: true,
    //     apoiador: true
    //   }
    // });

    const submissao = {
      id: Date.now().toString(),
      missaoId,
      apoiadorId,
      dadosSubmissao: dadosSubmissao || {},
      status: 'PENDENTE',
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(submissao, { status: 201 });
  } catch (error) {
    console.error('Erro ao submeter missão:', error);
    return NextResponse.json(
      { error: 'Erro ao submeter missão' },
      { status: 500 }
    );
  }
}

