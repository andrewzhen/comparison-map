import LightDuty from './assets/light-duty-fleet.svg';
import MediumDuty from './assets/medium-duty-fleet.svg';
import Bus from './assets/bus-fleet.svg';
import HeavyDuty from './assets/heavy-duty-fleet.svg';

export default function Chart(props) {
  return (
    <div id={props.id} className={props.className}>
      <header>
        <h1 className="cityName">{props.name}</h1>
        {props.subhead && <h2 className="citySubhead">{props.subhead}</h2>}
      </header>

      <div className="fleet-chart">
        <div className="fleet-chart__row title">
          <h3 className="desktop"> </h3>
          <h3>Fleet Type</h3>
          <h3>Managed Charging</h3>
          <h3>Unmanaged Charging</h3>
          <h3>Internal Combustion Engine (ICE)</h3>
          <h3 className="desktop">Managed Charging Diff over ICE</h3>
          <h3 className="desktop">Unmanaged Charging Diff over ICE</h3>
        </div>

        <hr />
        
        <div className="fleet-chart__row">
          <img src={LightDuty} alt="Light Duty" />
          <p className="fleet-chart__row__type">
            <img 
              className="fleet-chart__row__type__icon" 
              src={LightDuty} 
              alt="Light Duty" 
            />
            Light-Duty
          </p>
          {
            props.vehicleLight.map((price, idx) => {
              return (
                <p 
                  key={idx} 
                  className={
                    "fleet-chart__row__cost" + " " +
                    (idx === 0 ? "managed_electric" : null) + " " + 
                    (idx > 2 ? "desktop" : null)
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
          <p className="fleet-chart__row__type">
            <img 
              className="fleet-chart__row__type__icon" 
              src={MediumDuty} 
              alt="Medium Duty" 
            />
            Medium-Duty
          </p>
          {
            props.vehicleMedium.map((price, idx) => {
              return (
                <p 
                  key={idx} 
                  className={
                    "fleet-chart__row__cost" + " " +
                    (idx === 0 ? "managed_electric" : null) + " " +
                    (idx > 2 ? "desktop" : null)
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
          <img src={Bus} alt="City Bus" />
          <p className="fleet-chart__row__type">
            <img 
              className="fleet-chart__row__type__icon" 
              src={Bus} 
              alt="City Bus" 
            />
            City Bus
          </p>
          {
            props.vehicleBus.map((price, idx) => {
              return (
                <p 
                  key={idx} 
                  className={
                    "fleet-chart__row__cost" + " " +
                    (idx === 0 ? "managed_electric" : null) + " " + 
                    (idx > 2 ? "desktop" : null)
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
          <p className="fleet-chart__row__type">
            <img 
              className="fleet-chart__row__type__icon" 
              src={HeavyDuty} 
              alt="Heavy Duty" 
            />
            Heavy-Duty
          </p>
          {
            props.vehicleHeavy.map((price, idx) => {
              return (
                <p 
                  key={idx} 
                  className={
                    "fleet-chart__row__cost" + " " +
                    (idx === 0 ? "managed_electric" : null) + " " + 
                    (idx > 2 ? "desktop" : null)
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
        *Utilities with proposed special EV charging rates Gasoline (light- and medium-duty) and diesel (heavy-duty and city buses) prices eﬀective as of 02/23/2020. Source: AAA (<a href="https://gas.prices.aaa.com">https://gas.prices.aaa.com</a>) For all the Metros, managed charging unlocks larger savings. AMPLY handles all aspects of charging operations on behalf of ﬂeet owners, and AMPLY’s managed charging systems are optimized for the lowest electricity costs through navigating demand charges and diﬀerent tariﬀ rates.
      </footer>
    </div>
  );
}