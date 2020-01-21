import { set2d, map2d, flatmap2d } from './2d-array-utils';

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
    return { ...t, horizontalEdges: set2d(t.horizontalEdges, x, y, value) };
}

export function setVerticalEdge(t: MapModel, x: number, y: number, value: Edge): MapModel {
    return { ...t, verticalEdges: set2d(t.verticalEdges, x, y, value) };
}

export function setFloor(t: MapModel, x: number, y: number, value: Floor): MapModel {
    return { ...t, floors: set2d(t.floors, x, y, value) };
}

export function setCell(t: MapModel, x: number, y: number, cell: Cell): MapModel {
    return {
        ...t,
        floors: set2d(t.floors, x, y, cell.floor),
        horizontalEdges: map2d(t.horizontalEdges, (existingValue, colIdx, rowIdx) => {
            if (colIdx === x && rowIdx === y) {
                return cell.north;
            } else if (colIdx === x && rowIdx === y + 1) {
                return cell.south;
            } else {
                return existingValue;
            }
        }),
        verticalEdges: map2d(t.verticalEdges, (existingValue, colIdx, rowIdx) => {
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
