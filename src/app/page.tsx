import { StackNavigator } from '@/providers/StackNavigator';
import { GameOverScreen } from '@/screens/GameOverScreen';
import { GameScreen } from '@/screens/GameScreen';
import { InitialScreen } from '@/screens/InitialScreen';
import { SetupScreen } from '@/screens/SetupScreen';

export default function Home() {
  return (
    <StackNavigator>
      <InitialScreen />
      <SetupScreen />
      <GameScreen />
      <GameOverScreen />
    </StackNavigator>
  );
}
