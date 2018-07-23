import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { MainState } from '../../../store/';
import Grid, { GridBindingProps, GridEventProps, GridProps } from './Grid';
import { compose } from 'recompose';

const mapStateToProps: MapStateToProps<GridBindingProps, GridProps, MainState> = (state, props) => ({
    ant: state.ant,
    cells: state.grid
});
const mapDispatchToProps: MapDispatchToProps<GridEventProps, GridProps> = (dispatch, ownProps) => ({});

const enhance = compose<GridProps, GridProps>(connect(mapStateToProps, mapDispatchToProps));

const GridEnhanced = enhance(Grid);

export default GridEnhanced;