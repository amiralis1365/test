import React from 'react';
import { BiUpload } from '@react-icons/all-files/bi/BiUpload';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LocationEvent, Marker as MarkerType, LatLng } from 'leaflet';

import FileInput from '../FileInput';
import MarkerIcon from '../MarkerIcon';
import LocationContext from '../context';
import { INITIAL_MAP_POSITION } from '../ReviewMap';

import 'leaflet/dist/leaflet.css';
import styles from './AddLocationForm.module.css';

const LocationMarker = ({ onLocationChange }: { onLocationChange: (location: LatLng) => void }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = React.useRef<MarkerType<any>>(null);
  const [formMapPosition, setFormMapPosition] = React.useState<LocationEvent['latlng']>(INITIAL_MAP_POSITION);

  React.useEffect(() => {
    if (formMapPosition) {
      onLocationChange(formMapPosition);
    }
  }, [formMapPosition]);

  const map = useMapEvents({
    click(e) {
      map.flyTo(e.latlng, map.getZoom());
    },
    locationfound(e: LocationEvent) {
      setFormMapPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  const eventHandlers = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setFormMapPosition(marker.getLatLng());
        }
      },
    }),
    [],
  );

  return formMapPosition === null ? null : (
    <Marker
      ref={markerRef}
      draggable={true}
      eventHandlers={eventHandlers}
      icon={MarkerIcon}
      position={formMapPosition}
    ></Marker>
  );
};

const AddLocationForm = (): JSX.Element => {
  const { locations, addNewLocation } = React.useContext(LocationContext);
  const [formMapPosition, setFormMapPosition] = React.useState<LocationEvent['latlng']>(INITIAL_MAP_POSITION);
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('business');
  const [imageData, setImageData] = React.useState<string | null>(null);

  const onFileSelect = (file: File) => {
    const reader = new FileReader();
    reader.onload = function (frEvent) {
      // For typescript only
      if (frEvent.target && typeof frEvent.target.result === 'string') {
        setImageData(frEvent.target?.result);
      }
    };
    reader.readAsDataURL(file);
  };

  console.log(locations);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addNewLocation({
          name,
          type,
          location: formMapPosition,
          image: imageData,
        });
        setType('business');
        setImageData(null);
        setName('');
      }}
    >
      <div className={styles.formContainer}>
        <div className={styles.formBoxContainer}>
          <div className={styles.formBoxHeading}>
            <span>Share location</span>
          </div>
          <div className={styles.formWrapper}>
            <div className={styles.formElementContainer}>
              <label htmlFor="location-name">Location name:</label>
              <div className={styles.inputWrapper}>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  name="location-name"
                />
              </div>
            </div>
            <div className={styles.formElementContainer}>
              <label htmlFor="location-on-map">Location on map:</label>
              <MapContainer center={INITIAL_MAP_POSITION} zoom={14} className={styles.mapWrapper}>
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker onLocationChange={setFormMapPosition} />
              </MapContainer>
            </div>
            <div className={styles.formElementContainer}>
              <label htmlFor="location-type">Location type:</label>
              <div className={styles.inputWrapper}>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="business">Business</option>
                  <option value="residential">Residential</option>
                  <option value="bank">Bank</option>
                  <option value="atm">ATM</option>
                </select>
              </div>
            </div>
            <div className={styles.formElementContainer}>
              <label htmlFor="logo">Logo:</label>
              <div className={styles.inputWrapper}>
                <FileInput className={styles.fileInput} onFileSelect={onFileSelect}>
                  <div className={styles.uploadButton}>
                    <span>Upload</span>
                    <div className={styles.uploadButtonIcon}>
                      <BiUpload size={60} color="rgb(58, 118, 204)" />
                    </div>
                  </div>
                </FileInput>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button
            className={[styles.button, styles.grayButton].join(' ')}
            onClick={() => {
              setType('business');
              setImageData(null);
              setName('');
            }}
            type="button"
          >
            Cancel
          </button>
          <button style={{ marginLeft: '15px' }} className={styles.button} type="submit">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddLocationForm;
