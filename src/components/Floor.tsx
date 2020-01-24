import React from 'react';
import styled from 'styled-components';
import { Floor as T } from '../map-model';

import { secondary, backgroundLight } from '../design-tokens';

const Rect = styled.rect`
    &:hover {
        fill: ${secondary};
    }
`;

type Props = {
    x: number;
    y: number;
    value: T;
};

export const Floor = ({ x, y, value }: Props) => (
    <Rect
        strokeWidth={0}
        fill={value === 'floor' ? 'white' : backgroundLight}
        stroke="transparent"
        x={x}
        y={y}
        width={1}
        height={1}
        data-x={x}
        data-y={y}
    />
);
