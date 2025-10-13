'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Search, Filter, TrendingUp, MapPin, Users, DollarSign, Target } from 'lucide-react';

export default function AnaliseTerritorio({ candidateId }: { candidateId: string }) {
  const [filtros, setFiltros] = useState({
    regiao: 'todas',
    rendaMin: 0,
    rendaMax: 100000,
    idadeMin: 18,
    idadeMax: 100
  });

  const dadosDemograficos = [
    { nome: '18-25', valor: 25000, apoio: 45 },
    { nome: '26-35', valor: 35000, apoio: 52 },
    { nome: '36-50', valor: 45000, apoio: 48 },
    { nome: '51-65', valor: 28000, apoio: 55 },
    { nome: '65+', valor: 18000, apoio: 62 }
  ];

  const dadosRenda = [
    { nome: '0-2 SM', valor: 45000, apoio: 58 },
    { nome: '2-5 SM', valor: 38000, apoio: 48 },
    { nome: '5-10 SM', valor: 25000, apoio: 42 },
    { nome: '10+ SM', valor: 12000, apoio: 38 }
  ];

  const distribuicaoVotos = [
    { name: 'Apoiadores', value: 52000, color: '#00D4FF' },
    { name: 'Indecisos', value: 35000, color: '#FFA726' },
    { name: 'Adversários', value: 28000, color: '#EF5350' }
  ];

  const regioes = [
    { nome: 'Centro', populacao: 85000, apoio: 48, densidade: 12500 },
    { nome: 'Zona Sul', populacao: 120000, apoio: 55, densidade: 8200 },
    { nome: 'Zona Norte', populacao: 95000, apoio: 42, densidade: 6800 },
    { nome: 'Zona Leste', populacao: 75000, apoio: 50, densidade: 5400 },
    { nome: 'Zona Oeste', populacao: 65000, apoio: 45, densidade: 4100 }
  ];

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros Avançados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-white">Região</Label>
              <select
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white"
                value={filtros.regiao}
                onChange={(e) => setFiltros({ ...filtros, regiao: e.target.value })}
              >
                <option value="todas">Todas as Regiões</option>
                <option value="centro">Centro</option>
                <option value="sul">Zona Sul</option>
                <option value="norte">Zona Norte</option>
                <option value="leste">Zona Leste</option>
                <option value="oeste">Zona Oeste</option>
              </select>
            </div>

            <div>
              <Label className="text-white">Renda Mínima (R$)</Label>
              <Input
                type="number"
                value={filtros.rendaMin}
                onChange={(e) => setFiltros({ ...filtros, rendaMin: Number(e.target.value) })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <Label className="text-white">Idade Mínima</Label>
              <Input
                type="number"
                value={filtros.idadeMin}
                onChange={(e) => setFiltros({ ...filtros, idadeMin: Number(e.target.value) })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Análise Demográfica */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Distribuição por Idade</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosDemograficos}>
                <XAxis dataKey="nome" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="valor" fill="#00D4FF" name="População" />
                <Bar dataKey="apoio" fill="#6BCF7F" name="Apoio (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white">Distribuição de Votos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distribuicaoVotos}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distribuicaoVotos.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Análise por Renda */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white">Análise por Faixa de Renda</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dadosRenda} layout="vertical">
              <XAxis type="number" stroke="#fff" />
              <YAxis dataKey="nome" type="category" stroke="#fff" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend />
              <Bar dataKey="valor" fill="#FFD93D" name="População" />
              <Bar dataKey="apoio" fill="#6BCF7F" name="Apoio (%)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Comparação de Regiões */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Comparação de Regiões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {regioes.map((regiao) => (
              <div
                key={regiao.nome}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-white">{regiao.nome}</div>
                  <Badge variant="outline" className={
                    regiao.apoio >= 50 ? 'text-green-400 border-green-400' :
                    regiao.apoio >= 40 ? 'text-yellow-400 border-yellow-400' :
                    'text-red-400 border-red-400'
                  }>
                    {regiao.apoio}% de apoio
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="text-white/70 text-xs">População</div>
                      <div className="text-white font-semibold">{regiao.populacao.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-400" />
                    <div>
                      <div className="text-white/70 text-xs">Densidade (hab/km²)</div>
                      <div className="text-white font-semibold">{regiao.densidade.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="text-white/70 text-xs">Votos Potenciais</div>
                      <div className="text-white font-semibold">
                        {Math.round(regiao.populacao * regiao.apoio / 100).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white/70">Apoio</span>
                    <span className="text-white">{regiao.apoio}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
                      style={{ width: `${regiao.apoio}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

