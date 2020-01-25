import React from 'react';
import { action } from '@storybook/addon-actions';
import { Map } from './Map';
import { init } from '../map-model';
import { exampleModel, wineCellarModel } from '../example-maps';

export default { title: 'Map' };

export const empty = () => (
    <div style={{ maxWidth: 480 }}>
        <Map
            model={init(4, 4)}
            onFloorClick={action('floor click')}
            onEdgeClick={action('edge click')}
        />
    </div>
);

export const example = () => (
    <div style={{ maxWidth: 480 }}>
        <Map
            model={exampleModel}
            onFloorClick={action('floor click')}
            onEdgeClick={action('edge click')}
        />
    </div>
);

export const cursorNorth = () => (
    <div style={{ maxWidth: 480 }}>
        <Map model={exampleModel} cursor={{ x: 2, y: 3, direction: 'north' }} />
    </div>
);

export const cursorEast = () => (
    <div style={{ maxWidth: 480 }}>
        <Map model={exampleModel} cursor={{ x: 2, y: 3, direction: 'east' }} />
    </div>
);

export const cursorWest = () => (
    <div style={{ maxWidth: 480 }}>
        <Map model={exampleModel} cursor={{ x: 2, y: 3, direction: 'west' }} />
    </div>
);

export const cursorSouth = () => (
    <div style={{ maxWidth: 480 }}>
        <Map model={exampleModel} cursor={{ x: 2, y: 3, direction: 'south' }} />
    </div>
);

export const withNotes = () => (
    <div style={{ maxWidth: 480 }}>
        <Map
            model={{
                ...exampleModel,
                texts: [
                    { x: 2, y: 2, value: '1' },
                    { x: 3, y: 4, value: '2 3 4 hest' },
                ],
            }}
        />
    </div>
);

export const bardsTale = () => (
    <div style={{ maxWidth: 600 }}>
        <Map
            model={wineCellarModel}
            onFloorClick={action('floor click')}
            onEdgeClick={action('edge click')}
        />
    </div>
);
