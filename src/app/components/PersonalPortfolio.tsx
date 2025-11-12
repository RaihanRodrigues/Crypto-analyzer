'use client';

import { useState, useEffect } from 'react';
import { Star, Plus, X, Settings, TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockCryptoData, priceHistory } from '@/lib/mock-data';
import { CryptoCurrency } from '@/lib/types';

interface PersonalPortfolioProps {
  onConfigurePortfolio: () => void;
}

export function PersonalPortfolio({ onConfigurePortfolio }: PersonalPortfolioProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showAllCoins, setShowAllCoins] = useState(false);

  // Carregar favoritos do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('crypto-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    } else {
      // Favoritos padrão para novos usuários
      setFavorites(['bitcoin', 'ethereum', 'solana']);
    }
  }, []);

  // Salvar favoritos no localStorage
  const saveFavorites = (newFavorites: string[]) => {
    setFavorites(newFavorites);
    localStorage.setItem('crypto-favorites', JSON.stringify(newFavorites));
  };

  const toggleFavorite = (coinId: string) => {
    const newFavorites = favorites.includes(coinId)
      ? favorites.filter(id => id !== coinId)
      : [...favorites, coinId];
    saveFavorites(newFavorites);
  };

  const favoriteCoins = mockCryptoData.filter(coin => favorites.includes(coin.id));
  const availableCoins = mockCryptoData.filter(coin => !favorites.includes(coin.id));

  // Calcular estatísticas do portfólio
  const portfolioStats = {
    totalValue: favoriteCoins.reduce((sum, coin) => sum + coin.price, 0),
    avgChange: favoriteCoins.reduce((sum, coin) => sum + coin.change24h, 0) / favoriteCoins.length,
    strongBuys: favoriteCoins.filter(coin => coin.analysis.shortTerm === 'BUY').length,
    avgConfidence: favoriteCoins.reduce((sum, coin) => sum + coin.analysis.confidence, 0) / favoriteCoins.length
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 max-w-md mx-auto">
          <Star className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Crie Seu Portfólio Pessoal</h3>
          <p className="text-gray-400 mb-6">
            Selecione as criptomoedas que você deseja acompanhar para ter uma experiência personalizada
          </p>
          <button
            onClick={onConfigurePortfolio}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Configurar Portfólio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header do Portfólio */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Meu Portfólio</h2>
          <p className="text-gray-400">
            Acompanhando {favorites.length} criptomoeda{favorites.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={onConfigurePortfolio}
          className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all duration-200"
        >
          <Settings className="w-5 h-5" />
          <span>Configurar</span>
        </button>
      </div>

      {/* Estatísticas do Portfólio */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Valor Médio</p>
              <p className="text-2xl font-bold text-white">
                ${portfolioStats.totalValue.toLocaleString()}
              </p>
            </div>
            <Target className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Variação Média</p>
              <p className={`text-2xl font-bold ${portfolioStats.avgChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {portfolioStats.avgChange >= 0 ? '+' : ''}{portfolioStats.avgChange.toFixed(2)}%
              </p>
            </div>
            {portfolioStats.avgChange >= 0 ? 
              <TrendingUp className="w-8 h-8 text-green-400" /> : 
              <TrendingDown className="w-8 h-8 text-red-400" />
            }
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Sinais de Compra</p>
              <p className="text-2xl font-bold text-white">
                {portfolioStats.strongBuys}/{favorites.length}
              </p>
            </div>
            <Zap className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Confiança Média</p>
              <p className="text-2xl font-bold text-white">
                {portfolioStats.avgConfidence.toFixed(0)}%
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm">
              {portfolioStats.avgConfidence.toFixed(0)}
            </div>
          </div>
        </div>
      </div>

      {/* Gráfico das Moedas Favoritas */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-6">Histórico das Suas Criptomoedas</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
              />
              <YAxis stroke="#9CA3AF" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }}
                labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name.toUpperCase()
                ]}
              />
              {favorites.includes('bitcoin') && (
                <Line 
                  type="monotone" 
                  dataKey="bitcoin" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                  name="bitcoin"
                />
              )}
              {favorites.includes('ethereum') && (
                <Line 
                  type="monotone" 
                  dataKey="ethereum" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  name="ethereum"
                />
              )}
              {favorites.includes('solana') && (
                <Line 
                  type="monotone" 
                  dataKey="solana" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                  name="solana"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lista de Criptomoedas Favoritas */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Suas Criptomoedas</h3>
          <button
            onClick={() => setShowAllCoins(!showAllCoins)}
            className="text-purple-400 hover:text-purple-300 text-sm font-medium"
          >
            {showAllCoins ? 'Ocultar outras' : 'Ver todas disponíveis'}
          </button>
        </div>

        <div className="space-y-4">
          {/* Moedas Favoritas */}
          {favoriteCoins.map((coin) => (
            <div key={coin.id} className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={coin.image} alt={coin.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-white font-semibold">{coin.name}</h4>
                      <button
                        onClick={() => toggleFavorite(coin.id)}
                        className="text-yellow-400 hover:text-yellow-300"
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-white font-semibold text-lg">${coin.price.toLocaleString()}</p>
                  <p className={`text-sm font-medium ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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
                  <p className="text-gray-400 text-xs">
                    Meta: ${coin.analysis.targetPrice.short.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Moedas Disponíveis (quando expandido) */}
          {showAllCoins && (
            <div className="border-t border-gray-700 pt-6 mt-6">
              <h4 className="text-lg font-semibold text-white mb-4">Adicionar ao Portfólio</h4>
              <div className="space-y-3">
                {availableCoins.map((coin) => (
                  <div key={coin.id} className="bg-white/5 rounded-xl p-4 border border-gray-600/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <h4 className="text-white font-medium">{coin.name}</h4>
                          <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-white font-medium">${coin.price.toLocaleString()}</p>
                        <p className={`text-sm ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                        </p>
                      </div>

                      <button
                        onClick={() => toggleFavorite(coin.id)}
                        className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-all duration-200"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recomendações Personalizadas */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
        <h3 className="text-xl font-bold text-white mb-4">💡 Recomendações Personalizadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-blue-300">Para Seu Portfólio</h4>
            <ul className="space-y-2 text-gray-300">
              {portfolioStats.strongBuys > 0 && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  {portfolioStats.strongBuys} moeda{portfolioStats.strongBuys !== 1 ? 's' : ''} com sinal de compra
                </li>
              )}
              {portfolioStats.avgChange > 0 && (
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                  Portfólio em tendência positiva
                </li>
              )}
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                Confiança média de {portfolioStats.avgConfidence.toFixed(0)}%
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-purple-300">Próximos Passos</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                Considere diversificar com mais 1-2 moedas
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                Acompanhe análises técnicas diariamente
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                Defina metas de lucro para cada posição
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}