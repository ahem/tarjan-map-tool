import { init2d, set2d, map2d } from './2d-array-utils';

export type Edge = 'empty' | 'door' | 'wall';

export type Floor = 'unknown' | 'floor' | 'darkness';

export type Cell = {
    readonly floor: Floor;
    readonly north: Edge;
    readonly east: Edge;
    readonly south: Edge;
    readonly west: Edge;
    readonly text?: string;
};

export type MapModel = {
    readonly floors: readonly (readonly Floor[])[];
    readonly horizontalEdges: readonly (readonly Edge[])[];
    readonly verticalEdges: readonly (readonly Edge[])[];
    readonly width: number;
    readonly height: number;
    readonly texts: readonly {
        readonly value: string;
        readonly x: number;
        readonly y: number;
    }[];
};

export function init(width: number, height: number): MapModel {
    return {
        floors: init2d(width, height, () => 'unknown'),
        horizontalEdges: init2d(width, height + 1, () => 'empty'),
        verticalEdges: init2d(width + 1, height, () => 'empty'),
        texts: [],
        width,
        height,
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

export function setText(
    t: MapModel,
    x: number,
    y: number,
    value: string | undefined | null,
): MapModel {
    const texts = t.texts.filter(o => o.x !== x || o.y !== y);
    if (value) {
        return { ...t, texts: texts.concat({ x, y, value }) };
    }
    return { ...t, texts };
}

export function setCell(t: MapModel, x: number, y: number, cell: Cell): MapModel {
    const texts = t.texts.filter(o => o.x !== x && o.y !== y);
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
        texts: cell.text ? texts.concat({ x, y, value: cell.text }) : texts,
    };
}

export function getCell(t: MapModel, x: number, y: number): Cell {
    return {
        floor: t.floors[y][x],
        north: t.horizontalEdges[y][x],
        south: t.horizontalEdges[y + 1][x],
        west: t.verticalEdges[y][x],
        east: t.verticalEdges[y][x + 1],
        text: t.texts.find(o => o.x === x && o.y === y)?.value,
    };
}
