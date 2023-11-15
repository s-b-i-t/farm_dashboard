import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DataPlots = ({ avgTmp30Days }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (avgTmp30Days && avgTmp30Days.length > 0) {
            // If there's an existing chart instance, destroy it
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            const chartInstance = new Chart(ctx, {
                type: 'line', // or 'bar', 'pie', etc.
                data: {
                    labels: avgTmp30Days.map((_, index) => `Day ${index + 1}`),
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

            // Save the chart instance to the ref
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
