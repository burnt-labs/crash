import { SignerData, SigningStargateClient } from '@cosmjs/stargate';
import {
  AccountData,
  Coin,
  DirectSecp256k1HdWallet,
  EncodeObject,
} from '@cosmjs/proto-signing';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import { appConfig } from '@/config';
import { proxymise } from '@/utils/proxy';
import { createWallet, createRpcClient } from './utils';
import {
  GAS_AMOUNT_TOKEN_TRANSFER,
  GAS_LIMIT_TOKEN_TRANSFER,
} from '@/constants';

export class XionService {
  private readonly faucetApiUrl: string = appConfig.faucetApiUrl;
  private readonly client: SigningStargateClient;
  private readonly wallet: DirectSecp256k1HdWallet;

  constructor(rpcUrl: string, mnemonic?: string) {
    this.wallet = proxymise(createWallet(mnemonic));
    this.client = proxymise(createRpcClient(rpcUrl, this.wallet));
  }

  async sendTokens(
    fromAddress: string,
    toAddress: string,
    amount: number,
    signerData?: SignerData,
  ) {
    const sendMsg: EncodeObject = {
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: {
        fromAddress,
        toAddress,
        amount: [{ denom: 'uxion', amount: amount.toString() }],
      },
    };

    const fee = {
      amount: [
        { denom: 'uxion', amount: GAS_AMOUNT_TOKEN_TRANSFER.toString() },
      ],
      gas: GAS_LIMIT_TOKEN_TRANSFER,
    };

    const txRaw = await this.client.sign(
      fromAddress,
      [sendMsg],
      fee,
      '',
      signerData,
    );

    const txBytes = TxRaw.encode(txRaw).finish();

    return this.client.broadcastTxSync(txBytes);
  }

  async getWallet(): Promise<DirectSecp256k1HdWallet> {
    return this.wallet;
  }

  async getCurrentAccountData(): Promise<AccountData> {
    const [accountData] = await this.wallet.getAccounts();

    return accountData;
  }

  async getSignerData(address: string): Promise<SignerData> {
    const chainId = await this.client.getChainId();
    const { accountNumber, sequence } = await this.client.getSequence(address);

    return {
      accountNumber,
      sequence,
      chainId,
    };
  }

  async getBalance(address: string, searchDenom = 'uxion'): Promise<Coin> {
    return this.client.getBalance(address, searchDenom);
  }

  async requestFunds(address: string): Promise<void> {
    const response = await fetch(this.faucetApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address, coins: ['2000000uxion'] }),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error('Failed to request funds');
    }

    return;
  }
}
