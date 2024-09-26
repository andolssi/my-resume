import { ISetOfCriteria } from "@/types/bigFormDataType"
import { LpProblemData } from "@/types/formattedData"
import translateFuzzyNumbersOfCriteria from "./translateFuzzyNumbersOfCriteria";
import formateConstraints from "./formateConstraints";
import generateLastPartConstraints from "./generateLastPartConstraints";



const formateFormData = (data: ISetOfCriteria): LpProblemData => {
    const { criteria, evaluation, enduringConsideration } = data;

    if (!criteria || !evaluation || !evaluation.mostImportantCriterion || !evaluation.lessImportantCriterion) {
        throw new Error('Invalid input data');
    }
    const mostImportantIndex = criteria.indexOf(evaluation.mostImportantCriterion.criterion);
    const lessImportantIndex = criteria.indexOf(evaluation.lessImportantCriterion.criterion);

    if (mostImportantIndex === -1 || lessImportantIndex === -1) {
        throw new Error('Invalid criterion indices');
    }

    // Define the name of the model type
    let modelType: "optimistic" | "pessimistic" | "neutral1" | "neutral2" = 'neutral1'; // default
    if (enduringConsideration.considereCriterionForeverMostImportant &&
        enduringConsideration.considereCriterionForeverLessImportant) {
        modelType = 'optimistic';
    } else if (!enduringConsideration.considereCriterionForeverMostImportant &&
        !enduringConsideration.considereCriterionForeverLessImportant) {
        modelType = 'pessimistic';
    } else if (enduringConsideration.considereCriterionForeverMostImportant &&
        !enduringConsideration.considereCriterionForeverLessImportant) {
        modelType = 'neutral1';
    } else if (!enduringConsideration.considereCriterionForeverMostImportant &&
        enduringConsideration.considereCriterionForeverLessImportant) {
        modelType = 'neutral2';
    }

    // Define variables
    const variables: LpProblemData['variables'] = [{ name: "b", lowerBound: 0, upperBound: 1 }]
    criteria.forEach((criterion, index) => {
        ['l', 'm', 'u'].forEach(level => {
            const varName = `w${index + 1}${level}`;
            const variable = { name: varName, lowerBound: 0 };
            variables.push(variable)
        });
    });

    // Translate Fuzzy Numbers
    const translatedFuzzyNumbersOfCriteria: {
        bestRelations: {
            [key: string]: string
        }[],
        worstRelations: {
            [key: string]: string
        }[]
    } = translateFuzzyNumbersOfCriteria(evaluation, criteria);

    // Define constraints
    const constraints: LpProblemData['constraints'] = [];
    formateConstraints(constraints, translatedFuzzyNumbersOfCriteria, mostImportantIndex, lessImportantIndex, modelType)

    const lastPartConstraints = generateLastPartConstraints(variables.slice(1));

    return {
        variables,
        constraints: [...constraints, ...lastPartConstraints],
        objectiveVariable: "b",
    };
}

export default formateFormData