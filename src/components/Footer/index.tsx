import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="w-full flex flex-col pt-5 border-t-[1px] px-5 border-slate-100 mt-16 sm:mt-0">
      <div className="relativew-full flex flex-col justify-center items-center text-slate-900 dark:text-slate-200 text-center">
        <Image
          className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full md:max-w-md sm:max-w-md rounded-full p-3 m-2"
          src="/Houssem Eddine Andolssi with background.png"
          alt="Houssem Eddine Andolsi"
          width={100}
          height={100}
          style={{
            height: 'auto',
          }}
        />
        <p className="p-2">all rights reserved © 2024</p>
        <p className="p-2">Made with ♥ by – Houssem Eddine Andolssi</p>
      </div>
    </div>
  );
};

export default Footer;
