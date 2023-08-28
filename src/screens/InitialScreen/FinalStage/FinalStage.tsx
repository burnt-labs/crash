import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import styles from './FinalStage.module.scss';

interface FinalStageProps {
  className?: string;
  thresholds: [number, number];
}

export const FinalStage: React.FC<FinalStageProps> = ({
  className,
  thresholds,
}) => {
  const [isShowSquare, setIsShowSquare] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight * thresholds[0]) {
        setIsShowSquare(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={clsx(styles.root, className)}>
      <svg
        className={clsx(styles.square, { [styles.show]: isShowSquare })}
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
      <h2 className={clsx(styles.heading, { [styles.show]: isShowSquare })}>
        Begin
      </h2>
    </section>
  );
};
