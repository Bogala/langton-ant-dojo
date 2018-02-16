import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducer from './reducer';
import { compose } from 'recompose';
import epic from './epic';

// tslint:disable-next-line:no-any
const composeEnhancers =
    // tslint:disable-next-line:no-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware(epic, {
    dependencies: {  }
});

export const configureStore = () => (
    createStore(
        reducer,
        composeEnhancers(applyMiddleware(epicMiddleware))
    )
);

export {MainState, Ant} from './reducer';