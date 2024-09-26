import { LpProblemData } from "@/types/formattedData";
import defineTheConstraintsModel from "./defineTheConstraintsModel";

const formateConstraints = (constraints: LpProblemData['constraints'],
    translatedFuzzyNumbersOfCriteria: {
        bestRelations: {
            [key: string]: string
        }[],
        worstRelations: {
            [key: string]: string
        }[]
    },
    mostImportantIndex: number,
    lessImportantIndex: number,
    modelType: "optimistic" | "pessimistic" | "neutral1" | "neutral2") => {
    // Add constraints for each criterion
    Object.entries(translatedFuzzyNumbersOfCriteria.bestRelations).forEach(([index, relations]) => {
        Object.entries(relations).forEach(([name, fuzzyNumberAsString]) => {
            const level = name?.[name.length - 1]
            const part = "best";
            defineTheConstraintsModel(name, fuzzyNumberAsString, level, mostImportantIndex, constraints, modelType, part);
        })
    });
    Object.entries(translatedFuzzyNumbersOfCriteria.worstRelations).forEach(([index, relations]) => {
        Object.entries(relations).forEach(([name, fuzzyNumberAsString]) => {
            const level = name?.[name.length - 1]
            const part = "worst";
            defineTheConstraintsModel(name, fuzzyNumberAsString, level, lessImportantIndex, constraints, modelType, part);
        });
    });
}


export default formateConstraints;