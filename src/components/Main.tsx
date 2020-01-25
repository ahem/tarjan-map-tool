import React from 'react';
import styled from 'styled-components';

import { primary, primaryLight, fontFamily } from '../design-tokens';
import { MapModel } from '../map-model';
import { Map } from './Map';
import { Notes } from './Notes';

const Root = styled.div`
    display: flex;
    width: 100%;
    min-height: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
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

const ContentArea = styled.div`
    background-color: white;
    flex: 1 0 auto;
    display: flex;
    flex-wrap: wrap;
`;

const MapWrapper = styled.div`
    max-width: 550px;
    min-width: 200px;
    margin: 24px 0 24px 24px;
    flex: 3 1 auto;
`;

const NoteWrapper = styled.div`
    margin: 24px;
    flex: 1 1 200px;
    min-width: 200px;
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

const HoverPosition = styled.span`
    font-family: '${fontFamily}';
    font-size: 14px;
    font-weight: 600;
    margin: 6px;
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
    hoverPosition: { x: number; y: number };
    mapModel: MapModel;
    mapName: string;
    maps: { name: string; id: number; selected?: boolean }[];
    notes: string[];
    onAddMapClick: () => void;
    onAddProjectClick: () => void;
    onMapClick: (id: number) => void;
    onProjectClick: (id: number) => void;
    projectName: string;
    projects: { name: string; id: number; selected?: boolean }[];
};

export const Main = ({
    hoverPosition,
    mapModel,
    mapName,
    maps,
    notes,
    onAddMapClick,
    onAddProjectClick,
    onMapClick,
    onProjectClick,
    projectName,
    projects,
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
                <ContentArea>
                    <MapWrapper>
                        <Map model={mapModel} />
                    </MapWrapper>
                    <NoteWrapper>
                        <Notes notes={notes} />
                    </NoteWrapper>
                </ContentArea>
            </Wrapper>
        </Root>
    );
};
