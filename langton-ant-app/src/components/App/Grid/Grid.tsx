import * as React from 'react';

export interface GridBindingProps {
    cells: boolean[][];
}
export interface GridEventProps { }
export interface GridProps extends GridBindingProps, GridEventProps { }

interface LineProps {
    line: boolean[];
    index: number;
}

interface CellProps {
    cellValue: boolean;
    hasAnt: boolean;
}

const Line = ({ line, index }: LineProps) => (
    <tr>
        {
            line.map((cell, idx) => (
                <Cell cellValue={cell} key={`cell_${index}${idx}`} hasAnt={(index === 10 && idx === 10)} />
            ))
        }
    </tr>
);

const Cell = ({ cellValue, hasAnt }: CellProps) => {
    const styleAntOrNot = hasAnt ? 'content ant' : 'content';
    return (
        <td>
            <div className="box">
                <div className={styleAntOrNot} />
            </div>
        </td>
    );
};

export default ({ cells }: GridProps) => (
    <table>
        <tbody>
            {
                cells.map((line, index) => (
                    <Line line={line} key={`line_${index}`} index={index} />
                ))
            }
        </tbody>
    </table>
);