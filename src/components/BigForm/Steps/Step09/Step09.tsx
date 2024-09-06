import React, { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';
import StepDescription from '../../StepDescription';
import { IresultData } from '../..';
import { useStep09 } from './useStep09';
import { TERMES_LINGUISTIQUE } from '../Step06/Step06';
import FormComponent from '@/components/FormComponent';

const Step09 = ({
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
  const { isSubmitting, form, onSubmit, handleSubmit, register, errors } =
    useStep09(setStep, questionNumber, setResultData, resultData);

  if (!process.env.NEXT_PUBLIC_reCAPTCHA_site_key) {
    return;
  }

  if (!resultData.evaluation || !resultData.evaluation.subCriteriaEvaluation)
    return;

  return (
    <div className="flex flex-col md:flex-row gap-8 font-semibold text-base dark:text-stone-200 w-full">
      <StepDescription step={Number(questionNumber)} />
      <FormComponent
        onSubmit={handleSubmit(onSubmit)}
        ref={form}
        customClassName="flex flex-col w-full p-0 md:p-12 justify-center items-center md:items-end"
      >
        <div className="border-b border-gray-900/10 pb-12 w-full px-3 sm:px-0">
          <label
            htmlFor={`question${questionNumber}`}
            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200 my-3"
          >
            <span className="text-base">{`Etape ${questionNumber}`}:</span>{' '}
            {question}
          </label>
          <div className="mt-2 overflow-y-auto max-h-96 py-4 px-3 bg-gradient-to-b from-white to-slate-50 rounded-md">
            {resultData.criteria?.map((criterion) => (
              <React.Fragment key={criterion}>
                <h3 className="ring-2 p-2 rounded-md">{criterion}</h3>
                {(errors?.question9?.[criterion] as unknown as FieldError) && (
                  <div
                    ref={(el) => {
                      if (el && errors?.question9?.[criterion]) {
                        el.scrollIntoView({
                          behavior: 'smooth',
                          block: 'center',
                        });
                        el.focus();
                      }
                    }}
                  >
                    <p className="text-red-500 dark:text-red-300 text-sm m-1">
                      {
                        (
                          errors?.question9?.[
                            criterion
                          ] as unknown as FieldError
                        )?.message
                      }
                    </p>
                  </div>
                )}
                {resultData.subCriteria?.[criterion]
                  .filter(
                    (el) =>
                      el !==
                      resultData.evaluation?.subCriteriaEvaluation?.[criterion]
                        .mostImportantSubCriterion.subCriterion,
                  )
                  .map((subCriteria, i) => (
                    <div key={subCriteria} className="flex flex-col my-4">
                      <label
                        htmlFor={`question${questionNumber}.${criterion}.${i}`}
                        className="text-base font-normal"
                      >
                        je considère le sous-critère{' '}
                        <span className="font-semibold">
                          {
                            resultData.evaluation?.subCriteriaEvaluation?.[
                              criterion
                            ].mostImportantSubCriterion.subCriterion
                          }
                        </span>{' '}
                        comme étant
                        <select
                          className={`border-[1px] ring-0 ${
                            (
                              errors?.question9?.[
                                `${criterion}`
                              ] as unknown as FieldError[]
                            )?.[i]
                              ? '!border-red-500'
                              : ''
                          } font-semibold text-base`}
                          id={`question${questionNumber}.${criterion}.${i}`}
                          {...register(
                            `question${questionNumber}.${criterion}.${i}`,
                          )}
                        >
                          <option value=".">Select importance</option>
                          {TERMES_LINGUISTIQUE.map((term) => (
                            <option key={term} value={`${term}-${subCriteria}`}>
                              {term}
                            </option>
                          ))}
                        </select>{' '}
                        par rapport aux{' '}
                        <span className="font-semibold">{subCriteria}</span>
                      </label>
                      {(
                        errors?.question9?.[
                          `${criterion}`
                        ] as unknown as FieldError[]
                      )?.[i] && (
                        <p className="text-red-500 dark:text-red-300 text-sm m-1">
                          {
                            (
                              errors?.question9?.[
                                `${criterion}`
                              ] as unknown as FieldError[]
                            )?.[i]?.message
                          }
                        </p>
                      )}
                    </div>
                  ))}
              </React.Fragment>
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
  );
};

export default Step09;
