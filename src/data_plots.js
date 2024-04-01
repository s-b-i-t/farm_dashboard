import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import  {parseDate}  from './utility.js'; 

const plotOptions = [
  { value: 'temperature', label: 'Temperature' },
  { value: 'windSpeed', label: 'Wind Speed' },
  { value: 'windGust', label: 'Wind Gust' },
  { value: 'dewPoint', label: 'Dew Point' },
  { value: 'windChill', label: 'Wind Chill' },
  { value: 'heatIndex', label: 'Heat Index' },
  { value: 'pressure', label: 'Pressure' },
  { value: 'precipitation', label: 'Precipitation' },
];

const DataPlots = ({ temperatures }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const [selectedPlot, setSelectedPlot] = useState(plotOptions[0].value);

    console.log(temperatures);

    useEffect(() => {
        if (temperatures[0] && temperatures[0].length > 0) {
            const today = new Date(); 
            const labels = temperatures[0].map((_, index) => {
                const date = new Date(today);
                date.setDate(today.getDate() - index);
                return parseDate(date).slice(0, -5);
            }).reverse(); 

            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            const chartInstance = new Chart(ctx, {
                type: 'line', 
                data: {
                    labels: labels,
                    datasets: getDatasetsForPlot(selectedPlot, temperatures),
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
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
        };
    }, [temperatures, selectedPlot]);

    const getDatasetsForPlot = (plot, temperatures) => {
        const colors = [
            { background: 'rgba(75, 192, 192, 0.2)', border: 'rgba(75, 192, 192, 1)' },
            { background: 'rgba(100, 100, 100, 0.2)', border: 'rgba(100, 100, 100, 1)' },
            { background: 'rgba(180, 75, 60, 0.2)', border: 'rgba(100, 80, 75, 1)' },
        ];
    
        switch(plot) {
            case 'temperature':
                return [
                    { label: 'High Temperature', data: temperatures.map(t => t[0]), backgroundColor: colors[0].background, borderColor: colors[0].border, borderWidth: 1 },
                    { label: 'Low Temperature', data: temperatures.map(t => t[1]), backgroundColor: colors[1].background, borderColor: colors[1].border, borderWidth: 1 },
                    { label: 'Avg Temperature', data: temperatures.map(t => t[2]), backgroundColor: colors[2].background, borderColor: colors[2].border, borderWidth: 1 },
                ];
            case 'windSpeed':
                return [
                    { label: 'High Wind Speed', data: temperatures.map(t => t[3]), backgroundColor: colors[0].background, borderColor: colors[0].border, borderWidth: 1 },
                    { label: 'Low Wind Speed', data: temperatures.map(t => t[4]), backgroundColor: colors[1].background, borderColor: colors[1].border, borderWidth: 1 },
                    { label: 'Avg Wind Speed', data: temperatures.map(t => t[5]), backgroundColor: colors[2].background, borderColor: colors[2].border, borderWidth: 1 },
                ];
            // TODO add more plots
            default:
                return [];
        }
    }

    return (
        <>
        <h1> Previous 5 Day Data </h1>
        <select value={selectedPlot} onChange={e => setSelectedPlot(e.target.value)}>
            {plotOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        <canvas ref={chartRef} />
        </>
    );
};

export default DataPlots;