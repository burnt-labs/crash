import { XionService, XionSigner } from '@/services/xion';
import { TypedEventEmitter } from '@/services/common';
import { mapFrom } from '@/utils';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { IGame, GameEvents, GameState } from './core';
import { TRANSFER_AMOUNT } from '@/constants';
import { appConfig } from '@/config';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';

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
  private signerIndex = 0;
  walletClient: SigningCosmWasmClient | undefined;
  accountAddress: string | undefined;

  constructor(
    duration: number,
    mnemonics: string[] = [],
    walletClient: SigningCosmWasmClient | undefined,
    accountAddress: string | undefined,
  ) {
    super();
    this.duration = duration;
    this.mnemonics = mnemonics;
    this.walletClient = walletClient;
    this.accountAddress = accountAddress;
  }

  getState(): GameState {
    return {
      duration: this.duration,
      wallets: this.wallets,
      signers: this.signers,
      isRunning: this.isRunning,
      isFinished: this.isFinished,
      txCount: this.txCount,
      endTime: this.endTime,
      walletClient: this.walletClient,
      accountAddress: this.accountAddress,
    };
  }

  async init() {
    console.log('Initializing game...');

    try {
      console.log('Creating wallets...');
      this.wallets = await Promise.all(
        mapFrom(this.numberOfSigners, async (index) =>
          XionService.createWallet(this.mnemonics[index]),
        ),
      );

      console.log('Requesting funds...');
      await Promise.all(
        this.wallets.map(async (wallet) => {
          console.log(wallet);

          if (this.accountAddress) {
            return XionService.requestFunds(this.accountAddress);
          }
        }),
      );
      console.log('Creating signers...');
      this.signers = await Promise.all(
        this.wallets.map(async (wallet) =>
          XionService.createXionSigner(
            wallet,
            this.walletClient,
            this.accountAddress,
          ),
        ),
      );

      console.log('Game initialized!');
      this.isInitialized = true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  handleClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if (!this.isRunning) {
      return;
    }

    if (Date.now() > this.endTime) {
      this.terminate();
      await Promise.allSettled(this.promises);
      this.promises = [];
      this.isFinished = true;
      this.emit('finished', this.getState());

      clearTimeout(this.timerId!);

      return;
    }

    const signer = this.signers[this.signerIndex % this.signers.length];

    const promise = signer
      .sendTokens(appConfig.xionFaucetAddress, TRANSFER_AMOUNT)
      .then((hash) => {
        if (hash) {
          this.txCount++;
          this.emit('tx', hash, this.txCount, this.getState());
        }
      });

    this.promises.push(promise);
    this.signerIndex++;
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
