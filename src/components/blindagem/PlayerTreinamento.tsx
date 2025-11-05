'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, VolumeX, Maximize, BookOpen, Clock, CheckCircle, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface MediaTrainingAsset {
  id: string;
  titulo: string;
  descricao: string;
  urlVideo: string;
  categoria: string;
  duracao: number; // em minutos
  assistido?: boolean;
  progresso?: number; // 0-100
}

interface PlayerTreinamentoProps {
  candidateId: string;
}

export default function PlayerTreinamento({ candidateId }: PlayerTreinamentoProps) {
  const [videos, setVideos] = useState<MediaTrainingAsset[]>([
    {
      id: '1',
      titulo: 'Como Gerenciar Perguntas Difíceis',
      descricao: 'Técnicas avançadas para responder perguntas complexas sem perder o foco da mensagem.',
      urlVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Exemplo
      categoria: 'Comunicação',
      duracao: 15,
      assistido: false,
      progresso: 0
    },
    {
      id: '2',
      titulo: 'Linguagem Corporal em Entrevistas',
      descricao: 'Como usar gestos, postura e contato visual para transmitir confiança e autoridade.',
      urlVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      categoria: 'Oratória',
      duracao: 12,
      assistido: true,
      progresso: 100
    },
    {
      id: '3',
      titulo: 'Gestão de Crises na Mídia',
      descricao: 'Como responder a crises e controvérsias de forma eficaz e manter a credibilidade.',
      urlVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      categoria: 'Crises',
      duracao: 20,
      assistido: false,
      progresso: 45
    },
    {
      id: '4',
      titulo: 'Técnicas de Persuasão',
      descricao: 'Como estruturar argumentos de forma persuasiva e influenciar opiniões.',
      urlVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      categoria: 'Persuasão',
      duracao: 18,
      assistido: false,
      progresso: 0
    }
  ]);

  const [videoSelecionado, setVideoSelecionado] = useState<MediaTrainingAsset | null>(videos[0]);
  const [reproduzindo, setReproduzindo] = useState(false);
  const [volume, setVolume] = useState(100);
  const [mudo, setMudo] = useState(false);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [telaCheia, setTelaCheia] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Calcular progresso geral
  const progressoGeral = videos.reduce((acc, v) => acc + (v.progresso || 0), 0) / videos.length;
  const videosAssistidos = videos.filter(v => v.assistido).length;

  const handleSelecionarVideo = (video: MediaTrainingAsset) => {
    setVideoSelecionado(video);
    setTempoAtual(0);
    setReproduzindo(false);
  };

  const handlePlayPause = () => {
    setReproduzindo(!reproduzindo);
    // Em produção, controlar player do YouTube/Vimeo via API
  };

  const handleTempoAtualizado = (tempo: number) => {
    if (!videoSelecionado) return;
    
    setTempoAtual(tempo);
    const novoProgresso = (tempo / (videoSelecionado.duracao * 60)) * 100;
    
    // Atualizar progresso no array
    setVideos(prev => prev.map(v => 
      v.id === videoSelecionado.id 
        ? { ...v, progresso: Math.min(100, novoProgresso), assistido: novoProgresso >= 95 }
        : v
    ));
  };

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = Math.floor(segundos % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          Biblioteca de Media Training
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Vídeos de treinamento para aprimorar suas habilidades de comunicação e oratória
        </p>
      </div>

      {/* Progresso Geral */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white font-semibold text-lg">Progresso do Treinamento</div>
              <div className="text-sm text-white/60">
                {videosAssistidos} de {videos.length} vídeos assistidos
              </div>
            </div>
            <Badge className="bg-blue-500 text-lg px-4 py-2">
              {progressoGeral.toFixed(0)}%
            </Badge>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressoGeral}%` }}
              transition={{ duration: 1 }}
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Vídeos */}
        <div className="lg:col-span-1">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-white text-lg">Vídeos Disponíveis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg cursor-pointer border transition-all ${
                    videoSelecionado?.id === video.id
                      ? 'bg-blue-500/20 border-blue-500'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  onClick={() => handleSelecionarVideo(video)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-16 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded flex items-center justify-center">
                        <PlayCircle className="w-6 h-6 text-white" />
                      </div>
                      {video.assistido && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-semibold mb-1 line-clamp-2">
                        {video.titulo}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="text-xs bg-purple-500">{video.categoria}</Badge>
                        <div className="flex items-center gap-1 text-xs text-white/60">
                          <Clock className="w-3 h-3" />
                          {video.duracao} min
                        </div>
                      </div>
                      {video.progresso && video.progresso > 0 && (
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-blue-500"
                            style={{ width: `${video.progresso}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Player */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardContent className="p-0">
              {videoSelecionado ? (
                <>
                  {/* Vídeo */}
                  <div className="relative bg-black rounded-t-lg overflow-hidden aspect-video">
                    <iframe
                      ref={videoRef}
                      src={videoSelecionado.urlVideo}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Controles */}
                  <div className="p-4 space-y-4">
                    {/* Informações */}
                    <div>
                      <div className="text-white font-semibold text-lg mb-2">
                        {videoSelecionado.titulo}
                      </div>
                      <div className="text-sm text-white/70 mb-3">
                        {videoSelecionado.descricao}
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-purple-500">{videoSelecionado.categoria}</Badge>
                        <div className="flex items-center gap-1 text-xs text-white/60">
                          <Clock className="w-3 h-3" />
                          {videoSelecionado.duracao} minutos
                        </div>
                        {videoSelecionado.assistido && (
                          <Badge className="bg-green-500">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Assistido
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Barra de Progresso */}
                    <div>
                      <div className="w-full bg-white/10 rounded-full h-2 cursor-pointer">
                        <motion.div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${videoSelecionado.progresso || 0}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-white/60 mt-1">
                        <span>{formatarTempo(tempoAtual)}</span>
                        <span>{videoSelecionado.duracao}:00</span>
                      </div>
                    </div>

                    {/* Controles de Reprodução */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handlePlayPause}
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          {reproduzindo ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setMudo(!mudo)}
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          {mudo ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </Button>
                        <div className="text-xs text-white/60">
                          {volume}%
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTelaCheia(!telaCheia)}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Notas de Aprendizado */}
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="text-sm font-semibold text-blue-300 mb-2">
                        💡 Dica de Aprendizado
                      </div>
                      <div className="text-xs text-white/80">
                        {videoSelecionado.categoria === 'Comunicação' &&
                          'Pratique pausas estratégicas para enfatizar pontos importantes.'}
                        {videoSelecionado.categoria === 'Oratória' &&
                          'Mantenha contato visual com 60-70% do tempo com a audiência.'}
                        {videoSelecionado.categoria === 'Crises' &&
                          'Reconheça problemas rapidamente e apresente soluções claras.'}
                        {videoSelecionado.categoria === 'Persuasão' &&
                          'Use dados concretos e histórias para tornar argumentos mais convincentes.'}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-12 text-center text-white/50">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <div>Selecione um vídeo para assistir</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

