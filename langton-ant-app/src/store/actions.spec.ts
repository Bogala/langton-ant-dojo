import { MainState, Ant } from '.';
import { redim } from './actions';

describe('Actions test', () => {
    test('Redim upgrade grid size', () => {
        const grid = new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
            .map(() => new Array<boolean>(21).fill(false));
        grid[11][12] = true;
        const state = { grid } as MainState;
        const result = redim(state).grid;

        expect(result).toHaveLength(23);
        expect(result[0]).toHaveLength(23);
        expect(result[1]).toHaveLength(23);
        expect(result[21]).toHaveLength(23);
        expect(result[22]).toHaveLength(23);
        expect(result[12][13]).toBeTruthy();
        expect(result[11][12]).toBeFalsy();
    });

    test('Redim change original ant position', () => {
        const grid = new Array<Array<boolean>>(21).fill(new Array<boolean>(21))
            .map(() => new Array<boolean>(21).fill(false));
        const ant = new Ant();
        ant.y++;
        const state = { grid, ant } as MainState;
        const result = redim(state).ant;
        
        expect(result).toEqual({x: 11, y: 12, rotation: 0} as Ant);
    });
});