'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp } from 'lucide-react';

const dados = [
  { de: 'Visitante', para: 'Lead', taxa: 50, cor: '#00D4FF' },
  { de: 'Lead', para: 'Engajado', taxa: 50, cor: '#4ECDC4' },
  { de: 'Engajado', para: 'Apoiador', taxa: 48, cor: '#FFD93D' },
  { de: 'Apoiador', para: 'Multiplicador', taxa: 37.5, cor: '#6BCF7F' }
];

export default function GraficoConversao() {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Taxas de Conversão
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dados}>
            <XAxis dataKey="para" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
            <Bar dataKey="taxa" name="Taxa (%)" radius={[8, 8, 0, 0]}>
              {dados.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.cor} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
