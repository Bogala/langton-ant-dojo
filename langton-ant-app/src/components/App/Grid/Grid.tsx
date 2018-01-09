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
}

const Line = ({ line, index }: LineProps) => (
    <tr>
        {
            line.map((cell, idx) => (
                <Cell cellValue={cell} key={`cell_${index}${idx}`} />
            ))
        }
    </tr>
);

const Cell = ({ cellValue }: CellProps) => (
    <td>
        <div className="box">
            <div className="content" />
        </div>
    </td>
);

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