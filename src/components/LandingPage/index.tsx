import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import ParticlesComponent from '../ParticlesComponent';
import { useTheme } from '@/components/ThemePreferenceProvider';

const LandingPage = ({
  fadeOutClassName,
  handleContactMe,
}: {
  fadeOutClassName: string;
  handleContactMe: () => void;
}) => {
  const { theme } = useTheme();

  return (
    <>
      <div
        className={`absolute top-0 left-0 h-full w-full ${
          theme === 'dark' ? '' : 'bg-gradient-to-t from-white'
        }`}
      >
        <ParticlesComponent />
      </div>
      <div className="z-10 lg:max-w-7xl max-w-5xl mx-auto w-full text-sm md:px-12 lg:px-28 flex flex-col lg:flex-row-reverse justify-center items-center relative ">
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative flex self-center sm:mt-6 md:mt-6 lg:m-0">
            <Image
              className={`${
                theme === 'dark' ? 'hidden' : ''
              } "relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full md:max-w-md sm:max-w-md h-auto"`}
              src="/Houssem Eddine Andolssi with design without background light.png"
              alt="Houssem Eddine Andolsi"
              width={454.8}
              height={396.2}
              priority
            />
            <Image
              className={`${
                theme === 'dark' ? '' : 'hidden'
              } "relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full md:max-w-md sm:max-w-md h-auto"`}
              src="/Houssem Eddine Andolssi with design without background dark.png"
              alt="Houssem Eddine Andolsi"
              width={454.8}
              height={396.2}
              priority
            />
          </div>
        </div>
        <div
          className={`relative flex flex-col justify-center items-center  
    lg:items-start p-3 pt-0 mt-0 opacity-0 transition-opacity 
    duration-1000 ease-in-out delay-100 ${fadeOutClassName}`}
        >
          <h2 className="m-2 text-xl text-center lg:text-start font-sans font-light text-slate-700 dark:text-stone-200">
            Full stack developer
          </h2>
          <h1 className="m-10 lg:m-2 my-0 text-3xl md:text-4xl lg:text-5xl text-center lg:text-start font-sans font-semibold text-slate-700 dark:text-stone-200">
            Hello, I'm{' '}
            <span className="text-[--primary-color] uppercase">
              Houssem eddine Andolssi
            </span>
          </h1>
          <h2 className="m-2 mt-1 text-sm md:text-sm text-center lg:text-start font-sans w-4/5 text-slate-700 dark:text-stone-200">
            Combining my creative soul with a developer's logic, I build
            seamless web experiences that are both beautiful and powerful.
          </h2>
          <div>
            <button
              type="button"
              className="my-5 w-fit mx-1 md:mx-2 text-xs md:text-base bg-[--primary-color]
       text-white rounded-md p-3 hover:border-black filter drop-shadow-lg 
       hover:translate-y-1 hover:scale-105 transition-all font-sans font-medium"
              onClick={handleContactMe}
            >
              Contact Me
            </button>

            <Link
              className="my-4 w-fit mx-1 md:mx-2 border-[1px] text-xs md:text-base border-slate-700 dark:border-slate-200
       text-slate-600 dark:text-slate-200 rounded-md p-3 hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white filter drop-shadow-lg 
       hover:translate-y-1 hover:scale-105 transition-all font-sans font-medium"
              target="_blank"
              rel="noopener noreferrer"
              href="/CV Houssem Edine Andolsi.pdf"
              download
            >
              Download CV
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
