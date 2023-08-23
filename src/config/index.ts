interface AppConfig {
  rpcUrl: string;
}

export const appConfig: AppConfig = {
  rpcUrl: process.env.NEXT_PUBLIC_RPC as string,
};
