import sys
import json
from pulp import *

def solve_lp(data):
    # Create the model
    model = LpProblem("Fuzzy BWM", LpMaximize)

    # Create variables
    b = LpVariable("b", lowBound=0, upBound=1)
    variables = {}
    for var in data['variables']:
        if var['name'] == 'b':
            # variables[var['name']] = LpVariable(var['name'], lowBound=var['lowerBound'], upBound=var['upperBound'])
            variables[var['name']] = b
        else:
            variables[var['name']] = LpVariable(var['name'], lowBound=var['lowerBound'])

    # Set objective
    model += variables[data['objectiveVariable']]

    # Add constraints
    for constraint in data['constraints']:
        model += eval(constraint['expression'], {"__builtins__": None}, variables)

    model += 0<=b
    model += b<=1

    # Solve the problem
    LpSolverDefault.msg = 1  # Enable more verbose output
    status = model.solve(PULP_CBC_CMD(gapRel=0.0001))  # Adjust the tolerance here

    # Get the results
    results = {
        "status": LpStatus[status],
        "objective": round(value(model.objective), 10),
        "variables": {var.name: round(var.varValue, 10) for var in model.variables()}
    }

    return results

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    all_results = []

    for problem in input_data:
        result = solve_lp(problem)
        all_results.append(result)

    print(json.dumps(all_results))