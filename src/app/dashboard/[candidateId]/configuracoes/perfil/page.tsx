'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PerfilCandidato from '@/components/configuracoes/PerfilCandidato';

export default function PerfilPage({ params }: { params: { candidateId: string } }) {
  const router = useRouter();
  const { candidateId } = params;

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
        
        <PerfilCandidato candidateId={candidateId} />
      </div>
    </div>
  );
}

