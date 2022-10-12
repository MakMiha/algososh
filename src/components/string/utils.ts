import { delay } from '../../utils/utils';
import { DELAY_IN_MS } from '../../constants/delays';
import {TArraySymbols } from '../../types/types';
import {ElementStates} from '../../types/element-states';

export const reverseWord = async (string: string, setArray: (arr: TArraySymbols[])  => void ) => {
    const arraySymbols: TArraySymbols[] = [];
    string.split('').forEach((symbol) => {
      arraySymbols.push({ value: symbol, state: ElementStates.Default });
    });
    setArray([...arraySymbols]);

    let step = 0;
    let sumSteps = arraySymbols.length - 1;
    while (step <= sumSteps) {
      arraySymbols[step].state = ElementStates.Changing;
      arraySymbols[sumSteps].state = ElementStates.Changing;
      setArray([...arraySymbols]);
      await delay(DELAY_IN_MS);
      let curr = arraySymbols[step].value;
      arraySymbols[step] = {
        value: arraySymbols[sumSteps].value,
        state: ElementStates.Modified,
      };
      arraySymbols[sumSteps] = {
        value: curr,
        state: ElementStates.Modified,
      }
      setArray([...arraySymbols]);
      await delay(DELAY_IN_MS);
      step++;
      sumSteps--;
    }

  return arraySymbols;
}