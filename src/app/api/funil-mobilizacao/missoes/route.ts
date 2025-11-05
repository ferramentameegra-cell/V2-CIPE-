import { NextResponse } from 'next/server';

// GET /api/funil-mobilizacao/missoes - Lista todas as missões
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || 'ATIVA';
  const tipo = searchParams.get('tipo');

  // Em produção, buscar do banco de dados
  const missoes = [
    {
      id: '1',
      titulo: 'Compartilhar Post no Instagram',
      descricao: 'Compartilhe nosso último post nas suas redes sociais',
      tipo: 'DIGITAL',
      pontos: 10,
      status: 'ATIVA',
      validacao: 'AUTOMATICA',
      adesoes: 245,
      conclusoes: 198
    },
    {
      id: '2',
      titulo: 'Participar da Carreata',
      descricao: 'Compareça à carreata no centro da cidade',
      tipo: 'FISICA',
      pontos: 50,
      status: 'ATIVA',
      validacao: 'CHECKIN_EVENTO',
      adesoes: 89,
      conclusoes: 67
    },
    {
      id: '3',
      titulo: 'Recrutar um Amigo',
      descricao: 'Convide um amigo para se cadastrar',
      tipo: 'RECRUTAMENTO',
      pontos: 100,
      status: 'ATIVA',
      validacao: 'AUTOMATICA',
      adesoes: 156,
      conclusoes: 94
    }
  ];

  let missoesFiltradas = missoes;
  if (status) {
    missoesFiltradas = missoesFiltradas.filter(m => m.status === status);
  }
  if (tipo) {
    missoesFiltradas = missoesFiltradas.filter(m => m.tipo === tipo);
  }

  return NextResponse.json(missoesFiltradas);
}

// POST /api/funil-mobilizacao/missoes - Cria uma nova missão
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { titulo, descricao, tipo, pontos, validacao, limiteConclusoes, candidatoId } = body;

    if (!titulo || !descricao || !tipo || !pontos || !candidatoId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando' },
        { status: 400 }
      );
    }

    // Em produção, salvar no banco
    // const missao = await prisma.missao.create({
    //   data: {
    //     titulo,
    //     descricao,
    //     tipo,
    //     pontosRecompensa: pontos,
    //     validacao: validacao || 'AUTOMATICA',
    //     limiteConclusoes: limiteConclusoes || null,
    //     candidatoId,
    //     status: 'ATIVA'
    //   }
    // });

    const missao = {
      id: Date.now().toString(),
      titulo,
      descricao,
      tipo,
      pontos,
      validacao: validacao || 'AUTOMATICA',
      limiteConclusoes,
      status: 'ATIVA',
      adesoes: 0,
      conclusoes: 0
    };

    return NextResponse.json(missao, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar missão:', error);
    return NextResponse.json(
      { error: 'Erro ao criar missão' },
      { status: 500 }
    );
  }
}
