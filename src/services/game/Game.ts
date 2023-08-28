import {
  FinishedWorkerEvent,
  StartWorkerEvent,
  TxWorkerEvent,
} from '@/services/game/worker';
import { XionService, XionSigner } from '@/services/xion';
import { TypedEventEmitter } from '@/services/common';
import { mapFrom } from '@/utils';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

type GameState = {
  duration: number;
  interval: number;
  wallets: DirectSecp256k1HdWallet[];
  signers: XionSigner[];
  isRunning: boolean;
  isFinished: boolean;
  txCount: number;
};

type GameEvents = {
  tx: (hash: string, index: number, state: GameState) => void;
  started: (state: GameState) => void;
  finished: (state: GameState) => void;
  error: (error: ErrorEvent) => void;
};

export class Game extends TypedEventEmitter<GameEvents> {
  private wallets!: DirectSecp256k1HdWallet[];
  private signers!: XionSigner[];
  private readonly duration: number;
  private readonly interval: number;

  private workers!: Worker[];
  private readonly numberOfSigners: number;
  private readonly mnemonics: string[];

  private isInitialized = false;
  private isRunning = false;
  private isFinished = false;
  private txCount = 0;
  private endTime = 0;

  constructor(
    numberOfSigners: number,
    duration: number,
    interval: number,
    mnemonics: string[] = [],
  ) {
    super();
    this.numberOfSigners = numberOfSigners;
    this.duration = duration;
    this.interval = interval;
    this.mnemonics = mnemonics;
  }

  getState(): GameState {
    return {
      duration: this.duration,
      interval: this.interval,
      wallets: this.wallets,
      signers: this.signers,
      isRunning: this.isRunning,
      isFinished: this.isFinished,
      txCount: this.txCount,
    };
  }

  async init() {
    console.log('Initializing game...');

    this.workers = mapFrom(this.numberOfSigners, () => {
      return new Worker(new URL('./worker.ts', import.meta.url));
    });

    console.log('Creating wallets...');
    this.wallets = await Promise.all(
      mapFrom(this.numberOfSigners, async (index) =>
        XionService.createWallet(this.mnemonics[index]),
      ),
    );

    // console.log('Requesting funds...');
    // await Promise.all(
    //   this.wallets.map(async (wallet) => {
    //     const [firstAccount] = await wallet.getAccounts();

    //     return XionService.requestFunds(firstAccount.address);
    //   }),
    // );

    console.log('Creating signers...');
    this.signers = await Promise.all(
      this.wallets.map(async (wallet) => XionService.createXionSigner(wallet)),
    );

    console.log('Game initialized!');
    this.isInitialized = true;
  }

  start() {
    if (!this.isInitialized) {
      throw new Error('Game is not initialized!');
    }

    if (this.isRunning) {
      throw new Error('Game is already running!');
    }

    this.isRunning = true;
    this.isFinished = false;
    this.endTime = Date.now() + this.duration;

    console.log('Starting game...');
    this.workers.forEach((worker, index) => {
      const startEvent: StartWorkerEvent = {
        event: 'start',
        mnemonic: this.mnemonics[index],
        endTime: this.endTime,
        interval: this.interval,
      };

      worker.postMessage(startEvent);

      worker.onmessage = (
        event: MessageEvent<TxWorkerEvent | FinishedWorkerEvent>,
      ) => {
        if (event.data.event === 'finished') {
          this.isFinished = true;
          this.terminate();
          this.emit('finished', this.getState());
        }

        if (event.data.event === 'tx') {
          this.txCount++;
          this.emit('tx', event.data.hash, this.txCount, this.getState());
        }
      };

      worker.onerror = (err) => {
        this.emit('error', err);
      };
    });

    this.emit('started', this.getState());
  }

  restart() {
    this.isFinished = false;
    this.workers = mapFrom(this.numberOfSigners, () => {
      return new Worker(new URL('./worker.ts', import.meta.url));
    });
    this.start();
  }

  terminate() {
    this.isRunning = false;
    this.workers.forEach((worker) => {
      worker.terminate();
    });
  }
}
