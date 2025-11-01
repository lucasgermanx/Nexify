import useTransactions from '@/pages/transactions/hook';
import ReactApexChart from 'react-apexcharts';

function AreaChart() {
  const { chartData } = useTransactions()

  const chartOptions = {
    chart: {
      id: 'line-chart',
      type: 'line',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      background: 'transparent',
    },
    theme: {
      mode: 'dark',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#cbd5e1',
          fontSize: '12px',
        },
        formatter: function (value: any) {
          const month = new Date(value).toLocaleString('default', {
            month: 'short',
          });
          return month.charAt(0).toUpperCase() + month.slice(1);
        },
      },
      axisBorder: {
        color: '#334155',
      },
      axisTicks: {
        color: '#334155',
      },
    },
    yaxis: {
      title: {
        text: 'Análise',
        style: {
          color: '#cbd5e1',
        },
      },
      labels: {
        style: {
          colors: '#cbd5e1',
          fontSize: '12px',
        },
      },
    },
    tooltip: {
      theme: 'dark',
      x: { format: 'dd/MM/yy' },
      y: { formatter: undefined },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    legend: {
      show: true,
      labels: {
        colors: '#cbd5e1',
      },
    },
    grid: {
      borderColor: '#334155',
      strokeDashArray: 4,
    },
    colors: ['#22c55e', '#ff8c00', '#3b82f6', '#ef4444', '#8b5cf6'],
    series: chartData ? [
      chartData?.transactions_approved[0],
      chartData?.transactions_pending[0],
      chartData?.transactions_in_mediation[0],
      chartData?.transactions_cancelled[0],
      chartData?.transactions_refunded[0]
    ] : [{
      name: "Transações",
      data: [{
        x: "2024-08-21 22:51:55.309",
        y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }]
    }],
  };

  return (
    <ReactApexChart
      options={chartOptions as any}
      series={chartOptions.series ? chartOptions.series : []}
      type="area"
      height={200}
    />
  );
}

export default AreaChart;
