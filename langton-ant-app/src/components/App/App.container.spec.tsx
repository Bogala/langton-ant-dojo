import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow, ShallowWrapper, mount, } from 'enzyme';

import configureStore from 'redux-mock-store';

import App from './';
import { Ant } from './Grid';
import { PLAY } from '../../store/actions';
import { AvPlayArrow, AvPause } from 'material-ui/svg-icons';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { Action } from 'redux';
import { AppBar } from 'material-ui';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

jest.useFakeTimers();

const mockStore = configureStore();
let container: ShallowWrapper;
const store = mockStore({
    grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
        .map(() => new Array<boolean>(21).fill(false)),
    ant: new Ant()
});
store.dispatch = jest.fn();

describe('App container', () => {
    test('renders without crashing', () => {
        container = shallow(<App />, { context: { store, router: {} } });
        expect(container.length).toEqual(1);
    });

    test('Should  play button launch timer that launch dispatch', async () => {
        // tslint:disable-next-line:no-any
        (store.dispatch as any).mockClear();
        
        const wrapper = 
            mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><App /></MemoryRouter></Provider>);
        await wrapper.find(AvPlayArrow).simulate('click');

        jest.runOnlyPendingTimers();
        expect(store.dispatch).toBeCalledWith({ type: PLAY } as Action);
    });

    test('Should  play button 2 times used 1 time', async () => {
        // tslint:disable-next-line:no-any
        (store.dispatch as any).mockClear();
        
        const wrapper = 
            mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><App /></MemoryRouter></Provider>);
        await wrapper.find(AvPlayArrow).simulate('click');

        jest.runOnlyPendingTimers();
        expect(store.dispatch).toBeCalledWith({ type: PLAY } as Action);

        await wrapper.find(AvPlayArrow).simulate('click');
        jest.runOnlyPendingTimers();
        expect(store.dispatch).toHaveBeenCalledTimes(2);
    });

    test('Pause button stop dispatchs', async () => {
        // tslint:disable-next-line:no-any
        (store.dispatch as any).mockClear();
        
        const wrapper = 
            mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><App /></MemoryRouter></Provider>);
        await wrapper.find(AvPlayArrow).simulate('click');

        jest.runOnlyPendingTimers();
        expect(store.dispatch).toHaveBeenCalled();

        await wrapper.find(AvPause).simulate('click');
        jest.runOnlyPendingTimers();
        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    test('stop stopped should not make exception', async () => {
        // tslint:disable-next-line:no-any
        (store.dispatch as any).mockClear();
        
        const wrapper = 
            mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><App /></MemoryRouter></Provider>);
        
        await wrapper.find(AvPause).simulate('click');
        jest.runOnlyPendingTimers();
        expect(store.dispatch).toHaveBeenCalledTimes(0);
    });

    test('Title adapted from count', async () => {
        let wrapper = 
            mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><App /></MemoryRouter></Provider>);
        
        expect(wrapper.find(AppBar).prop('title')).toBe('Langton Ant, not started');

        const storeWithCount5 = mockStore({
            grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
                .map(() => new Array<boolean>(21).fill(false)),
            ant: new Ant(),
            count: 5
        });

        wrapper = 
            mount(
                <Provider store={storeWithCount5}><MemoryRouter initialEntries={['/']}><App /></MemoryRouter></Provider>
            );

        expect(wrapper.find(AppBar).prop('title')).toBe('Langton Ant, movements count : 5');
    });
});