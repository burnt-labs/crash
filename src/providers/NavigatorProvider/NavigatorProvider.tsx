'use client';

import React, { createContext, useMemo, useState } from 'react';

interface StackNavigatorProviderProps {
  children: React.ReactNode;
}

interface StackNavigatorProviderContextState {
  currentScreen: string;
  navigateTo: (screenName: string) => void;
}

const initialState: StackNavigatorProviderContextState = {
  currentScreen: '',
  navigateTo: () => {
    throw new Error('StackNavigatorProvider not initialized');
  },
};

export const StackNavigatorProviderContext =
  createContext<StackNavigatorProviderContextState>(initialState);

export const StackNavigatorProvider: React.FC<StackNavigatorProviderProps> = ({
  children,
}) => {
  const [currentScreen, setCurrentScreen] = useState<string>('');

  const navigateTo = (screenName: string) => {
    setCurrentScreen(screenName);
  };

  const value = useMemo(
    () => ({
      currentScreen,
      navigateTo,
    }),
    [currentScreen],
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
