import { useEffect } from 'react';
import './index.scss';
import Logo from './assets/amply-logo.svg';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import cities from "./cities.json";

export default function App() {
  const TOKEN = "pk.eyJ1IjoiYW1wbHkiLCJhIjoiY2tuMm93aGdvMTlibzJvbWx4dmo2a2lhMiJ9.fHpj1_WDJTJSG68nASen1w";
  const CENTER = { lat: 37.396340, lng: -122.058760 };
  const ZOOM = 8;
  
  // custom Marker Icon
  L.Marker.prototype.options.icon = L.divIcon({
    className: 'icon',
    html: '<span class="icon-span">City, State</span>'
  });

  useEffect(() => {
    setTimeout(() => {
      let icons = [...document.getElementsByClassName("icon-span")];
      icons.forEach((icon, idx) => icon.textContent = cities[idx].name);
    }, 10);
  }, []);

  return (
    <div className="App">
      <header>
        <img src={Logo} alt="AMPLY | Gas vs. Electric Comparison Map" />
        <a className="button" href="https://amplypower.com/">
          Visit amplypower.com
        </a>
      </header>

      <MapContainer 
        className="map-container"
        center={CENTER}
        zoom={ZOOM}
        doubleClickZoom={false}
        dragging={false}
        scrollWheelZoom={false}
      >
        {
          cities.map((city, idx) => {
            return (
              <Marker key={idx} position={city.coords}>
                <Popup>{city.subhead}</Popup>
              </Marker>
            )
          })
        }
        <TileLayer 
          url={"https://api.mapbox.com/styles/v1/amply/ckp796vza066p17qw072dnhmr/tiles/256/{z}/{x}/{y}@2x?access_token=" + TOKEN}
        />
      </MapContainer>

      <footer>
        <div>&#169;2020 AMPLY Power. All Rights Reserved.</div>
        <a href="https://www.amplypower.com/whitepaper2021/">
          <span>Get the 2020 Report </span>
          - Unlocking the&nbsp;Cost Saving Potential of Electric Fleets.
        </a>
      </footer>
    </div>
  );
}