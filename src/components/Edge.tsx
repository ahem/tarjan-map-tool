import React from 'react';
import { Edge as TEdge } from '../map-model';

const Wall = () => <line x1={0} x2={1} y1={0} y2={0} />;

const Door = () => {
    const left = 0.333;
    const right = 0.666;
    const top = 0.1;
    const bottom = -0.1;
    return (
        <React.Fragment>
            <Wall />
            <line x1={left} x2={left} y1={top} y2={bottom} />
            <line x1={right} x2={right} y1={top} y2={bottom} />
        </React.Fragment>
    );
};

type Props = {
    x: number;
    y: number;
    value: TEdge;
    rotate?: boolean;
    strokeWidth?: number;
};

export const Edge = ({ x, y, value, rotate, strokeWidth }: Props) => (
    <g strokeWidth={strokeWidth} transform={`translate(${x}, ${y}) ${rotate ? 'rotate(90)' : ''}`}>
        {value === 'wall' && <Wall />}
        {value === 'door' && <Door />}
    </g>
);
