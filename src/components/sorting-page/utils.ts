import { delay, swap } from '../../utils/utils';
import { DELAY_IN_MS } from '../../constants/delays';
import {TArrayNumber } from '../../types/types';
import {ElementStates} from '../../types/element-states';

export  const bubbleSorting = async (type: string, arraySort: TArrayNumber[], setArraySort: (arr: TArrayNumber[])  => void ) => {
  if(arraySort.length < 1) {
    return []
  }
  const array = [...arraySort];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        setArraySort([...array]);
        await delay(DELAY_IN_MS);
        if (
          (type === 'descending' && array[j].value < array[j + 1].value) || 
          (type === 'ascending' && array[j].value > array[j + 1].value)
        ) {
          swap(array, j, j + 1);
        }
        array[j].state = ElementStates.Default;
      }
      array[array.length - i - 1].state = ElementStates.Modified;
    }
  return array;
};

export  const selectionSorting = async (type: string, arraySort: TArrayNumber[], setArraySort: (arr: TArrayNumber[])  => void ) => {
  if(arraySort.length < 1) {
    return []
  }  
  const array = [...arraySort];
    for (let i = 0; i < array.length - 1; i++) {
      let index = i;
      for (let j = i + 1; j < array.length ; j++) {
        array[i].state = ElementStates.Changing;
        array[j].state = ElementStates.Changing;
        setArraySort([...array]);
        await delay(DELAY_IN_MS);
        if ( (type === 'descending' && array[index].value < array[j].value) || 
        (type === 'ascending' && array[index].value > array[j].value) ) {
          index = j;
        }
        array[j].state = ElementStates.Default;
        setArraySort([...array]);
      }
      swap(array, i, index);
      array[i].state = ElementStates.Modified;
    }
    array[array.length - 1].state = ElementStates.Modified;
  return array;
};