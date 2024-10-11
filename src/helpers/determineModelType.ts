const determineModelType = (condition1: boolean, condition2: boolean) => {
    if (condition1 &&
        condition2) {
        return 'optimistic';
    } else if (!condition1 &&
        !condition2) {
        return 'pessimistic';
    } else if (!condition1 &&
        condition2) {
        return 'neutral1';
    } else if (condition1 &&
        !condition2) {
        return 'neutral2';
    }
};

export default determineModelType