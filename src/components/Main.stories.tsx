import React from 'react';
import { action } from '@storybook/addon-actions';
import { wineCellarModel } from '../example-maps';
import { EditorState, ContentState } from 'draft-js';
import { notesDecorator } from './Notes';

import { Main } from './Main';

export default { title: 'Main' };

const notes = EditorState.createWithContent(
    ContentState.createFromText(
        [
            '1: This is the wine cellar of the Scarlet Bard. The air is musty with old wine.',
            '2: Fine wines - 10 years or older. For regular customers only.',
            '3: Rare wines - 50 years and older. Keep out!',
        ].join('\n'),
    ),
    notesDecorator,
);

export const Standard = () => (
    <>
        <style>
            {'html, body { height: 100%; padding: 0; margin:0 }'}
            {'#root { height: calc(100% - 16px); padding: 8px; }'}
        </style>
        <Main
            projectName="Bard’s Tale: Tales of the Unknown"
            notes={notes}
            setNotes={() => {}}
            mapModel={wineCellarModel}
            mapName="Sewers Level 2"
            maps={[
                { name: 'Skara Brae', id: 1 },
                { name: 'Wine Cellar', id: 3 },
                { name: 'Sewers Level 1', id: 5 },
                { name: 'Sewers Level 2', id: 6, selected: true },
                { name: 'Sewers Level 3', id: 7 },
                { name: 'Sewers Level 4', id: 9 },
                { name: 'Catacombs Level 1', id: 10 },
                { name: 'Catacombs Level 2', id: 12 },
            ]}
            onMapClick={action('select map')}
            hoverPosition={{ x: 4, y: 9 }}
            onAddMapClick={action('add map')}
        ></Main>
    </>
);
