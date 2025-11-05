import { NextResponse } from 'next/server';
import { processarInteracao } from '@/lib/funil-mobilizacao/motor-funil';

// GET /api/funil-mobilizacao/funil - Estatísticas do funil
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const periodo = searchParams.get('periodo') || '30'; // dias

  // Em produção, buscar do banco de dados
  const stats = {
    estagios: [
      { estagio: 'VISITANTE', total: 10000, conversao: 100 },
      { estagio: 'LEAD', total: 5000, conversao: 50 },
      { estagio: 'ENGAJADO', total: 2500, conversao: 50 },
      { estagio: 'APOIADOR', total: 1200, conversao: 48 },
      { estagio: 'MULTIPLICADOR', total: 450, conversao: 37.5 }
    ],
    periodo: periodo,
    totalApoiadores: 19150,
    taxaConversaoMedia: 46.2
  };

  return NextResponse.json(stats);
}

// POST /api/funil-mobilizacao/funil/progress - Notificar progressão de usuário
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { apoiadorId, interacao } = body;

    if (!apoiadorId || !interacao) {
      return NextResponse.json(
        { error: 'apoiadorId e interacao são obrigatórios' },
        { status: 400 }
      );
    }

    // Em produção, buscar dados do apoiador do banco
    const apoiador = {
      estagio: 'LEAD' as const,
      pontos: 50,
      taxaEngajamento: 30,
      interacoes: []
    };

    // Processar interação usando o motor
    const resultado = processarInteracao(apoiador, {
      tipo: interacao.tipo,
      valor: interacao.valor || 1,
      timestamp: new Date()
    });

    // Em produção, salvar no banco
    // await prisma.apoiadorFunil.update({
    //   where: { id: apoiadorId },
    //   data: {
    //     estagio: resultado.novoEstagio,
    //     pontos: resultado.pontos,
    //     ultimaAtividade: new Date()
    //   }
    // });

    return NextResponse.json({
      success: true,
      apoiadorId,
      progressao: resultado,
      mensagem: resultado.progrediu
        ? `Apoiador progrediu para ${resultado.novoEstagio}!`
        : 'Interação registrada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao processar progressão:', error);
    return NextResponse.json(
      { error: 'Erro ao processar progressão' },
      { status: 500 }
    );
  }
}
