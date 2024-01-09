import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

const MobileNavbar = ({
  scrollToIndex,
  isMobile,
  setIsMobile,
  currentIndex,
}: {
  scrollToIndex: (index: number) => void;
  isMobile: boolean;
  setIsMobile: Dispatch<SetStateAction<boolean>>;
  currentIndex: number | null;
}) => {
  const [fadeInOn, setFadeInOn] = useState(false);

  useEffect(() => {
    const MyTimeOut = setTimeout(function () {
      setFadeInOn(isMobile);
    }, 0);

    return () => {
      clearTimeout(MyTimeOut);
    };
  }, [isMobile]);

  const closeNavbar = () => {
    setFadeInOn(false);
    const closeNavbarTimeOut = setTimeout(function () {
      setIsMobile(false);
    }, 0);
  };

  return (
    <div
      className={`z-40 fixed top-0 left-0 px-10 bg-white dark:bg-slate-800 w-full h-dvh 
      opacity-0 transition-opacity duration-1000 ease-in-out ${
        isMobile ? '' : 'hidden'
      } ${fadeInOn ? 'opacity-100' : ''}`}
    >
      <div className="p-5 pt-0 mt-2 absolute top-0 right-0 cursor-pointer hover:scale-105 hover:translate-y-1 duration-200 ease-in-out">
        <button
          type="button"
          className="font-semibold text-xl text-[--secondary-color] hover:text-[--primary-color] dark:text-slate-200"
          onClick={closeNavbar}
        >
          X
        </button>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div
          className="transition duration-500 ease-in-out 
        hover:-translate-y-1 hover:scale-110 font-semibold text-xl sm:text-sm
        fill-[--secondary-color] hover:fill-[--primary-color]"
        >
          <button
            type="button"
            className={`my-4 mx-3 ${
              currentIndex === 0
                ? 'text-[--primary-color] hover:text-[--primary-color]'
                : 'text-[--secondary-color] hover:text-[--primary-color] dark:text-slate-200'
            } font-medium`}
            onClick={() => {
              closeNavbar();
              scrollToIndex(0);
            }}
          >
            Home
          </button>
        </div>
        <div
          className="transition duration-500 ease-in-out 
          hover:-translate-y-1 hover:scale-110 font-semibold text-xl sm:text-sm
          fill-[--secondary-color] hover:fill-[--primary-color]"
        >
          <button
            type="button"
            className={`my-4 mx-3 ${
              currentIndex === 1
                ? 'text-[--primary-color] hover:text-[--primary-color]'
                : 'text-[--secondary-color] hover:text-[--primary-color] dark:text-slate-200'
            } font-medium`}
            onClick={() => {
              closeNavbar();
              scrollToIndex(1);
            }}
          >
            About Me
          </button>
        </div>
        <div
          className="transition duration-500 ease-in-out 
        hover:-translate-y-1 hover:scale-110 font-semibold text-xl sm:text-sm
        fill-[--secondary-color] hover:fill-[--primary-color]"
        >
          <button
            type="button"
            className={`my-4 mx-3 ${
              currentIndex === 2
                ? 'text-[--primary-color] hover:text-[--primary-color]'
                : 'text-[--secondary-color] hover:text-[--primary-color] dark:text-slate-200'
            } font-medium`}
            onClick={() => {
              closeNavbar();
              scrollToIndex(2);
            }}
          >
            Experience
          </button>
        </div>
        <div
          className="transition duration-500 ease-in-out 
        hover:-translate-y-1 hover:scale-110 font-semibold text-xl sm:text-sm
        fill-[--secondary-color] hover:fill-[--primary-color]"
        >
          <button
            type="button"
            className={`my-4 mx-3 ${
              currentIndex === 3
                ? 'text-[--primary-color] hover:text-[--primary-color]'
                : 'text-[--secondary-color] hover:text-[--primary-color] dark:text-slate-200'
            } font-medium`}
            onClick={() => {
              scrollToIndex(3);
              setIsMobile(!isMobile);
            }}
          >
            Portfolio
          </button>
        </div>
        <div
          className="transition duration-500 ease-in-out 
        hover:-translate-y-1 hover:scale-110 font-semibold text-xl sm:text-sm
        fill-[--secondary-color] hover:fill-[--primary-color]"
        >
          <button
            type="button"
            className={`my-4 mx-3 ${
              currentIndex === 4
                ? 'text-[--primary-color] hover:text-[--primary-color]'
                : 'text-[--secondary-color] hover:text-[--primary-color] dark:text-slate-200'
            } font-medium`}
            onClick={() => {
              scrollToIndex(4);
              setIsMobile(!isMobile);
            }}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
