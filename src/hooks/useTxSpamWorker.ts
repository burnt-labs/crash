import { useEffect, useState, useCallback } from 'react';
import { DoneEvent, StartEvent, TxEvent } from '@/workers/spam-worker';

interface UseTxSpamWorkerProps {
  duration: number;
}

export const useTxSpamWorker = ({ duration }: UseTxSpamWorkerProps) => {
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [txHashes, setTxHashes] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window.Worker !== 'undefined') {
      const workerInstance = new Worker(
        new URL('../workers/spam-worker.ts', import.meta.url),
      );

      setWorker(workerInstance);

      workerInstance.onmessage = (event: MessageEvent<TxEvent | DoneEvent>) => {
        console.log('event:', event.data);

        if (event.data.event === 'done') {
          setIsDone(false);
        }

        if (event.data.event == 'tx') {
          const hash = event.data.hash;

          setTxHashes((prev) => [...prev, hash]);
        }
      };

      workerInstance.onerror = (err) => {
        setError(err);
      };

      return () => {
        workerInstance.terminate();
      };
    } else {
      console.error('Web Workers are not supported in this browser');
    }
  }, []);

  const handleStart = useCallback(
    (mnemonic: string) => {
      if (isStarted) {
        throw new Error('Worker is already started');
      }

      if (worker) {
        const startEvent: StartEvent = {
          event: 'start',
          mnemonic,
          duration,
        };

        worker.postMessage(startEvent);
        setIsStarted(true);
      }
    },
    [duration, isStarted, worker],
  );

  return { isDone, txHashes, error, startSpaming: handleStart };
};
