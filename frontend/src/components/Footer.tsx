// import Link from 'next/link';
import GoogleMap from './GoogleMap';
import Container from './Container';
import { links } from './Navigation';
import FaceBookButton from './FaceBookButton';

import styles from './footer.module.scss';

export const quickLinks = [
  {
    href: 'http://shadygladeresort.com/',
    name: 'Shady Glade Resort',
  },
  {
    href: 'https://www.moonglowlodge.com/',
    name: 'Moonglow Lodge',
  },
  {
    href: 'https://www.hodgepodgecottages.com/',
    name: 'HodgePodge Cottages',
  },
  {
    href: 'https://riverbendoutfitters.com/',
    name: 'Riverbend Outfitters',
  },
  {
    href: 'https://carriagehousejefferson.com/',
    name: 'Carriage House Bed and Breakfast',
  },
];

export default function Footer() {
  return (
    <footer data-testid='footer'>
      <Container borderTop>
        <div className={styles.grid}>
          <div
            className={styles.sitemap}
            data-testid='sitemap'
          >
            <h2 className={styles.heading}>Sitemap</h2>
            <ul className={styles.listItems}>
              {links.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
              <li className={styles.facebookComponentWrapper}>
                <FaceBookButton />
              </li>
            </ul>
          </div>
          <div
            className={styles.mapColumn}
            data-testid='google-map'
          >
            <GoogleMap id='footer-map' />
            <div className={styles.addressBlock}>
              <p>Mike Browning, Tour Guide</p>
              <p><strong>Address:</strong> 5181 E Cypress Dr, Uncertain TX 75661</p>
              <p><strong>Phone: </strong><a href={`tel:1-903-573-2937`}>903-573-2937</a></p>
            </div>
          </div>
          <div
            className={styles.quickLinks}
            data-testid='quick-link'
          >
            <h2 className={styles.heading}>Quick Links</h2>
            <ul className={styles.listItems}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} target='_blank' rel='noopener'>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}
