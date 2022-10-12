import {
  bubbleSorting,
  selectionSorting,
} from './utils';

import { ElementStates } from '../../types/element-states';

const element = [
  {
    value: 1,
    state: ElementStates.Default,
  },
];

const array = [
  {
    state: ElementStates.Default,
    value: 3,
  },
  {
    state: ElementStates.Default,
    value: 1,
  },
  {
    state: ElementStates.Default,
    value: 77,
  },
  {
    state: ElementStates.Default,
    value: 24,
  },
];

const arrayDescending = [
  {
    state: ElementStates.Modified,
    value: 77,
  },
  {
    state: ElementStates.Modified,
    value: 24,
  },
  {
    state: ElementStates.Modified,
    value: 3,
  },
  {
    state: ElementStates.Modified,
    value: 1,
  },
];

const arrayAscending = [
  {
    state: ElementStates.Modified,
    value: 1,
  },
  {
    state: ElementStates.Modified,
    value: 3,
  },
  {
    state: ElementStates.Modified,
    value: 24,
  },
  {
    state: ElementStates.Modified,
    value: 77,
  },
];

jest.setTimeout(15000)

describe('Сортировка пузырьком', () => {
  it('Сортировка пустого массива', async () => {
    const res = await bubbleSorting('descending',[], () => {});
    expect(res).toEqual([]);
  });

  it('Сортировка одного элемента', async () => {
    const res = await bubbleSorting('descending',element, () => {});
    expect(res).toEqual([{
      value: 1,
      state: ElementStates.Modified,
    }]);
  });

  it('Сортировка по убыванию нескольких элементов', async () => {
    const res = await bubbleSorting('descending', array, () => {});
    expect(res).toEqual(arrayDescending);
  });

  it('Сортировка по возрастанию нескольких элементов', async () => {
    const res = await bubbleSorting('ascending', array, () => {});
    expect(res).toEqual(arrayAscending);
  });
});

describe('Сортировка выбором', () => {
  it('Сортировка пустого массива', async () => {
    const res = await selectionSorting('descending',[], () => {});
    expect(res).toEqual([]);
  });

  it('Сортировка одного элемента', async () => {
    const res = await selectionSorting('descending',element, () => {});
    expect(res).toEqual([{
      value: 1,
      state: ElementStates.Modified,
    }]);
  });

  it('Сортировка по убыванию нескольких элементов', async () => {
    const res = await selectionSorting('descending',array, () => {});
    expect(res).toEqual(arrayDescending);
  });

  it('Сортировка по возрастанию нескольких элементов', async () => {
    const res = await selectionSorting('ascending', array, () => {});
    expect(res).toEqual(arrayAscending);
  });
});