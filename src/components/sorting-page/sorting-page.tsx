import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from '../ui/radio-input/radio-input';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import styles from './sorting.module.css';
import { DELAY_IN_MS } from '../../constants/delays';
import { delay, swap } from '../../utils/utils';
import { TArrayNumber } from '../../types/types';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';

export const SortingPage: React.FC = () => {
  const [arraySort, setArraySort] = React.useState<TArrayNumber[]>([]);
  const [sort, setSort] = React.useState<string>('select');
  const [isLoader, setIsLoader] = React.useState(false);
  const [ascending, setAscending] = React.useState(false);
  const [descending, setDescending] = React.useState(false);

  React.useEffect(() => {
    createRandomArray();
  }, []);

  const createRandomArray = () => {
    const size = Math.random() * (17 - 3) + 3;
    const array: TArrayNumber[] = [];
    for (let i = 0; i < size; i++) {
      array.push({
        value: Math.floor(Math.random() * 100) + 1,
        state: ElementStates.Default,
      });
    }
    setArraySort([...array]);
  };

  const bubbleSort = async (type: string) => {
    setIsLoader(true);
    type === 'ascending'
      ? setAscending(true)
      : setDescending(true);
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
    setIsLoader(false);
    type === 'ascending'
      ? setAscending(false)
      : setDescending(false);
  };

  const selectionSort = async (type: string) => {
    setIsLoader(true);
    type === 'ascending'
      ? setAscending(true)
      : setDescending(true);
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

    setIsLoader(false);
    type === 'ascending'
      ? setAscending(false)
      : setDescending(false);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <RadioInput
          label='Выбор'
          disabled={isLoader}
          checked={sort === 'select'}
          onChange={() => setSort('select')}
        />
        <RadioInput
          label='Пузырёк'
          disabled={isLoader}
          checked={sort === 'bubble'}
          onChange={() => setSort('bubble')}
          extraClass={styles.radio_input}
        />
        <Button
          text='По возрастанию'
          type='submit'
          sorting={Direction.Ascending}
          disabled={isLoader}
          isLoader={ascending}
          onClick={() => sort === 'select' ? selectionSort('ascending') : bubbleSort('ascending') }
        />
        <Button
          text='По убыванию'
          type='submit'
          sorting={Direction.Descending}
          disabled={isLoader}
          isLoader={descending}
          onClick={() => sort === 'select' ? selectionSort('descending') : bubbleSort('descending') }
        />
        <Button
          text='Новый массив'
          type='submit'
          disabled={isLoader}
          isLoader={false}
          onClick={() => createRandomArray()}
          extraClass={styles.button}
        />
      </div>
      <ul className={styles.list}>
        {arraySort.map((item, index) => {
            return <Column index={item.value} state={item.state} key={index} />;
        })}
      </ul>
    </SolutionLayout>
  );
};
