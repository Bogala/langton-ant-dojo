import { PLAY, PAUSED, PLAYED } from './actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Rx';
import { Action } from 'redux';

export default (action$: ActionsObservable<Action>) => 
    action$.ofType(PLAY)
        .switchMap(() =>
            Observable.interval(50)
            .takeUntil(action$.ofType(PAUSED))
            .mapTo({ type: PLAYED })
        );