import { LpProblemData } from "@/types/formattedData";
import defineTheConstraintsModel from "./defineTheConstraintsModel";
import { ITranslatedFuzzyNumber } from "@/types/bigFormDataType";

const formateConstraints = (constraints: LpProblemData['constraints'],
    translatedFuzzyNumbersOfCriteria: ITranslatedFuzzyNumber,
    mostImportantIndex: number,
    lessImportantIndex: number,
    modelType: "optimistic" | "pessimistic" | "neutral1" | "neutral2") => {

    // Add constraints for each criterion
    Object.entries(translatedFuzzyNumbersOfCriteria.bestRelations).forEach(([_, relations]) => {
        Object.entries(relations).forEach(([name, fuzzyNumberAsString]) => {

            const level = name?.[name.length - 1]
            const part = "best";
            defineTheConstraintsModel({ wjt: name, fuzzyNumber: fuzzyNumberAsString, level, mostOrLessImportantIndex: mostImportantIndex, constraints, modelType, part });
        })
    });
    Object.entries(translatedFuzzyNumbersOfCriteria.worstRelations).forEach(([_, relations]) => {
        Object.entries(relations).forEach(([name, fuzzyNumberAsString]) => {
            const level = name?.[name.length - 1]
            const part = "worst";
            defineTheConstraintsModel({ wjt: name, fuzzyNumber: fuzzyNumberAsString, level, mostOrLessImportantIndex: lessImportantIndex, constraints, modelType, part });
        });
    });
}


export default formateConstraints;