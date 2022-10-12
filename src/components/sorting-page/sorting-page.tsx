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
import { bubbleSorting, selectionSorting, } from './utils';

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
    bubbleSorting(type, arraySort, setArraySort);
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

    selectionSorting(type, arraySort, setArraySort);

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
