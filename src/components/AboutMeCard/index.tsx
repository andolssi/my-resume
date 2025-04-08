import Image from 'next/image';
import React, { useEffect } from 'react';
import Carousel from '../Carousel';
import { logoLinks } from '../Carousel/imageByIndex';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AboutMeCard = () => {
  useGSAP(() => {
    gsap.to('.embla__slide__img', {
      duration: 2,
      y: 2,
      scale: 0.9,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
    });

    let tl = gsap.timeline();
    gsap.set('.about-me-img', { opacity: 0, scale: 0.2 });
    tl.to('.about-me-img', {
      opacity: 1,
      scale: 1,
      ease: 'back',
      scrollTrigger: {
        trigger: '#section-aboutMe',
        start: 'top 80%',
        end: '+=400',
        scrub: 1,
        toggleActions: 'play pause reverse pause',
      },
    });
  });

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center max-w-5xl mx-auto w-full">
        <div className="relative p-3 m-3 md:px-5 px-10 w-full flex justify-center about-me-img">
          <Image
            className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full h-auto rounded-lg"
            src="/mern-dev-img-color-adjusted.webp"
            alt="Houssem Eddine El Andolsi"
            width={444}
            height={444}
            sizes="500px"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-center items-center lg:items-start w-full text-center lg:text-start lg:w-full ml-5 p-3">
          <h1 className="mt-2 text-xl lg:text-start font-sans font-medium text-[--primary-color]">
            ABOUT ME
          </h1>
          <p className="pt-3 lg:w-3/4 w-4/5 text-sm dark:text-stone-200 overflow-hidden">
            With 10+ years in the digital world, I began as a 3D art director in
            mobile games, blending visual storytelling with user psychology. My
            journey led me to full-stack development in a tech startup, where my
            artistic side naturally steered me toward UI/UX design.
            <br />
            <br />
            Today, I focus on front-end development and UX/UI design, using my
            creative and technical background to craft thoughtful, user-centered
            digital experiences.
          </p>

          <p className="pb-2 pt-6 lg:w-3/4 w-4/5 text-xs dark:text-stone-300">
            Need captivating content that keeps readers hooked? My words paint a
            picture. Hire me to tell your story.
          </p>
          <button
            type="button"
            className="my-3 w-fit mx-1 md:mx-2 text-sm md:text-base bg-[--primary-color]
       text-white rounded-md p-2 px-6 py-2 hover:border-black filter drop-shadow-lg dark:hover:bg-orange-50 dark:hover:text-[--primary-color]
       hover:translate-y-1 hover:scale-105 transition-all font-sans font-medium dark:text-stone-200"
          >
            <a href="mailto:andolsihoussemeddine@gmail.com">Hire Me</a>
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full relative py-2 mt-12">
        <div className="absolute left-0 top-0 w-full h-full bg-slate-100 dark:bg-slate-800 blur-md opacity-70" />
        <div className="max-w-5xl w-full select-none cursor-pointer">
          <Carousel
            slides={Array.from(Array(logoLinks.length).keys())}
            options={{
              loop: true,
              slidesToScroll: 'auto',
              containScroll: 'trimSnaps',
              duration: 35,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AboutMeCard;
