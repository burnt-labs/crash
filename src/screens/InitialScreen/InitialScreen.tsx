'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from '@/components/ArrowButton';
import { AnimationBg } from '@/components/AnimationBg';
import { LoadingStage } from './LoadingStage';
import { useGame } from '@/providers/GameProvider';
import { FinalStage } from './FinalStage';
import { easeOutSine, randomInteger, scrollTo } from '@/utils';

import loadingTexts from '@/data/loadingTexts';

import styles from './InitialScreen.module.scss';
import { useStackNavigator } from '@/providers/NavigatorProvider';

export const InitialScreen: React.FC = () => {
  const { initGame } = useGame();
  const [isLoading, setIsLoading] = useState(false);
  const [isGameInited, setIsGameInited] = useState(false);
  const { navigateTo } = useStackNavigator();

  const [stageTexts, setStageTexts] = useState<string[]>([]);

  const handleStart = async () => {
    let startIndex = randomInteger(0, loadingTexts.length);

    setStageTexts([
      loadingTexts[startIndex],
      loadingTexts[++startIndex % loadingTexts.length],
      loadingTexts[++startIndex % loadingTexts.length],
    ]);

    setIsLoading(true);
    scrollTo(window.innerHeight * 4, 8000, easeOutSine).then(() => {
      setIsLoading(false);
    });
    await initGame();
    setIsGameInited(true);
  };

  const isFinished = isGameInited && !isLoading;

  useEffect(() => {
    if (isFinished) {
      if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
      }

      setTimeout(() => {
        navigateTo('GameScreen');
      }, 3000);
    }
  }, [isFinished, navigateTo]);

  return (
    <section
      className={clsx(styles.root, {
        [styles.finished]: isFinished,
      })}
    >
      <svg
        className={styles.line}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <line x1="0" y1="0" x2="1" y2="100%" stroke="black" />
      </svg>
      <div className={styles.hero}>
        <AnimationBg />
        <div className={styles.container}>
          <h1 className={styles.title}>BURN IT DOWN</h1>
          <p className={styles.subtitle}>
            The first L1 blockchain purpose built for consumer adoption.
          </p>
          <p className={styles.caption}>
            To see just how fast it is, you<span>&#39;</span>re invited to come
            and burn it down. During the next twenty seconds, you will see how
            fast and productive our blockchain.
          </p>
          <ArrowButton isAnimated isActive={isLoading} onClick={handleStart} />
        </div>
      </div>

      <LoadingStage title={stageTexts[0]} threshold={0.77} />
      <LoadingStage title={stageTexts[1]} threshold={1.9} />
      <LoadingStage title={stageTexts[2]} threshold={3} />
      <FinalStage className={styles.finalStage} thresholds={[3.8, 3.8]} />
    </section>
  );
};