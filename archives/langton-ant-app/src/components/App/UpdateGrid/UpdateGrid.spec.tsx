import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

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

        const close = jest.fn();
        // tslint:disable-next-line:max-line-length
        const component = mount(<MuiThemeProvider><Component submitForm={click} handleClose={close} /></MuiThemeProvider>);
        expect(component.find(TextField)).toHaveLength(3);
        expect(component.find(RaisedButton)).toHaveLength(1);
    });

    test('ChangeEvent update values sended to submitForm', async () => {
        const click = jest.fn();
        const close = jest.fn();

        const form = new Component({ submitForm: click, handleClose: close });
        form.onChangeLength({ currentTarget: { value: '91' } });
        form.onChangeX({ currentTarget: { value: '60' } });
        form.onChangeY({ currentTarget: { value: '30' } });
        form.onSubmit();

        expect(click).toBeCalledWith(91, 60, 30);
    });

    test('Errors not send data', async () => {
        const click = jest.fn();
        const close = jest.fn();

        const form = new Component({ submitForm: click, handleClose: close });
        form.onChangeLength({ currentTarget: { value: '90' } });
        form.onChangeX({ currentTarget: { value: '-60' } });
        form.onChangeY({ currentTarget: { value: '-30' } });
        form.onSubmit();

        expect(click).not.toBeCalledWith();
    });

    test('Manual render', async () => {
        const click = jest.fn();
        const close = jest.fn();

        const form = new Component({ submitForm: click, handleClose: close });
        form.onChangeLength({ currentTarget: { value: '90' } });
        form.onChangeX({ currentTarget: { value: '-60' } });
        form.onChangeY({ currentTarget: { value: '-30' } });
        form.onSubmit();

        expect(click).not.toBeCalledWith();
    });

    test('Not odd value for length cancel dispatch', async () => {
        const click = jest.fn();
        const close = jest.fn();
        // tslint:disable-next-line:max-line-length
        const component = mount(<MuiThemeProvider><Component submitForm={click} handleClose={close} /></MuiThemeProvider>);
        await component.find(TextField).at(0).simulate('change', 90);
        await component.find(RaisedButton).at(0).simulate('click');
        expect(click).not.toBeCalled();
        expect(component.find(TextField).at(0).prop('errorText')).not.toBe('');
    });
    
    test('negative value for x cancel dispatch', async () => {
        const click = jest.fn();
        const close = jest.fn();
        // tslint:disable-next-line:max-line-length
        const component = mount(<MuiThemeProvider><Component submitForm={click} handleClose={close} /></MuiThemeProvider>);
        await component.find(TextField).at(1).simulate('change', -1);
        await component.find(RaisedButton).at(0).simulate('click');
        expect(click).not.toBeCalled();
        expect(component.find(TextField).at(1).prop('errorText')).not.toBe('');
    });

    test('negative value for x cancel dispatch', async () => {
        const click = jest.fn();
        const close = jest.fn();
        // tslint:disable-next-line:max-line-length
        const component = mount(<MuiThemeProvider><Component submitForm={click} handleClose={close} /></MuiThemeProvider>);
        await component.find(TextField).at(2).simulate('change', -1);
        await component.find(RaisedButton).at(0).simulate('click');
        expect(click).not.toBeCalled();
        expect(component.find(TextField).at(2).prop('errorText')).not.toBe('');
    });

    test('Not odd value for length cancel dispatch', async () => {
        const click = jest.fn();
        const close = jest.fn();
        // tslint:disable-next-line:max-line-length
        const component = mount(<MuiThemeProvider><Component submitForm={click} handleClose={close} /></MuiThemeProvider>);
        await component.find(TextField).at(0).simulate('change', 21);
        await component.find(TextField).at(1).simulate('change', 10);
        await component.find(TextField).at(2).simulate('change', 10);
        await component.find(RaisedButton).at(0).simulate('click');
        // expect(click).toBeCalled();
        expect(component.find(TextField).at(0).prop('errorText')).not.toBeDefined();
        expect(component.find(TextField).at(1).prop('errorText')).not.toBeDefined();
        expect(component.find(TextField).at(2).prop('errorText')).not.toBeDefined();
    });
});