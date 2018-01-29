import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow, ShallowWrapper } from 'enzyme';

import configureStore from 'redux-mock-store';

import Grid from './';
import { Ant } from './';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

// tslint:disable-next-line:no-any
const Component = Grid as any;

const mockStore = configureStore();
let container: ShallowWrapper;
const store = mockStore({
    grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
        .map(() => new Array<boolean>(21).fill(false)),
    ant: new Ant()
});

describe('App container', () => {
    test('renders without crashing', () => {
        container = shallow(<Component />, { context: { store } });
        expect(container.length).toEqual(1);
    });

    test('Grid dispatched from redux to props', async () => {
        container = shallow(<Component />, { context: { store } });
        expect(container.prop('cells')).toEqual(new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
        .map(() => new Array<boolean>(21).fill(false)));
    });

    test('Ant dispatched from redux to props', async () => {
        container = shallow(<Component />, { context: { store } });
        expect(container.prop('ant')).toEqual(new Ant());
    });
});