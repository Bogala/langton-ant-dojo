import { MainState, Ant } from '.';
import { redim, reload } from './actions';

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

        expect(result).toEqual({ x: 11, y: 12, rotation: 0 } as Ant);
    });

    test('Reload re-init grid with Ant as defined', () => {
        expect(reload(90, 60, 30)).toEqual({
            ant: new Ant(60, 30, 0),
            grid: new Array<Array<boolean>>(90)
                .fill(new Array<boolean>(90))
                .map(() => new Array<boolean>(90).fill(false)),
            count: 0,
            gridLength: 90
        });
    });

    test('Reload have default values', () => {
        expect(reload()).toEqual({
            ant: new Ant(10, 10, 0),
            grid: new Array<Array<boolean>>(21)
                .fill(new Array<boolean>(21))
                .map(() => new Array<boolean>(21).fill(false)),
            count: 0,
            gridLength: 21
        });
    });
});