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
  const [soilTempPrediction, setSoilTempPrediction] = useState(null); // Add this line to define soilTempPrediction

  

  // Fetch weather data on mount
  useEffect(() => {
    let api_key = process.env.REACT_APP_API_KEY;
    let current_date = 20231025
    let api_url = `https://api.weather.com/v2/pws/history/daily?stationId=KCTSTORR28&format=json&units=m&date=${current_date}&apiKey=1b2a5cb281f64582aa5cb281f6d582ac`;


    const fetchData = async () => {
      try {
        const weatherResponse = await fetch(api_url);
        const weatherJson = await weatherResponse.json();
        setWeatherData(weatherJson.observations[0].metric);
        setStationInfo(weatherJson.observations[0]);

        let tmp_lst = [];

        // Retrieve avg temps for past i day


        const flaskApiUrl = "http://127.0.0.1:5000/predict";  // Update with your Flask API endpoint
        const flaskResponse = await fetch(flaskApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            // Pass any required data for prediction
            airt: weatherJson.observations[0].metric.tempAvg,
            prec: weatherJson.observations[0].metric.precipTotal,
            slrt: weatherJson.observations[0].metric.solarRadiationHigh,
            wspd: weatherJson.observations[0].metric.windspeedAvg,
          }),
        });
        
        console.log(flaskResponse)
        const flaskJson = await flaskResponse.json();
        setSoilTempPrediction(flaskJson);
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
        <div id="soil-temp-prediction">
        <h2>Soil Temperature Prediction</h2>
{soilTempPrediction && (
  <div>
    <p>Warm Season Prediction:</p>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li>Air Temperature: {soilTempPrediction.warm_season.air_temperature}</li>
      <li>Soil Temperature: {soilTempPrediction.warm_season.soil_temperature}</li>
    </ul>
    <p>Cold Season Prediction:</p>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li>Air Temperature: {soilTempPrediction.cold_season.air_temperature}</li>
      <li>Soil Temperature: {soilTempPrediction.cold_season.soil_temperature}</li>
    </ul>
  </div>
)}

        
        </div>

      
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
