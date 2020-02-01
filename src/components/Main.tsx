import React from 'react';
import styled from 'styled-components';

import { MapModel } from '../map-model';
import { Sidebar } from './Sidebar';
import { Infobar } from './InfoBar';
import { Map } from './Map';
import { Notes } from './Notes';
import { Direction } from '../types';

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
    cursor?: {
        direction: Direction;
        x: number;
        y: number;
    };
    hoverPosition?: { x: number; y: number };
    mapModel?: MapModel;
    mapName?: string;
    maps: readonly { name: string; id: number; selected?: boolean }[];
    onAddMapClick?: () => void;
    onAddProjectClick?: () => void;
    onEdgeClick?: (x: number, y: number, orientation: 'horizontal' | 'vertical') => void;
    onFloorClick?: (x: number, y: number) => void;
    onMapClick?: (id: number) => void;
    onProjectClick?: (id: number) => void;
    projectName?: string;
    projects: readonly { name: string; id: number; selected?: boolean }[];
    notes?: React.ComponentProps<typeof Notes>['editorState'];
    setNotes?: React.ComponentProps<typeof Notes>['setEditorState'];
};

export const Main = ({
    cursor,
    hoverPosition,
    mapModel,
    mapName,
    maps,
    onAddMapClick,
    onAddProjectClick,
    onEdgeClick,
    onFloorClick,
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
                        {mapModel && (
                            <Map
                                model={mapModel}
                                cursor={cursor}
                                onFloorClick={onFloorClick}
                                onEdgeClick={onEdgeClick}
                            />
                        )}
                    </MapWrapper>
                    <NoteWrapper>
                        {notes && setNotes && (
                            <Notes editorState={notes} setEditorState={setNotes} />
                        )}
                    </NoteWrapper>
                </ContentArea>
            </Wrapper>
        </Root>
    );
};
