import {
  useRef,
  useState,
  useEffect,
} from 'react';
import { CldImage } from 'next-cloudinary';
import { useWindowDimensions } from '../utils/useWindowDimensions';

import styles from './photoGallery.module.scss';

interface Image {
  asset_id: string,
  public_id: string,
  format: string,
  version: number,
  resource_type: string,
  type: string,
  created_at: string,
  bytes: number,
  width: number,
  height: number,
  folder: string,
  url: string,
  secure_url: string,
}

export default function PhotoGallery({ images }: { 
  images: Array<Image>,
}) {
  
  const ref = useRef<HTMLDivElement>(null);
  const [carouselDimensions, setCarouselDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [currentImage, setCurrentImage] = useState(0);
  const [isImageChanging, setIsImageChanging] = useState(false);

  const {
    width,
  } = useWindowDimensions();

  const isMobile = width && width <= 768;

  useEffect(() => {
    const { current } = ref;

    setCarouselDimensions({
      height: current?.clientHeight || 0,
      width: current?.clientWidth || 0,
    });
  }, []);

  const CarouselNavigation = () => {
    return (
      <div
        role="group"
        aria-label="Slide controls"
        className={styles.navigation}
      >
        <button
          type="button"
          onClick={(e) => handleClick(e, {
            direction: "prev"
          })}
          disabled={currentImage === 0}
        >Prev</button>
        <button
          type="button"
          onClick={(e) => handleClick(e, {
            direction: "next"
          })}
          disabled={currentImage === images.length - 1}
        >Next</button>
      </div>
    );
  };

  const CarouselPagination = ({
    currentSlide,
    clickHandler,
    images,
  }: {
    currentSlide: number,
    clickHandler: Function,
    images: Array<Image>,
  }) => {
    return (
      <div className={styles.paginationWrapper}>
        {images.map((image: {
          public_id: string,
        }, index: number) => (
          <span
            key={index}
            title={image.public_id}
            data-slide-number={index}
            onClick={(e) => clickHandler(e)}
            className={`${styles.pagination} ${index == currentSlide ? styles.active : ''}`}
          />
        ))}
      </div>
    );
  };

  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, options: {
    direction: string,
  }) {
    e.preventDefault();

    setIsImageChanging(true);

    const isNext = options.direction === 'next';
    const isPrev = options.direction === 'prev';

    if (isNext) {
      setCurrentImage(currentImage + 1);
    }
    
    if (isPrev) {
      setCurrentImage(currentImage - 1);
    }

    // image is already loading
    // just giving some time for the animation
    setTimeout(() => {
      setIsImageChanging(false);
    }, 300);
  }

  function handleDotNavigationClick(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
    e.preventDefault();

    setIsImageChanging(true);

    const target = e.target as HTMLElement;
    const slide = target?.dataset.slideNumber;

    // comes back as a string
    // so convert back to a number
    setCurrentImage(Number(slide));

    // image is already loading
    // just giving some time for the animation
    setTimeout(() => {
      setIsImageChanging(false);
    }, 300);
  }

  return (
    <div
      className={`${styles.mainWrapper} ${isImageChanging ? styles.loading : ''}`}
    >
      <div className={styles.container}>
        <h2>Pictures of Caddo Lake</h2>
        <div
          role="region"
          aria-label="Photo Gallery Carousel"
          ref={ref}
          className={styles.galleryWrapper}
        >
          <div
            role="group"
            aria-roledescription="slide"
            aria-labelledby="carousel_item-1_heading"
            className={styles.slideWrapper}
          >
             {images && carouselDimensions?.width && (
              <CldImage
                width={carouselDimensions.width}
                height={isMobile ? 280 : 600}
                crop='fill'
                gravity='center'
                quality="50"
                src={images[currentImage]?.public_id}
                alt={images[currentImage]?.public_id}
              />
             )}
          </div>
          <div>
            <CarouselPagination
              images={images}
              currentSlide={currentImage}
              clickHandler={handleDotNavigationClick}
            />
          </div>
          <CarouselNavigation />
        </div>
      </div>
    </div>
  );
}
