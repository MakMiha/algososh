import { ElementStates } from './element-states';

export type TArraySymbols = {
  value: string;
  state : ElementStates;
}

export type TArrayNumber = {
  value: number;
  state : ElementStates;
}

export type TArrayStack = {
  value: number | unknown;
  state: ElementStates;
  head: string;
}

export type TArrayQueue = {
  value: string;
  state: ElementStates;
  head: string;
  tail: string;
}

export type TArrayList = {
  value: string;
  state: ElementStates;
  head?: string;
  tail?: string;
  add?: boolean
  delete?: boolean
  circle?: {
    value: string;
  };
};