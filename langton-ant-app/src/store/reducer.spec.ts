import { MainState, Ant, default as  reducer } from './reducer';
import { Action } from 'redux';

describe('reducer', () => {
  test('should initialise with MainState Interface', () => {
    const actual = reducer(undefined, { type: null} as Action);
    expect(actual as MainState).toBeTruthy();
  });

  test('should pass state by cdefault', () => {
    class MockMainState implements MainState {
      grid: boolean[][];
    }
    const actual = reducer(new MockMainState(), { type: null} as Action);
    expect(actual instanceof MockMainState).toBeTruthy();
  });

  test('initial state must have a grid definition', () => {
    const actual = reducer(undefined, { type: null} as Action);
    expect(actual).toHaveProperty('grid');
  });

  test('initial state must have a 21x21xfalse grid', () => {
    const actual = reducer(undefined, { type: null} as Action);
    expect(actual.grid).toEqual(new Array<Array<boolean>>(21).map(() => new Array<boolean>(21).fill(false)));
  });

  test('initial state must have an ant definition', () => {
    const actual = reducer(undefined, { type: null} as Action);
    expect(actual).toHaveProperty('ant');
  });

  test('initial state must have an ant at 10:10:0°', () => {
    const actual = reducer(undefined, { type: null} as Action);
    expect(actual.ant).toEqual(new Ant());
  });
});