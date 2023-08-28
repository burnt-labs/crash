'use client';

import { GameOverScreen } from '@/screens/GameOverScreen';
import { GameScreen } from '@/screens/GameScreen';
import { InitialScreen } from '@/screens/InitialScreen';
import { GameProvider } from '@/providers/GameProvider';
import { StackNavigator, StackScreen } from '@/providers/NavigatorProvider';

export default function Home() {
  return (
    <GameProvider>
      <StackNavigator initialScreen="InitialScreen">
        <StackScreen name="InitialScreen" component={InitialScreen} />
        <StackScreen name="GameScreen" component={GameScreen} />
        <StackScreen name="GameOverScreen" component={GameOverScreen} />
      </StackNavigator>
    </GameProvider>
  );
}
