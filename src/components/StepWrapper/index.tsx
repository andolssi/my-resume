import React from 'react';

const StepWrapper = ({
  children,
  className,
  step,
  actualStep,
}: {
  children: React.ReactNode;
  className: string;
  step: number;
  actualStep: number;
}) => {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{step === actualStep && <div className={className}>{children}</div>}</>
  );
};

export default StepWrapper;
