import React from "react";
import AppContext from "../../AppContext";
import Square from "./Square";

export default function Board() {
  const { state, placeToken } = React.useContext(AppContext);

  return (
    <div className="Board">
      {state.board.grid.map((players, row) => (
        <div className="row" key={`row:${row}`}>
          {players.map((player, col) => (
            <Square
              key={`square:${row}${col}`}
              onClick={() => placeToken([row, col])}
              player={player}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
