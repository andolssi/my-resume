'use client';

import React, { useState } from 'react';
import BigForm from '@/components/BigForm';
import ProgressButtons from '@/components/ProgressButtons';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="mx-12 md:mx-24 flex flex-col justify-center items-center min-h-screen my-12">
      <BigForm step={step} setStep={setStep} />

      <ProgressButtons step={step} />
    </div>
  );
};

export default MultiStepForm;
