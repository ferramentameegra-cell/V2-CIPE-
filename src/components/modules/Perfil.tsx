'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';

export default function Perfil({ candidateId }: { candidateId: string }) {
  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Perfil do Candidato</h1>
          <p className="text-slate-400 mt-1">Informações e configurações do perfil</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700"><Save className="w-4 h-4 mr-2" />Salvar</Button>
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle className="text-white">Dados Pessoais</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Nome Completo</label>
              <Input defaultValue="Ronaldo Nogueira" className="bg-slate-800 border-slate-600 text-white" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Partido</label>
              <Input defaultValue="Republicanos" className="bg-slate-800 border-slate-600 text-white" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Email</label>
              <Input defaultValue="contato@ronaldonogueira.com.br" className="bg-slate-800 border-slate-600 text-white" />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Telefone</label>
              <Input defaultValue="(11) 99999-9999" className="bg-slate-800 border-slate-600 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

