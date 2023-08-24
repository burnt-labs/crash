'use client';

import React, { createContext } from 'react';

interface StackNavigatorProps {
  children: React.ReactNode[];
}

interface StackNavigatorState {
  currentScreen: string | null;
}

const initialStackNavigatorState: StackNavigatorState = {
  currentScreen: null,
};

export const StackNavigatorContext = createContext<StackNavigatorState>(
  initialStackNavigatorState,
);

export const StackNavigator: React.FC<StackNavigatorProps> = ({ children }) => {
  return children;
};

export const useStackNavigator = () => {
  const { currentScreen } = React.useContext(StackNavigatorContext);

  const navigateTo = (screenName: string) => {
    console.log(`Navigating to ${screenName}`);
  };

  return {
    currentScreen,
    navigateTo,
  };
};
