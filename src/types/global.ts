export type IPriceChartData = {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

export type IPrediction = {
  address: `0x${string}`;
  price: number;
  predictAt: number;
};

export type IPrice = [number, number];
