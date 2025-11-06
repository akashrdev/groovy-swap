export const sleep = async ({
  time,
  callBack
}: {
  time: number;
  callBack: () => void;
}): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      callBack();
      resolve();
    }, time);
  });
};
