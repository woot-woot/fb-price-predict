'use client';

import BTCChart from '@/components/charts/BTCChart';
import CountdownTimer from '@/components/countdown-timer/CountdownTimer';
import PredictionForm from '@/components/forms/PredictionForm';
import { Profile } from '@/components/profile/Profile';
import WinnerDisplay from '@/components/winner-display/WinnerDisplay';
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

export default function Home() {
  const { isConnected, isConnecting } = useAccount();

  if (isConnecting) {
    return <main className="flex flex-col items-center p-4 max-w-2xl mx-auto space-y-8 pt-8">Connecting ...</main>;
  }

  if (!isConnected) {
    return (
      <main className="flex flex-col items-center p-4 max-w-2xl mx-auto space-y-8 pt-32">
        <p className="text-lg">BTC Prediction</p>
        <ConnectKitButton />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center p-4 max-w-2xl mx-auto space-y-8 pt-8">
      <Profile />
      <BTCChart />
      <PredictionForm />
      <CountdownTimer />
      <WinnerDisplay />
    </main>
  );
}
