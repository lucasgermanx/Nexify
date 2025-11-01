import React from 'react';
import ApexCharts from 'react-apexcharts';
import '../Style/ChartCard.css'

const ChartComponent = () => {
  const chartOptions = {
    chart: {
      id: 'area-spline-chart',
      type: 'area',
      stacked: false, // Set to true if you want to stack multiple series
    },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    },
    yaxis: {
      title: {
        text: 'Sales',
      },
    },
    dataLabels: {
      enabled: false, // Set to true if you want to show data labels on the chart
    },
    stroke: {
      curve: 'smooth', // Use 'smooth' for spline effect
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    series: [
      {
        name: 'Sales',
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ],
  };

  return (
    <div className="card-chart">
        <ApexCharts options={chartOptions} series={chartOptions.series} type="area"  height="600" />
    </div>
  );
};

export default ChartComponent;
