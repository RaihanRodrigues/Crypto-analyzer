'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Target, Clock, Calendar, DollarSign } from 'lucide-react';
import { mockCryptoData } from '@/lib/mock-data';

export function CryptoAnalysis() {
  const [selectedCoin, setSelectedCoin] = useState(mockCryptoData[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getAnalysisColor = (analysis: string) => {
    switch (analysis) {
      case 'BUY': return 'text-green-400 bg-green-500/20';
      case 'SELL': return 'text-red-400 bg-red-500/20';
      case 'HOLD': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getAnalysisIcon = (analysis: string) => {
    switch (analysis) {
      case 'BUY': return <TrendingUp className="w-4 h-4" />;
      case 'SELL': return <TrendingDown className="w-4 h-4" />;
      case 'HOLD': return <Minus className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const formatNumber = (num: number, decimals: number = 2) => {
    return num.toFixed(decimals);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  if (!mounted) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Análises Detalhadas</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Análises técnicas e fundamentais com projeções de curto, médio e longo prazo baseadas em algoritmos avançados
        </p>
      </div>

      {/* Coin Selector */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-4">Selecione uma Criptomoeda</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {mockCryptoData.map((coin) => (
            <button
              key={coin.id}
              onClick={() => setSelectedCoin(coin)}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                selectedCoin.id === coin.id
                  ? 'border-purple-500 bg-purple-500/20'
                  : 'border-gray-600 bg-white/5 hover:border-purple-400 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center space-x-3">
                <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{coin.symbol.toUpperCase()}</p>
                  <p className="text-gray-400 text-xs">{coin.name}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Coin Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coin Info */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <div className="text-center mb-6">
              <img src={selectedCoin.image} alt={selectedCoin.name} className="w-16 h-16 rounded-full mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white">{selectedCoin.name}</h3>
              <p className="text-gray-400">{selectedCoin.symbol.toUpperCase()}</p>
              <p className="text-3xl font-bold text-white mt-2">{formatCurrency(selectedCoin.price)}</p>
              <p className={`text-sm font-medium ${selectedCoin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {selectedCoin.change24h >= 0 ? '+' : ''}{formatNumber(selectedCoin.change24h, 2)}% (24h)
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Rank</span>
                <span className="text-white font-semibold">#{selectedCoin.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Market Cap</span>
                <span className="text-white font-semibold">
                  ${formatNumber(selectedCoin.marketCap / 1e9, 1)}B
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Volume 24h</span>
                <span className="text-white font-semibold">
                  ${formatNumber(selectedCoin.volume24h / 1e9, 1)}B
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Confiança</span>
                <span className="text-white font-semibold">{selectedCoin.analysis.confidence}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Time-based Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Short Term */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h4 className="text-lg font-semibold text-white">Curto Prazo</h4>
                </div>
                <span className="text-xs text-gray-400">1-30 dias</span>
              </div>
              
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${getAnalysisColor(selectedCoin.analysis.shortTerm)}`}>
                {getAnalysisIcon(selectedCoin.analysis.shortTerm)}
                <span>{selectedCoin.analysis.shortTerm}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Preço Alvo</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(selectedCoin.analysis.targetPrice.short)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Potencial</span>
                  <span className={`font-semibold ${selectedCoin.analysis.potentialGain.short >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedCoin.analysis.potentialGain.short >= 0 ? '+' : ''}{formatNumber(selectedCoin.analysis.potentialGain.short, 1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Medium Term */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  <h4 className="text-lg font-semibold text-white">Médio Prazo</h4>
                </div>
                <span className="text-xs text-gray-400">3-12 meses</span>
              </div>
              
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${getAnalysisColor(selectedCoin.analysis.mediumTerm)}`}>
                {getAnalysisIcon(selectedCoin.analysis.mediumTerm)}
                <span>{selectedCoin.analysis.mediumTerm}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Preço Alvo</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(selectedCoin.analysis.targetPrice.medium)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Potencial</span>
                  <span className={`font-semibold ${selectedCoin.analysis.potentialGain.medium >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedCoin.analysis.potentialGain.medium >= 0 ? '+' : ''}{formatNumber(selectedCoin.analysis.potentialGain.medium, 1)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Long Term */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-pink-400" />
                  <h4 className="text-lg font-semibold text-white">Longo Prazo</h4>
                </div>
                <span className="text-xs text-gray-400">1-5 anos</span>
              </div>
              
              <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium mb-4 ${getAnalysisColor(selectedCoin.analysis.longTerm)}`}>
                {getAnalysisIcon(selectedCoin.analysis.longTerm)}
                <span>{selectedCoin.analysis.longTerm}</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Preço Alvo</span>
                  <span className="text-white font-semibold">
                    {formatCurrency(selectedCoin.analysis.targetPrice.long)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Potencial</span>
                  <span className={`font-semibold ${selectedCoin.analysis.potentialGain.long >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedCoin.analysis.potentialGain.long >= 0 ? '+' : ''}{formatNumber(selectedCoin.analysis.potentialGain.long, 1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Scenarios */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
            <h4 className="text-xl font-bold text-white mb-6 flex items-center">
              <DollarSign className="w-6 h-6 text-green-400 mr-2" />
              Simulação de Investimento
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1000, 5000, 10000].map((amount) => (
                <div key={amount} className="bg-white/5 rounded-xl p-4">
                  <h5 className="text-lg font-semibold text-white mb-3">
                    Investimento: {formatCurrency(amount)}
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Curto prazo:</span>
                      <span className="text-green-400 font-medium">
                        {formatCurrency(amount * (1 + selectedCoin.analysis.potentialGain.short / 100))}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Médio prazo:</span>
                      <span className="text-blue-400 font-medium">
                        {formatCurrency(amount * (1 + selectedCoin.analysis.potentialGain.medium / 100))}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Longo prazo:</span>
                      <span className="text-purple-400 font-medium">
                        {formatCurrency(amount * (1 + selectedCoin.analysis.potentialGain.long / 100))}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
            <h4 className="text-xl font-bold text-white mb-4">⚠️ Avaliação de Risco</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-lg font-semibold text-yellow-300 mb-3">Fatores de Risco</h5>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Volatilidade alta do mercado crypto</li>
                  <li>• Regulamentações governamentais</li>
                  <li>• Sentimento do mercado</li>
                  <li>• Desenvolvimentos tecnológicos</li>
                </ul>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-green-300 mb-3">Fatores Positivos</h5>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Adoção institucional crescente</li>
                  <li>• Inovações tecnológicas</li>
                  <li>• Comunidade ativa</li>
                  <li>• Casos de uso reais</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Coins Quick View */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-6">Resumo de Todas as Análises</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Moeda</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Preço</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Curto</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Médio</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Longo</th>
                <th className="text-right py-3 px-4 text-gray-400 font-medium">Confiança</th>
              </tr>
            </thead>
            <tbody>
              {mockCryptoData.map((coin) => (
                <tr key={coin.id} className="border-b border-gray-700/50 hover:bg-white/5">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                      <div>
                        <p className="text-white font-medium">{coin.name}</p>
                        <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-white font-medium">{formatCurrency(coin.price)}</p>
                    <p className={`text-sm ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {coin.change24h >= 0 ? '+' : ''}{formatNumber(coin.change24h, 2)}%
                    </p>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAnalysisColor(coin.analysis.shortTerm)}`}>
                      {coin.analysis.shortTerm}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAnalysisColor(coin.analysis.mediumTerm)}`}>
                      {coin.analysis.mediumTerm}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAnalysisColor(coin.analysis.longTerm)}`}>
                      {coin.analysis.longTerm}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-white font-medium">{coin.analysis.confidence}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}