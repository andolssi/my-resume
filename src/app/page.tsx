'use client';
import NavbarMenu from '@/components/NavbarMenu';
import ParticlesTest from '@/components/ParticlesTest';
import SocialMediaContact from '@/components/SocialMediaContact';
import ProjectCards from '@/components/ProjectCards';
import Carousel from '@/components/Carousel';
import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import { logoLinks } from '@/components/Carousel/imageByIndex';
import Experience from '@/components/Experience';
import {
  useRef,
  MutableRefObject,
  LegacyRef,
  useEffect,
  useState,
} from 'react';
import AboutMeCard from '@/components/AboutMeCard';
import LandingPage from '@/components/LandingPage';

export default function Home() {
  const myRef = useRef<MutableRefObject<HTMLDivElement>>(null);
  const contactRef = useRef<MutableRefObject<HTMLDivElement>>(null);
  const [fadeOutClassName, setFadeOutClassName] = useState('');
  const [mobileNavbarIsOpen, setMobileNavbarIsOpen] = useState(false);

  useEffect(() => {
    document.getElementById('tsparticles')?.classList.add('h-full', 'w-full');
  }, []);

  useEffect(() => {
    setFadeOutClassName('opacity-100');
  }, []);

  const handleContactMe = () => {
    (contactRef.current as unknown as HTMLDivElement)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

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
        <LandingPage
          fadeOutClassName={fadeOutClassName}
          handleContactMe={handleContactMe}
        />
      </section>

      <section
        className="flex min-h-[80dvh] flex-col justify-center items-center scroll-mt-4"
        id="section-aboutMe"
      >
        <AboutMeCard handleContactMe={handleContactMe} />
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
        <div
          className="max-w-5xl p-0 sm:p-[3rem] md:p-0 w-[90%] sm:w-full"
          ref={contactRef as any}
        >
          <ContactForm />
        </div>
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
}
