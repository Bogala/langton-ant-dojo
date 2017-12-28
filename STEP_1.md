# Step 1 : Create React Project

Please make a new git repository on your own github space and clone it. (You can make it locally if you want)

Please verify if you have the latest version of NodeJS (`node -v` >= 8.9.3), NPM (`npm -v` >= 5.6.0) and Yarn (`yarn -v`>= 1.3.2)

On your cloned repository, make a new app with [create-react-app](https://github.com/facebookincubator/create-react-app) 
and [react-ats-scripts](https://www.npmjs.com/package/react-ats-scripts) :
```shell
npx create-react-app langton-ant-app --scripts-version=react-ats-scripts
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

__App.spec.tsx__
``` typescript
import 'core-js';
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

__App.scss__
```scss
.center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

__App.tsx__
``` tsx
import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CircularProgress } from 'material-ui';

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

and associated types...
``` shell
yarn add @types/redux @types/recompose @types/react-redux -D
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

### Prepare component to be enhanced

### Enhance component

## Exercice Solution
[_Download Example_](https://github.com/Bogala/langton-ant-dojo/archive/step1.zip)
