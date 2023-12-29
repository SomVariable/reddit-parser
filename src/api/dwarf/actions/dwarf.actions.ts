
export const waitForTimeout = async (milliseconds?: number) => {
  const entropyTime = milliseconds
    ? milliseconds
    : Math.floor(Math.random() * 5000 + 1000);
  await new Promise((resolve) =>
    setTimeout(() => {
      console.log('RESOLVED');
      return resolve(true);
    }, entropyTime),
  );
};