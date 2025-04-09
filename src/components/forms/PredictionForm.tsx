'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

export default function PredictionForm() {
  const [prediction, setPrediction] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem('btc-prediction-submitted'); // should get from api, reset if it's another prediction period
    if (hasSubmitted) setSubmitted(true);
  }, []);

  const handleSubmit = async () => {
    // TODO: use ibe.ts to encrypt the prediction and submit
    localStorage.setItem('btc-prediction-submitted', 'true');

    setSubmitted(true);
  };

  if (submitted) return <div className="text-green-500">✅ Prediction submitted!</div>;

  return (
    <div className="w-full gap-2 flex">
      <Input
        placeholder="Enter your BTC price prediction"
        value={prediction}
        onChange={(e) => setPrediction(e.target.value)}
        type="number"
      />
      <Button onClick={handleSubmit} disabled={!prediction}>
        Submit Prediction
      </Button>
    </div>
  );
}
