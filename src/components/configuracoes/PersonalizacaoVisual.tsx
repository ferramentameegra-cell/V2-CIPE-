'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette, Monitor, Smartphone, Save, RotateCcw, Eye } from 'lucide-react';

const temasPartidos = {
  PT: { primaria: '#E21C21', secundaria: '#FFC72C', acento: '#FFFFFF' },
  PSDB: { primaria: '#0047AB', secundaria: '#1E90FF', acento: '#FFD700' },
  MDB: { primaria: '#008000', secundaria: '#90EE90', acento: '#FFFFFF' },
  PL: { primaria: '#00008B', secundaria: '#4169E1', acento: '#FFFFFF' },
  PSB: { primaria: '#FF8C00', secundaria: '#FFD700', acento: '#000000' },
  PSOL: { primaria: '#FFD700', secundaria: '#FF0000', acento: '#000000' },
  PDT: { primaria: '#FF6B6B', secundaria: '#4ECDC4', acento: '#FFFFFF' },
  UNIÃO: { primaria: '#00008B', secundaria: '#FFD700', acento: '#FFFFFF' },
  REPUBLICANOS: { primaria: '#0047AB', secundaria: '#87CEEB', acento: '#FFFFFF' },
  PP: { primaria: '#0000CD', secundaria: '#1E90FF', acento: '#FFFFFF' }
};

