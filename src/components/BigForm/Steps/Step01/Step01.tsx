import React from 'react';
import { FieldError } from 'react-hook-form';
import { useStep01 } from './useStep01';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';
import StepDescription from '../../StepDescription';
import FormComponent from '@/components/FormComponent';
import { IresultData } from '@/types/bigFormDataType';

const Step01 = ({
  questionNumber,
  question,
  setStep,
  setResultData,
  resultData,
  reCAPTCHASiteKey,
}: {
  questionNumber: string;
  question: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setResultData: React.Dispatch<React.SetStateAction<IresultData>>;
  resultData: IresultData;
  reCAPTCHASiteKey: string | undefined;
}) => {
  const {
    isSubmitting,
    form,
    onSubmit,
    handleSubmit,
    register,
    errors,
    reCaptchaRef,
    fields,
    handleRemove,
    handleAppend,
    recaptchaError,
    handleRecaptchaToken,
  } = useStep01(setStep, setResultData, resultData);

  if (!reCAPTCHASiteKey) {
    return;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 font-semibold text-base dark:text-stone-200 w-full">
      <StepDescription step={Number(questionNumber)} />
      <div className="flex flex-col w-full p-0 md:py-12 justify-center items-center md:items-end">
        <FormComponent onSubmit={handleSubmit(onSubmit)} ref={form}>
          <div className="border-b border-gray-900/10 pb-12 w-full px-3 sm:px-0">
            <label
              htmlFor={`question${questionNumber}`}
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 my-3"
            >
              <span className="text-base">{`Etape ${questionNumber}`}:</span>{' '}
              {question}
            </label>
            <div className="mt-2 overflow-y-auto max-h-[22rem] p-2">
              <ul>
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <li className="flex flex-wrap my-2 justify-between">
                      <label
                        htmlFor={`question${questionNumber}.${index}.criteria`}
                        className="block text-base font-medium leading-6 text-gray-900 dark:text-gray-200 my-3 mr-2"
                      >
                        {`Critère n-${index + 1}`}
                      </label>
                      <input
                        key={field.id}
                        {...register(`question1.${index}.criteria`)}
                        type="text"
                        name={`question${questionNumber}.${index}.criteria`}
                        id={`question${questionNumber}.${index}.criteria`}
                        className={`block w-1/2 rounded-md border-[1px] ring-0 py-1.5 px-1 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 max-w-56 ${
                          errors?.['question1']?.[index] ? 'border-red-300' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={handleRemove(index)}
                        className="border-[1px] rounded-md px-2 hover:scale-105 hover:border-red-950 cursor-pointer"
                      >
                        ❌
                      </button>
                    </li>
                    <p className="text-red-500 dark:text-red-300 text-sm m-1 text-center ml-12">
                      {errors?.['question1'] &&
                        (errors?.['question1']?.[index] as FieldError)?.message}
                    </p>
                  </div>
                ))}
              </ul>
              <button
                type="button"
                onClick={handleAppend}
                className="font-extrabold border-[1px] rounded-md px-2 hover:scale-105 hover:border-green-900 text-green-900 text-4xl cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
          <div className="relative md:mx-5 sm:mx-0 mt-8 w-full float-none md:float-end md:w-1/2">
            <ReCAPTCHA
              size="invisible"
              ref={reCaptchaRef}
              onChange={handleRecaptchaToken}
              sitekey={reCAPTCHASiteKey}
              onError={recaptchaError}
            />
            <button
              type="submit"
              className={`text-xs md:text-base  
        text-white rounded-md hover:border-black filter drop-shadow-lg 
          transition-all font-sans font-medium w-full p-3 ${
            isSubmitting
              ? 'loading hover:cursor-not-allowed text-lg! bg-orange-300'
              : 'hover:cursor-pointer hover:translate-y-1 hover:scale-105 bg-[--primary-color]'
          }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2 w-100">
                  Loading
                  <div className="h-6 w-4 border-b-2 border-current rounded-full animate-spin" />
                </span>
              ) : (
                'Suivant'
              )}
            </button>
            <Image
              className="hidden sm:block absolute top-0 right-full opacity-55 dark:drop-shadow-[0_0_0.2rem_#ffffff70] object-fill filter drop-shadow-lg max-w-full w-auto h-full"
              src="/flesh-website-decoration.png"
              alt="Houssem Eddine El Andolsi"
              width={50}
              height={50}
              priority
            />
          </div>
        </FormComponent>
      </div>
    </div>
  );
};

export default Step01;
