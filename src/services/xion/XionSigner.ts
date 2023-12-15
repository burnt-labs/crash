import { SignerData, SigningStargateClient } from '@cosmjs/stargate';
import { MsgExec } from 'cosmjs-types/cosmos/authz/v1beta1/tx';
import { MsgSend } from 'cosmjs-types/cosmos/bank/v1beta1/tx';
import { EncodeObject } from '@cosmjs/proto-signing';
import { TxRaw } from 'cosmjs-types/cosmos/tx/v1beta1/tx';
import {
  GAS_AMOUNT_TOKEN_TRANSFER,
  GAS_LIMIT_TOKEN_TRANSFER,
} from '@/constants';
import { praseExpectedSequence } from './utils';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export class XionSigner {
  public readonly address: string;

  private client: SigningStargateClient;

  private chainId!: string;
  private accountNumber!: number;
  private sequence!: number;
  private refreshedSequences: { [key: number]: number } = {};
  private sequenceRefreshNumber = 0;
  private txIndex = 0;
  private walletClient: SigningCosmWasmClient | undefined;

  constructor(
    address: string,
    signerData: SignerData,
    client: SigningStargateClient,
    walletClient: SigningCosmWasmClient | undefined,
  ) {
    this.address = address;
    this.client = client;
    this.walletClient = walletClient;
    this.chainId = signerData.chainId;
    this.accountNumber = signerData.accountNumber;
    this.sequence = signerData.sequence;
  }

  async sendTokens(toAddress: string, amount: number, grantee: string) {
    const currentSequenceRefreshNumber = this.sequenceRefreshNumber;

    this.txIndex++;

    try {
      const fromAddress = this.address;

      const signerData: SignerData = {
        accountNumber: this.accountNumber,
        sequence: this.sequence,
        chainId: this.chainId,
      };

      this.sequence++;

      const sendMsg: EncodeObject = {
        typeUrl: '/cosmos.authz.v1beta1.MsgExec',
        value: MsgExec.fromPartial({
          grantee: grantee,
          msgs: [
            {
              typeUrl: '/cosmos.bank.v1beta1.MsgSend',
              value: MsgSend.encode({
                fromAddress,
                toAddress,
                amount: [{ denom: 'uxion', amount: amount.toString() }],
              }).finish(),
            },
          ],
        }),
      };

      console.log(sendMsg);

      const fee = {
        amount: [
          { denom: 'uxion', amount: GAS_AMOUNT_TOKEN_TRANSFER.toString() },
        ],
        gas: GAS_LIMIT_TOKEN_TRANSFER,
      };

      if (this.walletClient) {
        const txRaw = await this.walletClient.sign(
          'xion1x7hcz7r6rs0ylzur30rytded273efakhha6qxz',
          [sendMsg],
          fee,
          '',
          signerData,
        );
        const txBytes = TxRaw.encode(txRaw).finish();
        const hash = await this.walletClient.broadcastTxSync(txBytes);

        return hash;
      }
    } catch (err) {
      const expectedSequence = praseExpectedSequence((err as Error).message);

      if (
        expectedSequence === null ||
        this.refreshedSequences[currentSequenceRefreshNumber]
      ) {
        throw err;
      }

      this.refreshedSequences[this.sequenceRefreshNumber] = expectedSequence;
      this.sequence = expectedSequence;
      this.sequenceRefreshNumber++;
      throw err;
    }
  }
}
