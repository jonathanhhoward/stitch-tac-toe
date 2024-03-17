import React from "react";
import AppContext from "../../AppContext";
import Square from "./Square";

export default function Board() {
  const { state } = React.useContext(AppContext);

  return (
    <div className="Board">
      {state.board.grid.map((players, row) => (
        <div className="row" key={`row:${row}`}>
          {players.map((player, col) => (
            <Square
              key={`square:${row}${col}`}
              player={player}
              position={[row, col]}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
