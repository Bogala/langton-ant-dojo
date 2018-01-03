import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { CircularProgress, AppBar, IconButton } from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';

export interface AppBindingProps { 
  title?: string;
}
export interface AppEventProps { }
export interface AppProps extends AppBindingProps, AppEventProps { }

export default ({title}: AppProps) => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title={title || 'Langton Ant'}
        iconElementLeft={<IconButton><AvPlayArrow /></IconButton>}
      />
      <div className="center">
        <CircularProgress size={180} thickness={5} />
      </div>
    </div>
  </MuiThemeProvider>
);