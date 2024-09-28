import '@testing-library/jest-dom';
import {
  render,
  screen,
} from '@testing-library/react';

import Hero from '../Hero';

describe('Hero', () => {
  it('should render', () => {
    render(<Hero />);

    // grab the element
    const { getByTestId } = screen;

    screen.debug();
 
    // make sure its in the document
    expect(getByTestId('hero')).toBeInTheDocument();
  });

  // TODO need to actually pass it an image
});
