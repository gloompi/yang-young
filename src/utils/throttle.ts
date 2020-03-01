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
