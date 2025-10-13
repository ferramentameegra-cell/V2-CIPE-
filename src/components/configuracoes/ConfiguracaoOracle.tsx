'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Save, Settings, Zap, MessageCircle, Target } from 'lucide-react';

interface ConfigOracle {
  modeloPrincipal: string;
  modeloSecundario: string;
  temperatura: number;
  maxTokens: number;
  personalidade: string;
  tomComunicacao: string;
  especialidades: string[];
  biografiaCandidato: string;
  propostas: string;
  posicionamentos: string;
  respostaAutomatica: boolean;
  tempoResposta: number;
}

export default function ConfiguracaoOracle({ candidateId }: { candidateId: string }) {
  const [config, setConfig] = useState<ConfigOracle>({
    modeloPrincipal: 'gpt-4',
    modeloSecundario: 'claude-3',
    temperatura: 0.7,
    maxTokens: 2000,
    personalidade: 'profissional',
    tomComunicacao: 'formal',
    especialidades: ['politica', 'economia', 'saude'],
    biografiaCandidato: 'Empresário e líder comunitário com 25 anos de atuação. Fundador de 3 ONGs que atendem mais de 10 mil famílias.',
    propostas: 'Transformar a cidade em referência em saúde, educação e segurança com uso de tecnologia e participação popular.',
    posicionamentos: 'Centro-direita progressista. Defensor da livre iniciativa com responsabilidade social. Pró-meio ambiente e tecnologia.',
    respostaAutomatica: false,
    tempoResposta: 30
  });

  const modelos = [
    'gpt-4',
    'gpt-4-turbo',
    'gpt-3.5-turbo',
    'claude-3-opus',
    'claude-3-sonnet',
    'claude-3-haiku'
  ];

  const personalidades = [
    'profissional',
    'amigável',
    'técnico',
    'inspirador',
    'formal',
    'casual'
  ];

  const tons = [
    'formal',
    'informal',
    'técnico',
    'popular',
    'inspirador',
    'objetivo'
  ];

  const todasEspecialidades = [
    'politica',
    'economia',
    'saude',
    'educacao',
    'seguranca',
    'tecnologia',
    'meio_ambiente',
    'transporte',
    'cultura',
    'esporte'
  ];

  const toggleEspecialidade = (esp: string) => {
    if (config.especialidades.includes(esp)) {
      setConfig({ ...config, especialidades: config.especialidades.filter(e => e !== esp) });
    } else {
      setConfig({ ...config, especialidades: [...config.especialidades, esp] });
    }
  };

  const salvarConfiguracoes = () => {
    console.log('Salvando configurações do Oracle:', config);
    // Aqui iria a chamada à API
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Configuração do Oracle CIPE</h2>
          <p className="text-slate-400 mt-1">Personalize a inteligência artificial do sistema</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700" onClick={salvarConfiguracoes}>
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Brain className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">{config.modeloPrincipal}</div>
            <div className="text-xs text-slate-400">Modelo Principal</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Zap className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{config.temperatura.toFixed(1)}</div>
            <div className="text-xs text-slate-400">Temperatura</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white capitalize">{config.personalidade}</div>
            <div className="text-xs text-slate-400">Personalidade</div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="p-4 text-center">
            <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl font-bold text-white">{config.especialidades.length}</div>
            <div className="text-xs text-slate-400">Especialidades</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações de IA */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-400" />
              <span>Configurações de IA</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Modelo Principal</label>
              <Select 
                value={config.modeloPrincipal}
                onValueChange={(v) => setConfig({ ...config, modeloPrincipal: v })}
              >
                <SelectTrigger className="bg-slate-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {modelos.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Modelo Secundário (Backup)</label>
              <Select 
                value={config.modeloSecundario}
                onValueChange={(v) => setConfig({ ...config, modeloSecundario: v })}
              >
                <SelectTrigger className="bg-slate-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {modelos.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Temperatura: {config.temperatura.toFixed(1)}
              </label>
              <Slider
                value={[config.temperatura]}
                onValueChange={(v) => setConfig({ ...config, temperatura: v[0] })}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-slate-500 mt-1">
                Menor = mais preciso e determinístico | Maior = mais criativo e variado
              </p>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">
                Max Tokens: {config.maxTokens}
              </label>
              <Slider
                value={[config.maxTokens]}
                onValueChange={(v) => setConfig({ ...config, maxTokens: v[0] })}
                min={500}
                max={4000}
                step={100}
                className="w-full"
              />
              <p className="text-xs text-slate-500 mt-1">
                Controla o tamanho máximo das respostas
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Personalização */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-green-400" />
              <span>Personalização</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Personalidade</label>
              <Select 
                value={config.personalidade}
                onValueChange={(v) => setConfig({ ...config, personalidade: v })}
              >
                <SelectTrigger className="bg-slate-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {personalidades.map(p => (
                    <SelectItem key={p} value={p} className="capitalize">{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Tom de Comunicação</label>
              <Select 
                value={config.tomComunicacao}
                onValueChange={(v) => setConfig({ ...config, tomComunicacao: v })}
              >
                <SelectTrigger className="bg-slate-800/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tons.map(t => (
                    <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Especialidades</label>
              <div className="flex flex-wrap gap-2">
                {todasEspecialidades.map(esp => (
                  <Badge
                    key={esp}
                    className={`cursor-pointer ${
                      config.especialidades.includes(esp)
                        ? 'bg-blue-500/30 text-blue-300 border-blue-500/50'
                        : 'bg-slate-700/30 text-slate-400 border-slate-600/50'
                    }`}
                    onClick={() => toggleEspecialidade(esp)}
                  >
                    {esp.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-300">Resposta Automática</label>
                <Switch 
                  checked={config.respostaAutomatica}
                  onCheckedChange={(v) => setConfig({ ...config, respostaAutomatica: v })}
                />
              </div>
              <p className="text-xs text-slate-500">
                Oracle responderá automaticamente dentro do tempo configurado
              </p>
            </div>

            {config.respostaAutomatica && (
              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Tempo de Resposta: {config.tempoResposta}s
                </label>
                <Slider
                  value={[config.tempoResposta]}
                  onValueChange={(v) => setConfig({ ...config, tempoResposta: v[0] })}
                  min={10}
                  max={120}
                  step={10}
                  className="w-full"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Base de Conhecimento */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-purple-400" />
            <span>Base de Conhecimento</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-2 block">Biografia do Candidato</label>
            <textarea 
              value={config.biografiaCandidato}
              onChange={(e) => setConfig({ ...config, biografiaCandidato: e.target.value })}
              rows={3}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white resize-none"
              placeholder="Conte sobre a trajetória, experiência e principais realizações..."
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">Propostas e Plano de Governo</label>
            <textarea 
              value={config.propostas}
              onChange={(e) => setConfig({ ...config, propostas: e.target.value })}
              rows={3}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white resize-none"
              placeholder="Principais propostas, metas e visão de governo..."
            />
          </div>

          <div>
            <label className="text-sm text-slate-400 mb-2 block">Posicionamentos Políticos</label>
            <textarea 
              value={config.posicionamentos}
              onChange={(e) => setConfig({ ...config, posicionamentos: e.target.value })}
              rows={3}
              className="w-full bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-white resize-none"
              placeholder="Posicionamento ideológico, valores e principais bandeiras..."
            />
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-sm text-blue-300">
              <strong>💡 Dica:</strong> Quanto mais detalhada e precisa for a base de conhecimento, 
              melhores e mais personalizadas serão as respostas do Oracle CIPE.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Preview de Resposta */}
      <Card className="glass-card border-2 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-purple-400" />
            <span>Preview de Resposta</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-sm text-slate-300 italic">
              "Olá! Sou o Oracle CIPE, sua inteligência artificial estratégica. Com base na 
              configuração <span className="text-blue-400">{config.personalidade}</span> e 
              tom <span className="text-green-400">{config.tomComunicacao}</span>, estou pronto 
              para auxiliar em <span className="text-purple-400">{config.especialidades.length} especialidades</span>: {' '}
              {config.especialidades.slice(0, 3).join(', ')}. 
              Meu objetivo é fornecer insights estratégicos precisos para sua campanha eleitoral."
            </p>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-center">
            <div className="p-2 bg-blue-500/10 rounded">
              <div className="text-blue-300 font-medium">Modelo</div>
              <div className="text-slate-400">{config.modeloPrincipal}</div>
            </div>
            <div className="p-2 bg-green-500/10 rounded">
              <div className="text-green-300 font-medium">Temperatura</div>
              <div className="text-slate-400">{config.temperatura.toFixed(1)}</div>
            </div>
            <div className="p-2 bg-purple-500/10 rounded">
              <div className="text-purple-300 font-medium">Max Tokens</div>
              <div className="text-slate-400">{config.maxTokens}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

