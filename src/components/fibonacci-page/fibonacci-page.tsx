import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import styles from './fibonacci.module.css';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<number>(1);
  const [array, setArray] = React.useState<number[]>([]);
  const [isLoader, setIsLoader] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: number = + e.target.value;
    setInputValue(target);
  };

  const renderFibonacci = async () => {
    setIsLoader(true);
    setInputValue(0);
    const arrayFib: number[] = [0, 1];
    for (let i = 2; i < inputValue + 1; i++) {
      arrayFib.push(arrayFib[i - 2] + arrayFib[i - 1]);
    }
    const arrayTemp: number[] = [];
    for (let num of arrayFib) {
      arrayTemp.push(num);
      setArray([...arrayTemp]);
      await delay(SHORT_DELAY_IN_MS);
    }
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.container}>
        <Input
          min={1}
          max={19}
          type='number'
          value={inputValue}
          onChange={onChange}
        />
        <Button
          text='Рассчитать'
          type='submit'
          disabled={inputValue === 0}
          isLoader={isLoader}
          onClick={() => renderFibonacci()}
        />
      </div>
      <ul className={styles.list}>
        {array.map((num, index) => {
          return (
            <li key={index} className={styles.circle}>
              <Circle letter={`${num}`} index={index} />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
