import React from 'react';
import styled from 'styled-components';

import { primaryLight, fontFamily } from '../design-tokens';

const Root = styled.div`
    background-color: ${primaryLight};
    padding: 8px 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SubHeader = styled.h3`
    font-family: '${fontFamily}';
    font-size: 14px;
    font-weight: 600;
`;

const HoverPosition = styled.span`
    font-family: '${fontFamily}';
    font-size: 14px;
    font-weight: 600;
    margin: 6px;
`;

type Props = {
    hoverPosition: { x: number; y: number };
    mapName: string;
};

export const Infobar = ({ mapName, hoverPosition }: Props) => (
    <Root>
        <SubHeader>{mapName}</SubHeader>
        {hoverPosition && (
            <HoverPosition>
                [{hoverPosition.x}, {hoverPosition.y}]
            </HoverPosition>
        )}
    </Root>
);
