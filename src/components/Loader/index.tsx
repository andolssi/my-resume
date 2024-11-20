/* eslint-disable react/jsx-wrap-multilines */
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';

const Loader = ({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="absolute left-0 top-0 w-full flex flex-row items-center justify-center h-screen loader-bg z-40">
        <div className="w-full h-full bg-slate-100" />
        <div className="w-full h-full bg-slate-100" />
        <div className="w-full h-full bg-slate-100" />
        <div className="w-full h-full bg-slate-100" />
      </div>
      <div className="absolute left-0 top-0 w-full flex flex-row items-center justify-center h-screen loader z-40 text-[--primary-color] text-4xl font-light space-x-4">
        <h3 className="char">L</h3>
        <h3 className="char">O</h3>
        <h3 className="char">A</h3>
        <h3 className="char">D</h3>
        <h3 className="char">I</h3>
        <h3 className="char">N</h3>
        <h3 className="char">G</h3>
        <h3 className="char">.</h3>
        <h3 className="char">.</h3>
        <h3 className="char">.</h3>
      </div>
    </>
  );
};

export default Loader;
