import { CryptoCurrency, Platform, EducationalContent, MarketData } from './types';

export const mockCryptoData: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43250.00,
    change24h: 2.45,
    marketCap: 847000000000,
    volume24h: 28500000000,
    rank: 1,
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    analysis: {
      shortTerm: 'BUY',
      mediumTerm: 'BUY',
      longTerm: 'BUY',
      confidence: 85,
      targetPrice: {
        short: 48000,
        medium: 65000,
        long: 100000
      },
      potentialGain: {
        short: 11.0,
        medium: 50.3,
        long: 131.2
      }
    }
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2650.00,
    change24h: 3.21,
    marketCap: 318000000000,
    volume24h: 15200000000,
    rank: 2,
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    analysis: {
      shortTerm: 'BUY',
      mediumTerm: 'BUY',
      longTerm: 'BUY',
      confidence: 82,
      targetPrice: {
        short: 3200,
        medium: 4500,
        long: 8000
      },
      potentialGain: {
        short: 20.8,
        medium: 69.8,
        long: 201.9
      }
    }
  },
  {
    id: 'binance-coin',
    name: 'BNB',
    symbol: 'BNB',
    price: 315.50,
    change24h: 1.87,
    marketCap: 47000000000,
    volume24h: 1800000000,
    rank: 3,
    image: 'https://cryptologos.cc/logos/bnb-bnb-logo.png',
    analysis: {
      shortTerm: 'HOLD',
      mediumTerm: 'BUY',
      longTerm: 'BUY',
      confidence: 78,
      targetPrice: {
        short: 340,
        medium: 450,
        long: 600
      },
      potentialGain: {
        short: 7.8,
        medium: 42.6,
        long: 90.2
      }
    }
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    price: 0.62,
    change24h: 4.15,
    marketCap: 33000000000,
    volume24h: 1200000000,
    rank: 4,
    image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    analysis: {
      shortTerm: 'BUY',
      mediumTerm: 'BUY',
      longTerm: 'HOLD',
      confidence: 73,
      targetPrice: {
        short: 0.75,
        medium: 1.20,
        long: 2.00
      },
      potentialGain: {
        short: 21.0,
        medium: 93.5,
        long: 222.6
      }
    }
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 98.00,
    change24h: 5.67,
    marketCap: 43000000000,
    volume24h: 2100000000,
    rank: 5,
    image: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    analysis: {
      shortTerm: 'BUY',
      mediumTerm: 'HOLD',
      longTerm: 'BUY',
      confidence: 78,
      targetPrice: {
        short: 120,
        medium: 150,
        long: 300
      },
      potentialGain: {
        short: 22.4,
        medium: 53.1,
        long: 206.1
      }
    }
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.085,
    change24h: 6.32,
    marketCap: 12000000000,
    volume24h: 580000000,
    rank: 6,
    image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
    analysis: {
      shortTerm: 'BUY',
      mediumTerm: 'HOLD',
      longTerm: 'HOLD',
      confidence: 65,
      targetPrice: {
        short: 0.10,
        medium: 0.15,
        long: 0.25
      },
      potentialGain: {
        short: 17.6,
        medium: 76.5,
        long: 194.1
      }
    }
  },
  {
    id: 'toncoin',
    name: 'Toncoin',
    symbol: 'TON',
    price: 2.45,
    change24h: 3.89,
    marketCap: 8500000000,
    volume24h: 320000000,
    rank: 7,
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop',
    analysis: {
      shortTerm: 'BUY',
      mediumTerm: 'BUY',
      longTerm: 'BUY',
      confidence: 76,
      targetPrice: {
        short: 3.20,
        medium: 5.50,
        long: 12.00
      },
      potentialGain: {
        short: 30.6,
        medium: 124.5,
        long: 389.8
      }
    }
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.485,
    change24h: -1.23,
    marketCap: 17000000000,
    volume24h: 450000000,
    rank: 8,
    image: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    analysis: {
      shortTerm: 'HOLD',
      mediumTerm: 'BUY',
      longTerm: 'BUY',
      confidence: 72,
      targetPrice: {
        short: 0.52,
        medium: 0.85,
        long: 2.50
      },
      potentialGain: {
        short: 7.2,
        medium: 75.3,
        long: 415.5
      }
    }
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 36.80,
    change24h: 2.14,
    marketCap: 14000000000,
    volume24h: 420000000,
    rank: 9,
    image: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
    analysis: {
      shortTerm: 'HOLD',
      mediumTerm: 'BUY',
      longTerm: 'BUY',
      confidence: 74,
      targetPrice: {
        short: 42,
        medium: 65,
        long: 120
      },
      potentialGain: {
        short: 14.1,
        medium: 76.6,
        long: 226.1
      }
    }
  },
  {
    id: 'shiba-inu',
    name: 'Shiba Inu',
    symbol: 'SHIB',
    price: 0.0000098,
    change24h: 8.45,
    marketCap: 5800000000,
    volume24h: 280000000,
    rank: 10,
    image: 'https://cryptologos.cc/logos/shiba-inu-shib-logo.png',
    analysis: {
      shortTerm: 'BUY',
      mediumTerm: 'HOLD',
      longTerm: 'SELL',
      confidence: 58,
      targetPrice: {
        short: 0.000012,
        medium: 0.000015,
        long: 0.000008
      },
      potentialGain: {
        short: 22.4,
        medium: 53.1,
        long: -18.4
      }
    }
  },
  {
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    price: 14.85,
    change24h: 1.67,
    marketCap: 8200000000,
    volume24h: 350000000,
    rank: 11,
    image: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    analysis: {
      shortTerm: 'HOLD',
      mediumTerm: 'BUY',
      longTerm: 'BUY',
      confidence: 79,
      targetPrice: {
        short: 16.50,
        medium: 25.00,
        long: 50.00
      },
      potentialGain: {
        short: 11.1,
        medium: 68.4,
        long: 236.8
      }
    }
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.89,
    change24h: 4.12,
    marketCap: 8500000000,
    volume24h: 380000000,
    rank: 12,
    image: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    analysis: {
      shortTerm: 'BUY',
      mediumTerm: 'BUY',
      longTerm: 'HOLD',
      confidence: 75,
      targetPrice: {
        short: 1.20,
        medium: 2.10,
        long: 3.50
      },
      potentialGain: {
        short: 34.8,
        medium: 135.9,
        long: 293.3
      }
    }
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.25,
    change24h: -0.85,
    marketCap: 9200000000,
    volume24h: 290000000,
    rank: 13,
    image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    analysis: {
      shortTerm: 'HOLD',
      mediumTerm: 'BUY',
      longTerm: 'BUY',
      confidence: 71,
      targetPrice: {
        short: 8.00,
        medium: 12.50,
        long: 25.00
      },
      potentialGain: {
        short: 10.3,
        medium: 72.4,
        long: 244.8
      }
    }
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    price: 72.50,
    change24h: 1.23,
    marketCap: 5400000000,
    volume24h: 420000000,
    rank: 14,
    image: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
    analysis: {
      shortTerm: 'HOLD',
      mediumTerm: 'HOLD',
      longTerm: 'BUY',
      confidence: 68,
      targetPrice: {
        short: 78,
        medium: 95,
        long: 150
      },
      potentialGain: {
        short: 7.6,
        medium: 31.0,
        long: 107.0
      }
    }
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    symbol: 'UNI',
    price: 6.85,
    change24h: 2.89,
    marketCap: 5100000000,
    volume24h: 180000000,
    rank: 15,
    image: 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
    analysis: {
      shortTerm: 'BUY',
      mediumTerm: 'BUY',
      longTerm: 'BUY',
      confidence: 77,
      targetPrice: {
        short: 8.50,
        medium: 15.00,
        long: 30.00
      },
      potentialGain: {
        short: 24.1,
        medium: 119.0,
        long: 337.9
      }
    }
  }
];

