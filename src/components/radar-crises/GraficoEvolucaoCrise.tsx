'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

const dados = [
  { dia: 'Seg', mencoes: 45, alertas: 2, impacto: 35 },
  { dia: 'Ter', mencoes: 52, alertas: 3, impacto: 42 },
  { dia: 'Qua', mencoes: 78, alertas: 5, impacto: 58 },
  { dia: 'Qui', mencoes: 125, alertas: 8, impacto: 75 },
  { dia: 'Sex', mencoes: 98, alertas: 6, impacto: 62 },
  { dia: 'Sab', mencoes: 65, alertas: 4, impacto: 48 },
  { dia: 'Dom', mencoes: 55, alertas: 3, impacto: 40 }
];

export default function GraficoEvolucaoCrise() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Evolução das Crises (7 dias)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={dados}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="dia" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend />
            <Area type="monotone" dataKey="mencoes" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} name="Menções Negativas" />
            <Area type="monotone" dataKey="alertas" stroke="#F97316" fill="#F97316" fillOpacity={0.3} name="Alertas Gerados" />
            <Area type="monotone" dataKey="impacto" stroke="#FBBF24" fill="#FBBF24" fillOpacity={0.3} name="Impacto Médio" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

