import React from 'react';
import { IresultData } from './index';

const ResultDataPresentation: React.FC<{ data: IresultData }> = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        Confirmation d'informations
      </h2>
      <div className="p-6 flex flex-col md:flex-row overflow-y-auto max-h-[37rem] gap-4 rounded">
        <div className="">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Critères
            </h3>
            <ul className="list-disc pl-5">
              {data.criteria?.map((criterion, index) => (
                <li key={`${criterion}${index}`} className="text-gray-600">
                  {criterion}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Sous-critères
            </h3>
            {Object.entries(data.subCriteria || {}).map(
              ([criterion, subCriterion], index) => (
                <div key={index} className="mb-3">
                  <h4 className="font-medium text-gray-700">{criterion}</h4>
                  <ul className="list-disc pl-5">
                    {subCriterion.map((subCriterion, subIndex) => (
                      <li key={subIndex} className="text-gray-600">
                        {subCriterion}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Considération durable
            </h3>
            <div className="bg-gray-100 p-4 rounded">
              <p className="text-gray-600">
                Critère toujours considéré comme le plus important:
                <span
                  className={`ml-2 font-medium ${
                    data.enduringConsideration
                      ?.considereCriterionForeverMostImportant
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {data.enduringConsideration
                    ?.considereCriterionForeverMostImportant
                    ? 'Yes'
                    : 'No'}
                </span>
              </p>

              <p className="text-gray-600 mt-2">
                Critère toujours considéré comme le moins important:
                <span
                  className={`ml-2 font-medium ${
                    data.enduringConsideration
                      ?.considereCriterionForeverLessImportant
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {data.enduringConsideration
                    ?.considereCriterionForeverLessImportant
                    ? 'Yes'
                    : 'No'}
                </span>
              </p>

              <p className="text-gray-600">
                {Object.entries(
                  data.enduringConsideration?.subCriteriaConsideration || {},
                ).map(([criterion, subCriterion], index) => (
                  <React.Fragment key={index}>
                    <h4 className="font-medium text-gray-700">{criterion}</h4>
                    Sous-critere toujours considéré comme le plus important:
                    <span
                      className={`ml-2 font-medium ${
                        subCriterion.considereSubCriterionForeverMostImportant
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {subCriterion.considereSubCriterionForeverMostImportant
                        ? 'Yes'
                        : 'No'}
                    </span>
                    <br />
                    Sous-critere toujours considéré comme le moins important:
                    <span
                      className={`ml-2 font-medium ${
                        subCriterion.considereSubCriterionForeverLessImportant
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {subCriterion.considereSubCriterionForeverLessImportant
                        ? 'Yes'
                        : 'No'}
                    </span>
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Niveau de tolérance
            </h3>
            <p className="text-gray-600">
              Niveau de tolérance: {data.tolerance}
            </p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Evaluation
            </h3>
            <div className="bg-gray-100 p-4 rounded">
              <p className="font-medium text-gray-700">
                Critère le plus important:
                <span className="text-blue-600 ml-2">
                  {data.evaluation?.mostImportantCriterion.criterion}
                </span>
              </p>
              <p className="font-medium text-gray-700 mt-2">
                Critère le moins important:
                <span className="text-red-600 ml-2">
                  {data.evaluation?.lessImportantCriterion?.criterion}
                </span>
              </p>
              {Object.entries(data.evaluation?.subCriteriaEvaluation || {}).map(
                ([criterion, subCriterion], index) => (
                  <React.Fragment key={index}>
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold text-gray-700">
                        {criterion}
                      </h3>
                      <h4 className="font-medium text-gray-700">
                        ❇️ Sous-critere le plus important:{' '}
                        {subCriterion.mostImportantSubCriterion.subCriterion}
                      </h4>
                    </div>
                    <div key={index} className="mb-3">
                      <h4 className="font-medium text-gray-700">
                        🔻 Sous-critere le moins important:{' '}
                        {subCriterion.lessImportantSubCriterion?.subCriterion}
                      </h4>
                    </div>
                  </React.Fragment>
                ),
              )}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-gray-700">
              Relation entre les critères et les sous-critères
            </h3>
            <div className="bg-gray-100 p-4 rounded mb-3">
              <div className="pb-5">
                <h4 className="font-normal text-gray-700">
                  ❇️{data.evaluation?.mostImportantCriterion.criterion}
                </h4>

                {data.evaluation?.mostImportantCriterion.relations?.map(
                  (el) => (
                    <h4 key={el} className="font-medium text-gray-700">
                      {el}{' '}
                    </h4>
                  ),
                )}
                <h4 className="font-normal text-gray-700">
                  🔻{data.evaluation?.lessImportantCriterion?.criterion}
                </h4>

                {data.evaluation?.lessImportantCriterion?.relations?.map(
                  (el) => (
                    <h4 key={el} className="font-medium text-gray-700">
                      {el}{' '}
                    </h4>
                  ),
                )}
              </div>
              {Object.entries(data.evaluation?.subCriteriaEvaluation || {}).map(
                ([criterion, subCriterion], index) => (
                  <React.Fragment key={index}>
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold text-gray-700">
                        {criterion}
                      </h3>
                      <h4 className="font-normal text-gray-700">
                        ❇️{subCriterion.mostImportantSubCriterion.subCriterion}
                      </h4>

                      {subCriterion.mostImportantSubCriterion.relations?.map(
                        (el) => (
                          <h4 key={el} className="font-medium text-gray-700">
                            {el}{' '}
                          </h4>
                        ),
                      )}
                      <h4 className="font-normal text-gray-700">
                        🔻{subCriterion.lessImportantSubCriterion?.subCriterion}
                      </h4>

                      {subCriterion.lessImportantSubCriterion?.relations?.map(
                        (el) => (
                          <h4 key={el} className="font-medium text-gray-700">
                            {el}{' '}
                          </h4>
                        ),
                      )}
                    </div>
                  </React.Fragment>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDataPresentation;
