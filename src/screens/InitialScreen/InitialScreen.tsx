'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Abstraxion, useAbstraxionAccount } from '@burnt-labs/abstraxion';
import { SendAuthorization } from 'cosmjs-types/cosmos/bank/v1beta1/authz';
import { Coin } from 'cosmjs-types/cosmos/base/v1beta1/coin';
import { MsgGrant } from 'cosmjs-types/cosmos/authz/v1beta1/tx';

import { ArrowButton } from '@/components/ArrowButton';
import { AnimationBg } from '@/components/AnimationBg';
import { LoadingStage } from './LoadingStage';
import { useGame } from '@/providers/GameProvider';
import { FinalStage } from './FinalStage';
import { scrollTo } from '@/utils';

import { useStackNavigator } from '@/providers/NavigatorProvider';

import styles from './InitialScreen.module.scss';

export const InitialScreen: React.FC = () => {
  const { initGame } = useGame();
  const [isAnimating, setisAnimating] = useState(false);
  const [isGameInited, setIsGameInited] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const { navigateTo } = useStackNavigator();
  const { data: account } = useAbstraxionAccount();

  console.log(account);

  const sendAuthValue = SendAuthorization.encode(
    SendAuthorization.fromPartial({
      spendLimit: [
        Coin.fromPartial({
          amount: '2000',
          denom: 'uxion',
        }),
      ],
    }),
  ).finish();
  const grantValue = MsgGrant.fromPartial({
    grant: {
      authorization: {
        typeUrl: '/cosmos.bank.v1beta1.SendAuthorization',
        value: sendAuthValue,
      },
      expiration: {
        seconds: 2000,
      },
    },
    grantee: 'xion1x7hcz7r6rs0ylzur30rytded273efakhha6qxz',
    granter: 'xion1sv4knujc7teaeawf0tdurxewcmlgljqw053vay',
  });

  console.log(grantValue);

  const handleStart = async () => {
    try {
      if (!account?.bech32Address) {
        setIsOpen(true);
      } else {
        setisAnimating(true);
        scrollTo(window.innerHeight * 3, 8000).then(() => {
          setisAnimating(false);
        });
        await initGame();
        setIsGameInited(true);
      }
    } catch (e) {
      setIsError(true);
      console.log(e);
    }
  };

  const isFinished = isGameInited && !isError;

  useEffect(() => {
    if (isFinished) {
      if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
      }

      setTimeout(() => {
        navigateTo('GameScreen');
      }, 2700);
    }
  }, [isFinished, navigateTo]);

  return (
    <section
      className={clsx(styles.root, {
        [styles.finished]: isFinished,
      })}
    >
      <Abstraxion onClose={() => setIsOpen(false)} isOpen={isOpen} />
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
            Try to crash XION, the blockchain purpose built for consumer
            adoption.
          </p>
          <p className={styles.caption}>
            Your goal is to try to crash XION. During the next 20 seconds, send
            as many transactions as you can by clicking quickly.
          </p>
          <ArrowButton
            isAnimated
            isActive={isAnimating}
            onClick={handleStart}
          />
        </div>
      </div>

      <LoadingStage title="Get ready to start clicking" />
      <LoadingStage title="Good luck trying to crash XION" />
      <FinalStage
        className={styles.finalStage}
        isLoaded={isGameInited}
        isError={isError}
      />
    </section>
  );
};
