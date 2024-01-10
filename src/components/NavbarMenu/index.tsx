'use client';

import React, {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import MobileNavbar from './MobileNavbar';
import MenuSVG from '../SVG/MenuSVG';
import SunshineSVG from '../SVG/DarkModeSVG';
import ThemeToggle from '../ThemeToggle';

const NavbarMenu = ({
  myRef,
  isMobile,
  setIsMobile,
}: {
  myRef: RefObject<MutableRefObject<HTMLDivElement>>;
  isMobile: boolean;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  const calculateIndex = (scrollY: number, listNode: HTMLDivElement) => {
    // Calculate index based on scroll position and list node's sections:
    const sections = Array.from(
      listNode.querySelectorAll('[id^="section"]'),
    ) as HTMLDivElement[];
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionTop = section.getBoundingClientRect().top;
      // Adjust thresholds for visibility based on your needs:
      if (
        scrollY > sectionTop - 100 &&
        scrollY < sectionTop + section.offsetHeight - 200
      ) {
        return i;
      }
    }

    // 3. Fallback to default index (if none of the above conditions match):
    return 0;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (myRef.current) {
        setScrollY(window.scrollY - 100);
        const currentIndex = calculateIndex(
          scrollY,
          myRef.current as unknown as HTMLDivElement,
        );
        setCurrentIndex(currentIndex);
      }
    };

    // just trigger this so that the initial state
    // is updated as soon as the component is mounted
    // related: https://stackoverflow.com/a/63408216
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    const listNode = myRef.current;
    if (!listNode) return;
    // This line assumes a particular DOM structure:
    const sectionNode = (
      listNode as unknown as HTMLDivElement
    ).querySelectorAll('[id^="section"]')[index];
    sectionNode.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  };

  return (
    <div className="z-30 w-full fixed backdrop-blur-md bg-white/30 sm:h-auto h-[3.2rem] dark:bg-white/15 flex flex-row justify-center">
      <button
        type="button"
        className="fill-[--secondary-color] hover:fill-[--primary-color]  dark:fill-slate-200 dark:hover:fill-white p-[0.55rem] m-[0.8rem] ml-8 rounded-lg absolute top-0 left-0 sm:hidden cursor-pointer transition duration-500 ease-in-out hover:scale-110 z-40"
        onClick={() => setIsMobile(!isMobile)}
      >
        <MenuSVG />
      </button>

      <MobileNavbar
        scrollToIndex={scrollToIndex}
        isMobile={isMobile}
        setIsMobile={setIsMobile}
        currentIndex={currentIndex}
      />
      <div className="sm:flex flex-row justify-center px-20 lg:px-40 my-2 items-center hidden">
        <div
          className="mx-2 sm:mx-3 lg:mx-8 my-2 transition duration-500 ease-in-out 
        hover:-translate-y-1 hover:scale-105"
        >
          <button
            type="button"
            className={` ${
              currentIndex === 0
                ? 'text-[--primary-color] hover:text-[--primary-color]'
                : 'text-[--secondary-color] hover:text-[--primary-color] dark:text-slate-200 '
            } font-medium text-xs sm:text-sm`}
            onClick={() => scrollToIndex(0)}
          >
            Home
          </button>
        </div>
        <div
          className="mx-2 sm:mx-3 lg:mx-8 my-2 transition duration-500 ease-in-out 
          hover:-translate-y-1 hover:scale-110"
        >
          <button
            type="button"
            className={` ${
              currentIndex === 1
                ? 'text-[--primary-color] hover:text-[--primary-color]'
                : 'text-[--secondary-color] hover:text-[--primary-color] dark:text-slate-200'
            } font-medium text-xs sm:text-sm`}
            onClick={() => scrollToIndex(1)}
          >
            About Me
          </button>
        </div>
        <div
          className="mx-2 sm:mx-3 lg:mx-8 my-2 transition duration-500 ease-in-out 
        hover:-translate-y-1 hover:scale-110"
        >
          <button
            type="button"
            className={` ${
              currentIndex === 2
                ? 'text-[--primary-color] hover:text-[--primary-color]'
                : 'text-[--secondary-color] hover:text-[--primary-color] dark:text-slate-200'
            } font-medium text-xs sm:text-sm`}
            onClick={() => scrollToIndex(2)}
          >
            Experience
          </button>
        </div>
        <div
          className="mx-2 sm:mx-3 lg:mx-8 my-2 transition duration-500 ease-in-out 
        hover:-translate-y-1 hover:scale-110"
        >
          <button
            type="button"
            className={` ${
              currentIndex === 3
                ? 'text-[--primary-color] hover:text-[--primary-color]'
                : 'text-[--secondary-color] hover:text-[--primary-color] dark:text-slate-200'
            } font-medium text-xs sm:text-sm`}
            onClick={() => scrollToIndex(3)}
          >
            Portfolio
          </button>
        </div>
        <div
          className="mx-2 sm:mx-3 lg:mx-8 my-2 transition duration-500 ease-in-out 
        hover:-translate-y-1 hover:scale-110"
        >
          <button
            type="button"
            className={` ${
              currentIndex === 4
                ? 'text-[--primary-color] hover:text-[--primary-color]  dark:text-slate-200  dark:hove:text-white'
                : 'text-[--secondary-color] hover:text-[--primary-color] dark:text-slate-200'
            } font-medium text-xs sm:text-sm`}
            onClick={() => scrollToIndex(4)}
          >
            Contact
          </button>
        </div>
      </div>
      <div className="flex justify-end items-center">
        <div className="p-[0.55rem] m-[0.5rem] mr-8 rounded-lg absolute top-0 right-0 cursor-pointer transition duration-500 ease-in-out hover:scale-110 z-30">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default NavbarMenu;
