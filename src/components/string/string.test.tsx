import { reverseWord } from './utils';
import { ElementStates } from '../../types/element-states';

jest.setTimeout(15000)

const oddWord = [
  {
    state: ElementStates.Modified,
    value: 'ы',
  },
  {
    state: ElementStates.Modified,
    value: 'т',
  },
  {
    state: ElementStates.Modified,
    value: 'с',
  },
  {
    state: ElementStates.Modified,
    value: 'е',
  },
  {
    state: ElementStates.Modified,
    value: 'т',
  },
];

const evenWord = [
  {
    state: ElementStates.Modified,
    value: 'т',
  },
  {
    state: ElementStates.Modified,
    value: 'с',
  },
  {
    state: ElementStates.Modified,
    value: 'е',
  },
  {
    state: ElementStates.Modified,
    value: 'т',
  },
];

describe('Тестирование разворота строки', () => {
  it('Разворот строки с нечетным количеством символов', async () => {
    const res = await reverseWord( 'тесты', () => {});
    expect(res).toEqual(oddWord);
  });

  it('Разворот строки с четным количеством символов', async () => {
    const res = await reverseWord( 'тест', () => {});
    expect(res).toEqual(evenWord);
  });

  it('Разворот строки с одним символом', async () => {
    const res = await reverseWord('т',() => {},);
    expect(res).toEqual([{
      state: ElementStates.Modified,
      value: 'т',
    },]);
  });

  it('Разворот пустой строки', async () => {
    const res = await reverseWord('',() => {},);
    expect(res).toEqual([]);
  });
});