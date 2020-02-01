import {
    init as initMapModel,
    setFloor,
    setHorizontalEdge,
    setVerticalEdge,
    setText,
    MapModel,
    Floor,
    Edge,
} from './map-model';
import { EditorState } from 'draft-js';
import { Direction, Cursor } from './types';

type Map = {
    readonly id: number;
    readonly name: string;
    readonly model: MapModel;
    readonly notes: EditorState;
};

type Project = {
    readonly id: number;
    readonly name: string;
    readonly maps: readonly Map[];
};

export type State = {
    readonly cursor?: Cursor;
    readonly mapId?: number;
    readonly projectId?: number;
    readonly projects: readonly Project[];
};

type MapAction =
    | { type: 'SET_MAP_NAME'; name: string }
    | { type: 'SET_MAP_FLOOR'; x: number; y: number; value: Floor }
    | { type: 'CHANGE_MAP_FLOOR'; x: number; y: number }
    | { type: 'SET_MAP_NOTES'; editorState: EditorState }
    | { type: 'SET_MAP_CELL_TEXT'; x: number; y: number; text: string }
    | {
          type: 'SET_MAP_EDGE';
          x: number;
          y: number;
          orientation: 'horizontal' | 'vertical';
          value: Edge;
      }
    | {
          type: 'CHANGE_MAP_EDGE';
          x: number;
          y: number;
          orientation: 'horizontal' | 'vertical';
      };

export type Action =
    | { type: 'ADD_PROJECT'; name: string }
    | { type: 'ADD_MAP'; name: string }
    | { type: 'SELECT_PROJECT'; projectId: number }
    | { type: 'SELECT_MAP'; mapId: number }
    | { type: 'SET_CURSOR'; x: number; y: number; direction: Direction }
    | { type: 'TURN_CURSOR_LEFT' }
    | { type: 'TURN_CURSOR_RIGHT' }
    | { type: 'MOVE_CURSOR_FORWARD' }
    | { type: 'CLEAR_CURSOR' }
    | MapAction;

const floors: Floor[] = ['unknown', 'floor', 'darkness'];
const edges: Edge[] = ['empty', 'wall', 'door'];
const directions: Direction[] = ['north', 'east', 'south', 'west'];

const nextVal = <T>(values: readonly T[], val: T): T =>
    values[(values.indexOf(val) + 1) % values.length];

export const initialState: State = { projects: [] };

const mapReducer = (state: Map, action: MapAction): Map => {
    switch (action.type) {
        case 'SET_MAP_NAME':
            return { ...state, name: action.name };
        case 'SET_MAP_NOTES':
            return { ...state, notes: action.editorState };
        case 'SET_MAP_CELL_TEXT':
            return { ...state, model: setText(state.model, action.x, action.y, action.text) };
        case 'SET_MAP_FLOOR': {
            return {
                ...state,
                model: setFloor(state.model, action.x, action.y, action.value),
            };
        }
        case 'CHANGE_MAP_FLOOR': {
            const { x, y } = action;
            return {
                ...state,
                model: setFloor(state.model, x, y, nextVal(floors, state.model.floors[y][x])),
            };
        }
        case 'SET_MAP_EDGE': {
            if (action.orientation === 'horizontal') {
                return {
                    ...state,
                    model: setHorizontalEdge(state.model, action.x, action.y, action.value),
                };
            } else {
                return {
                    ...state,
                    model: setVerticalEdge(state.model, action.x, action.y, action.value),
                };
            }
        }
        case 'CHANGE_MAP_EDGE': {
            const { x, y } = action;
            if (action.orientation === 'horizontal') {
                const value = nextVal(edges, state.model.horizontalEdges[y][x]);
                return {
                    ...state,
                    model: setHorizontalEdge(state.model, action.x, action.y, value),
                };
            } else {
                const value = nextVal(edges, state.model.verticalEdges[y][x]);
                return {
                    ...state,
                    model: setVerticalEdge(state.model, action.x, action.y, value),
                };
            }
        }
    }
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SELECT_PROJECT':
            return { ...state, projectId: action.projectId };
        case 'SELECT_MAP':
            return { ...state, mapId: action.mapId };
        case 'ADD_PROJECT': {
            const id = state.projects.length ? Math.max(...state.projects.map(x => x.id)) + 1 : 1;
            return {
                ...state,
                projectId: id,
                mapId: undefined,
                projects: [...state.projects.concat({ id, name: action.name, maps: [] })],
            };
        }
        case 'ADD_MAP': {
            const newMapId =
                state.projects.reduce((acc, p) => Math.max(acc, ...p.maps.map(x => x.id)), 0) + 1;
            const projects = state.projects.map(p => {
                if (p.id !== state.projectId) {
                    return p;
                }
                return {
                    ...p,
                    maps: p.maps.concat({
                        id: newMapId,
                        name: action.name,
                        model: initMapModel(20, 20),
                        notes: EditorState.createEmpty(),
                    }),
                };
            });
            return { ...state, mapId: newMapId, projects };
        }
        case 'SET_CURSOR': {
            const { x, y, direction } = action;
            return { ...state, cursor: { x, y, direction } };
        }
        case 'TURN_CURSOR_LEFT': {
            if (!state.cursor) return state;
            const { x, y, direction } = state.cursor;
            const newDirection = directions[(directions.indexOf(direction) + 3) % 4];
            return { ...state, cursor: { x, y, direction: newDirection } };
        }
        case 'TURN_CURSOR_RIGHT': {
            if (!state.cursor) return state;
            const { x, y, direction } = state.cursor;
            const newDirection = directions[(directions.indexOf(direction) + 1) % 4];
            return { ...state, cursor: { x, y, direction: newDirection } };
        }
        case 'MOVE_CURSOR_FORWARD': {
            if (!state.cursor) return state;
            const project = state.projects.find(p => p.id === state.projectId);
            const map = project?.maps.find(m => m.id === state.mapId);
            if (!map) return state;

            const { x, y, direction } = state.cursor;
            const { width, height } = map.model;
            switch (direction) {
                case 'east':
                    return { ...state, cursor: { x: (x + 1) % width, y, direction } };
                case 'west':
                    return { ...state, cursor: { x: (x + width - 1) % width, y, direction } };
                case 'south':
                    return { ...state, cursor: { x, y: (y + 1) % height, direction } };
                case 'north':
                    return { ...state, cursor: { x, y: (y + height - 1) % height, direction } };
            }
        }
        case 'CLEAR_CURSOR':
            return { ...state, cursor: undefined };
        case 'SET_MAP_NAME':
        case 'SET_MAP_FLOOR':
        case 'SET_MAP_NOTES':
        case 'SET_MAP_CELL_TEXT':
        case 'SET_MAP_EDGE':
        case 'CHANGE_MAP_EDGE':
        case 'CHANGE_MAP_FLOOR':
            return {
                ...state,
                projects: state.projects.map(p =>
                    p.id === state.projectId
                        ? {
                              ...p,
                              maps: p.maps.map(m =>
                                  m.id === state.mapId ? mapReducer(m, action) : m,
                              ),
                          }
                        : p,
                ),
            };
    }
};
