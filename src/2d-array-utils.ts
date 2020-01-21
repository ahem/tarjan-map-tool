export function map2d<T, R>(
    arr: ReadonlyArray<ReadonlyArray<T>>,
    f: (value: T, x: number, y: number, arr: ReadonlyArray<ReadonlyArray<T>>) => R,
): ReadonlyArray<ReadonlyArray<R>> {
    return arr.map((row, rowIdx) =>
        row.map((existingValue, colIdx) => f(existingValue, colIdx, rowIdx, arr)),
    );
}

export function flatmap2d<T, R>(
    arr: ReadonlyArray<ReadonlyArray<T>>,
    f: (value: T, x: number, y: number, arr: ReadonlyArray<ReadonlyArray<T>>) => R,
): ReadonlyArray<R> {
    return arr.reduce<R[]>(
        (acc, row, rowIdx) =>
            acc.concat(row.map((existingValue, colIdx) => f(existingValue, colIdx, rowIdx, arr))),
        [],
    );
}

export function set2d<T>(
    arr: ReadonlyArray<ReadonlyArray<T>>,
    x: number,
    y: number,
    value: T,
): ReadonlyArray<ReadonlyArray<T>> {
    return map2d(arr, (existingValue, colIdx, rowIdx) =>
        colIdx === x && rowIdx === y ? value : existingValue,
    );
}

