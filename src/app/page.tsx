'use client';

import { LegacyRef } from 'react';
import dynamic from 'next/dynamic';
import NavbarMenu from '@/components/NavbarMenu';
import LandingPage from '@/components/LandingPage';
import SocialMediaContact from '@/components/SocialMediaContact';
import Loader from '@/components/Loader';
import Footer from '@/components/Footer';
import usePage from './usePage';
const ProjectCards = dynamic(() => import('@/components/ProjectCards'), {
  ssr: false,
});
const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: false,
});
const ContactForm = dynamic(() => import('@/components/ContactForm'), {
  ssr: false,
});
const AboutMeCard = dynamic(() => import('@/components/AboutMeCard'), {
  ssr: false,
});
const DesignHighlights = dynamic(
  () => import('@/components/DesignHighlights'),
  {
    ssr: false,
  },
);

export default function Home() {
  const {
    myRef,
    mobileNavbarIsOpen,
    setMobileNavbarIsOpen,
    siteKey,
    loadingRef,
  } = usePage();

  return (
    <main
      className="flex min-h-screen flex-col"
      ref={myRef as unknown as LegacyRef<HTMLBodyElement> | undefined}
    >
      <div ref={loadingRef}>
        <Loader />
      </div>
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
        className="flex flex-col justify-items-center w-full min-h-[80dvh] justify-center items-center scroll-mt-4"
        id="section-experience"
      >
        <Experience />
      </section>
      <section
        className="flex min-h-[80dvh] flex-col justify-center items-center scroll-mt-4 mb-4"
        id="section-portfolio"
      >
        <ProjectCards />
        <DesignHighlights />
      </section>
      <section
        className="flex min-h-[80dvh] justify-center items-center w-full dark:bg-slate-800/10"
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
