import '@testing-library/jest-dom';
import {
  render,
  screen,
} from '@testing-library/react';

import Container from '../Container';
 
describe('Container', () => {
  it('should render', () => {
    render(<Container />);

    // grab the element
    const element = screen.getByTestId('container');
 
    // make sure its in the document
    expect(element).toBeInTheDocument();
  });

  it('should render with children', () => {
    const paragraph = 'Oh hai!';

    const {
      getByText,
    } = render(
      <Container>
        <p>{paragraph}</p>
      </Container>
    );
 
    // make sure its in the document
    expect(getByText(paragraph)).toBeInTheDocument();
  });
});
