import { appConfig } from '@/config';
import { createClient } from '@/services/xion';

const xionClientPromise = createClient(appConfig.rpcUrl);

export interface TxEvent {
  event: 'tx';
  hash: string;
}

export interface DoneEvent {
  event: 'done';
  count: number;
}

self.addEventListener('message', async (event: MessageEvent<number>) => {
  const duration = event.data;
  const xionClient = await xionClientPromise;
  let isProcessing = true;
  let count = 0;

  setTimeout(() => {
    isProcessing = false;
  }, duration);

  while (isProcessing) {
    xionClient.getHeight().then((height) => {
      const txEvent: TxEvent = {
        event: 'tx',
        hash: height.toString(),
      };

      self.postMessage(txEvent);
    });

    count++;
  }

  const doneEvent: DoneEvent = {
    event: 'done',
    count,
  };

  self.postMessage(doneEvent);
});
