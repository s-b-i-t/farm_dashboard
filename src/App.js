import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import graph_img from './images/graph_img.png';
import weather_dash from './images/weather_dash.png';

const App = () => {
  //navbar scrolling
  const currentWeatherRef = useRef(null);
  const weatherDataRef = useRef(null);
  const ApiRef = useRef(null);

  const [weatherData, setWeatherData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  //Obtain current weather data with API
  // API KEY GOES HERE 
  
  let current_date = "20231102"
    // Fetch weather data on mount
    useEffect(() => {
      const fetchData = async () => {
        try {
          const weatherResponse = await fetch(`https://api.weather.com/v2/pws/history/daily?stationId=KCTSTORR28&format=json&units=m&date=${current_date}&apiKey=${api_key}`);
          const weatherJson = await weatherResponse.json();    
          
          setWeatherData(weatherJson.observations[0].metric);
          setCurrentWeather(weatherJson.observations[0]);
        } catch (error) {
          console.error('Failed to fetch weather data', error);
        }
      };
  
      fetchData();
    }, [api_key]);
  


  
  return (
    <div className='container'>
      <div className='header-section'>
        <h1>Farm Dashboard</h1>
      </div>
      <div id='weather-data' ref={weatherDataRef}>
        <h2>Weather Data</h2>

        <img className='large-img' src={graph_img} alt='Weather Data' />
      </div>
      <div className='navbar'>
      <button onClick={() => handleScroll(weatherDataRef)}>Weather Data</button>
        <button onClick={() => handleScroll(currentWeatherRef)}>Current Weather</button>
        <button onClick={() => handleScroll(ApiRef)}>Api Section</button>

      </div>
      <div id='current-weather' className='section' ref={currentWeatherRef}>
        <h2>Current Weather</h2>
        <img className='large-img' src={weather_dash} alt='Current Weather' />
      </div>

      <div id='API DATA' className='section' ref={ApiRef}>
        <h2>API DATA</h2>
        <p>High Temperature: {weatherData?.tempHigh}°C</p>
        <p>Low Temperature: {weatherData?.tempLow}°C</p>
        <p>Average Temperature: {weatherData?.tempAvg}°C</p>
        <p>Wind Speed High: {weatherData?.windspeedHigh} </p>

      </div>
    </div>
  );
};

export default App;