export const mockPlatforms: Platform[] = [
  {
    id: 'binance',
    name: 'Binance',
    logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    rating: 4.5,
    fees: '0.1% - 0.5%',
    features: ['Spot Trading', 'Futures', 'Staking', 'NFTs', 'Academy'],
    beginnerFriendly: true,
    description: 'Maior exchange do mundo com ampla variedade de criptomoedas'
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    logo: 'https://cryptologos.cc/logos/coinbase-coin-logo.png',
    rating: 4.3,
    fees: '0.5% - 4%',
    features: ['Interface Simples', 'Educação', 'Carteira Segura', 'DeFi'],
    beginnerFriendly: true,
    description: 'Plataforma americana focada em simplicidade e segurança'
  },
  {
    id: 'mercadobitcoin',
    name: 'Mercado Bitcoin',
    logo: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop',
    rating: 4.2,
    fees: '0.3% - 0.7%',
    features: ['PIX Instantâneo', 'Suporte BR', 'App Mobile', 'Staking'],
    beginnerFriendly: true,
    description: 'Principal exchange brasileira com suporte em português'
  },
  {
    id: 'bybit',
    name: 'Bybit',
    logo: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=100&h=100&fit=crop',
    rating: 4.4,
    fees: '0.1% - 0.6%',
    features: ['Trading Avançado', 'Copy Trading', 'Derivativos', 'Launchpad'],
    beginnerFriendly: false,
    description: 'Exchange focada em trading profissional e derivativos'
  }
];

