import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow, ShallowWrapper } from 'enzyme';

import configureStore from 'redux-mock-store';

import App from './';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

const mockStore = configureStore();
let container: ShallowWrapper;

describe('App container', () => {
    beforeEach(() => {
        const store = mockStore({});
        container = shallow(<App />, { context: { store } });
    });

    test('renders without crashing', () => {
        expect(container.length).toEqual(1);
    });
});