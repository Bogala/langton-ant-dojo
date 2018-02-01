import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { MainState } from '../../store/';
import App, { AppProps, AppEventProps, AppBindingProps } from './App';
import { PLAY } from '../../store/actions';
import { Action } from 'redux';

let handle: number | undefined;

const mapStateToProps: MapStateToProps<AppBindingProps, AppProps, MainState> = (state, props) => ({
    title: (state.count > 0) ? `Langton Ant, movements count : ${state.count}` : 'Langton Ant, not started'
});

const mapDispatchToProps: MapDispatchToProps<AppEventProps, AppProps> = (dispatch, ownProps) => ({
    onPlay: () => {
        if (!handle) {
            handle = setInterval(
                () => {
                    dispatch({ type: PLAY } as Action);
                },
                100);
        }
    },
    onPause: () => {
        if (handle) {
            clearInterval(handle);
            handle = undefined;
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);