'use server'

const fs = require('fs');
import path from 'path';
import generatePythonCode from '@/helpers/generatePythonCode';
import { LpProblemData } from '@/types/formattedData';

export async function generateTheProblem(data: LpProblemData[]) {

    // Generate Python code for each set of criteria
    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        const { variablesString, constraintsString } = await generatePythonCode(element)

        console.log({ variablesString, constraintsString });


        const pythonCode = `
import sys
import json
from pulp import *
import contextlib

def solve_lp():
    # Create the model
    model = LpProblem("Fuzzy BWM", LpMaximize)

    # Define variables
${variablesString}
    # Set objective
    model += ${element.objectiveVariable}

    # Add constraints
${constraintsString}
    # Solve the problem
    with contextlib.redirect_stdout(sys.stderr):
        status = model.solve()

    # Get the results
    results = {
        "status": LpStatus[status],
        "objective": value(model.objective),
        "variables": {var.name: var.varValue for var in model.variables()}
    }

    return results

if __name__ == "__main__":
    result = solve_lp()
    print(json.dumps(result))
`;


        const pythonDir = path.join(process.cwd(), 'python');
        if (!fs.existsSync(pythonDir)) {
            fs.mkdirSync(pythonDir, { recursive: true });
        }


        const pythonScriptPath = path.join(pythonDir, `generated_dynamic_fuzzy_bwm${index}.py`);
        console.log({ pythonCode, pythonScriptPath });

        fs.writeFile(pythonScriptPath, pythonCode, (err: any) => {
            if (err) throw err;
            console.log('The dynamic Python file has been saved successfully!!');
        });
    }
}