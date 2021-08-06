import React from 'react';
import { LatLng } from 'leaflet';

export type LocationType = {
  name: string;
  type: string;
  image: string | null;
  location: LatLng;
};

const LocationContext = React.createContext<{
  locations: Array<LocationType>;
  addNewLocation: React.Dispatch<React.SetStateAction<LocationType>>;
}>({
  locations: [],
  addNewLocation: () => undefined,
});

const LocationProvider = ({ children }: { children: React.ReactNode }) => {
  const [locations, setLocations] = React.useState<Array<LocationType>>([]);

  const addNewLocation = (newLocation: LocationType) => {
    setLocations((locations) => [...locations, newLocation]);
  };

  return <LocationContext.Provider value={{ locations, addNewLocation }}>{children}</LocationContext.Provider>;
};

export { LocationProvider };

export default LocationContext;
