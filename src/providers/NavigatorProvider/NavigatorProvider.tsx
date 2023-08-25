'use client';

import React, { createContext, useCallback, useMemo, useState } from 'react';

interface StackNavigatorProviderProps {
  children: React.ReactNode;
}

export type StackNavigatorState =
  | 'InitialScreen'
  | 'SetupScreen'
  | 'GameScreen'
  | 'GameOverScreen';

interface StackNavigatorProviderContextState {
  currentScreen: StackNavigatorState;
  navigateTo: (screenName: StackNavigatorState) => void;
}

const initialState: StackNavigatorProviderContextState = {
  currentScreen: 'InitialScreen',
  navigateTo: () => {
    throw new Error('StackNavigatorProvider not initialized');
  },
};

export const StackNavigatorProviderContext =
  createContext<StackNavigatorProviderContextState>(initialState);

export const StackNavigatorProvider: React.FC<StackNavigatorProviderProps> = ({
  children,
}) => {
  const [currentScreen, setCurrentScreen] =
    useState<StackNavigatorState>('InitialScreen');

  const navigateTo = useCallback((screenName: StackNavigatorState) => {
    setCurrentScreen(screenName);
  }, []);

  const value = useMemo(
    () => ({
      currentScreen,
      navigateTo,
    }),
    [currentScreen, navigateTo],
  );

  return (
    <StackNavigatorProviderContext.Provider value={value}>
      {children}
    </StackNavigatorProviderContext.Provider>
  );
};

export const useStackNavigator = () => {
  return React.useContext(StackNavigatorProviderContext);
};
