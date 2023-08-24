'use client';

import React from 'react';
// import clsx from 'clsx';

import styles from './WalletCreated.module.scss';

export const WalletCreated: React.FC = () => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h3 className={styles.title}>WALLET IS CREATED</h3>
      </div>
    </section>
  );
};
