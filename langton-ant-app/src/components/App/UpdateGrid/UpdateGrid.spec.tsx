import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import * as renderer from 'react-test-renderer';
import { configure } from 'enzyme';
import Component from './UpdateGrid';
import { MuiThemeProvider } from 'material-ui/styles';

// tslint:disable-next-line:no-any
configure({ adapter: new Adapter() });

describe('Dialog: simple tests', () => {
    it('Render match snapshot ', () => {
        const click = () => { 
            // Do nothing 
        };
        // tslint:disable-next-line:max-line-length
        const component = renderer.create(<MuiThemeProvider><Component arrayLength={21} antX={11} antY={11} submitForm={click} /></MuiThemeProvider>).toJSON();
        expect(component).toMatchSnapshot();
      });
});