import React from 'react';
import styled from 'styled-components';
import { Floor as T } from '../map-model';
import { Text } from './Text';

import { secondary, backgroundLight } from '../design-tokens';

const Rect = styled.rect`
    &:hover {
        fill: ${secondary};
    }
`;

type Props = {
    x: number;
    y: number;
    size: number;
    value: T;
    text?: string;
};

export const Floor = ({ x, y, size, value, text }: Props) => (
    <React.Fragment>
        <Rect
            strokeWidth={0}
            fill={value === 'floor' ? 'white' : backgroundLight}
            stroke="transparent"
            x={x}
            y={y}
            width={size}
            height={size}
            data-x={x}
            data-y={y}
        />
        {text && (
            <Text x={x} y={y} width={size} height={size}>
                {text}
            </Text>
        )}
    </React.Fragment>
);
