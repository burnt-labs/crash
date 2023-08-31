import React from 'react';
import clsx from 'clsx';

import styles from './FinalStage.module.scss';

interface FinalStageProps {
  className?: string;
}

export const FinalStage: React.FC<FinalStageProps> = ({ className }) => {
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
      <h2 className={clsx(styles.heading)}>Get Ready</h2>
    </div>
  );
};
