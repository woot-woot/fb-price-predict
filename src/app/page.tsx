import BTCChart from '@/components/charts/BTCChart';
import CountdownTimer from '@/components/countdown-timer/CountdownTimer';
import PredictionForm from '@/components/forms/PredictionForm';
import WinnerDisplay from '@/components/winner-display/WinnerDisplay';

export default function Home() {
  return (
    <main className="flex flex-col items-center p-4 max-w-2xl mx-auto space-y-8 pt-8">
      <BTCChart />
      <PredictionForm />
      <CountdownTimer />
      <WinnerDisplay />
    </main>
  );
}
