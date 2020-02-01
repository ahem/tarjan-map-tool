import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Main } from './Main';
import { reducer, initialState } from '../reducer';
import { selectCurrentProject, selectCurrentMap } from '../selectors';

export const App = () => {
    const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);
    const [shiftDown, setShiftDown] = useState(false);
    const onKeyUp = useCallback(
        (e: KeyboardEvent) => {
            setShiftDown(e.shiftKey);
        },
        [setShiftDown],
    );

    const onKeyDown = useCallback((e: KeyboardEvent) => setShiftDown(e.shiftKey), [setShiftDown]);

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp, false);
        window.addEventListener('keydown', onKeyUp, false);
        return () => {
            window.removeEventListener('keyup', onKeyUp, false);
            window.removeEventListener('keydown', onKeyDown, false);
        };
    }, [onKeyUp, onKeyDown]);

    const currentProject = selectCurrentProject(state);
    const currentMap = selectCurrentMap(state);

    const changeFloor = (x: number, y: number) => {
        if (shiftDown) {
            dispatch({ type: 'SET_CURSOR', x, y, direction: 'north' });
        } else {
            dispatch({ type: 'CHANGE_MAP_FLOOR', x, y });
        }
    };

    const changeEdge = (x: number, y: number, orientation: 'vertical' | 'horizontal') => {
        dispatch({ type: 'CHANGE_MAP_EDGE', x, y, orientation });
    };

    const addMap = () => {
        const name = prompt('Enter name:', 'unnamed map');
        name && dispatch({ type: 'ADD_MAP', name });
    };

    const addProject = () => {
        const name = prompt('Enter name:', 'unnamed map');
        name && dispatch({ type: 'ADD_PROJECT', name });
    };

    return (
        <Main
            cursor={state.cursor}
            mapModel={currentMap?.model}
            mapName={currentMap?.name}
            maps={currentProject?.maps || []}
            notes={currentMap?.notes}
            onAddMapClick={addMap}
            onAddProjectClick={addProject}
            onMapClick={mapId => dispatch({ type: 'SELECT_MAP', mapId })}
            onProjectClick={projectId => dispatch({ type: 'SELECT_PROJECT', projectId })}
            onFloorClick={changeFloor}
            onEdgeClick={changeEdge}
            projectName={currentProject?.name}
            projects={state.projects}
            setNotes={editorState => dispatch({ type: 'SET_MAP_NOTES', editorState })}
        />
    );
};
