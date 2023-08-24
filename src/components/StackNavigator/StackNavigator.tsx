'use client';

import React, { useEffect } from 'react';
import { useStackNavigator } from '@/providers/NavigatorProvider';

interface StackNavigatorProps {
  children: React.ReactNode[];
}

export const StackNavigator: React.FC<StackNavigatorProps> = ({ children }) => {
  const { currentScreen } = useStackNavigator();

  useEffect(() => {
    console.log(`Current screen: ${currentScreen}`);
  }, [currentScreen]);

  return children;
};
