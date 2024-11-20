'use client';

import {
  useRef,
  MutableRefObject,
  LegacyRef,
  useState,
  useEffect,
} from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import AboutMeCard from '@/components/AboutMeCard';
import ContactForm from '@/components/ContactForm';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import LandingPage from '@/components/LandingPage';
import NavbarMenu from '@/components/NavbarMenu';
import ProjectCards from '@/components/ProjectCards';
import SocialMediaContact from '@/components/SocialMediaContact';
import Loader from '@/components/Loader';

export default function Home() {
  const [mobileNavbarIsOpen, setMobileNavbarIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const myRef = useRef<MutableRefObject<HTMLDivElement>>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  gsap.registerPlugin(useGSAP);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on mount
  }, []);

  useEffect(() => {
    if (!isLoading) {
      document.body.classList.remove('no-scroll');
    }
  }, [isLoading]);

  useGSAP(() => {
    let tl = gsap.timeline();
    tl.to('.loader .char', {
      yPercent: 20,
      scale: 0.1,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      duration: 1,
      stagger: {
        each: 0.1,
        from: 'start',
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      },
    })
      .to(
        '.loader-bg div',
        {
          delay: 4,
          opacity: 0,
          yPercent: -100,
          ease: 'sine.out',
          stagger: 0.25,
          duration: 1.5,
          onComplete: () => {
            setIsLoading(false);
          },
        },
        '<',
      )
      .to(
        '.loader',
        {
          opacity: 0,
          duration: 1.5,
          ease: 'sine.out',
        },
        '<',
      );
  });

  return (
    <main
      className="flex min-h-screen flex-col"
      ref={myRef as unknown as LegacyRef<HTMLBodyElement> | undefined}
    >
      {isLoading ? (
        <Loader setIsLoading={setIsLoading} />
      ) : (
        <>
          <NavbarMenu
            myRef={myRef}
            isMobile={mobileNavbarIsOpen}
            setIsMobile={setMobileNavbarIsOpen}
          />
          <SocialMediaContact />
          <section
            className="flex min-h-screen relative"
            id="section-LandingPage"
          >
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
        </>
      )}
    </main>
  );
}
