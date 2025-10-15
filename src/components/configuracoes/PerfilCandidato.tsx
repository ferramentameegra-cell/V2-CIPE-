'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Save, Edit, Plus, Trash2, MapPin, Phone, Mail, Globe, Target, Users, Calendar, X } from 'lucide-react';

interface DadosCandidato {
  // Dados Pessoais
  nomeCompleto: string;
  nomeUrna: string;
  apelido: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  
  // Dados Políticos
  partido: string;
  numeroPartido: number;
  numeroCandidato: number;
  cargo: string;
  coligacao: string;
  vice: string;
  
  // Localização
  estado: string;
  cidade: string;
  zona: string;
  secao: string;
  
  // Contatos
  telefone: string;
  email: string;
  site: string;
  
  // Biografia
  biografia: string;
  formacao: string;
  profissao: string;
  experienciaPolitica: string;
  realizacoes: string[];
  
  // Propostas
  propostaPrincipal: string;
  planoGoverno: string;
  temasPreferidos: string[];
  
  // Campanha
  dataInicioOficial: string;
  dataEleicao: string;
  orcamentoTotal: number;
  metaVotos: number;
  metaIntencaoVoto: number;
  
  // Adversários
  adversarios: Array<{ nome: string; partido: string; posicao: number }>;
}

