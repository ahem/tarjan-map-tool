import React from 'react';
import styled from 'styled-components';
import { Floor as T } from '../map-model';
import { Text } from './Text';

import { secondaryDark, backgroundLight } from '../design-tokens';

const Rect = styled.rect`
    &:hover {
        stroke: ${secondaryDark};
        stroke-width: 2px;
    }
`;

type Props = {
    x: number;
    y: number;
    size: number;
    value: T;
    text?: string;
};

const Unknown = styled(Rect)`
    fill: ${backgroundLight};
`;

const NormalFloor = styled(Rect)`
    fill: white;
`;

const Darkness = styled(Rect).attrs({
    fill: 'url(#floorpattern_darkness)',
})``;

export const FloorPatterns = () => (
    <defs>
        <pattern
            id="floorpattern_darkness"
            patternUnits="userSpaceOnUse"
            width="5.5"
            height="5.5"
            patternTransform="rotate(40)"
            fill="white"
        >
            <line x1="0" y="0" x2="0" y2="5.5" stroke="#194d33" strokeWidth="1" />
        </pattern>
    </defs>
);

const floorTypes = {
    floor: NormalFloor,
    darkness: Darkness,
    unknown: Unknown,
    stairs: Unknown,
} as const;

export const Floor = ({ x, y, size, value, text }: Props) => {
    const Floor = floorTypes[value];
    return (
        <React.Fragment>
            <Floor
                strokeWidth={0}
                stroke="transparent"
                x={x * size}
                y={y * size}
                width={size}
                height={size}
                data-x={x}
                data-y={y}
            />
            {text && (
                <Text x={x * size} y={y * size} width={size} height={size}>
                    {text}
                </Text>
            )}
        </React.Fragment>
    );
};
