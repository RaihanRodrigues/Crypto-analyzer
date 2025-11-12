'use client';

import { useState } from 'react';
import { Play, BookOpen, Brain, BarChart3, Clock, Star, Filter } from 'lucide-react';
import { mockEducationalContent } from '@/lib/mock-data';
import { EducationalContent } from '@/lib/types';

export function EducationalHub() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredContent = mockEducationalContent.filter(content => {
    const typeMatch = selectedType === 'all' || content.type === selectedType;
    const difficultyMatch = selectedDifficulty === 'all' || content.difficulty === selectedDifficulty;
    return typeMatch && difficultyMatch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-5 h-5" />;
      case 'article': return <BookOpen className="w-5 h-5" />;
      case 'mindmap': return <Brain className="w-5 h-5" />;
      case 'chart': return <BarChart3 className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'text-red-400 bg-red-500/20';
      case 'article': return 'text-blue-400 bg-blue-500/20';
      case 'mindmap': return 'text-purple-400 bg-purple-500/20';
      case 'chart': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return difficulty;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Centro Educacional</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Aprenda sobre criptomoedas através de vídeo aulas, artigos, mapas mentais e gráficos educacionais
        </p>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-6">🎯 Trilha de Aprendizado Recomendada</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-400">1</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Fundamentos</h4>
            <p className="text-gray-300 text-sm">
              O que são criptomoedas, blockchain e como funciona o mercado
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-400">2</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Análise</h4>
            <p className="text-gray-300 text-sm">
              Como ler gráficos, indicadores técnicos e análise fundamentalista
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-400">3</span>
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Estratégias</h4>
            <p className="text-gray-300 text-sm">
              Diferentes abordagens de investimento e gestão de risco
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Filtros</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Tipo de Conteúdo</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="all">Todos os tipos</option>
              <option value="video">Vídeo Aulas</option>
              <option value="article">Artigos</option>
              <option value="mindmap">Mapas Mentais</option>
              <option value="chart">Gráficos</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-400 text-sm font-medium mb-2">Nível de Dificuldade</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
            >
              <option value="all">Todos os níveis</option>
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="advanced">Avançado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((content) => (
          <div key={content.id} className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-400 transition-all duration-300 group">
            <div className="relative">
              <img 
                src={content.thumbnail} 
                alt={content.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(content.type)}`}>
                  {getTypeIcon(content.type)}
                  <span className="capitalize">{content.type === 'mindmap' ? 'Mapa Mental' : content.type}</span>
                </span>
              </div>
              {content.duration && (
                <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{content.duration}</span>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content.difficulty)}`}>
                  {getDifficultyText(content.difficulty)}
                </span>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <h4 className="text-lg font-semibold text-white mb-3 line-clamp-2">
                {content.title}
              </h4>
              
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {content.description}
              </p>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                {getTypeIcon(content.type)}
                <span>
                  {content.type === 'video' ? 'Assistir' : 
                   content.type === 'article' ? 'Ler' : 
                   content.type === 'mindmap' ? 'Explorar' : 'Ver'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-6">💡 Dicas Rápidas para Iniciantes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-green-500/10 rounded-xl">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📚</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Estude Primeiro</h4>
            <p className="text-gray-300 text-sm">Nunca invista sem entender o básico sobre criptomoedas</p>
          </div>
          
          <div className="text-center p-4 bg-blue-500/10 rounded-xl">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💰</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Comece Pequeno</h4>
            <p className="text-gray-300 text-sm">Invista apenas o que você pode perder</p>
          </div>
          
          <div className="text-center p-4 bg-purple-500/10 rounded-xl">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🔒</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Segurança</h4>
            <p className="text-gray-300 text-sm">Use carteiras seguras e ative 2FA</p>
          </div>
          
          <div className="text-center p-4 bg-yellow-500/10 rounded-xl">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">📈</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Diversifique</h4>
            <p className="text-gray-300 text-sm">Não coloque tudo em uma única moeda</p>
          </div>
        </div>
      </div>

      {/* Glossary */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-xl font-bold text-white mb-6">📖 Glossário Básico</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-white font-semibold">HODL</h4>
              <p className="text-gray-300 text-sm">Estratégia de manter as moedas por longo prazo</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-white font-semibold">DCA</h4>
              <p className="text-gray-300 text-sm">Dollar Cost Average - investir valores fixos regularmente</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-white font-semibold">FOMO</h4>
              <p className="text-gray-300 text-sm">Fear of Missing Out - medo de perder oportunidades</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="text-white font-semibold">ATH</h4>
              <p className="text-gray-300 text-sm">All Time High - maior preço histórico</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="text-white font-semibold">Bear Market</h4>
              <p className="text-gray-300 text-sm">Período de queda prolongada dos preços</p>
            </div>
            <div className="border-l-4 border-pink-500 pl-4">
              <h4 className="text-white font-semibold">Bull Market</h4>
              <p className="text-gray-300 text-sm">Período de alta prolongada dos preços</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}