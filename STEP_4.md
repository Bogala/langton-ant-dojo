# From Component State to Redux

## New functional need
We have 2 milestones for our ant : 700 moves and 2000+ moves
(No spoilers here, you'll see it in time)

But, if we want to move the ant up to 700 or 2000 times, we don't want to click on the play button for each move.
Therefore, we will upgrade our button with three steps:
1. The play button must iterate moves one by one and display the grid each time
1. A new pause button stops the iteration and shows the last move
1. A new label in the right of AppBar shows the number of moves already done

## Refactoring
Firstly, our App component is too complex, and we have to separate the graphic component from the functional behavior.
To split those, we have to migrate our local state to a state manager : Redux.

### What is Redux ?
Redux is a predictable state container for JavaScript apps that helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.

To resume, Redux is :
* A library for managing states with reducers
* The better way of communication between components
* The first step towards functional programming

### What is a Reducer ?
A simple function that takes a state and an action, and returns a new state.

Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe the fact that something happened, but don't describe how the application's state changes.

### What is a container ?
The container is the connector between React component and reducers (redux state).

### Migration by the tests
Move refs from `App.state` to `App[Grid].props` on `App.spec.tsx`.
For example

Before:
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

After:
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
> So, you can search for "wrapper.state()" and replace it with "wrapper.find(Grid).props()"

Create and implement tests in redux elements:
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
Move step tests from App to reducer:
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

Now, implement tests with App elements:
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
```

`newRotation` and `moveByRotation` are copied from App.tsx and `play` function is an modifed version of `onClick`.

Don't forget the movement of the Ant interface by removing the definition in Grid.tsx.
If you update `src/components/App/Grid/index.ts` like this:
``` jsx
export {Ant} from '../../../store/reducer';
```
You will avoid side-effects.

If you want to refactor, you can move functions to an `actions.ts` file.

To use the reducer in our application, we have to map the `PLAY` event to our App's `onClick`, as well as map `grid` and `ant` to the grid.
So, we don't need to have the grid and ant definitions anymore in `App.tsx`. Now, this is Redux' responsability.

Let's begin with `App.tsx`. We want to purge the state and map `onClick` to the redux dispatcher.
``` jsx
export interface AppEventProps {
  onClick?: () => void;
 }
```
If you want to map an event to a dispatcher, you have to add this event to the props.

We want the play button to launch the `PLAY` action in the reducer:

__App.container.spec.tsx__
``` jsx
const mockStore = configureStore();
let container: ShallowWrapper;
const store = mockStore({
    grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
        .map(() => new Array<boolean>(21).fill(false)),
    ant: new Ant()
});

describe('App container', () => {
    test('renders without crashing', () => {
        container = shallow(<App />, { context: { store } });
        expect(container.length).toEqual(1);
    });

    test('map Dispatch to onClic prop', async () => {
        store.dispatch = jest.fn();
        const wrapper = mount(<App />, { context: { store } });
        await wrapper.find(AvPlayArrow).simulate('click');
        expect(store.dispatch).toBeCalledWith({ type: PLAY} as Action);
    });


});
```

With this test, we can implement `App.container.tsx`:
``` jsx
const mapDispatchToProps: MapDispatchToProps<AppEventProps, AppProps> = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch({ type: PLAY} as Action);
    }
});
```

Now, we have to connect the Grid as well:

__Grid.container.spec.tsx__
``` jsx
import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow, ShallowWrapper } from 'enzyme';

import configureStore from 'redux-mock-store';

import Grid from './';
import { Ant } from './';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

const mockStore = configureStore();
let container: ShallowWrapper;
const store = mockStore({
    grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
        .map(() => new Array<boolean>(21).fill(false)),
    ant: new Ant()
});

