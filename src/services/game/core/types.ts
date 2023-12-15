import { XionSigner } from '@/services/xion';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

export type GameState = {
  duration: number;
  interval?: number;
  wallets: DirectSecp256k1HdWallet[];
  signers: XionSigner[];
  isRunning: boolean;
  isFinished: boolean;
  txCount: number;
  endTime: number;
  walletClient?: SigningCosmWasmClient | undefined;
};

export type GameEvents = {
  tx: (hash: string, index: number, state: GameState) => void;
  started: (state: GameState) => void;
  finished: (state: GameState) => void;
  error: (error: ErrorEvent) => void;
};
