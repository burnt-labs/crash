interface AppConfig {
  rpcUrl: string;
  faucetApiUrl: string;
  faucetAddress: string;
  txSpamDuration: number;
}

export const appConfig: AppConfig = {
  rpcUrl: process.env.NEXT_PUBLIC_RPC as string,
  faucetApiUrl: process.env.NEXT_PUBLIC_FAUCET_API as string,
  faucetAddress: process.env.NEXT_PUBLIC_FAUCET_ADDRESS as string,
  txSpamDuration: parseInt(process.env.NEXT_PUBLIC_TX_SPAM_DURATION as string),
};
