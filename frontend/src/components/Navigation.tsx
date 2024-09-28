'use client'

// import Link from 'next/link';
import FaceBookButton from './FaceBookButton';
import { useMenu } from '../utils/menuState';
import { useWindowDimensions } from '../utils/useWindowDimensions';

import styles from './navigation.module.scss';

export const links = [
  {
    name: 'About',
    href: '/about'
  },
  {
    name: 'Directions',
    href: '/directions'
  },
  {
    name: 'Things to Do',
    href: '/things-to-do'
  },
  {
    name: 'Photo Gallery',
    href: '/photo-gallery'
  },
  {
    name: 'Contact',
    href: '/contact'
  },
];

export default function Navigation() {
  const {
    menuOpen,
    closeMenu,
  } = useMenu();

  const {
    width,
  } = useWindowDimensions();

  let navigationClass = menuOpen ? styles.menuOpen : styles.menuClose;

  if (width && width >= 992) {
    navigationClass = styles.menuDesktop;
  }

  function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    closeMenu();
  }

  return (
    <nav
      role='navigation'
      aria-label='Main Navigation'
      className={navigationClass}
      id='main-nav'
    >  
      <ul className={styles.navigation}>
        {links && links.map((link) => (
          <li key={link.name}>
            {/* TODO the Facebook button really hates next/link */}
            {/* <Link 
              href={{
                pathname: link.href,
              }}
              onClick={(e) => handleClick(e)}
            >{link.name}</Link> */}
            <a href={link.href} onClick={(e) => handleClick(e)}>{link.name}</a>
          </li>
        ))}
        <li>
          <FaceBookButton />
        </li>
      </ul>
    </nav>
  );
};
