'use client';

import { useEffect } from 'react';
import { ResultScreen } from '@/screens/ResultScreen';
import { GameScreen } from '@/screens/GameScreen';
import { InitialScreen } from '@/screens/InitialScreen';
import { GameProvider } from '@/providers/GameProvider';
import { StackNavigator, StackScreen } from '@/providers/NavigatorProvider';
import { AbstraxionProvider } from '@burnt-labs/abstraxion';
import '@burnt-labs/ui/styles.css';
import '@burnt-labs/abstraxion/styles.css';

export default function Home() {
  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <AbstraxionProvider>
      <GameProvider>
        <StackNavigator initialScreen="InitialScreen">
          <StackScreen name="InitialScreen" component={InitialScreen} />
          <StackScreen name="GameScreen" component={GameScreen} />
          <StackScreen name="ResultScreen" component={ResultScreen} />
        </StackNavigator>
      </GameProvider>
    </AbstraxionProvider>
  );
}
