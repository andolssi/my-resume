
import sys
import json
from pulp import *
import contextlib

def solve_lp():
    # Create the model
    model = LpProblem("Fuzzy BWM", LpMaximize)

    # Define variables
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
    model += 1-w3l+w1l*(3/2)>=b
    model += 0<=w3l-w1l*(3/2)
    model += w3l-w1l*(3/2)<=1
    model += 1-w3m+w1m*2>=b
    model += 0<=w3m-w1m*2
    model += w3m-w1m*2<=1
    model += 1-w3u+w1u*(5/2)>=b
    model += 0<=w3u-w1u*(5/2)
    model += w3u-w1u*(5/2)<=1
    model += 1-w3l+w2l*(5/2)>=b
    model += 0<=w3l-w2l*(5/2)
    model += w3l-w2l*(5/2)<=1
    model += 1-w3m+w2m*3>=b
    model += 0<=w3m-w2m*3
    model += w3m-w2m*3<=1
    model += 1-w3u+w2u*(7/2)>=b
    model += 0<=w3u-w2u*(7/2)
    model += w3u-w2u*(7/2)<=1
    model += 1+w3l-w1l*(3/2)>=b
    model += -1<=w3l-(3/2)*w1l
    model += w3l-(3/2)*w1l <= -0.0000000000000001e-05
    model += 1+w3m-w1m*2>=b
    model += -1<=w3m-2*w1m
    model += w3m-2*w1m <= -0.0000000000000001e-05
    model += 1+w3u-w1u*(5/2)>=b
    model += -1<=w3u-(5/2)*w1u
    model += w3u-(5/2)*w1u <= -0.0000000000000001e-05
    model += 1+w2l-w1l*(2/3)>=b
    model += -1<=w2l-(2/3)*w1l
    model += w2l-(2/3)*w1l <= -0.0000000000000001e-05
    model += 1+w2m-w1m*1>=b
    model += -1<=w2m-1*w1m
    model += w2m-1*w1m <= -0.0000000000000001e-05
    model += 1+w2u-w1u*(3/2)>=b
    model += -1<=w2u-(3/2)*w1u
    model += w2u-(3/2)*w1u <= -0.0000000000000001e-05
    model += 0<=b

    model += b<=1

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
