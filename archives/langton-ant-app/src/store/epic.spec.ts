import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { createEpicMiddleware } from 'redux-observable';

import configureStore, { MockStore } from 'redux-mock-store';
import 'rxjs/Rx';
import { PLAY, PLAYED, PAUSED, REDIM } from './actions';
import epic from './epic';
import { Ant } from '.';

configure({ adapter: new Adapter() });

jest.useFakeTimers();

const epicMiddleware = createEpicMiddleware(epic);
const mockStore = configureStore([epicMiddleware]);

let store: MockStore<{}>;

const resetStoreWithAnt = (ant: Ant = new Ant()) => {
    store = mockStore({
        grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
            .map(() => new Array<boolean>(21).fill(false)),
        ant: ant
    });
};

describe('Epic', () => {
    afterEach(() => {
        epicMiddleware.replaceEpic(epic);
        jest.clearAllTimers();
    });

    test('Dispatch played when launched', () => {
        resetStoreWithAnt();
        store.dispatch({ type: PLAY });
        jest.runOnlyPendingTimers();
        expect(store.getActions()).toEqual([
            { type: PLAY },
            { type: 'CHOOSE' },
            { type: PLAYED }
        ]);
    });

    test('Dispatch cancelled when paused', () => {
        resetStoreWithAnt();
        store.dispatch({ type: PLAY });
        store.dispatch({ type: PAUSED });
        jest.runOnlyPendingTimers();
        expect(store.getActions()).toEqual([
            { type: PLAY },
            { type: PAUSED }
        ]);
    });

    test('Redim grid when border top', () => {
        resetStoreWithAnt({ x: 11, y: 20, rotation: 0 } as Ant);
        store.dispatch({ type: PLAY });
        jest.runOnlyPendingTimers();
        expect(store.getActions().slice(0, 4)).toEqual([
            { type: PLAY },
            { type: 'CHOOSE' },
            { type: PLAYED },
            { type: REDIM }
        ]);
    });

    test('Redim grid when border down', () => {
        resetStoreWithAnt({ x: 11, y: 0, rotation: 0 } as Ant);
        store.dispatch({ type: PLAY });
        jest.runOnlyPendingTimers();
        expect(store.getActions().slice(0, 4)).toEqual([
            { type: PLAY },
            { type: 'CHOOSE' },
            { type: PLAYED },
            { type: REDIM }
        ]);
    });

    test('Redim grid when border left', () => {
        resetStoreWithAnt({ x: 0, y: 11, rotation: 0 } as Ant);
        store.dispatch({ type: PLAY });
        jest.runOnlyPendingTimers();
        expect(store.getActions().slice(0, 4)).toEqual([
            { type: PLAY },
            { type: 'CHOOSE' },
            { type: PLAYED },
            { type: REDIM }
        ]);
    });

    test('Redim grid when border right', () => {
        resetStoreWithAnt({ x: 20, y: 11, rotation: 0 } as Ant);
        store.dispatch({ type: PLAY });
        jest.runOnlyPendingTimers();
        expect(store.getActions().slice(0, 4)).toEqual([
            { type: PLAY },
            { type: 'CHOOSE' },
            { type: PLAYED },
            { type: REDIM }
        ]);
    });
});