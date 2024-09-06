import React from 'react';
import { FieldError } from 'react-hook-form';
import { useStep04 } from './useStep04';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';
import StepDescription from '../../StepDescription';
import { IresultData } from '../..';
import FormComponent from '@/components/FormComponent';

const TERMES_LINGUISTIQUE = [
  'Egalement important',
  'Faiblement important',
  'Assez important',
  'Très important',
  'Absolument important',
];

const Step04 = ({
  questionNumber,
  question,
  setStep,
  setResultData,
  resultData,
}: {
  questionNumber: string;
  question: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setResultData: React.Dispatch<React.SetStateAction<IresultData>>;
  resultData: IresultData;
}) => {
  const {
    isSubmitting,
    form,
    onSubmit,
    handleSubmit,
    register,
    errors,
    comparedCriteria,
  } = useStep04(setStep, setResultData, resultData);

  if (!process.env.NEXT_PUBLIC_reCAPTCHA_site_key) {
    return;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 font-semibold text-base dark:text-stone-200 w-full">
      <StepDescription step={Number(questionNumber)} />
      <div className="flex flex-col w-full p-0 md:p-12 justify-center items-center md:items-end">
        <FormComponent onSubmit={handleSubmit(onSubmit)} ref={form}>
          <div className="border-b border-gray-900/10 pb-12 w-full px-3 sm:px-0">
            <label
              htmlFor={`question${questionNumber}`}
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 my-3"
            >
              <span className="text-base">{`Etape ${questionNumber}`}:</span>{' '}
              {question}
            </label>
            {(
              errors?.[`question${questionNumber}`] as Record<
                string,
                FieldError
              >
            )?.[
              `${resultData.evaluation?.mostImportantCriterion.criterion}`
            ] && (
              <p className="text-red-500 dark:text-red-300 text-sm m-1">
                {
                  (
                    errors?.[`question${questionNumber}`] as Record<
                      string,
                      FieldError
                    >
                  )?.[
                    `${resultData.evaluation?.mostImportantCriterion.criterion}`
                  ]?.message
                }
              </p>
            )}
            <div className="mt-2 overflow-y-auto max-h-[22rem] p-2">
              {comparedCriteria.map((criterion, index) => (
                <div key={criterion} className="flex flex-col my-4">
                  <label
                    htmlFor={`importance${index}`}
                    className="text-base font-normal"
                  >
                    je considère le critère{' '}
                    <span className="font-semibold">
                      {resultData.evaluation?.mostImportantCriterion.criterion}
                    </span>{' '}
                    comme étant{' '}
                    <select
                      className={`border-[1px] ring-0 ${
                        (
                          errors?.[
                            `question${questionNumber}`
                          ] as unknown as FieldError[]
                        )?.[index]
                          ? '!border-red-500'
                          : ''
                      } font-semibold`}
                      id={`importance${index}`}
                      {...register(`question${questionNumber}.${index}`)}
                    >
                      <option value="." className="text-black text-xl">
                        Select importance
                      </option>
                      {TERMES_LINGUISTIQUE.map((term) => (
                        <option key={term} value={`${term}-${criterion}`}>
                          {term}
                        </option>
                      ))}
                    </select>{' '}
                    par rapport aux{' '}
                    <span className="font-semibold">{criterion}</span>
                  </label>
                  {(
                    errors?.[
                      `question${questionNumber}`
                    ] as unknown as FieldError[]
                  )?.[index] && (
                    <p className="text-red-500 dark:text-red-300 text-sm m-1">
                      {
                        (
                          errors?.[
                            `question${questionNumber}`
                          ] as unknown as FieldError[]
                        )?.[index]?.message
                      }
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="relative md:mx-5 sm:mx-0 mt-8 w-full float-none md:float-end md:w-1/2">
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

export default Step04;
