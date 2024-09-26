import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {' '}
       
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-lg text-gray-500">
        The page you are looking for could not be found.
      </p>
      <Link href="/">
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Go to Homepage
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
