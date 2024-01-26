interface AppConfig {
  xionRpcUrl: string;
  xionExplorerUrl: string;
  xionFaucetApiKey: string;
  xionFaucetApiUrl: string;
  xionFaucetAddress: string;
  txSpamDuration: number;
  txSpamInterval: number;
  fundingAmount: string;
  mnemonics?: string[];
  numberOfSigners?: number;
  siteUrl: string;
}

export const appConfig: AppConfig = {
  xionRpcUrl: process.env.NEXT_PUBLIC_XION_RPC as string,
  xionExplorerUrl: process.env.NEXT_PUBLIC_XION_EXPLORER as string,
  xionFaucetApiKey: process.env.NEXT_PUBLIC_XION_FAUCET_API_KEY as string,
  xionFaucetApiUrl: process.env.NEXT_PUBLIC_XION_FAUCET_API as string,
  xionFaucetAddress: process.env.NEXT_PUBLIC_XION_FAUCET_ADDRESS as string,
  txSpamDuration: parseInt(process.env.NEXT_PUBLIC_TX_SPAM_DURATION as string),
  txSpamInterval: 50,
  numberOfSigners: 2,
  fundingAmount: '1000000uxion',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL as string,
  // mnemonics: [
  //   'fatigue later mass devote case over home return oyster guess warrior correct much tip torch robot acid coast response supply emerge antique replace faint',
  // ],
  // only for testing, commenting this out will generate new account on every run
  // mnemonics: [
  //   'draft twin rigid reunion either slight hint sell choice curtain harbor denial lazy salon open laugh pattern census blouse smooth refuse boring grow menu',
  //   'version hire now unique witness short spike avoid shine family rotate velvet elegant journey gold hundred motor cloud pretty auto health dress escape usual',
  // ],
};
