import { appConfig } from '@/config';
import { TRANSFER_AMOUNT, GAS_AMOUNT_TOKEN_TRANSFER } from '@/constants';
import { XionService } from '@/services/xion';
import { wait } from '@/utils';

export interface TxEvent {
  event: 'tx';
  hash: string;
}

export interface DoneEvent {
  event: 'done';
  count: number;
}

export interface StartEvent {
  event: 'start';
  mnemonic: string;
  duration: number;
}

self.addEventListener('message', async (event: MessageEvent<StartEvent>) => {
  if (event.data.event !== 'start') {
    throw new Error('Invalid event');
  }

  const duration = event.data.duration;
  let isProcessing = true;
  let count = 0;

  const xionService = new XionService(appConfig.rpcUrl, event.data.mnemonic);
  const { address } = await xionService.getCurrentAccountData();
  const { accountNumber, sequence, chainId } =
    await xionService.getSignerData(address);

  const senderAddress = address;
  const recipientAddress = appConfig.faucetAddress;

  let accountSequence = sequence;

  setTimeout(() => {
    isProcessing = false;
  }, duration);

  while (isProcessing) {
    console.log('spamming tx: ', count);

    const signerData = {
      chainId,
      accountNumber,
      sequence: accountSequence,
    };

    xionService
      .sendTokens(senderAddress, recipientAddress, TRANSFER_AMOUNT, signerData)
      .then(async (hash: string) => {
        const txEvent: TxEvent = {
          event: 'tx',
          hash: hash,
        };

        self.postMessage(txEvent);
      })
      .catch((err: Error) => {
        console.log(err);
      });

    if (count === 500) {
      isProcessing = false;
    }

    accountSequence += 1;
    count++;

    await wait(70);
  }

  const senderBalance = await xionService.getBalance(address);
  const amount = +senderBalance.amount;

  console.log('account balance after spam: ', amount);

  if (amount > GAS_AMOUNT_TOKEN_TRANSFER) {
    await xionService.sendTokens(
      address,
      recipientAddress,
      amount - GAS_AMOUNT_TOKEN_TRANSFER,
      {
        chainId,
        accountNumber,
        sequence: accountSequence,
      },
    );
  }

  const doneEvent: DoneEvent = {
    event: 'done',
    count,
  };

  self.postMessage(doneEvent);
});
