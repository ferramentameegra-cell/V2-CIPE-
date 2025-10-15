import { NextResponse } from 'next/server';

export async function GET() {
  const stats = {
    estagios: [
      { estagio: 'VISITANTE', total: 10000 },
      { estagio: 'LEAD', total: 5000 },
      { estagio: 'ENGAJADO', total: 2500 },
      { estagio: 'APOIADOR', total: 1200 },
      { estagio: 'MULTIPLICADOR', total: 450 }
    ]
  };
  return NextResponse.json(stats);
}
