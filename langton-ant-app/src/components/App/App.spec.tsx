import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { configure, shallow } from 'enzyme';
import { CircularProgress, AppBar, IconButton } from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';

import App from './App';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

describe('App.tsx', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('App component contains default loader in material design', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.center')).toHaveLength(1);
    expect(wrapper.find(CircularProgress)).toHaveLength(1);
  });

  it('App component must contains header app bar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });

  it('AppBar must have a default title', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar).prop('title')).toBe('Langton Ant');
  });

  it('AppBar must have a play buttone', () => {
    const {iconElementLeft} = shallow(<App />).find(AppBar).props();
    expect(iconElementLeft).toEqual(<IconButton><AvPlayArrow /></IconButton>);
  });

  it('AppBar s title can be defined', () => {
    const wrapper = shallow(<App title="Langon Ant : First generation" />);
    expect(wrapper.find(AppBar).prop('title')).toBe('Langon Ant : First generation');
  });
});