'use client';

import { useEffect, useState } from 'react';
import { SigningStargateClient } from '@cosmjs/stargate';

import { appConfig } from '@/config';
import { createClient } from '@/services/xion';

export const useXionClient = (): SigningStargateClient | null => {
  const [client, setClient] = useState<SigningStargateClient | null>(null);

  useEffect(() => {
    const init = async () => {
      const client = await createClient(appConfig.rpcUrl);

      setClient(client);
    };

    init();
  }, []);

  return client;
};
