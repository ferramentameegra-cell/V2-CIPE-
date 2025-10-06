'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, TrendingUp, TrendingDown, Clock, 
  MapPin, Users, Activity, Shield, Zap
} from 'lucide-react';
import OracleCipe from '@/components/OracleCipe';

interface RadarCrisesProps {
  candidateId: string;
}

interface Crisis {
  id: string;
  title: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'ACTIVE' | 'RESOLVED' | 'IN_PROGRESS';
  source: string;
  reach: number;
  sentiment: number;
  velocity: number;
  location: string;
  timestamp: string;
}

export default function RadarCrises({ candidateId }: RadarCrisesProps) {
  const [crises, setCrises] = useState<Crisis[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    severity: 'all',
    status: 'all',
    timeframe: '24h'
  });

  useEffect(() => {
    fetchCrises();
  }, [candidateId, filters]);

  const fetchCrises = async () => {
    setLoading(true);
    try {
      // Simulação de dados de crises
      const mockCrises: Crisis[] = [
        {
          id: '1',
          title: 'Rumor sobre financiamento de campanha',
          severity: 'HIGH',
          status: 'ACTIVE',
          source: 'Twitter',
          reach: 15000,
          sentiment: -0.7,
          velocity: 25.5,
          location: 'São Paulo, SP',
          timestamp: '2024-01-15T10:30:00Z'
        },
        {
          id: '2',
          title: 'Declaração mal interpretada em entrevista',
          severity: 'MEDIUM',
          status: 'IN_PROGRESS',
          source: 'Facebook',
          reach: 8500,
          sentiment: -0.3,
          velocity: 12.2,
          location: 'Rio de Janeiro, RJ',
          timestamp: '2024-01-15T09:15:00Z'
        },
        {
          id: '3',
          title: 'Apoio de personalidade controversa',
          severity: 'LOW',
          status: 'RESOLVED',
          source: 'Instagram',
          reach: 3200,
          sentiment: -0.1,
          velocity: 5.8,
          location: 'Brasília, DF',
          timestamp: '2024-01-14T16:45:00Z'
        }
      ];
      
      setCrises(mockCrises);
    } catch (error) {
      console.error('Erro ao buscar crises:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'bg-red-500/20 text-red-400 border-red-400';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400';
      case 'LOW': return 'bg-green-500/20 text-green-400 border-green-400';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-red-500/20 text-red-400 border-red-400';
      case 'IN_PROGRESS': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400';
      case 'RESOLVED': return 'bg-green-500/20 text-green-400 border-green-400';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-400';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  return (
    <div className="space-y-6 fade-in">
      <OracleCipe context="radar-crises" />

      {/* Métricas de Crises */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Crises Ativas</p>
                <p className="text-2xl font-bold text-red-400">
                  {crises.filter(c => c.status === 'ACTIVE').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Alto Risco</p>
                <p className="text-2xl font-bold text-red-400">
                  {crises.filter(c => c.severity === 'HIGH').length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Velocidade Média</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {crises.length > 0 ? Math.round(crises.reduce((acc, c) => acc + c.velocity, 0) / crises.length) : 0}
                </p>
              </div>
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Resolvidas</p>
                <p className="text-2xl font-bold text-green-400">
                  {crises.filter(c => c.status === 'RESOLVED').length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Crises */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
            Monitoramento de Crises em Tempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-slate-400 mt-2">Monitorando crises...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {crises.map((crisis) => (
                <div key={crisis.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2">{crisis.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{crisis.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{formatTimestamp(crisis.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{crisis.reach.toLocaleString()} pessoas</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getSeverityColor(crisis.severity)}>
                        {crisis.severity}
                      </Badge>
                      <Badge className={getStatusColor(crisis.status)}>
                        {crisis.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Sentimento</p>
                      <div className="flex items-center space-x-2">
                        <Progress 
                          value={Math.abs(crisis.sentiment) * 100} 
                          className="flex-1"
                        />
                        <span className={`text-sm font-medium ${
                          crisis.sentiment < -0.5 ? 'text-red-400' :
                          crisis.sentiment < 0 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {crisis.sentiment > 0 ? '+' : ''}{(crisis.sentiment * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Velocidade</p>
                      <p className="text-sm text-white font-medium">{crisis.velocity.toFixed(1)} menções/h</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Fonte</p>
                      <p className="text-sm text-white font-medium">{crisis.source}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline">
                        Ver Detalhes
                      </Button>
                      <Button size="sm" variant="outline">
                        Atribuir
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Resolver
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
