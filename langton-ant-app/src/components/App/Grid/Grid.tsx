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

    constructor(x: number = 10, y: number = 10) {
        this.x = x;
        this.y = y;
    }
}

interface LineProps {
    line: boolean[];
    index: number;
    ant?: Ant;
}

interface CellProps {
    cellValue: boolean;
    hasAnt: boolean;
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
                        hasAnt={(index === y && idx === x)}
                    />
                ))
            }
        </tr>
    );
};

const Cell = ({ cellValue, hasAnt }: CellProps) => {
    const color = cellValue ? 'altcontent' : 'content';
    const ant = hasAnt ? ' ant' : '';
    const styleAntOrNot = `${color}${ant}`;
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