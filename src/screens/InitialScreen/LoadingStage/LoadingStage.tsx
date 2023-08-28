'use client';

import React, { useEffect, useState } from 'react';
import styles from './LoadingStage.module.scss';
import clsx from 'clsx';

interface LoadingStageProps {
  title: React.ReactNode;
  titleClassName?: string;
  threshold: number;
}

export const LoadingStage: React.FC<LoadingStageProps> = ({
  title,
  titleClassName,
  threshold,
}) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight * threshold) {
        setIsShow(true);
      }
    });
  }, [threshold]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h3
          className={clsx(styles.title, titleClassName, {
            [styles.show]: isShow,
          })}
        >
          {title}
        </h3>
      </div>
    </div>
  );
};
