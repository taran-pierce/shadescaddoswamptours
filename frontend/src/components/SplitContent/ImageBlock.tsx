import {
  useRef,
  useState,
  useEffect,
} from 'react';
import { CldImage } from "next-cloudinary";
import { useWindowDimensions } from '../../utils/useWindowDimensions';

import styles from './imageBlock.module.scss';

export default function ImageBlock({
  imageSource,
  imageAltText,
  enablePriority,
  topBorder,
}: {
  imageSource: string,
  imageAltText: string,
  enablePriority?: boolean,
  topBorder?: boolean,
}) {
  const [imageDimensions, setImageDimensions] = useState({
    height: 0,
    width: 0,
  });
  
  const ref = useRef<HTMLDivElement>(null);

  const { width: windowWidth } = useWindowDimensions();

  useEffect(() => {
    const { current } = ref;

    setImageDimensions({
      height: current?.clientHeight || 0,
      width: current?.clientWidth || 0,
    });
  }, []);

  return (
    <div
      className={`${styles.imageWrapper} ${topBorder ? styles.topBorder : ''}`}
      ref={ref}
    >
      {imageDimensions.width && imageDimensions.width > 0 && (
        <CldImage
          // check window width before setting image size
          // column size becomes locked after it hits desktop
          width={windowWidth && windowWidth >= 992 ? 610 : windowWidth}
          height={windowWidth && windowWidth >= 992 ? imageDimensions.height : 360}
          crop='fill'
          gravity='center'
          quality="50"
          priority={enablePriority}
          src={imageSource}
          alt={imageAltText}
        />
      )}
    </div>
  );
}
