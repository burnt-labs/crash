'use client';

import React from 'react';
import styles from './SetupStage.module.scss';

export const SetupStage: React.FC = () => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h3 className={styles.title}>WALLET IS CREATED</h3>
      </div>
    </section>
  );
};
