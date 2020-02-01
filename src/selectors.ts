import { State } from './reducer';

export const selectCurrentProject = (state: State) =>
    state.projects.find(p => p.id === state.projectId);

export const selectCurrentMap = (state: State) =>
    selectCurrentProject(state)?.maps.find(m => m.id === state.mapId);
