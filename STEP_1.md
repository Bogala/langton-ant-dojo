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
yarn add enzyme @types/enzyme enzyme-adapter-react-16 @types/enzyme-adapter-react-16 jest-enzyme -D
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

import { CircularProgress } from 'material-ui';
import App from './App';

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

>
Now your application is initialized, you can go to the [next step : A grid and an Ant](./STEP_2.md)
>

## Exercice Solution
[_Download Example_](https://github.com/Bogala/langton-ant-dojo/archive/step1.zip)
