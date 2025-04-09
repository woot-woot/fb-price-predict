'use client';
import { getLastFridayStart, getPrices } from '@/lib/utils';
import { IPriceChartData } from '@/types/global';
import { useQuery } from '@tanstack/react-query';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function BTCChart() {
  const { data: priceData, isLoading } = useQuery<{ labels: string[]; datasets: IPriceChartData[] }>({
    queryKey: ['btc-price-data'],
    queryFn: async () => {
      try {
        const from = Math.floor(getLastFridayStart().getTime() / 1000);
        const to = Math.floor(Date.now() / 1000);

        const prices = await getPrices(from, to);

        return {
          labels: prices.map(([timestamp]) =>
            new Date(timestamp).toLocaleDateString('en-US', { weekday: 'short', hour: 'numeric' }),
          ),
          datasets: [
            {
              label: 'BTC Price (USD)',
              data: prices.map(([, price]) => price),
              borderColor: '#facc15',
              backgroundColor: 'transparent',
            },
          ],
        };
      } catch (error) {
        console.error('failed to fetch price', error);
        return {
          labels: [],
          datasets: [],
        };
      }
    },
  });

  if (isLoading) return <div className="text-sm text-muted-foreground">📉 Loading BTC price chart...</div>;
  if (!priceData) return <div className="text-sm text-red-500">⚠️ Failed to load chart data</div>;

  return <Line data={priceData} />;
}
