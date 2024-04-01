import React, { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import { getCurrentDateString } from "./utility";
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [soilTempPrediction, setSoilTempPrediction] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (weatherData && soilTempPrediction) {
      const labels = ["Actual Temp", "Linear Regression Prediction", "Neural Network Prediction"];
      const currentData = ((weatherData.tempAvg)*9/5) + 32; // turn into farenheit
      console.log("Hello World")
      //const warmSeasonPrediction = soilTempPrediction.warm_season.soil_temperature_lr;
      const soiltemp = soilTempPrediction.season.actual_temp;
      const lrPrediction = soilTempPrediction.season.soil_temperature_lr;
      //const coldSeasonPrediction = soilTempPrediction.cold_season.soil_temperature_lr;
      const nnPrediction = soilTempPrediction.nn_prediction.soil_temperature_nn;

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Soil Temperature",
            data: [soiltemp, lrPrediction, nnPrediction],
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            pointRadius: 10,
            pointHoverRadius: 13,
          },
        ],
      };

      setChartData(data);
    }
  }, [weatherData, soilTempPrediction]);

  const fetchData = async () => {
    try {
      let api_key = "1b2a5cb281f64582aa5cb281f6d582ac";
      let current_date = getCurrentDateString();
      const BASE_URL = 'https://api.weather.com/v2/pws/history/daily';
      const STATION_ID = 'KCTSTORR28';
      let api_url = `${BASE_URL}?stationId=${STATION_ID}&format=json&units=m&date=${current_date}&apiKey=${api_key}`;
      
      const weatherResponse = await fetch(api_url);
      const weatherJson = await weatherResponse.json();
      setWeatherData(weatherJson.observations[0].metric);

      const flaskApiUrl = "http://127.0.0.1:5000/predict";
      const flaskResponse = await fetch(flaskApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify({
          airt: ((weatherJson.observations[0].metric.tempAvg)*9/5) + 32, // turn into farenheit
          prec: weatherJson.observations[0].metric.precipTotal,
          slrt: weatherJson.observations[0].metric.solarRadiationHigh,
          wspd: weatherJson.observations[0].metric.windspeedAvg,
        }),
      });

      const flaskJson = await flaskResponse.json();
      setSoilTempPrediction(flaskJson);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  return (
    <div className="container">
      <div id="weather-data">
        <div id="soil-temp-prediction">
          <h2>Soil Temperature Prediction</h2>
          {soilTempPrediction && (
            <div>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <b>Actual Soil Temperature: {soilTempPrediction.season.actual_temp}° F</b>
              <li>Air Temperature: {soilTempPrediction.season.air_temperature}° F</li>
            </ul>
              
              
              
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <b>Linear Regression Season Prediction:</b>
                <li>Season: {soilTempPrediction.season.season_type}</li>
                <li>Soil Temperature: {soilTempPrediction.season.soil_temperature_lr}° F</li>
              </ul>
              
              
              
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <b>Neural Network Prediction:</b>
                <li>Soil Temperature: {soilTempPrediction.nn_prediction.soil_temperature_nn}° F</li>
              </ul>
            </div>
          )}

          {chartData && (
            <Line
              data={chartData}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
