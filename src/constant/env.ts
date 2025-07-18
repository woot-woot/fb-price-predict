export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const PUBLIC_ENVIRONMENT = {
  NEXT_PUBLIC_SHOW_LOGGER: isLocal ? true : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' || false,
  NEXT_PUBLIC_COSMOS_API_URL: process.env.NEXT_PUBLIC_COSMOS_API_URL as string,
  NEXT_PUBLIC_TENDERMINT_URL: process.env.NEXT_PUBLIC_TENDERMINT_URL as string,
  NEXT_PUBLIC_WS_ENDPOINT_URL: process.env.NEXT_PUBLIC_WS_ENDPOINT_URL as string,
  NEXT_PUBLIC_BLOCK_EXPLORER_URL: process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL as string,
  NEXT_PUBLIC_ADDRESS_PREFIX: process.env.NEXT_PUBLIC_ADDRESS_PREFIX as string,
  NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID as string,
  NEXT_PUBLIC_FAIRYRING_CHAIN_FAUCET_URL: process.env.NEXT_PUBLIC_FAIRYRING_CHAIN_FAUCET_URL as string,
  NEXT_PUBLIC_FAUCET_ADDRESS: process.env.NEXT_PUBLIC_FAUCET_ADDRESS as string,
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
  NEXT_PUBLIC_ADMIN_ADDRESSES: process.env.NEXT_PUBLIC_ADMIN_ADDRESSES as string,
  NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF as string,
  NEXT_PUBLIC_GAME_URL: process.env.NEXT_PUBLIC_GAME_URL as string,
};

/* 
export const PRIVATE_ENVIRONMENT = {
  DATABASE_URL: process.env.DATABASE_URL as string,
  DIRECT_URL: process.env.DIRECT_URL as string,
  API_KEY: process.env.API_KEY as string,
}; */ // ! Not needed for this task

export const FAIRYRING_ENV = {
  apiURL: PUBLIC_ENVIRONMENT.NEXT_PUBLIC_COSMOS_API_URL,
  rpcURL: PUBLIC_ENVIRONMENT.NEXT_PUBLIC_TENDERMINT_URL,
  wsURL: PUBLIC_ENVIRONMENT.NEXT_PUBLIC_WS_ENDPOINT_URL,
  prefix: PUBLIC_ENVIRONMENT.NEXT_PUBLIC_ADDRESS_PREFIX,
  chainID: PUBLIC_ENVIRONMENT.NEXT_PUBLIC_CHAIN_ID,
  faucetAddress: PUBLIC_ENVIRONMENT.NEXT_PUBLIC_FAUCET_ADDRESS,
  explorerUrl: PUBLIC_ENVIRONMENT.NEXT_PUBLIC_BLOCK_EXPLORER_URL,
};
