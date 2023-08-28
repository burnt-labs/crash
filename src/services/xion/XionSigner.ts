import { SignerData, SigningStargateClient } from '@cosmjs/stargate';
import { EncodeObject } from '@cosmjs/proto-signing';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import {
  GAS_AMOUNT_TOKEN_TRANSFER,
  GAS_LIMIT_TOKEN_TRANSFER,
} from '@/constants';
import { praseExpectedSequence } from './utils';

export class XionSigner {
  public readonly address: string;

  private client: SigningStargateClient;

  private chainId!: string;
  private accountNumber!: number;
  private sequence!: number;
  private prevExpectedSequences: { [key: number]: number } = {};

  constructor(
    address: string,
    signerData: SignerData,
    client: SigningStargateClient,
  ) {
    this.address = address;
    this.client = client;
    this.chainId = signerData.chainId;
    this.accountNumber = signerData.accountNumber;
    this.sequence = signerData.sequence;
  }

  async sendTokens(toAddress: string, amount: number) {
    try {
      const fromAddress = this.address;

      const signerData: SignerData = {
        accountNumber: this.accountNumber,
        sequence: this.sequence,
        chainId: this.chainId,
      };

      this.sequence++;

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

      const hash = await this.client.broadcastTxSync(txBytes);

      return hash;
    } catch (err) {
      const expectedSequence = praseExpectedSequence((err as Error).message);

      if (!expectedSequence || this.prevExpectedSequences[expectedSequence]) {
        throw err;
      }

      this.prevExpectedSequences[expectedSequence] = expectedSequence;
      this.sequence = expectedSequence + 1;

      throw err;
    }
  }
}
