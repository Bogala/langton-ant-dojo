import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, IconButton, Card } from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Grid from './Grid';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';

export interface AppBindingProps {
  title?: string;
}
export interface AppEventProps {
  onClick?: () => void;
}
export interface AppProps extends AppBindingProps, AppEventProps { }

const App = ({ title, onClick }: AppProps) => (
  <MuiThemeProvider>
    <div>
      <AppBar
        title={title || 'Langton Ant'}
        iconElementLeft={<IconButton><AvPlayArrow onClick={onClick} /></IconButton>}
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