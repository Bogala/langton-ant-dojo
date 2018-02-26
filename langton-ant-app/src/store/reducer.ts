import { Action } from 'redux';
import { play, PLAYED, REDIM, redim, reload, RELOAD } from './actions';

export class Ant {
  public x: number;
  public y: number;
  public rotation: number;

  constructor(x: number = 10, y: number = 10, rotation: number = 0) {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
  }
}

export interface PayloadedAction<T> extends Action {
  payload: T;
}

export interface ReloadParams {
  newLength: number;
  newAntX: number;
  newAntY: number;
}

export interface MainState {
  grid: Array<Array<boolean>>;
  ant: Ant;
  count: number;
  gridLength: number;
}

const initGrid = () => (
  new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
    .map(() => new Array<boolean>(21).fill(false))
);

const initialState: MainState = {
  grid: initGrid(),
  ant: new Ant(),
  count: 0,
  gridLength: 21
};

export default (state: MainState = initialState, action: Action) => {
  switch (action.type) {
    case PLAYED: {
      const finalState = play(state);
      return { ...finalState };
    }
    case REDIM: {
      const finalState = redim(state);
      return { ...finalState };
    }
    case RELOAD: {
      const { newLength, newAntX, newAntY } = (action as PayloadedAction<ReloadParams>).payload;
      const finalState = reload(newLength, newAntX, newAntY);
      return { ...finalState };
    }
    default:
      return state;
  }
};