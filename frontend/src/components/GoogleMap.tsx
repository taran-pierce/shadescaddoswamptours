import { useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

import styles from './googleMap.module.scss';

// content for little tooltip thing on google map
// should find something cooler to do with this
function buildContent() {
  const content = document.createElement("div");
  content.classList.add(styles.mapPopUpWrapper);
  content.innerHTML = `
    <div class="${styles.mapDetailsWrapper}">
      <div>Tours leave from Shady Glade Marina</div>
    </div>
    `;
  return content;
}

// hide/show for the tooltip
function toggleHighlight(markerView: google.maps.marker.AdvancedMarkerElementOptions, content: Node) {
  const tooltip = markerView?.content;

  if (tooltip instanceof Element && tooltip.classList.contains(styles.hidden)) {
    tooltip.classList.remove(styles.hidden);
    markerView.zIndex = null;
  } else {
    tooltip instanceof Element && tooltip?.classList.add(styles.hidden);
    markerView.zIndex = 1;
  }
}

// TODO look into the various things that can be configured
// https://github.com/googlemaps/extended-component-library
// https://developers.google.com/maps/documentation/javascript/reference/advanced-markers
export default function GoogleMap({
  id,
  noBorder,
}: {
  id: string,
  noBorder?: boolean,
}) {
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
      version: "weekly",
      // ...additionalOptions,
    });
    
    loader.load().then(async () => {
      // standard google map library
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      
      // Marker library for customization 
      const {
        AdvancedMarkerElement,
        PinElement,
      } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
  
      // create the map with right zoom
      const map = new Map(document.getElementById(id) as HTMLElement, {
        center: {
          lat: 32.71249923828125,
          lng: -94.12107849121094
        },
        zoom: 18,
        mapId: "3249873476c587d0"
      });
  
      // custom pin styling
      const pinScaled = new PinElement({
        scale: 1.5,
        background: '#736d1f',
        borderColor: '#756f1f',
        glyphColor: 'rgba(248, 241, 147, 0.31)',
      });
  
      const Marker = new AdvancedMarkerElement({
        map,
        position: {
          lat: 32.71272903828125,
          lng: -94.12065849121094
        },
        content: pinScaled.element,
        title: 'Tours leave from Shady Glade Marina',
      });
  
      const CaddoLakeMarketElement = new google.maps.marker.AdvancedMarkerElement({
        map,
        content: buildContent(),
        position: {
          lat: 32.71247923828125,
          lng: -94.12070049121094
        },
        title: 'Tours leave from Shady Glade Marina',
      });
  
      Marker.addListener("click", () => {
        toggleHighlight(CaddoLakeMarketElement, buildContent());
      });
  
      CaddoLakeMarketElement.addListener("click", () => {
        toggleHighlight(CaddoLakeMarketElement, buildContent());
      });
    });
  }, [id]);

  return (
    <div
      id={id}
      className={`${styles.mapWrapper} ${noBorder ? styles.noBorder : ''}`}
    ></div>
  );
}
