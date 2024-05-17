'use client';

import React from 'react';
import Links from './Links';

export const socialMediaLinks = {
  facebookLink: 'https://www.facebook.com/houssemandolsi',
  linkedInLink: 'https://www.linkedin.com/in/houssem-eddine-el-andolsi',
  githubLink: 'https://github.com/andolssi',
  gitlabLink: 'https://gitlab.com/Andolssi',
};
const SocialMediaContact = () => {
  return (
    <div className="fixed right-0 top-1/2 translate-y-[-50%] rounded-2xl z-20">
      <div className="w-full z-20 flex flex-col items-center justify-end">
        <div>
          <p className="rotate-90 text-sm lg:text-lg text-[--primary-color] dark:text-slate-200 font-light translate-y-[-150%]">
            follow me
          </p>
        </div>
        <div className="-ml-[1px] w-[1px] h-[5rem] bg-[--primary-color] dark:bg-slate-200" />
        <Links />
      </div>
    </div>
  );
};

export default SocialMediaContact;
