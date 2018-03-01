# Asynchronous logic with Redux

Redux reducers handle state transitions, but they must be 
handled synchronously.

But what about Async events like User interactions, ajax calls (with cancellation), web sockets or animations?

See more in my presentation [async-reduc-observable](https://github.com/Bogala/async-redux-observable)

## Observables and RxJS
What is an observable ?
* a set of events
* 0, 1 or more values
* over any amount of time
* cancellable and lazy

What is RxJS ? It contains Observables and functions to create and compose Observables, also known as "Lodash for async".
RxJS combines the Observer and Iterator patterns, functional programming and collections in an ideal way to manage sequences of events.

![](http://reactivex.io/assets/operators/legend.png)

### Create Observables
* `of('hello')`
* `from ([1, 2, 3, 4])`
* `interval(1000)`
* `ajax('http://example.com')`
* `webSocket('ws://echo.websocket.com')`
* many more

### Subscribe an Observable
``` js
myObservable.subscribe(
  value => console.log('next', value),
  err => console.roor('error', err),
  () => console.info('complete!')
);
``` 


## Redux and Epics
An Epic is the core primitive of redux-observable.

It is a function that takes a stream of all actions dispatched 
and returns a stream of new actions to dispatch.
![](./images/redux-rxjs-epic2.png)


## Refactor
### Change actions name
To prepare next step, we have to change the PLAY action :

__actions.ts__

``` typescript
export const PLAY = 'PLAY';
export const PLAYED = 'PLAYED';
export const PAUSED = 'PAUSED';
``` 

Now, in the reducer, PLAY becomes PLAYED. (PLAY will be used for the loop)
``` typescript
export default (state: MainState = initialState, action: Action) => {
  switch (action.type) {
    case PLAYED: {
      const finalState = play(state);
      return { ...finalState };
    }
    default:
      return state;
  }
};
``` 

### NPM packages
First, we have to install packages:

``` shell
yarn add rxjs redux-observable
```

Types are included in each package. We don't have to add any `@types/rxjs` or `@types/redux-observable`

### Epic by the test
Let's code our first test:
__epic.spec.ts__

``` typescript
configure({ adapter: new Adapter() });

jest.useFakeTimers();

const epicMiddleware = createEpicMiddleware(epic);
const mockStore = configureStore([epicMiddleware]);

let store: MockStore<{}>;

describe('Epic', () => {
    beforeEach(() => {
        store = mockStore({});
    });

    afterEach(() => {
        epicMiddleware.replaceEpic(epic);
    });

    test('Dispatch played when launched', () => {
        store.dispatch({ type: PLAY });
        jest.runOnlyPendingTimers();
        expect(store.getActions()).toEqual([
            { type: PLAY },
            { type: PLAYED }
        ]);
    });
});
``` 

That makes an epic like this:
``` typescript
export default (action$: ActionsObservable<Action>) => 
    action$.ofType(PLAY)
        .switchMap(() =>
            Observable.interval(50)
            .mapTo({ type: PLAYED })
        );
```

A second test:

``` typescript
    test('Dispatch cancelled when paused', () => {
        store.dispatch({ type: PLAY });
        jest.runOnlyPendingTimers();
        store.dispatch({ type: PAUSED });
        jest.runOnlyPendingTimers();
        expect(store.getActions()).toEqual([
            { type: PLAY },
            { type: PLAYED },
            { type: PLAYED },
            { type: PAUSED }
        ]);
    });
```

Our new epic:
``` typescript
export default (action$: ActionsObservable<Action>) => 
    action$.ofType(PLAY)
        .switchMap(() =>
            Observable.interval(50)
            .takeUntil(action$.ofType(PAUSED))
            .mapTo({ type: PLAYED })
        );
```

### Add Middleware
We have to change our store index.ts:

``` typescript
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducer from './reducer';
import { compose } from 'recompose';
import epic from './epic';

// tslint:disable-next-line:no-any
const composeEnhancers =
    // tslint:disable-next-line:no-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware(epic, {
    dependencies: {  }
});

export const configureStore = () => (
    createStore(
        reducer,
        composeEnhancers(applyMiddleware(epicMiddleware))
    )
);

export {MainState, Ant} from './reducer';
``` 
Now, we are using compose to enhance previous configuration with epicMiddleWare (redux-observable).

### Update App container
Our mapDispatchToProps doesn't need interval anymore. we will use dispatch to call redux an epic middleware :
``` typescript
const mapDispatchToProps: MapDispatchToProps<AppEventProps, AppProps> = (dispatch, ownProps) => ({
    onPlay: () => {
        dispatch({ type: PLAY } as Action);
    },
    onPause: () => {
        dispatch({ type: PAUSED } as Action);
    }
});
``` 

But with this our test won't work, we make one too many dispatch call when the button is clicked:
``` typescript
    test('Pause button stop dispatchs', async () => {
        // tslint:disable-next-line:no-any
        (store.dispatch as any).mockClear();
        
        const wrapper = 
            mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><App /></MemoryRouter></Provider>);
        await wrapper.find(AvPlayArrow).simulate('click');

        jest.runOnlyPendingTimers();
        expect(store.dispatch).toHaveBeenCalled();

        await wrapper.find(AvPause).simulate('click');
        jest.runOnlyPendingTimers();
        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    test('stop stopped should not make exception', async () => {
        // tslint:disable-next-line:no-any
        (store.dispatch as any).mockClear();
        
        const wrapper = 
            mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><App /></MemoryRouter></Provider>);
        
        await wrapper.find(AvPause).simulate('click');
        jest.runOnlyPendingTimers();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
``` 
> If you want to begin here, you can download [this sources](https://github.com/Bogala/langton-ant-dojo/archive/step5-refactored.zip)

## New functional need
Please try over 900 movements... Your ant needs a bigger grid.
So, now we need a dynamic size for our grid.

If your Ant is on the border of the grid: 
* add one line above
* add one line below
* add one column before
* add one column after
* update the Ant coordinates


> When you're done, you can go to the [next step : Advanced Typescript](./STEP_6.md)

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
[_Download Example_](https://github.com/Bogala/langton-ant-dojo/archive/step5.zip)