import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { MainState } from '../../store/';
import App, { AppProps, AppBindingProps, AppEventProps } from './App';
import { Action } from 'redux';
import { PLAY } from '../../store/actions';

const mapStateToProps: MapStateToProps<AppBindingProps, AppProps, MainState> = (state, props) => ({});
const mapDispatchToProps: MapDispatchToProps<AppEventProps, AppProps> = (dispatch, ownProps) => ({
    onClick: () => {
        dispatch({ type: PLAY} as Action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);