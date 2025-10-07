'use client';

import React from 'react';

interface FunilMobilizacaoProps {
  candidateId: string;
}

const FunilMobilizacao = ({ candidateId }: FunilMobilizacaoProps) => {
  return (
    <div className="h-full w-full space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Funil de Mobilização
        </h1>
        <p className="text-lg text-slate-300">
          Sistema integrado de relacionamento e conversão de eleitores
        </p>
      </div>
      
      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-5 border border-slate-700/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 font-medium">Total de Eleitores</p>
              <p className="text-2xl font-bold text-white">5,247</p>
              <p className="text-xs text-green-400">+89 hoje</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <span className="text-xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-5 border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 font-medium">Score Médio</p>
              <p className="text-2xl font-bold text-white">156</p>
              <p className="text-xs text-green-400">+12%</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <span className="text-xl">🎯</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-5 border border-slate-700/50 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 font-medium">Taxa de Conversão</p>
              <p className="text-2xl font-bold text-white">28%</p>
              <p className="text-xs text-green-400">+3.2%</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <span className="text-xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-xl p-5 border border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 font-medium">Conversas Hoje</p>
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-xs text-blue-400">+15%</p>
            </div>
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              <span className="text-xl">💬</span>
            </div>
          </div>
        </div>
      </div>

      {/* Funil de Conversão */}
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center">
            <span className="text-2xl mr-3">🎯</span>
            Funil de Conversão
          </h3>
          <p className="text-slate-400 text-sm">Jornada completa do eleitor</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
              <span className="text-white text-2xl">👥</span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Seguidores</h4>
            <p className="text-2xl font-bold text-slate-300 mb-2">1,247</p>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-slate-500 to-slate-400 h-2 rounded-full w-1/4"></div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/25">
              <span className="text-white text-2xl">✅</span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Apoiadores</h4>
            <p className="text-2xl font-bold text-blue-400 mb-2">2,156</p>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full w-1/2"></div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-purple-500/25">
              <span className="text-white text-2xl">⭐</span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Voluntários</h4>
            <p className="text-2xl font-bold text-purple-400 mb-2">1,089</p>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full w-3/4"></div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-green-500/25">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h4 className="text-sm font-semibold text-white mb-1">Embaixadores</h4>
            <p className="text-2xl font-bold text-green-400 mb-2">755</p>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Integração com 6 IAs */}
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center">
            <span className="text-2xl mr-3">🤖</span>
            Integração com 6 IAs da CIPE
          </h3>
          <p className="text-slate-400 text-sm">Inteligências especializadas trabalhando em sinergia</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 rounded-xl p-4 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">CD</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Clone Digital</h4>
                <p className="text-xs text-slate-400">Respostas personalizadas</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">Ativo</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">94%</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">CM</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Comunicação</h4>
                <p className="text-xs text-slate-400">Campanhas segmentadas</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">Ativo</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">91%</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 rounded-xl p-4 border border-slate-700/50 hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">BE</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Blindagem</h4>
                <p className="text-xs text-slate-400">Detecção de crises</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">Ativo</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">97%</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 rounded-xl p-4 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">NR</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Narrativa Regional</h4>
                <p className="text-xs text-slate-400">Mensagens localizadas</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">Ativo</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">89%</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 rounded-xl p-4 border border-slate-700/50 hover:border-yellow-500/30 transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">PA</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Pesquisas Auto</h4>
                <p className="text-xs text-slate-400">Análise de opinião</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">Ativo</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">92%</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 rounded-xl p-4 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">AA</span>
              </div>
              <div>
                <h4 className="text-white font-semibold">Análise Adversários</h4>
                <p className="text-xs text-slate-400">Monitoramento competitivo</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">Ativo</span>
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs font-medium">95%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Base de Eleitores */}
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center">
            <span className="text-2xl mr-3">👥</span>
            Base de Eleitores
          </h3>
          <p className="text-slate-400 text-sm">Eleitores ativos no sistema</p>
        </div>
        
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-slate-800/70 to-slate-900/70 rounded-xl p-4 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold">JS</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">João Silva</h4>
                  <p className="text-sm text-slate-400">+55 61 99999-9999 • Ceilândia Norte</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-xs text-slate-400">Score</p>
                  <p className="text-lg font-bold text-white">250</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Status</p>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">Embaixador</span>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Canal</p>
                  <span className="text-sm text-white">📱 WhatsApp</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                  Contatar
                </button>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <span className="bg-slate-600/50 text-slate-300 text-xs px-2 py-1 rounded-full">#segurança</span>
              <span className="bg-slate-600/50 text-slate-300 text-xs px-2 py-1 rounded-full">#liderança</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800/70 to-slate-900/70 rounded-xl p-4 border border-slate-700/50 hover:border-green-500/30 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <span className="text-white font-bold">MS</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Maria Santos</h4>
                  <p className="text-sm text-slate-400">+55 61 88888-8888 • Taguatinga</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <p className="text-xs text-slate-400">Score</p>
                  <p className="text-lg font-bold text-white">180</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Status</p>
                  <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-xs">Voluntário</span>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Canal</p>
                  <span className="text-sm text-white">✈️ Telegram</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                  Contatar
                </button>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <span className="bg-slate-600/50 text-slate-300 text-xs px-2 py-1 rounded-full">#saúde</span>
              <span className="bg-slate-600/50 text-slate-300 text-xs px-2 py-1 rounded-full">#mulheres</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunilMobilizacao;