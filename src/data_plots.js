import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import  {parseDate}  from './utility.js'; 

const DataPlots = ({ avgTmp30Days }) => {

    // prolly get rid of this
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    
    useEffect(() => {
        if (avgTmp30Days && avgTmp30Days.length > 0) {
                    
            const today = new Date();
            const labels = avgTmp30Days.map((_, index) => {
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
                    datasets: [{
                        label: 'Average Temperature',
                        data: avgTmp30Days,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
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

        // Cleanup function to destroy chart instance when component unmounts
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [avgTmp30Days]);

    return (
        <canvas ref={chartRef} />
    );
};

export default DataPlots;
