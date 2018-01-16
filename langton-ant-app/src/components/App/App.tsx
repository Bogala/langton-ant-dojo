import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, IconButton, Card } from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Grid, { Ant } from './Grid';

export interface AppBindingProps {
  title?: string;
}
export interface AppEventProps { }
export interface AppProps extends AppBindingProps, AppEventProps { }

export interface AppState {
  cells: boolean[][];
  ant: Ant;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { 
      cells: new Array<Array<boolean>>(21).fill(new Array<boolean>(21).fill(false)), 
      ant: new Ant() 
    } as AppState;
  }

  onClick = () => {
    this.setState({ant: {...this.state.ant, rotation: this.state.ant.rotation + 90}});
  }

  render() {
    const { title } = this.props;
    const { cells, ant } = this.state;
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={title || 'Langton Ant'}
            iconElementLeft={<IconButton><AvPlayArrow onClick={this.onClick} /></IconButton>}
          />
          <div>
            <div className="stretch">
              <Card className="md-card">
                <Grid cells={cells} ant={ant} />
              </Card>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;