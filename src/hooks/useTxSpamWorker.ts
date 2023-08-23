import { useEffect, useState, useCallback } from 'react';

interface UseTxSpamWorkerProps {
  duration: number;
}

export const useTxSpamWorker = ({ duration }: UseTxSpamWorkerProps) => {
  const [isStarted, setIsStarted] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [txHashes, setTxHashes] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window.Worker !== 'undefined') {
      const workerInstance = new Worker(
        new URL('../workers/send-transaction-worker.ts', import.meta.url),
      );

      setWorker(workerInstance);

      workerInstance.onmessage = (event) => {
        setTxHashes((prev) => [...prev, event.data]);
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

  const handleStart = useCallback(() => {
    if (isStarted) {
      throw new Error('Worker is already started');
    }

    if (worker) {
      worker.postMessage(duration);
      setIsStarted(true);
    }
  }, [duration, isStarted, worker]);

  return { txHashes, error, start: handleStart };
};
