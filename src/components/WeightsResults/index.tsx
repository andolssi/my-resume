import { ISetOfCriteria } from '@/types/bigFormDataType';
import { complexResultType } from '@/types/complexResultType';
import React from 'react';
import useWeightsResults from './useWeightsResults';

const WeightsResults = ({
  result,
  formFormattedData,
}: {
  result: complexResultType[];
  formFormattedData: ISetOfCriteria[];
}) => {
  const { data } = useWeightsResults(result, formFormattedData);

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
