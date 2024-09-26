'use client';

import { useRef, MutableRefObject, LegacyRef, useState } from 'react';
import dynamic from 'next/dynamic';
// Dynamically import components that might cause SSR issues
const NavbarMenu = dynamic(() => import('@/components/NavbarMenu'), {
  ssr: false,
});
const SocialMediaContact = dynamic(
  () => import('@/components/SocialMediaContact'),
  { ssr: false },
);
const ProjectCards = dynamic(() => import('@/components/ProjectCards'), {
  ssr: false,
});
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  ssr: false,
});
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: false,
});
const AboutMeCard = dynamic(() => import('@/components/AboutMeCard'), {
  ssr: false,
});
const LandingPage = dynamic(() => import('@/components/LandingPage'), {
  ssr: false,
});

export default function Home() {
  const myRef = useRef<MutableRefObject<HTMLDivElement>>(null);
  const [mobileNavbarIsOpen, setMobileNavbarIsOpen] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <main
      className="flex min-h-screen flex-col"
      ref={myRef as unknown as LegacyRef<HTMLBodyElement> | undefined}
    >
      <NavbarMenu
        myRef={myRef}
        isMobile={mobileNavbarIsOpen}
        setIsMobile={setMobileNavbarIsOpen}
      />
      <SocialMediaContact />
      <section className="flex min-h-screen relative" id="section-LandingPage">
        <LandingPage />
      </section>

      <section
        className="flex min-h-[80dvh] flex-col justify-center items-center scroll-mt-4"
        id="section-aboutMe"
      >
        <AboutMeCard />
      </section>
      <section
        className="flex min-h-[80dvh] flex-col justify-center items-center scroll-mt-4"
        id="section-experience"
      >
        <Experience />
      </section>
      <section
        className="flex min-h-[80dvh] flex-col justify-center items-center scroll-mt-4"
        id="section-portfolio"
      >
        <ProjectCards />
      </section>
      <section
        className="flex min-h-[80dvh] justify-center items-center w-full"
        id="section-contact"
      >
        <ContactForm siteKey={siteKey} />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
