import useTransactions from '@/pages/transactions/hook';
import Chart from 'react-apexcharts';

export const DonoutChart = () => {
  const {chartData} = useTransactions()
 
  const chartOptions = {
    options: {
        labels: chartData && chartData.couponNames?.length != 0 ? chartData.couponNames : ["Sem dados"],
        colors: ['#ff9a36', '#ce7421', '#f4a861', '#ff8514'],
        legend: {
            show: false,
            position: 'bottom',
        },
    },
    series: chartData && chartData.couponCounts?.length != 0 ? chartData.couponCounts : [1],
}

  return (
    <div>
        <Chart
          options={chartOptions?.options as any}
          series={chartOptions?.series}
          type="donut"
        />
      </div>
  )
}