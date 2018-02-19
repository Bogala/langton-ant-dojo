import { MainState } from './';

export const PLAY = 'PLAY';
export const PLAYED = 'PLAYED';
export const PAUSED = 'PAUSED';
export const REDIM = 'REDIM';

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
        count
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
        count: cnt
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