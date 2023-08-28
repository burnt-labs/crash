'use client';

import React from 'react';

interface StackNavigatorProps {
  children: React.ReactNode[];
}

export const StackNavigator: React.FC<StackNavigatorProps> = ({ children }) => {
  return children;
};
