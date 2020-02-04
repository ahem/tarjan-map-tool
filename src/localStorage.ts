import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

export function loadFromLocalStorage() {
    try {
        const s = window.localStorage.getItem('state');
        if (typeof s === 'string') {
            return JSON.parse(s, (_: string, value: any) => {
                if (typeof value === 'object' && value) {
                    if (value.__type__ === 'EditorState' && typeof value.__val__ === 'object') {
                        return EditorState.createWithContent(convertFromRaw(value.__val__));
                    }
                }
                return value;
            });
        }
    } catch (_) {
        return null;
    }
}

export function saveToLocalStorage(data: object) {
    try {
        const s = JSON.stringify(data, (_: string, value: unknown) => {
            if (value instanceof EditorState) {
                return {
                    __type__: 'EditorState',
                    __val__: convertToRaw(value.getCurrentContent()),
                };
            }
            return value;
        });
        window.localStorage.setItem('state', s);
    } catch (_) {
        return null;
    }
}
