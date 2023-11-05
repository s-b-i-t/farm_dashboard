
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


export function DisplayData({ weatherData }) {
  return <div> 
    <p>High Temperature: {weatherData?.tempHigh}°C</p>
    <p>Low Temperature: {weatherData?.tempLow}°C</p>
    <p>Average Temperature: {weatherData?.tempAvg}°C</p>
    <p>Wind Speed High: {weatherData?.windspeedHigh} </p> 
  </div>;
}