import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]); // <-- Added history state
  const [showRecent, setShowRecent] = useState(false);

  const toggleRecent = () => {
    setShowRecent(!showRecent);
  };

  const apiKey = ""; // if using API key

  const getWeather = async (selectedCity = null) => {
    const searchCity = selectedCity || city;
    if (!searchCity) return;

    try {
      setError("");
      setSuggestions([]);
      setWeather(null);

      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchCity}`
      );
      const geoData = await geoRes.json();

      if (geoData.length === 0) {
        setError("City not found. Try a nearby bigger city.");
        return;
      }

      const location = geoData[0];
      const lat = location.lat;
      const lon = location.lon;

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      if (!weatherData.current_weather) {
        setError("Weather data not available for this city.");
        return;
      }

      setWeather({
        city: searchCity, // exact typed city
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
        code: weatherData.current_weather.weathercode,
      });

      // Add to recent history (avoid duplicates)
      const newItem = {
        name: searchCity,
        latitude: lat,
        longitude: lon,
      };
      setHistory((prev) =>
        [newItem, ...prev.filter((item) => item.name.toLowerCase() !== searchCity.toLowerCase())].slice(0, 5)
      );
    } catch (err) {
      console.log(err);
      setError("Something went wrong.");
    }
  };

  const getIcon = (code) => {
    switch (code) {
      case 0:
        return "☀️";
      case 1:
      case 2:
      case 3:
        return "⛅";
      case 45:
      case 48:
        return "🌫️";
      case 51:
      case 53:
      case 55:
        return "🌦️";
      case 61:
      case 63:
      case 65:
        return "🌧️";
      case 71:
      case 73:
      case 75:
        return "❄️";
      case 80:
      case 81:
      case 82:
        return "🌧️";
      case 95:
      case 96:
      case 99:
        return "⛈️";
      default:
        return "🌈";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") getWeather();
  };

  const useMyLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      )
        .then((res) => res.json())
        .then((data) => {
          const cityName =
            data.address.city || data.address.town || data.address.village;
          setCity(cityName);
          getWeather(cityName);
        });
    });
  };

  return (
    <div className="app-container" style={{ flexDirection: "row", alignItems: "flex-start" }}>
      {/* Recent Searches Hamburger */}
      <div className="recent-container">
        <button className="hamburger-btn" onClick={toggleRecent}>
          ☰
        </button>
        <div className={`recent-list ${showRecent ? "active" : ""}`}>
          {history.map((item, index) => (
            <button
              key={index}
              className="recent-btn"
              onClick={() => getWeather(item.name)}
            >
              {item.name}
             
            </button>
          ))}
        </div>
       
      </div>

      {/* Main Weather Section */}
      <div style={{ flex: 1, maxWidth: "500px" }}>
        <h1>Weather Now</h1>

        <div className="search-container">
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="search-btn" onClick={() => getWeather()}>
            Search
          </button>
          <button className="location-btn" onClick={useMyLocation}>
            Location
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {suggestions.length > 0 && (
          <div className="suggestions">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => getWeather(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {weather && (
          <div className="weather-info">
            <h2 className="city-name">{weather.city}</h2>
            <div className="icon">{getIcon(weather.code)}</div>
            <p className="temperature">🌡️ {weather.temp}°C</p>
            <p>💨 Wind: {weather.wind} km/h</p>
          </div>
        )}
      </div>
    </div>
  );
}
