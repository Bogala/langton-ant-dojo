import { MainState, default as  reducer } from './reducer';
import { Action } from 'redux';

describe('reducer', () => {
  it('should initialise with MainState Interface', () => {
    const actual = reducer(undefined, { type: null} as Action);
    expect(actual as MainState).toBeTruthy();
  });

  it('should pass state by cdefault', () => {
    class MockMainState implements MainState {}
    const actual = reducer(new MockMainState(), { type: null} as Action);
    expect(actual instanceof MockMainState).toBeTruthy();
  });
});