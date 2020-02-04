import React, { useEffect, useReducer, useCallback } from 'react';
import { Main } from './components/Main';
import { reducer, initialState } from './reducer';
import { selectCurrentMap } from './selectors';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';
import { getCell } from './map-model';

export const App = () => {
    const [state, dispatch] = useReducer<typeof reducer>(
        reducer,
        loadFromLocalStorage() || initialState,
    );

    useEffect(() => {
        const interval = setInterval(() => saveToLocalStorage(state), 1000);
        return () => clearInterval(interval);
    }, [state]);

    const onKeyUp = useCallback(
        (e: KeyboardEvent) => {
            switch (e.key) {
                case 't':
                    if (state.cursor) {
                        return setText(state.cursor.x, state.cursor.y);
                    }
                    break;
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
        [state],
    );

    useEffect(() => {
        window.addEventListener('keyup', onKeyUp, false);
        return () => {
            window.removeEventListener('keyup', onKeyUp, false);
        };
    }, [onKeyUp]);

    const currentMap = selectCurrentMap(state);

    const setText = useCallback(
        (x: number, y: number) => {
            const currentText = currentMap ? getCell(currentMap.model, x, y).text : undefined;
            const text = prompt(`enter text for [${x}, ${y}]:`, currentText);
            if (typeof text === 'string') {
                dispatch({ type: 'SET_MAP_CELL_TEXT', x, y, text });
            }
        },
        [currentMap],
    );

    const clickFloor = useCallback(
        (x: number, y: number, keys: { shift: boolean; meta: boolean; ctrl: boolean }) => {
            if (keys.shift) {
                dispatch({ type: 'SET_CURSOR', x, y, direction: 'north' });
            } else if (keys.meta) {
                setText(x, y);
            } else {
                dispatch({ type: 'CHANGE_MAP_FLOOR', x, y });
            }
        },
        [setText],
    );

    const clickEdge = (x: number, y: number, orientation: 'vertical' | 'horizontal') => {
        dispatch({ type: 'CHANGE_MAP_EDGE', x, y, orientation });
    };

    const addMap = () => {
        const name = prompt('Enter name:', 'unnamed map');
        name && dispatch({ type: 'ADD_MAP', name });
    };

    return React.createElement(Main, {
        cursor: state.cursor,
        mapModel: currentMap?.model,
        mapName: currentMap?.name,
        maps: state.maps,
        notes: currentMap?.notes,
        onAddMapClick: addMap,
        onMapClick: mapId => dispatch({ type: 'SELECT_MAP', mapId }),
        onNewProjectClick: () => {
            const name = prompt('Enter project name');
            if (typeof name === 'string') {
                dispatch({ type: 'NEW_PROJECT', name });
            }
        },
        onFloorClick: clickFloor,
        onEdgeClick: clickEdge,
        projectName: state.projectName,
        setNotes: editorState => dispatch({ type: 'SET_MAP_NOTES', editorState }),
    });
};
