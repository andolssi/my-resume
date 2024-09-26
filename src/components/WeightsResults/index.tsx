import { ISetOfCriteria } from '@/types/bigFormDataType';
import { complexResultType } from '@/types/complexResultType';
import React from 'react';

interface SubCriterion {
  id: string;
  initialWeight: number;
  finalWeight: number;
}

interface Criterion {
  name: string;
  weight: number;
  subCriteria: SubCriterion[];
}

const WeightsResults = ({
  result,
  formFormattedData,
}: {
  result: complexResultType[];
  formFormattedData: ISetOfCriteria[];
}) => {
  const setOfData = formFormattedData[0];
  const criteriaResult = result[0];
  const data: Criterion[] = [];
  const subCriteriaWeights = formFormattedData
    .slice(1)
    .map((setOfData, indexOfSubCriterion) => {
      const subCrResult: { id: string; initialWeight: number }[] = [];
      setOfData.criteria.forEach((criterion, index) => {
        subCrResult.push({
          id: criterion,
          initialWeight:
            ((result[indexOfSubCriterion + 1].variables?.[`w${index}l`] +
              2 * (criteriaResult.variables?.[`w${index}m`] as number) +
              criteriaResult.variables?.[`w${index}u`]) *
              1) /
            4,
        });
      });

      return {
        criterion: formFormattedData[0].criteria[indexOfSubCriterion],
        subCriterionResult: subCrResult,
      };
    });

  setOfData.criteria.forEach((criterion, index) => {
    const weight =
      ((criteriaResult.variables?.[`w${index}l`] +
        2 * criteriaResult.variables?.[`w${index}m`] +
        criteriaResult.variables?.[`w${index}u`]) *
        1) /
      4;
    const subCriteria: {
      id: string;
      initialWeight: number;
      finalWeight: number;
    }[] = subCriteriaWeights[index].subCriterionResult.map((subCriterion) => ({
      id: subCriterion.id,
      initialWeight: subCriterion.initialWeight,
      finalWeight: subCriterion.initialWeight * weight,
    }));

    const finalData = {
      name: criterion,
      weight: weight,
      subCriteria: subCriteria,
    };

    data.push(finalData);
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-lg font-semibold">Tableau récapitulatif des poids</h2>
      <div className="container mx-auto px-4 py-8">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left font-semibold">Critère</th>
              <th className="px-4 py-2 text-left font-semibold">
                Poids du critère
              </th>
              <th className="px-4 py-2 text-left font-semibold">
                Sous-critère
              </th>
              <th className="px-4 py-2 text-left font-semibold">
                Poids initial du sous-critère
              </th>
              <th className="px-4 py-2 text-left font-semibold">
                Poids final du sous-critère
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((criterion, index) => (
              <React.Fragment key={criterion.name}>
                {criterion.subCriteria.map((subCriterion, subIndex) => (
                  <tr
                    key={subCriterion.id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    {subIndex === 0 && (
                      <>
                        <td
                          className="px-4 py-2 align-top border-t overflow-auto whitespace-nowrap"
                          rowSpan={criterion.subCriteria.length}
                        >
                          {criterion.name}
                        </td>
                        <td
                          className="px-4 py-2 align-top border-t"
                          rowSpan={criterion.subCriteria.length}
                        >
                          {criterion.weight.toFixed(4)}
                        </td>
                      </>
                    )}
                    <td className="px-4 py-2 border-t whitespace-nowrap">
                      {subCriterion.id}
                    </td>
                    <td className="px-4 py-2 border-t">
                      {subCriterion.initialWeight.toFixed(4)}
                    </td>
                    <td className="px-4 py-2 border-t">
                      {subCriterion.finalWeight.toFixed(4)}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeightsResults;
