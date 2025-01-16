import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';

const DesignHighlights = () => {
  useGSAP(() => {
    gsap.from('.design-image-container', {
      opacity: 0,
      stagger: {
        amount: 0.5,
        axis: 'x',
        ease: 'power2.out',
      },
      scrollTrigger: {
        trigger: '#design-title',
        start: 'top-=200 70%',
        end: 'bottom+=200 top',
        scrub: 2,
        toggleActions: 'play pause reverse pause',
      },
      ease: 'power2.out',
    });
  });

  const handleClick = () => {
    console.log('Image clicked!');

    toast<string>('🤩Case Study Coming Soon!..', {
      autoClose: 2000,
      position: 'top-right',
      hideProgressBar: false,
      pauseOnHover: true,
    });
  };
  return (
    <>
      <h1
        className="my-10 text-xl lg:text-start font-sans font-medium text-stone-600 dark:text-stone-200"
        id="design-title"
      >
        Design<span className="text-[--primary-color]"> Highlights</span>
      </h1>
      <ToastContainer />
      <div className="columns-[400px] w-full gap-4 px-14 md:px-auto mx-auto max-w-5xl sm:w-full p-3 lg:p-8 mb-14">
        <div
          className="w-full rounded-lg bg-slate-500 mb-4 overflow-hidden design-image-container"
          onClick={handleClick}
        >
          {' '}
          <Image
            className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full h-auto w-full rounded-md hover:scale-125 transition-transform duration-500 ease-in-out hover:cursor-pointer"
            src="/designHighlights/PodcastHero.png"
            alt="Houssem Eddine El Andolsi"
            width={444}
            height={434}
            sizes="500px"
            loading="lazy"
          />
        </div>
        <div
          className="w-full rounded-lg bg-slate-500 mb-4 overflow-hidden design-image-container"
          onClick={handleClick}
        >
          {' '}
          <Image
            className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full h-auto w-full rounded-md hover:scale-125 transition-transform duration-500 ease-in-out hover:cursor-pointer"
            src="/designHighlights/TopPodcastsAndEvents.png"
            alt="Houssem Eddine El Andolsi"
            width={444}
            height={434}
            sizes="500px"
            loading="lazy"
          />
        </div>
        <div
          className="w-full rounded-lg bg-slate-500 mb-4 overflow-hidden design-image-container"
          onClick={handleClick}
        >
          {' '}
          <Image
            className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full h-auto w-full rounded-md hover:scale-125 transition-transform duration-500 ease-in-out hover:cursor-pointer"
            src="/designHighlights/ItemList.png"
            alt="Houssem Eddine El Andolsi"
            width={444}
            height={434}
            sizes="500px"
            loading="lazy"
          />
        </div>
        <div
          className="w-full rounded-lg bg-slate-500 mb-4 overflow-hidden design-image-container"
          onClick={handleClick}
        >
          {' '}
          <Image
            className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full h-auto w-full rounded-md hover:scale-125 transition-transform duration-500 ease-in-out hover:cursor-pointer"
            src="/designHighlights/newsletter.png"
            alt="Houssem Eddine El Andolsi"
            width={444}
            height={434}
            sizes="500px"
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default DesignHighlights;
