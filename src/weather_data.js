import React from 'react';
import {parseDate} from './utility.js';




const DisplayWeatherData = ({ weatherData }) =>{
    return (
      <div> 
      <h5> Current Date: {parseDate()}</h5>
      <p>High Temperature: {weatherData?.tempHigh}°C</p>
      <p>Low Temperature: {weatherData?.tempLow}°C</p>
      <p>Average Temperature: {weatherData?.tempAvg}°C</p>
      <p>Wind Speed High: {weatherData?.windspeedHigh} </p> 
      <p>Wind Speed Low: {weatherData?.windspeedLow} </p> 
      <p>Wind Speed Avg: {weatherData?.windspeedAvg} </p> 
      <p>Wind Gust High: {weatherData?.windgustHigh} </p> 
      <p>Wind Gust Low: {weatherData?.windgustLow} </p> 
      <p>Wind Gust Avg: {weatherData?.windgustAvg} </p> 
      <p>Dew Point High: {weatherData?.dewptHigh} </p> 
      <p>Dew Point Low: {weatherData?.dewptLow} </p> 
      <p>Dew Point Avg: {weatherData?.dewptAvg} </p> 
      <p>Wind Chill High: {weatherData?.windchillHigh} </p> 
      <p>Wind Chill Low: {weatherData?.windchillLow} </p>
      <p>Wind Chill Avg: {weatherData?.windchillAvg} </p> 
      <p>Heat Index High: {weatherData?.heatindexHigh} </p>
      <p>Heat Index Low: {weatherData?.heatindexLow} </p>
      <p>Heat Index Avg: {weatherData?.heatindexAvg} </p>
      <p>Pressure High: {weatherData?.pressureHigh} </p>
      <p>Pressure Low: {weatherData?.pressureLow} </p>
      <p>Pressure Avg: {weatherData?.pressureAvg} </p>
      <p>precipRate: {weatherData?.precipRate}</p>
      <p>precipTotal: {weatherData?.precipTotal}</p>
    </div>
    );
  }
   
export default DisplayWeatherData; 