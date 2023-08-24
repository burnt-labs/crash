'use client';

import React, { useEffect, useRef } from 'react';

import Logo from '@/assets/images/header/logo.svg?inline';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const sticky = 30;

    const handleScroll = () => {
      if (window.scrollY > sticky) {
        headerRef.current?.classList.add(styles.sticky);
      } else {
        headerRef.current?.classList.remove(styles.sticky);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header ref={headerRef} className={styles.root}>
      <div className={styles.container}>
        <a href="#" className={styles.link}>
          <Logo />
        </a>
      </div>
    </header>
  );
};
