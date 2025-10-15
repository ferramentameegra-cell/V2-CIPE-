'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function ScoreProntidao({ score }: { score: number }) {
  const cor = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  const circunferencia = 2 * Math.PI * 70;
  const progresso = circunferencia - (score / 100) * circunferencia;

  return (
    <div className="relative w-48 h-48">
      <svg className="w-full h-full transform -rotate-90">
        <circle cx="96" cy="96" r="70" stroke="#1e293b" strokeWidth="12" fill="none" />
        <motion.circle
          cx="96"
          cy="96"
          r="70"
          stroke={cor}
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circunferencia}
          strokeDashoffset={progresso}
          initial={{ strokeDashoffset: circunferencia }}
          animate={{ strokeDashoffset: progresso }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          className="text-5xl font-bold"
          style={{ color: cor }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.div>
        <div className="text-white/70 text-sm mt-1">Score de Prontidão</div>
      </div>
    </div>
  );
}
