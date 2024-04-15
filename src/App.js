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
          const api_key = process.env.REACT_APP_API_KEY;
          const BASE_URL = 'https://api.weather.com/v2/pws/history/daily';
          const STATION_ID = 'KCTSTORR28';
          const promises = [];

          let num_days = 30;

          for (let i = 1; i <= num_days; i++) { // for 30 days, including today
              const date = getPreviousTemps(i - 1); // adjust to get the correct dates
              const api_url = `${BASE_URL}?stationId=${STATION_ID}&format=json&units=m&date=${date}&apiKey=${api_key}`;
              promises.push(fetch(api_url).then(res => res.json()));
          }

          const data = await Promise.all(promises);
          const reversedData = data.reverse(); // Reverse to start from the oldest to most recent

          // Pre-fill the metrics with null values for each day
          const metrics = Array.from({ length: 23 }, () => Array(30).fill(null)); // Assuming 23 metrics

          reversedData.forEach((response, dayIndex) => {
              const obs = response.observations[0]?.metric;
              if (obs) {
                  Object.keys(obs).forEach((key, metricIndex) => {
                      if (obs[key] !== undefined) {
                          metrics[metricIndex][dayIndex] = obs[key];
                      }
                  });
              }
          });

          setTempratures(metrics);
          if (reversedData[0] && reversedData[0].observations && reversedData[0].observations[0]) {
              setWeatherData(reversedData[0].observations[0].metric);
          }

          setWeatherData(data[num_days - 1].observations[0].metric)
          setStationInfo(data[num_days - 1].observations[0]);
          

      } catch (error) {
          console.error("Failed to fetch weather data", error);
      }
  };

  fetchData();
}, []);

  //navbar scrolling (prolly gonna get rid of this)
  const stationInfoRef = useRef(null);
  const weatherDataRef = useRef(null);
  const ApiRef = useRef(null);

  console.log(temperatures)



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