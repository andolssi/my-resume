import Image from 'next/image';
import React from 'react';
import Card from '../Card';
const CARD_DATA = [
  {
    headLine: 'Mpsy.tn',
    subHeadLine: 'Mental Wellness Platform',
    description:
      'mpsy.tn is the first platform in Tunisia entirely dedicated to mental health.',
    callToActionTitle: 'Visit',
    imageSrc: 'MPSY-Screenshot.png',
    link: 'https://mpsy.tn/',
    relatedTechnologies: [
      'MongoDB',
      'Express',
      'React',
      'Nodejs',
      'typescript',
      'jest',
      'tailwindcss',
      'Turborepo',
      'nextjs',
      'docker',
      'kafkajs',
      'nginx',
      '...',
    ],
  },
  {
    headLine: 'Kepler Travel',
    subHeadLine: 'Tour company',
    description:
      'KEPLER travel is a tour operator specializing in circuits, beach vacations, and combined packages to multiple destinations around the world. We provide access to all our...',
    callToActionTitle: 'Visit',
    imageSrc: 'keplertravel-Screenshot.png',
    link: 'https://www.keplertravel.com/',
    relatedTechnologies: [
      'MongoDB',
      'Express',
      'React',
      'Nodejs',
      'typescript',
      'jest',
      'SASS',
      'redux',
      'redux-thunk',
      '...',
    ],
  },
  {
    headLine: 'Ream Movie',
    subHeadLine: 'Moments Revival Platform',
    description:
      'The platform for video clips that combine with your selfies to relive the intensity of a moment gone by.',
    callToActionTitle: 'Visit',
    imageSrc: 'ream-movie-Screenshot.png',
    link: 'https://ream-movie.com/',
    relatedTechnologies: [
      'MongoDB',
      'Express',
      'React',
      'Nodejs',
      'typescript',
      'jest',
      'SASS',
      'redux',
      'redux-thunk',
      '...',
    ],
  },
];
const ProjectCards = () => {
  return (
    <>
      <h1 className="my-10 text-xl lg:text-start font-sans font-medium text-stone-600 dark:text-stone-400">
        Featured<span className="text-[--primary-color]"> Work</span>
      </h1>
      <div className="grid grid-cols-1 justify-items-center w-full gap-4 mx-auto max-w-5xl sm:w-full p-3 lg:p-8 ">
        {CARD_DATA.map((project, index) => (
          <Card
            key={project.headLine}
            headLine={project.headLine}
            subHeadLine={project.subHeadLine}
            description={project.description}
            callToActionTitle={project.callToActionTitle}
            imageSrc={project.imageSrc}
            link={project.link}
            index={index}
            relatedTechnologies={project.relatedTechnologies}
          />
        ))}
      </div>
    </>
  );
};

export default ProjectCards;
