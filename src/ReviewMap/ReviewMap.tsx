import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { latLng } from 'leaflet';

import LocationContext from '../context';
import Marker from '../Marker';

import styles from './ReviewMap.module.css';

export const INITIAL_MAP_POSITION = latLng(51.505, -0.09);

const ReviewMap = () => {
  const { locations } = React.useContext(LocationContext);

  return (
    <MapContainer center={INITIAL_MAP_POSITION} zoom={14} className={styles.mapContainer}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker key={index} location={location} />
      ))}
    </MapContainer>
  );
};

export default ReviewMap;
