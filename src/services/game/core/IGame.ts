import { GameState } from './types';

export interface IGame {
  getState(): GameState;
  init(): Promise<void>;
  start(): void;
  restart(): void;
  terminate(): void;
}
