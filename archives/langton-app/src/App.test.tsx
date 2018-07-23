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