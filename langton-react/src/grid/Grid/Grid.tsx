import { AppBar, Card, IconButton } from "material-ui";
import { AvPlayArrow } from "material-ui/svg-icons";
import * as React from "react";
import { Ant } from "../Ant";
import "./Grid.css";

interface ILineProps {
  line: boolean[];
  index: number;
  ant: Ant;
}

interface ICellProps {
  ant?: Ant;
}

const Grid = () => {
  const cells = new Array<boolean[]>(21)
    .fill(new Array<boolean>(21))
    .map(() => new Array<boolean>(21).fill(false));
  const ant = new Ant();

  return (
    <React.Fragment>
      <AppBar
        title={"Langton Ant"}
        iconElementLeft={
          <IconButton>
            <AvPlayArrow />
          </IconButton>
        }
      />
      <div>
        <div className="stretch">
          <Card className="md-card">
            <table>
              <tbody>
                {cells.map((line, index) => (
                  <Line
                    line={line}
                    key={`line_${index}`}
                    index={index}
                    ant={ant}
                  />
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

const Line = ({ line, index, ant }: ILineProps) => {
  const { x, y } = ant;
  return (
    <tr>
      {line.map((cell, idx) => (
        <Cell
          key={`cell_${index}${idx}`}
          ant={index === y && idx === x ? ant : undefined}
        />
      ))}
    </tr>
  );
};

const Cell = ({ ant }: ICellProps) => {
  const hasAnt = ant ? " ant" : "";
  const styleAntOrNot = `content${hasAnt}`;
  return (
    <td>
      <div className="box">
        <div className={styleAntOrNot} />
      </div>
    </td>
  );
};

export default Grid;