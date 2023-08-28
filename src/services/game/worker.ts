import { appConfig } from '@/config';
import { TRANSFER_AMOUNT } from '@/constants';
import { XionService } from '@/services/xion';
import { wait } from '@/utils';

export interface TxWorkerEvent {
  event: 'tx';
  hash: string;
}

export interface FinishedWorkerEvent {
  event: 'finished';
  count: number;
}

export interface StartWorkerEvent {
  event: 'start';
  mnemonic: string;
  endTime: number;
  interval: number;
}

self.addEventListener(
  'message',
  async (event: MessageEvent<StartWorkerEvent>) => {
    if (event.data.event !== 'start') {
      throw new Error('Invalid event');
    }

    const endTime = event.data.endTime;
    const interval = event.data.interval;
    const mnemonic = event.data.mnemonic;

    const wallet = await XionService.createWallet(mnemonic);
    const signer = await XionService.createXionSigner(wallet);

    let count = 0;

    while (Date.now() < endTime) {
      signer
        .sendTokens(appConfig.xionFaucetAddress, TRANSFER_AMOUNT)
        .then((hash: string) => {
          const txEvent: TxWorkerEvent = { event: 'tx', hash };

          count++;
          self.postMessage(txEvent);
        })
        .catch(() => console.log('Error sending tx'));

      await wait(interval);
    }

    const finishEvent: FinishedWorkerEvent = { event: 'finished', count };

    self.postMessage(finishEvent);
  },
);
