import React from 'react';

function ProgressSteps({ step }: { step: number }) {
  return (
    <div className="mt-4 w-dvw flex flex-row items-center justify-center select-none">
      <div className="flex flex-row gap-3">
        {Array(12)
          .fill('')
          .map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-lg m-1 ${
                step >= index + 1 ? 'bg-[--primary-color]' : 'bg-orange-200'
              }`}
            />
          ))}
      </div>
    </div>
  );
}

export default ProgressSteps;
