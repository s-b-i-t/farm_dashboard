import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { getCurrentDateString, handleScroll, DisplayData, DisplayStationInfo } from "./utility";
import graph_img from "./images/graph_img.png";
import weather_dash from "./images/weather_dash.png";

const App = () => {



  const [weatherData, setWeatherData] = useState(null);
  const [stationInfo, setStationInfo] = useState(null);

  // Fetch weather data on mount
  useEffect(() => {
    let api_key = process.env.REACT_APP_API_KEY;
    let current_date = getCurrentDateString();
    let api_url = `https://api.weather.com/v2/pws/history/daily?stationId=KCTSTORR28&format=json&units=m&date=${current_date}&apiKey=${api_key}`;


    const fetchData = async () => {
      try {
        const weatherResponse = await fetch(api_url);
        const weatherJson = await weatherResponse.json();
        setWeatherData(weatherJson.observations[0].metric);
        setStationInfo(weatherJson.observations[0]);

        console.log(weatherJson.observations)
        
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      }
    };

    fetchData();
  }, []);


    //navbar scrolling
    const stationInfoRef = useRef(null);
    const weatherDataRef = useRef(null);
    const ApiRef = useRef(null);

  return (
    <div className="container">

      <div className="navbar">
        <button onClick={() => handleScroll(weatherDataRef)}>
          Weather Data
        </button>
        <button onClick={() => handleScroll(stationInfoRef)}>
          Current Weather
        </button>
        <button onClick={() => handleScroll(ApiRef)}>Api Section</button>
      </div>


      <div className="header-section">
        <h1>Farm Dashboard</h1>
      </div>
      <div id="weather-data" ref={weatherDataRef}>
        
        <h2>Weather Data</h2>

        <img className="large-img" src={graph_img} alt="Weather Data" />
      </div>
      
      <div id="current-weather" className="section" ref={stationInfoRef}>
        <h2>Current Weather</h2>
        <img className="large-img" src={weather_dash} alt="Current Weather" />
      </div>
      
      <div id='API DATA' className='section' ref={ApiRef}>
        <h2>API DATA</h2>
        <DisplayData weatherData={weatherData} />
        <h2> STATION INFO</h2>
        <DisplayStationInfo stationInfo={stationInfo} />
      </div>
      
    </div>
  );
};

export default App;
