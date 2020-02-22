import throttle from 'lodash/throttle';

export function lastFunctionThrottle<T>(
  callback: (data: T) => void,
  delay: number
): (item: T) => void {
  let data: T;

  const func = throttle(() => {
    callback(data);
  }, delay);

  return (item: T): void => {
    data = item;
    func();
  };
}

export function chunkThrottle<T>(
  callback: (chunk: T[]) => void,
  delay: number
): (item: T) => void {
  let chunk: T[] = [];

  const func = throttle(() => {
    callback(chunk);
    chunk = [];
  }, delay);

  return (item: T): void => {
    chunk.push(item);
    func();
  };
}

export function lastItemThrottle<T>(
  callback: (chunk: T[]) => void,
  delay: number
): (key: string, item: T) => void {
  const chunk: Map<string, T> = new Map();

  const func = throttle(() => {
    callback(Array.from(chunk.values()));
    chunk.clear();
  }, delay);

  return (key: string, item: T): void => {
    chunk.set(key, item);
    func();
  };
}

export const closureThrottle = (delay: number) => {
  let called = false;

  return (cb: any) => {
    if (called) {
      return null;
    }

    called = true;

    cb();

    setTimeout(() => {
      called = false;
    }, delay);
  };
};
