import { appConfig } from '@/config';
import { createClient } from '@/services/xion';

const xionClientPromise = createClient(appConfig.rpcUrl);

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
      self.postMessage({
        event: 'tx',
        hash: height,
      });
    });

    count++;
  }

  self.postMessage({
    event: 'done',
    count,
  });
});
