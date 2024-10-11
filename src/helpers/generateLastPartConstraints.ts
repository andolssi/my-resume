import { LpProblemData } from "@/types/formattedData";

function generateLastPartConstraints(variables: LpProblemData['variables']): { expression: string }[] {
    const constraints: { expression: string }[] = [];
    const n = variables.length;
    constraints.push({ expression: '0<=b\n' })
    constraints.push({ expression: 'b<=1\n' })

    // Sum of all middle values equals 1
    let firstExpressionOftheLastPart = "";
    const middleVariables: string[] = []
    variables.forEach((variable) => {
        if (variable.name.includes('m')) {
            middleVariables.push(variable.name)
        }
    })
    middleVariables.forEach((variable) => {
        firstExpressionOftheLastPart += ` + ${variable}`
    })

    constraints.push({ expression: `${firstExpressionOftheLastPart.slice(3)} == 1` })

    // Upper bound constraints
    for (let j = 0; j < n; j++) {
        if (variables[j].name.includes('u')) {
            const expression = `${variables[j].name} + ${variables.filter((variable, i) => Number(variables[j].name.charAt(1)) !== Number(variable.name.charAt(1))
                && variable.name.includes("l")).map(v => `${v.name}`).join(' + ')} <= 1`;

            constraints.push({ expression });
        }

    }

    // Lower bound constraints
    for (let j = 0; j < n; j++) {
        if (variables[j].name.includes('l')) {
            const expression = `${variables[j].name} + ${variables.filter((variable, i) => Number(variables[j].name.charAt(1)) !== Number(variable.name.charAt(1)) && variable.name.includes("u")).map(v => `${v.name}`).join(' + ')} >= 1`;
            constraints.push({ expression });
        }
    }

    // Order constraints for each variable
    for (let index = 0; index < n / 3; index++) {
        constraints.push({ expression: `w${index + 1}l <= w${index + 1}m` });
        constraints.push({ expression: `w${index + 1}m <= w${index + 1}u` });
    };

    // Order constraints for each variable for l level
    // w1l>=0;
    // w2l>=0;
    // w3l>=0;
    for (let index = 0; index < n / 3; index++) {
        constraints.push({ expression: `w${index + 1}l>=0` });
    };

    return constraints;
}

export default generateLastPartConstraints;