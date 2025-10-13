'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, MessageSquare, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function IntegracaoPage({ params }: { params: { candidateId: string } }) {
  const router = useRouter();
  const { candidateId } = params;

  const integracoes = [
    { nome: 'Calendários', icone: Calendar, url: 'calendarios', desc: 'Google, Outlook, Apple Calendar' },
    { nome: 'Redes Sociais', icone: MessageSquare, url: 'redes-sociais', desc: 'Facebook, Instagram, Twitter, TikTok' },
    { nome: 'Comunicação', icone: Mail, url: 'comunicacao', desc: 'WhatsApp Business, SMS, Email Marketing' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-3 mb-4">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/dashboard/${candidateId}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push(`/dashboard/${candidateId}/configuracoes`)}
          >
            Configurações
          </Button>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2">Hub de Integrações</h1>
        <p className="text-slate-400 mb-6">Conecte o CIPE com suas plataformas favoritas</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {integracoes.map((int) => {
            const Icon = int.icone;
            return (
              <Card 
                key={int.url}
                className="glass-card cursor-pointer hover:border-blue-500/50 transition-all"
                onClick={() => router.push(`/dashboard/${candidateId}/configuracoes/integracao/${int.url}`)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Icon className="w-6 h-6 text-blue-400" />
                    <span>{int.nome}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm">{int.desc}</p>
                  <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                    Configurar
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

