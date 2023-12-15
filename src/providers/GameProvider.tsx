'use client';

import React, {
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { GameClicker } from '@/services/game';
import { appConfig } from '@/config';
import { useAbstraxionSigningClient } from '@burnt-labs/abstraxion';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

interface GameProviderProps {
  children: React.ReactNode;
}
interface GameContextState {
  getGameInstance: () => GameClicker;
  initGame: () => Promise<void>;
  startGame: () => void;
  walletClient: SigningCosmWasmClient | undefined;
}

const initialGameState: GameContextState = {
  getGameInstance: () => {
    throw new Error('GameProvider not initialized');
  },
  initGame: () => {
    throw new Error('GameProvider not initialized');
  },
  startGame: () => {
    throw new Error('GameProvider not initialized');
  },
  walletClient: undefined,
};

export const GameContext = createContext<GameContextState>(initialGameState);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const { client: walletClient } = useAbstraxionSigningClient();
  const [gameInstance, setGameInstance] = useState<GameClicker>(
    () =>
      new GameClicker(
        appConfig.txSpamDuration,
        appConfig.mnemonics,
        walletClient,
      ),
  );

  useEffect(() => {
    if (walletClient) {
      setGameInstance(
        new GameClicker(
          appConfig.txSpamDuration,
          appConfig.mnemonics,
          walletClient,
        ),
      );
    }
  }, [walletClient]);

  const handleInitGame = useCallback(async () => {
    if (gameInstance) {
      await gameInstance.init();
    }
  }, [gameInstance]);

  const handleStartGame = useCallback(() => {
    if (gameInstance) {
      gameInstance.start();
    }
  }, [gameInstance]);

  const getGameInstance = useCallback(() => gameInstance, [gameInstance]);

  const value = useMemo<GameContextState>(
    () => ({
      getGameInstance,
      walletClient,
      initGame: handleInitGame,
      startGame: handleStartGame,
    }),
    [getGameInstance, handleInitGame, handleStartGame, walletClient],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  return React.useContext(GameContext);
};
