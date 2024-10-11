import sys
import json
from pulp import *
from fractions import Fraction

def add_constraints(model, modelType, part, bestOrWorstCriteria, wjt, fuzzyNumber, b):
    print("---------------------------------------")
    print("bestOrWorstCriteria:", bestOrWorstCriteria)
    print("wjt:", wjt)
    print("fuzzyNumber:", fuzzyNumber)
    print("b:", b)
    print("---------------------------------------")
    if modelType == 'optimistic':
        if part == 'best':
            # model += LpConstraint(e=1 - bestOrWorstCriteria - wjt * fuzzyNumber, sense=1, rhs=b)
            model += 1 - bestOrWorstCriteria - wjt * fuzzyNumber >= b
            model += bestOrWorstCriteria - wjt * fuzzyNumber >= 0
            model += bestOrWorstCriteria-wjt * fuzzyNumber >= 0
        elif part == 'worst':
            model += 1 - wjt - fuzzyNumber * bestOrWorstCriteria >= b
            model += wjt - fuzzyNumber * bestOrWorstCriteria >= 0
            model += wjt - fuzzyNumber * bestOrWorstCriteria <= 1
    elif modelType == 'pessimistic':
        if part == 'best':
            model += 1 + bestOrWorstCriteria - wjt * fuzzyNumber >= b
            model += -1 <= bestOrWorstCriteria - wjt * fuzzyNumber
            model += bestOrWorstCriteria - wjt * fuzzyNumber <= 0
        elif part == 'worst':
            model += 1 + wjt - fuzzyNumber * bestOrWorstCriteria >= b
            model += -1 <= wjt - fuzzyNumber * bestOrWorstCriteria
            model += wjt - fuzzyNumber * bestOrWorstCriteria <= 0
    elif modelType == 'neutral1':
        if part == 'best':
            model += 1 - bestOrWorstCriteria - wjt * fuzzyNumber >= b
            model += 0 <= bestOrWorstCriteria - wjt * fuzzyNumber
            model += bestOrWorstCriteria - wjt * fuzzyNumber <= 1
        elif part == 'worst':
            model += 1 + wjt - bestOrWorstCriteria * fuzzyNumber >= b
            model += -1 <= wjt - fuzzyNumber * bestOrWorstCriteria
            model += wjt - fuzzyNumber * bestOrWorstCriteria <= -0.00001
    elif modelType == 'neutral2':
        if part == 'best':
            # model += LpConstraint(e=1 + bestOrWorstCriteria - wjt * fuzzyNumber >= b)
            # model += LpConstraint(e=bestOrWorstCriteria - wjt * fuzzyNumber, sense=1, rhs=-1)
            # model += LpConstraint(e=bestOrWorstCriteria - wjt * fuzzyNumber , sense=-1, rhs=-0.00001)
            model += 1 + bestOrWorstCriteria - wjt * fuzzyNumber >= b
            model += -1 <= bestOrWorstCriteria - wjt * fuzzyNumber
            model += bestOrWorstCriteria - wjt * fuzzyNumber <= -0.00001
        elif part == 'worst':
            model += 1 - wjt + fuzzyNumber * bestOrWorstCriteria >= b
            model += 0 <= wjt - fuzzyNumber * bestOrWorstCriteria
            model += wjt - fuzzyNumber * bestOrWorstCriteria <= 1

