import { useState, useEffect } from "react";
import axios from "axios";

const APIKey = process.env.REACT_APP_API_KEY;

const WeatherInCapital = ({ capital }) => {
  const [temperature, setTemperature] = useState(null);
  const [wind, setWind] = useState(null);
  const [weatherIconURL, setWeatherIconURL] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${capital}&appid=${APIKey}`
      )
      .then((geoLoc) => {
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${geoLoc.data[0].lat}&lon=${geoLoc.data[0].lon}&appid=${APIKey}`
          )
          .then((response) => {
            setWeatherIconURL(response.data.weather[0].icon);
            setWind(response.data.wind.speed);
            setTemperature(response.data.main.temp - 273.15); // Convert K to Celsius
          });
      });
  }, [temperature, wind, weatherIconURL]);

  return (
    <>
      <h3>Weather in {capital}</h3>
      {temperature ? (
        <>
          <p>Temperature: {temperature} Celsius</p>
          <p>Wind: {wind} m/s</p>
          {weatherIconURL !== null ? (
            <img
              src={`http://openweathermap.org/img/wn/${weatherIconURL}@4x.png`}
              alt=""
            />
          ) : null}
        </>
      ) : (
        <>
          <p>Getting weather data ...</p>
        </>
      )}
    </>
  );
};

export default WeatherInCapital;
