'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText, AlertTriangle, CheckCircle, TrendingUp, Target } from 'lucide-react';
import { analisarConsistencia } from '@/lib/blindagem/consistencia-mensagem';
import { motion } from 'framer-motion';

interface AnaliseConsistenciaProps {
  candidateId: string;
}

export default function AnaliseConsistencia({ candidateId }: AnaliseConsistenciaProps) {
  const [texto, setTexto] = useState('');
  const [analisando, setAnalisando] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [arquivo, setArquivo] = useState<File | null>(null);

  // Argumentos oficiais do banco ADI (simulado - em produção viria da API)
  const argumentosOficiais = [
    { tema: 'educação', resposta: 'Nossa proposta é investir em educação pública de qualidade através de parcerias público-privadas focadas em eficiência e resultados mensuráveis' },
    { tema: 'saúde', resposta: 'Vamos implementar um sistema de saúde universal acessível, com foco em prevenção e tecnologia para melhorar a qualidade do atendimento' },
    { tema: 'segurança', resposta: 'Nossa estratégia de segurança pública combina inteligência policial, tecnologia e integração entre forças federais, estaduais e municipais' },
    { tema: 'economia', resposta: 'Promoveremos o crescimento econômico sustentável através de incentivos fiscais para pequenas empresas e investimento em infraestrutura' }
  ];

  const handleAnalisar = async () => {
    if (!texto.trim() && !arquivo) return;

    setAnalisando(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Se tiver arquivo, ler conteúdo (simulação)
    let textoParaAnalisar = texto;
    if (arquivo) {
      // Em produção, ler arquivo real
      textoParaAnalisar = texto || 'Conteúdo do arquivo será processado aqui...';
    }

    const resultadoAnalise = analisarConsistencia(textoParaAnalisar, argumentosOficiais);
    
    setResultado(resultadoAnalise);
    setAnalisando(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArquivo(file);
      // Ler conteúdo do arquivo (simulação)
      const reader = new FileReader();
      reader.onload = (event) => {
        setTexto(event.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          Análise de Consistência da Mensagem
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Compare discursos, entrevistas e textos com o Banco de Argumentos oficial (ADI)
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Inserir Texto para Análise
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Upload de Arquivo */}
            <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center cursor-pointer hover:border-white/40 transition-colors">
              <Upload className="w-8 h-8 text-white/50 mx-auto mb-2" />
              <div className="text-white/70 text-sm mb-2">Arraste um arquivo de transcrição</div>
              <div className="text-white/50 text-xs mb-3">ou clique para selecionar</div>
              <input
                type="file"
                accept=".txt,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="text-xs" asChild>
                  <span>Selecionar Arquivo</span>
                </Button>
              </label>
              {arquivo && (
                <div className="mt-2 text-xs text-green-400">
                  ✓ {arquivo.name}
                </div>
              )}
            </div>

            <div className="text-center text-xs text-white/50">ou</div>

            {/* Textarea */}
            <Textarea
              placeholder="Cole aqui o texto do discurso, transcrição de entrevista ou resposta para análise..."
              className="min-h-[300px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />

            <div className="flex items-center justify-between text-xs text-white/60">
              <span>{texto.length} caracteres</span>
              <span>Mínimo: 100 caracteres</span>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleAnalisar}
              disabled={(!texto.trim() && !arquivo) || analisando || texto.length < 100}
            >
              {analisando ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analisando...
                </>
              ) : (
                <>
                  <Target className="w-4 h-4 mr-2" />
                  Analisar Consistência
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Resultado */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Resultado da Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!resultado ? (
              <div className="h-[400px] flex items-center justify-center text-white/50">
                <div className="text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <div>Insira um texto para análise</div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Score de Consistência */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30"
                >
                  <div className="text-4xl font-bold text-white mb-2">
                    {resultado.scoreConsistencia.toFixed(0)}
                  </div>
                  <div className="text-white/70 text-sm mb-4">Score de Consistência</div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${resultado.scoreConsistencia}%` }}
                      transition={{ duration: 1 }}
                      className={`h-2 rounded-full ${
                        resultado.scoreConsistencia >= 80
                          ? 'bg-green-500'
                          : resultado.scoreConsistencia >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                  </div>
                  <Badge
                    className={`mt-3 ${
                      resultado.scoreConsistencia >= 80
                        ? 'bg-green-500'
                        : resultado.scoreConsistencia >= 60
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {resultado.scoreConsistencia >= 80
                      ? 'Excelente Consistência'
                      : resultado.scoreConsistencia >= 60
                      ? 'Consistência Média'
                      : 'Consistência Baixa'}
                  </Badge>
                </motion.div>

                {/* Pontos Coerentes */}
                {resultado.pontosCoerentess.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white font-semibold">
                        Pontos Coerentes ({resultado.pontosCoerentess.length})
                      </span>
                    </div>
                    <div className="space-y-2">
                      {resultado.pontosCoerentess.map((ponto: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                        >
                          <div className="text-sm text-green-200">{ponto}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Desvios */}
                {resultado.desvios.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-semibold">
                        Desvios Detectados ({resultado.desvios.length})
                      </span>
                    </div>
                    <div className="space-y-3">
                      {resultado.desvios.map((desvio: any, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="text-sm text-red-200 font-semibold">{desvio.trecho}</div>
                            <Badge
                              className={`${
                                desvio.gravidade === 'alta'
                                  ? 'bg-red-500'
                                  : desvio.gravidade === 'media'
                                  ? 'bg-yellow-500'
                                  : 'bg-orange-500'
                              }`}
                            >
                              {desvio.gravidade.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="text-xs text-white/60 mt-2">
                            <div className="font-semibold mb-1">Argumento Oficial:</div>
                            <div className="text-white/80">{desvio.argumentoOficial}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recomendações */}
                {resultado.recomendacoes.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4 text-blue-400" />
                      <span className="text-white font-semibold">Recomendações</span>
                    </div>
                    <div className="space-y-2">
                      {resultado.recomendacoes.map((rec: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                        >
                          <div className="text-sm text-blue-200">• {rec}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

