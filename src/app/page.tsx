import { StackNavigator } from '@/components/StackNavigator';

import { StackScreen } from '@/components/StackNavigator/StackScreen';
import { GameOverScreen } from '@/screens/GameOverScreen';
import { GameScreen } from '@/screens/GameScreen';
import { InitialScreen } from '@/screens/InitialScreen';
import { GameProvider } from '@/providers/GameProvider';

export default function Home() {
  return (
    <GameProvider>
      <StackNavigator>
        <StackScreen name="InitialScreen" component={InitialScreen} />
        <StackScreen name="GameScreen" component={GameScreen} />
        <StackScreen name="GameOverScreen" component={GameOverScreen} />
      </StackNavigator>
    </GameProvider>
  );
}
