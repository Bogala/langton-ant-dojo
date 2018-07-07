# Step 1 : Create React Project

Please make a new git repository on your own github space and clone it. (You can make it locally if you want)

Please verify if you have the latest version of NodeJS (`node -v` >= 8.9.3), NPM (`npm -v` >= 5.6.0) and Yarn (`yarn -v`>= 1.3.2)

On your cloned repository, make a new app with [create-react-app](https://github.com/facebookincubator/create-react-app) 
and [react-scripts-ts](https://www.npmjs.com/package/react-scripts-ts) :
```shell
npx create-react-app langton-app --scripts-version=react-scripts-ts
```

To test our app, we have to install enzyme
``` shell
yarn add enzyme @types/enzyme enzyme-adapter-react-16 @types/enzyme-adapter-react-16 -D
``` 

## Add MaterialUI and update App layout
Material-UI is a set of React components that implement [Google's Material Design](https://www.google.com/design/spec/material-design/introduction.html) specification.

Check out their [documentation site](http://www.material-ui.com/) for live examples.

The first step is to install the package :
```shell
yarn add material-ui
``` 

After, we need types for MaterialUI :
``` shell
yarn add @types/material-ui -D
```

Material-UI components require a theme to be provided. The quickest way to get up and running is by using the MuiThemeProvider to inject the theme into your application context.

__App.tsx__

``` typescript
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="App-header">
            <img src={require('./logo.svg')} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
``` 
Now, we have to remove all useless code in our component and replace this with a little loader at the center of the screen.

__App.test.tsx__
``` typescript
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { configure, shallow } from 'enzyme';

import App from './';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('App component contains default loader in material design', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('.center')).toHaveLength(1);
  expect(wrapper.find(CircularProgress)).toHaveLength(1);
});
```

__App.css__
``` css
.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

__App.tsx__
``` tsx
import { CircularProgress } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import './App.css';

export default () => (
  <MuiThemeProvider>
    <div className="center">
      <CircularProgress size={180} thickness={5} />
    </div>
  </MuiThemeProvider>
);
```

## Make a store with Redux and create our first reducer
We have to install packages redux, react-redux and recompose (used for [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html))
``` shell
yarn add redux recompose react-redux
```

, associated types and mock system...
``` shell
yarn add @types/redux @types/recompose @types/react-redux redux-mock-store @types/redux-mock-store -D
```

Now, we can initiate and connect redux to react.

Let's create a store folder under src and add a reducer
```
lagton-ant-app
|_ src
   |_ components
      |_ App
         |_ App.scss
         |_ App.spec.tsx
         |_ App.ts
         |_ index.ts
   |_ store
      |_ index.ts
      |_ reducer.spec.ts
      |_ reducer.ts
   |_ stories
      |_ index.tsx
   |_ index.ts
   |_ registerServiceWorker.ts
[...]
```

__reducer.spec.ts__
``` typescript
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
```

__reducer.ts__
``` typescript
import { Action } from 'redux';

export interface MainState {

}

const initialState: MainState = {};

export default (state: MainState = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

Now make a store with this reducer
``` typescript
import { createStore } from 'redux';
import reducer from './reducer';

export const configureStore = () => (
    createStore(
        reducer,
        // tslint:disable-next-line:no-any
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);
```

## Connect our reducer with our react application
To connect redux and react, we have two steps :
1. Initiate and maintain a store instance
1. Connect each component who need the reducer

### Connect the store to the application
The file to update for this is our main `index.tsx`
We have to surround our app component with a react-redux `Provider`
``` tsx
[...]
import { Provider } from 'react-redux';
import { configureStore } from './store/index';

ReactDOM.render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
[...]
```

### Prepare component to be enhanced
To prepare App component, we have to make a typing for the props :
* An interface for binding elements
* An interface for event elements
* One interface to rule them all, to find them, to bring them all and in the darkness bind them.

Add these interfaces to your __App.tsx__
``` tsx
[...]
export interface AppBindingProps {}
export interface AppEventProps {}
export interface AppProps extends AppBindingProps, AppEventProps {}

export default (props: AppProps) => (
[...]
```
### Enhance component
Add a new file __App.container.spec.tsx__
``` tsx
import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow, ShallowWrapper } from 'enzyme';

import configureStore from 'redux-mock-store';

import App from './';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

const mockStore = configureStore();
let container: ShallowWrapper;

describe('App container', () => {
    beforeEach(() => {
        const store = mockStore({});
        container = shallow(<App />, { context: { store } });
    });

    it('renders without crashing', () => {
        expect(container.length).toEqual(1);
    });
});
```

and associated __App.container.ts__ 
``` typescript
import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { MainState } from '../../store/reducer';
import App, { AppProps, AppBindingProps, AppEventProps } from './App';

const mapStateToProps: MapStateToProps<AppBindingProps, AppProps, MainState> = (state, props) => ({});
const mapDispatchToProps: MapDispatchToProps<AppEventProps, AppProps> = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
```

you can understand mapStateToProps types like :
```typescript
mapStateToProps = (state: MainState, props: AppProps):AppBindingProps => ({});
```

Not forget to change index.ts reference :
``` typescript
import App from './App.container';
```

>
Now your application is initialized, you can go to the [next step : A grid and an Ant](./STEP_2.md)
>

## Exercice Solution
[_Download Example_](https://github.com/Bogala/langton-ant-dojo/archive/step1.zip)
