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
  onPause?: () => void;
  onPlay?: () => void;
}
export interface AppProps extends AppBindingProps, AppEventProps { }

const App = ({ title, onPause, onPlay }: AppProps) => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title={title || 'Langton Ant'}
        iconElementLeft={<>
          <IconButton><AvPlayArrow onClick={onPlay} /></IconButton>
          <IconButton><AvPause onClick={onPause} /></IconButton>
        </>}
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