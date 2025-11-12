'use client';

import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockMarketData, priceHistory, mockCryptoData } from '@/lib/mock-data';
import { useState, useEffect } from 'react';

export function MarketOverview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const topGainers = mockCryptoData
    .filter(coin => coin.change24h > 0)
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 3);

  const topLosers = mockCryptoData
    .filter(coin => coin.change24h < 0)
    .sort((a, b) => a.change24h - b.change24h)
    .slice(0, 3);

  // Função para formatação consistente de números
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 animate-pulse">
              <div className="h-20 bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Market Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Market Cap Total</p>
              <p className="text-2xl font-bold text-white">
                ${formatNumber(mockMarketData.totalMarketCap / 1e12, 2)}T
              </p>
              <p className="text-green-400 text-sm flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.4% (24h)
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Volume 24h</p>
              <p className="text-2xl font-bold text-white">
                ${formatNumber(mockMarketData.totalVolume / 1e9, 1)}B
              </p>
              <p className="text-red-400 text-sm flex items-center mt-1">
                <TrendingDown className="w-4 h-4 mr-1" />
                -1.2% (24h)
              </p>
            </div>
            <Activity className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Dominância BTC</p>
              <p className="text-2xl font-bold text-white">{formatNumber(mockMarketData.btcDominance, 1)}%</p>
              <p className="text-yellow-400 text-sm">Estável</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
              ₿
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Fear & Greed</p>
              <p className="text-2xl font-bold text-white">{mockMarketData.fearGreedIndex}</p>
              <p className={`text-sm ${mockMarketData.fearGreedIndex > 50 ? 'text-green-400' : 'text-red-400'}`}>
                {mockMarketData.fearGreedIndex > 75 ? 'Ganância Extrema' : 
                 mockMarketData.fearGreedIndex > 50 ? 'Ganância' : 
                 mockMarketData.fearGreedIndex > 25 ? 'Medo' : 'Medo Extremo'}
              </p>
            </div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
              mockMarketData.fearGreedIndex > 50 ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {mockMarketData.fearGreedIndex}
            </div>
          </div>
        </div>
      </div>

      {/* Price Chart */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-6">Histórico de Preços (7 dias)</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                }}
              />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                }}
                formatter={(value: number, name: string) => [
                  `$${formatNumber(value, 0)}`,
                  name.toUpperCase()
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="bitcoin" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                name="bitcoin"
              />
              <Line 
                type="monotone" 
                dataKey="ethereum" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="ethereum"
              />
              <Line 
                type="monotone" 
                dataKey="solana" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                name="solana"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Gainers */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
            Maiores Altas (24h)
          </h3>
          <div className="space-y-4">
            {topGainers.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between p-4 bg-green-500/10 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-white font-semibold">{coin.name}</p>
                    <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{formatCurrency(coin.price)}</p>
                  <p className="text-green-400 text-sm font-medium">+{formatNumber(coin.change24h, 2)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-red-500/20">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
            <TrendingDown className="w-6 h-6 text-red-400 mr-2" />
            Maiores Baixas (24h)
          </h3>
          <div className="space-y-4">
            {topLosers.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between p-4 bg-red-500/10 rounded-xl">
                <div className="flex items-center space-x-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <p className="text-white font-semibold">{coin.name}</p>
                    <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-semibold">{formatCurrency(coin.price)}</p>
                  <p className="text-red-400 text-sm font-medium">{formatNumber(coin.change24h, 2)}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-4">💡 Insights do Mercado</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-purple-300">Tendências Atuais</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                Bitcoin mantém tendência de alta
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                Ethereum se prepara para próxima atualização
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                Altcoins seguem movimento do BTC
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-pink-300">Recomendações</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                Considere estratégia DCA para iniciantes
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                Diversifique entre top 10 moedas
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                Mantenha reserva de emergência
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}