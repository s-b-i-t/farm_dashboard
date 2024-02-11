import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { getCurrentDateString, handleScroll, DisplayData, DisplayStationInfo, getPreviousTemps } from "./utility";
import graph_img from "./images/graph_img.png";
import  DataPlots from "./data_plots.js";
import weather_dash from "./images/weather_dash.png";
const App = () => {



  const [weatherData, setWeatherData] = useState(null);
  const [stationInfo, setStationInfo] = useState(null);
  const [avgTmp30Days, setAvgTmp30Days] = useState(null);
  
  

  // Fetch weather data on mount
  useEffect(() => {
    let api_key = process.env.REACT_APP_API_KEY;
    let current_date = 20231025
    let api_url = `https://api.weather.com/v2/pws/history/daily?stationId=KCTSTORR28&format=json&units=m&date=${current_date}&apiKey=${api_key}`;


    const fetchData = async () => {
      try {
        const weatherResponse = await fetch(api_url);
        const weatherJson = await weatherResponse.json();
        setWeatherData(weatherJson.observations[0].metric);
        setStationInfo(weatherJson.observations[0]);

        let tmp_lst = [];

        // Retrieve avg temps for past i days
        
        for (let i = 0; i < 5; i++){
          let prev_day = getPreviousTemps(i);
          let prev_url = `https://api.weather.com/v2/pws/history/daily?stationId=KCTSTORR28&format=json&units=m&date=${prev_day}&apiKey=${api_key}`;
          const prevResponse = await fetch(prev_url);
          const prevJson = await prevResponse.json();
          tmp_lst.push(prevJson.observations[0].metric.tempAvg);   
        }

        setAvgTmp30Days(tmp_lst)

        
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
        <h1>Student Valley Farm Weather App</h1>
      </div>
      <div id="weather-data" ref={weatherDataRef}>
        
        <h2>Current Farm Data</h2>
        <DisplayData weatherData={weatherData} />

      
      
      </div>
      
      <div id="5 Day Weather" className="section" ref={stationInfoRef}>
      <h2>5 Day Weather Plot</h2>
        <DataPlots avgTmp30Days={avgTmp30Days} /> 
      
      </div>
      
      <div id='API DATA' className='section' ref={ApiRef}>
        <h2>API DATA</h2>
        <h2> STATION INFO</h2>
        <DisplayStationInfo stationInfo={stationInfo} />
      </div>
      
    </div>
  );
};

export default App;
