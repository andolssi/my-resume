import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="w-full flex flex-col pt-5 border-t-[2px] px-5 border-slate-100/45 mt-16 sm:mt-0">
      <div className="relativew-full flex flex-col justify-center items-center text-slate-900 dark:text-slate-200 text-center">
        <p className="p-2">all rights reserved © 2024</p>
        <p className="p-2">Made with ♥ by – Houssem Eddine Andolssi</p>
      </div>
    </div>
  );
};

export default Footer;
