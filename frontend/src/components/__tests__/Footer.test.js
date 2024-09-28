import '@testing-library/jest-dom';
import {
  render,
  screen,
} from '@testing-library/react';

import Footer, { quickLinks } from '../Footer';
import { links } from '../Navigation';

describe('Footer', () => {
  it('should render', () => {
    render(<Footer />);

    // grab the element
    const { getByTestId } = screen;
 
    // make sure its in the document
    expect(getByTestId('footer')).toBeInTheDocument();
  });

  it('should render with correct content', () => {
    const {
      getByTestId,
    } = render(<Footer />);
 
    // make sure footer content is there
    expect(getByTestId('sitemap')).toBeInTheDocument();
    expect(getByTestId('google-map')).toBeInTheDocument();
    expect(getByTestId('quick-link')).toBeInTheDocument();
  });

  it('should render Sitemap links properly', () => {
    const {
      getByText,
    } = render(<Footer />);
 
    // make sure all the quick links match
    links.forEach((link) => {
      expect(getByText(link.name)).toBeInTheDocument();
    });
  });

  it('should render Quick Links properly', () => {
    const {
      getByText,
    } = render(<Footer />);
 
    // make sure all the quick links match
    quickLinks.forEach((link) => {
      expect(getByText(link.name)).toBeInTheDocument();
    });
  });
});
