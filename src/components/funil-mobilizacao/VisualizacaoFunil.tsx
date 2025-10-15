'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Users, TrendingDown } from 'lucide-react';

const dadosFunil = [
  { estagio: 'VISITANTE', total: 10000, cor: '#00D4FF', emoji: '👀', descricao: 'Visitantes do site e redes' },
  { estagio: 'LEAD', total: 5000, cor: '#4ECDC4', emoji: '📝', descricao: 'Cadastraram contato' },
  { estagio: 'ENGAJADO', total: 2500, cor: '#FFD93D', emoji: '💬', descricao: 'Interagem regularmente' },
  { estagio: 'APOIADOR', total: 1200, cor: '#6BCF7F', emoji: '✊', descricao: 'Declararam apoio' },
  { estagio: 'MULTIPLICADOR', total: 450, cor: '#AB47BC', emoji: '🚀', descricao: 'Recrutam ativamente' }
];

export default function VisualizacaoFunil() {
  const [estagioSelecionado, setEstagioSelecionado] = useState<string | null>(null);

  const calcularConversao = (index: number) => {
    if (index === 0) return 100;
    return ((dadosFunil[index].total / dadosFunil[index - 1].total) * 100).toFixed(1);
  };

  const calcularLargura = (total: number) => {
    const max = dadosFunil[0].total;
    return Math.max(30, (total / max) * 100);
  };

  return (
    <div className="space-y-4">
      {dadosFunil.map((item, index) => (
        <motion.div
          key={item.estagio}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => setEstagioSelecionado(item.estagio)}
          className="cursor-pointer"
        >
          <div className="relative">
            {/* Barra do Funil */}
            <div
              className="mx-auto rounded-lg p-4 transition-all duration-300 hover:scale-105"
              style={{
                width: `${calcularLargura(item.total)}%`,
                background: `linear-gradient(135deg, ${item.cor}40, ${item.cor}20)`,
                border: `2px solid ${item.cor}60`,
                boxShadow: estagioSelecionado === item.estagio ? `0 0 20px ${item.cor}` : 'none'
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.emoji}</span>
                  <div>
                    <div className="text-white font-bold text-lg">{item.estagio}</div>
                    <div className="text-white/70 text-sm">{item.descricao}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-white font-bold text-2xl">
                    {item.total.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge style={{ backgroundColor: `${item.cor}40`, color: item.cor, border: `1px solid ${item.cor}` }}>
                      {calcularConversao(index)}%
                    </Badge>
                    <span className="text-white/60">
                      <Users className="w-4 h-4 inline mr-1" />
                      de {index === 0 ? item.total.toLocaleString() : dadosFunil[index - 1].total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seta de conexão */}
            {index < dadosFunil.length - 1 && (
              <div className="flex justify-center my-2">
                <TrendingDown className="w-6 h-6 text-white/30" />
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {/* Info do Estágio Selecionado */}
      {estagioSelecionado && (
        <Card className="glass-card mt-6">
          <CardContent className="p-4">
            <h4 className="text-white font-bold mb-2">
              {dadosFunil.find(e => e.estagio === estagioSelecionado)?.estagio}
            </h4>
            <p className="text-white/70 text-sm mb-3">
              Clique para ver a lista completa de apoiadores neste estágio
            </p>
            <Badge className="bg-blue-500">
              Ver {dadosFunil.find(e => e.estagio === estagioSelecionado)?.total.toLocaleString()} pessoas
            </Badge>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

