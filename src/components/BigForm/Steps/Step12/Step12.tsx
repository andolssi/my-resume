import React, { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';
import StepDescription from '../../StepDescription';
import { IresultData } from '../..';
import { useStep12 } from './useStep12';
import FormComponent from '@/components/FormComponent';
import { YES_NO_OPTION } from '../Step11/Step11';

const Step12 = ({
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
    reCaptchaRef,
    onChangeRef,
    watch,
  } = useStep12(setStep, setResultData, resultData);

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
          <div className="mt-2 overflow-y-auto max-h-96 py-4 px-3 bg-gradient-to-b from-white to-slate-50 rounded-md">
            {resultData.criteria?.map((criterion) => (
              <React.Fragment key={criterion}>
                <h3 className="ring-2 p-2 rounded-md mb-2">{criterion}</h3>

                <div className="flex flex-col my-4">
                  <label
                    htmlFor={`question${questionNumber}.${criterion}.considereSubCriterionForeverMostImportant`}
                    className="text-base font-normal p-2"
                  >
                    Est ce que vous pensez que vous allez toujours considèrer le
                    sous-critère{' '}
                    <span className="font-semibold">
                      {
                        resultData.evaluation?.subCriteriaEvaluation?.[
                          criterion
                        ].mostImportantSubCriterion.subCriterion
                      }
                    </span>{' '}
                    comme étant le sous-critère le{' '}
                    <span className="font-semibold">plus</span> important des
                    sous-critère du critère{' '}
                    <span className="font-semibold">{criterion}</span> ?{' '}
                    <select
                      className={`border-[1px] ring-0 mx-2 my-1 w-full ${
                        errors?.question12
                          ?.considereCriterionForeverMostImportant
                          ? '!border-red-500'
                          : ''
                      } font-semibold text-base`}
                      id={`question${questionNumber}.${criterion}.considereSubCriterionForeverMostImportant`}
                      {...register(
                        `question${questionNumber}.${criterion}.considereSubCriterionForeverMostImportant`,
                      )}
                    >
                      <option value=".">Select</option>
                      {YES_NO_OPTION.map((term) => (
                        <option key={term} value={`${term}`}>
                          {term}
                        </option>
                      ))}
                    </select>
                    {errors?.question12?.[criterion]
                      ?.considereSubCriterionForeverMostImportant && (
                      <p className="text-red-500 dark:text-red-300 text-sm m-1">
                        {
                          errors?.question12?.[criterion]
                            ?.considereSubCriterionForeverMostImportant?.message
                        }
                      </p>
                    )}
                  </label>
                  <label
                    htmlFor={`question${questionNumber}.${criterion}.considereSubCriterionForeverLessImportant`}
                    className="text-base font-normal p-2 border-y-[1px] border-black"
                  >
                    Est ce que vous pensez que vous allez toujours considèrer le
                    sous-critère{' '}
                    <span className="font-semibold">
                      {
                        resultData.evaluation?.subCriteriaEvaluation?.[
                          criterion
                        ].lessImportantSubCriterion?.subCriterion
                      }
                    </span>{' '}
                    comme étant le sous-critère le{' '}
                    <span className="font-semibold">moins</span> important des
                    sous-critère du critère{' '}
                    <span className="font-semibold">{criterion}</span> ?{' '}
                    <select
                      className={`border-[1px] ring-0 mx-2 mt-1 w-full mb-4 ${
                        errors?.question12
                          ?.considereCriterionForeverLessImportant
                          ? '!border-red-500'
                          : ''
                      } font-semibold text-base`}
                      id={`question${questionNumber}.${criterion}.considereSubCriterionForeverLessImportant`}
                      {...register(
                        `question${questionNumber}.${criterion}.considereSubCriterionForeverLessImportant`,
                      )}
                    >
                      <option value=".">Select</option>
                      {YES_NO_OPTION.map((term) => (
                        <option key={term} value={`${term}`}>
                          {term}
                        </option>
                      ))}
                    </select>
                    {errors?.question12?.[criterion]
                      ?.considereSubCriterionForeverLessImportant && (
                      <p className="text-red-500 dark:text-red-300 text-sm m-1">
                        {
                          errors?.question12?.[criterion]
                            ?.considereSubCriterionForeverLessImportant?.message
                        }
                      </p>
                    )}
                  </label>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="relative md:mx-5 sm:mx-0 mt-8 w-full float-none md:float-end md:w-1/2">
          <ReCAPTCHA
            size="invisible"
            ref={reCaptchaRef}
            onChange={(token) => {
              if (onChangeRef.current) {
                onChangeRef.current(token);
              }
            }}
            sitekey={process.env.NEXT_PUBLIC_reCAPTCHA_site_key}
            onError={(err) => {
              console.error('reCAPTCHA error:', err);
            }}
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
              'Submit'
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

export default Step12;
