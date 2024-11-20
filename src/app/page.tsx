'use client';

import { LegacyRef } from 'react';
import AboutMeCard from '@/components/AboutMeCard';
import ContactForm from '@/components/ContactForm';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';
import NavbarMenu from '@/components/NavbarMenu';
import ProjectCards from '@/components/ProjectCards';
import SocialMediaContact from '@/components/SocialMediaContact';
import Loader from '@/components/Loader';
import usePage from './usePage';

export default function Home() {
  const { myRef, mobileNavbarIsOpen, setMobileNavbarIsOpen, siteKey } =
    usePage();

  return (
    <main
      className="flex min-h-screen flex-col"
      ref={myRef as unknown as LegacyRef<HTMLBodyElement> | undefined}
    >
      <Loader />
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
