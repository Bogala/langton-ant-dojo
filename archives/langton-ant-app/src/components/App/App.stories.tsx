import * as React from 'react';
import { storiesOf } from '@storybook/react';
import './App.scss';
import Grid from './Grid';

const cells: boolean[][] = new Array<Array<boolean>>();

for (let i = 0; i < 21; i++) {
  const line = new Array<boolean>();
  for (let j = 0; j < 21; j++) {
    line.push(false);
  }
  cells.push(line);
}

storiesOf('layout', module).add('Grid', () => (
  <Grid cells={cells} />
)
);