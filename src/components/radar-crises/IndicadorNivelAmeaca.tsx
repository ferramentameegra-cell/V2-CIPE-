'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface IndicadorProps {
  nivel: 'BAIXO' | 'MEDIO' | 'ALTO' | 'CRITICO';
  indice?: number; // 0-100
}

export default function IndicadorNivelAmeaca({ nivel, indice = 50 }: IndicadorProps) {
  const getNivelConfig = () => {
    switch (nivel) {
      case 'CRITICO':
        return {
          cor: '#EF4444',
          corBg: 'bg-red-500/20',
          corBorder: 'border-red-500/40',
          corTexto: 'text-red-400',
          icone: AlertTriangle,
          rotacao: 135, // graus
          pulsar: true
        };
      case 'ALTO':
        return {
          cor: '#F97316',
          corBg: 'bg-orange-500/20',
          corBorder: 'border-orange-500/40',
          corTexto: 'text-orange-400',
          icone: AlertTriangle,
          rotacao: 90,
          pulsar: true
        };
      case 'MEDIO':
        return {
          cor: '#FBBF24',
          corBg: 'bg-yellow-500/20',
          corBorder: 'border-yellow-500/40',
          corTexto: 'text-yellow-400',
          icone: Activity,
          rotacao: 45,
          pulsar: false
        };
      default: // BAIXO
        return {
          cor: '#10B981',
          corBg: 'bg-green-500/20',
          corBorder: 'border-green-500/40',
          corTexto: 'text-green-400',
          icone: Shield,
          rotacao: 0,
          pulsar: false
        };
    }
  };

  const config = getNivelConfig();
  const Icone = config.icone;

  return (
    <Card className={`glass-card ${config.corBorder} ${config.pulsar ? 'animate-pulse' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm text-white/70 mb-1">Nível de Ameaça Global</h3>
            <div className="flex items-center gap-2">
              <Icone className={`w-6 h-6 ${config.corTexto}`} />
              <span className={`text-3xl font-bold ${config.corTexto}`}>{nivel}</span>
            </div>
          </div>
          <Badge className={`${config.corBg} ${config.corTexto} ${config.corBorder} border text-lg px-4 py-2`}>
            {indice}/100
          </Badge>
        </div>

        {/* Velocímetro Visual */}
        <div className="relative w-full h-32 flex items-center justify-center">
          {/* Arco de fundo */}
          <svg className="w-full h-full" viewBox="0 0 200 120">
            {/* Arco de fundo */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#334155"
              strokeWidth="12"
              strokeLinecap="round"
            />
            
            {/* Arco colorido */}
            <motion.path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke={config.cor}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * indice) / 100}
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * indice) / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
            
            {/* Ponteiro */}
            <motion.line
              x1="100"
              y1="100"
              x2="100"
              y2="40"
              stroke={config.cor}
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ transform: 'rotate(-90deg)' }}
              animate={{ transform: `rotate(${config.rotacao - 90}deg)` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ transformOrigin: '100px 100px' }}
            />
            
            {/* Centro */}
            <circle cx="100" cy="100" r="8" fill={config.cor} />
          </svg>
        </div>

        {/* Legenda */}
        <div className="flex justify-between text-xs text-white/50 mt-2">
          <span>Baixo</span>
          <span>Médio</span>
          <span>Alto</span>
          <span>Crítico</span>
        </div>
      </CardContent>
    </Card>
  );
}

