import type { Metadata } from 'next';
import { inter } from './_fonts';
import { MainLayout } from '@/components/MainLayout';

import '../styles/global.scss';

export const metadata: Metadata = {
  title: 'Burnt is down',
  description: 'Burnt it down',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
