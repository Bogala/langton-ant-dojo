import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import { configure, shallow, ShallowWrapper, mount, } from 'enzyme';

import configureStore from 'redux-mock-store';

import App from './';
import { Ant } from './Grid';
import { AvPlayArrow, AvPause } from 'material-ui/svg-icons';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { AppBar } from 'material-ui';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

const mockStore = configureStore();
let container: ShallowWrapper;
const store = mockStore({
    grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
        .map(() => new Array<boolean>(21).fill(false)),
    ant: new Ant(),
    counter: 2
});

jest.useFakeTimers();

describe('App container', () => {
    test('renders without crashing', () => {
        container = shallow(<App />, { context: { store, router: { } } });
        expect(container.length).toEqual(1);
    });

    describe('Autoplay', () => {
        test('Run starts twice when clicked', (done) => {
            store.dispatch = jest.fn();
            
            const wrapper = 
                mount(<Provider store={store}><MemoryRouter initialEntries={[ '/' ]}><App /></MemoryRouter></Provider>);
            wrapper.find(AvPlayArrow).simulate('click');
            jest.runOnlyPendingTimers();
            jest.runOnlyPendingTimers();
            expect(store.dispatch).toHaveBeenCalledTimes(2);
            done();
        });
        test('Run stops when clicking pause button', (done) => {
            store.dispatch = jest.fn();
            
            const wrapper = 
                mount(<Provider store={store}><MemoryRouter initialEntries={[ '/' ]}><App /></MemoryRouter></Provider>);
            wrapper.find(AvPlayArrow).simulate('click');

            jest.runOnlyPendingTimers();
            wrapper.find(AvPause).simulate('click');

            jest.runOnlyPendingTimers();
            expect(store.dispatch).toHaveBeenCalledTimes(1);
            done();
        });
    });
    describe('Bugs', () => {
        test('Ant pauses after one click even if play has been clicked multiple times', (done) => {
            store.dispatch = jest.fn();
            
            const wrapper = 
                mount(<Provider store={store}><MemoryRouter initialEntries={[ '/' ]}><App /></MemoryRouter></Provider>);
            wrapper.find(AvPlayArrow).simulate('click');
            wrapper.find(AvPlayArrow).simulate('click');
            wrapper.find(AvPause).simulate('click');
    
            jest.runOnlyPendingTimers();
            expect(store.dispatch).not.toHaveBeenCalled();
            done();
        });

    });

    describe('Mapping des props', () => {
        test('Mise a jour du titre quand on  play', () => {
            const wrapper = 
                mount(<Provider store={store}><MemoryRouter initialEntries={[ '/' ]}><App /></MemoryRouter></Provider>);
            
            const title = wrapper.find(AppBar).prop('title');
            expect(title).toBe('Langton, counter = 2');
        });
    });
});