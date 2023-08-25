import React from 'react';
import { SetupStage } from './SetupStage';

import styles from './SetupScreen.module.scss';

interface SetupScreenProps {
  className?: string;
}

export const SetupScreen: React.FC<SetupScreenProps> = () => {
  return (
    <section className={styles.root}>
      <svg
        className={styles.line}
        xmlns="http://www.w3.org/2000/svg"
        width="2"
        height="456"
        viewBox="0 0 2 456"
        fill="none"
      >
        <path d="M1 0V456" stroke="black" />
      </svg>

      <SetupStage title={'WALLET IS CREATED'} />
      <SetupStage title={'FUNDS ACQUIRED'} />
      <SetupStage title={'Transactions spam began'} />
    </section>
  );
};
