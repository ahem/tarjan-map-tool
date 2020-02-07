import React from 'react';
import styled from 'styled-components';

import { primary, primaryLight, fontFamily } from '../design-tokens';

const Root = styled.div`
    background-color: ${primary};
    flex: 1 0 auto;
    max-width: 300px;
    padding: 0 6px;
`;

const Header = styled.h2`
    font-family: '${fontFamily}';
    font-size: 20px;
    font-weight: 600;
`;

const SubHeader = styled.h3`
    font-family: '${fontFamily}';
    font-size: 14px;
    font-weight: 600;
`;

const List = styled.ul`
    padding-left: 12px;
    margin: -12px 0 24px 0;
`;

const Item = styled.li<{ selected?: boolean }>`
    font-family: '${fontFamily}';
    font-size: 14px;
    font-weight: normal;
    list-style: none;
    text-decoration: ${props => (props.selected ? 'underline' : 'none')};
    cursor: pointer;

    &:hover {
        color: #555;
    }
`;

type Props = {
    projectName?: string;
    maps: readonly { name: string; id: number; selected?: boolean }[];
    onAddMapClick?: () => void;
    onDeleteMapClick?: () => void;
    onExpandHorizontalClick?: () => void;
    onExpandVertialClick?: () => void;
    onMapClick?: (id: number) => void;
    onNewProjectClick?: () => void;
    onRenameMapClick?: () => void;
};

export const Sidebar = ({
    projectName,
    maps,
    onAddMapClick,
    onExpandHorizontalClick,
    onExpandVertialClick,
    onMapClick,
    onNewProjectClick,
    onRenameMapClick,
    onDeleteMapClick,
}: Props) => (
    <Root>
        <Header>{projectName || ''}</Header>
        <SubHeader>Maps</SubHeader>
        <List>
            {maps.map(({ name, id, selected }) => (
                <Item key={id} selected={selected} onClick={onMapClick && (() => onMapClick(id))}>
                    {name}
                </Item>
            ))}
        </List>
        <SubHeader>Actions</SubHeader>
        <List>
            <Item onClick={onAddMapClick}>Add map</Item>
            <Item onClick={onRenameMapClick}>Rename Map</Item>
            <Item onClick={onDeleteMapClick}>Delete Map</Item>
            <Item onClick={onExpandHorizontalClick}>Expand Horizontally</Item>
            <Item onClick={onExpandVertialClick}>Expand Vertically</Item>
            <Item onClick={onNewProjectClick}>New Project</Item>
        </List>
    </Root>
);
