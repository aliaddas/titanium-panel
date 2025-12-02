import type { Metadata, Viewport } from 'next';
import { Roboto, Work_Sans } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';
import { ModalProvider } from '@/providers/modal-provider';
import { ToasterProvider } from '@/providers/toast-provider';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

import './globals.css';

declare global {
  interface Window {
    grained?: (selector: string, options: object) => void;
  }
}
import GrainedEffectProvider from '@/components/css/grained-effect';
import { Toaster } from 'react-hot-toast';

const workSansRegular = Work_Sans({
  variable: '--font-work-sans-regular',
  subsets: ['latin'],
  weight: '400',
});

const workSansBold = Work_Sans({
  variable: '--font-work-sans-bold',
  subsets: ['latin'],
  weight: '600',
});

const workSansItalic = Work_Sans({
  variable: '--font-work-sans-italic',
  subsets: ['latin'],
  style: 'italic',
});

export const metadata: Metadata = {
  title: 'Titanium Panel',
  description: 'The only e-commerce solution',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider signInFallbackRedirectUrl={'/'}>
      <ModalProvider />
      <html lang="en" style={{ touchAction: 'none', overflowX: 'hidden' }}>
        <body>
          {children}
          <GrainedEffectProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
