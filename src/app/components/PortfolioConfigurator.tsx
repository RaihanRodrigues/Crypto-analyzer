'use client';

import { useState, useEffect } from 'react';
import { Star, Search, Filter, X, Check, TrendingUp, TrendingDown } from 'lucide-react';
import { mockCryptoData } from '@/lib/mock-data';
import { CryptoCurrency } from '@/lib/types';

interface PortfolioConfiguratorProps {
  onClose: () => void;
  onSave: (favorites: string[]) => void;
}

export function PortfolioConfigurator({ onClose, onSave }: PortfolioConfiguratorProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'buy' | 'hold' | 'sell'>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'price' | 'change'>('rank');

  // Carregar favoritos salvos
  useEffect(() => {
    const savedFavorites = localStorage.getItem('crypto-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Filtrar e ordenar moedas
  const filteredCoins = mockCryptoData
    .filter(coin => {
      const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || coin.analysis.shortTerm.toLowerCase() === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rank':
          return a.rank - b.rank;
        case 'price':
          return b.price - a.price;
        case 'change':
          return b.change24h - a.change24h;
        default:
          return 0;
      }
    });

  const toggleFavorite = (coinId: string) => {
    setFavorites(prev => 
      prev.includes(coinId) 
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  };

  const handleSave = () => {
    localStorage.setItem('crypto-favorites', JSON.stringify(favorites));
    onSave(favorites);
    onClose();
  };

  const selectRecommended = () => {
    const recommended = ['bitcoin', 'ethereum', 'solana', 'cardano', 'polygon'];
    setFavorites(recommended);
  };

  const selectTopPerformers = () => {
    const topPerformers = mockCryptoData
      .filter(coin => coin.change24h > 0)
      .sort((a, b) => b.change24h - a.change24h)
      .slice(0, 5)
      .map(coin => coin.id);
    setFavorites(topPerformers);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-2xl border border-purple-500/20 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Configurar Portfólio</h2>
            <p className="text-gray-400 mt-1">
              Selecione as criptomoedas que você deseja acompanhar ({favorites.length} selecionadas)
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Controles */}
        <div className="p-6 border-b border-gray-700 space-y-4">
          {/* Seleções Rápidas */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={selectRecommended}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Recomendadas para Iniciantes
            </button>
            <button
              onClick={selectTopPerformers}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Maiores Altas (24h)
            </button>
            <button
              onClick={() => setFavorites([])}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            >
              Limpar Seleção
            </button>
          </div>

          {/* Busca e Filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar criptomoedas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-white/5 border border-gray-600 rounded-lg text-white px-4 py-2 focus:border-purple-500 focus:outline-none"
            >
              <option value="all">Todas as Análises</option>
              <option value="buy">Sinal de Compra</option>
              <option value="hold">Manter</option>
              <option value="sell">Vender</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white/5 border border-gray-600 rounded-lg text-white px-4 py-2 focus:border-purple-500 focus:outline-none"
            >
              <option value="rank">Ranking</option>
              <option value="price">Preço</option>
              <option value="change">Variação 24h</option>
            </select>
          </div>
        </div>

        {/* Lista de Criptomoedas */}
        <div className="flex-1 overflow-y-auto max-h-96">
          <div className="p-6 space-y-3">
            {filteredCoins.map((coin) => {
              const isSelected = favorites.includes(coin.id);
              return (
                <div
                  key={coin.id}
                  onClick={() => toggleFavorite(coin.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-purple-500/20 border-purple-500/50 ring-2 ring-purple-500/30'
                      : 'bg-white/5 border-gray-600/20 hover:bg-white/10 hover:border-gray-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-white font-semibold">{coin.name}</h3>
                          <span className="text-gray-400 text-sm">#{coin.rank}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-white font-semibold">${coin.price.toLocaleString()}</p>
                      <p className={`text-sm flex items-center justify-end ${
                        coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {coin.change24h >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                      </p>
                    </div>

                    <div className="text-center">
                      <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        coin.analysis.shortTerm === 'BUY' ? 'bg-green-500/20 text-green-400' :
                        coin.analysis.shortTerm === 'SELL' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {coin.analysis.shortTerm}
                      </div>
                      <p className="text-gray-400 text-xs mt-1">
                        {coin.analysis.confidence}% confiança
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-green-400 text-sm font-medium">
                        +{coin.analysis.potentialGain.short.toFixed(1)}%
                      </p>
                      <p className="text-gray-400 text-xs">potencial</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-between items-center">
          <div className="text-gray-400 text-sm">
            {favorites.length} criptomoeda{favorites.length !== 1 ? 's' : ''} selecionada{favorites.length !== 1 ? 's' : ''}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={favorites.length === 0}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
            >
              Salvar Portfólio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}