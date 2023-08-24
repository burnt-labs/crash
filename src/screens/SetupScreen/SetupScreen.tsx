import React from 'react';
import { SetupStage } from './SetupStage';

interface SetupScreenProps {
  className?: string;
}

export const SetupScreen: React.FC<SetupScreenProps> = () => {
  return (
    <section>
      <SetupStage />
      <SetupStage />
      <SetupStage />
    </section>
  );
};
