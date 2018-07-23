
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

function loadStories() {
  const req = require.context('../src', true, /\.stories\.tsx$/)
  req.keys().forEach((filename) => req(filename))
}
addDecorator(withKnobs);

configure(loadStories, module);