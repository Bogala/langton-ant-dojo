
import { createStore } from 'redux';
import reducer from './reducer';

export const configureStore = () => (
    createStore(
        reducer,
        // tslint:disable-next-line:no-any
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export {MainState} from './reducer';