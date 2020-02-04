export function init2d<T>(width: number, height: number, f: () => T): readonly (readonly T[])[] {
    let arr: T[][] = [];
    for (let y = 0; y < height; y++) {
        arr[y] = [];
        for (let x = 0; x < width; x++) {
            arr[y][x] = f();
        }
    }
    return arr;
}

export function map2d<T, R>(
    arr: readonly (readonly T[])[],
    f: (value: T, x: number, y: number, arr: readonly (readonly T[])[]) => R,
): readonly (readonly R[])[] {
    return arr.map((row, rowIdx) =>
        row.map((existingValue, colIdx) => f(existingValue, colIdx, rowIdx, arr)),
    );
}

export function flatmap2d<T, R>(
    arr: readonly (readonly T[])[],
    f: (value: T, x: number, y: number, arr: readonly (readonly T[])[]) => R,
): readonly R[] {
    return arr.reduce<R[]>(
        (acc, row, rowIdx) =>
            acc.concat(row.map((existingValue, colIdx) => f(existingValue, colIdx, rowIdx, arr))),
        [],
    );
}

export function set2d<T>(
    arr: readonly (readonly T[])[],
    x: number,
    y: number,
    value: T,
): readonly (readonly T[])[] {
    return map2d(arr, (existingValue, colIdx, rowIdx) =>
        colIdx === x && rowIdx === y ? value : existingValue,
    );
}

export function resize2d<T>(
    arr: readonly (readonly T[])[],
    width: number,
    height: number,
    f: () => T,
): readonly (readonly T[])[] {
    let res: T[][] = [];
    for (let y = 0; y < height; y++) {
        res[y] = [];
        for (let x = 0; x < width; x++) {
            res[y][x] = y < arr.length && x < arr[y].length ? arr[y][x] : f();
        }
    }
    return res;
}
