import { State } from './reducer';

export const selectCurrentMap = (state: State) => state.maps.find(m => m.id === state.mapId);
