import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { MainState } from '../../../store/';
import { compose } from 'recompose';
import UpdateGrid, { UpdateGridProps } from './UpdateGrid';
import { RELOAD } from '../../../store/actions';

interface UpdateGridMapStateToProps {
    arrayLength: number;
    antX: number;
    antY: number;
}

interface UpdateGridMapDispatchToProps {
    submitForm: () => void;
}

interface UpdateGridContainerProps {
}

const mapStateToProps: MapStateToProps<UpdateGridMapStateToProps, UpdateGridProps, MainState> = (state, props) => ({
    arrayLength: state.gridLength ,
    antX: state.ant.x,
    antY: state.ant.y
});
// tslint:disable-next-line:max-line-length
const mapDispatchToProps: MapDispatchToProps<UpdateGridMapDispatchToProps, UpdateGridProps> = (dispatch, props) => ({
    submitForm: () => {
        dispatch({ type: RELOAD });
    }
});

const enhance = compose<UpdateGridProps, UpdateGridContainerProps>(connect(mapStateToProps, mapDispatchToProps));

const UpdateGridEnhanced = enhance(UpdateGrid);

export default UpdateGridEnhanced;