'use client';

import { Star, Shield, Smartphone, CreditCard, GraduationCap, ExternalLink } from 'lucide-react';
import { mockPlatforms } from '@/lib/mock-data';

export function PlatformRecommendations() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Melhores Plataformas</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Recomendações das melhores exchanges e plataformas para iniciantes, com análise de taxas, segurança e facilidade de uso
        </p>
      </div>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockPlatforms.map((platform) => (
          <div key={platform.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400 transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img src={platform.logo} alt={platform.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(platform.rating)}
                    </div>
                    <span className="text-gray-400 text-sm">({platform.rating})</span>
                  </div>
                </div>
              </div>
              
              {platform.beginnerFriendly && (
                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                  Iniciante
                </div>
              )}
            </div>

            <p className="text-gray-300 mb-6">{platform.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CreditCard className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Taxas</span>
                </div>
                <p className="text-gray-300 text-sm">{platform.fees}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Segurança</span>
                </div>
                <p className="text-gray-300 text-sm">
                  {platform.rating >= 4.5 ? 'Excelente' : 
                   platform.rating >= 4.0 ? 'Muito Boa' : 'Boa'}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3 flex items-center">
                <Smartphone className="w-5 h-5 text-purple-400 mr-2" />
                Recursos Principais
              </h4>
              <div className="flex flex-wrap gap-2">
                {platform.features.map((feature) => (
                  <span
                    key={feature}
                    className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-600">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <GraduationCap className="w-4 h-4" />
                <span>
                  {platform.beginnerFriendly ? 'Ideal para iniciantes' : 'Para usuários avançados'}
                </span>
              </div>
              <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                <span>Visitar</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-6">Comparação Rápida</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Plataforma</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Avaliação</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Taxas</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Iniciante</th>
                <th className="text-center py-3 px-4 text-gray-400 font-medium">Recursos</th>
              </tr>
            </thead>
            <tbody>
              {mockPlatforms.map((platform) => (
                <tr key={platform.id} className="border-b border-gray-700/50 hover:bg-white/5">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img src={platform.logo} alt={platform.name} className="w-8 h-8 rounded-full" />
                      <span className="text-white font-medium">{platform.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      {renderStars(platform.rating)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-white">{platform.fees}</td>
                  <td className="py-3 px-4 text-center">
                    {platform.beginnerFriendly ? (
                      <span className="text-green-400">✓</span>
                    ) : (
                      <span className="text-red-400">✗</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-white">{platform.features.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tips for Beginners */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
        <h3 className="text-xl font-bold text-white mb-6">💡 Dicas para Escolher uma Plataforma</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-blue-300">Segurança</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Verificar se é regulamentada</li>
              <li>• Autenticação de dois fatores (2FA)</li>
              <li>• Histórico de segurança limpo</li>
              <li>• Seguros para fundos dos usuários</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-purple-300">Facilidade de Uso</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Interface intuitiva</li>
              <li>• App mobile funcional</li>
              <li>• Suporte em português</li>
              <li>• Tutoriais e educação</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-green-300">Custos</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>• Taxas de trading competitivas</li>
              <li>• Depósito e saque baratos</li>
              <li>• Sem taxas ocultas</li>
              <li>• Descontos por volume</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Regional Recommendations */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-6">🇧🇷 Recomendações para o Brasil</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-300">Exchanges Nacionais</h4>
            <div className="space-y-3">
              <div className="bg-yellow-500/10 rounded-xl p-4">
                <h5 className="text-white font-medium mb-2">Mercado Bitcoin</h5>
                <p className="text-gray-300 text-sm">Pioneira no Brasil, PIX instantâneo, suporte completo em português</p>
              </div>
              <div className="bg-yellow-500/10 rounded-xl p-4">
                <h5 className="text-white font-medium mb-2">Foxbit</h5>
                <p className="text-gray-300 text-sm">Interface simples, ideal para iniciantes, taxas competitivas</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-300">Exchanges Internacionais</h4>
            <div className="space-y-3">
              <div className="bg-blue-500/10 rounded-xl p-4">
                <h5 className="text-white font-medium mb-2">Binance</h5>
                <p className="text-gray-300 text-sm">Maior variedade de moedas, taxas baixas, recursos avançados</p>
              </div>
              <div className="bg-blue-500/10 rounded-xl p-4">
                <h5 className="text-white font-medium mb-2">Coinbase</h5>
                <p className="text-gray-300 text-sm">Mais segura e regulamentada, ideal para HODLers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}