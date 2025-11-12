export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  rank: number;
  image: string;
  analysis: {
    shortTerm: 'BUY' | 'SELL' | 'HOLD';
    mediumTerm: 'BUY' | 'SELL' | 'HOLD';
    longTerm: 'BUY' | 'SELL' | 'HOLD';
    confidence: number;
    targetPrice: {
      short: number;
      medium: number;
      long: number;
    };
    potentialGain: {
      short: number;
      medium: number;
      long: number;
    };
  };
}

export interface Platform {
  id: string;
  name: string;
  logo: string;
  rating: number;
  fees: string;
  features: string[];
  beginnerFriendly: boolean;
  description: string;
}

export interface EducationalContent {
  id: string;
  title: string;
  type: 'video' | 'article' | 'mindmap' | 'chart';
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  description: string;
  url?: string;
}

export interface MarketData {
  totalMarketCap: number;
  totalVolume: number;
  btcDominance: number;
  fearGreedIndex: number;
  trendingCoins: string[];
}