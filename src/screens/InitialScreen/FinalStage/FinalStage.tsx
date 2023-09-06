import React from 'react';
import clsx from 'clsx';

import styles from './FinalStage.module.scss';

interface FinalStageProps {
  className?: string;
  isLoaded: boolean;
  isError: boolean;
}

export const FinalStage: React.FC<FinalStageProps> = ({
  className,
  isLoaded,
  isError,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <svg
        className={clsx(styles.square)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <rect
          x="0"
          y="0"
          width="24"
          height="24"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
      {isError && (
        <div className={styles.errorWrap}>
          <p className={clsx(styles.error)}>
            Something went wrong, try again later!
          </p>
          <a className={styles.tryAgain} href="/">
            Try Again
          </a>
        </div>
      )}
      {!isLoaded && !isError && (
        <p className={clsx(styles.loading)}>
          Please hang tight! We&apos;re preparing your game.
        </p>
      )}
      {isLoaded && (
        <h2 className={clsx(styles.heading, { [styles.isLoaded]: isLoaded })}>
          Get Ready
        </h2>
      )}
    </div>
  );
};
