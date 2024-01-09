import Link from 'next/link';
import React from 'react';
import FacebookSVG from '../SVG/socialMedia/FacebookSVG';
import GithubSVG from '../SVG/socialMedia/GithubSVG';
import LinkedInSVG from '../SVG/socialMedia/LinkedInSVG';
import { socialMediaLinks } from '.';

const Links = ({
  className,
  width = 1.2,
}: {
  className?: string;
  width?: number;
}) => {
  return (
    <div
      className={
        className
          ? `w-full z-20 flex items-center justify-end ${className}`
          : 'w-full z-20 flex flex-col items-center justify-end'
      }
    >
      <div className="my-2 transition-all duration-500 ease-in-out hover:-translate-y-[1px] hover:scale-110">
        <Link
          target="_blank"
          href={socialMediaLinks.linkedInLink}
          className="fill-[--primary-color]  dark:fill-slate-200  dark:hover:fill-[--primary-color] hover:fill-[--secondary-color]"
        >
          <LinkedInSVG width={12 * width} height={12 * width} />
        </Link>
      </div>
      <div className="my-2 transition-all duration-500 ease-in-out hover:-translate-y-[1px] hover:scale-110">
        <Link
          target="_blank"
          href={socialMediaLinks.githubLink}
          className="fill-[--primary-color]  dark:fill-slate-200  dark:hover:fill-[--primary-color] hover:fill-[--secondary-color]"
        >
          <GithubSVG width={13 * width} height={13 * width} />
        </Link>
      </div>
      <div className="my-2 transition-all duration-500 ease-in-out hover:-translate-y-[1px] hover:scale-110">
        <Link
          target="_blank"
          href={socialMediaLinks.facebookLink}
          className="fill-[--primary-color]  dark:fill-slate-200  dark:hover:fill-[--primary-color] hover:fill-[--secondary-color]"
        >
          <FacebookSVG width={12 * width} height={12 * width} />
        </Link>
      </div>
    </div>
  );
};

export default Links;
