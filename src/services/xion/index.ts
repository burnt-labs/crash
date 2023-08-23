import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

export const createClient = async (
  rpcUrl: string,
): Promise<SigningStargateClient> => {
  const wallet: DirectSecp256k1HdWallet =
    await DirectSecp256k1HdWallet.generate(24, {
      prefix: 'xion',
    });

  const client = await SigningStargateClient.connectWithSigner(rpcUrl, wallet);

  return client;
};
