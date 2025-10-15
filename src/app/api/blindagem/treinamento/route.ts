import { NextResponse } from 'next/server';
import { gerarPerguntaIA } from '@/lib/blindagem/motor-ia-respostas';

// POST /api/blindagem/treinamento/iniciar - Inicia sessão
export async function POST(request: Request) {
  const body = await request.json();
  const { tipo, perfil, temas } = body;

  const sessaoId = Date.now().toString();
  
  // Gera primeira pergunta
  const primeiraPergunta = await gerarPerguntaIA(
    { tipo, perfil, temas },
    []
  );

  return NextResponse.json({
    sessaoId,
    primeiraPergunta,
    status: 'iniciada'
  }, { status: 201 });
}

// POST /api/blindagem/treinamento/interagir - Processa resposta
export async function PUT(request: Request) {
  const body = await request.json();
  const { sessaoId, resposta, historico } = body;

  // Gera próxima pergunta
  const proximaPergunta = await gerarPerguntaIA(
    body.config,
    historico,
    resposta
  );

  return NextResponse.json({
    proximaPergunta,
    feedback: 'Resposta processada'
  });
}

// GET - Finaliza e retorna análise
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessaoId = searchParams.get('sessaoId');

  return NextResponse.json({
    sessaoId,
    scoreGeral: 78,
    analise: { consistencia: 82, clareza: 75 }
  });
}
