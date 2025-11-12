'use client';

import { useState } from 'react';
import { TrendingUp, TrendingDown, BookOpen, BarChart3, Coins, GraduationCap, Menu, X, User } from 'lucide-react';
import { MarketOverview } from './components/MarketOverview';
import { CryptoAnalysis } from './components/CryptoAnalysis';
import { PlatformRecommendations } from './components/PlatformRecommendations';
import { EducationalHub } from './components/EducationalHub';
import { PersonalPortfolio } from './components/PersonalPortfolio';
import { PortfolioConfigurator } from './components/PortfolioConfigurator';
import { mockMarketData } from '@/lib/mock-data';

type Tab = 'portfolio' | 'market' | 'analysis' | 'platforms' | 'education';

export default function CryptoAnalysisApp() {
  const [activeTab, setActiveTab] = useState<Tab>('portfolio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConfigurator, setShowConfigurator] = useState(false);

  const tabs = [
    { id: 'portfolio' as Tab, name: 'Meu Portfólio', icon: User },
    { id: 'market' as Tab, name: 'Mercado', icon: BarChart3 },
    { id: 'analysis' as Tab, name: 'Análises', icon: TrendingUp },
    { id: 'platforms' as Tab, name: 'Plataformas', icon: Coins },
    { id: 'education' as Tab, name: 'Educação', icon: GraduationCap },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return (
          <PersonalPortfolio 
            onConfigurePortfolio={() => setShowConfigurator(true)}
          />
        );
      case 'market':
        return <MarketOverview />;
      case 'analysis':
        return <CryptoAnalysis />;
      case 'platforms':
        return <PlatformRecommendations />;
      case 'education':
        return <EducationalHub />;
      default:
        return (
          <PersonalPortfolio 
            onConfigurePortfolio={() => setShowConfigurator(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CryptoAnalyzer</h1>
                <p className="text-xs text-purple-300">Personalizado para Você</p>
              </div>
            </div>

            {/* Market Stats */}
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="text-center">
                <p className="text-gray-400">Market Cap</p>
                <p className="text-white font-semibold">
                  ${(mockMarketData.totalMarketCap / 1e12).toFixed(2)}T
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">Fear & Greed</p>
                <p className={`font-semibold ${mockMarketData.fearGreedIndex > 50 ? 'text-green-400' : 'text-red-400'}`}>
                  {mockMarketData.fearGreedIndex}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400">BTC Dom</p>
                <p className="text-white font-semibold">{mockMarketData.btcDominance}%</p>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className={`bg-black/10 backdrop-blur-sm border-b border-purple-500/10 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:space-x-8 py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 mb-2 md:mb-0 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.name}</span>
                  {tab.id === 'portfolio' && (
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Portfolio Configurator Modal */}
      {showConfigurator && (
        <PortfolioConfigurator
          onClose={() => setShowConfigurator(false)}
          onSave={(favorites) => {
            // A persistência já é feita no componente
            setShowConfigurator(false);
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-purple-500/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              ⚠️ Este app é apenas para fins educacionais. Sempre faça sua própria pesquisa antes de investir.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Dados são simulados para demonstração. Use APIs reais em produção.
            </p>
            <div className="mt-4 flex justify-center items-center space-x-4 text-xs text-gray-500">
              <span>🎯 Portfólio Personalizado</span>
              <span>•</span>
              <span>📊 Análises em Tempo Real</span>
              <span>•</span>
              <span>🎓 Educação Crypto</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}