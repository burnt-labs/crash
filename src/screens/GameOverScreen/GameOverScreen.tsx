import React from 'react';

interface GameOverScreenProps {
  className?: string;
}

import { ArrowButton } from '@/components/ArrowButton';
import { AnimationBg } from '../AnimationBg';
// import { useStackNavigator } from '@/providers/NavigatorProvider';

import styles from './GameOverScreen.module.scss';

export const GameOverScreen: React.FC<GameOverScreenProps> = () => {
  // const { navigateTo } = useStackNavigator();

  // const handleButtonClick = () => {
  //   navigateTo('SetupScreen');
  // };

  return (
    <section className={styles.root}>
      <AnimationBg />
      <div className={styles.container}>
        <h1 className={styles.title}>
          Thank you <br></br> for participating
        </h1>
        <p className={styles.subtitle}>
          <span className={styles.digits}>500 transactions</span> occurred in{' '}
          <span className={styles.digits}>20 seconds</span>, which is{' '}
          <span className={styles.digits}>0.01%</span> of all transactions in
          the Burnt network
        </p>
        <p className={styles.caption}>You can restart the process</p>
        <ArrowButton />
      </div>
    </section>
  );
};
