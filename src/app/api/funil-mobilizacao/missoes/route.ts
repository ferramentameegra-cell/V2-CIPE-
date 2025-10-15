import { NextResponse } from 'next/server';

export async function GET() {
  const missoes = [
    { id: '1', titulo: 'Compartilhar Post', tipo: 'DIGITAL', pontos: 10 }
  ];
  return NextResponse.json(missoes);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ id: Date.now().toString(), ...body }, { status: 201 });
}
