import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow } from 'enzyme';
import { AppBar, IconButton } from 'material-ui';

import App from './App';
import { AvPause, AvPlayArrow } from 'material-ui/svg-icons';
import UpdateGrid from './UpdateGrid';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

describe('[App]Step 2 : a grid and an ant', () => {
  test('App component must contains header app bar', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });

  test('App component must contains UpdateGrid', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(UpdateGrid)).toHaveLength(1);
  });

  test('App handles must call setState', async () => {
    const app = new App({});
    app.setState = jest.fn();
    app.handleClickOpen();
    expect(app.setState).toBeCalledWith({ isOpen: true });
    app.handleClose();
    expect(app.setState).toBeCalledWith({ isOpen: false });
  });

  test('AppBar must have a default title', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar).prop('title')).toBe('Langton Ant');
  });

  test('AppBar must have a play button', () => {
    const click = () => { return; };
    const wrapper = shallow(<App onPlay={click} onPause={click} />);
    const { iconElementLeft } = wrapper.find(AppBar).props();
    expect(iconElementLeft)
      .toEqual(<IconButton><AvPlayArrow onClick={click} /></IconButton>);
  });

  test('AppBar must have a settings buttone', () => {
    const click = () => { return; };
    const wrapper = shallow(<App onPlay={click} onPause={click} />);
    const { iconElementRight } = wrapper.find(AppBar).props();
    expect(iconElementRight).toBeDefined();
  });

  test('AppBar s title can be defined', () => {
    const wrapper = shallow(<App title="Langon Ant : First generation" />);
    expect(wrapper.find(AppBar).prop('title')).toBe('Langon Ant : First generation');
  });
});