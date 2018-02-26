import { MapStateToProps, MapDispatchToProps, connect } from 'react-redux';
import { MainState } from '../../../store/';
import { compose } from 'recompose';
import UpdateGrid, { UpdateGridProps, UpdateGridEventProps, UpdateGridBindingProps } from './UpdateGrid';
import { RELOAD } from '../../../store/actions';

export interface UpdateGridContainerProps { 
    handleClose: () => void;
}

const mapStateToProps: MapStateToProps<UpdateGridBindingProps, UpdateGridProps, MainState> = (state, props) => ({
    arrayLength: state.gridLength ,
    antX: state.ant.x,
    antY: state.ant.y
});
// tslint:disable-next-line:max-line-length
const mapDispatchToProps: MapDispatchToProps<UpdateGridEventProps, UpdateGridProps> = (dispatch, props) => ({
    submitForm: (length: number, x: number, y: number) => {
        dispatch({ 
            type: RELOAD,
            payload: {
                newLength: length,
                newAntX: x,
                newAntY: y
            } 
        });
        props.handleClose();
    }
});

const enhance = compose<UpdateGridProps, UpdateGridContainerProps>(connect(mapStateToProps, mapDispatchToProps));

const UpdateGridEnhanced = enhance(UpdateGrid);

export default UpdateGridEnhanced;