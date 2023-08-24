import React from 'react';
import styles from './GameScreen.module.scss';

interface GameScreenProps {
  className?: string;
}

export const GameScreen: React.FC<GameScreenProps> = () => {
  return <section className={styles.root}>Game Screen</section>;
};
