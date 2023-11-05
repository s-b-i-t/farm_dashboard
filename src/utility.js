
export function getCurrentDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');

  return `${year}${month}${day}`;
}

export const handleScroll = (ref) => {
  ref.current.scrollIntoView({ behavior: 'smooth' });
};


function parseDate(){
  let cur = getCurrentDateString()
  let year = cur.slice(0,4)
  let month = cur.slice(4,6)
  let day = cur.slice(6,8)
  return `${month}-${day}-${year}`
}

export function DisplayData({ weatherData }) {
  return (
    <div> 
    <h3> Current Date: {parseDate() }</h3>
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
      <p>Station ID: {stationInfo.stationID}</p>
      <p>Time Zone: {stationInfo.tz}</p>
      <p>Observation Time (UTC): {stationInfo.obsTimeUtc}</p>
      <p>Observation Time (Local): {stationInfo.obsTimeLocal}</p>
      <p>Latitude: {stationInfo.lat}</p>
      <p>Longitude: {stationInfo.lon}</p>
      <p>Solar Radiation High: {stationInfo.solarRadiationHigh}</p>
      <p>UV High: {stationInfo.uvHigh}</p>
      <p>Average Wind Direction: {stationInfo.winddirAvg}°</p>
      <p>High Humidity: {stationInfo.humidityHigh}%</p>
      <p>Low Humidity: {stationInfo.humidityLow}%</p>
      <p>Average Humidity: {stationInfo.humidityAvg}%</p>
    </div>
  );
}
