import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import * as renderer from 'react-test-renderer';
import { configure, mount } from 'enzyme';
import Component from './UpdateGrid';
import { MuiThemeProvider } from 'material-ui/styles';
import { TextField, RaisedButton } from 'material-ui';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

describe('Dialog: simple tests', () => {
    test('Render match snapshot ', () => {
        const click = () => {
            // Do nothing 
        };
        // tslint:disable-next-line:max-line-length
        const component = renderer.create(<MuiThemeProvider><Component arrayLength={21} antX={11} antY={11} submitForm={click} /></MuiThemeProvider>).toJSON();
        expect(component).toMatchSnapshot();
    });

    test('ChangeEvent update values sended to submitForm', async () => {
        const click = jest.fn();

        const form = new Component({arrayLength: 21, antX: 10, antY: 10, submitForm: click});
        form.onChangeLength({ currentTarget: { value: '90'}});
        form.onChangeX({ currentTarget: { value: '60'}});
        form.onChangeY({ currentTarget: { value: '30'}});
        form.onSubmit();
        
        expect(click).toBeCalledWith(90, 60, 30);
    });
});