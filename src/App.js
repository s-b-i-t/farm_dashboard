//app.js

// need to add something to easily change from degrees to celsius maybe?
// date format for api needs to be yyyymmdd 
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { getCurrentDateString, handleScroll, getPreviousTemps } from "./utility";
import DisplayWeatherData from "./weather_data.js";
import DisplayStationInfo from "./station_info.js";
import DataPlots from "./data_plots.js";
import HomePage from "./home.js";
import DataPredctions from "./ml.js";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
const App = () => {


  // setters and getters

  //weather data just has current day
  const [weatherData, setWeatherData] = useState(null);
  const [stationInfo, setStationInfo] = useState(null);

  //temperatures has current day and previous x days modified in fetchdata
  const [temperatures, setTempratures] = useState(null);


  //useeffect to fetch data
  useEffect(() => {

    const fetchData = async () => {
      try {

        let api_key = process.env.REACT_APP_API_KEY;
        let current_date = getCurrentDateString();
        const BASE_URL = 'https://api.weather.com/v2/pws/history/daily';
        const STATION_ID = 'KCTSTORR28';
        let api_url = `${BASE_URL}?stationId=${STATION_ID}&format=json&units=m&date=${current_date}&apiKey=${api_key}`; //remove maybe

        const weatherResponse = await fetch(api_url);
        const weatherJson = await weatherResponse.json();

        let promises = [];

        for (let i = 1; i < 3; i++) {
          let date = getPreviousTemps(i); 
          let api_url = `${BASE_URL}?stationId=${STATION_ID}&format=json&units=m&date=${date}&apiKey=${api_key}`;
          promises.push(fetch(api_url));
        }
        // promises returns an array of promises
        const responses = await Promise.all(promises)
        // promise called on each response to get the json data
        const tempData = await Promise.all(responses.map(res => res.json()));

        // here we use our usestate setters
        setWeatherData(weatherJson.observations[0].metric);
        setStationInfo(weatherJson.observations[0]);
        setTempratures(tempData.map(data => {
          return [
            data.observations[0]?.metric?.tempHigh ?? null,
            data.observations[0]?.metric?.tempLow ?? null,
            data.observations[0]?.metric?.tempAvg ?? null,
            data.observations[0]?.metric?.windSpeedHigh ?? null,
            data.observations[0]?.metric?.windSpeedLow ?? null,
            data.observations[0]?.metric?.windSpeedAvg ?? null,
            data.observations[0]?.metric?.windgustHigh ?? null,
            data.observations[0]?.metric?.windgustLow ?? null,
            data.observations[0]?.metric?.windgustAvg ?? null,
            data.observations[0]?.metric?.dewptHigh ?? null,
            data.observations[0]?.metric?.dewptLow ?? null,
            data.observations[0]?.metric?.dewptAvg ?? null,
            data.observations[0]?.metric?.windchillHigh ?? null,
            data.observations[0]?.metric?.windchillLow ?? null,
            data.observations[0]?.metric?.windchillAvg ?? null,
            data.observations[0]?.metric?.heatindexHigh ?? null,
            data.observations[0]?.metric?.heatindexLow ?? null,
            data.observations[0]?.metric?.heatindexAvg ?? null,
            data.observations[0]?.metric?.pressureMax ?? null,
            data.observations[0]?.metric?.pressureMin ?? null,
            data.observations[0]?.metric?.pressureTrend ?? null,
            data.observations[0]?.metric?.precipRate ?? null,
            data.observations[0]?.metric?.precipTotal ?? null

          ];
           
        }));

        console.log(temperatures)
          

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
          <Link to="/farm_dashboard">Home</Link>
          <Link to="/weather">Weather Data</Link>
          <Link to="/station">Station Info</Link>
          <Link to="/plots">Data Plots</Link>
          <Link to="/predictions">Predictions</Link>

        </div>

        <Routes>
          <Route path="/" element={<Navigate replace to="/farm_dashboard" />} />
          <Route path="/farm_dashboard" element={<HomePage />} />
          <Route path="/weather" element={<DisplayWeatherData weatherData={weatherData} />} />
          <Route path="/station" element={<DisplayStationInfo stationInfo={stationInfo} />} />
          <Route path="/plots" element={<DataPlots temperatures={temperatures} />} />
          <Route path="/predictions" element={<DataPredctions/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;