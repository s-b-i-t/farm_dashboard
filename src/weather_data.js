//weather_data.js
import React from 'react';
import {parseDate} from './utility.js';

const DisplayWeatherData = ({ weatherData, stationInfo }) =>{

    const checkUndefined = (value,unit) => {
      if (value === undefined) {return "N/A";}
      else {return value+unit;}
    };

    return (
      <div className="container"> 
        <h1> Weather Data </h1>
      <h5> Current Date: {parseDate()}</h5>

        <div class="weather-container">
          <div class="weather-group">
            <div class="weather-header">
              <h4>Temperature</h4>
            </div>
            <div>
              <p>High: {checkUndefined(weatherData?.tempHigh,"°C")}</p>
              <p>Low: {checkUndefined(weatherData?.tempLow,"°C")}</p>
              <p>Average: {checkUndefined(weatherData?.tempAvg,"°C")}</p>
            </div>
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Wind Speed</h4>
            </div>
            <p>High: {checkUndefined(weatherData?.windspeedHigh,"mph")}</p>
            <p>Low: {checkUndefined(weatherData?.windspeedLow,"mph")} </p> 
            <p>Average: {checkUndefined(weatherData?.windspeedAvg,"mph")} </p> 
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Wind Gust</h4>
            </div>
            <p>High: {checkUndefined(weatherData?.windgustHigh,"mph")} </p> 
            <p>Low: {checkUndefined(weatherData?.windgustLow,"mph")} </p> 
            <p>Average: {checkUndefined(weatherData?.windgustAvg,"mph")} </p> 
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Dew Point</h4>
            </div>
            <p>High: {checkUndefined(weatherData?.dewptHigh,"°C")} </p> 
            <p>Low: {checkUndefined(weatherData?.dewptLow,"°C")} </p>
            <p>Average: {checkUndefined(weatherData?.dewptAvg,"°C")} </p>  
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Wind Chill</h4>
            </div>
            <p>High: {checkUndefined(weatherData?.windchillHigh,"°C")} </p>
            <p>Low: {checkUndefined(weatherData?.windchillLow,"°C")} </p>
            <p>Average: {checkUndefined(weatherData?.windchillAvg,"°C")} </p> 
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Heat Index</h4>
            </div>
            <p>High: {checkUndefined(weatherData?.heatindexHigh,"°C")} </p>
            <p>Low: {checkUndefined(weatherData?.heatindexLow,"°C")} </p>
            <p>Average: {checkUndefined(weatherData?.heatindexAvg,"°C")} </p> 
          </div>
        </div>

        <div class="weather-container">
          <div class="weather-group">
            <div class="weather-header">
              <h4>Precipitation</h4>
            </div>
            <p>precipRate: {checkUndefined(weatherData?.precipRate,"in/hr")}</p>
            <p>precipTotal: {checkUndefined(weatherData?.precipTotal,"in")}</p>
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Pressure</h4>
            </div>
            <p>High: {checkUndefined(weatherData?.pressureHigh,"mb")} </p>
            <p>Low: {checkUndefined(weatherData?.pressureLow,"mb")} </p>
            <p>Average: {checkUndefined(weatherData?.pressureAvg,"mb")} </p>
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Humidity</h4>
            </div>
              <p>High: {checkUndefined(stationInfo?.humidityHigh,"%")}</p>
              <p>Low: {checkUndefined(stationInfo?.humidityLow,"%")}</p>
              <p>Average: {checkUndefined(stationInfo?.humidityAvg,"%")}</p>
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Misc. Weather</h4>
            </div>
              <p>Solar Radiation High: {checkUndefined(stationInfo?.solarRadiationHigh,"")}</p>
              <p>UV High: {checkUndefined(stationInfo?.uvHigh,"")}</p>
              <p>Average Wind Direction: {checkUndefined(stationInfo?.winddirAvg,"°")}</p>
          </div>
        </div>
    
      </div>
    );
  }

export default DisplayWeatherData; 

