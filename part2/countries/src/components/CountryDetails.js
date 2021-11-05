import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ country }) => {
  const WEATHER_API_BASE_URL = "http://api.weatherstack.com/current";
  const api_key = process.env.REACT_APP_API_KEY;

  const [weather, setWeather] = useState({});

  const loadWeather = () => {
    axios
      .get(WEATHER_API_BASE_URL, {
        params: {
          access_key: api_key,
          query: country.capital[0],
        },
      })
      .then((response) => {
        console.log("extracted weather");
        setWeather({
          temperature: response.data.current.temperature,
          icon_url: response.data.current.weather_icons[0],
          windSpeed: response.data.current.wind_speed,
          windDirection: response.data.current.wind_dir,
        });
      });
  };

  useEffect(loadWeather, [country.capital, api_key]);

  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>Spoken languages</h3>
      <div>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
      </div>
      <img src={country.flag} alt="flag"></img>
      <h3>Weather in {country.capital}</h3>
      <div>
        <b>temperature : </b>
        {weather.temperature} Celcius
      </div>
      <img src={weather.icon_url} alt="weatherIcon"></img>
      <div>
        <b>wind : </b>
        {weather.windSpeed} mph direction {weather.windDirection}
      </div>
    </div>
  );
};

export default CountryDetails;
