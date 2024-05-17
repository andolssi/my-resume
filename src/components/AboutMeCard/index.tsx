import Image from 'next/image';
import React from 'react';
import Carousel from '../Carousel';
import { logoLinks } from '../Carousel/imageByIndex';

const AboutMeCard = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-center max-w-5xl mx-auto w-full">
        <div className="relative p-3 m-3 md:px-5 px-10 w-full flex justify-center">
          <Image
            className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full h-auto"
            src="/mern-dev-img-color-adjusted.webp"
            alt="Houssem Eddine El Andolsi"
            width={444}
            height={434}
            sizes="500px"
          />
        </div>
        <div className="flex flex-col justify-center items-center lg:items-start w-full text-center lg:text-start lg:w-full ml-5 p-3">
          <h1 className="mt-2 text-xl lg:text-start font-sans font-medium text-[--primary-color]">
            ABOUT ME
          </h1>
          <p className="pt-3 lg:w-3/4 w-4/5 text-sm dark:text-stone-200 overflow-hidden">
            Highly motivated MERN Stack Developer (with Mobile Development
            Experience) with 3+ years of experience building and maintaining
            scalable web applications using the MERN stack and React Native.
            <br />
            My journey began in 2014, crafting worlds and characters as a 3d
            artist. This honed my problem-solving, attention to detail, and
            fast-paced work ethic. But the spark for code ignited with C#,
            leading me to JavaScript, TypeScript, and React. <br />
            Learning proved swift thanks to my analytical skills, landing me a
            Full stack developer role at Edonec. <br />
            Through hands-on projects, valuable feedback from my colleagues, and
            constant practice, I improved my MERN-stack skills, and it gave me
            the confidence to tackle any challenge.
          </p>

          <p className="pb-2 pt-6 lg:w-3/4 w-4/5 text-xs dark:text-stone-300">
            Need captivating content that keeps readers hooked? My words paint a
            picture. Hire me to tell your story.
          </p>
          <button
            type="button"
            className="my-3 w-fit mx-1 md:mx-2 text-sm md:text-base  bg-[--primary-color]
       text-white rounded-md p-2 px-6 hover:border-black filter drop-shadow-lg 
       hover:translate-y-1 hover:scale-105 transition-all font-sans font-medium dark:text-stone-200"
          >
            <a href="mailto:andolsihoussemeddine@gmail.com">Hire Me</a>
          </button>
        </div>
      </div>

      <div className="flex justify-center w-full relative py-2 mt-12">
        <div className="absolute left-0 top-0 w-full h-full bg-slate-100 dark:bg-slate-800 blur-md opacity-70" />
        <div className="max-w-5xl w-full">
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
