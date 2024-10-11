import sys
import json
from gurobipy import Model, GRB, quicksum
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
            model.addConstr(1 - bestOrWorstCriteria - wjt * fuzzyNumber >= b, name="optimistic_best")
            model.addConstr(bestOrWorstCriteria - wjt * fuzzyNumber >= 0, name="optimistic_best_1")
            model.addConstr(bestOrWorstCriteria - wjt * fuzzyNumber >= 0, name="optimistic_best_2")
        elif part == 'worst':
            model.addConstr(1 - wjt - fuzzyNumber * bestOrWorstCriteria >= b, name="optimistic_worst")
            model.addConstr(wjt - fuzzyNumber * bestOrWorstCriteria >= 0, name="optimistic_worst_1")
            model.addConstr(wjt - fuzzyNumber * bestOrWorstCriteria <= 1, name="optimistic_worst_2")
    elif modelType == 'pessimistic':
        if part == 'best':
            model.addConstr(1 + bestOrWorstCriteria - wjt * fuzzyNumber >= b, name="pessimistic_best")
            model.addConstr(-1 <= bestOrWorstCriteria - wjt * fuzzyNumber, name="pessimistic_best_1")
            model.addConstr(bestOrWorstCriteria - wjt * fuzzyNumber <= 0, name="pessimistic_best_2")
        elif part == 'worst':
            model.addConstr(1 + wjt - fuzzyNumber * bestOrWorstCriteria >= b, name="pessimistic_worst")
            model.addConstr(-1 <= wjt - fuzzyNumber * bestOrWorstCriteria, name="pessimistic_worst_1")
            model.addConstr(wjt - fuzzyNumber * bestOrWorstCriteria <= 0, name="pessimistic_worst_2")
    elif modelType == 'neutral1':
        if part == 'best':
            model.addConstr(1 - bestOrWorstCriteria - wjt * fuzzyNumber >= b, name="neutral1_best")
            model.addConstr(0 <= bestOrWorstCriteria - wjt * fuzzyNumber, name="neutral1_best_1")
            model.addConstr(bestOrWorstCriteria - wjt * fuzzyNumber <= 1, name="neutral1_best_2")
        elif part == 'worst':
            model.addConstr(1 + wjt - bestOrWorstCriteria * fuzzyNumber >= b, name="neutral1_worst")
            model.addConstr(-1 <= wjt - fuzzyNumber * bestOrWorstCriteria, name="neutral1_worst_1")
            model.addConstr(wjt - fuzzyNumber * bestOrWorstCriteria <= -0.00001, name="neutral1_worst_2")
    elif modelType == 'neutral2':
        if part == 'best':
            model.addConstr(1 + bestOrWorstCriteria - wjt * fuzzyNumber >= b, name="neutral2_best")
            model.addConstr(-1 <= bestOrWorstCriteria - wjt * fuzzyNumber, name="neutral2_best_1")
            model.addConstr(bestOrWorstCriteria - wjt * fuzzyNumber <= -0.00001, name="neutral2_best_2")
        elif part == 'worst':
            model.addConstr(1 - wjt + fuzzyNumber * bestOrWorstCriteria >= b, name="neutral2_worst")
            model.addConstr(0 <= wjt - fuzzyNumber * bestOrWorstCriteria, name="neutral2_worst_1")
            model.addConstr(wjt - fuzzyNumber * bestOrWorstCriteria <= 1, name="neutral2_worst_2")

