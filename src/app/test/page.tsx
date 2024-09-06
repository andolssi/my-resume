'use client';

import React, { useState } from 'react';
import BigForm from '@/components/BigForm';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="mx-12 md:mx-24 flex flex-col justify-center items-center h-screen">
      <BigForm step={step} setStep={setStep} />

      <div className="mt-4 w-dvw flex flex-row items-center justify-center select-none">
        <div className="flex flex-row gap-3">
          <button
            onClick={() => {
              setStep(1);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 1 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
          <button
            onClick={() => {
              setStep(2);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 2 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
          <button
            onClick={() => {
              setStep(3);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 3 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
          <button
            onClick={() => {
              setStep(4);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 4 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
          <button
            onClick={() => {
              setStep(5);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 5 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
          <button
            onClick={() => {
              setStep(6);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 6 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
          <button
            onClick={() => {
              setStep(7);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 7 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
          <button
            onClick={() => {
              setStep(8);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 8 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
          <button
            onClick={() => {
              setStep(9);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 9 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
          <button
            onClick={() => {
              setStep(10);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 10 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
          <button
            onClick={() => {
              setStep(11);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 11 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
          <button
            onClick={() => {
              setStep(12);
            }}
            className={`w-2 h-2 rounded-lg m-1 ${
              step >= 12 ? 'bg-[--primary-color]' : 'bg-orange-200'
            }`}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
