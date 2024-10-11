import { complexResultType } from '@/types/complexResultType';
import React from 'react';

const DetailedSimplexResults = ({
  result,
}: {
  result: complexResultType[];
}) => {
  const formatNumber = (num: number) => {
    return num.toFixed(4);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {result?.map((item, index) => (
        <div className="overflow-x-auto" key={`${index + 1}-${item.objective}`}>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Objective
                </th>

                {Object.entries(item.variables).map(([key, el], index) => (
                  <th
                    className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    key={`${key}-${index}`}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              <tr className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-4 py-2 whitespace-nowrap">{item.status}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {formatNumber(item.objective)}
                </td>
                {Object.entries(item.variables).map(([key, el], index) => (
                  <td
                    className="px-4 py-2 whitespace-nowrap"
                    key={`${key}-${index}`}
                  >
                    {formatNumber(el)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default DetailedSimplexResults;
