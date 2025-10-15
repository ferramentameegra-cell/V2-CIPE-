import { NextResponse } from 'next/server';
import { analisarMidia } from '@/lib/blindagem/analise-video-audio';

// POST /api/blindagem/analise - Analisa mídia
export async function POST(request: Request) {
  const body = await request.json();
  const { urlMidia, tipo } = body;

  // Processa em background (na prática)
  const analiseId = Date.now().toString();

  // Simula processamento
  setTimeout(async () => {
    const resultado = await analisarMidia(urlMidia, tipo);
    // Salvar no banco
  }, 100);

  return NextResponse.json({
    analiseId,
    status: 'processando',
    message: 'Análise iniciada'
  }, { status: 202 });
}

// GET /api/blindagem/analise?id=X - Retorna resultado
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  // Mock resultado
  const resultado = await analisarMidia('https://exemplo.com/video.mp4', 'video');

  return NextResponse.json({
    analiseId: id,
    status: 'concluido',
    ...resultado
  });
}
