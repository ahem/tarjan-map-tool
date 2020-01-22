import React from 'react';
import { action } from '@storybook/addon-actions';

import { Main } from './Main';

export default { title: 'Main' };

export const Standard = () => (
    <>
        <style>
            {'html, body { height: 100%; padding: 0; margin:0 }'}
            {'#root { height: calc(100% - 16px); padding: 8px; }'}
        </style>
        <Main
            projectName="Bard’s Tale: Tales of the Unknown"
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
            projects={[
                { name: 'Bard’s Tale: Tales of the Unknown', id: 1, selected: true },
                { name: 'Buck Rogers: Countdown to Doomsday', id: 2 },
            ]}
            onMapClick={action('select map')}
            onProjectClick={action('select project')}
            hoverPosition={{ x: 4, y: 9 }}
            onAddMapClick={action('add map')}
            onAddProjectClick={action('add project')}
        />
    </>
);
