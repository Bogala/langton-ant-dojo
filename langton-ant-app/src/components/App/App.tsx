import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, IconButton, Card } from 'material-ui';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import Grid, { Ant } from './Grid';
import * as _ from 'lodash';

export interface AppBindingProps {
  title?: string;
}
export interface AppEventProps { }
export interface AppProps extends AppBindingProps, AppEventProps { }

export interface AppState {
  cells: boolean[][];
  ant: Ant;
}

const newRotation = (rotation: number, right: boolean) => {
  let result = rotation + 90;
  if (right) {
    result += 180;
  }
  if (result >= 360) {
    result -= 360;
  }
  return result;
};

const moveByRotation = (rotation: number, right: boolean) => {
  const value = { x: 0, y: 0 };
  switch (rotation) {
    case 90:
      value.y++;
      break;
    case 180:
      value.x--;
      break;
    case 270:
      value.y--;
      break;
    default:
      value.x++;
      break;
  }
  if (right) {
    value.x = -value.x;
    value.y = -value.y;
  }
  return value;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      cells: new Array<Array<boolean>>(21).fill(new Array<boolean>(21).fill(false)),
      ant: new Ant()
    } as AppState;
  }

  onClick = () => {
    const { cells, ant } = this.state;
    const line = _.clone(cells[ant.y]);
    const movement = moveByRotation(ant.rotation, line[ant.x]);
    const rotation = newRotation(ant.rotation, line[ant.x]);
    line[ant.x] = !line[ant.x];
    cells[ant.y] = line;
    movement.x += ant.x;
    movement.y += ant.y;
    this.setState(
      {
        ant: { ...this.state.ant, rotation: rotation, x: movement.x, y: movement.y },
        cells: [...cells]
      }
    );
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