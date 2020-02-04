import React, { useCallback } from 'react';

import { MapModel } from '../map-model';
import { Edge } from './Edge';
import { flatmap2d } from '../2d-array-utils';
import { Cursor } from './Cursor';
import { Floor, FloorPatterns } from './Floor';
import { secondaryDark } from '../design-tokens';
import { Direction } from '../types';

const unit = 40;

const GridPoints = ({ width, height }: { width: number; height: number }) => {
    const elements: JSX.Element[] = [];
    for (let y = 0; y < height + 1; y++) {
        for (let x = 0; x < width + 1; x++) {
            elements.push(<circle key={`${x}:${y}`} r={1} cx={x * unit} cy={y * unit} />);
        }
    }
    return <React.Fragment>{elements}</React.Fragment>;
};

function getCoords(e: React.MouseEvent<SVGGElement, MouseEvent>) {
    if (
        e.target instanceof Element &&
        e.target.hasAttribute('data-x') &&
        e.target.hasAttribute('data-y')
    ) {
        return {
            x: Number(e.target.getAttribute('data-x')),
            y: Number(e.target.getAttribute('data-y')),
        };
    }
}

type Props = {
    model: MapModel;
    cursor?: {
        x: number;
        y: number;
        direction: Direction;
    };
    onFloorClick?: (
        x: number,
        y: number,
        keys: { shift: boolean; meta: boolean; ctrl: boolean },
    ) => void;
    onEdgeClick?: (x: number, y: number, orientation: 'horizontal' | 'vertical') => void;
    onHover: (pos?: { x: number; y: number }) => void;
};

export const Map = ({ model, cursor, onFloorClick, onEdgeClick, onHover }: Props) => {
    const handleFloorClick = useCallback(
        (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
            const coords = getCoords(e);
            coords &&
                onFloorClick &&
                onFloorClick(coords.x, coords.y, {
                    shift: e.shiftKey,
                    meta: e.metaKey,
                    ctrl: e.ctrlKey,
                });
        },
        [onFloorClick],
    );
    const handleHorizontalEdgeClick = useCallback(
        (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
            const coords = getCoords(e);
            coords && onEdgeClick && onEdgeClick(coords.x, coords.y, 'horizontal');
        },
        [onEdgeClick],
    );
    const handleVerticalEdgeClick = useCallback(
        (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
            const coords = getCoords(e);
            coords && onEdgeClick && onEdgeClick(coords.x, coords.y, 'vertical');
        },
        [onEdgeClick],
    );
    return (
        <svg viewBox={`-5 -5 ${model.width * unit + 10} ${model.height * unit + 10}`}>
            <FloorPatterns />
            <g onClick={handleFloorClick}>
                {flatmap2d(model.floors, (value, x, y) => (
                    <Floor
                        key={`${x}:${y}`}
                        x={x}
                        y={y}
                        size={unit}
                        value={value}
                        text={model.texts.find(o => o.x === x && o.y === y)?.value}
                    />
                ))}
            </g>
            <g fill={secondaryDark}>
                <GridPoints width={model.width} height={model.height} />
            </g>
            <g stroke="black" transform={`scale(${unit})`}>
                <g onClick={handleHorizontalEdgeClick}>
                    {flatmap2d(model.horizontalEdges, (value, x, y) => (
                        <Edge
                            key={`h:${x}:${y}`}
                            value={value}
                            x={x}
                            y={y}
                            strokeWidth={2 / unit}
                        />
                    ))}
                </g>
                <g onClick={handleVerticalEdgeClick}>
                    {flatmap2d(model.verticalEdges, (value, x, y) => (
                        <Edge
                            key={`v:${x}:${y}`}
                            value={value}
                            x={x}
                            y={y}
                            strokeWidth={2 / unit}
                            rotate
                        />
                    ))}
                </g>
            </g>
            {cursor && (
                <g transform={`scale(${unit})`}>
                    <Cursor {...cursor} strokeWidth={1 / unit} />
                </g>
            )}
        </svg>
    );
};
