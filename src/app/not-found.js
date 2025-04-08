import Link from 'next/link';
import Image from 'next/image';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-xl md:text-4xl font-bold text-gray-800 z-10 text-center">
        404 - Page Not Found
      </h1>
      <p className="text-base md:text-lg text-gray-500 z-10 text-center">
        The page you are looking for could not be found.
      </p>
      <div className="absolute w-full h-full z-0">
        <Image
          className="relative dark:drop-shadow-[0_0_0.2rem_#ffffff70]"
          src="/404NotFound.webp"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
          alt="404 Not Found"
        />
      </div>
      <Link
        href="/"
        className="my-5 w-fit mx-1 md:mx-2 text-xs md:text-base bg-[--primary-color]
       text-white rounded-md p-3 hover:border-black filter drop-shadow-lg 
       hover:translate-y-1 hover:scale-105 transition-all font-sans font-medium dark:hover:bg-orange-50 dark:hover:text-[--primary-color] px-3 py-2"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
