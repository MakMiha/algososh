import { TArrayNumber } from '../types/types';

export const delay = (delay: number ): Promise<null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, delay);
  });
};

export const swap = (array: TArrayNumber[], firstIndex: number, secondIndex: number): void => {
  const curr = array[firstIndex].value;
  array[firstIndex].value = array[secondIndex].value;
  array[secondIndex].value = curr;
};
