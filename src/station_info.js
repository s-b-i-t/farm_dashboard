//station_info.js
import React from 'react';

const DisplayStationInfo = ({stationInfo}) => {
    return (
      <div>
        <h1>Station Information</h1>
        { <p>Station ID: {stationInfo?.stationID}</p> }
        { <p>Time Zone: {stationInfo?.tz}</p> }
        { <p>Observation Time (UTC): {stationInfo?.obsTimeUtc}</p> }
        { <p>Observation Time (Local): {stationInfo?.obsTimeLocal}</p> }
        { <p>Latitude: {stationInfo?.lat}</p> }
        { <p>Longitude: {stationInfo?.lon}</p> }
        
        { <p>Solar Radiation High: {stationInfo?.solarRadiationHigh}</p> }
        { <p>UV High: {stationInfo?.uvHigh}</p>  }
        { <p>Average Wind Direction: {stationInfo?.winddirAvg}°</p> }

        { <p>High Humidity: {stationInfo?.humidityHigh}</p> }
        { <p>Low Humidity: {stationInfo?.humidityLow}</p> }
        { <p>Average Humidity: {stationInfo?.humidityAvg}</p>  }
      </div>
    );
  }
  
  export default DisplayStationInfo;