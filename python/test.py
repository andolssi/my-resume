import sys
import json
from pulp import *
import contextlib

def solve_lp():
    # Create the model
    model = LpProblem("Fuzzy BWM", LpMaximize)

    

    b = LpVariable("b", lowBound=0, upBound=1)
    w1l = LpVariable("w1l", lowBound=0)
    w1m = LpVariable("w1m", lowBound=0)
    w1u = LpVariable("w1u", lowBound=0)
    w2l = LpVariable("w2l", lowBound=0)
    w2m = LpVariable("w2m", lowBound=0)
    w2u = LpVariable("w2u", lowBound=0)
    w3l = LpVariable("w3l", lowBound=0)
    w3m = LpVariable("w3m", lowBound=0)
    w3u = LpVariable("w3u", lowBound=0)

    # Set objective
    model += b

    # Add constraints
    model += 1 - w3l + w1l * 3.5 >= b
    model += 0 <= w3l - w1l * 3.5
    model += w3l - w1l * 3.5 <= 1
    model += 1 - w3m + w1m * 4 >= b
    model += 0 <= w3m - w1m * 4
    model += w3m - w1m * 4 <= 1
    model += 1 - w3u + w1u * 4.5 >= b
    model += 0 <= w3u - w1u * 4.5
    model += w3u - w1u * 4.5 <= 1
    model += 1 - w3l + w2l * (2/3) >= b
    model += 0 <= w3l - w2l * (2/3)
    model += w3l - w2l * (2/3) <= 1
    model += 1 - w3m + w2m >= b
    model += 0 <= w3m - w2m
    model += w3m - w2m <= 1
    model += 1 - w3u + w2u * 1.5 >= b
    model += 0 <= w3u - w2u * 1.5
    model += w3u - w2u * 1.5 <= 1
    model += 1 + w2l - w1l * 3.5 >= b 
    model += -1 <= w2l - w1l * 3.5
    model += w2l - w1l * 3.5 <= 0
    model += 1 + w2m - w1m * 4 >= b
    model += -1 <= w2m - w1m * 4
    model += w2m - w1m * 4 <= 0
    model += 1 + w2u - w1u * 4.5 >= b
    model += -1 <= w2u - w1u * 4.5
    model += w2u - w1u * 4.5 <= 0
    model += 1 + w3l - w1l * 3.5 >= b
    model += -1 <= w3l - w1l * 3.5
    model += w3l - w1l * 3.5 <= 0
    model += 1 + w3m - w1m * 4 >= b
    model += -1 <= w3m - w1m * 4
    model += w3m - w1m * 4 <= 0
    model += 1 + w3u - w1u * 4.5 >= b
    model += -1 <= w3u - w1u * 4.5
    model += w3u - w1u * 4.5 <= 0
    model += w1m + w2m + w3m == 1
    model += w1u + w2l + w3l <= 1
    model += w2u + w1l + w3l <= 1
    model += w3u + w1l + w2l <= 1
    model += w1l + w2u + w3u >= 1
    model += w2l + w1u + w3u >= 1
    model += w3l + w1u + w2u >= 1
    model += w1l <= w1m
    model += w1m <= w1u
    model += w2l <= w2m
    model += w2m <= w2u
    model += w3l <= w3m
    model += w3m <= w3u
    
    # Solve the problem
    # with contextlib.redirect_stdout(sys.stderr):
    #     status = model.solve()

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
    # input_data = json.loads(sys.argv[1])
    # result = solve_lp(input_data)
    print("python directory--------------------------------------")
    result = solve_lp()
    print(json.dumps(result))