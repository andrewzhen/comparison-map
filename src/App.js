import { useEffect } from 'react';
import './index.scss';
import Logo from './assets/amply-logo.svg';
import LightDuty from './assets/light-duty-fleet.svg';
import MediumDuty from './assets/medium-duty-fleet.svg';
import Bus from './assets/bus-fleet.svg';
import HeavyDuty from './assets/heavy-duty-fleet.svg';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import cities from "./cities.json";

export default function App() {
  const TOKEN = "pk.eyJ1IjoiYW1wbHkiLCJhIjoiY2tuMm93aGdvMTlibzJvbWx4dmo2a2lhMiJ9.fHpj1_WDJTJSG68nASen1w";
  const CENTER = { lat: 37.0902, lng: -95.7129 };
  const ZOOM = 5;
  
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
                <Popup autoPan={false}>
                  <header>
                    <h1 className="cityName">{city.name}</h1>
                    <h2 className="citySubhead">{city.subhead}</h2>
                  </header>

                  <div className="fleet-chart">
                    <div className="fleet-chart__row title">
                      <h3> </h3>
                      <h3>Fleet Type</h3>
                      <h3>Managed Electric</h3>
                      <h3>Unmanaged Electric</h3>
                      <h3>Gas or Diesel</h3>
                    </div>

                    <hr />
                    
                    <div className="fleet-chart__row">
                      <img src={LightDuty} alt="Light Duty" />
                      <p className="fleet-chart__row__type">Light-Duty</p>
                      {
                        city.vehicles.light.map((price, idx) => {
                          return (
                            <p 
                              key={idx} 
                              className={
                                "fleet-chart__row__cost " + 
                                (idx === 0 && "managed_electric")
                              }
                            >
                              {price}
                            </p>
                          )
                        })
                      }
                    </div>
                    
                    <hr />

                    <div className="fleet-chart__row">
                      <img src={MediumDuty} alt="Medium Duty" />
                      <p className="fleet-chart__row__type">Medium-Duty</p>
                      {
                        city.vehicles.medium.map((price, idx) => {
                          return (
                            <p 
                              key={idx} 
                              className={
                                "fleet-chart__row__cost " + 
                                (idx === 0 && "managed_electric")
                              }
                            >
                              {price}
                            </p>
                          )
                        })
                      }
                    </div>
                    
                    <hr />

                    <div className="fleet-chart__row">
                      <img src={Bus} alt="Bus" />
                      <p className="fleet-chart__row__type">City Bus</p>
                      {
                        city.vehicles.bus.map((price, idx) => {
                          return (
                            <p 
                              key={idx} 
                              className={
                                "fleet-chart__row__cost " + 
                                (idx === 0 && "managed_electric")
                              }
                            >
                              {price}
                            </p>
                          )
                        })
                      }
                    </div>

                    <hr />

                    <div className="fleet-chart__row">
                      <img src={HeavyDuty} alt="Heavy Duty" />
                      <p className="fleet-chart__row__type">Heavy-Duty</p>
                      {
                        city.vehicles.heavy.map((price, idx) => {
                          return (
                            <p 
                              key={idx} 
                              className={
                                "fleet-chart__row__cost " + 
                                (idx === 0 && "managed_electric")
                              }
                            >
                              {price}
                            </p>
                          )
                        })
                      }
                    </div>

                    <hr />
                  </div>

                  <footer>
                    *Utilities with proposed special EV charging rates Gasoline (light- and medium-duty) and diesel (heavy-duty and city buses) prices eﬀective as of 02/23/2020. Source: AAA (https://gas.prices.aaa.com) For all the Metros, managed charging unlocks larger savings. AMPLY handles all aspects of charging operations on behalf of ﬂeet owners, and AMPLY’s managed charging systems are optimized for the lowest electricity costs through navigating demand charges and diﬀerent tariﬀ rates.
                  </footer>
                </Popup>
              </Marker>
            )
          })
        }
        <TileLayer 
          // url={"https://api.mapbox.com/styles/v1/amply/ckp796vza066p17qw072dnhmr/tiles/256/{z}/{x}/{y}@2x?access_token=" + TOKEN}
          url={"https://api.mapbox.com/styles/v1/suzieqsharkyamply/ckaz5hl1w1cds1ipe3k4oso6k/tiles/256/{z}/{x}/{y}@2x?access_token=" + TOKEN}
        />
      </MapContainer>

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