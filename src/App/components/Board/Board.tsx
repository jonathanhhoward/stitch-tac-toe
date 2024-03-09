import React from "react";
import { AppContext } from "../../AppContext";
import Row from "./Row";

export default function Board() {
  const { state } = React.useContext(AppContext);

  return (
    <>
      {state.board.grid.map((players, row) => (
        <Row key={`row:${row}`} row={row} players={players} />
      ))}
    </>
  );
}
