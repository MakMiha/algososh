import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import styles from './stack.module.css';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay, } from '../../utils/utils';
import { Stack } from '../../utils/classes/stack';
import { TArrayStack } from '../../types/types';
import { ElementStates } from '../../types/element-states';

const stack = new Stack();

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [array, setArray] = React.useState<TArrayStack[]>([]);
  const [isLoaderPush, setIsLoaderPush] = React.useState(false);
  const [isLoaderPop, setIsLoaderPop] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const push = async () => {
    setInputValue('');
    setIsLoaderPush(true);
    const arrayTemp = [...array];
    stack.push(inputValue);
    arrayTemp.forEach((item) => {
      item.head = '';
    });
    arrayTemp.push({
      value: stack.peak(),
      state: ElementStates.Default,
      head: ''
    });
    arrayTemp[arrayTemp.length-1].head = 'top';
    arrayTemp[arrayTemp.length-1].state = ElementStates.Changing;
    setArray([...arrayTemp]);
    await delay(SHORT_DELAY_IN_MS);
    arrayTemp[arrayTemp.length - 1].state = ElementStates.Default;
    setIsLoaderPush(false);
  };

  const pop = async () => {
    setIsLoaderPop(true);
    const arrayTemp = [...array];
    if (stack.getSize() > 1) {
      stack.pop();
      arrayTemp[arrayTemp.length - 1].state = ElementStates.Changing;
      await delay(SHORT_DELAY_IN_MS);
      arrayTemp.pop();
      arrayTemp[arrayTemp.length - 1].head = 'top';
      setArray([...arrayTemp]);
    } else {
      arrayTemp[arrayTemp.length - 1].state = ElementStates.Changing;
      await delay(SHORT_DELAY_IN_MS);
      clear();
    }
    arrayTemp[arrayTemp.length - 1].state = ElementStates.Default;
    setIsLoaderPop(false);
  };

  const clear = async () => {
    stack.clear();
    setInputValue('');
    setArray([]);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.container}>
        <Input
          value={inputValue || ''}
          onChange={onChange}
          isLimitText={true}
          maxLength={4}
        />
        <Button
          text='Добавить'
          type='button'
          disabled={inputValue === ''}
          isLoader={isLoaderPush}
          onClick={() => push()}
        />
        <Button
          text='Удалить'
          type='button'
          disabled={ !array.length || isLoaderPop || isLoaderPush}
          isLoader={isLoaderPop}
          onClick={() => pop()}
        />
        <Button
          text='Очистить'
          type='button'
          disabled={!array.length || isLoaderPop || isLoaderPush }
          onClick={() => clear()}
          extraClass={styles.button}
        />
      </div>
      <ul className={styles.list}>
        {array.map((item, index) => {
          return (
            <Circle
              letter={`${item.value}`}
              state={item.state}
              head={item.head}
              index={index}
              key={index}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
