'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, Eye, EyeOff, Shield, Zap, Users } from 'lucide-react';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '', 
    twoFactor: '' 
  });
  const [step, setStep] = useState<'login' | '2fa'>('login');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular autenticação (aceita qualquer credencial para demo)
    setTimeout(() => {
      setStep('2fa');
      setLoading(false);
    }, 1500);
  };

  const handle2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular 2FA (aceita qualquer código para demo)
    setTimeout(() => {
      // Redirecionar para dashboard
      router.push('/dashboard/1014'); // Ronaldo Nogueira - 1014
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #0066FF 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #6366F1 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, #06B6D4 0%, transparent 50%)`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-40 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-20 w-5 h-5 bg-blue-300 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.5s' }}></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo e Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 shadow-2xl">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              CIPE
            </h1>
            <p className="text-slate-300 text-lg">Centro de Inteligência Política e Eleitoral</p>
            <div className="flex justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-1 px-3 py-1 bg-green-500/20 rounded-full">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-green-400 text-sm font-medium">Seguro</span>
              </div>
              <div className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 rounded-full">
                <Zap className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 text-sm font-medium">Inteligente</span>
              </div>
              <div className="flex items-center space-x-1 px-3 py-1 bg-purple-500/20 rounded-full">
                <Users className="h-4 w-4 text-purple-400" />
                <span className="text-purple-400 text-sm font-medium">Profissional</span>
              </div>
            </div>
          </div>

          {/* Card de Login */}
          <div className="glass-card p-8">
            {step === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Sua senha"
                      value={credentials.password}
                      onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                      className="w-full px-4 py-3 pr-12 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Verificando...
                    </div>
                  ) : (
                    'Acessar Sistema'
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handle2FA} className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Verificação em Duas Etapas</h3>
                  <p className="text-slate-400 text-sm">
                    Digite o código de verificação enviado para seu dispositivo
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Código de Verificação
                  </label>
                  <input
                    type="text"
                    placeholder="000000"
                    value={credentials.twoFactor}
                    onChange={(e) => setCredentials({...credentials, twoFactor: e.target.value})}
                    className="w-full px-4 py-3 text-center text-2xl tracking-widest bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    maxLength={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Verificando...
                    </div>
                  ) : (
                    'Confirmar Acesso'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="w-full text-slate-400 hover:text-white text-sm transition-colors"
                >
                  ← Voltar ao login
                </button>
              </form>
            )}
          </div>

          {/* Status do Sistema */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Sistema Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
