import useTransactions from '@/pages/transactions/hook';
import ReactApexChart from 'react-apexcharts';

function AreaChart() {
  const {chartData} = useTransactions()
  
  const chartOptions = {
    chart: {
      id: 'line-chart',
      type: 'line',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value: any) {
          const month = new Date(value).toLocaleString('default', {
            month: 'short',
          });
          return month.charAt(0).toUpperCase() + month.slice(1);
        },
      },
    },
    yaxis: {
      title: {
        text: 'Análise',
      },
    },
    tooltip: {
      x: { format: 'dd/MM/yy' },
      y: { formatter: undefined },
    },
    dataLabels: { enabled: true },
    stroke: { curve: 'smooth' },
    legend: { show: true },
    colors: ['#219607', '#FFA500', "#3366ff", "#ff5733", "#303030"],
    series: chartData ? [
      chartData?.transactions_approved[0],
      chartData?.transactions_pending[0],
      chartData?.transactions_in_mediation[0],
      chartData?.transactions_cancelled[0],
      chartData?.transactions_refunded[0]
    ] : [{
      name: "Transações",
      data: [{
        x:"2024-08-21 22:51:55.309",
        y:[0,0,0,0,0,0,0,0,0,0,0,0]
      }]
  }],
  };

  return (
    <ReactApexChart
      options={chartOptions as any}
      series={chartOptions.series ? chartOptions.series : []}
      type="area"
      height={525}
    />
  );
}

export default AreaChart;
