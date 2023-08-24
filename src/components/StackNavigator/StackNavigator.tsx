'use client';

import React, { useEffect } from 'react';
import { useStackNavigator } from '@/providers/NavigatorProvider';
import { scrollTo, easeOutQuad, toggleScroll } from '@/utils';

interface StackNavigatorProps {
  children: React.ReactNode[];
}

export const StackNavigator: React.FC<StackNavigatorProps> = ({ children }) => {
  const { currentScreen, navigateTo } = useStackNavigator();

  useEffect(() => {
    if (currentScreen === 'InitialScreen') {
      toggleScroll(false);
    }

    if (currentScreen === 'SetupScreen') {
      toggleScroll(true);
      scrollTo(window.innerHeight * 4, 10000, easeOutQuad).then(() => {
        navigateTo('GameScreen');
      });
    }

    if (currentScreen === 'GameScreen') {
      toggleScroll(false);
    }

    console.log(`Current screen: ${currentScreen}`);
  }, [currentScreen, navigateTo]);

  return children;
};
