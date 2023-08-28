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
        fill="none"
      >
        <line x1="1" y1="0" x2="1" y2="100%" stroke="black" />
      </svg>

      <SetupStage title={'WALLET IS CREATED'} />
      <SetupStage title={'FUNDS ACQUIRED'} />
      <SetupStage title={'Transactions spam began'} />
    </section>
  );
};
