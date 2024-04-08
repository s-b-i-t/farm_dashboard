//utility.js
export function getCurrentDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');

  // return "20240313"
  return `${year}${month}${day}`;
}

export const handleScroll = (ref) => {
  ref.current.scrollIntoView({ behavior: 'smooth' });
};


export function parseDate(date = new Date()) {
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JavaScript
  let day = date.getDate().toString().padStart(2, '0');
  return `${month}-${day}-${year}`;
}


export function getPreviousTemps(days_ago) {
  const cur = new Date(getCurrentDateString().slice(0, 4), getCurrentDateString().slice(4, 6) - 1, getCurrentDateString().slice(6, 8));
  const prevDay = new Date(cur);
  prevDay.setDate(cur.getDate() - days_ago);

  let year = prevDay.getFullYear().toString();
  let month = (prevDay.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JavaScript
  let day = prevDay.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}


export function DisplayData({ weatherData }) {
  return (
    <div> 
    <h5> Current Date: {parseDate() }</h5>
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
  </div>);
}


export function DisplayStationInfo({stationInfo}) {
  return (
    <div>
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
