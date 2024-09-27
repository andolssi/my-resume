import { LpProblemData } from "@/types/formattedData"

const defineTheConstraintsModel = (
    name: string,
    number: string,
    level: string,
    mostImportantIndex: number,
    constraints: LpProblemData['constraints'],
    modelType: "optimistic" | 'pessimistic' | 'neutral1' | 'neutral2',
    part: "best" | "worst") => {


    if (modelType === 'optimistic') {
        constraints.push({ expression: `1-w${mostImportantIndex + 1}${level}+${name}*${number}>=b` })
        constraints.push({ expression: `0<=w${mostImportantIndex + 1}${level}-${name}*${number}` })
        constraints.push({ expression: `w${mostImportantIndex + 1}${level}-${name}*${number}<=1` })
    } else if (modelType === 'pessimistic') {
        constraints.push({ expression: `1+${name}-w${mostImportantIndex + 1}${level}*${number}>=b` })
        constraints.push({ expression: `-1<=${name}-w${mostImportantIndex + 1}${level}*${number}` })
        constraints.push({ expression: `${name}-w${mostImportantIndex + 1}${level}*${number}<=0` })
    } else if (modelType === 'neutral1') {
        if (part === 'best') {
            constraints.push({ expression: `1-w${mostImportantIndex + 1}${level}+${name}*${number}>=b` })
            constraints.push({ expression: `0<=w${mostImportantIndex + 1}${level}-${name}*${number}` })
            constraints.push({ expression: `w${mostImportantIndex + 1}${level}-${name}*${number}<=1` })
        } else if (part === "worst") {
            constraints.push({ expression: `1+${name}-w${mostImportantIndex + 1}${level}*${number}>=b` })
            constraints.push({ expression: `-1<= ${name}-w${mostImportantIndex + 1}${level}*${number}` })
            constraints.push({ expression: `${name}-w${mostImportantIndex + 1}${level}*${number}<=0` })
        }
    } else if (modelType === 'neutral2') {
        if (part === 'best') {
            constraints.push({ expression: `1+${name}-w${mostImportantIndex + 1}${level}*${number}>=b` })
            constraints.push({ expression: `-1<=${name}-w${mostImportantIndex + 1}${level}*${number}` })
            constraints.push({ expression: `${name}-w${mostImportantIndex + 1}${level}*${number}<=0` })

        } else if (part === "worst") {
            constraints.push({ expression: `1-w${mostImportantIndex + 1}${level}+${name}*${number}>=b` })
            constraints.push({ expression: `0<=w${mostImportantIndex + 1}${level}-${name}*${number}` })
            constraints.push({ expression: `w${mostImportantIndex + 1}${level}-${name} * ${number}<=1` })
        }
    }
}
export default defineTheConstraintsModel;