export type Direction = 'north' | 'south' | 'east' | 'west';

export type Cursor = {
    readonly x: number;
    readonly y: number;
    readonly direction: Direction;
};
