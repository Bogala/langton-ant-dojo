import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { MainState } from '../../store/';
import App, { AppProps, AppBindingProps, AppEventProps } from './App';

const mapStateToProps: MapStateToProps<AppBindingProps, AppProps, MainState> = (state, props) => ({});
const mapDispatchToProps: MapDispatchToProps<AppEventProps, AppProps> = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);