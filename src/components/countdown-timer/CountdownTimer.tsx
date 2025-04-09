'use client';
import { useEffect, useState } from 'react';

import { getNextFridayDeadline } from '@/lib/utils';
import { formatDistanceToNowStrict } from 'date-fns';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      const deadline = getNextFridayDeadline();
      const distance = formatDistanceToNowStrict(deadline, { addSuffix: true });
      setTimeLeft(distance);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="text-sm text-muted-foreground">⏳ Time left: {timeLeft}</div>;
}
