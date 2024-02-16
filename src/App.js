// need to add something to easily change from degrees to celsius maybe?

import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { getCurrentDateString, handleScroll,   getPreviousTemps } from "./utility";
import  DisplayWeatherData  from "./weather_data.js";
import  DisplayStationInfo  from "./station_info.js";
import  DataPlots from "./data_plots.js";
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const App = () => {


  // setters and getters
  const [weatherData, setWeatherData] = useState(null);
  const [stationInfo, setStationInfo] = useState(null);
  const [avgTmp30Days, setAvgTmp30Days] = useState(null);
  
  
  //useeffect to fetch data
  useEffect(() => {

    const fetchData = async () => {
      try {

        let api_key = process.env.REACT_APP_API_KEY;
        let current_date = getCurrentDateString();
        const BASE_URL = 'https://api.weather.com/v2/pws/history/daily';
        const STATION_ID = 'KCTSTORR28';
        let api_url = `${BASE_URL}?stationId=${STATION_ID}&format=json&units=m&date=${current_date}&apiKey=${api_key}`;

        const weatherResponse = await fetch(api_url);
        const weatherJson = await weatherResponse.json();
        
        let promises = [];

        for (let i = 0; i < 5; i++){

          // Retrieve avg temps for past i days
          let prev_day = getPreviousTemps(i)
          let prev_url = `${BASE_URL}?stationId=${STATION_ID}&format=json&units=m&date=${prev_day}&apiKey=${api_key}`;          
          promises.push(fetch(prev_url));
        }
          // promises returns an array of promises
          const responses = await Promise.all(promises)
          // promise called on each response to get the json data
          const tempData = await Promise.all(responses.map(res => res.json()));
        
        // here we use our usestate setters
        setWeatherData(weatherJson.observations[0].metric);
        setStationInfo(weatherJson.observations[0]);
        setAvgTmp30Days(tempData.map(data => data.observations[0].metric.tempAvg));
      } 
      catch (error) 
      {
        console.error("Failed to fetch weather data", error);
      }
    };

    fetchData();
    

  }, []);


    //navbar scrolling (prolly gonna get rid of this)
    const stationInfoRef = useRef(null);
    const weatherDataRef = useRef(null);
    const ApiRef = useRef(null);



  // need to seperate concerns here
  return (
    // leave navbar alone for now
    // fix the other components to their own page & use router
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
        <DisplayWeatherData weatherData={weatherData} />

      
      
      </div>
      
      <div id="5 Day Weather" className="section" ref={stationInfoRef}>
      <h2>5 Day Weather Plot</h2>
        <DataPlots avgTmp30Days={avgTmp30Days} /> 
      
      </div>
      
      <div id='API DATA' className='section' ref={ApiRef}>
        <h2>API DATA</h2>
        <h5> STATION INFO</h5>
        <DisplayStationInfo stationInfo={stationInfo} />
      </div>
      
    </div>
  );
};

export default App;
