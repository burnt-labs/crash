import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

import localFont from 'next/font/local';

export const respira = localFont({
  src: '../fonts/Respira-Black.ttf',
  variable: '--font-respira',
});
