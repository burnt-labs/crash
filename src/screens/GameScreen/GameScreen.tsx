'use client';

import React, { useEffect } from 'react';
import { TxCardItem, TxCard } from '@/components/TxCard/TxCard';
import { useGame } from '@/providers/GameProvider';

import styles from './GameScreen.module.scss';

function shuffleArray(
  array: Array<{
    x: number;
    y: number;
  }>,
) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function fillScreenWithSquares(
  width: number,
  height: number,
  squareSize: number,
) {
  const squares = [];

  const cols = Math.floor(width / squareSize);
  const rows = Math.floor(height / squareSize);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      squares.push({
        x: j * squareSize,
        y: i * squareSize,
      });
    }
  }

  return shuffleArray(squares);
}

interface GameScreenProps {
  className?: string;
}

export const GameScreen: React.FC<GameScreenProps> = () => {
  const { getGameInstance } = useGame();
  const [txCards, setTxCards] = React.useState<TxCardItem[]>([]);
  const { navigateTo } = useStackNavigator();

  useEffect(() => {
    const game = getGameInstance();

    const squares = fillScreenWithSquares(100, 100, 5);

    game.on('tx', (txHash: string, index: number) => {
      const newTxCard: TxCardItem = {
        x: squares[index % squares.length].x,
        y: squares[index % squares.length].y,
        hash: txHash,
      };

      setTxCards((txCards) => [...txCards, newTxCard]);
    });

    game.on('started', () => {
      console.log('Game started');
    });

    game.on('finished', () => {
      setTimeout(() => {
        navigateTo('GameOverScreen');
      }, 6000);
      console.log('Game finished');
    });
  }, [getGameInstance, navigateTo]);

  return (
    <section className={styles.root}>
      {txCards.map(({ hash, x, y }) => (
        <TxCard key={hash} hash={hash} x={x} y={y} size={20} />
      ))}
    </section>
  );
};
