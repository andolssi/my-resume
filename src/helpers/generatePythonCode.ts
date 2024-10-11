import { LpProblemData } from "@/types/formattedData";

const generatePythonCode = (data: LpProblemData) => {

    let variablesString = '';
    let constraintsString = '';

    // Generate variables
    data.variables.forEach((variable) => {
        if (variable.upperBound !== undefined) {
            variablesString += `    ${variable.name} = LpVariable("${variable.name}", lowBound=${variable.lowerBound || 0}, upBound=${variable.upperBound})\n`;
        } else {
            variablesString += `    ${variable.name} = LpVariable("${variable.name}", lowBound=${variable.lowerBound || 0})\n`;
        }
    });

    // Generate constraints
    data.constraints.forEach((constraint, index) => {
        constraintsString += `    model += ${constraint.expression}\n`;
    });

    return { variablesString, constraintsString }
};

export default generatePythonCode