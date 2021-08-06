import Leaflet from 'leaflet';
import pin from './pin.svg';

const MarkerIcon = new Leaflet.Icon({
  iconUrl: pin,
  iconRetinaUrl: pin,
  iconSize: [50, 50],
  iconAnchor: [25, 0],
});

export default MarkerIcon;
