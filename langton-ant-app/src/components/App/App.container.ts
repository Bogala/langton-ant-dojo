import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { MainState } from '../../store/';
import App, { AppProps, AppBindingProps, AppEventProps } from './App';
import { Action } from 'redux';
import { PLAY } from '../../store/actions';

let refInterval: Array<NodeJS.Timer | number> = new Array();
const mapStateToProps: MapStateToProps<AppBindingProps, AppProps, MainState> = (state, props) => ({
    title: 'Langton, counter = ' + state.counter
});
const mapDispatchToProps: MapDispatchToProps<AppEventProps, AppProps> = (dispatch, ownProps) => ({
    onPlay: () => {
        refInterval.push(setInterval(dispatch, 50, { type: PLAY } as Action));
    },
    onPause: () => {
        refInterval.map((ref) => {
            clearInterval(ref as number);
        });
        refInterval.slice();
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);