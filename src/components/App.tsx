import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { Main } from './Main';
import { reducer, initialState } from '../reducer';
import { selectCurrentProject, selectCurrentMap } from '../selectors';

export const App = () => {
    const [state, dispatch] = useReducer<typeof reducer>(reducer, initialState);
    const [shiftDown, setShiftDown] = useState(false);

    const onKeyDown = useCallback((e: KeyboardEvent) => setShiftDown(e.shiftKey), [setShiftDown]);

    const onKeyUp = useCallback(
        (e: KeyboardEvent) => {
            setShiftDown(e.shiftKey);
            switch (e.key) {
                case 'ArrowUp':
                    if (state.cursor && e.shiftKey) {
                        const { x, y, direction } = state.cursor;
                        return dispatch({
                            type: 'CHANGE_MAP_EDGE',
                            ...({
                                north: { x, y, orientation: 'horizontal' },
                                south: { x, y: y + 1, orientation: 'horizontal' },
                                west: { x, y, orientation: 'vertical' },
                                east: { x: x + 1, y, orientation: 'vertical' },
                            } as const)[direction],
                        });
                    } else {
                        return dispatch({ type: 'MOVE_CURSOR_FORWARD' });
                    }
                case 'ArrowLeft':
                    if (state.cursor && e.shiftKey) {
                        const { x, y, direction } = state.cursor;
                        return dispatch({
                            type: 'CHANGE_MAP_EDGE',
                            ...({
                                north: { x, y, orientation: 'vertical' },
                                south: { x: x + 1, y, orientation: 'vertical' },
                                east: { x, y, orientation: 'horizontal' },
                                west: { x, y: y + 1, orientation: 'horizontal' },
                            } as const)[direction],
                        });
                    } else {
                        return dispatch({ type: 'TURN_CURSOR_LEFT' });
                    }
                case 'ArrowRight':
                    if (state.cursor && e.shiftKey) {
                        const { x, y, direction } = state.cursor;
                        return dispatch({
                            type: 'CHANGE_MAP_EDGE',
                            ...({
                                north: { x: x + 1, y, orientation: 'vertical' },
                                south: { x: x, y, orientation: 'vertical' },
                                east: { x, y: y + 1, orientation: 'horizontal' },
                                west: { x, y, orientation: 'horizontal' },
                            } as const)[direction],
                        });
                    } else {
                        return dispatch({ type: 'TURN_CURSOR_RIGHT' });
                    }
                case 'ArrowDown':
                    if (state.cursor && e.shiftKey) {
                        return dispatch({ type: 'CHANGE_MAP_FLOOR', ...state.cursor });
                    } else {
                        return;
                    }
                case 'Escape':
                    return dispatch({ type: 'CLEAR_CURSOR' });
            }
        },
        [setShiftDown, state],
    );

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp, false);
        window.addEventListener('keydown', onKeyDown, false);
        return () => {
            window.removeEventListener('keyup', onKeyUp, false);
            window.removeEventListener('keydown', onKeyDown, false);
        };
    }, [onKeyUp, onKeyDown]);

    const currentProject = selectCurrentProject(state);
    const currentMap = selectCurrentMap(state);

    const clickFloor = (x: number, y: number) => {
        if (shiftDown) {
            dispatch({ type: 'SET_CURSOR', x, y, direction: 'north' });
        } else {
            dispatch({ type: 'CHANGE_MAP_FLOOR', x, y });
        }
    };

    const clickEdge = (x: number, y: number, orientation: 'vertical' | 'horizontal') => {
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
            onFloorClick={clickFloor}
            onEdgeClick={clickEdge}
            projectName={currentProject?.name}
            projects={state.projects}
            setNotes={editorState => dispatch({ type: 'SET_MAP_NOTES', editorState })}
        />
    );
};