def generate_last_part_constraints(variables, model):
    n = len(variables)
    print('******************************************')
    # Sum of all middle values equals 1
    middle_variables = [variable for variable in variables if 'm' in variable['name']]
    middle_variable_vars = [var['var'] for var in middle_variables]

    # Create the sum expression
    sum_expression = quicksum(middle_variable_vars)
    model.addConstr(sum_expression == 1, name="sum_middle_values")
    print('Sum of all middle values: ', sum_expression == 1)

    # Upper bound constraints
    for j in range(n):
        if 'u' in variables[j]['name']:
            expression = [variables[j]['var']]  # Initialize with the current variable
            valid_variables = [variable['var'] for variable in variables if len(variable['name']) > 1 and int(variables[j]['name'][1]) != int(variable['name'][1]) and 'l' in variable['name']]
            expression.extend(valid_variables)  # Add valid variables to the expression
            model.addConstr(quicksum(expression) <= 1, name=f"upper_bound_{j}")
            print('Upper bound:', quicksum(expression) <= 1)

    # Lower bound constraints
    for j in range(n):
        if 'l' in variables[j]['name']:
            expression = [variables[j]['var']]
            valid_variables = [variable['var'] for variable in variables if len(variable['name']) > 1 and int(variables[j]['name'][1]) != int(variable['name'][1]) and 'u' in variable['name']]
            expression.extend(valid_variables)
            model.addConstr(quicksum(expression) >= 1, name=f"lower_bound_{j}")
            print('Lower bound:', quicksum(expression) >= 1)

    # Order constraints for each variable
    for index in range(n // 3):
        lower_bound_var = next(var for var in variables if var['name'] == f'w{index + 1}l')
        middle_var = next(var for var in variables if var['name'] == f'w{index + 1}m')
        upper_bound_var = next(var for var in variables if var['name'] == f'w{index + 1}u')

        model.addConstr(lower_bound_var['var'] <= middle_var['var'], name=f"order_constraint_{index}_1")
        model.addConstr(middle_var['var'] <= upper_bound_var['var'], name=f"order_constraint_{index}_2")
        print('lower_bound_var:', lower_bound_var['var'] <= middle_var['var'])
        print('middle_var:', middle_var['var'] <= upper_bound_var['var'])

    for j in range(n):
        if 'l' in variables[j]['name']:
            model.addConstr(variables[j]['var'] >= 0, name=f"non_negativity_{j}")
            print('last liness --- -:', variables[j]['var'] >= 0)
    print('******************************************')

def fill_variables(data, model):
    variables = []
    b = None  # Initialize b as None
    for var in data['variables']:
        if var['name'] == 'b':
            b = model.addVar(name=var['name'], lb=var['lowerBound'], ub=var['upperBound'], vtype=GRB.CONTINUOUS)
            variables.append({'name': var['name'], 'var': b})
        else:
            variable = model.addVar(name=var['name'], lb=var['lowerBound'], vtype=GRB.CONTINUOUS)
            variables.append({'name': var['name'], 'var': variable})
    return variables, b

def solve_lp(data):
    # Create the model
    model = Model("Fuzzy_BWM")

    # Create variables
    variables, b = fill_variables(data, model)

    # Set objective
    model.setObjective(b, GRB.MAXIMIZE)
    # Debugging: Print the model and variables
    print("Model:", model)
    print("Variables:", variables)

    # Add mostImportantIndex and lessImportantIndex
    mostImportantIndex = data['criteria'].index(data['evaluation']['mostImportantCriterion']['criterion'])
    lessImportantIndex = data['criteria'].index(data['evaluation']['lessImportantCriterion']['criterion'])

    # Add constraints related to best and worst criterion
    print('------------------------relations', data['translatedFuzzyNumbersOfCriteria']['bestRelations'])
    for relations in data['translatedFuzzyNumbersOfCriteria']['bestRelations']:
        print('------------------------best', relations)
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

    model.addConstr(0 <= b, name="b_lower_bound")
    model.addConstr(b <= 1, name="b_upper_bound")

    # Generate and add the last part constraints
    generate_last_part_constraints(variables, model)

    # Solve the problem
    model.optimize()

    # Check the solution status
    if model.Status == GRB.OPTIMAL:
        # Debugging: Print the constraints
        for constraint in model.getConstrs():
            print(f"{constraint.ConstrName}: {constraint}")

        # Get the results
        results = {
            "status": model.Status,
            "objective": model.objVal,
            "variables": {var.varName: var.X for var in model.getVars()},
            "constraints": {
                constraint.ConstrName: {
                    "value": constraint.Slack,
                    "constraint": str(constraint)
                } for constraint in model.getConstrs()
            }
        }
    else:
        results = {
            "status": model.Status,
            "objective": None,
            "variables": None,
            "constraints": None
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