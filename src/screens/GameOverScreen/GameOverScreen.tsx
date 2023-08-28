'use client';

import React from 'react';

interface GameOverScreenProps {
  className?: string;
}

import { ArrowButton } from '@/components/ArrowButton';
import { AnimationBg } from '@/components/AnimationBg';
import { useGame } from '@/providers/GameProvider';
import { useStackNavigator } from '@/providers/NavigatorProvider';

import styles from './GameOverScreen.module.scss';

export const GameOverScreen: React.FC<GameOverScreenProps> = () => {
  const { navigateTo } = useStackNavigator();
  const { getGameInstance } = useGame();

  const handleRestart = () => {
    const game = getGameInstance();

    game.restart();

    navigateTo('GameScreen');
  };

  return (
    <section className={styles.root}>
      <AnimationBg className={styles.bg} />
      <div className={styles.container}>
        <h1 className={styles.title}>Thank you for participating</h1>
        <div className={styles.stats}>
          <div className={styles.statsItem}>
            <span className={styles.statsValue}>
              {getGameInstance().getState().txCount}
            </span>
            <span className={styles.statsCaption}>Completely transactions</span>
          </div>
          <div className={styles.statsItem}>
            <span className={styles.statsValue}>20s</span>
            <span className={styles.statsCaption}>Session duration</span>
          </div>
          <div className={styles.statsItem}>
            <span className={styles.statsValue}>0.01%</span>
            <span className={styles.statsCaption}>
              From total in the Burnt network
            </span>
          </div>
        </div>

        <p className={styles.caption}>You can restart the process</p>
        <ArrowButton className={styles.arrowButton} onClick={handleRestart} />
      </div>
    </section>
  );
};
