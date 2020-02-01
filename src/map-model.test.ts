/* eslint-env jest */
import { init, setFloor, setCell, getCell, Cell } from './map-model';

describe('map-model', () => {
    describe('init', () => {
        it('should init correctly (2 by 3)', () => {
            const model = init(2, 3);
            const expectedModel = {
                floors: [
                    ['unknown', 'unknown'],
                    ['unknown', 'unknown'],
                    ['unknown', 'unknown'],
                ],
                horizontalEdges: [
                    ['empty', 'empty'],
                    ['empty', 'empty'],
                    ['empty', 'empty'],
                    ['empty', 'empty'],
                ],
                verticalEdges: [
                    ['empty', 'empty', 'empty'],
                    ['empty', 'empty', 'empty'],
                    ['empty', 'empty', 'empty'],
                ],
                width: 2,
                height: 3,
                texts: [],
            };
            expect(model.floors).toEqual(expectedModel.floors);
            expect(model.horizontalEdges).toEqual(expectedModel.horizontalEdges);
            expect(model.verticalEdges).toEqual(expectedModel.verticalEdges);
            expect(model).toEqual(expectedModel);
        });
        it('should init correctly (4 by 4)', () => {
            const model = init(4, 4);
            const expectedModel = {
                floors: [
                    ['unknown', 'unknown', 'unknown', 'unknown'],
                    ['unknown', 'unknown', 'unknown', 'unknown'],
                    ['unknown', 'unknown', 'unknown', 'unknown'],
                    ['unknown', 'unknown', 'unknown', 'unknown'],
                ],
                horizontalEdges: [
                    ['empty', 'empty', 'empty', 'empty'],
                    ['empty', 'empty', 'empty', 'empty'],
                    ['empty', 'empty', 'empty', 'empty'],
                    ['empty', 'empty', 'empty', 'empty'],
                    ['empty', 'empty', 'empty', 'empty'],
                ],
                verticalEdges: [
                    ['empty', 'empty', 'empty', 'empty', 'empty'],
                    ['empty', 'empty', 'empty', 'empty', 'empty'],
                    ['empty', 'empty', 'empty', 'empty', 'empty'],
                    ['empty', 'empty', 'empty', 'empty', 'empty'],
                ],
                texts: [],
                width: 4,
                height: 4,
            };
            expect(model.floors).toEqual(expectedModel.floors);
            expect(model.horizontalEdges).toEqual(expectedModel.horizontalEdges);
            expect(model.verticalEdges).toEqual(expectedModel.verticalEdges);
            expect(model).toEqual(expectedModel);
        });
    });

    describe('setFloor', () => {
        it('should set floors', () => {
            let model = init(2, 3);
            model = setFloor(model, 0, 1, 'floor');
            expect(model.floors).toEqual([
                ['unknown', 'unknown'],
                ['floor', 'unknown'],
                ['unknown', 'unknown'],
            ]);
            model = setFloor(model, 0, 0, 'floor');
            expect(model.floors).toEqual([
                ['floor', 'unknown'],
                ['floor', 'unknown'],
                ['unknown', 'unknown'],
            ]);
            model = setFloor(model, 1, 1, 'floor');
            expect(model.floors).toEqual([
                ['floor', 'unknown'],
                ['floor', 'floor'],
                ['unknown', 'unknown'],
            ]);
            model = setFloor(model, 1, 2, 'floor');
            expect(model.floors).toEqual([
                ['floor', 'unknown'],
                ['floor', 'floor'],
                ['unknown', 'floor'],
            ]);
        });
    });

    describe('setCell / getCell', () => {
        it('should set cells', () => {
            const cell: Cell = {
                floor: 'floor',
                north: 'wall',
                east: 'empty',
                west: 'door',
                south: 'door',
            };
            const model = setCell(init(2, 3), 1, 2, cell);
            expect(model.floors).toEqual([
                ['unknown', 'unknown'],
                ['unknown', 'unknown'],
                ['unknown', 'floor'],
            ]);
            expect(model.horizontalEdges).toEqual([
                ['empty', 'empty'],
                ['empty', 'empty'],
                ['empty', 'wall'],
                ['empty', 'door'],
            ]);
            expect(model.verticalEdges).toEqual([
                ['empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty'],
                ['empty', 'door', 'empty'],
            ]);

            expect(getCell(model, 1, 2)).toEqual(cell);
            expect(getCell(model, 1, 1)).toEqual({
                floor: 'unknown',
                north: 'empty',
                south: 'wall',
                east: 'empty',
                west: 'empty',
            });
            expect(getCell(model, 0, 2)).toEqual({
                floor: 'unknown',
                north: 'empty',
                south: 'empty',
                east: 'door',
                west: 'empty',
            });
        });
    });
});
