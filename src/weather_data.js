import React from 'react';
import {parseDate} from './utility.js';




const DisplayWeatherData = ({ weatherData }) =>{
    return (
      <div> 
        <h1> Weather Data </h1>
      <h5> Current Date: {parseDate()}</h5>

        <div class="weather-container">
          <div class="weather-group">
            <div class="weather-header">
              <h4>Temperature</h4>
            </div>
            <div>
              <p>High: {weatherData?.tempHigh}°C</p>
              <p>Low: {weatherData?.tempLow}°C</p>
              <p>Average: {weatherData?.tempAvg}°C</p>
            </div>
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Wind Speed</h4>
            </div>
            <p>High: {weatherData?.windspeedHigh} kph? </p>
            <p>Low: {weatherData?.windspeedLow} </p> 
            <p>Average: {weatherData?.windspeedAvg} </p> 
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Wind Gust</h4>
            </div>
            <p>High: {weatherData?.windgustHigh} </p> 
            <p>Low: {weatherData?.windgustLow} </p> 
            <p>Average: {weatherData?.windgustAvg} </p> 
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Dew Point</h4>
            </div>
            <p>High: {weatherData?.dewptHigh}°C </p> 
            <p>Low: {weatherData?.dewptLow}°C </p>
            <p>Average: {weatherData?.dewptAvg}°C </p>  
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Wind Chill</h4>
            </div>
            <p>High: {weatherData?.windchillHigh}°C </p>
            <p>Low: {weatherData?.windchillLow}°C </p>
            <p>Average: {weatherData?.windchillAvg}°C </p> 
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Heat Index</h4>
            </div>
            <p>High: {weatherData?.heatindexHigh}°C </p>
            <p>Low: {weatherData?.heatindexLow}°C </p>
            <p>Average: {weatherData?.heatindexAvg}°C </p> 
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Pressure</h4>
            </div>
            <p>High: {weatherData?.pressureHigh} </p>
            <p>Low: {weatherData?.pressureLow} </p>
            <p>Average: {weatherData?.pressureAvg} </p>
          </div>
          
        </div>
        <div class="weather-container">
          <div class="weather-group">
            <div class="weather-header">
              <h4>Precipitation</h4>
            </div>
            <p>precipRate: {weatherData?.precipRate}</p>
            <p>precipTotal: {weatherData?.precipTotal}</p>
          </div>
        </div>

        
    </div>
    );
  }
   
export default DisplayWeatherData; 