import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import styles from './queue.module.css';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay, } from '../../utils/utils';
import { Queue } from '../../utils/classes/queue';
import { TArrayQueue } from '../../types/types';
import { ElementStates } from '../../types/element-states';

const queue = new Queue(7);

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const emptyArray: TArrayQueue[] = Array.from(Array(7), () => ({
      value: '',
      state: ElementStates.Default,
      head: '',
      tail: '',
    })
  );
  const [array, setArray] = React.useState<TArrayQueue[]>(emptyArray);
  const [isLoader, setIsLoader] = React.useState(false);
  const [isLoaderEnqueue, setIsLoaderEnqueue] = React.useState(false);
  const [isLoaderDequeue, setIsLoaderDequeue] = React.useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const enqueue = async () => {
    setIsLoader(true);
    setIsLoaderEnqueue(true);
    const arrayTemp = [...array];
    queue.enqueue(inputValue);
    setInputValue('');
    arrayTemp[queue.getHead()].head = 'head';
    if (queue.getTail() > 0) {
      arrayTemp[queue.getTail() - 1].tail = '';
    }
    arrayTemp[queue.getTail()].value = inputValue;
    arrayTemp[queue.getTail()].tail = 'tail';
    arrayTemp[queue.getTail()].state = ElementStates.Changing;
    setArray([...arrayTemp]);
    await delay(SHORT_DELAY_IN_MS);
    arrayTemp[queue.getTail()].state = ElementStates.Default;
    setIsLoader(false);
    setIsLoaderEnqueue(false);
  };

  const dequeue = async () => {
    setIsLoader(true);
    setIsLoaderDequeue(true);
    const arrayTemp = [...array];
    if (queue.getTail() === queue.getHead()) {
      clearAll();
    } else {
      queue.dequeue();
      if (queue.getHead() > 0) {
        arrayTemp[queue.getHead() - 1].head = '';
        arrayTemp[queue.getHead() - 1].value = '';
      }
      arrayTemp[queue.getHead() - 1].value = inputValue;
      arrayTemp[queue.getHead() - 1].state = ElementStates.Changing;
      setArray([...arrayTemp]);
      await delay(SHORT_DELAY_IN_MS);
      arrayTemp[queue.getHead()].head = 'head';
      arrayTemp[queue.getHead() - 1].state = ElementStates.Default;
    }
    setIsLoader(false);
    setIsLoaderDequeue(false);
  };

  const clearAll = () => {
    queue.clear()
    setInputValue('')
    setArray([...emptyArray]);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <Input
          value={inputValue}
          onChange={onChange}
          isLimitText={true}
          maxLength={4}
        />
        <Button
          text='Добавить'
          type='button'
          disabled={inputValue === ''}
          isLoader={isLoaderEnqueue}
          onClick={() => enqueue()}
        />
        <Button
          text='Удалить'
          type='button'
          disabled={isLoader || queue.isEmpty()}
          isLoader={isLoaderDequeue}
          onClick={() => dequeue()}
        />
        <Button
          text='Очистить'
          type='button'
          disabled={isLoader || queue.isEmpty()}
          onClick={() => clearAll()}
          extraClass={styles.button}
        />
      </div>
      <ul className={styles.list}>
        {array.map((item, index) => {
          return (
            <Circle
              letter={item.value}
              state={item.state}
              head={item.head}
              tail={item.tail}
              index={index}
              key={index}
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
