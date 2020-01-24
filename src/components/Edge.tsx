import React from 'react';
import styled from 'styled-components';
import { secondary } from '../design-tokens';

import { Edge as TEdge } from '../map-model';

const Wall = () => <line x1={0} x2={1} y1={0} y2={0} />;

const Door = ({ strokeWidth }: { strokeWidth: number }) => {
    return (
        <React.Fragment>
            <line x1={0} x2={1} y1={0} y2={0} />
            <rect
                stroke="black"
                fill="white"
                strokeWidth={strokeWidth}
                width={0.6}
                height={0.2}
                rx={0.05}
                x={0.2}
                y={-0.1}
            />
        </React.Fragment>
    );
};

type Props = {
    x: number;
    y: number;
    value: TEdge;
    rotate?: boolean;
    strokeWidth: number;
};

const HoverMarker = styled.rect.attrs({ x: 0, y: -0.05, width: 1, height: 0.1 })`
    fill: ${secondary};
    stroke: ${secondary};
    opacity: 0;
    &:hover {
        opacity: 0.9;
    }
`;

export const Edge = ({ x, y, value, rotate, strokeWidth }: Props) => (
    <g strokeWidth={strokeWidth} transform={`translate(${x}, ${y}) ${rotate ? 'rotate(90)' : ''}`}>
        {value === 'wall' && <Wall />}
        {value === 'door' && <Door strokeWidth={strokeWidth / 2} />}
        <HoverMarker data-x={x} data-y={y} />
    </g>
);
