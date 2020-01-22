import React from 'react';

import { MapModel } from '../map-model';
import { Edge } from './Edge';
import { flatmap2d } from '../2d-array-utils';
import { Cursor, Direction } from './Cursor';

const unit = 40;

const GridPoints = ({ width, height }: { width: number; height: number }) => {
    const elements: JSX.Element[] = [];
    for (let y = 0; y < height + 1; y++) {
        for (let x = 0; x < width + 1; x++) {
            elements.push(<circle r={1} cx={x * unit} cy={y * unit} />);
        }
    }
    return <React.Fragment>{elements}</React.Fragment>;
};

type Props = {
    model: MapModel;
    cursor?: {
        x: number;
        y: number;
        direction: Direction;
    };
};

export const Map = ({ model, cursor }: Props) => (
    <svg viewBox={`-5 -5 ${model.width * unit + 10} ${model.height * unit + 10}`}>
        <g fill="#ccc">
            <GridPoints width={model.width} height={model.height} />
        </g>
        <g stroke="black" transform={`scale(${unit})`}>
            {flatmap2d(model.horizontalEdges, (value, x, y) => (
                <Edge key={`h:${x}:${y}`} value={value} x={x} y={y} strokeWidth={2 / unit} />
            ))}
            {flatmap2d(model.verticalEdges, (value, x, y) => (
                <Edge key={`v:${x}:${y}`} value={value} x={x} y={y} strokeWidth={2 / unit} rotate />
            ))}
        </g>
        {cursor && (
            <g transform={`scale(${unit})`}>
                <Cursor {...cursor} strokeWidth={1 / unit} />
            </g>
        )}
    </svg>
);
