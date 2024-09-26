interface Variable {
    name: string;
    lowerBound?: number; // Optional lower bound for the variable
    upperBound?: number; // Optional lower bound for the variable
}

interface Constraint {
    lowerBound?: number;
    upperBound?: number;
    expression: string; // Expression involving variables (e.g., "1 - w3l + w1l * 3.5")
}

export interface LpProblemData {
    variables: Variable[];
    constraints: Constraint[];
    objectiveVariable: "b", // Name of the variable to maximize (optional)
}