'use client';

import BTCChart from '@/components/charts/BTCChart';
import CountdownTimer from '@/components/countdown-timer/CountdownTimer';
import PredictionForm from '@/components/forms/PredictionForm';
import { CosmProfile } from '@/components/profile/CosmProfile';
import { Button } from '@/components/ui/button';
import WinnerDisplay from '@/components/winner-display/WinnerDisplay';
import { fairyring } from '@/constant/chains';
import { PUBLIC_ENVIRONMENT } from '@/constant/env';

import { useAccount, useConnect, useSuggestChainAndConnect, WalletType } from 'graz';
import { useEffect } from 'react';

export default function Home() {
  const { isConnected, isConnecting } = useAccount();
  const { connect, error: walletConnectError } = useConnect();
  const { suggestAndConnect } = useSuggestChainAndConnect();

  async function handleConnect() {
    connect({
      walletType: WalletType.KEPLR,
      chainId: PUBLIC_ENVIRONMENT.NEXT_PUBLIC_CHAIN_ID!,
    });
  }

  useEffect(() => {
    if (walletConnectError) {
      suggestAndConnect({
        chainInfo: fairyring,
        walletType: WalletType.KEPLR,
      });
    }
  }, [walletConnectError, suggestAndConnect]);

  if (isConnecting) {
    return <main className="flex flex-col items-center p-4 max-w-2xl mx-auto space-y-8 pt-8">Connecting ...</main>;
  }

  if (!isConnected) {
    return (
      <main className="flex flex-col items-center p-4 max-w-2xl mx-auto space-y-8 pt-32">
        <p className="text-lg">BTC Prediction</p>
        <Button onClick={() => handleConnect()}>Connect</Button>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center p-4 max-w-2xl mx-auto space-y-8 pt-8">
      <CosmProfile />
      <BTCChart />
      <PredictionForm />
      <CountdownTimer />
      <WinnerDisplay />
    </main>
  );
}
