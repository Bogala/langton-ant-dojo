import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { MainState } from '../../../store/';
import Grid, { GridBindingProps, GridEventProps, GridProps } from './Grid';

const mapStateToProps: MapStateToProps<GridBindingProps, GridProps, MainState> = (state, props) => ({
    ant: state.ant,
    cells: state.grid
});
const mapDispatchToProps: MapDispatchToProps<GridEventProps, GridProps> = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);