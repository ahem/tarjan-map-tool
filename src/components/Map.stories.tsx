import React from 'react';
import { Map } from './Map';
import { init, MapModel } from '../map-model';

export default { title: 'Map' };

export const empty = () => (
    <div style={{ maxWidth: 480 }}>
        <Map model={init(4, 4)} />
    </div>
);

export const example = () => {
    const model: MapModel = {
        floors: [
            ['floor', 'floor', 'floor', 'floor', 'floor'],
            ['floor', 'floor', 'floor', 'floor', 'floor'],
            ['floor', 'floor', 'floor', 'floor', 'floor'],
            ['floor', 'floor', 'floor', 'floor', 'floor'],
            ['floor', 'floor', 'floor', 'floor', 'floor'],
        ],
        verticalEdges: [
            ['wall', 'empty', 'empty', 'empty', 'empty', 'wall'],
            ['wall', 'wall', 'empty', 'empty', 'door', 'empty'],
            ['wall', 'wall', 'wall', 'empty', 'empty', 'empty'],
            ['wall', 'wall', 'wall', 'empty', 'empty', 'empty'],
            ['door', 'empty', 'empty', 'empty', 'door', 'door'],
        ],
        horizontalEdges: [
            ['wall', 'wall', 'wall', 'wall', 'wall'],
            ['empty', 'door', 'wall', 'wall', 'empty'],
            ['empty', 'empty', 'wall', 'wall', 'empty'],
            ['empty', 'empty', 'empty', 'empty', 'empty'],
            ['empty', 'door', 'empty', 'empty', 'door'],
            ['wall', 'door', 'wall', 'empty', 'empty'],
        ],
        width: 5,
        height: 5,
    };
    return (
        <div style={{ maxWidth: 480 }}>
            <Map model={model} />
        </div>
    );
};
