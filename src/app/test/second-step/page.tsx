'use client';

import { useState, useEffect, useMemo } from 'react';
import DetailedSimplexResults from '@/components/DetailedSimplexResults';
import { IFinalResultData, ISetOfCriteria } from '@/types/bigFormDataType';
import convertSubCriteriaToCriteria from '@/helpers/convertSubCriteriaToCriteria';
import { LpProblemData } from '@/types/formattedData';
import formateFormData from '@/helpers/formateFormData';
import { complexResultType } from '@/types/complexResultType';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WeightsResults from '@/components/WeightsResults';
import { calculateSimplex } from '@/app/actions/calculateSimplex';
import determineModelType from '@/helpers/determineModelType';
import { generateTheProblem } from '@/app/actions/generateTheProblem';
import { useIsMounted } from '@/helpers/useIsMounted';

export default function SecondStepPage() {
  const isMounted = useIsMounted();
  const [isData, setIsData] = useState(true);
  const [isProcessing, setIsProcessing] = useState(true);
  const [simplexResult, setSimplexResult] = useState<
    complexResultType[] | null
  >(null);
  const [formFormattedData, setFormFormattedData] = useState<
    ISetOfCriteria[] | null
  >(null);

  console.log({ simplexResult });

  const processData = useMemo(
    () => async (data: IFinalResultData) => {
      if (simplexResult) return;

      setIsProcessing(true);
      const enduringConsideration = {
        considereCriterionForeverLessImportant:
          data.enduringConsideration.considereCriterionForeverLessImportant,
        considereCriterionForeverMostImportant:
          data.enduringConsideration.considereCriterionForeverMostImportant,
      };

      const modelType: 'optimistic' | 'pessimistic' | 'neutral1' | 'neutral2' =
        determineModelType(
          enduringConsideration.considereCriterionForeverMostImportant,
          enduringConsideration.considereCriterionForeverLessImportant,
        ) || 'neutral1'; // default

      const arrayOfCriteriaData: ISetOfCriteria[] = [
        {
          identification: {
            isSubCriteria: false,
          },
          criteria: data.criteria,
          evaluation: {
            mostImportantCriterion: {
              criterion: data.evaluation.mostImportantCriterion.criterion,
              relations: data.evaluation.mostImportantCriterion.relations,
            },
            lessImportantCriterion: {
              criterion: data.evaluation.lessImportantCriterion.criterion,
              relations: data.evaluation.lessImportantCriterion.relations,
            },
          },
          modelType,
        },
      ];

      data.criteria.forEach((criterion) => {
        arrayOfCriteriaData.push(convertSubCriteriaToCriteria(criterion, data));
      });
      setFormFormattedData(arrayOfCriteriaData);

      try {
        const problemsToSolve: LpProblemData[] = [];
        arrayOfCriteriaData.forEach((setOfCriteria) => {
          problemsToSolve.push(formateFormData(setOfCriteria));
        });
        // console.log({
        //   newProblemsToSolve: arrayOfCriteriaData,
        //   newProblemsToSolveAsString: JSON.stringify(arrayOfCriteriaData),
        // });
        // TODO: ici on doit générer les problèmes et les résoudre en parallèle(promise.all)
        // await generateTheProblem(problemsToSolve).catch((error) => {
        //   console.error('Error When Generate The Problem:', error);
        // });
        // for (let index = 0; index < problemsToSolve.length; index++) {
        //   const element = problemsToSolve[index];
        //   await calculateSimplex(`generated_dynamic_fuzzy_bwm${index}.py`).then(
        //     (result) =>
        //       setSimplexResult((prev) => (prev ? [...prev, result] : [result])),
        //   );
        // }
        await calculateSimplex(problemsToSolve).then(setSimplexResult);
      } catch (error) {
        console.error('Error calculating simplex:', error);
      } finally {
        // TODO:show a message to the user
        simplexResult &&
          toast('🎉 Cheers to the finish line of the first part!');
        setIsProcessing(false);
      }
    },
    [simplexResult],
  );

  useEffect(() => {
    if (isMounted()) {
      const formData = localStorage.getItem('finalResultData');

      if (formData) {
        setIsData(true);
        processData(JSON.parse(formData) as IFinalResultData);
      } else {
        setIsData(false);
        toast('Données manquantes!!');
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto flex flex-col gap-4 justify-center items-center">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">
        {isProcessing
          ? 'Processing...'
          : 'Fuzzy Multi-criteria BWM Calculation'}
      </h1>
      {(!isData || !simplexResult) && !isProcessing && (
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold text-red-600 mb-4">
            Données manquantes. Veuillez retourner au formulaire pour créer une
            nouvelle évaluation.
          </h2>
          <button
            onClick={() =>
              window !== undefined
                ? (window.location.href = '/test')
                : console.log
            } // Redirect to home page
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Retour à l'accueil
          </button>
        </div>
      )}
      {simplexResult && <DetailedSimplexResults result={simplexResult} />}
      {simplexResult && formFormattedData && (
        <WeightsResults
          result={simplexResult}
          formFormattedData={formFormattedData}
        />
      )}
    </div>
  );
}