export default function PerfilCandidato({ candidateId }: { candidateId: string }) {
  const [editMode, setEditMode] = useState(false);
  const [dados, setDados] = useState<DadosCandidato>({
    nomeCompleto: 'João Silva Santos',
    nomeUrna: 'João Silva',
    apelido: 'João do Povo',
    cpf: '000.000.000-00',
    rg: '00.000.000-0',
    dataNascimento: '1975-05-15',
    partido: 'PSDB',
    numeroPartido: 45,
    numeroCandidato: 4500,
    cargo: 'PREFEITO',
    coligacao: 'União por São Paulo',
    vice: 'Maria Oliveira',
    estado: 'SP',
    cidade: 'São Paulo',
    zona: '001',
    secao: '0001',
    telefone: '(11) 99999-9999',
    email: 'joao.silva@campanha2024.com.br',
    site: 'www.joaosilva.com.br',
    biografia: 'Empresário e líder comunitário com 25 anos de atuação na cidade de São Paulo. Fundador de 3 ONGs que atendem mais de 10 mil famílias.',
    formacao: 'Administração de Empresas - USP',
    profissao: 'Empresário',
    experienciaPolitica: 'Vereador por 2 mandatos (2012-2020)',
    realizacoes: [
      'Criação de 15 centros comunitários',
      'Programa de capacitação que formou 5 mil jovens',
      'Redução de 30% na criminalidade da região'
    ],
    propostaPrincipal: 'Transformar São Paulo na cidade mais inteligente e sustentável do Brasil',
    planoGoverno: 'Foco em saúde, educação e segurança pública com uso de tecnologia e participação popular',
    temasPreferidos: ['Saúde', 'Educação', 'Segurança', 'Tecnologia', 'Meio Ambiente'],
    dataInicioOficial: '2024-08-15',
    dataEleicao: '2024-10-06',
    orcamentoTotal: 5000000,
    metaVotos: 1500000,
    metaIntencaoVoto: 35,
    adversarios: [
      { nome: 'Carlos Mendes', partido: 'PT', posicao: 1 },
      { nome: 'Ana Costa', partido: 'PSOL', posicao: 2 },
      { nome: 'Roberto Lima', partido: 'PL', posicao: 3 }
    ]
  });

  const [novaRealizacao, setNovaRealizacao] = useState('');
  const [novoTema, setNovoTema] = useState('');
  const [novoAdversario, setNovoAdversario] = useState({ nome: '', partido: '', posicao: 0 });

  const cargos = ['PRESIDENTE', 'GOVERNADOR', 'SENADOR', 'DEPUTADO_FEDERAL', 'DEPUTADO_ESTADUAL', 'PREFEITO', 'VEREADOR'];
  const partidos = ['PT', 'PSDB', 'MDB', 'PL', 'PSB', 'PSOL', 'PDT', 'UNIÃO', 'REPUBLICANOS', 'PP', 'CIDADANIA'];

  const handleSave = () => {
    console.log('Salvando dados:', dados);
    setEditMode(false);
    // Aqui iria a chamada à API
  };

  const adicionarRealizacao = () => {
    if (novaRealizacao.trim()) {
      setDados({ ...dados, realizacoes: [...dados.realizacoes, novaRealizacao] });
      setNovaRealizacao('');
    }
  };

  const removerRealizacao = (index: number) => {
    setDados({ ...dados, realizacoes: dados.realizacoes.filter((_, i) => i !== index) });
  };

  const adicionarTema = () => {
    if (novoTema.trim() && !dados.temasPreferidos.includes(novoTema)) {
      setDados({ ...dados, temasPreferidos: [...dados.temasPreferidos, novoTema] });
      setNovoTema('');
    }
  };

  const removerTema = (tema: string) => {
    setDados({ ...dados, temasPreferidos: dados.temasPreferidos.filter(t => t !== tema) });
  };

  const adicionarAdversario = () => {
    if (novoAdversario.nome.trim() && novoAdversario.partido) {
      setDados({ ...dados, adversarios: [...dados.adversarios, novoAdversario] });
      setNovoAdversario({ nome: '', partido: '', posicao: 0 });
    }
  };

  const removerAdversario = (index: number) => {
    setDados({ ...dados, adversarios: dados.adversarios.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Perfil do Candidato</h2>
          <p className="text-slate-400 mt-1">Configure todos os dados pessoais, políticos e da campanha</p>
        </div>
        <Button 
          onClick={() => editMode ? handleSave() : setEditMode(true)}
          className={editMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
        >
          {editMode ? <><Save className="w-4 h-4 mr-2" />Salvar</> : <><Edit className="w-4 h-4 mr-2" />Editar</>}
        </Button>
      </div>

      {/* Dados Pessoais */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-blue-400" />
            <span>Dados Pessoais</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Nome Completo *</label>
            <Input 
              value={dados.nomeCompleto} 
              onChange={(e) => setDados({...dados, nomeCompleto: e.target.value})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Nome de Urna *</label>
            <Input 
              value={dados.nomeUrna} 
              onChange={(e) => setDados({...dados, nomeUrna: e.target.value})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Apelido</label>
            <Input 
              value={dados.apelido} 
              onChange={(e) => setDados({...dados, apelido: e.target.value})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">CPF</label>
            <Input 
              value={dados.cpf} 
              onChange={(e) => setDados({...dados, cpf: e.target.value})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">RG</label>
            <Input 
              value={dados.rg} 
              onChange={(e) => setDados({...dados, rg: e.target.value})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Data de Nascimento</label>
            <Input 
              type="date"
              value={dados.dataNascimento} 
              onChange={(e) => setDados({...dados, dataNascimento: e.target.value})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Dados Políticos */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-400" />
            <span>Dados Políticos</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Partido *</label>
            <Select value={dados.partido} onValueChange={(v) => setDados({...dados, partido: v})} disabled={!editMode}>
              <SelectTrigger className="bg-slate-800/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {partidos.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Número do Partido</label>
            <Input 
              type="number"
              value={dados.numeroPartido} 
              onChange={(e) => setDados({...dados, numeroPartido: parseInt(e.target.value)})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Número do Candidato</label>
            <Input 
              type="number"
              value={dados.numeroCandidato} 
              onChange={(e) => setDados({...dados, numeroCandidato: parseInt(e.target.value)})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Cargo *</label>
            <Select value={dados.cargo} onValueChange={(v) => setDados({...dados, cargo: v})} disabled={!editMode}>
              <SelectTrigger className="bg-slate-800/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cargos.map(c => <SelectItem key={c} value={c}>{c.replace('_', ' ')}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Coligação</label>
            <Input 
              value={dados.coligacao} 
              onChange={(e) => setDados({...dados, coligacao: e.target.value})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Vice/Suplente</label>
            <Input 
              value={dados.vice} 
              onChange={(e) => setDados({...dados, vice: e.target.value})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Localização e Contatos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              <span>Localização</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Estado</label>
              <Input 
                value={dados.estado} 
                onChange={(e) => setDados({...dados, estado: e.target.value})}
                disabled={!editMode}
                className="bg-slate-800/50"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Cidade</label>
              <Input 
                value={dados.cidade} 
                onChange={(e) => setDados({...dados, cidade: e.target.value})}
                disabled={!editMode}
                className="bg-slate-800/50"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Zona Eleitoral</label>
              <Input 
                value={dados.zona} 
                onChange={(e) => setDados({...dados, zona: e.target.value})}
                disabled={!editMode}
                className="bg-slate-800/50"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Seção</label>
              <Input 
                value={dados.secao} 
                onChange={(e) => setDados({...dados, secao: e.target.value})}
                disabled={!editMode}
                className="bg-slate-800/50"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-yellow-400" />
              <span>Contatos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Telefone</label>
              <Input 
                value={dados.telefone} 
                onChange={(e) => setDados({...dados, telefone: e.target.value})}
                disabled={!editMode}
                className="bg-slate-800/50"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Email</label>
              <Input 
                type="email"
                value={dados.email} 
                onChange={(e) => setDados({...dados, email: e.target.value})}
                disabled={!editMode}
                className="bg-slate-800/50"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Site</label>
              <Input 
                value={dados.site} 
                onChange={(e) => setDados({...dados, site: e.target.value})}
                disabled={!editMode}
                className="bg-slate-800/50"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Biografia e Carreira */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-cyan-400" />
            <span>Biografia e Carreira</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Biografia</label>
            <textarea 
              value={dados.biografia} 
              onChange={(e) => setDados({...dados, biografia: e.target.value})}
              disabled={!editMode}
              rows={3}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white resize-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Formação</label>
              <Input 
                value={dados.formacao} 
                onChange={(e) => setDados({...dados, formacao: e.target.value})}
                disabled={!editMode}
                className="bg-slate-800/50"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Profissão</label>
              <Input 
                value={dados.profissao} 
                onChange={(e) => setDados({...dados, profissao: e.target.value})}
                disabled={!editMode}
                className="bg-slate-800/50"
              />
            </div>
            <div>
              <label className="text-sm text-slate-400 mb-1 block">Experiência Política</label>
              <Input 
                value={dados.experienciaPolitica} 
                onChange={(e) => setDados({...dados, experienciaPolitica: e.target.value})}
                disabled={!editMode}
                className="bg-slate-800/50"
              />
            </div>
          </div>
          
          {/* Realizações */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Realizações</label>
            <div className="space-y-2 mb-3">
              {dados.realizacoes.map((realizacao, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                  <span className="text-sm text-white">{realizacao}</span>
                  {editMode && (
                    <Button size="sm" variant="ghost" onClick={() => removerRealizacao(i)}>
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {editMode && (
              <div className="flex space-x-2">
                <Input 
                  value={novaRealizacao}
                  onChange={(e) => setNovaRealizacao(e.target.value)}
                  placeholder="Nova realização"
                  className="bg-slate-800/50"
                />
                <Button onClick={adicionarRealizacao}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Propostas e Temas */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-400" />
            <span>Propostas e Temas</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Proposta Principal</label>
            <textarea 
              value={dados.propostaPrincipal} 
              onChange={(e) => setDados({...dados, propostaPrincipal: e.target.value})}
              disabled={!editMode}
              rows={2}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white resize-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Plano de Governo</label>
            <textarea 
              value={dados.planoGoverno} 
              onChange={(e) => setDados({...dados, planoGoverno: e.target.value})}
              disabled={!editMode}
              rows={3}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white resize-none"
            />
          </div>
          
          {/* Temas Preferidos */}
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Temas Preferidos</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {dados.temasPreferidos.map((tema, i) => (
                <Badge key={i} className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  {tema}
                  {editMode && (
                    <X className="w-3 h-3 ml-2 cursor-pointer" onClick={() => removerTema(tema)} />
                  )}
                </Badge>
              ))}
            </div>
            {editMode && (
              <div className="flex space-x-2">
                <Input 
                  value={novoTema}
                  onChange={(e) => setNovoTema(e.target.value)}
                  placeholder="Novo tema"
                  className="bg-slate-800/50"
                />
                <Button onClick={adicionarTema}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dados da Campanha */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-orange-400" />
            <span>Dados da Campanha</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Início Oficial</label>
            <Input 
              type="date"
              value={dados.dataInicioOficial} 
              onChange={(e) => setDados({...dados, dataInicioOficial: e.target.value})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Data da Eleição</label>
            <Input 
              type="date"
              value={dados.dataEleicao} 
              onChange={(e) => setDados({...dados, dataEleicao: e.target.value})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Orçamento Total (R$)</label>
            <Input 
              type="number"
              value={dados.orcamentoTotal} 
              onChange={(e) => setDados({...dados, orcamentoTotal: parseFloat(e.target.value)})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Meta de Votos</label>
            <Input 
              type="number"
              value={dados.metaVotos} 
              onChange={(e) => setDados({...dados, metaVotos: parseInt(e.target.value)})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Meta Intenção de Voto (%)</label>
            <Input 
              type="number"
              value={dados.metaIntencaoVoto} 
              onChange={(e) => setDados({...dados, metaIntencaoVoto: parseFloat(e.target.value)})}
              disabled={!editMode}
              className="bg-slate-800/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Adversários */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-red-400" />
            <span>Principais Adversários</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4">
            {dados.adversarios.map((adv, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                    #{adv.posicao}
                  </Badge>
                  <div>
                    <div className="font-medium text-white">{adv.nome}</div>
                    <div className="text-sm text-slate-400">{adv.partido}</div>
                  </div>
                </div>
                {editMode && (
                  <Button size="sm" variant="ghost" onClick={() => removerAdversario(i)}>
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </Button>
                )}
              </div>
            ))}
          </div>
          {editMode && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input 
                value={novoAdversario.nome}
                onChange={(e) => setNovoAdversario({...novoAdversario, nome: e.target.value})}
                placeholder="Nome"
                className="bg-slate-800/50"
              />
              <Select value={novoAdversario.partido} onValueChange={(v) => setNovoAdversario({...novoAdversario, partido: v})}>
                <SelectTrigger className="bg-slate-800/50">
                  <SelectValue placeholder="Partido" />
                </SelectTrigger>
                <SelectContent>
                  {partidos.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input 
                type="number"
                value={novoAdversario.posicao}
                onChange={(e) => setNovoAdversario({...novoAdversario, posicao: parseInt(e.target.value)})}
                placeholder="Posição"
                className="bg-slate-800/50"
              />
              <Button onClick={adicionarAdversario} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

