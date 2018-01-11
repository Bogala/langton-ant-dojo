import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, IconButton, Card } from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Grid from './Grid';

export interface AppBindingProps {
  title?: string;
}
export interface AppEventProps { }
export interface AppProps extends AppBindingProps, AppEventProps { }

export default ({ title }: AppProps) => {
  const cells: boolean[][] = new Array<Array<boolean>>(21).fill(new Array<boolean>(21).fill(false));

  return (
    <MuiThemeProvider>
      <div>
        <AppBar
          title={title || 'Langton Ant'}
          iconElementLeft={<IconButton><AvPlayArrow /></IconButton>}
        />
        <div>
          <div className="stretch">
            <Card className="md-card">
              <Grid cells={cells} />
            </Card>
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  );
};