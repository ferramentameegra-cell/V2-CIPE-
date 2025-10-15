import { NextResponse } from 'next/server';

// GET /api/blindagem/argumentos - Lista argumentos
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tema = searchParams.get('tema');
  const status = searchParams.get('status');
  const busca = searchParams.get('q');

  // Mock data
  const argumentos = [
    {
      id: '1',
      perguntaChave: 'Como financiar educação?',
      variacoes: ['Financiamento educação', 'Recursos para escolas'],
      respostaCurta: 'Parceria público-privada com foco em eficiência',
      respostaLonga: 'Implementaremos um modelo PPP...',
      dadosSuporte: { taxa: '87%', investimento: 'R$ 2B' },
      videosExemplo: ['https://youtube.com/1'],
      temas: ['Educação'],
      status: 'APROVADO',
      forcaArgumento: 85
    }
  ];

  return NextResponse.json(argumentos);
}

// POST /api/blindagem/argumentos - Cria novo argumento
export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ id: Date.now().toString(), ...body }, { status: 201 });
}

// PUT - Atualiza argumento
export async function PUT(request: Request) {
  const body = await request.json();
  return NextResponse.json({ success: true, ...body });
}
