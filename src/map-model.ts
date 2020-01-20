export type Edge = 'unknown' | 'empty' | 'door' | 'wall';

export type Floor = 'unknown' | 'floor';

export type Cell = {
    readonly floor: Floor;
    readonly north: Edge;
    readonly east: Edge;
    readonly south: Edge;
    readonly west: Edge;
};

export type MapModel = {
    readonly floors: ReadonlyArray<ReadonlyArray<Floor>>;
    readonly horizontalEdges: ReadonlyArray<ReadonlyArray<Edge>>;
    readonly verticalEdges: ReadonlyArray<ReadonlyArray<Edge>>;
    readonly width: number;
    readonly height: number;
};

export function init(width: number, height: number): MapModel {
    return {
        floors: new Array<Floor[]>(height)
            .fill([])
            .map(() => new Array<Floor>(width).fill('unknown')),
        horizontalEdges: new Array<Edge[]>(height + 1)
            .fill([])
            .map(() => new Array<Edge>(width).fill('unknown')),
        verticalEdges: new Array<Edge[]>(height)
            .fill([])
            .map(() => new Array<Edge>(width + 1).fill('unknown')),
        width,
        height,
    };
}

function _map<T>(
    arr: ReadonlyArray<ReadonlyArray<T>>,
    f: (x: number, y: number, value: T) => T,
): ReadonlyArray<ReadonlyArray<T>> {
    return arr.map((row, rowIdx) =>
        row.map((existingValue, colIdx) => f(colIdx, rowIdx, existingValue)),
    );
}

function _set<T>(
    arr: ReadonlyArray<ReadonlyArray<T>>,
    x: number,
    y: number,
    value: T,
): ReadonlyArray<ReadonlyArray<T>> {
    return _map(arr, (colIdx, rowIdx, existingValue) =>
        colIdx === x && rowIdx === y ? value : existingValue,
    );
}

function _flatMap<T, R>(
    arr: ReadonlyArray<ReadonlyArray<T>>,
    f: (x: number, y: number, value: T) => R,
): ReadonlyArray<R> {
    return arr.reduce<R[]>((acc, row, y) => acc.concat(row.map((val, x) => f(x, y, val))), []);
}

export function getCell(t: MapModel, x: number, y: number): Cell {
    return {
        floor: t.floors[y][x],
        north: t.horizontalEdges[y][x],
        south: t.horizontalEdges[y + 1][x],
        west: t.verticalEdges[y][x],
        east: t.verticalEdges[y][x + 1],
    };
}

export function setHorizontalEdge(t: MapModel, x: number, y: number, value: Edge): MapModel {
    return { ...t, horizontalEdges: _set(t.horizontalEdges, x, y, value) };
}

export function setVerticalEdge(t: MapModel, x: number, y: number, value: Edge): MapModel {
    return { ...t, verticalEdges: _set(t.verticalEdges, x, y, value) };
}

export function setFloor(t: MapModel, x: number, y: number, value: Floor): MapModel {
    return { ...t, floors: _set(t.floors, x, y, value) };
}

export function setCell(t: MapModel, x: number, y: number, cell: Cell): MapModel {
    return {
        ...t,
        floors: _set(t.floors, x, y, cell.floor),
        horizontalEdges: _map(t.horizontalEdges, (colIdx, rowIdx, existingValue) => {
            if (colIdx === x && rowIdx === y) {
                return cell.north;
            } else if (colIdx === x && rowIdx === y + 1) {
                return cell.south;
            } else {
                return existingValue;
            }
        }),
        verticalEdges: _map(t.verticalEdges, (colIdx, rowIdx, existingValue) => {
            if (colIdx === x && rowIdx === y) {
                return cell.west;
            } else if (colIdx === x + 1 && rowIdx === y) {
                return cell.east;
            } else {
                return existingValue;
            }
        }),
    };
}

export function mapHorizontalEdges<T>(
    t: MapModel,
    cb: (args: { x: number; y: number; value: Edge }) => T,
) {
    return _flatMap(t.horizontalEdges, (x, y, value) => cb({ x, y, value }));
}

export function mapVerticalEdges<T>(
    t: MapModel,
    cb: (args: { x: number; y: number; value: Edge }) => T,
) {
    return _flatMap(t.verticalEdges, (x, y, value) => cb({ x, y, value }));
}

export function mapFloors<T>(t: MapModel, cb: (args: { x: number; y: number; value: Floor }) => T) {
    return _flatMap(t.floors, (x, y, value) => cb({ x, y, value }));
}
