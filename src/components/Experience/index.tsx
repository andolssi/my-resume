import Image from 'next/image';
import React from 'react';

const Experience = () => {
  return (
    <>
      <h1 className="my-10 text-xl lg:text-start font-sans font-medium text-[--primary-color]">
        Experience
      </h1>
      <div className="relative flex flex-col mx-auto max-w-5xl w-[85%] sm:w-full border-[1px] p-3 lg:p-8 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 justify-items-center w-full gap-4 dark:text-stone-200">
          <div className="relative w-full flex justify-center">
            <Image
              className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full h-auto w-1/12 rounded-md"
              src="/edonec-logo.png"
              alt="Houssem Eddine Andolsi"
              width={50}
              height={50}
              sizes="500px"
            />
          </div>
          <h2 className="text-2xl font-semibold">July 2021 - December 2023</h2>
          <div className="flex flex-row">
            <h3 className="text-sm sm:text-base font-semibold">eDonec</h3>
            <div className="h-full w-[1px] bg-slate-400 mx-2" />
            <h3 className="text-sm sm:text-base font-semibold">
              Tunis, Tunisia
            </h3>
          </div>
          <ul className="px-1 sm:px-5">
            <li>
              ✦ Collaborated with a team of developers to design, develop, and
              maintain web applications for Edonec's clients using React and
              React Native.
            </li>
            <li>
              ✦ Leveraged the MERN stack (MongoDB, Express, React, and Node.js)
              to create efficient and scalable web applications that handled a
              high volume of user interactions.
            </li>
            <li>
              ✦ Worked closely with front-end and back-end developers to ensure
              seamless integration of components, enabling smooth and
              interactive user experiences.
            </li>
            <li>
              ✦ Implemented industry best practices and coding standards to
              ensure the delivery of high-quality code, promoting code
              reusability and maintainability
            </li>
            <li>
              ✦ Utilized Redux and React Query for state management, enhancing
              the performance and maintainability of complex applications.
            </li>
            <li>
              ✦ Designed and implemented beautiful and responsive web pages
              using Bootstrap, Tailwind, and other related technologies,
              ensuring a consistent and visually appealing user interface.
            </li>
            <li>
              ✦ Conducted thorough testing and debugging of applications to
              identify and address any issues, ensuring the stability and
              reliability of the software.
            </li>
            <li>
              ✦ Collaborated with UX/UI designers to translate design mockups
              into fully functional and aesthetically pleasing user interfaces.
            </li>
            <li>
              ✦ Developed and integrated RESTful APIs, enabling efficient
              communication between the front-end and back-end components of the
              applications.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Experience;
