from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from pulp import *
import json

app = FastAPI()

# Define the model for the input data
class Variable(BaseModel):
    name: str
    lowerBound: float
    upperBound: float = None  # Optional as some variables may not have an upper bound

class Constraint(BaseModel):
    expression: str

class LPProblem(BaseModel):
    variables: List[Variable]
    objectiveVariable: str
    constraints: List[Constraint]

# Define the solver function
def solve_lp(data: Dict[str, Any]) -> Dict[str, Any]:
    # Create the model
    model = LpProblem("Fuzzy BWM", LpMaximize)

    # Create variables
    b = LpVariable("b", lowBound=0, upBound=1)
    variables = {}
    for var in data['variables']:
        if var['name'] == 'b':
            variables[var['name']] = b
        else:
            variables[var['name']] = LpVariable(var['name'], lowBound=var['lowerBound'])

    # Set objective
    model += variables[data['objectiveVariable']]

    # Add constraints
    for constraint in data['constraints']:
        model += eval(constraint['expression'], {"__builtins__": None}, variables)

    model += 0 <= b
    model += b <= 1

    # Solve the problem
    LpSolverDefault.msg = 1  # Enable more verbose output
    status = model.solve(PULP_CBC_CMD(mip=False, gapRel=0.0001, strong=True, cuts=True))  # Adjust the tolerance here

    # Get the results
    results = {
        "status": LpStatus[status],
        "objective": round(value(model.objective), 10),
        "variables": {var.name: round(var.varValue, 10) for var in model.variables()}
    }

    return results

# Define the FastAPI route
@app.post("/api/solve")
def solve_multiple_lp_problems(problems: List[LPProblem]):
    all_results = []
    
    # Iterate through each problem and solve it
    for problem in problems:
        problem_data = problem.dict()  # Convert Pydantic model to dictionary format
        result = solve_lp(problem_data)
        all_results.append(result)

    # Return the list of results
    return all_results


@app.get("/api/healthcheck")
async def healthcheck():
    return {"status": "ok"}