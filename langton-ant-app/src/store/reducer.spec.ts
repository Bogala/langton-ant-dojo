import reducer from './reducer';
import { Action } from 'redux';

describe('reducer', () => {
  it('should initialise with 1', () => {
    const actual = reducer(undefined, { type: null} as Action);
    expect(actual).toBeNull();
  });
});