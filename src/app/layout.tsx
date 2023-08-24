import type { Metadata } from 'next';
import { inter } from './_fonts';
import { Header } from '@/components/Header';
import { StackNavigatorProvider } from '@/providers/NavigatorProvider';

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
        <StackNavigatorProvider>
          <Header />
          <main>{children}</main>
        </StackNavigatorProvider>
      </body>
    </html>
  );
}
