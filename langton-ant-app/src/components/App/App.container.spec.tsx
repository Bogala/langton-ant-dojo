import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow, ShallowWrapper, mount } from 'enzyme';

import configureStore from 'redux-mock-store';

import App from './';
import { Ant } from './Grid';
import { PLAY } from '../../store/actions';
import { Action } from 'redux';
import { AvPlayArrow } from 'material-ui/svg-icons';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

const mockStore = configureStore();
let container: ShallowWrapper;
const store = mockStore({
    grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
        .map(() => new Array<boolean>(21).fill(false)),
    ant: new Ant()
});

describe('App container', () => {
    test('renders without crashing', () => {
        container = shallow(<App />, { context: { store } });
        expect(container.length).toEqual(1);
    });

    test('map Dispatch to onClic prop', async () => {
        store.dispatch = jest.fn();
        const wrapper = mount(<App />, { context: { store } });
        await wrapper.find(AvPlayArrow).simulate('click');
        expect(store.dispatch).toBeCalledWith({ type: PLAY} as Action);
    });
});