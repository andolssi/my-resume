'use client';

import BigForm from '@/components/BigForm';
import ProgressSteps from '@/components/ProgressSteps';
import React, { useState } from 'react';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const reCAPTCHASiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <div className="mx-12 md:mx-24 flex flex-col justify-center items-center min-h-screen my-12">
      <BigForm
        step={step}
        setStep={setStep}
        reCAPTCHASiteKey={reCAPTCHASiteKey}
      />

      <ProgressSteps step={step} />
    </div>
  );
};

export default MultiStepForm;
