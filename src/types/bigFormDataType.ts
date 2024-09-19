export interface IresultData {
    tolerance: number;
    criteria?: string[];
    subCriteria?: {
        [x: string]: string[];
    };
    evaluation?: {
        mostImportantCriterion: {
            criterion: string;
            relations?: string[];
        };
        lessImportantCriterion?: {
            criterion: string;
            relations?: string[];
        };
        subCriteriaEvaluation?: {
            [criterion: string]: {
                mostImportantSubCriterion: {
                    subCriterion: string;
                    relations?: string[];
                };
                lessImportantSubCriterion?: {
                    subCriterion: string;
                    relations?: string[];
                };
            };
        };
    };
    enduringConsideration?: {
        considereCriterionForeverLessImportant: boolean;
        considereCriterionForeverMostImportant: boolean;
        subCriteriaConsideration?: {
            [criterion: string]: {
                considereSubCriterionForeverLessImportant: boolean;
                considereSubCriterionForeverMostImportant: boolean;
            };
        };
    };
}