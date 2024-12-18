import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Iprops = {
  headLine: string;
  subHeadLine: string;
  callToActionTitle: string;
  description?: string;
  imageSrc?: string;
  link: string;
  index: number;
  relatedTechnologies: string[];
};

const Card = ({
  imageSrc,
  headLine,
  subHeadLine,
  description,
  callToActionTitle,
  link,
  index,
  relatedTechnologies,
}: Iprops) => {
  const handleClick = () => () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };
  return (
    <div
      className={`p-1 min-[400px]:p-4 rounded-md my-4 flex justify-between ${
        index % 2 === 0 ? 'sm:flex-row-reverse' : 'sm:flex-row'
      } flex-col card`}
    >
      <div
        className="relative w-full p-3 sm:p-0 hover:scale-105 hover:cursor-pointer dark:text-stone-200 transition-all ease-in-out"
        onClick={handleClick()}
      >
        <Image
          className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full h-auto w-full rounded-md"
          src={`${
            imageSrc
              ? `/websitScreenshots/${imageSrc}`
              : '/mern-dev-img-color-adjusted.png'
          }`}
          alt="Houssem Eddine El Andolsi"
          width={444}
          height={434}
          sizes="500px"
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-white bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-20" />
      </div>
      <div className="flex flex-col justify-center h-full px-8 mt-3 sm:m-0  text-center sm:text-start">
        <div>
          <h1 className="text-2xl font-semibold hover:text-[--primary-color] hover:-translate-y-[3px] transition-all ease-in-out">
            {' '}
            <Link target="_blank" rel="noopener noreferrer" href={link}>
              {headLine}
            </Link>
          </h1>
          <h2 className="text-sm sm:text-base font-semibold">{subHeadLine}</h2>
        </div>
        <div>
          <p className="text-sm line-clamp-3">{description}</p>
        </div>
        <div className="flex flex-row flex-wrap w-full pt-3 justify-center sm:justify-start">
          <p className="mr-2">Technologies Used:</p>
          <div className="w-full h-[1px] bg-slate-300 my-1" />

          {relatedTechnologies.map((tech) => (
            <p key={tech} className="text-sm line-clamp-3 mx-2">
              {tech}
            </p>
          ))}
        </div>
        <div className="flex flex-row mt-5 justify-center">
          <Link
            className={`w-full ${
              index % 2 === 0
                ? 'text-[--primary-color] hover:text-slate-900 dark:hover:text-slate-200'
                : 'hover:text-[--primary-color]'
            } rounded-md py-3 filter drop-shadow-lg 
            hover:translate-y-1 hover:scale-105 transition-all font-semibold text-lg ease-in-out`}
            target="_blank"
            rel="noopener noreferrer"
            href={link}
          >
            {callToActionTitle}
            <span className="text-sm">{` ⟶`}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
