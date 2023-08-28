import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import styles from './Timer.module.scss';

interface TimerProps {
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ className }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (!running) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.cantainer}>
        <span onClick={() => setRunning(true)}>
          {('0' + Math.floor((time / 1000) % 60)).slice(-2)}
          <span>&#32;</span> s
        </span>
      </div>

      {/* <div className="buttons">
        <button onClick={() => setRunning(true)}>Start</button>
        <button onClick={() => setTime(0)}>Reset</button>
      </div> */}
    </div>
  );
};
