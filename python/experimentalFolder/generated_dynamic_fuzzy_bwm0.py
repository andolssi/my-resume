
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
    model += 1+w1l-w2l*(3/2)>=b
    model += -1<=w1l-w2l*(3/2)
    model += w1l-w2l*(3/2) <= -0.0000000000000001e-05
    model += 1+w1m-w2m*2>=b
    model += -1<=w1m-w2m*2
    model += w1m-w2m*2 <= -0.0000000000000001e-05
    model += 1+w1u-w2u*(5/2)>=b
    model += -1<=w1u-w2u*(5/2)
    model += w1u-w2u*(5/2) <= -0.0000000000000001e-05
    model += 1+w1l-w3l*(7/2)>=b
    model += -1<=w1l-w3l*(7/2)
    model += w1l-w3l*(7/2) <= -0.0000000000000001e-05
    model += 1+w1m-w3m*4>=b
    model += -1<=w1m-w3m*4
    model += w1m-w3m*4 <= -0.0000000000000001e-05
    model += 1+w1u-w3u*(9/2)>=b
    model += -1<=w1u-w3u*(9/2)
    model += w1u-w3u*(9/2) <= -0.0000000000000001e-05
    model += 1-w1l+(7/2)*w3l>=b
    model += 0<=w1l-(7/2)*w3l
    model += w1l-(7/2)*w3l<=1
    model += 1-w1m+4*w3m>=b
    model += 0<=w1m-4*w3m
    model += w1m-4*w3m<=1
    model += 1-w1u+(9/2)*w3u>=b
    model += 0<=w1u-(9/2)*w3u
    model += w1u-(9/2)*w3u<=1
    model += 1-w2l+(2/3)*w3l>=b
    model += 0<=w2l-(2/3)*w3l
    model += w2l-(2/3)*w3l<=1
    model += 1-w2m+1*w3m>=b
    model += 0<=w2m-1*w3m
    model += w2m-1*w3m<=1
    model += 1-w2u+(3/2)*w3u>=b
    model += 0<=w2u-(3/2)*w3u
    model += w2u-(3/2)*w3u<=1
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
