'use client';

import React from 'react';
import { ArrowButton } from '@/components/ArrowButton';
import { useStackNavigator } from '@/providers/StackNavigator';

import styles from './InitialScreen.module.scss';

export const InitialScreen: React.FC = () => {
  const { navigateTo } = useStackNavigator();

  const handleButtonClick = () => {
    navigateTo('SetupScreen');
  };

  return (
    <section className={styles.root}>
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
        <ArrowButton onClick={handleButtonClick} />
      </div>
    </section>
  );
};
