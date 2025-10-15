'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Eye, AlertTriangle, TrendingUp, Search, Filter, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Mencao {
  id: string;
  conteudo: string;
  autor: string;
  fonte: string;
  url: string;
  sentimento: number;
  indiceImpacto: number;
  eFakeNews: boolean;
  alcance: number;
  engajamento: number;
  timestamp: Date;
  topicos: string[];
}

export default function FeedMonitoramento({ compact = false }: { compact?: boolean }) {
  const [mencoes, setMencoes] = useState<Mencao[]>([]);
  const [filtros, setFiltros] = useState({ fonte: 'todas', sentimento: 'todos' });
  const [busca, setBusca] = useState('');

  useEffect(() => {
    carregarMencoes();
    
    // Simular WebSocket
    const interval = setInterval(() => {
      adicionarNovaMencao();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const carregarMencoes = () => {
    const mencoesSimuladas: Mencao[] = [
      {
        id: '1',
        conteudo: 'Candidato envolvido em escândalo de corrupção - URGENTE!',
        autor: '@usuario_suspeito',
        fonte: 'Twitter',
        url: '#',
        sentimento: -0.9,
        indiceImpacto: 85,
        eFakeNews: true,
        alcance: 15000,
        engajamento: 2500,
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        topicos: ['corrupção', 'escândalo']
      }
    ];
    setMencoes(mencoesSimuladas);
  };

  const adicionarNovaMencao = () => {
    const novaMencao: Mencao = {
      id: Date.now().toString(),
      conteudo: 'Nova menção detectada sobre o candidato...',
      autor: `@usuario${Math.floor(Math.random() * 1000)}`,
      fonte: ['Twitter', 'Facebook', 'Instagram'][Math.floor(Math.random() * 3)],
      url: '#',
      sentimento: (Math.random() - 0.5) * 2,
      indiceImpacto: Math.floor(Math.random() * 100),
      eFakeNews: Math.random() > 0.8,
      alcance: Math.floor(Math.random() * 50000),
      engajamento: Math.floor(Math.random() * 5000),
      timestamp: new Date(),
      topicos: ['política']
    };
    
    setMencoes(prev => [novaMencao, ...prev.slice(0, compact ? 4 : 19)]);
  };

  const getSentimentoColor = (sentimento: number) => {
    if (sentimento < -0.3) return 'text-red-400 bg-red-500/20 border-red-500/30';
    if (sentimento > 0.3) return 'text-green-400 bg-green-500/20 border-green-500/30';
    return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
  };

  const getImpactoColor = (impacto: number) => {
    if (impacto > 70) return 'bg-red-500';
    if (impacto > 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Eye className="w-5 h-5" />
            {compact ? 'Últimas Menções' : 'Feed de Monitoramento'}
          </CardTitle>
          {!compact && (
            <div className="flex gap-2">
              <Input
                placeholder="Buscar..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-48 bg-white/10 border-white/20 text-white text-sm"
              />
              <Button size="sm" variant="outline">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`space-y-3 ${compact ? 'max-h-80' : 'max-h-[600px]'} overflow-y-auto`}>
          <AnimatePresence>
            {mencoes.slice(0, compact ? 5 : 20).map((mencao) => (
              <motion.div
                key={mencao.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-4 rounded-lg border ${
                  mencao.sentimento < -0.3 ? 'bg-red-500/5 border-red-500/20 border-l-4 border-l-red-500' :
                  'bg-white/5 border-white/10'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {mencao.fonte}
                    </Badge>
                    <span className="text-xs text-white/60">{mencao.autor}</span>
                    {mencao.eFakeNews && (
                      <Badge className="bg-red-500 text-xs">Fake News</Badge>
                    )}
                  </div>
                  <span className="text-xs text-white/50">
                    {Math.floor((Date.now() - mencao.timestamp.getTime()) / 60000)}min atrás
                  </span>
                </div>

                <p className="text-white text-sm mb-3">{mencao.conteudo}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs">
                    <Badge className={getSentimentoColor(mencao.sentimento)}>
                      Sentimento: {(mencao.sentimento * 100).toFixed(0)}%
                    </Badge>
                    <div className="flex items-center gap-1">
                      <span className="text-white/70">Impacto:</span>
                      <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getImpactoColor(mencao.indiceImpacto)}`}
                          style={{ width: `${mencao.indiceImpacto}%` }}
                        />
                      </div>
                      <span className="text-white">{mencao.indiceImpacto}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Ver
                    </Button>
                    <Button size="sm" variant="destructive" className="h-7 text-xs">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Alerta
                    </Button>
                  </div>
                </div>

                {mencao.topicos.length > 0 && (
                  <div className="flex gap-1 mt-2">
                    {mencao.topicos.map((topico, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        #{topico}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

