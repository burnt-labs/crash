import { StackNavigator } from '@/components/StackNavigator';

import { StackScreen } from '@/components/StackNavigator/StackScreen';
import { GameOverScreen } from '@/screens/GameOverScreen';
import { GameScreen } from '@/screens/GameScreen';
import { InitialScreen } from '@/screens/InitialScreen';

export default function Home() {
  return (
    <StackNavigator>
      <StackScreen name="InitialScreen" component={InitialScreen} />
      <StackScreen name="GameScreen" component={GameScreen} />
      <StackScreen name="GameOverScreen" component={GameOverScreen} />
    </StackNavigator>
  );
}
