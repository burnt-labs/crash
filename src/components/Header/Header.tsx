'use client';

import React from 'react';
import clsx from 'clsx';
import { useStackNavigator } from '@/providers/NavigatorProvider';
import Logo from '@/assets/images/header/logo.svg?inline';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const { currentScreen } = useStackNavigator();

  return (
    <header className={clsx(styles.root, styles[currentScreen])}>
      <div className={styles.container}>
        <a href="#" className={styles.link}>
          <Logo />
        </a>
      </div>
    </header>
  );
};
