import { getBTCPriceLastFriday } from '@/lib/utils';
import { IPrediction } from '@/types/global';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // Ensure this runs in a Node.js environment

export async function GET() {
  try {
    const lastFridayPrice = await getBTCPriceLastFriday();
    const winner: IPrediction = { address: `0xasdfasdf`, price: 86400, predictAt: new Date().getTime() };

    // TODO: calculate actual winner

    return new NextResponse(JSON.stringify({ winner, lastFridayPrice }), { status: 200 });
  } catch (error) {
    return new NextResponse(error instanceof Error ? error.message : 'Unknown error', { status: 500 });
  }
}