export const mockEducationalContent: EducationalContent[] = [
  {
    id: '1',
    title: 'O que são Criptomoedas? - Guia Completo',
    type: 'video',
    duration: '15 min',
    difficulty: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=225&fit=crop',
    description: 'Aprenda os conceitos básicos das criptomoedas de forma simples'
  },
  {
    id: '2',
    title: 'Como Analisar Gráficos de Criptomoedas',
    type: 'video',
    duration: '22 min',
    difficulty: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop',
    description: 'Entenda candlesticks, suporte, resistência e indicadores técnicos'
  },
  {
    id: '3',
    title: 'Mapa Mental: Ecossistema Crypto',
    type: 'mindmap',
    difficulty: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=225&fit=crop',
    description: 'Visualize como Bitcoin, DeFi, NFTs e Web3 se conectam'
  },
  {
    id: '4',
    title: 'Estratégias de Investimento em Crypto',
    type: 'article',
    duration: '8 min',
    difficulty: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=225&fit=crop',
    description: 'DCA, HODL, Trading: qual estratégia é melhor para você?'
  },
  {
    id: '5',
    title: 'Gráfico: Ciclos do Bitcoin',
    type: 'chart',
    difficulty: 'intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=400&h=225&fit=crop',
    description: 'Entenda os padrões históricos dos ciclos de alta e baixa'
  },
  {
    id: '6',
    title: 'Segurança em Criptomoedas',
    type: 'video',
    duration: '18 min',
    difficulty: 'beginner',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=225&fit=crop',
    description: 'Proteja seus investimentos: carteiras, senhas e golpes comuns'
  }
];

export const mockMarketData: MarketData = {
  totalMarketCap: 1650000000000,
  totalVolume: 89000000000,
  btcDominance: 51.3,
  fearGreedIndex: 72,
  trendingCoins: ['bitcoin', 'ethereum', 'solana', 'polygon', 'cardano']
};

export const priceHistory = [
  { date: '2024-01-01', bitcoin: 42000, ethereum: 2500, solana: 85 },
  { date: '2024-01-02', bitcoin: 43100, ethereum: 2580, solana: 89 },
  { date: '2024-01-03', bitcoin: 42800, ethereum: 2520, solana: 87 },
  { date: '2024-01-04', bitcoin: 44200, ethereum: 2650, solana: 92 },
  { date: '2024-01-05', bitcoin: 43900, ethereum: 2610, solana: 90 },
  { date: '2024-01-06', bitcoin: 45100, ethereum: 2720, solana: 95 },
  { date: '2024-01-07', bitcoin: 43250, ethereum: 2650, solana: 98 }
];