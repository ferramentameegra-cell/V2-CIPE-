'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Map, AlertTriangle, Target, Eye
} from 'lucide-react';

interface RegiaoDados {
  id: string;
  nome: string;
  intencaoVoto: number;
  variacao: number;
  eleitores: number;
  status: 'critico' | 'atencao' | 'bom' | 'excelente';
  coordenadas: [number, number];
  adversarioPrincipal?: string;
  oportunidade?: string;
}

export default function MiniMapaGeografico() {
  const [regiaoSelecionada, setRegiaoSelecionada] = useState<string | null>(null);
  const [modoVisualizacao, setModoVisualizacao] = useState<'intencao' | 'variacao' | 'densidade'>('intencao');

  const regioes: RegiaoDados[] = [
    {
      id: 'zona_norte',
      nome: 'Zona Norte',
      intencaoVoto: 52.3,
      variacao: 4.2,
      eleitores: 125000,
      status: 'excelente',
      coordenadas: [-23.4, -46.6],
      oportunidade: 'Crescimento acelerado entre jovens'
    },
    {
      id: 'zona_sul',
      nome: 'Zona Sul',
      intencaoVoto: 38.7,
      variacao: -1.5,
      eleitores: 98000,
      status: 'atencao',
      coordenadas: [-23.6, -46.7],
      adversarioPrincipal: 'João Silva (42%)'
    },
    {
      id: 'centro',
      nome: 'Centro',
      intencaoVoto: 45.1,
      variacao: 2.8,
      eleitores: 67000,
      status: 'bom',
      coordenadas: [-23.5, -46.6]
    },
    {
      id: 'zona_leste',
      nome: 'Zona Leste',
      intencaoVoto: 41.2,
      variacao: 1.1,
      eleitores: 156000,
      status: 'bom',
      coordenadas: [-23.5, -46.5]
    },
    {
      id: 'zona_oeste',
      nome: 'Zona Oeste',
      intencaoVoto: 29.8,
      variacao: -3.2,
      eleitores: 89000,
      status: 'critico',
      coordenadas: [-23.5, -46.8],
      adversarioPrincipal: 'Maria Santos (48%)',
      oportunidade: 'Foco em propostas de transporte'
    }
  ];

  const getVisualizationColor = (regiao: RegiaoDados) => {
    switch (modoVisualizacao) {
      case 'intencao':
        return regiao.intencaoVoto > 45 ? '#10B981' : 
               regiao.intencaoVoto > 35 ? '#F59E0B' : '#EF4444';
      case 'variacao':
        return regiao.variacao > 2 ? '#10B981' :
               regiao.variacao > 0 ? '#3B82F6' :
               regiao.variacao > -2 ? '#F59E0B' : '#EF4444';
      case 'densidade':
        return regiao.eleitores > 120000 ? '#8B5CF6' :
               regiao.eleitores > 80000 ? '#3B82F6' : '#6B7280';
    }
  };

  const alertasCriticos = regioes.filter(r => r.status === 'critico');
  const oportunidades = regioes.filter(r => r.oportunidade);

  return (
    <div className="relative">
      {/* Efeito de fundo animado - Padrão Oracle CIPE */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
      
    <Card className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-blue-500/30 backdrop-blur-xl shadow-2xl shadow-blue-500/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Map className="w-5 h-5 text-purple-300" />
            <CardTitle className="text-white">Mapa Estratégico</CardTitle>
            {alertasCriticos.length > 0 && (
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30 animate-pulse">
                {alertasCriticos.length} CRÍTICO{alertasCriticos.length > 1 ? 'S' : ''}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {['intencao', 'variacao', 'densidade'].map((modo) => (
              <Button
                key={modo}
                size="sm"
                variant={modoVisualizacao === modo ? "default" : "outline"}
                onClick={() => setModoVisualizacao(modo as any)}
                className="text-xs"
              >
                {modo === 'intencao' ? 'Intenção' : 
                 modo === 'variacao' ? 'Variação' : 'Densidade'}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative h-64 bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="border border-slate-600"></div>
              ))}
            </div>
          </div>

          {regioes.map((regiao, index) => {
            const isSelected = regiaoSelecionada === regiao.id;
            
            return (
              <motion.div
                key={regiao.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`absolute cursor-pointer transition-all duration-300 ${
                  isSelected ? 'z-10 scale-110' : 'z-0'
                }`}
                style={{
                  left: `${((regiao.coordenadas[1] + 47) / 1.5) * 100}%`,
                  top: `${((regiao.coordenadas[0] + 24) / 1.5) * 100}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={() => setRegiaoSelecionada(
                  isSelected ? null : regiao.id
                )}
              >
                <div
                  className={`w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center ${
                    isSelected ? 'ring-4 ring-blue-500/50' : ''
                  }`}
                  style={{ 
                    backgroundColor: getVisualizationColor(regiao),
                    boxShadow: isSelected ? '0 0 20px rgba(59, 130, 246, 0.5)' : 'none'
                  }}
                >
                  <span className="text-xs font-bold text-white">
                    {regiao.intencaoVoto.toFixed(0)}%
                  </span>
                </div>

                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-slate-800/90 px-2 py-1 rounded text-xs text-white border border-slate-600">
                    {regiao.nome}
                  </div>
                </div>

                {regiao.status === 'critico' && (
                  <div className="absolute -top-2 -right-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                  </div>
                )}

                {regiao.oportunidade && (
                  <div className="absolute -top-2 -left-2">
                    <Target className="w-4 h-4 text-green-400 animate-pulse" />
                  </div>
                )}
              </motion.div>
            );
          })}

          <div className="absolute bottom-2 left-2 bg-slate-800/90 p-2 rounded border border-slate-600">
            <div className="text-xs text-slate-300 mb-1">
              {modoVisualizacao === 'intencao' ? 'Intenção de Voto' :
               modoVisualizacao === 'variacao' ? 'Variação (%)' : 'Densidade Eleitoral'}
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-slate-400">Alto</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-slate-400">Médio</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-slate-400">Baixo</span>
              </div>
            </div>
          </div>
        </div>

        {regiaoSelecionada && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-4 bg-slate-800/30 rounded-lg border border-slate-700"
          >
            {(() => {
              const regiao = regioes.find(r => r.id === regiaoSelecionada)!;
              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">{regiao.nome}</h3>
                    <Badge className={`${
                      regiao.status === 'excelente' ? 'bg-green-500/20 text-green-300' :
                      regiao.status === 'bom' ? 'bg-blue-500/20 text-blue-300' :
                      regiao.status === 'atencao' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {regiao.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Intenção de Voto</p>
                      <p className="text-xl font-bold text-white">{regiao.intencaoVoto}%</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Variação</p>
                      <p className={`text-xl font-bold ${
                        regiao.variacao > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {regiao.variacao > 0 ? '+' : ''}{regiao.variacao}%
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Eleitores</p>
                      <p className="text-xl font-bold text-white">
                        {(regiao.eleitores / 1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>

                  {regiao.adversarioPrincipal && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                      <p className="text-sm text-red-300">
                        ⚠️ Adversário Principal: {regiao.adversarioPrincipal}
                      </p>
                    </div>
                  )}

                  {regiao.oportunidade && (
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                      <p className="text-sm text-green-300">
                        🎯 Oportunidade: {regiao.oportunidade}
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Ver Detalhes
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Target className="w-3 h-3 mr-1" />
                      Criar Ação
                    </Button>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alertasCriticos.length > 0 && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h4 className="text-sm font-medium text-red-300 mb-2">
                🚨 Regiões Críticas ({alertasCriticos.length})
              </h4>
              <div className="space-y-1">
                {alertasCriticos.map(regiao => (
                  <div key={regiao.id} className="text-xs text-red-200/80">
                    • {regiao.nome}: {regiao.intencaoVoto}% ({regiao.variacao > 0 ? '+' : ''}{regiao.variacao}%)
                  </div>
                ))}
              </div>
            </div>
          )}

          {oportunidades.length > 0 && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="text-sm font-medium text-green-300 mb-2">
                🎯 Oportunidades ({oportunidades.length})
              </h4>
              <div className="space-y-1">
                {oportunidades.map(regiao => (
                  <div key={regiao.id} className="text-xs text-green-200/80">
                    • {regiao.nome}: {regiao.oportunidade}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
    </div>
  );
}

