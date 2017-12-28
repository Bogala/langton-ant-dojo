import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CircularProgress } from 'material-ui';

export interface AppBindingProps {}
export interface AppEventProps {}
export interface AppProps extends AppBindingProps, AppEventProps {}

export default (props: AppProps) => (
  <MuiThemeProvider>
    <div className="center">
      <CircularProgress size={180} thickness={5} />
    </div>
  </MuiThemeProvider>
);