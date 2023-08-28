'use client';

import React, { useState } from 'react';

import { ArrowButton } from '@/components/ArrowButton';
// import { useStackNavigator } from '@/providers/NavigatorProvider';
import { AnimationBg } from '../AnimationBg';

import styles from './InitialScreen.module.scss';
// import { SimpleTimeline } from '@/components/Timeline/core/TimeLine';
import { LoadingStage } from '@/screens/InitialScreen/LoadingStage';

export const InitialScreen: React.FC = () => {
  // const { navigateTo } = useStackNavigator();
  // const refTimeline = useRef<SimpleTimeline | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // useEffect(() => {
  //   // Example usage:
  //   const timeline = new SimpleTimeline();

  //   timeline.add(document.getElementById('title')!, { opacity: 0 }, 1000);
  //   timeline.add(
  //     [document.getElementById('subtitle')!, document.getElementById('title')!],
  //     { transform: 'scale(2)', opacity: 1 },
  //     500,
  //     200,
  //   );

  //   refTimeline.current = timeline;
  // }, []);

  const handleButtonClick = () => {
    // Play the animation
    // refTimeline.current?.play();
    // navigateTo('SetupScreen');
    setIsButtonClicked(true);
  };

  return (
    <section
      className={`${styles.root} ${isButtonClicked ? styles.animate : ''}`}
    >
      <svg
        className={styles.line}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <line x1="0" y1="0" x2="1" y2="100%" stroke="black" />
      </svg>
      <div className={styles.hero}>
        <AnimationBg />
        <div className={styles.container}>
          <h1 className={styles.title}>BURN IT DOWN</h1>
          <p className={styles.subtitle}>
            The first L1 blockchain purpose built for consumer adoption.
          </p>
          <p className={styles.caption}>
            To see just how fast it is, you<span>&#39;</span>re invited to come
            and burn it down. During the next twenty seconds, you will see how
            fast and productive our blockchain.
          </p>
          <ArrowButton
            className={`${isButtonClicked ? styles.active : ''}`}
            onClick={handleButtonClick}
          />
        </div>
      </div>

      <LoadingStage
        titleClassName={styles.lodingStageTitle1}
        title={'WALLET IS CREATED'}
      />
      <LoadingStage
        titleClassName={styles.lodingStageTitle2}
        title={'FUNDS ACQUIRED'}
      />
      <LoadingStage
        titleClassName={styles.lodingStageTitle3}
        title={'Transactions spam began'}
      />
      <section className={styles.finalstage}>
        <svg
          className={styles.square}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <rect
            x="0"
            y="0"
            width="24"
            height="24"
            stroke="black"
            stroke-width="2"
          />
        </svg>
        <h2 className={styles.heading}>
          The challenge unfolded, revealing its rapid pace,
        </h2>
      </section>
    </section>
  );
};
