import { XionService, XionSigner } from '@/services/xion';
import { TypedEventEmitter } from '@/services/common';
import { mapFrom } from '@/utils';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { IGame, GameEvents, GameState } from './core';
import { TRANSFER_AMOUNT } from '@/constants';
import { appConfig } from '@/config';

export class Game extends TypedEventEmitter<GameEvents> implements IGame {
  private wallets!: DirectSecp256k1HdWallet[];
  private signers!: XionSigner[];
  private readonly duration: number;

  private readonly numberOfSigners: number = 1;
  private readonly mnemonics: string[];

  private timerId: NodeJS.Timeout | null = null;
  private promises: Promise<void>[] = [];

  private isInitialized = false;
  private isRunning = false;
  private isFinished = false;
  private txCount = 0;
  private endTime = 0;

  constructor(duration: number, mnemonics: string[] = []) {
    super();
    this.duration = duration;
    this.mnemonics = mnemonics;
  }

  getState(): GameState {
    return {
      duration: this.duration,
      wallets: this.wallets,
      signers: this.signers,
      isRunning: this.isRunning,
      isFinished: this.isFinished,
      txCount: this.txCount,
    };
  }

  async init() {
    console.log('Initializing game...');

    console.log('Creating wallets...');
    this.wallets = await Promise.all(
      mapFrom(this.numberOfSigners, async (index) =>
        XionService.createWallet(this.mnemonics[index]),
      ),
    );

    console.log('Requesting funds...');
    await Promise.all(
      this.wallets.map(async (wallet) => {
        console.log('mnemonic', wallet.mnemonic);

        const [firstAccount] = await wallet.getAccounts();

        return XionService.requestFunds(firstAccount.address);
      }),
    );

    console.log('Creating signers...');
    this.signers = await Promise.all(
      this.wallets.map(async (wallet) => XionService.createXionSigner(wallet)),
    );

    console.log('Game initialized!');
    this.isInitialized = true;
  }

  handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const [signer] = this.signers;

    const promise = signer
      .sendTokens(appConfig.xionFaucetAddress, TRANSFER_AMOUNT)
      .then((hash) => {
        this.txCount++;
        this.emit('tx', hash, this.txCount, this.getState());
      });

    this.promises.push(promise);
  };

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
    document.addEventListener('click', this.handleClick);

    this.timerId = setTimeout(async () => {
      this.terminate();
      await Promise.allSettled(this.promises);
      this.promises = [];
      this.emit('finished', this.getState());
    }, this.duration);

    console.log('Game started!');
    this.emit('started', this.getState());
  }

  restart() {
    this.txCount = 0;
    this.isFinished = false;
  }

  terminate() {
    this.isRunning = false;

    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    document.removeEventListener('click', this.handleClick);
  }
}