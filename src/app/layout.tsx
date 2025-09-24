import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { PageWrapper } from '@/components/layout/page-wrapper';

export const metadata: Metadata = {
  title: 'Hype Socks',
  description: 'Discover custom athletic socks from HypeSocks-engineered for comfort, durability, and style. Perfect for every sport and active lifestyle.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-sans antialiased')}>
        <PageWrapper>
            {children}
        </PageWrapper>
        <Toaster />
      </body>
    </html>
  );
}
