'use client';

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTxSpamWorker } from '@/hooks/useTxSpamWorker';
import { appConfig } from '@/config';
import { XionService } from '@/services/xion';

interface GameProviderProps {
  children: React.ReactNode;
}

type GameState = 'initial' | 'setup' | 'game' | 'end';
interface GameContextState {
  state: GameState;
  start: () => void;
}

const initialGameState: GameContextState = {
  state: 'initial',
  start: () => {
    throw new Error('GameProvider not initialized');
  },
};

export const GameContext = createContext<GameContextState>(initialGameState);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>('initial');
  const { isDone, txHashes, startSpaming } = useTxSpamWorker({
    duration: appConfig.txSpamDuration,
  });

  const handleStartGame = useCallback(async () => {
    try {
      setGameState('setup');

      const xionService = new XionService(
        appConfig.rpcUrl,
        'draft twin rigid reunion either slight hint sell choice curtain harbor denial lazy salon open laugh pattern census blouse smooth refuse boring grow menu',
      );
      const wallet = await xionService.getWallet();
      const { address } = await xionService.getCurrentAccountData();

      console.log('Wallet: ', wallet.mnemonic, address);

      await xionService.requestFunds(address);

      setGameState('game');
      startSpaming(wallet.mnemonic);
    } catch (e) {
      console.error(e);
    }
  }, [startSpaming]);

  useEffect(() => {
    if (isDone) {
      setGameState('end');
    }
  }, [isDone]);

  const value = useMemo(() => {
    return {
      state: gameState,
      start: handleStartGame,
      txHashes,
    };
  }, [gameState, handleStartGame, txHashes]);

  return (
    <GameContext.Provider value={value}>
      <button onClick={handleStartGame}>Start game</button>
      {children}
    </GameContext.Provider>
  );
};

export const useGameState = () => {
  return React.useContext(GameContext);
};
