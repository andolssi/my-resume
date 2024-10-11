import { ISetOfCriteria } from "@/types/bigFormDataType";
import { complexResultType } from "@/types/complexResultType";

export interface SubCriterion {
    id: string;
    initialWeight: number;
    finalWeight: number;
}

export interface Criterion {
    name: string;
    weight: number;
    subCriteria: SubCriterion[];
}


const useWeightsResults = (
    result: complexResultType[],
    formFormattedData: ISetOfCriteria[]
) => {

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
                        ((result[indexOfSubCriterion + 1]?.variables?.[`w${index + 1}l`] +
                            2 * (criteriaResult.variables?.[`w${index + 1}m`] as number) +
                            criteriaResult.variables?.[`w${index + 1}u`]) *
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
            ((criteriaResult.variables?.[`w${index + 1}l`] +
                2 * criteriaResult.variables?.[`w${index + 1}m`] +
                criteriaResult.variables?.[`w${index + 1}u`]) *
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

    return {
        data
    }
}

export default useWeightsResults;