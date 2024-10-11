import React from 'react';
import { Controller, FieldError } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';
import StepDescription from '../../StepDescription';
import { IresultData } from '@/types/bigFormDataType';
import { useStep07 } from './useStep07';
import FormComponent from '@/components/FormComponent';

const Step07 = ({
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
    watch,
    control,
    handleLabelClick,
  } = useStep07(setStep, setResultData, resultData, questionNumber);

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
          <div className="text-center flex flex-row justify-center w-full">
            {resultData.criteria?.map((criterion, index) => (
              <div
                key={`${criterion}${index}`}
                className={`select-none border-y-[1px] border-x-0 border-[--primary-color]
                   ${
                     index === 0
                       ? 'border-l-[1px] border-[--primary-color] rounded-l-md'
                       : ''
                   } ${
                     resultData.criteria &&
                     index === resultData.criteria.length - 1
                       ? 'border-r-[1px] border-[--primary-color] rounded-r-md'
                       : ''
                   }`}
              >
                <h1 className="pb-2 text-white p-1 bg-[--primary-color] min-w-24">
                  {criterion}
                </h1>
                {resultData.subCriteria?.[criterion].map((subCriterion, i) => (
                  <div
                    key={`${subCriterion}${i}`}
                    className={`py-2 flex flex-row p-2 items-center gap-2 rounded-md m-2 hover:text-white cursor-pointer hover:bg-[--primary-color]
                       ${
                         watch()?.[`question${questionNumber}`]?.[index] ===
                         subCriterion
                           ? 'bg-[--primary-color] text-white'
                           : ''
                       }`}
                    onClick={handleLabelClick(subCriterion, index)}
                  >
                    <label
                      htmlFor={`question${questionNumber}.[${index}]`}
                      className="text-sm whitespace-nowrap select-none cursor-pointer"
                    >
                      {subCriterion}
                    </label>
                    <Controller
                      {...register(`question${questionNumber}.[${index}]`)}
                      name={`question${questionNumber}.[${index}]`}
                      control={control}
                      render={({ field }) => (
                        <input
                          type="radio"
                          {...field}
                          value={subCriterion}
                          checked={field.value === subCriterion}
                          className="select-none cursor-pointer"
                        />
                      )}
                    />
                  </div>
                ))}
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
  );
};
export default Step07;
