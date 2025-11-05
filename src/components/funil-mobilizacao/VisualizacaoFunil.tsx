'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingDown, X, Share2, Mail, Target, CheckCircle } from 'lucide-react';

interface EstagioDados {
  estagio: string;
  total: number;
  cor: string;
  emoji: string;
  descricao: string;
  acoesPrincipais?: string[];
  tempoMedio?: string;
}

const dadosFunil: EstagioDados[] = [
  {
    estagio: 'VISITANTE',
    total: 10000,
    cor: '#00D4FF',
    emoji: '👀',
    descricao: 'Visitantes do site e redes sociais',
    acoesPrincipais: ['Visualização de post', 'Acesso ao site', 'Visualização de vídeo'],
    tempoMedio: 'Imediato'
  },
  {
    estagio: 'LEAD',
    total: 5000,
    cor: '#4ECDC4',
    emoji: '📝',
    descricao: 'Cadastraram contato (email ou telefone)',
    acoesPrincipais: ['Cadastro no site', 'Download de material', 'Inscrição em newsletter'],
    tempoMedio: '1-2 dias'
  },
  {
    estagio: 'ENGAJADO',
    total: 2500,
    cor: '#FFD93D',
    emoji: '💬',
    descricao: 'Interagem regularmente com conteúdo',
    acoesPrincipais: ['Abertura de emails', 'Curtidas em posts', 'Compartilhamentos'],
    tempoMedio: '3-5 dias'
  },
  {
    estagio: 'APOIADOR',
    total: 1200,
    cor: '#6BCF7F',
    emoji: '✊',
    descricao: 'Declararam apoio ou completaram missão',
    acoesPrincipais: ['Completar missão', 'Declarar apoio', 'Participar evento'],
    tempoMedio: '7-10 dias'
  },
  {
    estagio: 'MULTIPLICADOR',
    total: 450,
    cor: '#AB47BC',
    emoji: '🚀',
    descricao: 'Recrutam ativamente novos membros',
    acoesPrincipais: ['Recrutar amigos', 'Liderar iniciativas', 'Criar conteúdo'],
    tempoMedio: '14+ dias'
  }
];

export default function VisualizacaoFunil() {
  const [estagioSelecionado, setEstagioSelecionado] = useState<string | null>(null);
  const [estagioHover, setEstagioHover] = useState<string | null>(null);

  const calcularConversao = (index: number) => {
    if (index === 0) return 100;
    return parseFloat(((dadosFunil[index].total / dadosFunil[index - 1].total) * 100).toFixed(1));
  };

  const calcularLargura = (total: number) => {
    const max = dadosFunil[0].total;
    return Math.max(30, (total / max) * 100);
  };

  const estagioAtual = estagioSelecionado ? dadosFunil.find(e => e.estagio === estagioSelecionado) : null;

  return (
    <div className="space-y-4">
      {dadosFunil.map((item, index) => {
        const conversao = calcularConversao(index);
        const isHovered = estagioHover === item.estagio;
        const isSelected = estagioSelecionado === item.estagio;

        return (
          <motion.div
            key={item.estagio}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setEstagioHover(item.estagio)}
            onMouseLeave={() => setEstagioHover(null)}
            onClick={() => setEstagioSelecionado(isSelected ? null : item.estagio)}
            className="cursor-pointer relative"
          >
            <div className="relative">
              {/* Barra do Funil */}
              <motion.div
                className="mx-auto rounded-lg p-4 transition-all duration-300"
                style={{
                  width: `${calcularLargura(item.total)}%`,
                  background: `linear-gradient(135deg, ${item.cor}40, ${item.cor}20)`,
                  border: `2px solid ${item.cor}60`,
                  boxShadow: isSelected || isHovered ? `0 0 25px ${item.cor}80` : 'none'
                }}
                animate={{
                  scale: isHovered || isSelected ? 1.02 : 1,
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
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <Badge
                        style={{
                          backgroundColor: `${item.cor}40`,
                          color: item.cor,
                          border: `1px solid ${item.cor}`
                        }}
                      >
                        {conversao}%
                      </Badge>
                      <span className="text-white/60 flex items-center">
                        <Users className="w-4 h-4 inline mr-1" />
                        de {index === 0 ? item.total.toLocaleString() : dadosFunil[index - 1].total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tooltip ao Hover */}
              {isHovered && !isSelected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 z-10 w-80 p-4 bg-slate-900/95 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl"
                  style={{ borderColor: `${item.cor}60` }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-semibold">{item.estagio}</span>
                      <Badge style={{ backgroundColor: `${item.cor}40`, color: item.cor }}>
                        {conversao}% conversão
                      </Badge>
                    </div>
                    <div className="text-sm text-white/70">
                      <div className="mb-2">Tempo médio: <span className="text-white">{item.tempoMedio}</span></div>
                      {item.acoesPrincipais && (
                        <div>
                          <div className="text-white/50 mb-1">Ações principais:</div>
                          <ul className="list-disc list-inside space-y-1">
                            {item.acoesPrincipais.map((acao, idx) => (
                              <li key={idx} className="text-white/80">{acao}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Seta de conexão */}
              {index < dadosFunil.length - 1 && (
                <div className="flex justify-center my-2">
                  <motion.div
                    animate={{
                      opacity: isHovered || (estagioHover === dadosFunil[index + 1]?.estagio) ? 1 : 0.3
                    }}
                  >
                    <TrendingDown className="w-6 h-6 text-white/30" />
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Painel Detalhado do Estágio Selecionado */}
      <AnimatePresence>
        {estagioSelecionado && estagioAtual && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Card
              className="glass-card mt-6"
              style={{ borderColor: `${estagioAtual.cor}60` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-4xl">{estagioAtual.emoji}</span>
                      <div>
                        <h4 className="text-white font-bold text-xl">{estagioAtual.estagio}</h4>
                        <p className="text-white/70 text-sm">{estagioAtual.descricao}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEstagioSelecionado(null)}
                    className="text-white/70 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white/70 text-sm mb-1">Total de Pessoas</div>
                    <div className="text-white font-bold text-2xl">{estagioAtual.total.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white/70 text-sm mb-1">Taxa de Conversão</div>
                    <div
                      className="font-bold text-2xl"
                      style={{ color: estagioAtual.cor }}
                    >
                      {calcularConversao(dadosFunil.indexOf(estagioAtual))}%
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg">
                    <div className="text-white/70 text-sm mb-1">Tempo Médio</div>
                    <div className="text-white font-bold text-lg">{estagioAtual.tempoMedio}</div>
                  </div>
                </div>

                {estagioAtual.acoesPrincipais && (
                  <div className="mb-4">
                    <div className="text-white font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Ações Principais que Levam a Este Estágio:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {estagioAtual.acoesPrincipais.map((acao, idx) => (
                        <Badge
                          key={idx}
                          className="bg-white/10 text-white border-white/20"
                        >
                          <CheckCircle className="w-3 h-3 mr-1 inline" />
                          {acao}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 flex-1"
                    style={{ backgroundColor: `${estagioAtual.cor}80` }}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Ver {estagioAtual.total.toLocaleString()} Apoiadores
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Exportar Lista
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
