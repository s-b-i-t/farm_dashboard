import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { parseDate } from './utility.js';

const plotOptions = [
  { value: 'temperature', label: 'Temperature' , unit: '°C'},
  { value: 'windSpeed', label: 'Wind Speed', unit: 'km/h' },
  { value: 'windGust', label: 'Wind Gust' , unit: 'km/h'},
  { value: 'dewPoint', label: 'Dew Point', unit: '°C'},
  { value: 'windChill', label: 'Wind Chill', unit: '°C'},
  { value: 'heatIndex', label: 'Heat Index', unit: '°C'},
  { value: 'pressure', label: 'Pressure', unit: 'hPa'},
  { value: 'precipitation', label: 'Precipitation', unit: 'mm'},
];



const DataPlots = ({ temperatures }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [selectedPlot, setSelectedPlot] = useState(plotOptions[0].value);
  const [isHovered, setIsHovered] = useState(false);

  // console.log(temperatures)

  const getYAxisLabel = (plot) => {
    const option = plotOptions.find(option => option.value === plot);
    return option && option.unit ? `(${option.unit})` : 'Value';
  };

  useEffect(() => {

    const handleResize = () => {
      chartInstanceRef.current?.resize();
    };
      
    // Detect zoom changes specifically (doesnt work as intended)
    let lastWidth = window.innerWidth;
    const handleZoom = () => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== lastWidth) {
        chartInstanceRef.current?.resize();
        lastWidth = currentWidth;
      }
    };

    window.addEventListener('resize', handleZoom);
    window.addEventListener('resize', handleResize);


    if (temperatures && temperatures.length > 0 && temperatures[0].length > 0) {
      const today = new Date();
      const labels = Array.from({ length: temperatures[0].length }, (_, index) => {
        const date = new Date(today);
        date.setDate(today.getDate() - (temperatures[0].length - 1 - index));
        return parseDate(date).slice(0, -5);
      });

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: getDatasetsForPlot(selectedPlot, temperatures),
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: getYAxisLabel(selectedPlot)
              }
            },
            x : {
                title: {
                    display: true,
                    text: 'Date'
                }
                }
          }
        }
      });

      chartInstanceRef.current = chartInstance;
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      window.removeEventListener('resize', handleZoom);
      window.removeEventListener('resize', handleResize);

    };
  }, [temperatures, selectedPlot]);

  const getDatasetsForPlot = (plot, temperatures) => {
    const colorSets = [
      { borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)' },
      { borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.2)' },
      { borderColor: 'rgba(255, 206, 86, 1)', backgroundColor: 'rgba(255, 206, 86, 0.2)' },
    ];

    const plotTypes = {
      temperature: { indices: [0, 1, 2], labels: ['High Temp', 'Low Temp', 'Avg Temp'] },
      windSpeed: { indices: [3, 4, 5], labels: ['High Wind Speed', 'Low Wind Speed', 'Avg Wind Speed'] },
        windGust: { indices: [6, 7, 8], labels: ['High Wind Gust', 'Low Wind Gust', 'Avg Wind Gust'] },
        dewPoint: { indices: [9, 10, 11], labels: ['High Dew Point', 'Low Dew Point', 'Avg Dew Point'] },
        windChill: { indices: [12, 13, 14], labels: ['High Wind Chill', 'Low Wind Chill', 'Avg Wind Chill'] },
        heatIndex: { indices: [15, 16, 17], labels: ['High Heat Index', 'Low Heat Index', 'Avg Heat Index'] },
        pressure: { indices: [18, 19 , 20], labels: ['High Pressure', 'Low Pressure', 'Avg Pressure'] },
        precipitation: { indices: [21, 22], labels: ['Precipitation Rate', 'Precipitation Total'] },
    };

    const currentPlot = plotTypes[plot] || { indices: [], labels: [] };
    return currentPlot.indices.map((index, i) => {
      return {
        label: currentPlot.labels[i],
        data: temperatures[index],
        borderColor: colorSets[i % colorSets.length].borderColor,
        backgroundColor: colorSets[i % colorSets.length].backgroundColor,
        fill: false,
        tension: 0.1,
        borderWidth: 1
      };
    });
  };

  return (
    <>
      <h1> Previous 30 Day Data </h1>

      
      <div className="info-icon" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        ⓘ
        {isHovered && <div className="tooltip">Empty data points indicate the weather station was offline or not returning that specific metric for that day </div>}
      </div>


      <select id="plotSelect" value={selectedPlot} onChange={e => setSelectedPlot(e.target.value)}>
        {plotOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <div style={{ maxWidth: '90%', margin: 'auto' }}>
        <canvas ref={chartRef} />
      </div>
    </>
  );
};

export default DataPlots;