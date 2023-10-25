import React, { useRef } from 'react';
import './App.css';
import graph_img from './images/graph_img.png';
import weather_dash from './images/weather_dash.png';

const App = () => {
  const currentWeatherRef = useRef(null);
  const weatherDataRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

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
      </div>
      <div id='current-weather' className='section' ref={currentWeatherRef}>
        <h2>Current Weather</h2>
        <img className='large-img' src={weather_dash} alt='Current Weather' />
      </div>
    </div>
  );
};

export default App;
