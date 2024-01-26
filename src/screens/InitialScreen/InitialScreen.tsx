'use client';

import React from 'react';
import clsx from 'clsx';
import { AnimationBg } from '@/components/AnimationBg';

import styles from './InitialScreen.module.scss';

export const InitialScreen: React.FC = () => {
  return (
    <section className={clsx(styles.root, {})}>
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
          <h1 className={styles.title}>CRASH GAME</h1>
          <p className={styles.subtitle}>Well, that was fun</p>
        </div>
      </div>
    </section>
  );
};
