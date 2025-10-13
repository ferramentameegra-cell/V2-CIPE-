'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Key, Activity, CheckCircle } from 'lucide-react';

export default function Seguranca({ candidateId }: { candidateId: string }) {
  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Segurança</h1>
          <p className="text-slate-400 mt-1">Configurações de segurança e privacidade</p>
        </div>
        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Seguro</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Shield className="w-5 h-5 text-green-400" /><span>Status de Segurança</span></CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Autenticação 2FA', status: 'Ativa', icone: Lock },
              { label: 'Criptografia de Dados', status: 'Ativa', icone: Key },
              { label: 'Backup Automático', status: 'Ativo', icone: Activity },
              { label: 'Conformidade LGPD', status: 'Conforme', icone: CheckCircle }
            ].map((item, i) => {
              const Icon = item.icone;
              return (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-green-400" />
                    <span className="text-white">{item.label}</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300">{item.status}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader><CardTitle className="flex items-center space-x-2"><Activity className="w-5 h-5 text-blue-400" /><span>Atividade Recente</span></CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { acao: 'Login realizado', local: 'São Paulo, BR', tempo: '2h atrás' },
                { acao: 'Exportação de dados', local: 'São Paulo, BR', tempo: '5h atrás' },
                { acao: 'Alteração de senha', local: 'São Paulo, BR', tempo: '2d atrás' }
              ].map((ativ, i) => (
                <div key={i} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white text-sm font-medium">{ativ.acao}</div>
                      <div className="text-xs text-slate-400">{ativ.local} • {ativ.tempo}</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

