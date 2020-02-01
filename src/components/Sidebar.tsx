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
    projects: readonly { name: string; id: number; selected?: boolean }[];
    onMapClick?: (id: number) => void;
    onProjectClick?: (id: number) => void;
    onAddMapClick?: () => void;
    onAddProjectClick?: () => void;
};

export const Sidebar = ({
    projectName,
    maps,
    projects,
    onMapClick,
    onAddMapClick,
    onProjectClick,
    onAddProjectClick,
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
            <Item onClick={onAddMapClick}>
                <i>[ add map ]</i>
            </Item>
        </List>
        <SubHeader>Projects</SubHeader>
        <List>
            {projects.map(({ name, id, selected }) => (
                <Item
                    key={id}
                    selected={selected}
                    onClick={onProjectClick && (() => onProjectClick(id))}
                >
                    {name}
                </Item>
            ))}
            <Item onClick={onAddProjectClick}>
                <i>[ add project ]</i>
            </Item>
        </List>
    </Root>
);
