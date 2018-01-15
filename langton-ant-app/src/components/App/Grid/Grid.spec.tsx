import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, mount } from 'enzyme';

import Grid from './';

const initiateCells = (width: number, height: number) => {
  return new Array<Array<boolean>>(height).fill(new Array<boolean>(width).fill(false));
};

const mountGrid = (width: number, height: number) => {
  const cells: boolean[][] = initiateCells(21, 21);
  return mount(<Grid cells={cells} />);
};

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

describe('Grid.tsx', () => {
  test('Must contains a table 21x21', () => {
    const wrapper = mountGrid(21, 21);
    expect(wrapper.find('tr').length).toBe(21);
    expect(wrapper.find('td').length).toBe(441);
  });

  test('Ant must be in the center', () => {
    const wrapper = mountGrid(21, 21);
    expect(wrapper.find('.ant').length).toBe(1);
    wrapper.find('tr').forEach((line, y) => {
      line.find('td').forEach((child, x) => {
        const expectedCount = (y === 10 && x === 10) ? 1 : 0;
        expect(child.find('.ant').length).toBe(expectedCount);
      });
    });
  });

});