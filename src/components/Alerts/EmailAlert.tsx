import React from 'react';

const EmailAlert = ({
  alertStatus,
}: {
  alertStatus: {
    successAlert: boolean;
    failureAlert: boolean;
  };
}) => {
  return (
    <div className="relative md:col-start-2 md:col-span-1">
      {alertStatus.successAlert && (
        <div
          className="bg-green-100 dark:bg-green-800 border border-green-400 dark:border-green-200  text-green-700 dark:text-white px-4 py-3 rounded absolute left-0 top-0 w-full"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">
            {' '}
            Your email is successfully received. Thank you for reaching out!
          </span>
        </div>
      )}
      {alertStatus.failureAlert && (
        <div
          className="bg-red-100 dark:bg-red-800 border border-red-400 dark:border-red-200 text-red-700 dark:text-white px-4 py-3 rounded absolute left-0 top-0 w-full"
          role="alert"
        >
          <strong className="font-bold">Failure!</strong>
          <span className="block sm:inline">
            {' '}
            Your email could not be received. Please try again.
          </span>
        </div>
      )}
    </div>
  );
};

export default EmailAlert;
