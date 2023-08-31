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
        <h1 className={styles.title}>Is that all you’ve got?</h1>
        <div className={styles.stats}>
          <div className={styles.statsItem}>
            <span className={styles.statsValue}>
              {getGameInstance().getState().txCount}
            </span>
            <span className={styles.statsCaption}>Transactions sent</span>
          </div>
          <div className={styles.statsItem}>
            <span className={styles.statsValue}>20s</span>
            <span className={styles.statsCaption}>Session duration</span>
          </div>
        </div>

        <p className={styles.caption}>You can restart the process</p>
        <ArrowButton className={styles.arrowButton} onClick={handleRestart} />
      </div>
    </section>
  );
};
