import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, mount } from 'enzyme';
import Grid, { Ant } from './';

const initiateCells = (width: number, height: number) => {
  return new Array<Array<boolean>>(height).fill(new Array<boolean>(width).fill(false)); 
};

const mountGrid = (width: number = 21, height: number = 21) => {
  const cells: boolean[][] = initiateCells(width, height);
  return mount(<Grid cells={cells} />);
};

const mountGridWithAnt = (width: number = 21, height: number = 21, ant: Ant = new Ant()) => {
  const cells: boolean[][] = initiateCells(width, height);
  return mount(<Grid cells={cells} ant={ant} />);
};

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

describe('[Grid]Step 2 : a grid and an ant', () => {
  test('Must contains a table 21x21', () => {
    const wrapper = mountGrid();
    expect(wrapper.find('tr').length).toBe(21);
    expect(wrapper.find('td').length).toBe(441);
  });
});

describe('[Grid]Step 3: first rules and component state', () => {
  test('Ant must be defined in props', () => {
    const wrapper = mountGridWithAnt(21, 21, new Ant(11, 9));
    expect(wrapper.find('.ant').length).toBe(1);
    wrapper.find('tr').forEach((line, y) => {
      line.find('td').forEach((child, x) => {
        const expectedCount = (y === 9 && x === 11) ? 1 : 0;
        expect(child.find('.ant').length).toBe(expectedCount);
      });
    });
  });

  test('No ant if not defined in props', () => {
    const wrapper = mountGrid();
    expect(wrapper.find('.ant').length).toBe(0);
  });

  test('true cell must be grey', () => {
    const cells: boolean[][] = initiateCells(21, 21);
    cells[9] = new Array<boolean>(21).fill(false);
    cells[9][8] = true;
    const wrapper = mount(<Grid cells={cells} />);

    expect(wrapper.find('.contentalt').length).toBe(1);
    wrapper.find('tr').forEach((line, y) => {
      line.find('td').forEach((child, x) => {
        const expectedCount = (cells[y][x]) ? 1 : 0;
        expect(child.find('.contentalt').length).toBe(expectedCount);
      });
    });
  });

  test('Ant must be rotated as defined in props', () => {
    const wrapper = mountGridWithAnt(21, 21, new Ant(11, 9, 90));
    expect(wrapper.find('.ant').length).toBe(0);
    expect(wrapper.find('.ant90').length).toBe(1);
    wrapper.find('tr').forEach((line, y) => {
      line.find('td').forEach((child, x) => {
        const expectedCount = (y === 9 && x === 11) ? 1 : 0;
        expect(child.find('.ant90').length).toBe(expectedCount);
      });
    });
  });
});