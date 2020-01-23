import React from 'react';
import { primary, primaryLight } from '../design-tokens';

export type Direction = 'north' | 'east' | 'west' | 'south';

export const Cursor = ({
    x,
    y,
    direction,
    strokeWidth,
}: {
    x: number;
    y: number;
    direction: Direction;
    strokeWidth: number;
}) => {
    const transform = ({
        south: 'rotate(180)',
        west: 'rotate(270)',
        north: undefined,
        east: 'rotate(90)',
    } as const)[direction];
    return (
        <g
            stroke={primaryLight}
            fill={primary}
            transform={`translate(${x + 0.5},${y + 0.5})`}
            strokeWidth={strokeWidth}
        >
            <polygon transform={transform} points="0.2,0.4 0,-0.4 -0.2,0.4" />
        </g>
    );
};

