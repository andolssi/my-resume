import { IFinalResultData, ISetOfCriteria } from "@/types/bigFormDataType";
import determineModelType from "./determineModelType";
import { LpProblemData } from "@/types/formattedData";
import translateFuzzyNumbersOfCriteria from "./translateFuzzyNumbersOfCriteria";

const convertSubCriteriaToCriteria = (criterion: string, data: IFinalResultData): ISetOfCriteria => {
    const { subCriteria, evaluation } = data;

    const modelType: "optimistic" | "pessimistic" | "neutral1" | "neutral2" = determineModelType(data.enduringConsideration.subCriteriaConsideration?.[`${criterion}`].considereSubCriterionForeverMostImportant, data.enduringConsideration.subCriteriaConsideration?.[`${criterion}`].considereSubCriterionForeverLessImportant) || 'neutral1'; // default

    // const variables: LpProblemData['variables'] = [
    //     { name: 'b', lowerBound: 0, upperBound: 1 },
    // ];
    // data.criteria.forEach((criterion, index) => {
    //     ['l', 'm', 'u'].forEach((level) => {
    //         const varName = `w${index + 1}${level}`;
    //         const variable = { name: varName, lowerBound: 0 };
    //         variables.push(variable);
    //     });
    // });

    // Translate Fuzzy Numbers
    // const translatedFuzzyNumbersOfCriteria: ITranslatedFuzzyNumber =
    //     translateFuzzyNumbersOfCriteria(data.evaluation, data.criteria);

    const standAloneSubCriteria: ISetOfCriteria = {
        identification: { isSubCriteria: true, info: `subCriteria-${criterion}` },
        criteria: subCriteria[criterion],
        evaluation: {
            mostImportantCriterion: {
                criterion: evaluation.subCriteriaEvaluation[`${criterion}`].mostImportantSubCriterion.subCriterion,
                relations: evaluation.subCriteriaEvaluation[`${criterion}`].mostImportantSubCriterion.relations,
            },
            lessImportantCriterion: {
                criterion: evaluation.subCriteriaEvaluation[`${criterion}`].lessImportantSubCriterion.subCriterion,
                relations: evaluation.subCriteriaEvaluation[`${criterion}`].lessImportantSubCriterion.relations,
            },
        },
        modelType: modelType,
    };

    return standAloneSubCriteria;

}

export default convertSubCriteriaToCriteria