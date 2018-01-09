import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, mount } from 'enzyme';

import Grid from './';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

describe('Grid.tsx', () => {
  it('renders without crashing', () => {
    
    const cells: boolean[][] = new Array<Array<boolean>>();

    for (let i = 0; i < 21; i++) {
      const line = new Array<boolean>();
      for (let j = 0; j < 21; j++) {
        line.push(false);
      }
      cells.push(line);
    }

    const wrapper = mount(<Grid cells={cells} />);
    expect(wrapper.find('tr').length).toBe(21);
    expect(wrapper.find('td').length).toBe(441);
  });
});