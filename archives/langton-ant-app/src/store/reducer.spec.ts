import { MainState, Ant, default as reducer, PayloadedAction, ReloadParams } from './reducer';
import { Action } from 'redux';
import * as _ from 'lodash';
import { PLAYED, REDIM, RELOAD } from './actions';

interface GridCoordinates {
  x: number;
  y: number;
}

const initAndPlay = (playTimes: number = 1): MainState => {
  const initialState = _.cloneDeep(reducer(undefined, { type: null } as Action));
  let finalState = initialState;
  for (let times = 0; times < playTimes; times++) {
    finalState = reducer(finalState, { type: PLAYED } as Action);
  }
  return finalState;
};

const initAndRedim = (): MainState => {
  const initialState = _.cloneDeep(reducer(undefined, { type: null } as Action));
  return reducer(initialState, { type: REDIM } as Action);
};

const initAndReload = (length?: number, x?: number, y?: number): MainState => {
  const initialState = initAndPlay(15);
  return reducer(initialState, {
    type: RELOAD,
    payload: {
      newLength: length,
      newAntX: x,
      newAntY: y
    }
  } as PayloadedAction<ReloadParams>);
};

const expectGreyCells = (context: MainState, ...greyCells: Array<GridCoordinates>) => {
  for (let line = 0; line < context.grid.length; line++) {
    for (let cell = 0; cell < context.grid[line].length; cell++) {
      const val = greyCells.some(value => value.x === cell && value.y === line);
      expect(context.grid[line][cell]).toBe(val);
    }
  }
};

describe('reducer', () => {
  test('should initialise with MainState Interface', () => {
    const actual = reducer(undefined, { type: null } as Action);
    expect(actual as MainState).toBeTruthy();
  });

  test('should pass state by cdefault', () => {
    class MockMainState implements MainState {
      grid: boolean[][];
      ant: Ant;
      count: number;
      gridLength: number;
    }
    const actual = reducer(new MockMainState(), { type: null } as Action);
    expect(actual instanceof MockMainState).toBeTruthy();
  });

  test('initial state must have a grid definition', () => {
    const actual = reducer(undefined, { type: null } as Action);
    expect(actual).toHaveProperty('grid');
  });

  test('initial state must have a 21x21xfalse grid', () => {
    const actual = reducer(undefined, { type: null } as Action);
    expect(actual.grid)
      .toEqual(
        new Array<Array<boolean>>(21).fill(new Array<boolean>(21)).map(() => new Array<boolean>(21).fill(false))
      );
  });

  test('initial state must have an ant definition', () => {
    const actual = reducer(undefined, { type: null } as Action);
    expect(actual).toHaveProperty('ant');
  });

  test('initial state must have an ant at 10:10:0°', () => {
    const actual = reducer(undefined, { type: null } as Action);
    expect(actual.ant).toEqual(new Ant());
  });

  test('8 movements should show number of mvts', () => {
    const { count } = initAndPlay(8);
    expect(count).toBe(8);
  });

  describe('[App]Step 3.1: First move', () => {

    test('Ant must rotate 90° when play button clicked', () => {
      const { ant } = initAndPlay();
      expect(ant.rotation).toBe(90);
    });

    test('Cell is grey when play button clicked', () => {
      expectGreyCells(initAndPlay(), { x: 10, y: 10 });
    });

    test('Ant must move left when play button clicked', () => {
      const { ant } = initAndPlay();
      expect(ant.x).toBe(11);
      expect(ant.y).toBe(10);
    });
  });

  describe('[App]Step 3.2: Second move', () => {
    test('Ant must rotate 90° when play button clicked', () => {
      const { ant } = initAndPlay(2);
      expect(ant.rotation).toBe(180);
    });

    test('Cell is grey when play button clicked', () => {
      expectGreyCells(initAndPlay(2), { x: 10, y: 10 }, { x: 11, y: 10 });
    });

    test('Ant must move left when play button clicked', () => {
      const { ant } = initAndPlay(2);
      expect(ant.x).toBe(11);
      expect(ant.y).toBe(11);
    });
  });

  describe('[App]Step 3.3: Third move', () => {
    test('Ant must rotate 90° when play button clicked', () => {
      const { ant } = initAndPlay(3);
      expect(ant.rotation).toBe(270);
    });

    test('Cell is grey when play button clicked', () => {
      expectGreyCells(initAndPlay(3), { x: 10, y: 10 }, { x: 11, y: 10 }, { x: 11, y: 11 });
    });

    test('Ant must move left when play button clicked', () => {
      const { ant } = initAndPlay(3);
      expect(ant.x).toBe(10);
      expect(ant.y).toBe(11);
    });
  });

  describe('[App]Step 3.4: Fourth move', () => {
    test('Ant must rotate 90° when play button clicked', async () => {
      const { ant } = await initAndPlay(4);
      expect(ant.rotation).toBe(0);
    });

    test('Cell is grey when play button clicked', () => {
      expectGreyCells(initAndPlay(4), { x: 10, y: 10 }, { x: 11, y: 10 }, { x: 11, y: 11 }, { x: 10, y: 11 });
    });

    test('Ant must move left when play button clicked', () => {
      const { ant } = initAndPlay(4);
      expect(ant.x).toBe(10);
      expect(ant.y).toBe(10);
    });
  });

  describe('[App]Step 3.5: Fifth move', () => {
    test('Ant must rotate 90° when play button clicked', () => {
      const { ant } = initAndPlay(5);
      expect(ant.rotation).toBe(270);
    });

    test('Cell is grey when play button clicked', () => {
      expectGreyCells(
        initAndPlay(5),
        { x: 11, y: 10 },
        { x: 11, y: 11 },
        { x: 10, y: 11 });
    });

    test('Ant must move left when play button clicked', () => {
      const { ant } = initAndPlay(5);
      expect(ant.x).toBe(9);
      expect(ant.y).toBe(10);
    });
  });

  describe('[App]Step 3.10: Tenth move', () => {
    test('Ant must rotate 90° when play button clicked', () => {
      const { ant } = initAndPlay(10);
      expect(ant.rotation).toBe(180);
    });

    test('Cell is grey when play button clicked', () => {
      expectGreyCells(
        initAndPlay(10),
        { x: 10, y: 10 },
        { x: 11, y: 10 },
        { x: 11, y: 11 },
        { x: 10, y: 11 },
        { x: 9, y: 9 },
        { x: 10, y: 9 });
    });

    test('Ant must move left when play button clicked', () => {
      const { ant } = initAndPlay(10);
      expect(ant.x).toBe(9);
      expect(ant.y).toBe(11);
    });
  });

  describe('Step 5: redim change grid size and ant position', () => {
    test('Redim change size', () => {
      const { grid } = initAndRedim();
      expect(grid).toHaveLength(23);
    });

    test('Redim change ant position', () => {
      const { ant } = initAndRedim();
      expect(ant).toEqual({ x: 11, y: 11, rotation: 0 } as Ant);
    });
  });

  describe('Step 6: reload re-init grid', () => {
    test('Reload change size an,d re-init status', () => {
      const { grid } = initAndReload(90);
      expect(grid).toHaveLength(90);
    });

    test('Redim change ant position', () => {
      const { ant } = initAndReload(90, 60, 30);
      expect(ant).toEqual({ x: 60, y: 30, rotation: 0 } as Ant);
    });
  });
});