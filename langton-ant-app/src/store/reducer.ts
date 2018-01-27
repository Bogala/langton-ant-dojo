import { Action } from 'redux';
import * as _ from 'lodash';

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

const initGrid = () => (
  new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
    .map(() => new Array<boolean>(21).fill(false))
);

const initialState: MainState = {
  grid: initGrid(),
  ant: new Ant()
};

export default (state: MainState = initialState, action: Action) => {
  switch (action.type) {
    case 'PLAY': {
      const finalState = play(state);
      return { ...finalState };
    }
    default:
      return state;
  }
};

const play = ({ grid, ant }: MainState): MainState => {
  const movement = moveByRotation(ant.rotation, grid[ant.y][ant.x]);
  const rotation = newRotation(ant.rotation, grid[ant.y][ant.x]);
  grid[ant.y][ant.x] = !grid[ant.y][ant.x];
  movement.x += ant.x;
  movement.y += ant.y;
  return {
    ant: { ...ant, rotation: rotation, x: movement.x, y: movement.y },
    grid: [...grid]
  };
};

const newRotation = (rotation: number, right: boolean) => {
  let result = rotation + 90;
  if (right) {
    result += 180;
  }
  if (result >= 360) {
    result -= 360;
  }
  return result;
};

const moveByRotation = (rotation: number, right: boolean) => {
  const value = { x: 0, y: 0 };
  switch (rotation) {
    case 90:
      value.y++;
      break;
    case 180:
      value.x--;
      break;
    case 270:
      value.y--;
      break;
    default:
      value.x++;
      break;
  }
  if (right) {
    value.x = -value.x;
    value.y = -value.y;
  }
  return value;
};