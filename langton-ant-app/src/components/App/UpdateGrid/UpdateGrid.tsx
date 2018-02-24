import * as React from 'react';
import { RaisedButton, TextField } from 'material-ui';

export interface UpdateGridBindingProps {
    arrayLength: number;
    antX: number;
    antY: number;
}

export interface UpdateGridEventProps {
    submitForm: () => void;
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export interface UpdateGridProps extends UpdateGridBindingProps, UpdateGridEventProps { }

export default ({ arrayLength, antX, antY, submitForm, onChange }: UpdateGridProps) => (
    <>
        <TextField
            id="arrayLength"
            defaultValue={arrayLength}
            floatingLabelText="Grid Size (number)"
            onChange={onChange}
        /><br /><TextField
            id="antX"
            defaultValue={antX}
            floatingLabelText="Ant X Position"
            onChange={onChange}
        /><br /><TextField
            id="antY"
            defaultValue={antY}
            floatingLabelText="Ant Y Position"
            onChange={onChange}
        /><br />
        <RaisedButton label="Full width" fullWidth={true} onClick={submitForm} />
    </>
);