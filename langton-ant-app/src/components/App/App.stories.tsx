import * as React from 'react';
import { storiesOf } from '@storybook/react';
//import { text } from '@storybook/addon-knobs';
import App from './App';
import './App.scss';

storiesOf('layout', module).add('App', () => (
    <App />
  )
);