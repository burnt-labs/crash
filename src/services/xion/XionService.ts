import { appConfig } from '@/config';
import { DirectSecp256k1HdWallet, EncodeObject } from '@cosmjs/proto-signing';
import { SignerData, SigningStargateClient } from '@cosmjs/stargate';
import { XionSigner } from './XionSigner';
import { fetchWithRetry } from '@/services/http';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

import { SendAuthorization } from 'cosmjs-types/cosmos/bank/v1beta1/authz';
import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';
import { MsgGrant } from 'cosmjs-types/cosmos/authz/v1beta1/tx';

export class XionService {
  public static async requestFunds(
    address: string,
    coin: string = '1000000uxion',
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
        // 3 minutes
        timeout: 180000,
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
    accountAddress: string | undefined,
  ): Promise<XionSigner> {
    const client = await SigningStargateClient.connectWithSigner(
      appConfig.xionRpcUrl,
      wallet,
    );

    // 1800 seconds (30 minutes) till grant expiration.
    const expirationTime = 1800000;
    const sendAuth = async () => {
      if (client) {
        const [firstAccount] = await wallet.getAccounts();
        const sendAuthValue = SendAuthorization.encode(
          SendAuthorization.fromPartial({
            spendLimit: [
              Coin.fromPartial({
                amount: '2000',
                denom: 'uxion',
              }),
            ],
          }),
        ).finish();
        const grantValue = MsgGrant.fromPartial({
          grant: {
            authorization: {
              typeUrl: '/cosmos.bank.v1beta1.SendAuthorization',
              value: sendAuthValue,
            },
            expiration: {
              seconds: Math.floor((Date.now() + expirationTime) / 1000),
            },
          },
          grantee: firstAccount.address,
          granter: accountAddress,
        });

        return {
          typeUrl: '/cosmos.authz.v1beta1.MsgGrant',
          value: grantValue,
        };
      }
    };

    const grant = async () => {
      const msg = await sendAuth();

      if (accountAddress) {
        return walletClient?.signAndBroadcast(
          accountAddress,
          [msg as EncodeObject],
          {
            amount: [
              {
                denom: 'uxion',
                amount: '10000',
              },
            ],
            gas: '400000',
          },
          '',
        );
      }
    };
    // const revokeFee = async () => {
    //   const [firstAccount] = await wallet.getAccounts();
    //   const message = {
    //     typeUrl: '/cosmos.feegrant.v1beta1.MsgRevokeAllowance',
    //     value: MsgRevokeAllowance.fromPartial({
    //       granter: accountAddress,
    //       grantee: firstAccount.address,
    //     }),
    //   };

    //   return client.signAndBroadcast(
    //     firstAccount.address,
    //     [message],
    //     {
    //       amount: [
    //         {
    //           denom: 'uxion',
    //           amount: '10000',
    //         },
    //       ],
    //       gas: '400000',
    //     },
    //     'Feegrant from Ixo',
    //   );
    // }
    // const grantFee = async () => {
    //   const [firstAccount] = await wallet.getAccounts();
    //   const message = {
    //     typeUrl: '/cosmos.feegrant.v1beta1.MsgGrantAllowance',
    //     value: MsgGrantAllowance.fromPartial({
    //       granter: firstAccount.address,
    //       grantee: accountAddress,
    //       allowance: {
    //         typeUrl: '/cosmos.feegrant.v1beta1.BasicAllowance',
    //         value: BasicAllowance.encode(
    //           BasicAllowance.fromPartial({
    //             spendLimit: [
    //               {
    //                 denom: 'uxion',
    //                 amount: '1000000',
    //               },
    //             ],
    //             expiration: {
    //               seconds: Math.floor((Date.now() + 40000) / 1000),
    //             },
    //           }),
    //         ).finish(),
    //       },
    //     }),
    //   };

    //   return client.signAndBroadcast(
    //     firstAccount.address,
    //     [message],
    //     {
    //       amount: [
    //         {
    //           denom: 'uxion',
    //           amount: '1000',
    //         },
    //       ],
    //       gas: '400000',
    //     },
    //     '',
    //   );
    // }

    try {
      const hash = await grant();

      console.log(`Grant authorization tx hash: ${hash}`);
      //const result1 = await revokeFee()
      //const result1 = await grantFee();
    } catch (error) {
      console.error('Error:', error);
    }

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

    return new XionSigner(
      firstAccount.address,
      initialSenderData,
      client,
      walletClient,
      accountAddress,
    );
  }
}
