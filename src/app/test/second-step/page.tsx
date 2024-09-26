'use client';

import { useState, useEffect } from 'react';
import DetailedSimplexResults from '@/components/DetailedSimplexResults';
import { IFinalResultData, ISetOfCriteria } from '@/types/bigFormDataType';
import { calculateSimplex } from '@/app/actions/calculateSimplex';
import convertSubCriteriaToCriteria from '@/helpers/convertSubCriteriaToCriteria';
import { LpProblemData } from '@/types/formattedData';
import formateFormData from '@/helpers/formateFormData';
import { complexResultType } from '@/types/complexResultType';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WeightsResults from '@/components/WeightsResults';

export default function SecondStepPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [simplexResult, setSimplexResult] = useState<
    complexResultType[] | null
  >(null);
  const [formFormattedData, setFormFormattedData] = useState<
    ISetOfCriteria[] | null
  >(null);

  console.log({ simplexResult });

  const processData = async (data: IFinalResultData) => {
    if (simplexResult) return;

    setIsProcessing(true);
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
        enduringConsideration: {
          considereCriterionForeverLessImportant:
            data.enduringConsideration.considereCriterionForeverLessImportant,
          considereCriterionForeverMostImportant:
            data.enduringConsideration.considereCriterionForeverMostImportant,
        },
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
      console.log({
        problemsToSolve,
      });

      await calculateSimplex(problemsToSolve).then(setSimplexResult);
      // console.log({ results }); // 👈️ this is the result you need to use

      // const result: complexResultType = await calculateSimplex(data);
    } catch (error) {
      console.error('Error calculating simplex:', error);
    } finally {
      // TODO:show a message to the user
      toast('🎉 Cheers to the finish line of the first part!');
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const formData = localStorage.getItem('finalResultData');

    if (formData) {
      processData(JSON.parse(formData) as unknown as IFinalResultData);
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
      {simplexResult && <DetailedSimplexResults result={simplexResult} />}
      {simplexResult && formFormattedData && (
        <WeightsResults
          result={simplexResult}
          formFormattedData={formFormattedData}
        />
      )}
      {/* {simplexResult && <p>{JSON.stringify(simplexResult)}</p>} */}
    </div>
  );
}
