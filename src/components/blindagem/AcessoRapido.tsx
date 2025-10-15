'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { ArrowRight, Target, Database, Shield } from 'lucide-react';

interface AcessoRapidoProps {
  title: string;
  candidateId: string;
}

export default function AcessoRapido({ title, candidateId }: AcessoRapidoProps) {
  const router = useRouter();
  
  const icones: Record<string, any> = {
    'Simulador de Entrevista': Target,
    'Banco de Argumentos': Database,
    'Preparação de Debate': Shield
  };

  const rotas: Record<string, string> = {
    'Simulador de Entrevista': `/dashboard/${candidateId}/blindagem/treinamento`,
    'Banco de Argumentos': `/dashboard/${candidateId}/blindagem/banco-argumentos`,
    'Preparação de Debate': `/dashboard/${candidateId}/blindagem/preparacao-debate`
  };

  const Icon = icones[title] || Target;

  return (
    <Card 
      className="glass-card cursor-pointer hover:scale-105 transition-all group"
      onClick={() => router.push(rotas[title])}
    >
      <CardContent className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="text-white font-semibold">{title}</div>
        </div>
        <ArrowRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </CardContent>
    </Card>
  );
}
