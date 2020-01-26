import React from 'react';
import styled from 'styled-components';

import { MapModel } from '../map-model';
import { Sidebar } from './Sidebar';
import { Infobar } from './InfoBar';
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

type Props = {
    hoverPosition: { x: number; y: number };
    mapModel: MapModel;
    mapName: string;
    maps: { name: string; id: number; selected?: boolean }[];
    onAddMapClick: () => void;
    onAddProjectClick: () => void;
    onMapClick: (id: number) => void;
    onProjectClick: (id: number) => void;
    projectName: string;
    projects: { name: string; id: number; selected?: boolean }[];
    notes: React.ComponentProps<typeof Notes>['editorState'];
    setNotes: React.ComponentProps<typeof Notes>['setEditorState'];
};

export const Main = ({
    hoverPosition,
    mapModel,
    mapName,
    maps,
    onAddMapClick,
    onAddProjectClick,
    onMapClick,
    onProjectClick,
    projectName,
    projects,
    notes,
    setNotes,
}: Props) => {
    return (
        <Root>
            <Sidebar
                projectName={projectName}
                maps={maps}
                projects={projects}
                onMapClick={onMapClick}
                onAddMapClick={onAddMapClick}
                onProjectClick={onProjectClick}
                onAddProjectClick={onAddProjectClick}
            />
            <Wrapper>
                <Infobar mapName={mapName} hoverPosition={hoverPosition} />
                <ContentArea>
                    <MapWrapper>
                        <Map model={mapModel} />
                    </MapWrapper>
                    <NoteWrapper>
                        <Notes editorState={notes} setEditorState={setNotes} />
                    </NoteWrapper>
                </ContentArea>
            </Wrapper>
        </Root>
    );
};
