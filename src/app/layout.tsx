import ClientLayout from '@/app/ClientLayout';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BTC Price Predict',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
