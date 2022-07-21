import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from '../ui/input/input';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import {ArrowIcon} from '../ui/icons/arrow-icon';
import styles from './list.module.css';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { delay, } from '../../utils/utils';
import { LinkedList, ILinkedList } from '../../utils/classes/list';
import { TArrayList } from '../../types/types';
import { ElementStates } from '../../types/element-states';

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState<string>('');
  const [inputIndex, setInputIndex] = React.useState<number>(0);
  const [array, setArray] = React.useState<TArrayList[]>([])
  const [linkedList, setLinkedList] = React.useState<ILinkedList<string>>();
  const [isLoader, setIsLoader] = React.useState(false);
  const [isLoaderAddHead, setIsLoaderAddHead] = React.useState(false);
  const [isLoaderAddTail, setIsLoaderAddTail] = React.useState(false);
  const [isLoaderDeleteHead, setIsLoaderDeleteHead] = React.useState(false);
  const [isLoaderDeleteTail, setIsLoaderDeleteTail] = React.useState(false);
  const [isLoaderAddIndex, setIsLoaderAddIndex] = React.useState(false);
  const [isLoaderDeleteIndex, setIsLoaderDeleteIndex] = React.useState(false);
  React.useEffect(() => {
    const randomArray: TArrayList[] = Array.from(Array(5), () => ({
        value: String(Math.floor(Math.random() * 100) + 1),
        state: ElementStates.Default,
        head: '',
        tail: '',
      })
    );
    randomArray[0].head = 'head'
    randomArray[randomArray.length-1].tail = 'tail'
    setArray([...randomArray])
    const linkedList = new LinkedList<any>(randomArray);
    setLinkedList(linkedList);
  },[])

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onChangeInputIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target: number = + e.target.value;
    setInputIndex(target);
  };

  const addHead = async () => {
    setIsLoader(true);
    setIsLoaderAddHead(true);
    linkedList!.prepend(inputValue);
    array[0] = {
      ...array[0],
      head: 'head',
      add: true,
      circle: {
        value: inputValue,
      },
    };
    setArray([...array])
    await delay(SHORT_DELAY_IN_MS)

    array[0] = {
      ...array[0],
      head: 'head',
      add: false,
      circle: undefined,
    };
    setArray([...array])
    await delay(SHORT_DELAY_IN_MS)
    array.unshift({
      value: inputValue,
      state: ElementStates.Modified,
      head: 'head',
    });
    array[1].head = '';
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS)
    array[0].state = ElementStates.Default;
    setArray([...array]);
    setIsLoader(false);
    setIsLoaderAddHead(false);
    setInputValue('')
  }

  const addTail = async () => {
    setIsLoader(true);
    setIsLoaderAddTail(true);
    linkedList!.append(inputValue);
    array[array.length-1] = {
      ...array[array.length-1],
      add: true,
      circle: {
        value: inputValue,
      },
    };
    setArray([...array])
    await delay(SHORT_DELAY_IN_MS)

    array[array.length-1] = {
      ...array[array.length-1],
      add: false,
      circle: undefined,
    };
    setArray([...array])
    await delay(SHORT_DELAY_IN_MS)

    array.push({
      value: inputValue,
      state: ElementStates.Modified,
    });
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS)

    array[array.length-1] = {
      ...array[array.length-1],
      tail: 'tail',
      state: ElementStates.Default,
    }
    array[array.length-2].tail = '';
    setArray([...array]);

    setIsLoader(false);
    setIsLoaderAddTail(false);
    setInputValue('')
  }

  const deleteHead = async () => {
    setIsLoader(true);
    setIsLoaderDeleteHead(true);
    linkedList!.deleteFrom(0);
    array[0] = {
      ...array[0],
      value: '',
      delete: true,
      circle: {
        value: array[0].value,
      },
    };
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS)

    array.shift();
    array[0].state = ElementStates.Modified;
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS)
    array[0].head = 'head';
    array[0].state = ElementStates.Default;
    setArray([...array]);
    setIsLoader(false);
    setIsLoaderDeleteHead(false);
  }

  const deleteTail = async () => {
    setIsLoader(true);
    setIsLoaderDeleteTail(true);
    linkedList!.deleteFrom(array.length - 1);
    array[array.length - 1] = {
      ...array[array.length - 1],
      value: '',
      tail: '',
      delete: true,
      circle: {
        value: array[array.length - 1].value,
      },
    };
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS)
    array.pop();
    array[array.length - 1].state = ElementStates.Modified;
    array[array.length - 1].tail = 'tail';
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS)
    array[array.length - 1].state = ElementStates.Default;
    setArray([...array]);
    setIsLoader(false);
    setIsLoaderDeleteTail(false);
  };
  
  const addIndex = async (index: number) => {
    const size = linkedList!.getSize();
    if (inputIndex < 0 || inputIndex > size) {
      return;
    }
    setIsLoader(true);
    setIsLoaderAddIndex(true);
    linkedList!.insertAt(inputValue, index);
    for (let i = 0; i <= index; i++) {
      if (i < size) {
        array[i] = {
          ...array[i],
          add: true,
          circle: {
            value: inputValue,
          },
        };
      }
      if (i > 0 && i < size) {
        array[i - 1] = {
          ...array[i - 1],
          state: ElementStates.Changing,
          add: false,
          circle: undefined,
        };
      }
      if (i === index && index === 0) {
        array[0].head = '';
      }
      if (i === size - 1 && index === size) {
        array[size-1].tail = '';
      }
      setArray([...array]);
      await delay(SHORT_DELAY_IN_MS)
    }

    if (index === size){
      console.log(size)
      array[index! - 1] = {
        ...array[index! - 1],
        add: false,
        circle: undefined,
      };
      array.push({
        value: linkedList!.getNodeByIndex(index!) as string,
        state: ElementStates.Modified,
      });
    } else {
      array[index!] = {
        ...array[index!],
        add: false,
        circle: undefined,
      };
      array.splice(index!, 0, {
        value: linkedList!.getNodeByIndex(index!) as string,
        state: ElementStates.Modified,
      });
    }
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS)
    if (index === 0) {
      array[0].head = 'head';
    }
    if (index === size) {
      array[size].tail = 'tail';
    }
    array.forEach((item) => (item.state = ElementStates.Default));
    setArray([...array]);
    setIsLoader(false);
    setIsLoaderAddIndex(false);
    setInputValue('');
    setInputIndex(0);
  };
  
  const deleteIndex = async (index: number) => {
    setIsLoader(true);
    setIsLoaderDeleteIndex(true);
    linkedList!.deleteFrom(index);
    for (let i = 0; i <= index!; i++) {
      array[i].state = ElementStates.Changing;
      setArray([...array]);
      await delay(SHORT_DELAY_IN_MS)
    }

    array[index!] = {
      ...array[index!],
      value: '',
      state: ElementStates.Default,
      delete: true,
      circle: {
        value: array[index].value,
      },
    };
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS)

    array.splice(index!, 1);
    array.forEach((item) => (item.state = ElementStates.Default));
    if (index === 0) {
      array[0].head = 'head';
    }
    if (index === array.length ) {
      array[array.length].tail = 'tail';
    }
    setArray([...array]);
    await delay(SHORT_DELAY_IN_MS)

    setIsLoader(false);
    setIsLoaderDeleteIndex(false);
    setInputIndex(0);
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.container_line}>
          <Input
            value={inputValue}
            onChange={onChangeInputValue}
            isLimitText={true}
            maxLength={4}
            extraClass={styles.input}
          />
          <Button
            text='Добавить в head'
            type='button'
            disabled={inputValue === '' || isLoader}
            isLoader={isLoaderAddHead}
            onClick={() => addHead()}
          />
          <Button
            text='Добавить в tail'
            type='button'
            disabled={inputValue === '' || isLoader}
            isLoader={isLoaderAddTail}
            onClick={() => addTail()}
          />
          <Button
            text='Удалить из head'
            type='button'
            isLoader={isLoaderDeleteHead}
            disabled={ isLoader || array.length === 1 }
            onClick={() => deleteHead()}
          />
          <Button
            text='Удалить из tail'
            type='button'
            isLoader={isLoaderDeleteTail}
            disabled={ isLoader || array.length === 1 }
            onClick={() => deleteTail()}
          />
        </div>
        <div className={styles.container_line}>
          <Input
            type='number'
            placeholder='Введите индекс'
            max={9}
            value={inputIndex}
            onChange={onChangeInputIndex}
            isLimitText={true}
            extraClass={styles.input}
          />
          <Button
            text='Добавить по индексу'
            type='button'
            disabled={inputValue === '' || isLoader}
            isLoader={isLoaderAddIndex}
            onClick={() => addIndex(inputIndex)}
            extraClass={styles.button}
          />
          <Button
            text='Удалить по индексу'
            type='button'
            disabled={isLoader}
            isLoader={isLoaderDeleteIndex}
            onClick={() => deleteIndex(inputIndex)}
            extraClass={styles.button}
          />
        </div>
        <ul className={styles.list}>
          {array.map((item, index) => {
            return (
              <li className={styles.item} key={index}>
                <Circle
                  letter={item.value}
                  state={item.state}
                  head={item.head}
                  tail={item.tail}
                  index={index}
                  key={index}
                />
                {index !== array.length - 1 && (
                  <ArrowIcon
                    fill={item.state === ElementStates.Changing 
                        ? '#d252e1'
                        : '#0032FF'}
                  />
                )}
                {item.add && (
                  <Circle
                    letter={item.circle?.value}
                    state={ElementStates.Changing}
                    isSmall
                    extraClass={styles.top_circle}
                  />
                )}
                {item.delete && (
                  <Circle
                    letter={item.circle?.value}
                    state={ElementStates.Changing}
                    isSmall
                    extraClass={styles.bottom_circle}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
