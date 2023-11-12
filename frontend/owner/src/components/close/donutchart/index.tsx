import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { accounts } from '@/temp/accounts';
import { Center, ChartBox } from './Donutchart.styled';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AssetDoughnutChart() {
  const labels = accounts.map((account) => account.name);
  const data = accounts.map((account) => account.count);

  const Data = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#ffcc33', '#66b2ff', '#ff9999', '#99cc99', '#6699cc', '#cc99cc', '#ffcc99'],
        cutout: '80%',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <ChartBox>
      <Center>
        <div>총 금액</div>
        <div>28,000원</div>
      </Center>
      <Doughnut data={Data} options={options}></Doughnut>
    </ChartBox>
  );
}
