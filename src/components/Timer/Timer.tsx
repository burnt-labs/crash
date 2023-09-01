import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import styles from './Timer.module.scss';

interface TimerProps {
  className?: string;
  duration: number;
  endTime: number;
}

export const Timer: React.FC<TimerProps> = ({
  className,
  duration,
  endTime,
}) => {
  const timerRef = useRef<number | null>(null);
  const [count, setCount] = useState(() => Math.ceil(duration / 1000));

  useEffect(() => {
    function loop() {
      setCount((prevCount) => {
        if (prevCount <= 0) {
          return prevCount;
        }

        const now = Date.now();
        const diff = endTime - now;
        const newCount = Math.ceil(diff / 1000);

        return newCount;
      });
      timerRef.current = requestAnimationFrame(loop);
    }
    timerRef.current = requestAnimationFrame(loop);

    return () => {
      timerRef.current && cancelAnimationFrame(timerRef.current);
    };
  }, [count, endTime]);

  useEffect(() => {
    if (count <= 0 && timerRef.current) {
      cancelAnimationFrame(timerRef.current);
    }
  }, [count]);

  return (
    <div className={clsx(styles.timer, className)}>
      <span className={styles.count}>{count} s</span>
    </div>
  );
};
