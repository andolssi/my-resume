export interface complexResultType {
    objective: number;
    status: string
    variables: {
        [key: string]: number;
    }
}