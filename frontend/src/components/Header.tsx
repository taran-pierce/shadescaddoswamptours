import Navigation from "./Navigation";
import MenuToggle from "./MenuToggle";
import { useMenu } from '../utils/menuState';

import styles from './header.module.scss';

export default function Header() {
  const { closeMenu } = useMenu();

  function handleClick() {
    closeMenu();
  }

  return (
    <header
      className={styles.header}
      data-testid='header'
    >
      <div className={styles.headerContainer}>
        <div className={styles.logoWrapper}>
            <a href='/' onClick={() => handleClick()}>
              <h1>Shades Caddo Swamp Tours</h1>
            </a>
          <MenuToggle />
        </div>
        <Navigation />
      </div>
    </header>
  );
};
