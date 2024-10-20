import {
  useEffect,
  useState,
} from 'react';
import Script from 'next/script';

import styles from './faceBookButton.module.scss';

export default function FaceBookButton() {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  if (!hasLoaded) {
    return null;
  }

  return (
    <>
      <div
        className={`fb-like ${styles.faceBookWrapper}`}
        data-href="//www.facebook.com/people/Shades-Caddo-Swamp-Tours/61561025831878/"
        data-width="300px"
        data-layout="button"
        data-action="like"
        data-size="large"
        data-show-faces="true"
        data-share="true"
      />
      <Script
        async
        defer
        strategy='afterInteractive'
        crossOrigin="anonymous"
        src="//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0"
      />
    </>
  );
}
