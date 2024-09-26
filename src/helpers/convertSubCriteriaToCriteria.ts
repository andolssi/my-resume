import { IFinalResultData, ISetOfCriteria } from "@/types/bigFormDataType";

const convertSubCriteriaToCriteria = (criterion: string, data: IFinalResultData): ISetOfCriteria => {
    const { subCriteria, evaluation, enduringConsideration } = data;

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
                relations: evaluation.subCriteriaEvaluation[`${criterion}`].mostImportantSubCriterion.relations,
            },
        },
        enduringConsideration: {
            considereCriterionForeverLessImportant: enduringConsideration.subCriteriaConsideration[`${criterion}`].considereSubCriterionForeverLessImportant,
            considereCriterionForeverMostImportant: enduringConsideration.subCriteriaConsideration[`${criterion}`].considereSubCriterionForeverMostImportant,
        }
    };

    return standAloneSubCriteria;

}

export default convertSubCriteriaToCriteria