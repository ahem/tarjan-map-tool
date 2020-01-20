import React from 'react';
import styled from 'styled-components';

import { MapModel, mapVerticalEdges, mapHorizontalEdges } from '../map-model';
import { Edge } from './Edge';

const unit = 40;

const Root = styled.svg``;

const GridPoint = styled.circle.attrs({ r: 1 })``;

function makeGrid(width: number, height: number) {
    const elements: JSX.Element[] = [];
    for (let y = 0; y < height + 1; y++) {
        for (let x = 0; x < width + 1; x++) {
            elements.push(<GridPoint cx={x * unit} cy={y * unit} />);
        }
    }
    return elements;
}

type Props = {
    model: MapModel;
};

export const Map = ({ model }: Props) => {
    return (
        <Root viewBox={`0 0 ${model.width * unit} ${model.height * unit}`}>
            <g fill="#ccc">{makeGrid(model.width, model.height)}</g>
            <g stroke="black" transform={`scale(${unit})`}>
                {mapHorizontalEdges(model, args => (
                    <Edge {...args} strokeWidth={2 / unit} />
                ))}
            </g>
            <g stroke="black" transform={`scale(${unit})`}>
                {mapVerticalEdges(model, args => (
                    <Edge {...args} strokeWidth={2 / unit} rotate />
                ))}
            </g>
        </Root>
    );
};
