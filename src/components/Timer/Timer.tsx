import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import styles from './Timer.module.scss';

interface TimerProps {
  className?: string;
  timeout: number;
}

export const Timer: React.FC<TimerProps> = ({ className, timeout }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [count, setCount] = useState(timeout);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);

      console.log('count', count, count <= 0);
    }, 1000);

    timerRef.current = interval;

    return () => clearInterval(interval);
  }, [count]);

  useEffect(() => {
    if (count <= 0 && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [count]);

  return <div className={clsx(styles.timer, className)}>{count} s</div>;
};
