import type { Metadata } from 'next';

import './globals.scss';

import { Header } from '@/components/layout/Header';
import { QueryProvider } from '@/providers/QueryProvider';

export const metadata: Metadata = {
  title: 'EventShop',
  description:
    'Plataforma de reserva de entradas para eventos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}