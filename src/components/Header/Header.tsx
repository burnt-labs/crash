'use client';

import React from 'react';
import clsx from 'clsx';
import { useStackNavigator } from '@/providers/NavigatorProvider';
import Logo from '@/assets/images/header/logo.svg?inline';

import styles from './Header.module.scss';

const mapScreenToClassName: Record<string, string> = {
  InitialScreen: styles.light,
  SetupScreen: styles.dark,
  GameScreen: styles.dark,
  GameOverScreen: styles.light,
};

export const Header: React.FC = () => {
  const { currentScreen } = useStackNavigator();

  return (
    <header className={clsx(styles.root, mapScreenToClassName[currentScreen])}>
      <div className={styles.container}>
        <a href="/" className={styles.link}>
          <Logo />
        </a>
      </div>
    </header>
  );
};
