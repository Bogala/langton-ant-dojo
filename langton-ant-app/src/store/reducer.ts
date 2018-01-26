import { Action } from 'redux';

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

export interface MainState {
  grid: Array<Array<boolean>>;
  ant: Ant;
}

const initialState: MainState = {
  grid: new Array<Array<boolean>>(21).map(() => new Array<boolean>(21).fill(false)),
  ant: new Ant()
};

export default (state: MainState = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};