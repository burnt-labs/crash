import type { Metadata } from 'next';
import { orbitron } from './_fonts';

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
    <html lang="en" className={`${orbitron.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
