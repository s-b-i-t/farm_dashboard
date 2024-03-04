// need to add something to easily change from degrees to celsius maybe?

import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { getCurrentDateString, handleScroll, getPreviousTemps } from "./utility";
import DisplayWeatherData from "./weather_data.js";
import DisplayStationInfo from "./station_info.js";
import DataPlots from "./data_plots.js";
import HomePage from "./home.js";
import DataPredctions from "./ml.js";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const App = () => {


  // setters and getters
  const [weatherData, setWeatherData] = useState(null);
  const [stationInfo, setStationInfo] = useState(null);
  const [avgTmp30Days, setAvgTmp30Days] = useState(null);


  //useeffect to fetch data
  useEffect(() => {

    const fetchData = async () => {
      try {

        let api_key = "1b2a5cb281f64582aa5cb281f6d582ac";
        let current_date = getCurrentDateString();
        const BASE_URL = 'https://api.weather.com/v2/pws/history/daily';
        const STATION_ID = 'KCTSTORR28';
        let api_url = `${BASE_URL}?stationId=${STATION_ID}&format=json&units=m&date=${current_date}&apiKey=${api_key}`;

        const weatherResponse = await fetch(api_url);
        const weatherJson = await weatherResponse.json();

        let promises = [];

        // promises returns an array of promises
        const responses = await Promise.all(promises)
        // promise called on each response to get the json data
        const tempData = await Promise.all(responses.map(res => res.json()));

        // here we use our usestate setters
        setWeatherData(weatherJson.observations[0].metric);
        setStationInfo(weatherJson.observations[0]);
        setAvgTmp30Days(tempData.map(data => data.observations[0].metric.tempAvg));

      }
      catch (error) {
        console.error("Failed to fetch weather data", error);
      }
    };

    fetchData();


  }, []);


  //navbar scrolling (prolly gonna get rid of this)
  const stationInfoRef = useRef(null);
  const weatherDataRef = useRef(null);
  const ApiRef = useRef(null);



  // Add stuff to home page and route to ml page
  return (
    <Router>
      <div className="container">
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/weather">Weather Data</Link>
          <Link to="/station">Station Info</Link>
          <Link to="/plots">Data Plots</Link>
          <Link to="/predictions">Predictions</Link>

        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather" element={<DisplayWeatherData weatherData={weatherData} />} />
          <Route path="/station" element={<DisplayStationInfo stationInfo={stationInfo} />} />
          <Route path="/plots" element={<DataPlots avgTmp30Days={avgTmp30Days} />} />
          <Route path="/predictions" element={<DataPredctions/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;