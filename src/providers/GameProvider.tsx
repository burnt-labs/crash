'use client';

import React, { createContext, useMemo, useState, useCallback } from 'react';
import { Game } from '@/services/game';
import { appConfig } from '@/config';

interface GameProviderProps {
  children: React.ReactNode;
}
interface GameContextState {
  getGameInstance: () => Game;
  initGame: () => Promise<void>;
  startGame: () => void;
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
};

export const GameContext = createContext<GameContextState>(initialGameState);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameInstance] = useState<Game>(
    () =>
      new Game(
        appConfig.numberOfSigners || appConfig.mnemonics?.length || 0,
        appConfig.txSpamDuration,
        appConfig.txSpamInterval,
        appConfig.mnemonics,
      ),
  );

  const handleInitGame = useCallback(async () => {
    await gameInstance.init();
  }, [gameInstance]);

  const handleStartGame = useCallback(async () => {
    gameInstance.start();
  }, [gameInstance]);

  const getGameInstance = useCallback(() => gameInstance, [gameInstance]);

  const value = useMemo<GameContextState>(
    () => ({
      getGameInstance,
      initGame: handleInitGame,
      startGame: handleStartGame,
    }),
    [getGameInstance, handleInitGame, handleStartGame],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  return React.useContext(GameContext);
};
