import { NextResponse } from 'next/server';
// import { creditarPontos } from '@/lib/funil-mobilizacao/motor-gamificacao';

// POST /api/funil-mobilizacao/missoes/submissoes/[submissaoId]/validar - Aprova ou rejeita submissão
export async function POST(
  request: Request,
  { params }: { params: { submissaoId: string } }
) {
  try {
    const submissaoId = params.submissaoId;
    const body = await request.json();
    const { aprovado, feedback } = body;

    if (typeof aprovado !== 'boolean') {
      return NextResponse.json(
        { error: 'aprovado deve ser true ou false' },
        { status: 400 }
      );
    }

    // Em produção, buscar submissão do banco
    // const submissao = await prisma.submissaoMissao.findUnique({
    //   where: { id: submissaoId },
    //   include: {
    //     missao: true,
    //     apoiador: true
    //   }
    // });

    // if (!submissao) {
    //   return NextResponse.json(
    //     { error: 'Submissão não encontrada' },
    //     { status: 404 }
    //   );

    // Atualizar status da submissão
    // await prisma.submissaoMissao.update({
    //   where: { id: submissaoId },
    //   data: {
    //     status: aprovado ? 'APROVADA' : 'REJEITADA',
    //     feedback: feedback || null
    //   }
    // });

    // Se aprovado, creditar pontos e verificar medalhas
    if (aprovado) {
      // const resultado = creditarPontos(submissao.apoiador, submissao.missao.pontosRecompensa);
      // await prisma.apoiadorFunil.update({
      //   where: { id: submissao.apoiadorId },
      //   data: {
      //     pontos: resultado.novoTotalPontos,
      //     nivel: resultado.novoNivel
      //   }
      // });

      // Verificar e conceder medalhas
      // const medalhas = verificarMedalhas(apoiadorAtualizado);
      // ...
    }

    return NextResponse.json({
      success: true,
      submissaoId,
      status: aprovado ? 'APROVADA' : 'REJEITADA',
      mensagem: aprovado
        ? 'Submissão aprovada! Pontos creditados.'
        : 'Submissão rejeitada.'
    });
  } catch (error) {
    console.error('Erro ao validar submissão:', error);
    return NextResponse.json(
      { error: 'Erro ao validar submissão' },
      { status: 500 }
    );
  }
}

