import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, IconButton, Card, Dialog } from 'material-ui';
import Grid from './Grid';
import { Route, Switch } from 'react-router-dom';
import NotFound from './NotFound';
import { AvPause, AvPlayArrow, AvEqualizer } from 'material-ui/svg-icons';
import { AppProps } from './App';
import UpdateGrid from './UpdateGrid';

const customContentStyle = {
  width: '300px',
};
export interface AppBindingProps {
  title?: string;
}
export interface AppEventProps {
  onPlay?: () => void;
  onPause?: () => void;
}
export interface AppPkrops extends AppBindingProps, AppEventProps { }

interface AppState {
  isOpen: boolean;
}

export interface AppProps { 
  title?: string; 
  onMove?: () => void;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  }

  

  render() {
    const { title, onPause, onPlay } = this.props;
    const { isOpen } = this.state;
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={title || 'Langton Ant'}
            iconElementLeft={<IconButton><AvPlayArrow onClick={onMove} /></IconButton>}
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
          <Dialog
            title="Reset grid with parameters"
            modal={false}
            open={isOpen}
            onRequestClose={this.handleClose}
            contentStyle={customContentStyle}
          >
            <UpdateGrid handleClose={this.handleClose} />
          </Dialog>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;