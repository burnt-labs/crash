'use client';

import {
  StackNavigatorState,
  useStackNavigator,
} from '@/providers/NavigatorProvider';
import React from 'react';

interface StackScreenProps {
  name: StackNavigatorState;
  component: React.FC;
}

export const StackScreen: React.FC<StackScreenProps> = ({
  name,
  component: Component,
}) => {
  const { currentScreen } = useStackNavigator();

  if (currentScreen !== name) {
    return null;
  }

  return <Component />;
};
