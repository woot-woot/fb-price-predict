import { IPrice } from '@/types/global';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLastFridayStart() {
  const now = new Date();
  const lastFriday = new Date();
  const dayDiff = (now.getUTCDay() + 2) % 7 || 7;
  lastFriday.setUTCDate(now.getUTCDate() - dayDiff);
  lastFriday.setUTCHours(0, 0, 0, 0);
  return lastFriday;
}

export function getNextFridayDeadline() {
  const now = new Date();
  const nextFriday = new Date();
  nextFriday.setUTCDate(now.getUTCDate() + ((5 - now.getUTCDay() + 7) % 7));
  nextFriday.setUTCHours(23, 59, 0, 0);
  return nextFriday;
}

export async function getPrices(from: number, to: number): Promise<IPrice[]> {
  try {
    const {
      data: { prices },
    } = await axios.get<{ prices: IPrice[] }>(process.env.NEXT_PUBLIC_COINGECKO_API!, {
      params: { vs_currency: 'usd', from, to },
    });

    return prices;
  } catch {
    return [];
  }
}

export async function getBTCPriceLastFriday(): Promise<number> {
  try {
    const lastFridayStart = getLastFridayStart();
    const lastFridayTimestamp = Math.floor(lastFridayStart.getTime() / 1000);

    const prices = await getPrices(lastFridayTimestamp, lastFridayTimestamp + 86400);

    return prices[0]?.[1] || 0;
  } catch (error) {
    console.error('Error fetching BTC price for last Friday:', error);
    return 0;
  }
}
