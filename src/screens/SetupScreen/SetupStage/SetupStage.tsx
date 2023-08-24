'use client';

import React from 'react';
import styles from './SetupStage.module.scss';

interface SetupStageProps {
  title: React.ReactNode;
}

export const SetupStage: React.FC<SetupStageProps> = (title) => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h3 className={styles.title}>{title.title}</h3>
      </div>
    </section>
  );
};
