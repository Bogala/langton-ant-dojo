import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { configure, shallow, mount, ReactWrapper } from 'enzyme';
import { AppBar, IconButton, Card } from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';

import App, { AppProps, AppState } from './App';
import Grid, { Ant } from './Grid';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

interface TestContext {
  wrapper: ReactWrapper<AppProps, AppState>;
  ant: Ant;
  cells: boolean[][];
}

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

describe('[App]Step 2 : a grid and an ant', () => {
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
    const wrapper = shallow(<App />);
    const { iconElementLeft } = wrapper.find(AppBar).props();
    expect(iconElementLeft)
      .toEqual(<IconButton><AvPlayArrow onClick={(wrapper.instance() as App).onClick} /></IconButton>);
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

describe('[App]Step 3: first rules and component state', () => {
  test('Cells definition must be in state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Grid).props().cells).toBe(wrapper.state().cells);
  });

  test('Cells must be initiated with 21x21xfalse', () => {
    const wrapper = shallow(<App />);
    const cells = new Array<Array<boolean>>(21).fill(new Array<boolean>(21).fill(false));
    expect(wrapper.state().cells).toEqual(cells);
  });

  test('Ant must be in state', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Grid).props().ant).toBeDefined();
    expect(wrapper.find(Grid).props().ant).toBe(wrapper.state().ant);
  });

  describe('[App]Step 3.1: First move', () => {

    test('Ant must rotate 90° when play button clicked', async () => {
      const { ant } = await initAndPlay();
      expect(ant.rotation).toBe(90);
    });

    test('Cell is grey when play button clicked', async () => {
      const { wrapper, ant, cells } = await initAndPlay();
      expect(cells[ant.y][ant.x - 1]).toBe(true);
      for (let line = 0; line < cells.length; line++) {
        for (let cell = 0; cell < cells[line].length; cell++) {
          if (line !== ant.y && cell !== ant.x - 1) {
            expect(wrapper.state().cells[line][cell]).toBe(false);
          }
        }
      }
    });

    test('Ant must move left when play button clicked', async () => {
      const { ant } = await initAndPlay();
      expect(ant.x).toBe(11);
      expect(ant.y).toBe(10);
    });
  });

  describe('[App]Step 3.2: Second move', () => {
    test('Ant must rotate 90° when play button clicked', async () => {
      const { ant } = await initAndPlay(2);
      expect(ant.rotation).toBe(180);
    });

    test('Cell is grey when play button clicked', async () => {
      const { wrapper, cells } = await initAndPlay(2);
      expect(cells[10][10]).toBe(true);
      expect(cells[10][11]).toBe(true);
      for (let line = 0; line < cells.length; line++) {
        for (let cell = 0; cell < cells[line].length; cell++) {
          if (line !== 10 && cell !== 11 && cell !== 10) {
            expect(wrapper.state().cells[line][cell]).toBe(false);
          }
        }
      }
    });

    test('Ant must move left when play button clicked', async () => {
      const { ant } = await initAndPlay(2);
      expect(ant.x).toBe(11);
      expect(ant.y).toBe(11);
    });
  });

  describe('[App]Step 3.3: Third move', () => {
    test('Ant must rotate 90° when play button clicked', async () => {
      const { ant } = await initAndPlay(3);
      expect(ant.rotation).toBe(270);
    });

    test('Cell is grey when play button clicked', async () => {
      const { wrapper, cells } = await initAndPlay(3);
      expect(cells[10][10]).toBe(true);
      expect(cells[10][11]).toBe(true);
      expect(cells[11][11]).toBe(true);
      for (let line = 0; line < cells.length; line++) {
        for (let cell = 0; cell < cells[line].length; cell++) {
          if (line !== 10 && cell !== 11 && cell !== 10) {
            expect(wrapper.state().cells[line][cell]).toBe(false);
          }
        }
      }
    });

    test('Ant must move left when play button clicked', async () => {
      const { ant } = await initAndPlay(3);
      expect(ant.x).toBe(10);
      expect(ant.y).toBe(11);
    });
  });

  describe('[App]Step 3.4: Fourth move', () => {
    test('Ant must rotate 90° when play button clicked', async () => {
      const { ant } = await initAndPlay(4);
      expect(ant.rotation).toBe(0);
    });

    test('Cell is grey when play button clicked', async () => {
      const { wrapper, cells } = await initAndPlay(4);
      expect(cells[10][10]).toBe(true);
      expect(cells[10][11]).toBe(true);
      expect(cells[11][11]).toBe(true);
      expect(cells[11][10]).toBe(true);
      for (let line = 0; line < cells.length; line++) {
        for (let cell = 0; cell < cells[line].length; cell++) {
          if (line !== 10 && line !== 11 && cell !== 10 && cell !== 11) {
            expect(wrapper.state().cells[line][cell]).toBe(false);
          }
        }
      }
    });

    test('Ant must move left when play button clicked', async () => {
      const { ant } = await initAndPlay(4);
      expect(ant.x).toBe(10);
      expect(ant.y).toBe(10);
    });
  });

  describe('[App]Step 3.5: Fifth move', () => {
    test('Ant must rotate 90° when play button clicked', async () => {
      const { ant } = await initAndPlay(5);
      expect(ant.rotation).toBe(270);
    });

    test('Cell is grey when play button clicked', async () => {
      const { cells } = await initAndPlay(5);
      expect(cells[10][10]).toBe(false);
      expect(cells[10][11]).toBe(true);
      expect(cells[11][11]).toBe(true);
      expect(cells[11][10]).toBe(true);
    });

    test('Ant must move left when play button clicked', async () => {
      const { ant } = await initAndPlay(5);
      expect(ant.x).toBe(9);
      expect(ant.y).toBe(10);
    });
  });

  describe('[App]Step 3.10: Tenth move', () => {
    test('Ant must rotate 90° when play button clicked', async () => {
      const { ant } = await initAndPlay(10);
      expect(ant.rotation).toBe(180);
    });

    test('Cell is grey when play button clicked', async () => {
      const { cells } = await initAndPlay(10);
      expect(cells[9][9]).toBe(true);
      expect(cells[9][10]).toBe(true);
      expect(cells[9][11]).toBe(false);
      expect(cells[10][9]).toBe(false);
      expect(cells[10][10]).toBe(true);
      expect(cells[10][11]).toBe(true);
      expect(cells[11][9]).toBe(false);
      expect(cells[11][10]).toBe(true);
      expect(cells[11][11]).toBe(true);
    });

    test('Ant must move left when play button clicked', async () => {
      const { ant } = await initAndPlay(10);
      expect(ant.x).toBe(9);
      expect(ant.y).toBe(11);
    });
  });
});