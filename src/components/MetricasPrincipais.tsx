'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, TrendingDown, Target, Eye, Heart, Users,
  Activity, Zap, AlertTriangle, CheckCircle, Calendar,
  Vote, Database, MessageCircle, Phone
} from 'lucide-react';

interface MetricaPrincipal {
  id: string;
  titulo: string;
  valor: string;
  variacao: string;
  tendencia: 'up' | 'down' | 'stable';
  icon: any;
  cor: string;
  descricao: string;
  meta?: string;
  status: 'excelente' | 'bom' | 'atencao' | 'critico';
}

export default function MetricasPrincipais() {
  const [metricas, setMetricas] = useState<MetricaPrincipal[]>([
    {
      id: 'intencao_voto',
      titulo: 'Intenção de Voto',
      valor: '45.2%',
      variacao: '+3.2%',
      tendencia: 'up',
      icon: Target,
      cor: 'blue',
      descricao: 'vs. mês anterior',
      meta: 'Meta: 48%',
      status: 'excelente'
    },
    {
      id: 'sentimento_publico',
      titulo: 'Sentimento Público',
      valor: '72%',
      variacao: '+5%',
      tendencia: 'up',
      icon: Heart,
      cor: 'green',
      descricao: 'positivo',
      status: 'bom'
    },
    {
      id: 'alcance_digital',
      titulo: 'Alcance Digital',
      valor: '285K',
      variacao: '+15.8%',
      tendencia: 'up',
      icon: Eye,
      cor: 'purple',
      descricao: 'semanal',
      status: 'excelente'
    },
    {
      id: 'engajamento',
      titulo: 'Engajamento Médio',
      valor: '8.5%',
      variacao: '-0.3%',
      tendencia: 'down',
      icon: Activity,
      cor: 'orange',
      descricao: 'todas as redes',
      status: 'atencao'
    },
    {
      id: 'dias_eleicoes',
      titulo: 'Faltam para as Eleições',
      valor: '127',
      variacao: '',
      tendencia: 'stable',
      icon: Calendar,
      cor: 'red',
      descricao: 'dias restantes',
      status: 'atencao'
    },
    {
      id: 'meta_votos',
      titulo: 'Meta de Votos',
      valor: '85.2K',
      variacao: '',
      tendencia: 'stable',
      icon: Vote,
      cor: 'blue',
      descricao: 'votos necessários',
      status: 'bom'
    },
    {
      id: 'estimativa_meta',
      titulo: 'Estimativa da Meta',
      valor: '89.3%',
      variacao: '+2.1%',
      tendencia: 'up',
      icon: Target,
      cor: 'green',
      descricao: 'da meta alcançada',
      status: 'excelente'
    },
    {
      id: 'eleitores_crm',
      titulo: 'Eleitores no CRM',
      valor: '12.4K',
      variacao: '+156',
      tendencia: 'up',
      icon: Database,
      cor: 'purple',
      descricao: 'cadastrados',
      status: 'excelente'
    },
    {
      id: 'grupos_whatsapp',
      titulo: 'Grupos WhatsApp',
      valor: '2.8K',
      variacao: '+23',
      tendencia: 'up',
      icon: MessageCircle,
      cor: 'green',
      descricao: 'eleitores ativos',
      status: 'bom'
    },
    {
      id: 'atendimentos_dia',
      titulo: 'Atendimentos Hoje',
      valor: '342',
      variacao: '+18',
      tendencia: 'up',
      icon: Phone,
      cor: 'orange',
      descricao: 'contatos realizados',
      status: 'bom'
    }
  ]);

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setMetricas(prev => prev.map(metrica => {
        if (metrica.id === 'alcance_digital') {
          const novoValor = parseInt(metrica.valor.replace('K', '')) + Math.floor(Math.random() * 5) - 2;
          return {
            ...metrica,
            valor: `${novoValor}K`
          };
        }
        return metrica;
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: MetricaPrincipal['status']) => {
    switch (status) {
      case 'excelente': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'bom': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'atencao': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'critico': return 'bg-red-500/20 text-red-300 border-red-500/30';
    }
  };

  const getStatusIcon = (status: MetricaPrincipal['status']) => {
    switch (status) {
      case 'excelente': return CheckCircle;
      case 'bom': return CheckCircle;
      case 'atencao': return AlertTriangle;
      case 'critico': return AlertTriangle;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
      {metricas.map((metrica, index) => {
        const Icon = metrica.icon;
        const StatusIcon = getStatusIcon(metrica.status);
        
        return (
          <motion.div
            key={metrica.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="glass-card interactive-card h-full">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-5 h-5 text-${metrica.cor}-400`} />
                    <StatusIcon className={`w-3 h-3 ${
                      metrica.status === 'excelente' || metrica.status === 'bom' ? 'text-green-400' : 
                      metrica.status === 'atencao' ? 'text-yellow-400' : 'text-red-400'
                    }`} />
                  </div>
                  <Badge className={getStatusColor(metrica.status)}>
                    {metrica.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-300">{metrica.titulo}</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-2xl font-bold text-white">{metrica.valor}</p>
                    <div className="flex items-center space-x-1">
                      {metrica.tendencia === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : metrica.tendencia === 'down' ? (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      ) : (
                        <div className="w-3 h-3" />
                      )}
                      <span className={`text-xs font-medium ${
                        metrica.tendencia === 'up' ? 'text-green-400' : 
                        metrica.tendencia === 'down' ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {metrica.variacao}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400">{metrica.descricao}</p>
                  {metrica.meta && (
                    <p className="text-xs text-blue-400">{metrica.meta}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
