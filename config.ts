src/config/base-config.ts// Base Network Configuration and Protocol Definitions
// Comprehensive configuration for Base ecosystem DeFi protocols

export interface BaseNetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  wsUrl: string;
  blockExplorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface ProtocolConfig {
  name: string;
  address: string;
  abi?: any[];
  category: 'DEX' | 'Lending' | 'Yield' | 'Bridge' | 'Derivatives';
  tvlEndpoint?: string;
  subgraphUrl?: string;
  isActive: boolean;
  launchDate: string;
}

// Base Network Configuration
export const BASE_CONFIG: BaseNetworkConfig = {
  chainId: 8453,
  name: 'Base',
  rpcUrl: 'https://mainnet.base.org',
  wsUrl: 'wss://mainnet.base.org',
  blockExplorer: 'https://basescan.org',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  }
};

// DEX Protocol Configurations
export const DEX_PROTOCOLS: Record<string, ProtocolConfig> = {
  uniswapV3: {
    name: 'Uniswap V3',
    address: '0x2626664c2603336E57B271c5C0b26F421741e481',
    category: 'DEX',
    tvlEndpoint: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-base',
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3-base',
    isActive: true,
    launchDate: '2023-08-09'
  },
  aerodrome: {
    name: 'Aerodrome Finance',
    address: '0xcF77a3Ba9A5CA399B7c97c74d54e5b1Beb874E43',
    category: 'DEX',
    tvlEndpoint: 'https://api.aerodrome.finance/api/v1/pairs',
    isActive: true,
    launchDate: '2023-08-28'
  },
  baseswap: {
    name: 'BaseSwap',
    address: '0x327Df1E6de05895d2ab08513aaDD9313Fe505d86',
    category: 'DEX',
    tvlEndpoint: 'https://api.baseswap.fi/api/v1/summary',
    isActive: true,
    launchDate: '2023-08-10'
  }
};

// Lending Protocol Configurations
export const LENDING_PROTOCOLS: Record<string, ProtocolConfig> = {
  aaveV3: {
    name: 'Aave V3',
    address: '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5',
    category: 'Lending',
    tvlEndpoint: 'https://aave-api-v2.aave.com/data/markets-data',
    subgraphUrl: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v3-base',
    isActive: true,
    launchDate: '2023-09-07'
  },
  compoundV3: {
    name: 'Compound V3',
    address: '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf',
    category: 'Lending',
    tvlEndpoint: 'https://api.compound.finance/api/v2/ctoken',
    isActive: true,
    launchDate: '2023-08-23'
  },
  moonwell: {
    name: 'Moonwell',
    address: '0xfBb21d0380beE3312B33c4353c8936a0F13EF26C',
    category: 'Lending',
    tvlEndpoint: 'https://api.moonwell.fi/base/governance/proposals',
    isActive: true,
    launchDate: '2023-10-12'
  }
};

// Yield Farming Protocol Configurations
export const YIELD_PROTOCOLS: Record<string, ProtocolConfig> = {
  beefy: {
    name: 'Beefy Finance',
    address: '0x0000000000000000000000000000000000000000',
    category: 'Yield',
    tvlEndpoint: 'https://api.beefy.finance/vaults/base',
    isActive: true,
    launchDate: '2023-08-15'
  },
  yearn: {
    name: 'Yearn Finance',
    address: '0x0000000000000000000000000000000000000000',
    category: 'Yield',
    tvlEndpoint: 'https://api.yearn.finance/v1/chains/8453/vaults/all',
    isActive: true,
    launchDate: '2023-09-20'
  }
};

// Bridge Protocol Configurations
export const BRIDGE_PROTOCOLS: Record<string, ProtocolConfig> = {
  baseBridge: {
    name: 'Base Bridge',
    address: '0x4200000000000000000000000000000000000010',
    category: 'Bridge',
    tvlEndpoint: 'https://api.base.org/api/v1/bridge/stats',
    isActive: true,
    launchDate: '2023-07-13'
  }
};

// Utility Functions
export const getAllProtocols = (): Record<string, ProtocolConfig> => {
  return {
    ...DEX_PROTOCOLS,
    ...LENDING_PROTOCOLS,
    ...YIELD_PROTOCOLS,
    ...BRIDGE_PROTOCOLS
  };
};

export const getProtocolsByCategory = (category: ProtocolConfig['category']): Record<string, ProtocolConfig> => {
  const allProtocols = getAllProtocols();
  return Object.entries(allProtocols)
    .filter(([_, protocol]) => protocol.category === category)
    .reduce((acc, [key, protocol]) => {
      acc[key] = protocol;
      return acc;
    }, {} as Record<string, ProtocolConfig>);
};

export const getActiveProtocols = (): Record<string, ProtocolConfig> => {
  const allProtocols = getAllProtocols();
  return Object.entries(allProtocols)
    .filter(([_, protocol]) => protocol.isActive)
    .reduce((acc, [key, protocol]) => {
      acc[key] = protocol;
      return acc;
    }, {} as Record<string, ProtocolConfig>);
};

export const getProtocolByAddress = (address: string): ProtocolConfig | undefined => {
  const allProtocols = getAllProtocols();
  return Object.values(allProtocols).find(protocol => 
    protocol.address.toLowerCase() === address.toLowerCase()
  );
};

// API Configuration
export const API_CONFIG = {
  endpoints: {
    defiLlama: 'https://api.llama.fi',
    coinGecko: 'https://api.coingecko.com/api/v3',
    theGraph: 'https://api.thegraph.com/subgraphs/name',
    alchemy: 'https://base-mainnet.g.alchemy.com/v2'
  },
  refreshIntervals: {
    tvl: 30000, // 30 seconds
    prices: 10000, // 10 seconds
    yields: 60000, // 1 minute
    transactions: 5000 // 5 seconds
  }
};

// Export default configuration
export default {
  network: BASE_CONFIG,
  protocols: getAllProtocols(),
  api: API_CONFIG
};
