export type EventMap = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: (...args: any[]) => void;
};

export class TypedEventEmitter<Events extends EventMap> {
  listeners: Partial<Record<keyof Events, Events[keyof Events][]>> = {};

  on<E extends keyof Events>(event: E, listener: Events[E]): this {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event]?.push(listener);

    return this;
  }

  off<E extends keyof Events>(event: E, listener: Events[E]): this {
    if (!this.listeners[event]) {
      throw new Error(`No listeners for event: ${event.toString()}`);
    }

    this.listeners[event] = this.listeners[event]?.filter(
      (l) => l !== listener,
    );

    return this;
  }

  emit<E extends keyof Events>(event: E, ...args: Parameters<Events[E]>): void {
    this.listeners[event]?.forEach((l) => l(...args));
  }
}
