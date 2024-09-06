import React, { useState } from 'react';
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
import ResultDataPresentation from './ResultDataPresentation';

export interface IresultData {
  tolerance: number;
  criteria?: string[];
  subCriteria?: {
    [x: string]: string[];
  };
  evaluation?: {
    mostImportantCriterion: {
      criterion: string;
      relations?: string[];
    };
    lessImportantCriterion?: {
      criterion: string;
      relations?: string[];
    };
    subCriteriaEvaluation?: {
      [criterion: string]: {
        mostImportantSubCriterion: {
          subCriterion: string;
          relations?: string[];
        };
        lessImportantSubCriterion?: {
          subCriterion: string;
          relations?: string[];
        };
      };
    };
  };
  enduringConsideration?: {
    considereCriterionForeverLessImportant: boolean;
    considereCriterionForeverMostImportant: boolean;
    subCriteriaConsideration?: {
      [criterion: string]: {
        considereSubCriterionForeverLessImportant: boolean;
        considereSubCriterionForeverMostImportant: boolean;
      };
    };
  };
}

const BigForm = ({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [resultData, setResultData] = useState<IresultData>({ tolerance: 1 });
  const [subSteps, setSubSteps] = useState<number>(0);

  console.log({ resultData });

  return (
    <div className="w-full xl:max-w-[75%]">
      <div className="flex flex-col w-full items-center">
        <h2 className="text-xl font-medium leading-7 text-gray-900 dark:text-gray-200">
          Bienvenue{' '}
          <span className="text-[--primary-color]">Cher Décideur</span>
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200 none">
          Prenez votre temps ...
        </p>
      </div>
      <div className="flex flex-row justify-center" onClick={() => setStep(1)}>
        {resultData.criteria?.map((el, index) => (
          <h3
            key={`${el}${index}`}
            className={`m-3 ${
              el === resultData.evaluation?.mostImportantCriterion.criterion
                ? 'text-[--primary-color] font-semibold'
                : ''
            } ${
              el === resultData.evaluation?.lessImportantCriterion?.criterion
                ? 'text-[--primary-secondary] font-semibold'
                : ''
            }`}
          >
            {el}
          </h3>
        ))}
      </div>
      {step === 1 && (
        <div className={`${step === 1 ? 'block' : 'hidden'}`}>
          <Step01
            questionNumber={`${step}`}
            question="Veuillez introduire vos criteres d'évaluation: "
            setStep={setStep}
            setResultData={setResultData}
            resultData={resultData}
          />
        </div>
      )}
      {step === 2 && (
        <div
          className={`${
            step === 2
              ? 'block min-h-[22rem] text-center content-center'
              : 'hidden'
          }`}
        >
          {resultData.criteria ? (
            resultData.criteria?.map((criterion, index) => (
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
            ))
          ) : (
            <button
              className="rounded-lg border-[1px] border-[--primary-color] p-3 m-auto text-[--primary-color] text-xl hover:bg-[--primary-color] hover:text-white"
              onClick={() => setStep(1)}
            >
              Veuillez introduire vos criteres d'évaluation avant d'avancer?
            </button>
          )}
        </div>
      )}
      {step === 3 &&
        (resultData.subCriteria ? (
          <div className={`${step === 3 ? 'block' : 'hidden'}`}>
            <Step03
              questionNumber={`${step}`}
              question="Veuillez selectionner le critere que vous considerer comme le plus important: "
              setStep={setStep}
              setResultData={setResultData}
              resultData={resultData}
            />
          </div>
        ) : (
          <button
            className="rounded-lg border-[1px] border-[--primary-color] p-3 m-auto text-[--primary-color] text-xl hover:bg-[--primary-color] hover:text-white"
            onClick={() => setStep(1)}
          >
            Veuillez introduire vos sous criteres d'évaluation avant d'avancer?
          </button>
        ))}
      {step === 4 &&
        (resultData ? (
          <div className={`${step === 4 ? 'block' : 'hidden'}`}>
            <Step04
              questionNumber={`${step}`}
              question="Veuillez exprimer votre préférence pour le Meilleur critère par rapport aux autres critères en utilisant ces termes linguistiques: "
              setStep={setStep}
              setResultData={setResultData}
              resultData={resultData}
            />
          </div>
        ) : (
          <button
            className="rounded-lg border-[1px] border-[--primary-color] p-3 m-auto text-[--primary-color] text-xl hover:bg-[--primary-color] hover:text-white"
            onClick={() => setStep(1)}
          >
            Veuillez introduire vos criteres d'évaluation avant d'avancer?
          </button>
        ))}
      {step === 5 &&
        (resultData.subCriteria ? (
          <div className={`${step === 5 ? 'block' : 'hidden'}`}>
            <Step05
              questionNumber={`${step}`}
              question="Veuillez selectionner le critere que vous considerer comme le moins important: "
              setStep={setStep}
              setResultData={setResultData}
              resultData={resultData}
            />
          </div>
        ) : (
          <button
            className="rounded-lg border-[1px] border-[--primary-color] p-3 m-auto text-[--primary-color] text-xl hover:bg-[--primary-color] hover:text-white"
            onClick={() => setStep(1)}
          >
            Veuillez introduire vos sous criteres d'évaluation avant d'avancer?
          </button>
        ))}
      {step === 6 &&
        (resultData.subCriteria ? (
          <div className={`${step === 6 ? 'block' : 'hidden'}`}>
            <Step06
              questionNumber={`${step}`}
              question="Veuillez exprimer votre préférence a tous les critères par rapport au critère le moins important en utilisant ces termes linguistiques: "
              setStep={setStep}
              setResultData={setResultData}
              resultData={resultData}
            />
          </div>
        ) : (
          <button
            className="rounded-lg border-[1px] border-[--primary-color] p-3 m-auto text-[--primary-color] text-xl hover:bg-[--primary-color] hover:text-white"
            onClick={() => setStep(1)}
          >
            Veuillez introduire vos sous critères d'évaluation avant d'avancer?
          </button>
        ))}
      {step === 7 && (
        <div
          className={`${
            step === 7
              ? 'block min-h-[22rem] text-center content-center'
              : 'hidden'
          }`}
        >
          {resultData.criteria ? (
            resultData.criteria?.map((criter, index) => (
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
            ))
          ) : (
            <button
              className="rounded-lg border-[1px] border-[--primary-color] p-3 m-auto text-[--primary-color] text-xl hover:bg-[--primary-color] hover:text-white"
              onClick={() => setStep(1)}
            >
              Veuillez introduire vos criteres d'évaluation avant d'avancer?
            </button>
          )}
        </div>
      )}
      {step === 8 && (
        <div
          className={`${
            step === 8
              ? 'block min-h-[22rem] text-center content-center'
              : 'hidden'
          }`}
        >
          {resultData.criteria ? (
            resultData.criteria.map((criter, index) => (
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
            ))
          ) : (
            <button
              className="rounded-lg border-[1px] border-[--primary-color] p-3 m-auto text-[--primary-color] text-xl hover:bg-[--primary-color] hover:text-white"
              onClick={() => setStep(1)}
            >
              Veuillez introduire vos criteres d'évaluation avant d'avancer?
            </button>
          )}
        </div>
      )}
      {step === 9 && (
        <div
          className={`${
            step === 9
              ? 'block min-h-[22rem] text-center content-center'
              : 'hidden'
          }`}
        >
          {resultData.criteria ? (
            resultData.criteria.map((criter, index) => (
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
            ))
          ) : (
            <button
              className="rounded-lg border-[1px] border-[--primary-color] p-3 m-auto text-[--primary-color] text-xl hover:bg-[--primary-color] hover:text-white"
              onClick={() => setStep(1)}
            >
              Veuillez introduire vos criteres d'évaluation avant d'avancer?
            </button>
          )}
        </div>
      )}
      {step === 10 && (
        <div
          className={`${
            step === 10
              ? 'block min-h-[22rem] text-center content-center'
              : 'hidden'
          }`}
        >
          {resultData.criteria ? (
            resultData.criteria.map((criter, index) => (
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
            ))
          ) : (
            <button
              className="rounded-lg border-[1px] border-[--primary-color] p-3 m-auto text-[--primary-color] text-xl hover:bg-[--primary-color] hover:text-white"
              onClick={() => setStep(1)}
            >
              Veuillez introduire vos criteres d'évaluation avant d'avancer?
            </button>
          )}
        </div>
      )}
      {step === 11 && (
        <div
          className={`${
            step === 11
              ? 'block min-h-[22rem] text-center content-center'
              : 'hidden'
          }`}
        >
          {resultData.criteria ? (
            resultData.criteria.map((criter, index) => (
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
            ))
          ) : (
            <button
              className="rounded-lg border-[1px] border-[--primary-color] p-3 m-auto text-[--primary-color] text-xl hover:bg-[--primary-color] hover:text-white"
              onClick={() => setStep(1)}
            >
              Veuillez introduire vos criteres d'évaluation avant d'avancer?
            </button>
          )}
        </div>
      )}
      {step === 12 && (
        <div
          className={`${
            step === 12
              ? 'block min-h-[22rem] text-center content-center'
              : 'hidden'
          }`}
        >
          {resultData.criteria ? (
            resultData.criteria.map((criter, index) => (
              <React.Fragment key={`${criter}${index}`}>
                {index === subSteps && (
                  <Step12
                    questionNumber={`${step}`}
                    question="Pour chaque critère, veuillez exprimer votre préférence a tous les sous-critères par rapport au sous-critère le moins important en utilisant ces termes linguistiques: "
                    setStep={setStep}
                    setResultData={setResultData}
                    resultData={resultData}
                  />
                )}
              </React.Fragment>
            ))
          ) : (
            <button
              className="rounded-lg border-[1px] border-[--primary-color] p-3 m-auto text-[--primary-color] text-xl hover:bg-[--primary-color] hover:text-white"
              onClick={() => setStep(1)}
            >
              Veuillez introduire vos criteres d'évaluation avant d'avancer?
            </button>
          )}
        </div>
      )}
      {step === 13 && <ResultDataPresentation data={resultData} />}
    </div>
  );
};

export default BigForm;
