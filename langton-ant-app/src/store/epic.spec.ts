import { ActionsObservable } from 'redux-observable';
import 'rxjs/Rx';
import { PLAY, PLAYED } from './actions';
import epic from './epic';

describe('Epic', () => {
    test('Dispatch played when launched', (done) => {
        const action$ = ActionsObservable.of({ type: PLAY });
        const expectedOutputActions = { type: PLAYED };

        epic(action$).subscribe(actionReceived => {
            expect(actionReceived.type).toBe(expectedOutputActions.type);
            done();
        });
    });
});