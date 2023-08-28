'use client';

import React from 'react';
import styles from './LoadingStage.module.scss';
import clsx from 'clsx';

interface LoadingStageProps {
  title: React.ReactNode;
  titleClassName?: string;
}

export const LoadingStage: React.FC<LoadingStageProps> = ({
  title,
  titleClassName,
}) => {
  return (
    <section className={styles.root}>
      <div className={styles.container}>
        <h3 className={clsx(styles.title, titleClassName)}>{title}</h3>
      </div>
    </section>
  );
};
