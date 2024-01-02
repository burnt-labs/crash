'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { TxBoxData, TxBox } from '@/components/TxBox';
import { useGame } from '@/providers/GameProvider';
import { useStackNavigator } from '@/providers/NavigatorProvider';
import { fillScreenWithSquares } from '@/utils';

import styles from './GameScreen.module.scss';
import { Timer } from '@/components/Timer';

interface GameScreenProps {
  className?: string;
}

export const GameScreen: React.FC<GameScreenProps> = () => {
  const { getGameInstance, startGame } = useGame();
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameStarting, setIsGameStarting] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [txCards, setTxCards] = useState<TxBoxData[]>([]);
  const { navigateTo } = useStackNavigator();

  useEffect(() => {
    const game = getGameInstance();

    const squares = fillScreenWithSquares(100, 100, 5);
    const handleGameTx = (txHash: string, index: number) => {
      const x = squares[index % squares.length].x;
      const y = squares[index % squares.length].y;

      const newTxCard: TxBoxData = { x, y, hash: txHash };

      setTxCards((txCards) => [...txCards, newTxCard]);
    };

    game.on('tx', handleGameTx);

    const handleGameStart = () => {
      setIsGameStarted(true);
      console.log('Game started');
    };

    game.on('started', handleGameStart);

    const handleGameFinished = () => {
      setIsGameFinished(true);
      setTimeout(() => {
        navigateTo('ResultScreen');
      }, 3000);
      console.log('Game finished');
    };

    game.on('finished', handleGameFinished);

    return () => {
      game.off('tx', handleGameTx);
      game.off('started', handleGameStart);
      game.off('finished', handleGameFinished);
      console.log('GameScreen unmounted');
    };
  }, [getGameInstance, navigateTo]);

  const handleStart = () => {
    setIsGameStarting(true);

    setTimeout(() => {
      startGame();
    }, 1000);
  };

  return (
    <section
      className={clsx(styles.root, {
        [styles.finished]: isGameFinished,
        [styles.starting]: isGameStarting,
        [styles.started]: isGameStarted,
      })}
    >
      <button className={styles.startBtn} onClick={handleStart}>
        Start Game
      </button>

      {txCards.map(({ hash, x, y }) => (
        <TxBox key={hash} hash={hash} x={x} y={y} size={20} />
      ))}

      {isGameStarting && (
        <p className={styles.hint}>Click anywhere to send a transaction.</p>
      )}

      {isGameStarted && (
        <Timer
          className={styles.timer}
          duration={getGameInstance().getState().duration}
          endTime={getGameInstance().getState().endTime}
        />
      )}
    </section>
  );
};
