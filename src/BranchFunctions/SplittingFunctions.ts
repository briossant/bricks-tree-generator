
export interface SplittingFunctions {
    (i:number, length: number): boolean
}


export const midSplit: SplittingFunctions = (i, length) => {
    if (i == Math.floor(length/2)) return true;
    if (i < length/2) return false;

    return Math.random() < 0.1;
}

