import { GameProvider } from '@/providers/GameProvider';

import { HeroSection } from '@/components/HeroSection';

import { WalletCreated } from '@/components/WalletCreated';

export default function Home() {
  return (
    <GameProvider>
      <HeroSection />
    </GameProvider>
  );
}
