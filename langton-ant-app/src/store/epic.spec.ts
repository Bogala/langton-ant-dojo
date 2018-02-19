import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';
import { createEpicMiddleware } from 'redux-observable';

import configureStore, { MockStore } from 'redux-mock-store';
import 'rxjs/Rx';
import { PLAY, PLAYED, PAUSED } from './actions';
import epic from './epic';
import { Ant } from '.';

configure({ adapter: new Adapter() });

jest.useFakeTimers();

const epicMiddleware = createEpicMiddleware(epic);
const mockStore = configureStore([epicMiddleware]);

let store: MockStore<{}>;

describe('Epic', () => {
    beforeEach(() => {
        store = mockStore({
            grid: new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
                .map(() => new Array<boolean>(21).fill(false)),
            ant: new Ant()
        });
    });

    afterEach(() => {
        epicMiddleware.replaceEpic(epic);
      });

    test('Dispatch played when launched', () => {
        store.dispatch({ type: PLAY });
        jest.runOnlyPendingTimers();
        expect(store.getActions()).toEqual([
            { type: PLAY },
            { type: PLAYED }
          ]);
    });

    test('Dispatch cancelled when paused', () => {
        store.dispatch({ type: PLAY });
        jest.runOnlyPendingTimers();
        store.dispatch({ type: PAUSED });
        jest.runOnlyPendingTimers();
        expect(store.getActions()).toEqual([
            { type: PLAY },
            { type: PLAYED },
            { type: PLAYED },
            { type: PAUSED }
          ]);
    });
});