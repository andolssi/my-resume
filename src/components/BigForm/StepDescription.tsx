import React from 'react';

const STEP_DESCRIPTION_LIST = [
  {
    step: 1,
    firstPartOfDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate eligendi reprehenderit vero placeat delectus quaerat',
    secondPartOfDescription:
      'itaque, ex ab pariatur, atque expedita exercitationem natus, dolorum optio ipsa dolore odit aliquam laboriosam?',
  },
  {
    step: 2,
    firstPartOfDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate eligendi reprehenderit vero placeat delectus quaerat',
    secondPartOfDescription:
      'itaque, ex ab pariatur, atque expedita exercitationem natus, dolorum optio ipsa dolore odit aliquam laboriosam?',
  },
  {
    step: 3,
    firstPartOfDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate eligendi reprehenderit vero placeat delectus quaerat',
    secondPartOfDescription:
      'itaque, ex ab pariatur, atque expedita exercitationem natus, dolorum optio ipsa dolore odit aliquam laboriosam?',
  },
  {
    step: 4,
    firstPartOfDescription:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus voluptate eligendi reprehenderit vero placeat delectus quaerat',
    secondPartOfDescription:
      'itaque, ex ab pariatur, atque expedita exercitationem natus, dolorum optio ipsa dolore odit aliquam laboriosam?',
  },
  {
    step: 5,
    firstPartOfDescription: 'The last first description',
    secondPartOfDescription: 'The last second description!!!',
  },
  {
    step: 6,
    firstPartOfDescription: 'The last first description',
    secondPartOfDescription: 'The last second description!!!',
  },
  {
    step: 7,
    firstPartOfDescription: 'The last first description',
    secondPartOfDescription: 'The last second description!!!',
  },
  {
    step: 8,
    firstPartOfDescription: 'The last first description',
    secondPartOfDescription: 'The last second description!!!',
  },
  {
    step: 9,
    firstPartOfDescription: 'The last first description',
    secondPartOfDescription: 'The last second description!!!',
  },
  {
    step: 10,
    firstPartOfDescription: 'The last first description',
    secondPartOfDescription: 'The last second description!!!',
  },
  {
    step: 11,
    firstPartOfDescription: 'The last first description',
    secondPartOfDescription: 'The last second description!!!',
  },
  {
    step: 12,
    firstPartOfDescription: 'The last first description',
    secondPartOfDescription: 'The last second description!!!',
  },
  {
    step: 13,
    firstPartOfDescription: 'The last first description',
    secondPartOfDescription: 'The last second description!!!',
  },
];

function StepDescription({ step }: { step: number }) {
  return (
    <div className="flex flex-col justify-start w-full self-center">
      <h2 className="text-lg font-medium leading-7 text-gray-900 dark:text-gray-200 my-3">
        Quetion number {step}
      </h2>
      <h3 className="font-normal">Description</h3>
      <p className="font-light my-1 w-full">
        {STEP_DESCRIPTION_LIST[step - 1].firstPartOfDescription}
      </p>
      <p className="font-light my-1 w-full">
        {STEP_DESCRIPTION_LIST[step - 1].secondPartOfDescription}
      </p>
    </div>
  );
}

export default StepDescription;
