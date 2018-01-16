import * as React from 'react';

export interface GridBindingProps {
    cells: boolean[][];
    ant?: Ant;
}
export interface GridEventProps { }
export interface GridProps extends GridBindingProps, GridEventProps { }

export class Ant {
    public x: number;
    public y: number;
    public rotation: number;

    constructor(x: number = 10, y: number = 10, rotation: number = 0) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }
}

interface LineProps {
    line: boolean[];
    index: number;
    ant?: Ant;
}

interface CellProps {
    cellValue: boolean;
    ant?: Ant; 
}

const Line = ({ line, index, ant }: LineProps) => {
    const {x, y} = ant || new Ant(-1, -1);
    return (
        <tr>
            {
                line.map((cell, idx) => (
                    <Cell
                        cellValue={cell}
                        key={`cell_${index}${idx}`}
                        ant={(index === y && idx === x) ? ant : undefined}
                    />
                ))
            }
        </tr>
    );
};

const Cell = ({ cellValue, ant }: CellProps) => {
    const color = cellValue ? 'alt' : '';
    const hasAnt = (ant) ? ((ant.rotation !== 0) ? ` ant${ant.rotation}` : ' ant') : '';
    const styleAntOrNot = `content${hasAnt}${color}`;
    return (
        <td>
            <div className="box">
                <div className={styleAntOrNot} />
            </div>
        </td>
    );
};

export default ({ cells, ant }: GridProps) => (
    <table>
        <tbody>
            {
                cells.map((line, index) => (
                    <Line line={line} key={`line_${index}`} index={index} ant={ant} />
                ))
            }
        </tbody>
    </table>
);