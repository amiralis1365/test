import React from 'react';
import { Popup as PopupType } from 'leaflet';

import { Marker, Popup } from 'react-leaflet';
import MarkerIcon from '../MarkerIcon';
import { LocationType } from '../context';

import styles from './Marker.module.css';

const MarkerComponent = ({ location }: { location: LocationType }) => {
  const popupRef = React.useRef<PopupType>(null);

  return (
    <Marker icon={MarkerIcon} position={location.location}>
      {/* popup ref is not being set so I enabled the close button */}
      <Popup minWidth={250} closeButton={true} ref={popupRef}>
        <div className={styles.popupContainer}>
          <span>Location Details...</span>
          <div className={styles.detailsContainer}>
            <span>
              <strong>{location.name}</strong>
              <br />
              {location.type}
            </span>
            <div className={styles.buttonsContainer}>
              <button
                className={[styles.button, styles.grayButton].join(' ')}
                type="button"
                onClick={() => {
                  popupRef.current && popupRef.current.closePopup();
                }}
              >
                Close
              </button>
              <button style={{ marginLeft: '10px' }} className={styles.button} type="button">
                Edit
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default MarkerComponent;
