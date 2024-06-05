import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Poppins as FontSans } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import TanstackProviders from '@/components/providers/tanstack-providers';
import SessionProvider from '@/components/providers/session-provider';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin-ext'],
  variable: '--font-sans',
  fallback: ['Arial', 'sans-serif'],
  preload: false,
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: { default: 'Shoesmart', template: '%s | Shoesmart' },
  description: 'Belanja sepatu mejadi lebih menyenangkan dengan Shoesmart.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('bg-background min-h-screen font-sans antialiased', fontSans.variable)}>
        <TanstackProviders>
          <Toaster richColors position="top-center" />
          <SessionProvider>{children}</SessionProvider>
        </TanstackProviders>
      </body>
    </html>
  );
}
