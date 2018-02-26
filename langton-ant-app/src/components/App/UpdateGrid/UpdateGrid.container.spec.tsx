import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow, ShallowWrapper } from 'enzyme';

import configureStore from 'redux-mock-store';

import UpdateGrid from './';
import { UpdateGridProps } from './UpdateGrid';
import { Ant } from '../Grid';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

const mockStore = configureStore();
let container: ShallowWrapper;
const store = mockStore({
    grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
        .map(() => new Array<boolean>(21).fill(false)),
    ant: new Ant(),
    gridLength: 21
});

describe('App container', () => {
    test('renders without crashing', () => {
        const close = jest.fn();
        container = shallow(<UpdateGrid handleClose={close} />, { context: { store } });
        expect(container.length).toEqual(1);
    });

    test('Submit launch', async () => {
        const close = jest.fn();
        store.dispatch = jest.fn();
        container = shallow(<UpdateGrid handleClose={close} />, { context: { store } });
        (container.props() as UpdateGridProps).submitForm(0, 0, 0);
        expect(store.dispatch).toBeCalled();
    });
});