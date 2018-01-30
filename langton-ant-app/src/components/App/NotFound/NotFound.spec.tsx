import * as React from 'react';
import * as renderer from 'react-test-renderer';
import NotFound from './';

describe('footer', () => {

  it('Render match snapshot ', () => {
    const component = renderer.create(<NotFound />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
