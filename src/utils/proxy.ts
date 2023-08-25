/* eslint-disable @typescript-eslint/no-explicit-any */

export function proxymise<T = any, R = any>(target: T): R {
  if (typeof target === 'object') {
    const proxy = () => target;

    proxy.proxy = true;

    return new Proxy(proxy, handler);
  }

  return typeof target === 'function' ? new Proxy(target, handler) : target;
}

const handler = {
  get(target: any, property: any, receiver: any): any {
    if (target.proxy) target = target();

    if (
      property !== 'then' &&
      property !== 'catch' &&
      typeof target.then === 'function'
    ) {
      return proxymise(
        target.then((value: any) => get(value, property, receiver)),
      );
    }

    return proxymise(get(target, property, receiver));
  },

  apply(target: any, thisArg: any, argumentsList: any): any {
    if (target.proxy) target = target();

    if (typeof target.then === 'function') {
      return proxymise(
        target.then((value: any) =>
          Reflect.apply(value, thisArg, argumentsList),
        ),
      );
    }

    return proxymise(Reflect.apply(target, thisArg, argumentsList));
  },
};

const get = (target: any, property: any, receiver: any) => {
  const value =
    typeof target === 'object'
      ? Reflect.get(target, property, receiver)
      : target[property];

  if (typeof value === 'function' && typeof value.bind === 'function') {
    return Object.assign(value.bind(target), value);
  }

  return value;
};
