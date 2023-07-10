import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && city !== "") {
      let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
      fetchAPI(api);
    }
  };

  const fetchAPI = async (api) => {
    const response = await fetch(api);
    const data = await response.json();
    if (data.cod === "404") {
      alert(`${city} isn't a valid name...`);
      return;
    }
    setData(data);
  };

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      alert("Your browser does not support geolocation...");
    }
  };

  const onSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    fetchAPI(api);
  };

  const onError = (err) => {
    alert(err.message);
  };

  return (
    <>
      <div className="city-input">
        <div className="head">Weather App</div>
        <input
          type="text"
          placeholder="Enter city name..."
          className="input"
          spellCheck="false"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="separator"></div>
        <button className="detect-btn" onClick={handleDetectLocation}>
          Allow us to detect location
        </button>
      </div>
      {data === null ? (
        ""
      ) : (
        <div className="details-area">
          <div className="image"></div>
          <div className="details">
            <div className="temp">{parseInt(data.main.temp)}°C</div>
            <div className="city-name">{data.name}</div>
            <div className="extras">
              <div className="feels-like">
                {data.main.feels_like}
                <br />
                Feels Like
              </div>
              <div className="humidity">
                {data.main.humidity}
                <br />
                Humidity
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