export default function PersonalizacaoVisual({ candidateId }: { candidateId: string }) {
  const [temaAtivo, setTemaAtivo] = useState('PSDB');
  const [cores, setCores] = useState({
    primaria: '#0047AB',
    secundaria: '#1E90FF',
    acento: '#FFD700',
    fundo: '#0F172A',
    texto: '#FFFFFF'
  });
  
  const [efeitos, setEfeitos] = useState({
    animacoes: true,
    glassmorphism: true,
    neonEffects: true,
    particulas: false,
    modoEscuro: true,
    contrasteAlto: false,
    reducaoMovimento: false
  });
  
  const [layout, setLayout] = useState({
    tamanhoFonte: 16,
    sidebarPosicao: 'ESQUERDA',
    headerTipo: 'FIXO'
  });

  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const aplicarTemaPartido = (partido: string) => {
    const tema = temasPartidos[partido as keyof typeof temasPartidos];
    if (tema) {
      setCores({ ...cores, ...tema });
      setTemaAtivo(partido);
    }
  };

  const resetarConfiguracoes = () => {
    aplicarTemaPartido('PSDB');
    setEfeitos({
      animacoes: true,
      glassmorphism: true,
      neonEffects: true,
      particulas: false,
      modoEscuro: true,
      contrasteAlto: false,
      reducaoMovimento: false
    });
    setLayout({
      tamanhoFonte: 16,
      sidebarPosicao: 'ESQUERDA',
      headerTipo: 'FIXO'
    });
  };

  const salvarConfiguracoes = () => {
    console.log('Salvando configurações visuais:', { cores, efeitos, layout });
    // Aqui iria a chamada à API
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Personalização Visual</h2>
          <p className="text-slate-400 mt-1">Customize cores, layout e identidade visual do sistema</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={resetarConfiguracoes}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Resetar
          </Button>
          <Button className="bg-green-600 hover:bg-green-700" onClick={salvarConfiguracoes}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Configurações */}
        <div className="space-y-6">
          {/* Temas por Partido */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-blue-400" />
                <span>Temas por Partido</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(temasPartidos).map((partido) => {
                  const tema = temasPartidos[partido as keyof typeof temasPartidos];
                  return (
                    <Button
                      key={partido}
                      variant={temaAtivo === partido ? 'default' : 'outline'}
                      onClick={() => aplicarTemaPartido(partido)}
                      className="h-20 flex-col space-y-2"
                    >
                      <div className="flex space-x-1">
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: tema.primaria }} />
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: tema.secundaria }} />
                        <div className="w-6 h-6 rounded" style={{ backgroundColor: tema.acento }} />
                      </div>
                      <span className="text-xs font-medium">{partido}</span>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Cores Personalizadas */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Cores Personalizadas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(cores).map(([chave, valor]) => (
                <div key={chave} className="flex items-center justify-between">
                  <label className="text-sm text-slate-300 capitalize">{chave}</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="color"
                      value={valor}
                      onChange={(e) => setCores({ ...cores, [chave]: e.target.value })}
                      className="w-12 h-8 rounded cursor-pointer"
                    />
                    <span className="text-xs text-slate-400 font-mono">{valor}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Efeitos Visuais */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Efeitos Visuais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(efeitos).map(([chave, valor]) => (
                <div key={chave} className="flex items-center justify-between">
                  <label className="text-sm text-slate-300">
                    {chave === 'animacoes' && 'Animações'}
                    {chave === 'glassmorphism' && 'Glassmorphism'}
                    {chave === 'neonEffects' && 'Efeitos Neon'}
                    {chave === 'particulas' && 'Partículas'}
                    {chave === 'modoEscuro' && 'Modo Escuro'}
                    {chave === 'contrasteAlto' && 'Contraste Alto'}
                    {chave === 'reducaoMovimento' && 'Redução de Movimento'}
                  </label>
                  <Switch
                    checked={valor}
                    onCheckedChange={(checked) => setEfeitos({ ...efeitos, [chave]: checked })}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Layout */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Layout</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-2 block">
                  Tamanho da Fonte: {layout.tamanhoFonte}px
                </label>
                <Slider
                  value={[layout.tamanhoFonte]}
                  onValueChange={(v) => setLayout({ ...layout, tamanhoFonte: v[0] })}
                  min={12}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Posição da Sidebar</label>
                <Select 
                  value={layout.sidebarPosicao} 
                  onValueChange={(v) => setLayout({ ...layout, sidebarPosicao: v })}
                >
                  <SelectTrigger className="bg-slate-800/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ESQUERDA">Esquerda</SelectItem>
                    <SelectItem value="DIREITA">Direita</SelectItem>
                    <SelectItem value="OCULTA">Oculta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-slate-400 mb-2 block">Tipo de Header</label>
                <Select 
                  value={layout.headerTipo} 
                  onValueChange={(v) => setLayout({ ...layout, headerTipo: v })}
                >
                  <SelectTrigger className="bg-slate-800/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FIXO">Fixo</SelectItem>
                    <SelectItem value="FLUTUANTE">Flutuante</SelectItem>
                    <SelectItem value="OCULTO">Oculto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-green-400" />
                  <span>Preview em Tempo Real</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={previewMode === 'desktop' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('desktop')}
                  >
                    <Monitor className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={previewMode === 'mobile' ? 'default' : 'outline'}
                    onClick={() => setPreviewMode('mobile')}
                  >
                    <Smartphone className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className={`border-4 border-slate-600 rounded-lg overflow-hidden ${
                  previewMode === 'mobile' ? 'max-w-[375px] mx-auto' : 'w-full'
                }`}
                style={{ 
                  backgroundColor: cores.fundo,
                  fontSize: `${layout.tamanhoFonte}px`
                }}
              >
                {/* Miniatura do Dashboard */}
                <div className="p-4 space-y-3">
                  {/* Header */}
                  <div 
                    className="h-12 rounded-lg flex items-center justify-between px-4"
                    style={{ 
                      backgroundColor: cores.primaria,
                      color: cores.texto
                    }}
                  >
                    <span className="font-bold">CIPE Dashboard</span>
                    <div className="flex space-x-2">
                      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: cores.acento }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        animate={efeitos.animacoes ? { scale: [1, 1.02, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="p-4 rounded-lg text-center"
                        style={{
                          backgroundColor: `${cores.primaria}20`,
                          border: `1px solid ${cores.primaria}40`,
                          backdropFilter: efeitos.glassmorphism ? 'blur(10px)' : 'none'
                        }}
                      >
                        <div 
                          className="text-2xl font-bold mb-1"
                          style={{ 
                            color: cores.secundaria,
                            textShadow: efeitos.neonEffects ? `0 0 10px ${cores.secundaria}` : 'none'
                          }}
                        >
                          {i * 234}
                        </div>
                        <div className="text-xs" style={{ color: cores.texto }}>
                          Métrica {i}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chart Preview */}
                  <div 
                    className="h-32 rounded-lg flex items-end justify-around p-4"
                    style={{
                      backgroundColor: `${cores.primaria}10`,
                      border: `1px solid ${cores.primaria}30`
                    }}
                  >
                    {[40, 70, 50, 90, 60].map((height, i) => (
                      <div
                        key={i}
                        className="w-8 rounded-t"
                        style={{
                          height: `${height}%`,
                          backgroundColor: cores.secundaria,
                          boxShadow: efeitos.neonEffects ? `0 0 15px ${cores.secundaria}` : 'none'
                        }}
                      />
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-2">
                    <button
                      className="flex-1 py-2 rounded-lg font-medium"
                      style={{
                        backgroundColor: cores.primaria,
                        color: cores.texto,
                        boxShadow: efeitos.neonEffects ? `0 0 20px ${cores.primaria}` : 'none'
                      }}
                    >
                      Primário
                    </button>
                    <button
                      className="flex-1 py-2 rounded-lg font-medium"
                      style={{
                        backgroundColor: cores.secundaria,
                        color: cores.texto
                      }}
                    >
                      Secundário
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-300">
              <p>✅ Preview atualiza em tempo real</p>
              <p>✅ Todas as mudanças são aplicadas ao dashboard</p>
              <p>✅ Configurações salvas no perfil do candidato</p>
              <p>✅ Temas otimizados para cada partido político</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

