import '@testing-library/jest-dom';
import {
  render,
  screen,
} from '@testing-library/react';

import Button from '../Button';
 
describe('Button', () => {
  it('should render', () => {
    render(<Button>Click me</Button>);

    // grab the element
    const element = screen.getByTestId('button');
 
    // make sure its in the document
    expect(element).toBeInTheDocument();
  });

  it('should render with children', () => {
    const {
      getByText,
    } = render(<Button>Click me</Button>);
 
    // make sure its in the document
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should render as a <a>', () => {
    const {
      getByTestId,
    } = render(
      <Button
        isLink
        href='/test'
      >Click me</Button>
    );
 
    // make sure its in the document
    expect(getByTestId('link')).toBeInTheDocument();
  });
});
