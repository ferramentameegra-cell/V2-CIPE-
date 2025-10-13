'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Mic, MicOff, Volume2, Brain, MessageSquare
} from 'lucide-react';

interface ComandoVoz {
  id: string;
  comando: string;
  resposta: string;
  timestamp: Date;
  confianca: number;
  categoria: 'metrica' | 'insight' | 'acao' | 'navegacao';
}

export default function ComandosVoz() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [comandos, setComandos] = useState<ComandoVoz[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setIsSupported(true);
      
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        
        if (event.results[current].isFinal) {
          processarComando(transcript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Erro no reconhecimento de voz:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const iniciarEscuta = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const pararEscuta = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processarComando = async (comando: string) => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const resposta = gerarResposta(comando);
    
    const novoComando: ComandoVoz = {
      id: Date.now().toString(),
      comando,
      resposta,
      timestamp: new Date(),
      confianca: 85 + Math.floor(Math.random() * 15),
      categoria: categorizarComando(comando)
    };

    setComandos(prev => [novoComando, ...prev.slice(0, 4)]);
    setIsProcessing(false);
    
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(resposta);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const gerarResposta = (comando: string): string => {
    const comandoLower = comando.toLowerCase();
    
    if (comandoLower.includes('intenção') || comandoLower.includes('intencao de voto')) {
      return 'Sua intenção de voto atual é de 45,2%, com crescimento de 3,2% em relação ao mês anterior. Você está 9,4% à frente do segundo colocado.';
    }
    
    if (comandoLower.includes('zona leste') || comandoLower.includes('leste')) {
      return 'Na Zona Leste você tem 41,2% de intenção de voto, com 156 mil eleitores. Crescimento de 1,1% no período. Status: bom desempenho.';
    }
    
    if (comandoLower.includes('joão silva') || comandoLower.includes('adversário')) {
      return 'João Silva está em segundo lugar com 35,8%, queda de 1,1%. Ele tem forte presença na Zona Sul com 42% de intenção de voto.';
    }
    
    if (comandoLower.includes('embaixadores')) {
      return 'Você tem 89 embaixadores ativos de 120 total. Maria Silva lidera o ranking com 2.847 pontos e 12 comunidades WhatsApp.';
    }
    
    if (comandoLower.includes('alcance') || comandoLower.includes('digital')) {
      return 'Seu alcance digital semanal é de 285 mil pessoas, crescimento de 15,8%. Engajamento médio de 8,5% em todas as redes sociais.';
    }
    
    if (comandoLower.includes('oportunidade') || comandoLower.includes('insight')) {
      return 'Principal oportunidade: conteúdo sobre saúde pública tem 3x mais engajamento. Recomendo focar 40% do conteúdo desta semana neste tema.';
    }
    
    return 'Comando processado. Posso ajudar com informações sobre métricas, adversários, regiões ou insights estratégicos. Tente perguntar sobre intenção de voto, embaixadores ou oportunidades.';
  };

  const categorizarComando = (comando: string): ComandoVoz['categoria'] => {
    const comandoLower = comando.toLowerCase();
    
    if (comandoLower.includes('intenção') || comandoLower.includes('alcance') || comandoLower.includes('engajamento')) {
      return 'metrica';
    }
    
    if (comandoLower.includes('insight') || comandoLower.includes('oportunidade') || comandoLower.includes('recomend')) {
      return 'insight';
    }
    
    if (comandoLower.includes('criar') || comandoLower.includes('executar') || comandoLower.includes('implementar')) {
      return 'acao';
    }
    
    return 'navegacao';
  };

  const getCategoriaColor = (categoria: ComandoVoz['categoria']) => {
    switch (categoria) {
      case 'metrica': return 'bg-blue-500/20 text-blue-300';
      case 'insight': return 'bg-purple-500/20 text-purple-300';
      case 'acao': return 'bg-green-500/20 text-green-300';
      case 'navegacao': return 'bg-orange-500/20 text-orange-300';
    }
  };

  return (
    <div className="relative">
      {/* Efeito de fundo animado - Padrão Oracle CIPE */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10 rounded-2xl blur-xl"></div>
      
      <Card className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-blue-500/30 backdrop-blur-xl shadow-2xl shadow-blue-500/20">
        <CardContent className="p-6 space-y-4">
        {!isSupported ? (
          <div className="text-center">
            <MicOff className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-400">
              Comandos por voz não são suportados neste navegador
            </p>
          </div>
        ) : (
          <>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-300" />
            <span className="font-medium text-white">Oracle por Voz</span>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              IA CONVERSACIONAL
            </Badge>
          </div>
          
          <Button
            onClick={isListening ? pararEscuta : iniciarEscuta}
            disabled={isProcessing}
            className={`${
              isListening 
                ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 mr-2" />
                Parar
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 mr-2" />
                Falar
              </>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {(isListening || isProcessing) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-slate-800/60 rounded-lg border border-blue-500/20 backdrop-blur-sm"
            >
              {isListening && (
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-blue-400 rounded-full"
                        animate={{
                          height: [4, 16, 4],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-sm text-blue-300">Escutando...</p>
                    {transcript && (
                      <p className="text-sm text-white mt-1">&quot;{transcript}&quot;</p>
                    )}
                  </div>
                </div>
              )}

              {isProcessing && (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                  <p className="text-sm text-purple-300">Oracle processando...</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {comandos.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-slate-300">Histórico de Comandos</h3>
            
            {comandos.map((comando, index) => (
              <motion.div
                key={comando.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-slate-800/50 rounded-lg border border-purple-500/20 backdrop-blur-sm hover:border-cyan-500/25 transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-slate-400" />
                    <Badge className={getCategoriaColor(comando.categoria)}>
                      {comando.categoria.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500">
                    {comando.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-slate-400">Você perguntou:</p>
                    <p className="text-sm text-white">&quot;{comando.comando}&quot;</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-slate-400">Oracle respondeu:</p>
                    <p className="text-sm text-slate-300">{comando.resposta}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-600">
                  <span className="text-xs text-slate-500">
                    Confiança: {comando.confianca}%
                  </span>
                  <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                    <Volume2 className="w-3 h-3 mr-1" />
                    Repetir
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {comandos.length === 0 && (
          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
            <h4 className="text-sm font-medium text-slate-300 mb-3">💡 Experimente perguntar:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="space-y-1">
                <p className="text-slate-400">• &quot;Como está minha intenção de voto?&quot;</p>
                <p className="text-slate-400">• &quot;Como estou na Zona Leste?&quot;</p>
                <p className="text-slate-400">• &quot;Quais são as oportunidades?&quot;</p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400">• &quot;Como está o João Silva?&quot;</p>
                <p className="text-slate-400">• &quot;Status dos embaixadores&quot;</p>
                <p className="text-slate-400">• &quot;Qual meu alcance digital?&quot;</p>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </CardContent>
      </Card>
    </div>
  );
}

