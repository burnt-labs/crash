import React from 'react';

interface StackScreenProps {
  name: string;
  component: React.FC;
}

export const StackScreen: React.FC<StackScreenProps> = ({
  component: Component,
}) => {
  return <Component />;
};
