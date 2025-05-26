//station_info.js
import React from 'react';
import station1 from './images/station1.png'
import station2 from './images/station2.png'
import station3 from './images/station3.png'

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
        <div>         
        </div>

        <div class="image-container">
          <img id='station1' src={station1} alt='Station 1' class="image-tile"></img> 
          <img id='station2' src={station2} alt='Station 2' class="image-tile"></img>
          <img id='station3' src={station3} alt='Station 3' class="image-tile"></img>
        </div>

      </div>
    );
  }
  
  export default DisplayStationInfo;