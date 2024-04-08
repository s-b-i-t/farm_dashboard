//station_info.js
import React from 'react';

const DisplayStationInfo = ({stationInfo}) => {
    return (
      <div className="container">
        <h1>Station Information</h1>
        <div class="weather-container">
          <div class="weather-group">
            <div class="weather-header">
              <h4>Station ID</h4>
            </div>
            <p>Station ID: {stationInfo?.stationID}</p>
            <p>Time Zone: {stationInfo?.tz}</p>
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Observation Time</h4>
            </div>
              <p>(UTC): {stationInfo?.obsTimeUtc}</p>
              <p>(Local): {stationInfo?.obsTimeLocal}</p>
          </div>
          <div class="weather-group">
            <div class="weather-header">
              <h4>Geographic Coordinates</h4>
            </div>
              <p>Latitude: {stationInfo?.lat}</p>
              <p>Longitude: {stationInfo?.lon}</p>
          </div>
        </div>

      </div>
    );
  }
  
  export default DisplayStationInfo;