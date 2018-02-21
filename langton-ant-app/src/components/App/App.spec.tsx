import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow } from 'enzyme';
import { AppBar, IconButton } from 'material-ui';

import App from './App';
import { AvPause, AvPlayArrow } from 'material-ui/svg-icons';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

describe('[App]Step 2 : a grid and an ant', () => {
  test('App component must contains header app bar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });

  test('AppBar must have a default title', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar).prop('title')).toBe('Langton Ant');
  });

  test('AppBar must have a play button', () => {
    const clickPause = () => { return; };
    const clickPlay = () => { return; };
    const wrapper = shallow(<App onPlay={clickPlay} onPause={clickPause} />);
    const { iconElementLeft } = wrapper.find(AppBar).props();
    expect(iconElementLeft)
      // tslint:disable-next-line:max-line-length
      .toEqual(<><IconButton><AvPlayArrow onClick={clickPlay} /></IconButton><IconButton><AvPause onClick={clickPause} /></IconButton></>);
  });
  
  test('AppBar s title can be defined', () => {
    const wrapper = shallow(<App title="Langon Ant : First generation" />);
    expect(wrapper.find(AppBar).prop('title')).toBe('Langon Ant : First generation');
  });
});