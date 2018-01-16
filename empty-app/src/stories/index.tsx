import * as React from 'react';

import { text, withKnobs } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';

// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

const Welcome = ({person}: {person: string}) => (
    <h1>Welcome {person}</h1>
);

const stories = storiesOf('Examples', module);
stories.addDecorator(withKnobs);
stories.add('Welcome', () => <Welcome person={text('person', 'cher développeur')} />);  
