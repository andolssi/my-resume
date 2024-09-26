import { ISetOfCriteria } from "@/types/bigFormDataType";

interface TriangularFuzzyNumber {
    l: string;
    m: string;
    u: string;
}

interface SubCriteriaEvaluationType {
    mostImportantSubCriterion: {
        subCriterion: string;
        relations: string[];
    };
    lessImportantSubCriterion: {
        subCriterion: string;
        relations: string[];
    };
}

const fuzzyNumbers: { [key: string]: TriangularFuzzyNumber } = {
    'Egalement important': { l: '1', m: '1', u: '1' },
    'Faiblement important': { l: '(2/3)', m: "1", u: "(3/2)" },
    'Assez important': { l: "(3/2)", m: "2", u: "(5/2)" },
    'Très important': { l: "(5/2)", m: "3", u: "(7/2)" },
    'Absolument important': { l: "(7/2)", m: "4", u: "(9/2)" },
};


const translateFuzzyNumbersOfCriteria = (evaluation: ISetOfCriteria['evaluation'], criteria: ISetOfCriteria['criteria']): { bestRelations: { [key: string]: string }[], worstRelations: { [key: string]: string }[] } => {
    const results: { bestRelations: { [key: string]: string }[], worstRelations: { [key: string]: string }[] } = { bestRelations: [], worstRelations: [] }
    const mostImportantCriterionRelations = evaluation?.mostImportantCriterion?.relations;
    const lessImportantCriterionRelations = evaluation?.lessImportantCriterion?.relations;

    mostImportantCriterionRelations.forEach((relation) => {
        const [importance, comparedCriterion] = relation.split('-');
        const comparedIndex = criteria.indexOf(comparedCriterion);
        const fuzzyNumber = fuzzyNumbers[importance];

        ['l', 'm', 'u'].forEach(level => {
            results.bestRelations.push({ [`w${comparedIndex + 1}${level}`]: fuzzyNumber?.[level as 'l' | 'm' | 'u'] })
        });
    })
    lessImportantCriterionRelations.forEach((relation) => {
        const [importance, comparedCriterion] = relation.split('-');
        const comparedIndex = criteria.indexOf(comparedCriterion);
        const fuzzyNumber = fuzzyNumbers[importance];

        ['l', 'm', 'u'].forEach(level => {
            results.worstRelations.push({ [`w${comparedIndex + 1}${level}`]: fuzzyNumber?.[level as 'l' | 'm' | 'u'] })
        });
    })

    return results
}

export default translateFuzzyNumbersOfCriteria
