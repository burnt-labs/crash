import { GameProvider } from '@/providers/GameProvider';

export default function Home() {
  return (
    <GameProvider>
      <h1>Home page</h1>
    </GameProvider>
  );
}
