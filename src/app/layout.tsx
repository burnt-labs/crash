import type { Metadata } from 'next';
import { inter, respira } from './_fonts';
import { MainLayout } from '@/components/MainLayout';

import '../styles/global.scss';
import { appConfig } from '@/config';

export const metadata: Metadata = {
  title: 'Burnt it down',
  description: 'The first L1 blockchain purpose built for consumer adoption.',
  openGraph: {
    type: 'website',
    url: appConfig.siteUrl,
    title: 'Burnt it down',
    description: 'The first L1 blockchain purpose built for consumer adoption.',
    siteName: 'Burnt it down',
    images: [
      {
        url: '/banner.jpg',
      },
    ],
  },
  twitter: {
    title: 'Burnt it down',
    description: 'The first L1 blockchain purpose built for consumer adoption.',
    images: ['/banner.jpg'],
    card: 'summary_large_image',
    creator: '@burnt_',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${respira.variable}`}
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
