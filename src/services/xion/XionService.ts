/* eslint-disable */
import { appConfig } from '@/config';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SignerData, SigningStargateClient } from '@cosmjs/stargate';
import { XionSigner } from './XionSigner';
import { fetchWithRetry } from '@/services/http';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export class XionService {
  public static async requestFunds(
    address: string,
    coin: string = '6000000uxion',
  ): Promise<Response> {
    console.log(`Requesting funds for address ${address}...`);

    return fetchWithRetry(
      appConfig.xionFaucetApiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, coins: [coin] }),
      },
      {
        timeout: 60000,
      },
    );
  }

  public static async createWallet(
    mnemonic?: string,
  ): Promise<DirectSecp256k1HdWallet> {
    const walletOptions = { prefix: 'xion' };

    if (!mnemonic) {
      return DirectSecp256k1HdWallet.generate(24, walletOptions);
    }

    return DirectSecp256k1HdWallet.fromMnemonic(mnemonic, walletOptions);
  }

  public static async createXionSigner(
    wallet: DirectSecp256k1HdWallet,
    walletClient: SigningCosmWasmClient | undefined,
  ): Promise<XionSigner> {
    const client = await SigningStargateClient.connectWithSigner(
      appConfig.xionRpcUrl,
      wallet,
    );
    //@ts-ignore
    const { sequence, accountNumber } = await walletClient.getSequence(
      'xion1x7hcz7r6rs0ylzur30rytded273efakhha6qxz',
    );
    //@ts-ignore
    const chainId = await walletClient.getChainId();

    const initialSenderData: SignerData = {
      chainId,
      accountNumber,
      sequence,
    };

    return new XionSigner(
      'xion1x7hcz7r6rs0ylzur30rytded273efakhha6qxz',
      initialSenderData,
      client,
      walletClient,
    );
  }
}
