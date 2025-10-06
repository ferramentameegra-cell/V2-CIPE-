'use client';

import { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Eye,
  Bell,
  Search,
  Menu,
  Brain,
  AlertTriangle,
  Target,
  Calendar,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';

// Dados mockados baseados no modelo
const yearlyData = [
  { year: '2024', value: 33358 },
  { year: '2025', value: 36358 }
];

const monthlyData = [
  { month: 'Jan', value: 5820 },
  { month: 'Feb', value: 6200 },
  { month: 'Mar', value: 6820 },
  { month: 'Apr', value: 7100 },
  { month: 'May', value: 7500 },
  { month: 'Jun', value: 6800 }
];

const pieData = [
  { name: 'Desktop', value: 400, color: '#8884d8' },
  { name: 'Mobile', value: 300, color: '#82ca9d' },
  { name: 'Tablet', value: 200, color: '#ffc658' }
];

const transactions = [
  { time: '09:30 am', description: 'Payment received from John Doe', amount: '$385.90', type: 'credit' },
  { time: '10:00 am', description: 'New sale recorded #ML-3467', amount: '', type: 'info' },
  { time: '12:00 am', description: 'Payment was made of $64.95 to Michael', amount: '$64.95', type: 'debit' },
  { time: '09:30 am', description: 'New sale recorded #ML-3467', amount: '', type: 'info' },
  { time: '09:30 am', description: 'New arrival recorded', amount: '', type: 'info' },
  { time: '12:00 am', description: 'Payment Received', amount: '', type: 'info' }
];

const products = [
  { id: 1, name: 'Boat Headphone', originalPrice: '$375', salePrice: '$285' },
  { id: 2, name: 'MacBook Air Pro', originalPrice: '$650', salePrice: '$900' },
  { id: 3, name: 'Red Valvet Dress', originalPrice: '$150', salePrice: '$200' },
  { id: 4, name: 'Cute Soft Teddybear', originalPrice: '$285', salePrice: '$345' }
];

const tableData = [
  { id: 1, assigned: 'Sunil Joshi', role: 'Web Designer', project: 'Elite Admin', priority: 'Low', budget: '$3.9k' },
  { id: 2, assigned: 'Andrew McDownland', role: 'Project Manager', project: 'Real Homes WP Theme', priority: 'Medium', budget: '$24.5k' },
  { id: 3, assigned: 'Christopher Jamil', role: 'Project Manager', project: 'MedicalPro WP Theme', priority: 'High', budget: '$12.8k' },
  { id: 4, assigned: 'Nirav Joshi', role: 'Frontend Engineer', project: 'Hosting Press HTML', priority: 'Critical', budget: '$2.4k' }
];

export default function Dashboard({ params }: { params: { candidateId: string } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [metrics, setMetrics] = useState({
    totalEleitores: 89432,
    intencaoVoto: 28,
    engajamento: 67,
    alcanceRedes: 245000,
    orcamentoUsado: 65,
    diasRestantes: 127
  });

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md hover:bg-slate-700 transition-colors lg:hidden"
              >
                <Menu className="h-5 w-5 text-slate-300" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">CIPE</h1>
                  <p className="text-sm text-slate-400">Ronaldo Nogueira - Deputado Federal - 1014</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar..." 
                  className="pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <button className="p-2 rounded-md hover:bg-slate-700 transition-colors relative">
                <Bell className="h-5 w-5 text-slate-300" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">RN</span>
                </div>
                <span className="text-slate-300 hidden md:block">Ronaldo Nogueira</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`bg-slate-800/50 backdrop-blur-lg border-r border-slate-700 h-screen w-64 fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 z-40`}>
          <div className="p-6">
            {/* Perfil do Candidato */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">RN</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">Ronaldo Nogueira</h3>
                  <p className="text-slate-400 text-sm">Deputado Federal</p>
                  <p className="text-slate-500 text-xs">Nº 1014</p>
                </div>
              </div>
            </div>

            {/* Navegação */}
            <nav className="space-y-2">
              <a href="#" className="flex items-center space-x-3 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30">
                <BarChart3 className="h-5 w-5" />
                <span>Dashboard</span>
              </a>
              
              <div className="pt-4">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Inteligência</h4>
                <div className="space-y-1">
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Sala de Guerra</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Target className="h-4 w-4" />
                    <span>Waze Eleitoral</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Radar de Crises</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <TrendingUp className="h-4 w-4" />
                    <span>Funil de Mobilização</span>
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Arsenal de IA</h4>
                <div className="space-y-1">
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Brain className="h-4 w-4" />
                    <span>Central de IAs</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Users className="h-4 w-4" />
                    <span>Clone Digital</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Settings className="h-4 w-4" />
                    <span>Blindagem</span>
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Eleitores</h4>
                <div className="space-y-1">
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Users className="h-4 w-4" />
                    <span>CRM Eleitoral</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Target className="h-4 w-4" />
                    <span>Segmentação</span>
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Digital</h4>
                <div className="space-y-1">
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <ShoppingCart className="h-4 w-4" />
                    <span>Redes Sociais</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <DollarSign className="h-4 w-4" />
                    <span>Email Marketing</span>
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Performance</h4>
                <div className="space-y-1">
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <BarChart3 className="h-4 w-4" />
                    <span>Relatórios</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <DollarSign className="h-4 w-4" />
                    <span>Orçamento & ROI</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-700 rounded-lg transition-colors">
                    <Calendar className="h-4 w-4" />
                    <span>Calendário</span>
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-6">
            {/* Oracle CIPE */}
            <div className="mb-8">
              <div className="glass-card p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Brain className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Oracle CIPE</h2>
                    <p className="text-slate-400">Como posso ajudar hoje?</p>
                  </div>
                </div>
                <div className="flex space-x-2 mb-4">
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
                    Como estão as métricas gerais da campanha?
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
                    Qual o resumo do desempenho hoje?
                  </button>
                  <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm transition-colors">
                    Preciso de insights sobre tendências
                  </button>
                </div>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Digite sua pergunta..." 
                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all">
                    Enviar
                  </button>
                </div>
              </div>
            </div>

            {/* Contagem Regressiva */}
            <div className="mb-8">
              <div className="glass-card p-6">
                <div className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {metrics.diasRestantes} DIAS
                  </div>
                  <p className="text-slate-400">para as eleições</p>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: `${(365 - metrics.diasRestantes) / 365 * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Métricas Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Intenção de Voto</p>
                    <p className="text-2xl font-bold text-white">{metrics.intencaoVoto}%</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">+2.3%</span>
                    </div>
                  </div>
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total de Eleitores</p>
                    <p className="text-2xl font-bold text-white">{metrics.totalEleitores.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">+1.2K</span>
                    </div>
                  </div>
                  <Users className="h-8 w-8 text-green-400" />
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Engajamento</p>
                    <p className="text-2xl font-bold text-white">{metrics.engajamento}%</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">+3.1%</span>
                    </div>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
              </div>

              <div className="glass-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Orçamento Usado</p>
                    <p className="text-2xl font-bold text-white">{metrics.orcamentoUsado}%</p>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: `${metrics.orcamentoUsado}%` }}></div>
                    </div>
                  </div>
                  <Calendar className="h-8 w-8 text-cyan-400" />
                </div>
              </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Tendência de Intenção de Voto */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Tendência de Intenção de Voto</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#0066FF" 
                      fill="url(#gradientIntencao)" 
                    />
                    <defs>
                      <linearGradient id="gradientIntencao" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0066FF" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Segmentação de Eleitores */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Segmentação de Eleitores</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Transactions and Product Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Recent Transactions */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Transações Recentes</h3>
                <div className="space-y-4">
                  {transactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          transaction.type === 'credit' ? 'bg-green-500' : 
                          transaction.type === 'debit' ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                        <div>
                          <p className="text-sm text-white">{transaction.description}</p>
                          <p className="text-xs text-slate-400">{transaction.time}</p>
                        </div>
                      </div>
                      {transaction.amount && (
                        <span className={`text-sm font-medium ${
                          transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {transaction.amount}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Performance */}
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Performance de Produtos</h3>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-b-0">
                      <div>
                        <p className="text-sm font-medium text-white">{product.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-slate-400 line-through">{product.originalPrice}</span>
                          <span className="text-sm font-semibold text-white">{product.salePrice}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Performance Table */}
            <div className="glass-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Performance de Projetos</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 font-medium text-slate-400">Id</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-400">Assigned</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-400">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-400">Priority</th>
                        <th className="text-left py-3 px-4 font-medium text-slate-400">Budget</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((row) => (
                        <tr key={row.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                          <td className="py-3 px-4 text-sm text-white">{row.id}</td>
                          <td className="py-3 px-4 text-sm text-white">
                            <div>
                              <p className="font-medium">{row.assigned}</p>
                              <p className="text-slate-400 text-xs">{row.role}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-white">{row.project}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              row.priority === 'Low' ? 'bg-green-500/20 text-green-400' :
                              row.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              row.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {row.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-white">{row.budget}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
