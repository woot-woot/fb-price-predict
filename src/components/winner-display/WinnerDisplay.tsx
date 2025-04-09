'use client';

import { IPrediction } from '@/types/global';
import axios from 'axios';
import { useEffect, useState } from 'react';

const WinnerDisplay = () => {
  const [winner, setWinner] = useState<IPrediction | null>(null);
  const [btcPriceLastFriday, setBtcPriceLastFriday] = useState<number | null>(null);

  useEffect(() => {
    const fetchWinnerData = async () => {
      const { winner, lastFridayPrice }: { winner: IPrediction; lastFridayPrice: number } = await axios.get(
        `${window.location.origin}/api/winner`,
      );

      setBtcPriceLastFriday(lastFridayPrice);
      setWinner(winner);
    };

    fetchWinnerData();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl text-center mb-4">{`Last Week's Winner`}</h2>
      {winner ? (
        <div className="text-center">
          <p>
            🎉 <strong>{winner.address}</strong> guessed{' '}
            <span className="text-xl font-semibold">{winner.price} USD</span>!
          </p>
          <p>
            Actual price last Friday: <span className="text-lg font-bold">{btcPriceLastFriday} USD</span>
          </p>
        </div>
      ) : (
        <p className="text-center">No predictions made yet for last Friday.</p>
      )}
    </div>
  );
};

export default WinnerDisplay;
