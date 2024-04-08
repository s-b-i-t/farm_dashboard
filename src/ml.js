//ml.js

import React, { useState, useEffect, useRef } from "react";
//import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [soilTempPrediction, setSoilTempPrediction] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (weatherData && soilTempPrediction) {
      const labels = ["Current Data", "Warm Season Prediction", "Cold Season Prediction"];
      const currentData = weatherData.tempAvg;
      const warmSeasonPrediction = soilTempPrediction.warm_season.soil_temperature;
      const coldSeasonPrediction = soilTempPrediction.cold_season.soil_temperature;

      const data = {
        labels: labels,
        datasets: [
          {
            label: "Soil Temperature",
            data: [currentData, warmSeasonPrediction, coldSeasonPrediction],
            backgroundColor: [  // Specify the background colors for each bar
              'rgba(255, 206, 86, 0.6)', // Yellow
              'rgba(255, 99, 132, 0.6)', // Red
              'rgba(54, 162, 235, 0.6)', // Blue
            
            ],
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            pointRadius: 5,
            pointHoverRadius: 8,
          },
        ],
      };

      setChartData(data);
    }
  }, [weatherData, soilTempPrediction]);

  const fetchData = async () => {
    try {
      const weatherResponse = await fetch("https://api.weather.com/v2/pws/history/daily?stationId=KCTSTORR28&format=json&units=m&date=20231025&apiKey=1b2a5cb281f64582aa5cb281f6d582ac");
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
          airt: weatherJson.observations[0].metric.tempAvg,
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
      <h1>Soil Temperature Prediction</h1>
      <div id="weather-data">
        <div id="soil-temp-prediction">
          
          {soilTempPrediction && (
            <div class="weather-container">
              <div class="weather-group">
                <div class="weather-header">
                  <h4>Warm Season Prediction:</h4>
                </div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li>Air Temperature: {soilTempPrediction.warm_season.air_temperature}</li>
                  <li>Soil Temperature: {soilTempPrediction.warm_season.soil_temperature}</li>
                </ul>
              </div>
              <div class="weather-group">
                <div class="weather-header">
                  <h4>Cold Season Prediction:</h4>
                </div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li>Air Temperature: {soilTempPrediction.cold_season.air_temperature}</li>
                  <li>Soil Temperature: {soilTempPrediction.cold_season.soil_temperature}</li>
                </ul>
              </div>
            </div>
          )}

          {chartData && (
            <Bar
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
