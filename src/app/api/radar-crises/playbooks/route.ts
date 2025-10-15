import { NextResponse } from 'next/server';

export async function GET() {
  const playbooks = [
    {
      id: '1',
      nome: 'Resposta Rápida - Fake News',
      descricao: 'Playbook para desinformação',
      vezesUtilizado: 15,
      taxaSucesso: 0.87
    }
  ];
  return NextResponse.json(playbooks);
}

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({ id: Date.now().toString(), ...body }, { status: 201 });
}

