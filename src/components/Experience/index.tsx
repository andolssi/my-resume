import Image from 'next/image';
import React from 'react';

const Experience = () => {
  return (
    <>
      <h1 className="my-10 text-xl lg:text-start font-sans font-medium text-[--primary-color]">
        Experience
      </h1>
      <div className="relative flex flex-col sm:flex-row mx-auto max-w-5xl w-[85%] sm:w-full lg:p-8 gap-3">
        <div className="grid grid-cols-1 justify-items-center w-full gap-2 dark:text-stone-200 border-[1px] p-3 rounded-lg shadow-sm text-center sm:text-start">
          <div className="relative w-full flex justify-center max-h-fit">
            <Image
              className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full h-auto w-2/12 rounded-md mx-3"
              src="/Galactech.png"
              alt="Galactech.png"
              width={20}
              height={50}
              sizes="500px"
              loading="lazy"
            />
            <Image
              className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full h-auto w-2/12 rounded-md mx-3"
              src="/Awayzen.png"
              alt="Awayzen.png"
              width={20}
              height={50}
              sizes="500px"
              loading="lazy"
            />
          </div>
          <h2 className="text-lg md:text-2xl font-semibold max-h-fit">
            2016 - 2020
          </h2>
          <div className="flex flex-row max-h-12">
            <h3 className="text-sm md:text-base font-semibold">
              Galactech - Awayzen Studio
            </h3>
            <div className="h-full w-[1px] bg-slate-400 mx-2" />
            <h3 className="text-sm md:text-base font-semibold">
              Tunis, Tunisia
            </h3>
          </div>
          <div className="px-1 sm:px-5">
            At Galactech and Awayzen Studio, I worked as a 3D artist,
            supervising the entire process of creating 3D art for video games.
            My responsibilities included designing and modeling detailed 3D
            characters, crafting smooth animations, and implementing advanced
            rigging and skinning techniques to ensure optimal performance in
            game engines. <br />
            These roles allowed me to develop a strong understanding of 3D
            workflows, manage creative pipelines, and deliver high-quality
            assets in dynamic startup environments.
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-center w-full gap-4 dark:text-stone-200 border-[1px] p-3 rounded-lg shadow-sm text-center sm:text-start">
          <div className="relative w-full flex justify-center max-h-fit">
            <Image
              className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full h-auto w-2/12 rounded-md aspect-auto"
              src="/edonec-logo.png"
              alt="edonec-logo.png"
              width={50}
              height={50}
              sizes="500px"
              loading="lazy"
            />
          </div>
          <h2 className="text-lg md:text-2xl font-semibold">2021 - 2024</h2>
          <div className="flex flex-row">
            <h3 className="text-sm md:text-base font-semibold">eDonec</h3>
            <div className="h-full w-[1px] bg-slate-400 mx-2" />
            <h3 className="text-sm md:text-base font-semibold">
              Tunis, Tunisia
            </h3>
          </div>
          <div className="px-1 sm:px-5 min-h-24">
            At Edonec, I worked as a Full Stack JavaScript Developer, gaining
            hands-on experience in building applications using the MERN stack
            and React Native. <br />I later transitioned to contributing to the
            development of an event-driven microservices architecture inspired
            by Netflix. My role involved creating reusable components, and
            designing microservices, and optimizing workflows to support
            scalable and maintainable solutions. Working in a fast-paced startup
            environment, I developed a strong foundation in modern development
            practices and collaborative project delivery.
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