describe('App container', () => {
    test('renders without crashing', () => {
        container = shallow(<Grid />, { context: { store } });
        expect(container.length).toEqual(1);
    });

    test('Grid dispatched from redux to props', async () => {
        container = shallow(<Grid />, { context: { store } });
        expect(container.prop('cells')).toEqual(new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
        .map(() => new Array<boolean>(21).fill(false)));
    });

    test('Ant dispatched from redux to props', async () => {
        container = shallow(<Grid />, { context: { store } });
        expect(container.prop('ant')).toEqual(new Ant());
    });
});
```
__Grid.container.tsx__
``` jsx
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { MainState } from '../../../store/';
import Grid, { GridBindingProps, GridEventProps, GridProps } from './Grid';

const mapStateToProps: MapStateToProps<GridBindingProps, GridProps, MainState> = (state, props) => ({
    ant: state.ant,
    cells: state.grid
});
const mapDispatchToProps: MapDispatchToProps<GridEventProps, GridProps> = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
```
__Grid/index.ts__
``` jsx
import Grid from './Grid.container';
import './Grid.scss';

export {Ant} from '../../../store/reducer';

export default Grid;
```
> If your project does not work, you can download [_the solution zip file_](https://github.com/Bogala/langton-ant-dojo/archive/step4-redux.zip)

## Play with Routes ?
If you want to play with routes, you can make a route validator : if we are at root (`/`), we can see the grid. Otherwise, we will have a 404 error.

Before, we make a `NotFound` component under `App`
__NotFound.spec.tsx__
``` jsx
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import NotFound from './';

describe('footer', () => {

  it('Render match snapshot ', () => {
    const component = renderer.create(<NotFound />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
```

__NotFound.tsx__
```jsx
import * as React from 'react';

export default () => (
    <div>
        <h1>404 not found</h1>
        <p>The page your are searching for is not here!</p>
    </div>
);
```

### How react router works
React Router v4 is a pure React rewrite of the popular React package. Previous versions of React Router used configuration disguised as pseudo-components and would be difficult to understand. Now with v4, everything is now “just components”.
Every component can manage its own routes. Let's make our simple example :

Before all, explain to your application that you want to use routes with tag `BrowserRouter`
__index.tsx__
``` jsx
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
```

And, in your `App` component, add an explanation about what we want :
``` jsx
const App = ({ title, onClick }: AppProps) => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title={title || 'Langton Ant'}
        iconElementLeft={<IconButton><AvPlayArrow onClick={onClick} /></IconButton>}
      />
      <div>
        <div className="stretch">
          <Card className="md-card">
            <Switch>
              <Route path="/" component={Grid} exact={true} />
              <Route component={NotFound} />
            </Switch>
          </Card>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
);
```
* `Switch` indicate the route specifications definition
* `Route` is used to define and specify how works one Route
* `path` is the url suffix used to redirect to component. Here, we are in the root path (http://localhost:3000/) but, if we are in a component under path /foo and we define path with "/bar", the url of this component is http://localhost:3000/foo/bar.
* `exact` define if the system read any path under the Route. If false, the path is considered as a begining. All url after `/` will be managed in defined component. If true, the `/` is the only one route used for this component.
* The order is important is important and the list must finish with a `Route` element without path. It's used for all other paths.

> If  you want, you can directly download [the code with router](https://github.com/Bogala/langton-ant-dojo/archive/step4-router.zip).

So here, if we are on http://localhost:3000/ url, the grid will be shown. But, all other path show the Not Found component.

Now, we can make tests and implement our new functionalities.
> When you're done, you can go to the [next step : Asynchronous logic with Redux](./STEP_5.md)

# Reminders
![TDD Cycles](https://upload.wikimedia.org/wikipedia/commons/0/0b/TDD_Global_Lifecycle.png)
5 Steps to reproduce every cycle:
1. Add a new test
1. Run all tests and verify if the new test fails
1. Write code to pass the new test to green
1. Run all tests and verify all are green
1. Refactor

Before each test, launch a five minutes timer.
* If the code compiles and the tests are green, commit!
* Otherwise, revert!

All of __your__ code must be covered by unit tests.

We'll avoid `any` as much as possible (implicit or not).

## Exercice Solution
[_Download Example_](https://github.com/Bogala/langton-ant-dojo/archive/step4.zip)
