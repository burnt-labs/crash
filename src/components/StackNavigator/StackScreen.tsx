import { StackNavigatorState } from '@/providers/NavigatorProvider';
import React from 'react';

interface StackScreenProps {
  name: StackNavigatorState;
  component: React.FC;
}

export const StackScreen: React.FC<StackScreenProps> = ({
  component: Component,
}) => {
  return <Component />;
};
