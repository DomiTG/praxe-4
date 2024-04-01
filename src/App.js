import { useEffect, useState } from "react";
import "./index.css";

function App() {

  const [locations, setLocations] = useState([
    {
      name: "Prague",
      latitude: 50.0833,
      longitude: 14.4167
    },
    {
      name: "New York",
      latitude: 40.7128,
      longitude: -74.0060
    },
    {
      name: "Sydney",
      latitude: -33.8688,
      longitude: 151.2093
    }
  ]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if(!selectedLocation) return;
    const fetchWeather = async (latitude, longitude, current, forecast_days) => {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=${current}&forecast_days=${forecast_days}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setWeather(data);
        console.log(data);
      } catch(err) {
        console.error(err);
      }
    }
    fetchWeather(selectedLocation.latitude, selectedLocation.longitude, "temperature_2m,relative_humidity_2m,is_day,rain,wind_speed_10m", "1");
  }, [selectedLocation])

  return(
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ minHeight: "300px", width: "300px", backgroundColor: "white", boxShadow: "0 0 10px rgba(0,0,0,0.1)", borderRadius: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <h1>{selectedLocation.name}</h1>
        <select value={selectedLocation.name} onChange={(e) => {
          const location = locations.find(location => location.name === e.target.value);
          setSelectedLocation(location);
        }}>
          {locations.map(location => (
            <option key={location.name}>{location.name}</option>
          ))}
        </select>
        <hr style={{ width: "80%"}}/>
        <p style={{ fontSize: "24px" }}>{weather && weather.current.temperature_2m}°C</p>
        <p>{weather && weather.current.relative_humidity_2m}%</p>
        <p>{weather && weather.current.rain}mm</p>
        <p>{weather && weather.current.wind_speed_10m}m/s</p>

      </div>
    </div>
  )
}

export default App;
