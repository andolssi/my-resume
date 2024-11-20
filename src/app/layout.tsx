import type { Metadata } from 'next';
import { Quicksand, Source_Code_Pro } from 'next/font/google';
import './globals.css';
// import SocialMediaContact from '@/components/SocialMediaContact';
import { Analytics } from '@vercel/analytics/react';
import ThemePreferenceProvider from '@/components/ThemePreferenceProvider';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});

const source_Code_Pro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source_Code_Pro',
});

export const metadata: Metadata = {
  title: 'Houssem Eddine El Andolsi resume',
  description: 'Houssem Eddine EL Andolsi resume created with next js ...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemePreferenceProvider>
        <body
          className={`${quicksand.variable} ${source_Code_Pro.variable} font-sans dark:bg-slate-800 no-scroll`}
        >
          {/* <SocialMediaContact /> */}
          {children}
          <Analytics />
        </body>
      </ThemePreferenceProvider>
    </html>
  );
}
