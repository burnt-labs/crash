'use client';

import React, { createContext } from 'react';
import { useTxSpamWorker } from '@/hooks/useTxSpamWorker';

// import Logo from '@/assets/icons/arrow.svg?inline';

interface GameState {
  ///
}

interface GameProviderProps {
  children: React.ReactNode;
}

const initialGameState: GameState = {};

export const GameContext = createContext<GameState>(initialGameState);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  // const [gameState, setGameState] = useState<GameState>(initialGameState);
  const { txHashes, start } = useTxSpamWorker({ duration: 200000 });

  // const handleWork = () => {
  //   start();
  // };

  console.log('txHashes', txHashes);

  return (
    <GameContext.Provider value={{}}>
      {/* <Logo />
      <button onClick={handleWork}>Work</button> */}
      {children}
    </GameContext.Provider>
  );
};
