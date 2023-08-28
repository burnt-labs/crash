import { appConfig } from '@/config';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SignerData, SigningStargateClient } from '@cosmjs/stargate';
import { XionSigner } from './XionSigner';

export class XionService {
  public static async requestFunds(
    address: string,
    coin: string = '2000000uxion',
  ): Promise<void> {
    console.log(`Requesting funds for address ${address}...`);

    try {
      const response = await fetch(appConfig.xionFaucetApiUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address, coins: [coin] }),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
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
  ): Promise<XionSigner> {
    const client = await SigningStargateClient.connectWithSigner(
      appConfig.xionRpcUrl,
      wallet,
    );

    const [firstAccount] = await wallet.getAccounts();
    const { sequence, accountNumber } = await client.getSequence(
      firstAccount.address,
    );
    const chainId = await client.getChainId();

    const initialSenderData: SignerData = {
      chainId,
      accountNumber,
      sequence,
    };

    return new XionSigner(firstAccount.address, initialSenderData, client);
  }
}
