import React from 'react';
import { SetupStage } from './SetupStage';

interface SetupScreenProps {
  className?: string;
}

export const SetupScreen: React.FC<SetupScreenProps> = () => {
  return (
    <section>
      <SetupStage title={'WALLET IS CREATED'} />
      <SetupStage title={'FUNDS ACQUIRED'} />
      <SetupStage title={'Transactions spam began'} />
    </section>
  );
};
