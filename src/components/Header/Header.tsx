'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Logo from '@/assets/images/logo.svg?inline';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const [variant, setVariant] = useState<'default' | 'light' | 'dark'>(
    'default',
  );

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight - 0.15 * window.innerHeight) {
        setVariant('dark');
      } else {
        setVariant('default');
      }
    });
  }, []);

  return (
    <header className={clsx(styles.root, styles[variant])}>
      <div className={styles.container}>
        <a href="/" className={styles.link}>
          <Logo />
        </a>
      </div>
    </header>
  );
};
