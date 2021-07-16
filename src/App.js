import { useEffect, useState } from 'react';
import './index.scss';
import Logo from './assets/amply-logo.svg';
import Heart from './assets/heart.svg';
import heartPopup from './assets/heartPopup.svg';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Chart from "./component/Chart";

export default function App() {
  const TOKEN = "pk.eyJ1IjoiYW1wbHkiLCJhIjoiY2tuMm93aGdvMTlibzJvbWx4dmo2a2lhMiJ9.fHpj1_WDJTJSG68nASen1w";
  const CENTER = { lat: 37.0902, lng: -95.7129 };
  const ZOOM = 5;
  // const citiesUrl = "https://api.github.com/repos/andrewzhen/comparison-map/contents/cities.json?ref=main";
  const citiesUrl = "https://raw.githubusercontent.com/andrewzhen/comparison-map/main/cities.json";
  const [cities, setCities] = useState([]);
  
  // custom Marker Icon
  const cityIcon = L.divIcon({
    className: 'icon',
    html: '<span class="icon-span">City, State</span>'
  });

  const heartIcon = L.icon({
    iconUrl: Heart,
    iconSize: [40,35]
  });

  // style toggled drawers selected by DOM index
  function handleToggle(e) {
    let idx = e.target.id.slice(5)
    let city = document.getElementById(`city-${idx}`);
    city.classList.toggle("expand");
    let chart = document.getElementById(`chart-${idx}`);
    let maxHeight = window.getComputedStyle(chart).maxHeight;
    let newStyle = maxHeight === "0px" ? ["208vw", "8vw"] : ["0", "0"];
    chart.style.maxHeight = newStyle[0];
    chart.style.padding = newStyle[1];
  }

  useEffect(() => {
    fetch(citiesUrl)
      .then(res => res.json())
      .then(
        cities => {
          setCities(cities);
          console.log(cities);
          
          // wait before populating city, state names
          setTimeout(() => {
            let icons = [...document.getElementsByClassName("icon-span")];
            icons.forEach((icon, idx) => icon.textContent = cities[idx].name);
          }, 100)
        }
      )
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
        tap={false} // fixes unrecognized click event on Mac Safari for Leaflet v1.7.1
      >
        <Marker position={[33.8,-118.5]} icon={heartIcon}>
          <Popup autoPan={false}>
            <img 
              className="heartPopup__diagram" 
              src={heartPopup} 
              alt="Impacts of a National Transition to EVs by 2050"
            />
          </Popup>
        </Marker>
        {
          cities.map((city, idx) => {
            return (
              <Marker key={idx} position={city.coords} icon={cityIcon}>
                <Popup autoPan={false}>
                  <Chart 
                    name={city.name} 
                    subhead={city.subhead} 
                    vehicleLight={city.vehicles.light}
                    vehicleMedium={city.vehicles.medium}
                    vehicleBus={city.vehicles.bus}
                    vehicleHeavy={city.vehicles.heavy}
                  />
                </Popup>
              </Marker>
            )
          })
        }
        <TileLayer 
          url={"https://api.mapbox.com/styles/v1/suzieqsharkyamply/ckaz5hl1w1cds1ipe3k4oso6k/tiles/256/{z}/{x}/{y}@2x?access_token=" + TOKEN}
        />
      </MapContainer>

      <div className="mobile-container">
        {
          cities.map((city, idx) => {
            return (
              <div key={idx} className="city-container">
                <div 
                  id={`city-${idx}`}
                  className="city-container__city"
                  onClick={handleToggle}
                >
                  {city.name}
                  <div className="city-container__city__toggle"></div>
                </div>

                <Chart 
                  id={`chart-${idx}`}
                  className="city-container__chart"
                  name={city.name} 
                  subhead={city.subhead} 
                  vehicleLight={city.vehicles.light}
                  vehicleMedium={city.vehicles.medium}
                  vehicleBus={city.vehicles.bus}
                  vehicleHeavy={city.vehicles.heavy}
                />
              </div>
            )
          })
        }
      </div>

      <footer>
        <div>&#169;2021 AMPLY Power. All Rights Reserved.</div>
        <a href="https://www.amplypower.com/whitepaper2021/">
          <span>Get the 2021 Report </span>
          - Managed Charging Accelerates Costs & Health Benefits of EVs.
        </a>
      </footer>
    </div>
  );
}