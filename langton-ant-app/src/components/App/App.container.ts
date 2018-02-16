import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { MainState } from '../../store/';
import App, { AppProps, AppEventProps, AppBindingProps } from './App';
import { PLAY, PAUSED } from '../../store/actions';
import { Action } from 'redux';

const mapStateToProps: MapStateToProps<AppBindingProps, AppProps, MainState> = (state, props) => ({
    title: (state.count > 0) ? `Langton Ant, movements count : ${state.count}` : 'Langton Ant, not started'
});

const mapDispatchToProps: MapDispatchToProps<AppEventProps, AppProps> = (dispatch, ownProps) => ({
    onPlay: () => {
        dispatch({ type: PLAY } as Action);
    },
    onPause: () => {
        dispatch({ type: PAUSED } as Action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);