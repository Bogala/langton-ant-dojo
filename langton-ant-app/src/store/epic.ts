import { PLAY, PAUSED, PLAYED, REDIM } from './actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { ActionsObservable, combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Rx';
import { Action, Store } from 'redux';
import { MainState } from '.';

const CHOOSE = 'CHOOSE';

const isOnLimit = (state: MainState) => {
    const limitY = state.grid.length - 1;
    const limitX = state.grid[0].length - 1;
    return (state.ant.y === 0 || state.ant.y === limitY) || (state.ant.x === 0 || state.ant.x === limitX);
};

const play = (action$: ActionsObservable<Action>, store: Store<MainState>, { }) =>
    action$.ofType(PLAY)
        .switchMap(() =>
            Observable.interval(50)
                .takeUntil(action$.ofType(PAUSED))
                .mapTo({ type: CHOOSE })
        );

const chooseRedim = (action$: ActionsObservable<Action>, store: Store<MainState>, { }) =>
    action$.ofType(CHOOSE)
        .filter(() => isOnLimit(store.getState()))
        .mapTo({ type: REDIM });

const choosePlayed = (action$: ActionsObservable<Action>, store: Store<MainState>, { }) =>
    action$.ofType(CHOOSE)
        .mapTo({ type: PLAYED });

export default combineEpics(
    play,
    choosePlayed,
    chooseRedim
);