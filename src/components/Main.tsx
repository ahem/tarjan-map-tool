import React from 'react';
import styled from 'styled-components';

import { primary, primaryDark, primaryLight, background } from '../colors';

const Root = styled.div`
    display: flex;
    width: 100%;
    min-height: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
`;

const Sidebar = styled.div`
    background-color: ${primary};
    flex: 1 0 auto;
    max-width: 300px;
    padding: 0 6px;
`;

const Infobar = styled.div`
    background-color: ${primaryLight};
    padding: 8px 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const MapContainer = styled.div`
    background-color: ${background};
    flex: 1 0 auto;
`;

const Header = styled.h2`
    font-family: 'Titillium Web';
    font-size: 20px;
    font-weight: 600;
`;

const SubHeader = styled.h3`
    font-family: 'Titillium Web';
    font-size: 14px;
    font-weight: 600;
`;

const HoverPosition = styled.span`
    font-family: 'Titillium Web';
    font-size: 14px;
    font-weight: 600;
    margin: 6px;
`;

const List = styled.ul`
    padding-left: 12px;
    margin: -12px 0 24px 0;
`;

const Item = styled.li<{ selected?: boolean }>`
    font-family: 'Titillium Web';
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
    projectName: string;
    projects: { name: string; id: number; selected?: boolean }[];
    maps: { name: string; id: number; selected?: boolean }[];
    mapName: string;
    hoverPosition: { x: number; y: number };
    onMapClick: (id: number) => void;
    onProjectClick: (id: number) => void;
    onAddMapClick: () => void;
    onAddProjectClick: () => void;
};

export const Main = ({
    projectName,
    mapName,
    projects,
    maps,
    hoverPosition,
    onMapClick,
    onProjectClick,
    onAddProjectClick,
    onAddMapClick,
}: Props) => {
    return (
        <Root>
            <Sidebar>
                <Header>{projectName}</Header>
                <SubHeader>Maps</SubHeader>
                <List>
                    {maps.map(({ name, id, selected }) => (
                        <Item key={id} selected={selected} onClick={() => onMapClick(id)}>
                            {name}
                        </Item>
                    ))}
                    <Item onClick={() => onAddMapClick()}>
                        <i>[ add map ]</i>
                    </Item>
                </List>
                <SubHeader>Projects</SubHeader>
                <List>
                    {projects.map(({ name, id, selected }) => (
                        <Item key={id} selected={selected} onClick={() => onProjectClick(id)}>
                            {name}
                        </Item>
                    ))}
                    <Item onClick={() => onAddProjectClick()}>
                        <i>[ add project ]</i>
                    </Item>
                </List>
            </Sidebar>
            <Wrapper>
                <Infobar>
                    <SubHeader>{mapName}</SubHeader>
                    {hoverPosition && (
                        <HoverPosition>
                            [{hoverPosition.x}, {hoverPosition.y}]
                        </HoverPosition>
                    )}
                </Infobar>
                <MapContainer>Map goes here...</MapContainer>
            </Wrapper>
        </Root>
    );
};
