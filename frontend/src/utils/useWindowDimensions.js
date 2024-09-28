import {
  useState,
  useEffect,
} from 'react';

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    // function to set the sizes
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth || 0,
        height: window.innerHeight || 0,
      });
    };

    // set the height/width
    handleResize();

    // add listener on resize to also set the height/width
    window.addEventListener("resize", handleResize);

    // remove listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
