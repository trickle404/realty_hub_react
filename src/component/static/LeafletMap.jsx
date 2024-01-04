import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const LeafletMap = ({ geo }) => {
  const [latitude, longitude] = geo.split(',').map(Number);
  const position = [latitude, longitude];


  return (
    <MapContainer ref={position} center={position} zoom={14} style={{ width: '100%', height: '400px' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Circle center={position} radius={200}/>
    </MapContainer>
  );
};

export default LeafletMap;
