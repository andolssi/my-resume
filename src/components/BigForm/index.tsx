import React, { useState } from 'react';
import StepWrapper from '../StepWrapper';
import { IresultData } from '@/types/bigFormDataType';
import ResultDataPresentation from './ResultDataPresentation';
import Step01 from './Steps/Step01/Step01';
import Step02 from './Steps/Step02/Step02';
import Step03 from './Steps/Step03/Step03';
import Step04 from './Steps/Step04/Step04';
import Step05 from './Steps/Step05/Step05';
import Step06 from './Steps/Step06/Step06';
import Step07 from './Steps/Step07/Step07';
import Step08 from './Steps/Step08/Step08';
import Step09 from './Steps/Step09/Step09';
import Step10 from './Steps/Step10/Step10';
import Step11 from './Steps/Step11/Step11';
import Step12 from './Steps/Step12/Step12';

const BigForm = ({
  step,
  setStep,
  reCAPTCHASiteKey,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  reCAPTCHASiteKey?: string;
}) => {
  const [resultData, setResultData] = useState<IresultData>({ tolerance: 1 });
  const [subSteps, setSubSteps] = useState<number>(0);
  console.log({ resultData });

  const handleStep = (step: number) => () => {
    setStep(step);
  };

  return (
    <div className="w-full xl:max-w-[75%] flex flex-col items-center">
      <div className="flex flex-col w-full items-center">
        <h2 className="text-xl font-medium leading-7 text-gray-900 dark:text-gray-200">
          Bienvenue{' '}
          <span className="text-[--primary-color]">Cher Décideur</span>
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200 none">
          Prenez votre temps ...
        </p>
      </div>
      {resultData.criteria && (
        <div className="has-tooltip w-fit">
          <span className="tooltip rounded-md shadow-lg bg-black/50 text-white mt-10 p-2">
            cliquez pour modifier les critères
          </span>
          <div
            className="flex flex-row justify-center select-none cursor-pointer"
            onClick={handleStep(1)}
          >
            {resultData.criteria?.map((el, index) => (
              <h3
                key={`${el}${index}`}
                className={`m-3 ${
                  el === resultData.evaluation?.mostImportantCriterion.criterion
                    ? 'text-[--primary-color] font-semibold'
                    : ''
                } ${
                  el ===
                  resultData.evaluation?.lessImportantCriterion?.criterion
                    ? 'text-[--primary-secondary] font-semibold'
                    : ''
                }`}
              >
                {el}
              </h3>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className={`${step === 1 ? 'block' : 'hidden'}`}>
          <Step01
            questionNumber={`${step}`}
            question="Veuillez introduire vos criteres d'évaluation: "
            setStep={setStep}
            setResultData={setResultData}
            resultData={resultData}
            reCAPTCHASiteKey={reCAPTCHASiteKey}
          />
        </div>
      )}
      <StepWrapper
        className={`${
          step === 2
            ? 'block min-h-[22rem] text-center content-center'
            : 'hidden'
        }`}
        step={step}
        actualStep={2}
      >
        {resultData.criteria?.map((criterion, index) => (
          <React.Fragment key={`${criterion}${index}`}>
            {index === subSteps && (
              <Step02
                questionNumber={`${step}`}
                question="veuillez introduire les sous critères d'évaluation: "
                setStep={setStep}
                setResultData={setResultData}
                resultData={resultData}
                criterion={criterion}
                setSubSteps={setSubSteps}
              />
            )}
          </React.Fragment>
        ))}
      </StepWrapper>
      <StepWrapper
        className={`${
          step === 3
            ? 'block min-h-[22rem] text-center content-center'
            : 'hidden'
        }`}
        step={step}
        actualStep={3}
      >
        <div className={`${step === 3 ? 'block' : 'hidden'}`}>
          <Step03
            questionNumber={`${step}`}
            question="Veuillez selectionner le critere que vous considerer comme le plus important: "
            setStep={setStep}
            setResultData={setResultData}
            resultData={resultData}
          />
        </div>
      </StepWrapper>
      <StepWrapper
        className={`${step === 4 ? 'block' : 'hidden'}`}
        step={step}
        actualStep={4}
      >
        <Step04
          questionNumber={`${step}`}
          question="Veuillez exprimer votre préférence pour le Meilleur critère par rapport aux autres critères en utilisant ces termes linguistiques: "
          setStep={setStep}
          setResultData={setResultData}
          resultData={resultData}
        />
      </StepWrapper>

      <StepWrapper
        className={`${
          step === 5
            ? 'block min-h-[22rem] text-center content-center'
            : 'hidden'
        }`}
        step={step}
        actualStep={5}
      >
        <Step05
          questionNumber={`${step}`}
          question="Veuillez selectionner le critere que vous considerer comme le moins important: "
          setStep={setStep}
          setResultData={setResultData}
          resultData={resultData}
        />
      </StepWrapper>
      <StepWrapper
        className={`${step === 6 ? 'block' : 'hidden'}`}
        step={step}
        actualStep={6}
      >
        <Step06
          questionNumber={`${step}`}
          question="Veuillez exprimer votre préférence a tous les critères par rapport au critère le moins important en utilisant ces termes linguistiques: "
          setStep={setStep}
          setResultData={setResultData}
          resultData={resultData}
        />
      </StepWrapper>
      <StepWrapper
        className={`${
          step === 7
            ? 'block min-h-[22rem] text-center content-center'
            : 'hidden'
        }`}
        step={step}
        actualStep={7}
      >
        {resultData.criteria?.map((criter, index) => (
          <React.Fragment key={`${criter}${index}`}>
            {index === subSteps && (
              <Step07
                questionNumber={`${step}`}
                question="Veuillez sélectionner les sous-critères que vous considérez comme les plus importants: "
                setStep={setStep}
                setResultData={setResultData}
                resultData={resultData}
              />
            )}
          </React.Fragment>
        ))}
      </StepWrapper>
      <StepWrapper
        className={`${
          step === 8
            ? 'block min-h-[22rem] text-center content-center'
            : 'hidden'
        }`}
        step={step}
        actualStep={8}
      >
        {resultData.criteria?.map((criter, index) => (
          <React.Fragment key={`${criter}${index}`}>
            {index === subSteps && (
              <Step08
                questionNumber={`${step}`}
                question="Veuillez sélectionner les sous-critères que vous considérez comme les moins importants: "
                setStep={setStep}
                setResultData={setResultData}
                resultData={resultData}
              />
            )}
          </React.Fragment>
        ))}
      </StepWrapper>
      <StepWrapper
        className={`${
          step === 9
            ? 'block min-h-[22rem] text-center content-center'
            : 'hidden'
        }`}
        step={step}
        actualStep={9}
      >
        {resultData.criteria?.map((criter, index) => (
          <React.Fragment key={`${criter}${index}`}>
            {index === subSteps && (
              <Step09
                questionNumber={`${step}`}
                question="Pour chaque critère, veuillez exprimer votre préférence pour le Meilleur sous-critère par rapport aux autres sous-critères en utilisant ces termes linguistiques: "
                setStep={setStep}
                setResultData={setResultData}
                resultData={resultData}
              />
            )}
          </React.Fragment>
        ))}
      </StepWrapper>
      <StepWrapper
        className={`${
          step === 10
            ? 'block min-h-[22rem] text-center content-center'
            : 'hidden'
        }`}
        step={step}
        actualStep={10}
      >
        {resultData.criteria?.map((criter, index) => (
          <React.Fragment key={`${criter}${index}`}>
            {index === subSteps && (
              <Step10
                questionNumber={`${step}`}
                question="Pour chaque critère, veuillez exprimer votre préférence a tous les sous-critères par rapport au sous-critère le moins important en utilisant ces termes linguistiques: "
                setStep={setStep}
                setResultData={setResultData}
                resultData={resultData}
              />
            )}
          </React.Fragment>
        ))}
      </StepWrapper>
      <StepWrapper
        className={`${
          step === 11
            ? 'block min-h-[22rem] text-center content-center'
            : 'hidden'
        }`}
        step={step}
        actualStep={11}
      >
        {resultData.criteria?.map((criter, index) => (
          <React.Fragment key={`${criter}${index}`}>
            {index === subSteps && (
              <Step11
                questionNumber={`${step}`}
                question="Pour chaque critère, veuillez exprimer votre préférence a tous les sous-critères par rapport au sous-critère le moins important en utilisant ces termes linguistiques: "
                setStep={setStep}
                setResultData={setResultData}
                resultData={resultData}
              />
            )}
          </React.Fragment>
        ))}
      </StepWrapper>
      <StepWrapper
        className={`${
          step === 12
            ? 'block min-h-[22rem] text-center content-center'
            : 'hidden'
        }`}
        step={step}
        actualStep={12}
      >
        {resultData.criteria?.map((criter, index) => (
          <React.Fragment key={`${criter}${index}`}>
            {index === subSteps && (
              <Step12
                questionNumber={`${step}`}
                question="Pour chaque critère, veuillez exprimer votre préférence a tous les sous-critères par rapport au sous-critère le moins important en utilisant ces termes linguistiques: "
                setStep={setStep}
                setResultData={setResultData}
                resultData={resultData}
                reCAPTCHASiteKey={reCAPTCHASiteKey}
              />
            )}
          </React.Fragment>
        ))}
      </StepWrapper>

      {step === 13 && <ResultDataPresentation data={resultData} />}
    </div>
  );
};

export default BigForm;