def generate_last_part_constraints(variables, model):
    n = len(variables)
    print('******************************************')
    # Sum of all middle values equals 1
    middle_variables = [variable for variable in variables if 'm' in variable['name']]
    middle_variable_vars = [var['var'] for var in middle_variables]

    # Create the sum expression
    sum_expression = lpSum(middle_variable_vars)
    model += sum_expression == 1
    print('Sum of all middle values: ',sum_expression == 1)

    # Upper bound constraints
    for j in range(n):
        if 'u' in variables[j]['name']:
            expression = [variables[j]['var']]  # Initialize with the current variable
            valid_variables = [variable['var'] for variable in variables if int(variables[j]['name'][1]) != int(variable['name'][1]) and 'l' in variable['name']]
            expression.extend(valid_variables)  # Add valid variables to the expression
            model += lpSum(expression) <= 1  # Sum the variables and add the constraint
            print('Upper bound:',lpSum(expression) <= 1)

    # Lower bound constraints
    for j in range(n):
        if 'l' in variables[j]['name']:
            expression = [variables[j]['var']]
            valid_variables = [variable['var'] for variable in variables if int(variables[j]['name'][1]) != int(variable['name'][1]) and 'u' in variable['name']]
            expression.extend(valid_variables)
            print('Lower bound List:',valid_variables)
            print('Lower bound List ---extend:',expression.extend(valid_variables))
            model += lpSum(expression) >= 1
            print('Lower bound:',lpSum(expression) <= 1)

    # Order constraints for each variable
    for index in range(n // 3):
        lower_bound_var = next(var for var in variables if var['name'] == f'w{index + 1}l')
        middle_var = next(var for var in variables if var['name'] == f'w{index + 1}m')
        upper_bound_var = next(var for var in variables if var['name'] == f'w{index + 1}u')

        model += lower_bound_var['var'] <= middle_var['var']
        model += middle_var['var'] <= upper_bound_var['var']
        print('lower_bound_var:',lower_bound_var['var'] <= middle_var['var'])
        print('middle_var:',middle_var['var'] <= upper_bound_var['var'])

    for j in range(n):
        if 'l' in variables[j]['name']:
            model += variables[j]['var'] >= 0
            print('last liness --- -:',variables[j]['var'] >= 0 )
    print('******************************************')


def fill_variables(data):
    variables = []
    b = None  # Initialize b as None
    for var in data['variables']:
        if var['name'] == 'b':
            b = LpVariable(var['name'], lowBound=var['lowerBound'], upBound=var['upperBound'])
            variables.append({'name': var['name'], 'var': b})
        else:
            variable = LpVariable(var['name'], lowBound=var['lowerBound'])
            variables.append({'name': var['name'], 'var': variable})
    return variables, b


def solve_lp(data):
    # Create the model
    model = LpProblem("Fuzzy_BWM", LpMaximize)

    # Create variables
    # Create variables
    variables, b = fill_variables(data)

    # Set objective
    model += b, "Objective"
    # Debugging: Print the model and variables
    print("Model:", model)
    print("Variables:", variables)

    # Add mostImportantIndex and lessImportantIndex
    mostImportantIndex = data['criteria'].index(data['evaluation']['mostImportantCriterion']['criterion'])
    lessImportantIndex = data['criteria'].index(data['evaluation']['lessImportantCriterion']['criterion'])

    # Add constraints related to best and worst criterion
    print('------------------------relations',data['translatedFuzzyNumbersOfCriteria']['bestRelations'])
    for relations in data['translatedFuzzyNumbersOfCriteria']['bestRelations']:
        print('------------------------best',relations)
        for name, fuzzyNumber in relations.items():
            wjt = next(var['var'] for var in variables if var['name'] == name)
            fuzzyNumber = float(Fraction(fuzzyNumber))  # Convert fraction string to float
            print(fuzzyNumber, '<<<<<<<<<<<fuzzyNumber')
            most_important = next(var['var'] for var in variables if var['name'] == f'w{mostImportantIndex + 1}m')
            add_constraints(model, data['modelType'], 'best', most_important, wjt, fuzzyNumber, b)
    
    for relations in data['translatedFuzzyNumbersOfCriteria']['worstRelations']:
        for name, fuzzyNumber in relations.items():
            wjt = next(var['var'] for var in variables if var['name'] == name)
            fuzzyNumber = float(Fraction(fuzzyNumber))  # Convert fraction string to float
            worst_important = next(var['var'] for var in variables if var['name'] == f'w{lessImportantIndex + 1}m')
            add_constraints(model, data['modelType'], 'worst', worst_important, wjt, fuzzyNumber, b)

    model += 0<=b
    model += b<=1

    # Generate and add the last part constraints
    generate_last_part_constraints(variables[:1], model)

    # Solve the problem
    status = model.solve(PULP_CBC_CMD(gapRel=0.0001))

    # Debugging: Print the constraints
    for name, constraint in model.constraints.items():
        print(f"{name}: {constraint}")

    # Get the results
    results = {
    "status": LpStatus[status],
    "objective": value(model.objective),
    "variables": {var.name: var.varValue for var in model.variables()},
    "constraints": {
        name: {
            "value": constraint.value(),
            "constraint": str(constraint)
        } for name, constraint in model.constraints.items()
        }
    }

    return results

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    all_results = []

    for problem in input_data:
        result = solve_lp(problem)
        if result is not None:
            all_results.append(result)

    print(json.dumps(all_results))