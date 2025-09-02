import React from "react";

const WeatherCard = ({ weather }) => {
  const getWeatherClass = () => {
    const code = weather.weathercode;
    if ([0, 1].includes(code)) return "sunny";
    if ([2, 3, 45, 48].includes(code)) return "cloudy";
    if ([51, 53, 55, 61, 63, 65].includes(code)) return "rainy";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "snowy";
    if ([95, 96, 99].includes(code)) return "thunder";
    return "sunny";
  };

  return (
    <div className={`weather-card ${getWeatherClass()}`}>
      <div className="icon">
        {getWeatherClass() === "sunny" && <div className="sun"></div>}
        {getWeatherClass() === "cloudy" && <div className="cloud"></div>}
        {getWeatherClass() === "rainy" && <div className="rain"></div>}
        {getWeatherClass() === "snowy" && <div className="snow"></div>}
        {getWeatherClass() === "thunder" && <div className="thunder"></div>}
      </div>

      <h2>
        {weather.city}, {weather.country}
      </h2>
      <h1>{weather.temperature}°C</h1>
      <p>Wind: {weather.windspeed} km/h</p>
    </div>
  );
};

export default WeatherCard;
