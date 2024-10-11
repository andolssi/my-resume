import { LpProblemData } from "@/types/formattedData"

interface IProp {
    wjt: string,
    fuzzyNumber: string,
    level: string,
    mostOrLessImportantIndex: number,
    constraints: LpProblemData['constraints'],
    modelType: "optimistic" | 'pessimistic' | 'neutral1' | 'neutral2',
    part: "best" | "worst"
}

const defineTheConstraintsModel = ({
    wjt,
    fuzzyNumber,
    level,
    mostOrLessImportantIndex,
    constraints,
    modelType,
    part }: IProp) => {
    const bestOrWorstCriteria = `w${mostOrLessImportantIndex + 1}${level}`;


    if (modelType === 'optimistic') {
        if (part === 'best') {
            constraints.push({ expression: `1-${bestOrWorstCriteria}+${wjt}*${fuzzyNumber}>=b` })
            constraints.push({ expression: `0<=${bestOrWorstCriteria}-${wjt}*${fuzzyNumber}` })
            constraints.push({ expression: `${bestOrWorstCriteria}-${wjt}*${fuzzyNumber}<=1` })
        } else if (part === "worst") {
            constraints.push({ expression: `1-${wjt}+${fuzzyNumber}*${bestOrWorstCriteria}>=b` })
            constraints.push({ expression: `0<=${wjt}-${fuzzyNumber}*${bestOrWorstCriteria}` })
            constraints.push({ expression: `${wjt}-${fuzzyNumber}*${bestOrWorstCriteria}<=1` })
        }
    } else if (modelType === 'pessimistic') {
        if (part === 'best') {
            constraints.push({ expression: `1+${bestOrWorstCriteria}-${wjt}*${fuzzyNumber}>=b` })
            constraints.push({ expression: `-1<=${bestOrWorstCriteria}-${wjt}*${fuzzyNumber}` })
            constraints.push({ expression: `${bestOrWorstCriteria}-${wjt}*${fuzzyNumber}<=0` })
        } else if (part === "worst") {
            constraints.push({ expression: `1+${wjt}-${fuzzyNumber}*${bestOrWorstCriteria}>=b` })
            constraints.push({ expression: `-1<=${wjt}-${fuzzyNumber}*${bestOrWorstCriteria}` })
            constraints.push({ expression: `${wjt}-${fuzzyNumber}*${bestOrWorstCriteria}<=0` })
        }

    } else if (modelType === 'neutral1') {
        if (part === 'best') {
            constraints.push({ expression: `1-${bestOrWorstCriteria}+${wjt}*${fuzzyNumber}>=b` })
            constraints.push({ expression: `0<=${bestOrWorstCriteria}-${wjt}*${fuzzyNumber}` })
            constraints.push({ expression: `${bestOrWorstCriteria}-${wjt}*${fuzzyNumber}<=1` })
        } else if (part === "worst") {
            constraints.push({ expression: `1+${wjt}-${bestOrWorstCriteria}*${fuzzyNumber}>=b` })
            constraints.push({ expression: `-1<=${wjt}-${fuzzyNumber}*${bestOrWorstCriteria}` })
            constraints.push({ expression: `${wjt}-${fuzzyNumber}*${bestOrWorstCriteria} <= -0.0000000000000001e-05` })
        }
    } else if (modelType === 'neutral2') {
        if (part === 'best') {
            constraints.push({ expression: `1+${bestOrWorstCriteria}-${wjt}*${fuzzyNumber}>=b` })
            constraints.push({ expression: `-1<=${bestOrWorstCriteria}-${wjt}*${fuzzyNumber}` })
            constraints.push({ expression: `${bestOrWorstCriteria}-${wjt}*${fuzzyNumber} <= -0.0000000000000001e-05` })
        } else if (part === "worst") {
            constraints.push({ expression: `1-${wjt}+${fuzzyNumber}*${bestOrWorstCriteria}>=b` })
            constraints.push({ expression: `0<=${wjt}-${fuzzyNumber}*${bestOrWorstCriteria}` })
            constraints.push({ expression: `${wjt}-${fuzzyNumber}*${bestOrWorstCriteria}<=1` })
        }
    }

}
export default defineTheConstraintsModel;
