import * as React from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { isValidNumber } from './validationTools';

export interface UpdateGridBindingProps {}

export interface UpdateGridEventProps {
    submitForm: (length: number, x: number, y: number) => void;
}

export interface UpdateGridProps extends UpdateGridBindingProps, UpdateGridEventProps {
    handleClose: () => void;
}

const changeEventValue = (e: {}): number => Number((e as React.ChangeEvent<HTMLInputElement>).currentTarget.value);

export default class UpdateGrid extends React.Component<UpdateGridProps> {
    @isValidNumber(
        (n) => (n > 0 && Math.abs(n % 2) === 1),
        (n) => `${n} is not positive or odd`
    )
    private _lgth: number;

    @isValidNumber(
        (n) => (n > 0),
        (n) => `${n} is not positive`
    )
    private _x: number;

    @isValidNumber(
        (n) => (n > 0),
        (n) => `${n} is not positive`
    )
    private _y: number;

    private _lgthInput: TextField | null;
    private _xInput: TextField | null;
    private _yInput: TextField | null;

    private _canUpdate = false;

    constructor(props: UpdateGridProps) {
        super(props);
    }

    onChangeLength = (e: {}) => {
        let msgErr: string = '';
        try {
            this._lgth = changeEventValue(e);
        } catch (error) {
            msgErr = error.message;
        }
        if (this._lgthInput) {
            /* istanbul ignore next line */
            this._lgthInput.setState({ errorText: msgErr });
        }
        this._canUpdate = msgErr === '';
    }

    onChangeX = (e: {}) => {
        let msgErr: string = '';
        try {
            this._x = changeEventValue(e);
        } catch (error) {
            msgErr = error.message;
        }
        if (this._xInput) {
            /* istanbul ignore next */
            this._xInput.setState({ errorText: msgErr });
        }
        this._canUpdate = msgErr === '';
    }

    onChangeY = (e: {}) => {
        let msgErr: string = '';
        try {
            this._y = changeEventValue(e);
        } catch (error) {
            msgErr = error.message;
        }
        if (this._yInput) {
            /* istanbul ignore next */
            this._yInput.setState({ errorText: msgErr });
        }
        this._canUpdate = msgErr === '';
    }

    onSubmit = () => {
        if (this._canUpdate) {
            this.props.submitForm(this._lgth, this._x, this._y);
        }
    }

    render() {
        return (
            <>
                <TextField
                    ref={r => this._lgthInput = r}
                    defaultValue="21"
                    floatingLabelText="Grid Size (number)"
                    onChange={this.onChangeLength}
                    value={this._lgth}
                /><br /><TextField
                    ref={r => this._xInput = r}
                    defaultValue="10"
                    floatingLabelText="Ant X Position"
                    onChange={this.onChangeX}
                    value={this._x}
                /><br /><TextField
                    ref={r => this._yInput = r}
                    defaultValue="10"
                    floatingLabelText="Ant Y Position"
                    onChange={this.onChangeY}
                    value={this._y}
                /><br />
                <RaisedButton
                    label="Re-init Grid"
                    fullWidth={true}
                    onClick={this.onSubmit}
                />
            </>
        );
    }
}