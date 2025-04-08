import type { Metadata } from 'next';
import { Quicksand, Source_Code_Pro, Alegreya } from 'next/font/google';
import './globals.css';
// import SocialMediaContact from '@/components/SocialMediaContact';
import { Analytics } from '@vercel/analytics/react';
import ThemePreferenceProvider from '@/components/ThemePreferenceProvider';

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
});
const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
});

const source_Code_Pro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source_Code_Pro',
});

export const metadata: Metadata = {
  title: 'Houssem Eddine El Andolsi',
  description: `Houssem Eddine El Andolsi is a versatile digital professional with over 5 years of experience. He started his career as a 3D artist and artistic director in a game development startup, where he honed his design and storytelling skills. Over time, he transitioned into full-stack development, gaining deep knowledge in both front-end and back-end technologies. Today, Houssem specializes in Front-End Development and UX/UI Design, leveraging his unique blend of creative and technical expertise. He's skilled in using React, TypeScript, Figma, and animation libraries like GSAP to build modern, intuitive web applications. With a strong focus on user experience, he's passionate about crafting beautiful, functional interfaces that engage and delight users. Houssem is currently open to Front-End and UX/UI opportunities, as well as freelance work, where he can combine his creative vision with technical skills to solve both user and business challenges.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <ThemePreferenceProvider>
        <body
          className={`${quicksand.variable} ${source_Code_Pro.variable} ${alegreya.variable} font-sans dark:bg-slate-800 no-scroll`}
        >
          {/* <SocialMediaContact /> */}
          {children}
          <Analytics />
        </body>
      </ThemePreferenceProvider>
    </html>
  );
}
