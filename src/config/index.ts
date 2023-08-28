interface AppConfig {
  xionRpcUrl: string;
  xionExplorerUrl: string;
  xionFaucetApiUrl: string;
  xionFaucetAddress: string;
  txSpamDuration: number;
  txSpamInterval: number;
  fundingAmount: string;
  mnemonics?: string[];
  numberOfSigners?: number;
}

export const appConfig: AppConfig = {
  xionRpcUrl: process.env.NEXT_PUBLIC_XION_RPC as string,
  xionExplorerUrl: process.env.NEXT_PUBLIC_XION_EXPLORER as string,
  xionFaucetApiUrl: process.env.NEXT_PUBLIC_XION_FAUCET_API as string,
  xionFaucetAddress: process.env.NEXT_PUBLIC_XION_FAUCET_ADDRESS as string,
  txSpamDuration: parseInt(process.env.NEXT_PUBLIC_TX_SPAM_DURATION as string),
  txSpamInterval: 50,
  // numberOfSigners: 16,
  fundingAmount: '2000000uxion',
  mnemonics: [
    'draft twin rigid reunion either slight hint sell choice curtain harbor denial lazy salon open laugh pattern census blouse smooth refuse boring grow menu',
  ],
};
