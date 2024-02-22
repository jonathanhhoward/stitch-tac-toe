import { useContext } from "react";
import { AppContext } from "../../AppContext";
import Row from "./Row";

export default function Board() {
  const { state } = useContext(AppContext);

  return (
    <>
      {state.board.grid.map((players, row) => (
        <Row key={`row:${row}`} row={row} players={players} />
      ))}
    </>
  );
}
