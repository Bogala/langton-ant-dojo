import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow, ShallowWrapper } from 'enzyme';

import configureStore from 'redux-mock-store';

import UpdateGrid from './';
import { UpdateGridProps } from './UpdateGrid';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

const mockStore = configureStore();
let container: ShallowWrapper;
const store = mockStore({});

describe('App container', () => {
    test('renders without crashing', () => {
        container = shallow(<UpdateGrid />, { context: { store } });
        expect(container.length).toEqual(1);
    });

    test('Submit launch', async () => {
        store.dispatch = jest.fn();
        container = shallow(<UpdateGrid />, { context: { store } });
        (container.props() as UpdateGridProps).submitForm();
        expect(store.dispatch).toBeCalled();
    });
});