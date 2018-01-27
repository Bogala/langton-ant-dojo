# From Component State to Redux

## New functional need
We have 2 milestones for our ant's moves : 700 moves and 2000+ moves
(No spoil here, you'll see it in time)

But, if we want to move the ant up to 700 or 2000 times, we doesn't want to click on play button each move.
To prevent that, we will upgrade the play button :
1. Play button must launch moves one by one and show the grid each time
1. New pause button to stop process and show last move
1. New label in the right of AppBar to whow the number of moves already maked

## Refactor
Firstly, our App component is too complex and we have to separate graphic component from functional behavior.
To make this, we have to migrate our local state to a state manager : Redux.

### What is Redux ?
Redux is a predictable state container for JavaScript apps.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

To resume, Redux is :
* A library for managing states with reducers
* The better way of communication between components
* First step towards functional programming

### What is a Reducer ?
A simple function that take state and an action, and returns a new state.

Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe the fact that something happened, but don't describe how the application's state changes.

### What is a container ?
The container is the connector between React component and reducers (redux state).

### Migration by the tests
Move refs from App.state to App[Grid].props on `App.spec.tsx`
Example, from :
``` jsx
const initAndPlay = async (playTimes: number = 1) => {
  const wrapper = mount(<App />);
  for (let times = 0; times < playTimes; times++) {
    await wrapper.find(AvPlayArrow).simulate('click');
  }
  const ant: Ant = wrapper.state().ant;
  const cells: boolean[][] = wrapper.state().cells;
  return {
    wrapper,
    ant,
    cells
  } as TestContext;
};
```

to :
``` jsx
const initAndPlay = async (playTimes: number = 1) => {
  const wrapper = mount(<App />);
  for (let times = 0; times < playTimes; times++) {
    await wrapper.find(AvPlayArrow).simulate('click');
  }
  const ant: Ant = wrapper.find(Grid).props().ant;
  const cells: boolean[][] = wrapper.find(Grid).props().cells;
  return {
    wrapper,
    ant,
    cells
  } as TestContext;
};
```
> So, you can make a search for "wrapper.state()" and replace to "wrapper.find(Grid).props()"

create and implement tests in redux elements
``` jsx
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
      ant: Ant;
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
```
move steps tests from App to reducer
``` jsx
import { MainState, Ant, default as  reducer } from './reducer';
import { Action } from 'redux';
import * as _ from 'lodash';

interface GridCoordinates {
  x: number;
  y: number;
}

const initAndPlay = (playTimes: number = 1): MainState => {
  const initialState = _.cloneDeep(reducer(undefined, { type: null} as Action));
  let finalState = initialState;
  for (let times = 0; times < playTimes; times++) {
    finalState = reducer(finalState, { type: 'PLAY'} as Action);
  }
  return finalState;
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
    const actual = reducer(undefined, { type: null} as Action);
    expect(actual as MainState).toBeTruthy();
  });

  test('should pass state by cdefault', () => {
    class MockMainState implements MainState {
      grid: boolean[][];
      ant: Ant;
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
    expect(actual.grid)
      .toEqual(
        new Array<Array<boolean>>(21).fill(new Array<boolean>(21)).map(() => new Array<boolean>(21).fill(false))
      );
  });

  test('initial state must have an ant definition', () => {
    const actual = reducer(undefined, { type: null} as Action);
    expect(actual).toHaveProperty('ant');
  });

  test('initial state must have an ant at 10:10:0°', () => {
    const actual = reducer(undefined, { type: null} as Action);
    expect(actual.ant).toEqual(new Ant());
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
});
```

Now, implement tests with App elements
``` jsx
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

const newRotation = (rotation: number, right: boolean) => {
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
```

`newRotation` and `newRotation` are copied from App.tsx and `play`function is an adapted copy from `onClick`.

Don't forget the movement of Ant interface by remove definition on Grid.tsx.
If you update `src/components/App/Grid/index.ts` like this
``` jsx
export {Ant} from '../../../store/reducer';
```
You will avoid side-effects.

if you want to refactor, you can move functions to an `actions.ts` file.

To use the reducer in our application, we have to map `PLAY` event to App's `onClick` and map `grid` and `ant` to the grid.
So, we don't need to have grid and ant definition anymore on App.tsx. Now, this is the Redux responsability.

Let's begin with App.tsx. We want to purge state and map `onClick` to the redux dispatcher.
``` jsx
//Work in progress
```
If you want to map a event to dispatcher, you have to add this event to props.

# Reminders
![TDD Cycles](https://upload.wikimedia.org/wikipedia/commons/0/0b/TDD_Global_Lifecycle.png)
5 Steps to reproduce every cycle:
1. Add a new test
1. Run all tests and verify if the new test fails
1. Write code to pass the new test to green
1. Run all tests and verify all are green
1. Refactor

Before each test, we launch a five minutes timer.
* If the code compiles and the tests are green, commit!
* Otherwise, revert!

All __your__ code must be covered by unit tests.

We'll avoid maximum `any` (implicit or not).

## Exercice Solution
[_Download Example_](https://github.com/Bogala/langton-ant-dojo/archive/step4.zip)
