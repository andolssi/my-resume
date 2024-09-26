import { IFinalResultData } from '@/types/bigFormDataType';
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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Objective
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                b
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                w1l
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                w1m
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                w1u
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                w2l
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                w2m
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                w2u
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                w3l
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                w3m
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                w3u
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {result.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="px-4 py-2 whitespace-nowrap">{item.status}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {formatNumber(item.objective)}
                </td>
                {Object.entries(item.variables).map(([key, el], index) => (
                  <React.Fragment key={`${key}-${index}`}>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {formatNumber(item.variables.b)}
                    </td>
                  </React.Fragment>
                ))}

                <td className="px-4 py-2 whitespace-nowrap">
                  {item.variables?.w3l ? formatNumber(item.variables.w3l) : '-'}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {item.variables?.w3m ? formatNumber(item.variables.w3m) : '-'}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {item.variables?.w3u ? formatNumber(item.variables.w3u) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailedSimplexResults;
