import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import styles from './string.module.css';
import { TArraySymbols } from '../../types/types';
import { ElementStates } from '../../types/element-states';
import { DELAY_IN_MS } from '../../constants/delays';
import { delay } from '../../utils/utils';

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [array, setArray] = React.useState<TArraySymbols[]>([]);
  const [isLoader, setIsLoader] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const reverseString = async () => {
    setInputValue('');
    setIsLoader(true);

    const arraySymbols: TArraySymbols[] = [];
    inputValue.split('').forEach((symbol) => {
      arraySymbols.push({ value: symbol, state: ElementStates.Default });
    });
    setArray([...arraySymbols]);

    let step = 0;
    let sumSteps = arraySymbols.length - 1;
    while (step !== sumSteps) {
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
    setIsLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <Input
          value={inputValue}
          onChange={onChange}
          isLimitText={true}
          maxLength={11}
        />
        <Button
          text='Развернуть'
          type='submit'
          disabled={!inputValue}
          isLoader={isLoader}
          onClick={() => reverseString()}
        />
      </div>
      <ul className={styles.list}>
        {array.map((symbol, index) => {
          return (
            <li key={index} className={styles.circle}>
              <Circle
                state={symbol.state}
                letter={symbol.value}
              />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
