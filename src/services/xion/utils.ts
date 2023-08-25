import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';

export const createWallet = async (
  mnemonic?: string,
): Promise<DirectSecp256k1HdWallet> => {
  if (mnemonic) {
    return DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: 'xion',
    });
  }

  return DirectSecp256k1HdWallet.generate(24, {
    prefix: 'xion',
  });
};

export const createRpcClient = async (
  rpcUrl: string,
  signer: DirectSecp256k1HdWallet,
): Promise<SigningStargateClient> => {
  return SigningStargateClient.connectWithSigner(rpcUrl, signer);
};
