import * as React from 'react';
import { RaisedButton, TextField } from 'material-ui';

export interface UpdateGridBindingProps {
    arrayLength: number;
    antX: number;
    antY: number;
}

export interface UpdateGridEventProps {
    submitForm: (length: number, x: number, y: number) => void;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export interface UpdateGridProps extends UpdateGridBindingProps, UpdateGridEventProps { }

const changeEventValue = (e: {}): number => Number((e as React.ChangeEvent<HTMLInputElement>).currentTarget.value);

export default class UpdateGrid extends React.Component<UpdateGridProps> {
    private _lgth:  number;
    private _x:  number;
    private _y:  number;

    constructor(props: UpdateGridProps) {
        super(props);
    }

    onChangeLength = (e: {}) => {
        // this._lgth 
        this._lgth = changeEventValue(e);
    }

    onChangeX = (e: {}) => {
        this._x = changeEventValue(e);
    }

    onChangeY = (e: {}) => {
        this._y = changeEventValue(e);
    }

    onSubmit = () => {
        this.props.submitForm(this._lgth, this._x, this._y);
    }

    render() {
        const { arrayLength, antX, antY } = this.props;
        return (
            <>
            <TextField
                id="arrayLength"
                defaultValue={arrayLength}
                floatingLabelText="Grid Size (number)"
                onChange={this.onChangeLength}
                value={this._lgth}
            /><br /><TextField
                id="antX"
                defaultValue={antX}
                floatingLabelText="Ant X Position"
                onChange={this.onChangeX}
                value={this._x}
            /><br /><TextField
                id="antY"
                defaultValue={antY}
                floatingLabelText="Ant Y Position"
                onChange={this.onChangeY}
                value={this._y}
            /><br />
            <RaisedButton label="Full width" fullWidth={true} onClick={this.onSubmit} />
        </>
        );
    }
}