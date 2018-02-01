import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, IconButton, Card } from 'material-ui';
import Grid from './Grid';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import { AvPause, AvPlayArrow } from 'material-ui/svg-icons';

export interface AppBindingProps {
  title?: string;
}
export interface AppEventProps {
  onPlay?: () => void;
  onPause?: () => void;
}
export interface AppProps extends AppBindingProps, AppEventProps { }

const App = ({ title, onPlay, onPause }: AppProps) => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title={title || 'Langton Ant'}
        // tslint:disable-next-line:max-line-length
        iconElementLeft={<><IconButton><AvPause onClick={onPause} /></IconButton> <IconButton><AvPlayArrow onClick={onPlay} /></IconButton></>}
      />
      <div>
        <div className="stretch">
          <Card className="md-card">
            <Switch>
              <Route path="/" component={Grid} exact={true} />
              <Route component={NotFound} />
            </Switch>
          </Card>
        </div>
      </div>
    </div>
  </MuiThemeProvider>
);

export default App;