import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { configure, shallow } from 'enzyme';
import { AppBar, IconButton, Card } from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';

import App from './App';
import Grid from './Grid';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

describe('App.tsx', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  test('App component must contains header app bar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });

  test('AppBar must have a default title', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar).prop('title')).toBe('Langton Ant');
  });

  test('AppBar must have a play buttone', () => {
    const {iconElementLeft} = shallow(<App />).find(AppBar).props();
    expect(iconElementLeft).toEqual(<IconButton><AvPlayArrow /></IconButton>);
  });

  test('AppBar s title can be defined', () => {
    const wrapper = shallow(<App title="Langon Ant : First generation" />);
    expect(wrapper.find(AppBar).prop('title')).toBe('Langon Ant : First generation');
  });

  test('Must have the grid in a Card', () => {
    const wrapper = shallow(<App title="Langon Ant : First generation" />);
    expect(wrapper.find(Card).length).toBe(1);
    expect(wrapper.find(Card).find(Grid).length).toBe(1);
  });
});