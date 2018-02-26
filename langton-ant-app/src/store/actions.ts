import { MainState, Ant } from './';
import { Action } from 'redux';

export const PLAY = 'PLAY';
export const PLAYED = 'PLAYED';
export const PAUSED = 'PAUSED';
export const REDIM = 'REDIM';
export const RELOAD = 'RELOAD';

export interface RedimData {
    arrayLength: number;
    antX: number;
    antY: number;
}

export interface RedimAction extends Action {
    payload: RedimData;
}

export const redim = ({ grid, ant, count }: MainState): MainState => {
    const length = grid.length;
    grid.unshift(new Array<boolean>(length).fill(false));
    grid.push(new Array<boolean>(length).fill(false));
    grid.forEach(item => {
        item.unshift(false);
        item.push(false);
    });
    if (ant) {
        ant.x++;
        ant.y++;
    }
    return {
        ant: { ...ant },
        grid: [...grid],
        count,
        gridLength: grid.length
    };
};

export const play = ({ grid, ant, count }: MainState): MainState => {
    const cnt = count + 1;
    const movement = moveByRotation(ant.rotation, grid[ant.y][ant.x]);
    const rotation = newRotation(ant.rotation, grid[ant.y][ant.x]);
    grid[ant.y][ant.x] = !grid[ant.y][ant.x];
    movement.x += ant.x;
    movement.y += ant.y;
    return {
        ant: { ...ant, rotation: rotation, x: movement.x, y: movement.y },
        grid: [...grid],
        count: cnt,
        gridLength: grid.length
    };
};

const newRotation = (rotation: number, right: boolean) => {
    let result = rotation + 90;
    if (right) {
        result += 180;
    }
    if (result >= 360) {
        result -= 360;
    }
    return result;
};

const moveByRotation = (rotation: number, right: boolean) => {
    const value = { x: 0, y: 0 };
    switch (rotation) {
        case 90:
            value.y++;
            break;
        case 180:
            value.x--;
            break;
        case 270:
            value.y--;
            break;
        default:
            value.x++;
            break;
    }
    if (right) {
        value.x = -value.x;
        value.y = -value.y;
    }
    return value;
};

export const reload = (gridSize: number = 21, antPosX: number = 10, antPosY: number = 10): MainState => {
    return {
        ant: { x: antPosX, y: antPosY, rotation: 0} as Ant,
        grid: new Array<Array<boolean>>(gridSize)
            .fill(new Array<boolean>(gridSize))
            .map(() => new Array<boolean>(gridSize).fill(false)),
        count: 0,
        gridLength: gridSize
    };
};