import { ReactNode } from 'react';
import Link from 'next/link';

import styles from './button.module.scss';

export default function Button({
  children,
  isLink,
  href,
}: {
  children: ReactNode,
  isLink: boolean,
  href: string,
}) {
  if (isLink && href) {
    return (
      <Link
        href={href}
        className={styles.button}
        data-testid='link'
      >{children}</Link>
    )
  }
  return (
    <button
      type='button'
      data-testid='button'
    >
      {children}
    </button>
  );
};
